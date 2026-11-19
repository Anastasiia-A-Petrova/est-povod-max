import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const token = process.env.CLOUDFLARE_API_TOKEN;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

if (!token || !accountId) {
  console.error("Не найдены Cloudflare credentials в .env");
  process.exit(1);
}

const MODEL = "@cf/black-forest-labs/flux-1-schnell";
const OUTPUT = path.resolve("public/images/occasions");
const LOG = path.join(OUTPUT, "generation-log.jsonl");



const style = `
Modern decorative editorial digital illustration.
A beautiful standalone decorative still life,
not a greeting card design and not a birthday illustration.

A simple harmonious composition of 2-4 related objects.
One main recognizable subject with a few complementary elements.
Objects arranged naturally, creating a complete balanced scene.

Clean smooth shapes, elegant proportions,
subtle dimensional shading, soft gradients,
gentle natural shadows.

Contemporary polished illustration,
warm, tasteful, friendly and timeless.
Not childish, not overly minimalistic.

Harmonious colors: dusty pink, powder blue,
lavender, warm cream, sage green and muted yellow.
Simple attractive background with subtle decorative shapes.

Clear composition, no clutter, no tiny details.
Suitable for a calendar icon and a decorative illustration.

No birthday theme, no party theme,
no greeting card layout, no written message,
no typography, no lettering, no numbers.
No photorealism, no watercolor, no 3D.
Square composition.
No logo, watermark or frame.
`;

const groups = [
  {
    id: "universal",
    images: [
      ["universal-01", "A lovely bouquet of pink and white flowers in a simple ceramic vase, two loose petals nearby."],
      ["universal-02", "Three colorful garden flowers growing together among a few green leaves."],
      ["universal-03", "Two elegant pink hearts surrounded by small flowers and delicate leaves."],
      ["universal-04", "A bright yellow sun above soft green hills with two fluffy clouds."],
      ["universal-05", "A beautiful crescent moon surrounded by a few large stars and soft clouds."],
      ["universal-06", "A colorful rainbow appearing above green hills with small flowers."],
      ["universal-07", "A colorful butterfly resting on a blooming flower with green leaves."],
      ["universal-08", "A little songbird sitting on a flowering tree branch."],
      ["universal-09", "A beautiful green tree with a rounded crown, surrounded by a few small flowers."],
      ["universal-10", "Several elegant green leaves arranged together with a small branch."],
      ["universal-11", "An elegant pastel gift box with a wide ribbon and a few flowers beside it, no birthday decorations."],
      ["universal-12", "A beautiful small cake decorated with berries and cream, on a simple plate, no candles, no writing."],
      ["universal-13", "Three colorful balloons floating together with long flowing ribbons, simple clean background."],
      ["universal-14", "A decorative candle burning in a beautiful holder, with a few small flowers nearby."],
      ["universal-15", "An elegant envelope with a heart-shaped seal, accompanied by a small flower and a ribbon."],
      ["universal-16", "A beautiful golden bell with a simple decorative bow and a few delicate leaves."],
      ["universal-17", "A large elegant fabric bow with flowing ribbon ends and a small flower."],
      ["universal-18", "A colorful open umbrella with a few falling raindrops and small flowers nearby."],
      ["universal-19", "Several soft white clouds floating in a light blue sky above gentle green hills."],
      ["universal-20", "A charming small birdhouse on a branch surrounded by green leaves and flowers."]
    ]
  }
];


const args = process.argv.slice(2);
const limitIndex = args.indexOf("--limit");
const groupIndex = args.indexOf("--group");

const limit = limitIndex >= 0
  ? Math.max(1, Number(args[limitIndex + 1]) || 1)
  : 1;

const selectedGroup = groupIndex >= 0
  ? args[groupIndex + 1]
  : null;

if (selectedGroup && !groups.some(group => group.id === selectedGroup)) {
  console.error("Неизвестная группа:", selectedGroup);
  console.error("Доступны:", groups.map(group => group.id).join(", "));
  process.exit(1);
}

const jobs = groups
  .filter(group => !selectedGroup || group.id === selectedGroup)
  .flatMap(group => group.images.map(([id, subject]) => ({
    id,
    group: group.id,
    prompt: style + "\n" + subject
  })));

fs.mkdirSync(OUTPUT, { recursive: true });

const pending = jobs.filter(job =>
  !fs.existsSync(path.join(OUTPUT, job.group, `${job.id}.webp`))
);

const batch = pending.slice(0, limit);

console.log("Всего в библиотеке Cloudflare:", jobs.length);
console.log("Уже готово:", jobs.length - pending.length);
console.log("Осталось:", pending.length);
console.log("В этой обработке:", batch.length);

function logResult(entry) {
  fs.appendFileSync(LOG, JSON.stringify({
    timestamp: new Date().toISOString(),
    ...entry
  }) + "\n");
}

async function generate(job) {
  const folder = path.join(OUTPUT, job.group);
  const outputFile = path.join(folder, `${job.id}.webp`);

  fs.mkdirSync(folder, { recursive: true });

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`\n${job.id}: запрос ${attempt}/3`);

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: job.prompt,
            steps: 4
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success || !data.result?.image) {
        const message = JSON.stringify(data.errors ?? data);
        throw new Error(`Cloudflare HTTP ${response.status}: ${message}`);
      }

      const png = Buffer.from(data.result.image, "base64");

      await sharp(png)
        .resize(640, 640, { fit: "cover" })
        .webp({ quality: 82 })
        .toFile(outputFile);

      const size = fs.statSync(outputFile).size;

      console.log(`УСПЕХ: ${job.id}.webp (${size} байт)`);

      logResult({
        id: job.id,
        group: job.group,
        status: "success",
        bytes: size
      });

      return true;

    } catch (error) {
      console.error(`Ошибка ${job.id}:`, error.message);

      logResult({
        id: job.id,
        group: job.group,
        status: "error",
        attempt,
        message: error.message
      });

      if (attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  return false;
}

let success = 0;
let failed = 0;

for (const job of batch) {
  if (await generate(job)) {
    success++;
  } else {
    failed++;
  }

  await new Promise(resolve => setTimeout(resolve, 2000));
}

console.log("\n--- ИТОГ ---");
console.log("Успешно:", success);
console.log("Ошибок:", failed);
console.log("Журнал:", LOG);
