import http from 'node:http'
import crypto from 'node:crypto'
import 'dotenv/config'
import { searchReadyCards } from './ready-cards/index.js'

const BASE_URL = 'https://azbyka.ru/days'
const PORT = Number(process.env.PORT) || 3001

const MAX_BOT_TOKEN = process.env.MAX_BOT_TOKEN

const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  'https://est-povod-max-api.layero.app'

const storedFiles = new Map()

function validateMaxInitData(initData) {
  if (!MAX_BOT_TOKEN) {
    throw new Error(
      'MAX_BOT_TOKEN не настроен',
    )
  }

  if (
    !initData ||
    typeof initData !== 'string'
  ) {
    throw new Error(
      'MAX initData отсутствует',
    )
  }

  const params =
    new URLSearchParams(initData)

  const entries = [
    ...params.entries(),
  ]

  const counts = new Map()

  for (const [key] of entries) {
    counts.set(
      key,
      (counts.get(key) || 0) + 1,
    )
  }

  for (const [key, count] of counts) {
    if (count !== 1) {
      throw new Error(
        `MAX initData содержит повторяющийся параметр: ${key}`,
      )
    }
  }

  const hash = params.get('hash')

  if (!hash) {
    throw new Error(
      'MAX hash отсутствует',
    )
  }

  const dataCheckString = entries
    .filter(
      ([key]) => key !== 'hash',
    )
    .sort(([a], [b]) =>
      a.localeCompare(b),
    )
    .map(
      ([key, value]) =>
        `${key}=${value}`,
    )
    .join('\n')

  const secretKey = crypto
    .createHmac(
      'sha256',
      'WebAppData',
    )
    .update(MAX_BOT_TOKEN)
    .digest()

  const calculatedHash = crypto
    .createHmac(
      'sha256',
      secretKey,
    )
    .update(dataCheckString)
    .digest('hex')

  const receivedBuffer =
    Buffer.from(hash, 'hex')

  const calculatedBuffer =
    Buffer.from(
      calculatedHash,
      'hex',
    )

  if (
    receivedBuffer.length !==
      calculatedBuffer.length ||
    !crypto.timingSafeEqual(
      receivedBuffer,
      calculatedBuffer,
    )
  ) {
    throw new Error(
      'MAX initData недействителен',
    )
  }

  return params
}

function cleanupStoredFiles() {
  const now = Date.now()

  for (const [id, file] of storedFiles.entries()) {
    if (file.expiresAt <= now) {
      storedFiles.delete(id)
    }
  }
}

setInterval(cleanupStoredFiles, 5 * 60 * 1000)

let token = null
let tokenExpiresAt = 0



// ============================================================
// AZBYKA AUTH
// ============================================================

async function login() {
  if (
    token &&
    Date.now() < tokenExpiresAt
  ) {
    return token
  }

  const email = process.env.AZBYKA_EMAIL
  const password = process.env.AZBYKA_PASSWORD

  if (!email || !password) {
    throw new Error(
      'Не найдены AZBYKA_EMAIL или AZBYKA_PASSWORD в .env',
    )
  }

  const response = await fetch(
    `${BASE_URL}/api-v2/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      body: JSON.stringify({
        email,
        password,
      }),
    },
  )

  const text = await response.text()

  if (!response.ok) {
    throw new Error(
      `Ошибка авторизации Azbyka: ${response.status} ${text}`,
    )
  }

  const data = JSON.parse(text)

  token = data.token

  // Храним токен примерно 50 минут.
  tokenExpiresAt =
    Date.now() + 50 * 60 * 1000

  return token
}


// ============================================================
// UNIVERSAL AZBYKA REQUEST
// ============================================================

async function azbykaRequest(path) {
  const authToken = await login()

  const response = await fetch(
    `${BASE_URL}${path}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
      },
    },
  )

  const text = await response.text()

  if (!response.ok) {
    throw new Error(
      `Azbyka API ${response.status}: ${text}`,
    )
  }

  return JSON.parse(text)
}



// ============================================================
// CACHE DATES
// ============================================================

async function getCacheDates(date) {
  return azbykaRequest(
    `/api/cache_dates?date[exact]=${encodeURIComponent(date)}`,
  )
}



// ============================================================
// DAY
// ============================================================

async function getDay(date) {
  return azbykaRequest(
    `/api/day?date[exact]=${encodeURIComponent(date)}`,
  )
}



// ============================================================
// ICON OF OUR LADY
// ============================================================

async function getOurLadyIcon(id) {
  return azbykaRequest(
    `/api/icons_of_our_ladies/${id}`,
  )
}



// ============================================================
// EXTRACT REAL HREF FROM Azbyka HTML
//
// Azbyka returns things like:
//
// <a href="http://azbyka.ru/days/ikona-slovenskaja">
//   Словенская
// </a>
//
// We MUST use this real href instead of constructing
// a URL from uri.
// ============================================================

function extractHref(html) {
  if (!html) {
    return null
  }

  const match =
    String(html).match(
      /href\s*=\s*["']([^"']+)["']/i,
    )

  if (!match) {
    return null
  }

  let href = match[1]

  // Azbyka sometimes returns http://.
  // For the browser we prefer https://.
  href = href.replace(
    /^http:\/\//i,
    'https://',
  )

  return href
}



// ============================================================
// BUILD REAL LINKS FROM /api/day
// ============================================================

function buildPriorityLinks(priorities) {
  const holidayLinks = new Map()
  const iconLinks = new Map()
  const saintGroupLinks = new Map()

  for (const priority of priorities) {
    const memorialDay =
      priority?.memorialDay

    if (!memorialDay) {
      continue
    }

    const href =
      extractHref(
        memorialDay.cacheTitle,
      )

    if (!href) {
      continue
    }



    // --------------------------------------------------------
    // HOLIDAY
    //
    // В /api/day у holiday нет id,
    // поэтому связываем по title.
    // --------------------------------------------------------

    const holiday =
      memorialDay.holiday

    if (holiday?.title) {
      holidayLinks.set(
        holiday.title,
        href,
      )
    }



    // --------------------------------------------------------
    // ICON OF OUR LADY
    //
    // Здесь тоже нет id — есть только title.
    // --------------------------------------------------------

    const iconOfOurLady =
      memorialDay.iconOfOurLady

    if (iconOfOurLady?.title) {
      iconLinks.set(
        iconOfOurLady.title,
        href,
      )
    }



    // --------------------------------------------------------
    // SAINTS GROUP
    // --------------------------------------------------------

    const saintsGroup =
      memorialDay.saintsGroup

    if (saintsGroup?.cacheTitle) {
      saintGroupLinks.set(
        saintsGroup.cacheTitle,
        href,
      )
    }
  }

  return {
    holidayLinks,
    iconLinks,
    saintGroupLinks,
  }
}



// ============================================================
// SELECT BEST IMAGE
// ============================================================

function getBestIconImage(icon) {
  if (!icon?.icons?.length) {
    return null
  }

  const availableImages =
    icon.icons.filter(
      (image) =>
        image?.preview_absolute_url_2x ||
        image?.preview_absolute_url ||
        image?.original_absolute_url,
    )

  if (!availableImages.length) {
    return null
  }

  const sorted =
    [...availableImages].sort(
      (a, b) =>
        (a.priority ?? 999999) -
        (b.priority ?? 999999),
    )

  const image = sorted[0]

  return (
    image.preview_absolute_url_2x ||
    image.preview_absolute_url ||
    image.original_absolute_url ||
    null
  )
}



// ============================================================
// BUILD ORTHODOX DATE
// ============================================================

async function buildOrthodoxDate(date) {
  const [
    cacheData,
    dayData,
  ] = await Promise.all([
    getCacheDates(date),
    getDay(date),
  ])

  const abstractDate =
    cacheData?.[0]?.abstractDate || {}

  // /api/day can contain several abstractDate objects.
  // We collect priorities from all of them.
  const priorities =
    (dayData || [])
      .flatMap(
        (item) =>
          item?.abstractDate?.priorities || [],
      )



  // ==========================================================
  // REAL LINKS FROM /api/day
  // ==========================================================

  const {
    holidayLinks,
    iconLinks,
    saintGroupLinks,
  } =
    buildPriorityLinks(priorities)



  // ==========================================================
  // HOLIDAYS
  // ==========================================================

  const holidays =
    abstractDate.holidays || []

  const normalizedHolidays =
    holidays.map((holiday) => ({
      id: holiday.id,

      title: holiday.title,

      uri: holiday.uri,

      // IMPORTANT:
      // We use the real href returned by /api/day.
      link:
        holidayLinks.get(holiday.title) ||
        null,
    }))



  // ==========================================================
  // MAIN HOLIDAY
  //
  // First use holiday from cache_dates.
  // Then look through /api/day priorities.
  // This is important for Easter and similar dates.
  // ==========================================================

  let mainHoliday =
    normalizedHolidays[0] || null



  for (const priority of priorities) {
    const holiday =
      priority?.memorialDay?.holiday

    if (!holiday?.title) {
      continue
    }

    const matchingHoliday =
      normalizedHolidays.find(
        (item) =>
          (
            item.id &&
            holiday.id &&
            item.id === holiday.id
          ) ||
          item.title === holiday.title,
      )

    if (matchingHoliday) {
      mainHoliday =
        matchingHoliday

      break
    }



    // Sometimes /api/day knows about a holiday
    // which isn't present in cache_dates.
    mainHoliday = {
      id: holiday.id ?? null,

      title: holiday.title,

      uri: null,

      link:
        holiday.title
          ? holidayLinks.get(
              holiday.title,
            ) || extractHref(
              priority?.memorialDay?.cacheTitle,
            )
          : extractHref(
              priority?.memorialDay?.cacheTitle,
            ),
    }

    break
  }



  // ==========================================================
  // ICONS
  // ==========================================================

  const iconRelations =
    abstractDate
      .iconsOfOurLadyAbstractDates || []

  const icons = []

  for (const relation of iconRelations) {
    const iconId =
      relation?.iconsOfOurLady?.id

    if (!iconId) {
      continue
    }

    try {
      const icon =
        await getOurLadyIcon(iconId)

      icons.push({
        id: icon.id,

        title: icon.title,

        uri: icon.uri,

        link:
          iconLinks.get(icon.title) ||
          (
            icon.uri
              ? `https://azbyka.ru/days/ikona-${icon.uri}`
              : null
          ),

        imageUrl:
          getBestIconImage(icon),
      })

    } catch (error) {
      console.warn(
        `⚠️ Не удалось получить икону #${iconId}:`,
        error.message,
      )
    }
  }



  // ==========================================================
  // SAINTS GROUPS
  // ==========================================================

  const saintsGroups =
    abstractDate
      .saintsGroupAbstractDate || []

  const saints =
    saintsGroups
      .map(
        (item) =>
          item?.saintsGroup,
      )
      .filter(Boolean)
      .map((saint) => ({
        id: saint.id,

        title: saint.cacheTitle,

        uri: saint.uri,

        // IMPORTANT:
        // Again, use the real href from /api/day.
        link:
          saintGroupLinks.get(
            saint.cacheTitle,
          ) || null,
      }))



  // ==========================================================
  // RETURN
  // ==========================================================

  return {
    date,

    holiday: mainHoliday,

    holidays:
      normalizedHolidays,

    icons,

    saints,

    priorities,
  }
}



// ============================================================
// READ JSON BODY
// ============================================================

async function readJsonBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(chunk)
  }

  const body =
    Buffer.concat(chunks).toString('utf8')

  if (!body.trim()) {
    return {}
  }

  try {
    return JSON.parse(body)
  } catch {
    throw new Error(
      'Некорректный JSON в теле запроса',
    )
  }
}


// ============================================================
// MAX MEDIA UPLOAD
// ============================================================

async function createMaxImageUpload() {
  if (!MAX_BOT_TOKEN) {
    throw new Error(
      'MAX_BOT_TOKEN не настроен',
    )
  }

  const response = await fetch(
    'https://platform-api2.max.ru/uploads?type=image',
    {
      method: 'POST',

      headers: {
        Authorization: MAX_BOT_TOKEN,
        Accept: 'application/json',
      },
    },
  )

  const text = await response.text()

  let data

  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(
      `MAX вернул некорректный ответ: ${text}`,
    )
  }

  if (!response.ok) {
    throw new Error(
      `MAX API ${response.status}: ${
        data?.message ||
        data?.error ||
        text
      }`,
    )
  }

  if (!data?.url) {
    throw new Error(
      'MAX не вернул URL для загрузки изображения',
    )
  }

  return data
}

async function uploadImageToMax(
  uploadUrl,
  imageBuffer,
  filename,
) {
  if (!MAX_BOT_TOKEN) {
    throw new Error(
      'MAX_BOT_TOKEN не настроен',
    )
  }

  const form = new FormData()

  form.append(
    'data',
    new Blob([imageBuffer], {
      type: 'image/png',
    }),
    filename,
  )

  const response = await fetch(
    uploadUrl,
    {
      method: 'POST',
      headers: {
        Authorization: MAX_BOT_TOKEN,
      },
      body: form,
    },
  )

  const text = await response.text()

  let data

  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(
      `MAX upload вернул некорректный ответ: ${text}`,
    )
  }

  if (!response.ok) {
    throw new Error(
      `MAX upload ${response.status}: ${
        data?.message ||
        data?.error ||
        text
      }`,
    )
  }

  return data
}

// ============================================================
// HTTP SERVER
// ============================================================

const server =
  http.createServer(
    async (
      request,
      response,
    ) => {

      // ------------------------------------------------------
      // CORS
      // ------------------------------------------------------

      response.setHeader(
        'Access-Control-Allow-Origin',
        '*',
      )

      response.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS',
      )

      response.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type',
      )



      // ------------------------------------------------------
      // PREFLIGHT
      // ------------------------------------------------------

      if (
        request.method === 'OPTIONS'
      ) {
        response.writeHead(204)
        response.end()
        return
      }


// ------------------------------------------------------
// MAX SHARE
// ------------------------------------------------------

if (
  request.method === 'POST' &&
  request.url === '/api/max/share'
) {
  try {
    const body = await readJsonBody(request)

    const {
      imageBase64,
      filename = 'otkrytka.png',
      initData,
      caption = '',
    } = body

    if (!imageBase64) {
      throw new Error(
        'Не передано изображение',
      )
    }

    if (!initData) {
      throw new Error(
        'Не передан initData MAX',
      )
    }

    const params =
      validateMaxInitData(initData)

    const userData = params.get('user')

    if (!userData) {
      throw new Error(
        'В initData MAX нет данных пользователя',
      )
    }

    let user

    try {
      user = JSON.parse(userData)
    } catch {
      throw new Error(
        'Не удалось прочитать данные пользователя MAX',
      )
    }

    const userId = user?.id

    if (!userId) {
      throw new Error(
        'В initData MAX нет user.id',
      )
    }

    const imageBuffer = Buffer.from(
      imageBase64.replace(
        /^data:image\/png;base64,/,
        '',
      ),
      'base64',
    )

    const uploadData =
      await createMaxImageUpload()

    const uploadResult =
      await uploadImageToMax(
        uploadData.url,
        imageBuffer,
        filename,
      )

    const mediafileToken =
      uploadResult?.token ||
      uploadResult?.photos?.['0']?.token

    if (!mediafileToken) {
      throw new Error(
        'MAX не вернул mediafile_token',
      )
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 1500),
    )

    const messageResponse = await fetch(
      `https://platform-api2.max.ru/messages?user_id=${encodeURIComponent(
        userId,
      )}`,

      {
        method: 'POST',
        headers: {
          Authorization: MAX_BOT_TOKEN,
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          text: caption,
          attachments: [
            {
              type: 'image',
              payload: {
                token: mediafileToken,
              },
            },
          ],
        }),
      },
    )

    const messageText =
      await messageResponse.text()

    if (!messageResponse.ok) {
      throw new Error(
        `MAX messages ${messageResponse.status}: ${messageText}`,
      )
    }

    let messageResult

    try {
      messageResult =
        JSON.parse(messageText)
    } catch {
      messageResult = {
        raw: messageText,
      }
    }

    response.writeHead(200, {
      'Content-Type':
        'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':
        '*',
    })

    response.end(
      JSON.stringify({
        ok: true,
        mid: messageResult?.mid,
        messageResult,
      }),
    )
  } catch (error) {
    console.error(
      'MAX share error:',
      error,
    )

    response.writeHead(500, {
      'Content-Type':
        'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':
        '*',
    })

    response.end(
      JSON.stringify({
        ok: false,
        error:
          error?.message ||
          'MAX share failed',
      }),
    )
  }

  return
}

      const url =
        new URL(
          request.url,
          `http://localhost:${PORT}`,
        )

      if (
        request.method === 'POST' &&
        request.url === '/api/download'
      ) {
        try {
          const body = await readJsonBody(request)

          const {
            imageBase64,
            filename = 'otkrytka.png',
          } = body

          if (!imageBase64) {
            response.writeHead(400, {
              'Content-Type':
                'application/json; charset=utf-8',
            })

            response.end(
              JSON.stringify({
                ok: false,
                error:
                  'imageBase64 is required',
              }),
            )

            return
          }

          const base64Data =
            imageBase64.replace(
              /^data:image\/png;base64,/,
              '',
            )

          const imageBuffer =
            Buffer.from(
              base64Data,
              'base64',
            )

          if (!imageBuffer.length) {
            response.writeHead(400, {
              'Content-Type':
                'application/json; charset=utf-8',
            })

            response.end(
              JSON.stringify({
                ok: false,
                error: 'Empty image',
              }),
            )

            return
          }

          const fileId =
            crypto.randomUUID()

          storedFiles.set(fileId, {
            buffer: imageBuffer,
            contentType: 'image/png',
            filename,
            expiresAt:
              Date.now() +
              30 * 60 * 1000,
          })

          const baseUrl =
            process.env.PUBLIC_BASE_URL ||
            'https://est-povod-max-api.layero.app'

          const downloadUrl =
            `${baseUrl}/api/download/${fileId}`

          const viewUrl =
            `${baseUrl}/api/view/${fileId}`

          response.writeHead(200, {
            'Content-Type':
              'application/json; charset=utf-8',

            'Access-Control-Allow-Origin':
              '*',
          })

          response.end(
            JSON.stringify({
              ok: true,
              downloadUrl,
              viewUrl,
            }),
          )
        } catch (error) {
          console.error(
            'Download card error:',
            error,
          )

          response.writeHead(500, {
            'Content-Type':
              'application/json; charset=utf-8',

            'Access-Control-Allow-Origin':
              '*',
          })

          response.end(
            JSON.stringify({
              ok: false,
              error:
                error?.message ||
                'Failed to prepare download',
            }),
          )
        }

        return
      }

      if (
        request.method === 'GET' &&
        request.url.startsWith(
          '/api/download/',
        )
      ) {
        const fileId =
          request.url
            .split('/api/download/')[1]
            ?.split('?')[0]

        const file =
          storedFiles.get(fileId)

        if (
          !file ||
          file.expiresAt < Date.now()
        ) {
          response.writeHead(404, {
            'Content-Type':
              'text/plain; charset=utf-8',
          })

          response.end(
            'Файл не найден или срок ссылки истёк.',
          )

          return
        }

        response.writeHead(200, {
          'Content-Type':
            file.contentType ||
            'image/png',

          'Content-Length':
            file.buffer.length,

          'Content-Disposition':
            `attachment; filename="otkrytka.png"; filename*=UTF-8''${encodeURIComponent(file.filename || 'otkrytka.png')}`,   

          'Cache-Control':
            'no-store',

          'Access-Control-Allow-Origin':
            '*',
        })

        response.end(file.buffer)

        return
      }
   
      if (
        request.method === 'GET' &&
        request.url.startsWith(
          '/api/view/',
        )
      ) {
        const fileId =
          request.url
            .split('/api/view/')[1]
            ?.split('?')[0]

        const file =
          storedFiles.get(fileId)

        if (
          !file ||
          file.expiresAt < Date.now()
        ) {
          response.writeHead(404, {
            'Content-Type':
              'text/html; charset=utf-8',
          })

          response.end(`
  <!doctype html>
  <html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    >
    <title>Открытка недоступна</title>
  </head>

  <body>
    <main>
      <h1>Открытка недоступна</h1>

      <p>
        Срок ссылки истёк или открытка
        больше не хранится на сервере.
      </p>
    </main>
  </body>
  </html>
          `)

          return
        }

        const imageUrl =
          `/api/view-image/${fileId}`

        response.writeHead(200, {
          'Content-Type':
            'text/html; charset=utf-8',

          'Cache-Control':
            'no-store',
        })

        response.end(`
  <!doctype html>
  <html lang="ru">
  <head>
    <meta charset="utf-8">

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    >

    <title>ЕСТЬ ПОВОД! — открытка</title>

    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        padding: 24px 16px 40px;
        background: #fff7ed;
        color: #332b26;
        font-family:
          Arial,
          sans-serif;
        text-align: center;
      }

      main {
        width: min(100%, 720px);
        margin: 0 auto;
      }

      h1 {
        margin: 0 0 8px;
        font-size: 26px;
      }

      p {
        margin: 0 0 20px;
        line-height: 1.5;
        color: #6b5d54;
      }

      img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0 auto;
        border-radius: 18px;
        box-shadow:
          0 10px 35px
          rgba(0, 0, 0, 0.12);
      }

      .hint {
        margin-top: 20px;
        padding: 14px 16px;
        background: #ffffff;
        border-radius: 14px;
        font-size: 15px;
      }
    </style>
  </head>

  <body>
    <main>
      <h1>☀️ Открытка готова</h1>

      <p>
        Нажмите и удерживайте изображение,
        чтобы сохранить его на телефон.
      </p>

      <img
        src="${imageUrl}"
        alt="Открытка ЕСТЬ ПОВОД!"
      >

      <div class="hint">
        Если меню не появилось сразу,
        нажмите и удерживайте открытку ещё раз.
      </div>
    </main>
  </body>
  </html>
        `)

        return
      }

      if (
        request.method === 'GET' &&
        request.url.startsWith(
          '/api/view-image/',
        )
      ) {
        const fileId =
          request.url
            .split('/api/view-image/')[1]
            ?.split('?')[0]

        const file =
          storedFiles.get(fileId)

        if (
          !file ||
          file.expiresAt < Date.now()
        ) {
          response.writeHead(404, {
            'Content-Type':
              'text/plain; charset=utf-8',
          })

          response.end(
            'Изображение не найдено.',
          )

          return
        }

        response.writeHead(200, {
          'Content-Type':
            file.contentType ||
            'image/png',

          'Content-Length':
            file.buffer.length,

          /*
          * ВАЖНО:
          * inline, а не attachment.
          *
          * Браузер должен показать PNG
          * как обычную картинку.
          */
          'Content-Disposition':
            'inline',

          'Cache-Control':
            'no-store',

          'Access-Control-Allow-Origin':
            '*',
        })

        response.end(file.buffer)

        return
      }      
      

      // ------------------------------------------------------
      // IMAGE PROXY
      // ------------------------------------------------------

      if (
        request.method === 'GET' &&
        url.pathname === '/api/image-proxy'
      ) {
        try {
          const imageUrl =
            url.searchParams.get('url')

          if (!imageUrl) {
            response.writeHead(400, {
              'Content-Type':
                'application/json; charset=utf-8',
            })

            response.end(
              JSON.stringify({
                error:
                  'Не указан URL изображения.',
              }),
            )

            return
          }

          let sourceUrl

          try {
            sourceUrl = new URL(imageUrl)
          } catch {
            response.writeHead(400, {
              'Content-Type':
                'application/json; charset=utf-8',
            })

            response.end(
              JSON.stringify({
                error:
                  'Некорректный URL изображения.',
              }),
            )

            return
          }

          const host =
            sourceUrl.hostname.toLowerCase()

          const isPrivateHost =
            host === 'localhost' ||
            host === '127.0.0.1' ||
            host === '0.0.0.0' ||
            host === '::1' ||
            host.endsWith('.localhost')

          const isAllowedHost =
            sourceUrl.protocol === 'https:' &&
            !isPrivateHost

          if (!isAllowedHost) {
            response.writeHead(403, {
              'Content-Type':
                'application/json; charset=utf-8',
            })

            response.end(
              JSON.stringify({
                error:
                  'Этот адрес изображения запрещён.',
              }),
            )

            return
          }

          const imageResponse =
            await fetch(sourceUrl.href, {
              headers: {
                Accept:
                  'image/avif,image/webp,image/png,image/jpeg,image/gif,image/*,*/*;q=0.8',

                'User-Agent':
                  'Mozilla/5.0',
              },

              redirect: 'follow',
            })

          if (!imageResponse.ok) {
            throw new Error(
              `Источник изображения ответил HTTP ${imageResponse.status}`,
            )
          }

          const finalUrl =
            new URL(imageResponse.url)

          const finalHost =
            finalUrl.hostname.toLowerCase()

          const finalIsPrivateHost =
            finalHost === 'localhost' ||
            finalHost === '127.0.0.1' ||
            finalHost === '0.0.0.0' ||
            finalHost === '::1' ||
            finalHost.endsWith('.localhost')

          const finalHostAllowed =
            finalUrl.protocol === 'https:' &&
            !finalIsPrivateHost

          if (!finalHostAllowed) {
            throw new Error(
              'Изображение перенаправлено на запрещённый адрес',
            )
          }

          const contentType =
            imageResponse.headers.get(
              'content-type',
            ) || ''

          const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/gif',
            'image/avif',
          ]

          const normalizedType =
            contentType
              .split(';')[0]
              .trim()
              .toLowerCase()

          if (
            !allowedTypes.includes(
              normalizedType,
            )
          ) {
            throw new Error(
              `Источник вернул не изображение: ${
                contentType || 'неизвестный тип'
              }`,
            )
          }

          const arrayBuffer =
            await imageResponse.arrayBuffer()

          const imageBuffer =
            Buffer.from(arrayBuffer)

          const maxImageSize =
            8 * 1024 * 1024

          if (
            imageBuffer.length >
            maxImageSize
          ) {
            throw new Error(
              'Изображение слишком большое',
            )
          }

          response.writeHead(200, {
            'Content-Type':
              normalizedType,

            'Content-Length':
              imageBuffer.length,

            'Cache-Control':
              'public, max-age=86400',

            'Access-Control-Allow-Origin':
              '*',
          })

          response.end(imageBuffer)
        } catch (error) {
          console.error(
            '❌ Image proxy error:',
            error,
          )

          response.writeHead(502, {
            'Content-Type':
              'application/json; charset=utf-8',

            'Access-Control-Allow-Origin':
              '*',
          })

          response.end(
            JSON.stringify({
              error:
                error?.message ||
                'Не удалось загрузить изображение',
            }),
          )
        }

        return
      }

      // ------------------------------------------------------
      // HEALTH CHECK
      // ------------------------------------------------------

      if (
        request.method === 'GET' &&
        url.pathname === '/api/health'
      ) {
        response.writeHead(200, {
          'Content-Type':
            'application/json; charset=utf-8',
        })

        response.end(
          JSON.stringify({
            ok: true,
            service: 'azbyka',
          }),
        )

        return
      }

      // ------------------------------------------------------
      // READY CARDS
      // ------------------------------------------------------

      if (
        request.method === 'POST' &&
        url.pathname === '/api/ready-cards'
      ) {
        try {
          const body =
            await readJsonBody(request)

          const title =
            String(body?.title || '').trim()

          if (!title) {
            response.writeHead(400, {
              'Content-Type':
                'application/json; charset=utf-8',
            })

            response.end(
              JSON.stringify({
                error:
                  'Не указано название праздника. Передай title.',
              }),
            )

            return
          }

          const result =
            await searchReadyCards(title)

          response.writeHead(200, {
            'Content-Type':
              'application/json; charset=utf-8',
          })

          response.end(
            JSON.stringify(result),
          )
        } catch (error) {
          console.error(
            '❌ Ошибка поиска готовых открыток:',
            error,
          )

          response.writeHead(500, {
            'Content-Type':
              'application/json; charset=utf-8',
          })

          response.end(
            JSON.stringify({
              error:
                error.message ||
                'Ошибка поиска готовых открыток',
            }),
          )
        }

        return
      }

      // ------------------------------------------------------
      // ORTHODOX DATE
      // ------------------------------------------------------

      if (
        request.method === 'GET' &&
        url.pathname === '/api/orthodox'
      ) {
        const date =
          url.searchParams.get(
            'date',
          )

        if (!date) {
          response.writeHead(400, {
            'Content-Type':
              'application/json; charset=utf-8',
          })

          response.end(
            JSON.stringify({
              error:
                'Не указана дата. Используй ?date=YYYY-MM-DD',
            }),
          )

          return
        }

        // Simple date validation.
        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(
            date,
          )
        ) {
          response.writeHead(400, {
            'Content-Type':
              'application/json; charset=utf-8',
          })

          response.end(
            JSON.stringify({
              error:
                'Неверный формат даты. Используй YYYY-MM-DD',
            }),
          )

          return
        }

        try {
          const result =
            await buildOrthodoxDate(
              date,
            )

          response.writeHead(200, {
            'Content-Type':
              'application/json; charset=utf-8',
          })

          response.end(
            JSON.stringify(result),
          )
        } catch (error) {
          console.error(
            '❌ Ошибка Azbyka:',
            error,
          )

          response.writeHead(500, {
            'Content-Type':
              'application/json; charset=utf-8',
          })

          response.end(
            JSON.stringify({
              error:
                error.message ||
                'Ошибка Azbyka API',
            }),
          )
        }

        return
      }



      // ------------------------------------------------------
      // 404
      // ------------------------------------------------------

      response.writeHead(404, {
        'Content-Type':
          'application/json; charset=utf-8',
      })

      response.end(
        JSON.stringify({
          error:
            'Маршрут не найден',
        }),
      )
    },
  )



// ============================================================
// START
// ============================================================

server.listen(
  PORT,
  () => {
    console.log('')
    console.log(
      '==========================================',
    )
    console.log(
      '🕊️  AZBYKA BACKEND',
    )
    console.log(
      '==========================================',
    )
    console.log(
      `Сервер: http://localhost:${PORT}`,
    )
    console.log(
      `Проверка: http://localhost:${PORT}/api/health`,
    )
    console.log(
      `День: http://localhost:${PORT}/api/orthodox?date=2026-10-06`,
    )
    console.log(
      `Открытки: http://localhost:${PORT}/api/ready-cards`,
    )
    console.log(
      '==========================================',
    )
    console.log('')
  },
)