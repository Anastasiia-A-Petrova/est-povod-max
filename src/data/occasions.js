const occasions = [
  // =========================================================
  // ЯНВАРЬ
  // =========================================================

  {
    id: 'old-new-year',
    date: '01-14',
    title: 'Старый Новый год',
    description:
      'Тёплый неофициальный повод ещё раз поздравить близких с началом года.',
    category: 'tradition',
    categoryLabel: 'Традиции',
    icon: '🎄',
    calendar: 'secular',
    type: 'tradition',
    priority: 76,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям'],
  },

  // =========================================================
  // ФЕВРАЛЬ
  // =========================================================

  {
    id: 'valentines-day',
    date: '02-14',
    title: 'День святого Валентина',
    description:
      'Неформальный повод сказать близкому человеку о своих чувствах.',
    category: 'love',
    categoryLabel: 'Любовь',
    icon: '💌',
    calendar: 'secular',
    type: 'love',
    priority: 86,
    congratulatable: true,
    recipients: ['Любимым'],
  },

  {
    id: 'mother-language-day',
    date: '02-21',
    title: 'Международный день родного языка',
    description:
      'День языкового и культурного многообразия.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '🔤',
    calendar: 'secular',
    type: 'culture',
    priority: 62,
    congratulatable: false,
    recipients: [],
  },

  // =========================================================
  // МАРТ
  // =========================================================

  {
    id: 'pi-day',
    date: '03-14',
    title: 'День числа π',
    description:
      'Необычный день для любителей математики, науки и красивых чисел.',
    category: 'science',
    categoryLabel: 'Наука',
    icon: 'π',
    calendar: 'secular',
    type: 'science',
    priority: 67,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'happiness-day',
    date: '03-20',
    title: 'Международный день счастья',
    description:
      'Хороший повод напомнить близким, что счастье складывается из маленьких вещей.',
    category: 'kindness',
    categoryLabel: 'Добрые поводы',
    icon: '☀️',
    calendar: 'secular',
    type: 'kindness',
    priority: 84,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям'],
  },

  {
    id: 'poetry-day',
    date: '03-21',
    title: 'Всемирный день поэзии',
    description:
      'Повод отправить кому-нибудь любимое стихотворение.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '📖',
    calendar: 'secular',
    type: 'culture',
    priority: 73,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'theatre-day',
    date: '03-27',
    title: 'Всемирный день театра',
    description:
      'Праздник театрального искусства и всех, кто создаёт спектакли.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '🎭',
    calendar: 'secular',
    type: 'culture',
    priority: 74,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  // =========================================================
  // АПРЕЛЬ
  // =========================================================

  {
    id: 'april-fools',
    date: '04-01',
    title: 'День смеха',
    description:
      'Самый несерьёзный день года и отличный повод отправить кому-нибудь улыбку.',
    category: 'fun',
    categoryLabel: 'Необычные',
    icon: '🤡',
    calendar: 'secular',
    type: 'fun',
    priority: 82,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'cosmonautics-day',
    date: '04-12',
    title: 'День космонавтики',
    description:
      'Памятная дата, связанная с первым полётом человека в космос.',
    category: 'science',
    categoryLabel: 'Наука',
    icon: '🚀',
    calendar: 'secular',
    type: 'science',
    priority: 88,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  {
    id: 'art-day',
    date: '04-15',
    title: 'Всемирный день искусства',
    description:
      'Повод посмотреть на что-нибудь красивое или поделиться любимым произведением.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '🎨',
    calendar: 'secular',
    type: 'culture',
    priority: 70,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'book-day',
    date: '04-23',
    title: 'Всемирный день книги',
    description:
      'Праздник книг, чтения и авторов.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '📚',
    calendar: 'secular',
    type: 'culture',
    priority: 78,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  // 🔥 ПРОФЕССИОНАЛЬНЫЙ

  {
    id: 'firefighters-day',
    date: '04-30',
    title: 'День пожарной охраны',
    description:
      'Профессиональный праздник сотрудников пожарной охраны и всех, кто занимается предотвращением и ликвидацией пожаров.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🚒',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Пожарным', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'dance-day',
    date: '04-29',
    title: 'Международный день танца',
    description:
      'Повод включить музыку и немного подвигаться.',
    category: 'fun',
    categoryLabel: 'Необычные',
    icon: '💃',
    calendar: 'secular',
    type: 'fun',
    priority: 72,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'earth-day',
    date: '04-22',
    title: 'День Земли',
    description:
      'День, посвящённый нашей планете, природе и заботе об окружающей среде.',
    category: 'nature',
    categoryLabel: 'Природа',
    icon: '🌍',
    calendar: 'secular',
    type: 'nature',
    priority: 74,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  // =========================================================
  // МАЙ
  // =========================================================

  {
    id: 'family-day-international',
    date: '05-15',
    title: 'Международный день семей',
    description:
      'Повод провести время с близкими и напомнить им о своей любви.',
    category: 'family',
    categoryLabel: 'Семейные',
    icon: '❤️',
    calendar: 'secular',
    type: 'family',
    priority: 84,
    congratulatable: true,
    recipients: ['Родным'],
  },

  {
    id: 'museum-day',
    date: '05-18',
    title: 'Международный день музеев',
    description:
      'Хороший повод сходить в музей или открыть для себя новую коллекцию.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '🏛️',
    calendar: 'secular',
    type: 'culture',
    priority: 68,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'tea-day',
    date: '05-21',
    title: 'Международный день чая',
    description:
      'Идеальный повод устроить маленькое чаепитие.',
    category: 'fun',
    categoryLabel: 'Необычные',
    icon: '🍵',
    calendar: 'secular',
    type: 'fun',
    priority: 76,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям'],
  },

  {
    id: 'slavic-writing-day',
    date: '05-24',
    title: 'День славянской письменности и культуры',
    description:
      'Праздник славянской письменности, культуры и духовного наследия.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '📖',
    calendar: 'secular',
    type: 'culture',
    priority: 78,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  // =========================================================
  // ИЮНЬ
  // =========================================================

  {
    id: 'children-day',
    date: '06-01',
    title: 'День защиты детей',
    description:
      'День, посвящённый детям, их благополучию и правам.',
    category: 'family',
    categoryLabel: 'Семейные',
    icon: '🧸',
    calendar: 'secular',
    type: 'family',
    priority: 84,
    congratulatable: true,
    recipients: ['Родным'],
  },

  {
    id: 'environment-day',
    date: '06-05',
    title: 'Всемирный день окружающей среды',
    description:
      'Повод вспомнить о природе и о том, как мы можем заботиться о ней.',
    category: 'nature',
    categoryLabel: 'Природа',
    icon: '🌿',
    calendar: 'secular',
    type: 'nature',
    priority: 66,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'russian-language-day',
    date: '06-06',
    title: 'День русского языка',
    description:
      'Праздник русского языка и день рождения Александра Пушкина.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '✍️',
    calendar: 'secular',
    type: 'culture',
    priority: 82,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'oceans-day',
    date: '06-08',
    title: 'Всемирный день океанов',
    description:
      'Повод вспомнить о морях, океанах и их обитателях.',
    category: 'nature',
    categoryLabel: 'Природа',
    icon: '🌊',
    calendar: 'secular',
    type: 'nature',
    priority: 65,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  // 🩺 ПРОФЕССИОНАЛЬНЫЙ

  {
    id: 'medical-worker-day',
    dateRule: {
      type: 'nthWeekday',
      month: 6,
      weekday: 0,
      occurrence: 3,
    },
    title: 'День медицинского работника',
    description:
      'Профессиональный праздник врачей, медицинских сестёр, фельдшеров и всех работников здравоохранения.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🩺',
    calendar: 'secular',
    type: 'professional',
    priority: 98,
    congratulatable: true,
    recipients: ['Медикам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'youth-day',
    date: '06-27',
    title: 'День молодёжи',
    description:
      'Российский праздник молодых людей, энергии и новых идей.',
    category: 'social',
    categoryLabel: 'Общие',
    icon: '✨',
    calendar: 'secular',
    type: 'social',
    priority: 78,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'friends-day',
    date: '06-09',
    title: 'День друзей',
    description:
      'Добрый повод вспомнить о друзьях и сказать им несколько тёплых слов.',
    category: 'friendship',
    categoryLabel: 'Дружба',
    icon: '🤝',
    calendar: 'secular',
    type: 'friendship',
    priority: 80,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  // =========================================================
  // ИЮЛЬ
  // =========================================================

  {
    id: 'family-love-fidelity',
    date: '07-08',
    title: 'День семьи, любви и верности',
    description:
      'Российский праздник, посвящённый семейным ценностям.',
    category: 'family',
    categoryLabel: 'Семейные',
    icon: '🌼',
    calendar: 'secular',
    type: 'family',
    priority: 94,
    congratulatable: true,
    recipients: ['Родным', 'Любимым'],
  },

  {
    id: 'chess-day',
    date: '07-20',
    title: 'Международный день шахмат',
    description:
      'Повод сыграть партию или бросить кому-нибудь интеллектуальный вызов.',
    category: 'hobby',
    categoryLabel: 'Хобби',
    icon: '♟️',
    calendar: 'secular',
    type: 'hobby',
    priority: 70,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'friendship-day',
    date: '07-30',
    title: 'Международный день дружбы',
    description:
      'Прекрасный повод написать человеку, с которым давно не общались.',
    category: 'friendship',
    categoryLabel: 'Дружба',
    icon: '🫶',
    calendar: 'secular',
    type: 'friendship',
    priority: 88,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'navy-day',
    dateRule: {
      type: 'lastWeekday',
      month: 7,
      weekday: 0,
    },
    title: 'День Военно-Морского Флота',
    description:
      'Праздник военных моряков и всех, кто связан с Военно-Морским Флотом.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⚓',
    calendar: 'secular',
    type: 'professional',
    priority: 84,
    congratulatable: true,
    recipients: ['Морякам', 'Военным', 'Родным'],
  },

  // =========================================================
  // АВГУСТ
  // =========================================================

  // 🏗️ ПРОФЕССИОНАЛЬНЫЙ

  {
    id: 'builder-day',
    dateRule: {
      type: 'nthWeekday',
      month: 8,
      weekday: 0,
      occurrence: 2,
    },
    title: 'День строителя',
    description:
      'Профессиональный праздник работников строительной отрасли: строителей, инженеров, проектировщиков и всех, кто создаёт здания и инфраструктуру.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🏗️',
    calendar: 'secular',
    type: 'professional',
    priority: 96,
    congratulatable: true,
    recipients: ['Строителям', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'photography-day',
    date: '08-19',
    title: 'Всемирный день фотографии',
    description:
      'Повод пересмотреть любимые фотографии или сделать новый снимок.',
    category: 'creative',
    categoryLabel: 'Творчество',
    icon: '📷',
    calendar: 'secular',
    type: 'creative',
    priority: 74,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'cinema-day',
    date: '08-27',
    title: 'День российского кино',
    description:
      'Повод выбрать фильм и устроить домашний киносеанс.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '🎬',
    calendar: 'secular',
    type: 'culture',
    priority: 78,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'russian-flag-day',
    date: '08-22',
    title: 'День Государственного флага России',
    description:
      'Праздник одного из главных государственных символов России.',
    category: 'state',
    categoryLabel: 'Государственные',
    icon: '🇷🇺',
    calendar: 'secular',
    type: 'official',
    priority: 82,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  // =========================================================
  // СЕНТЯБРЬ
  // =========================================================

  {
    id: 'knowledge-day',
    date: '09-01',
    title: 'День знаний',
    description:
      'Первый день нового учебного года и повод пожелать успехов в учёбе.',
    category: 'education',
    categoryLabel: 'Образование',
    icon: '📚',
    calendar: 'secular',
    type: 'education',
    priority: 86,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  {
    id: 'literacy-day',
    date: '09-08',
    title: 'Международный день грамотности',
    description:
      'День, посвящённый грамотности и доступу к образованию.',
    category: 'education',
    categoryLabel: 'Образование',
    icon: '🔤',
    calendar: 'secular',
    type: 'education',
    priority: 64,
    congratulatable: false,
    recipients: [],
  },

  {
    id: 'programmer-day',
    dateRule: {
      type: 'dayOfYear',
      day: 256,
    },
    title: 'День программиста',
    description:
      'Профессиональный праздник разработчиков и всех, кто работает с кодом.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '💻',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Коллегам', 'Друзьям'],
  },

  // 🌐 ПРОФЕССИОНАЛЬНЫЙ

  {
    id: 'translator-day',
    date: '09-30',
    title: 'Международный день переводчика',
    description:
      'Профессиональный праздник переводчиков и специалистов, которые помогают людям понимать друг друга на разных языках.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🌐',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Переводчикам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'peace-day',
    date: '09-21',
    title: 'Международный день мира',
    description:
      'День, посвящённый миру и ненасилию.',
    category: 'social',
    categoryLabel: 'Общие',
    icon: '🕊️',
    calendar: 'secular',
    type: 'social',
    priority: 72,
    congratulatable: false,
    recipients: [],
  },

  {
    id: 'tourism-day',
    date: '09-27',
    title: 'Всемирный день туризма',
    description:
      'Повод вспомнить любимые поездки или начать планировать новую.',
    category: 'travel',
    categoryLabel: 'Путешествия',
    icon: '🧳',
    calendar: 'secular',
    type: 'travel',
    priority: 76,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  // =========================================================
  // ОКТЯБРЬ
  // =========================================================

  {
    id: 'coffee-day',
    date: '10-01',
    title: 'Международный день кофе',
    description:
      'Самый уютный повод встретиться за чашкой кофе.',
    category: 'fun',
    categoryLabel: 'Необычные',
    icon: '☕',
    calendar: 'secular',
    type: 'fun',
    priority: 82,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'older-persons-day',
    date: '10-01',
    title: 'Международный день пожилых людей',
    description:
      'Повод позвонить старшим родственникам и подарить им немного внимания.',
    category: 'family',
    categoryLabel: 'Семейные',
    icon: '🌷',
    calendar: 'secular',
    type: 'family',
    priority: 83,
    congratulatable: true,
    recipients: ['Родным'],
  },

  {
    id: 'animal-day',
    date: '10-04',
    title: 'Всемирный день животных',
    description:
      'Повод вспомнить о наших домашних любимцах и других животных.',
    category: 'nature',
    categoryLabel: 'Природа',
    icon: '🐾',
    calendar: 'secular',
    type: 'nature',
    priority: 80,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям'],
  },

  {
    id: 'teacher-day',
    date: '10-05',
    title: 'День учителя',
    description:
      'Профессиональный праздник работников сферы образования.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📚',
    calendar: 'secular',
    type: 'professional',
    priority: 100,
    congratulatable: true,
    recipients: ['Учителям', 'Коллегам'],
  },

  {
    id: 'smile-day',
    dateRule: {
      type: 'nthWeekday',
      month: 10,
      weekday: 5,
      occurrence: 1,
    },
    title: 'Всемирный день улыбки',
    description:
      'Первую пятницу октября можно посвятить хорошему настроению.',
    category: 'fun',
    categoryLabel: 'Необычные',
    icon: '😊',
    calendar: 'secular',
    type: 'fun',
    priority: 86,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям'],
  },

  {
    id: 'food-day',
    date: '10-16',
    title: 'Всемирный день продовольствия',
    description:
      'День, посвящённый продовольствию, питанию и продовольственной безопасности.',
    category: 'social',
    categoryLabel: 'Общие',
    icon: '🍎',
    calendar: 'secular',
    type: 'social',
    priority: 60,
    congratulatable: false,
    recipients: [],
  },

  {
    id: 'lyceum-day',
    date: '10-19',
    title: 'Всероссийский день лицеиста',
    description:
      'Памятная дата, связанная с историей образования и Царскосельским лицеем.',
    category: 'education',
    categoryLabel: 'Образование',
    icon: '🎓',
    calendar: 'secular',
    type: 'education',
    priority: 68,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'animation-day',
    date: '10-28',
    title: 'Международный день анимации',
    description:
      'Праздник художников, аниматоров и любителей мультфильмов.',
    category: 'creative',
    categoryLabel: 'Творчество',
    icon: '🎞️',
    calendar: 'secular',
    type: 'creative',
    priority: 72,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'halloween',
    date: '10-31',
    title: 'Хэллоуин',
    description:
      'Популярный неформальный праздник с костюмами, украшениями и немного страшным настроением.',
    category: 'fun',
    categoryLabel: 'Необычные',
    icon: '🎃',
    calendar: 'secular',
    type: 'fun',
    priority: 86,
    congratulatable: true,
    recipients: ['Друзьям'],
  },

  {
    id: 'fathers-day',
    dateRule: {
      type: 'nthWeekday',
      month: 10,
      weekday: 0,
      occurrence: 3,
    },
    title: 'День отца',
    description:
      'Тёплый семейный праздник в честь пап и отцовства.',
    category: 'family',
    categoryLabel: 'Семейные',
    icon: '👨‍👧‍👦',
    calendar: 'secular',
    type: 'family',
    priority: 88,
    congratulatable: true,
    recipients: ['Папе', 'Родным'],
  },

  {
    id: 'motorist-day',
    dateRule: {
      type: 'lastWeekday',
      month: 10,
      weekday: 0,
    },
    title: 'День автомобилиста',
    description:
      'Профессиональный праздник водителей и всех, кто связан с автомобильным транспортом.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🚗',
    calendar: 'secular',
    type: 'professional',
    priority: 78,
    congratulatable: true,
    recipients: ['Водителям', 'Автомобилистам', 'Коллегам'],
  },

  // =========================================================
  // НОЯБРЬ
  // =========================================================

  {
    id: 'kindness-day',
    date: '11-13',
    title: 'Всемирный день доброты',
    description:
      'Простой повод сделать что-нибудь хорошее для другого человека.',
    category: 'kindness',
    categoryLabel: 'Добрые поводы',
    icon: '💛',
    calendar: 'secular',
    type: 'kindness',
    priority: 86,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям'],
  },

  {
    id: 'tolerance-day',
    date: '11-16',
    title: 'Международный день толерантности',
    description:
      'День уважения к многообразию людей и культур.',
    category: 'social',
    categoryLabel: 'Общие',
    icon: '🌍',
    calendar: 'secular',
    type: 'social',
    priority: 60,
    congratulatable: false,
    recipients: [],
  },

  {
    id: 'childrens-day-universal',
    date: '11-20',
    title: 'Всемирный день ребёнка',
    description:
      'День, посвящённый благополучию и правам детей.',
    category: 'family',
    categoryLabel: 'Семейные',
    icon: '🧸',
    calendar: 'secular',
    type: 'family',
    priority: 76,
    congratulatable: true,
    recipients: ['Родным'],
  },

  // 📊 ПРОФЕССИОНАЛЬНЫЙ

  {
    id: 'accountant-day',
    date: '11-21',
    title: 'День бухгалтера',
    description:
      'Профессиональный праздник бухгалтеров и специалистов, работающих с финансовым учётом.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📊',
    calendar: 'secular',
    type: 'professional',
    priority: 96,
    congratulatable: true,
    recipients: ['Бухгалтерам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'mothers-day',
    dateRule: {
      type: 'lastWeekday',
      month: 11,
      weekday: 0,
    },
    title: 'День матери',
    description:
      'Российский праздник, который отмечается в последнее воскресенье ноября.',
    category: 'family',
    categoryLabel: 'Семейные',
    icon: '💐',
    calendar: 'secular',
    type: 'family',
    priority: 100,
    congratulatable: true,
    recipients: ['Мамам'],
  },

  {
    id: 'computer-security-day',
    date: '11-30',
    title: 'День компьютерной безопасности',
    description:
      'Повод вспомнить о паролях, резервных копиях и цифровой безопасности.',
    category: 'technology',
    categoryLabel: 'Технологии',
    icon: '🔐',
    calendar: 'secular',
    type: 'technology',
    priority: 68,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  // =========================================================
  // ДЕКАБРЬ
  // =========================================================

  {
    id: 'volunteer-day',
    date: '12-05',
    title: 'Международный день добровольцев',
    description:
      'День людей, которые помогают другим и делают что-то хорошее просто потому, что могут.',
    category: 'kindness',
    categoryLabel: 'Добрые поводы',
    icon: '🤝',
    calendar: 'secular',
    type: 'kindness',
    priority: 70,
    congratulatable: true,
    recipients: ['Друзьям', 'Коллегам'],
  },

  {
    id: 'constitution-day',
    date: '12-12',
    title: 'День Конституции России',
    description:
      'Памятная дата, посвящённая Конституции Российской Федерации.',
    category: 'state',
    categoryLabel: 'Государственные',
    icon: '📜',
    calendar: 'secular',
    type: 'official',
    priority: 78,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  {
    id: 'human-rights-day',
    date: '12-10',
    title: 'День прав человека',
    description:
      'Международный день, посвящённый правам и свободам человека.',
    category: 'social',
    categoryLabel: 'Общие',
    icon: '🕊️',
    calendar: 'secular',
    type: 'social',
    priority: 64,
    congratulatable: false,
    recipients: [],
  },

  // ⚡ ПРОФЕССИОНАЛЬНЫЙ

  {
    id: 'energy-day',
    date: '12-22',
    title: 'День энергетика',
    description:
      'Профессиональный праздник работников энергетической отрасли.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⚡',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Энергетикам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'new-years-eve',
    date: '12-31',
    title: 'Канун Нового года',
    description:
      'День последних приготовлений, подарков и ожидания полуночи.',
    category: 'tradition',
    categoryLabel: 'Традиции',
    icon: '✨',
    calendar: 'secular',
    type: 'tradition',
    priority: 98,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям', 'Коллегам'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — ЯНВАРЬ
  // =========================================================

  {
    id: 'nature-reserves-day',
    date: '01-11',
    title: 'День заповедников и национальных парков',
    description:
      'Российский экологический праздник, посвящённый заповедникам, национальным паркам и людям, которые сохраняют природу.',
    category: 'nature',
    categoryLabel: 'Природа',
    icon: '🌲',
    calendar: 'secular',
    type: 'nature',
    priority: 72,
    congratulatable: true,
    recipients: ['Экологам', 'Друзьям', 'Коллегам'],
  },

  {
    id: 'prosecutors-day',
    date: '01-12',
    title: 'День работника прокуратуры',
    description:
      'Профессиональный праздник работников прокуратуры Российской Федерации.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⚖️',
    calendar: 'secular',
    type: 'professional',
    priority: 88,
    congratulatable: true,
    recipients: ['Работникам прокуратуры', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'russian-press-day',
    date: '01-13',
    title: 'День российской печати',
    description:
      'Профессиональный праздник журналистов, редакторов, издателей и работников средств массовой информации.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📰',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Журналистам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'hug-day',
    date: '01-21',
    title: 'Международный день объятий',
    description:
      'Тёплый повод обнять близкого человека или отправить ему несколько добрых слов.',
    category: 'kindness',
    categoryLabel: 'Добрые поводы',
    icon: '🤗',
    calendar: 'secular',
    type: 'kindness',
    priority: 88,
    congratulatable: true,
    recipients: ['Родным', 'Любимым', 'Друзьям'],
  },

  {
    id: 'customs-international-day',
    date: '01-26',
    title: 'Международный день таможенника',
    description:
      'Профессиональный праздник сотрудников таможенных служб разных стран.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🛃',
    calendar: 'secular',
    type: 'professional',
    priority: 82,
    congratulatable: true,
    recipients: ['Таможенникам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'russian-students-day',
    date: '01-25',
    title: 'День российского студенчества',
    description:
      'Праздник российских студентов, также известный как Татьянин день.',
    category: 'education',
    categoryLabel: 'Образование',
    icon: '🎓',
    calendar: 'secular',
    type: 'education',
    priority: 96,
    congratulatable: true,
    recipients: ['Студентам', 'Одногруппникам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — ФЕВРАЛЬ
  // =========================================================

  {
    id: 'russian-science-day',
    date: '02-08',
    title: 'День российской науки',
    description:
      'Праздник учёных, исследователей и всех, кто занимается развитием российской науки.',
    category: 'science',
    categoryLabel: 'Наука',
    icon: '🔬',
    calendar: 'secular',
    type: 'science',
    priority: 90,
    congratulatable: true,
    recipients: ['Учёным', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'dentist-day',
    date: '02-09',
    title: 'Международный день стоматолога',
    description:
      'Профессиональный праздник стоматологов и специалистов стоматологической сферы.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🦷',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Стоматологам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'diplomatic-worker-day',
    date: '02-10',
    title: 'День дипломатического работника',
    description:
      'Профессиональный праздник российских дипломатов и работников дипломатической службы.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🌐',
    calendar: 'secular',
    type: 'professional',
    priority: 82,
    congratulatable: true,
    recipients: ['Дипломатам', 'Коллегам'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — МАРТ
  // =========================================================

  {
    id: 'cats-day-russia',
    date: '03-01',
    title: 'День кошек в России',
    description:
      'Добрый неофициальный праздник домашних кошек и всех, кто их любит.',
    category: 'fun',
    categoryLabel: 'Необычные',
    icon: '🐈',
    calendar: 'secular',
    type: 'fun',
    priority: 88,
    congratulatable: true,
    recipients: ['Друзьям', 'Любителям кошек'],
  },

  {
    id: 'writers-day',
    date: '03-03',
    title: 'Всемирный день писателя',
    description:
      'Праздник писателей, авторов и всех, кто создаёт литературные произведения.',
    category: 'creative',
    categoryLabel: 'Творчество',
    icon: '✍️',
    calendar: 'secular',
    type: 'creative',
    priority: 80,
    congratulatable: true,
    recipients: ['Писателям', 'Друзьям', 'Коллегам'],
  },

  {
    id: 'culture-worker-day',
    date: '03-25',
    title: 'День работника культуры',
    description:
      'Профессиональный праздник работников культуры, искусства, музеев, библиотек и творческих учреждений.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🎭',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Работникам культуры', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — АПРЕЛЬ
  // =========================================================

  {
    id: 'geologist-day',
    dateRule: {
      type: 'nthWeekday',
      month: 4,
      weekday: 0,
      occurrence: 1,
    },
    title: 'День геолога',
    description:
      'Профессиональный праздник геологов и специалистов, связанных с изучением и освоением недр.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⛏️',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Геологам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'childrens-book-day',
    date: '04-02',
    title: 'Международный день детской книги',
    description:
      'Праздник детской литературы, книг и любви к чтению с самого детства.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '📚',
    calendar: 'secular',
    type: 'culture',
    priority: 76,
    congratulatable: true,
    recipients: ['Родным', 'Друзьям'],
  },

  {
    id: 'health-day',
    date: '04-07',
    title: 'Всемирный день здоровья',
    description:
      'Международный день, посвящённый здоровью и заботе о качестве жизни.',
    category: 'social',
    categoryLabel: 'Общие',
    icon: '❤️‍🩹',
    calendar: 'secular',
    type: 'social',
    priority: 72,
    congratulatable: false,
    recipients: [],
  },

  {
    id: 'russian-animation-day',
    date: '04-08',
    title: 'День российской анимации',
    description:
      'Профессиональный праздник российских аниматоров и всех, кто создаёт мультфильмы.',
    category: 'creative',
    categoryLabel: 'Творчество',
    icon: '🎞️',
    calendar: 'secular',
    type: 'creative',
    priority: 82,
    congratulatable: true,
    recipients: ['Аниматорам', 'Друзьям', 'Коллегам'],
  },

  {
    id: 'monuments-day',
    date: '04-18',
    title: 'Международный день памятников и исторических мест',
    description:
      'День, посвящённый сохранению культурного наследия, памятников и исторических мест.',
    category: 'culture',
    categoryLabel: 'Культура',
    icon: '🏛️',
    calendar: 'secular',
    type: 'culture',
    priority: 66,
    congratulatable: false,
    recipients: [],
  },

  {
    id: 'occupational-safety-day',
    date: '04-28',
    title: 'Всемирный день охраны труда',
    description:
      'Международный день, посвящённый безопасности и охране здоровья людей на рабочем месте.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⛑️',
    calendar: 'secular',
    type: 'professional',
    priority: 70,
    congratulatable: false,
    recipients: [],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — МАЙ
  // =========================================================

  {
    id: 'radio-day',
    date: '05-07',
    title: 'День радио',
    description:
      'Профессиональный праздник работников радио, телевидения, связи и всех, кто связан с развитием коммуникаций.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📻',
    calendar: 'secular',
    type: 'professional',
    priority: 88,
    congratulatable: true,
    recipients: ['Работникам связи', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'nurses-day',
    date: '05-12',
    title: 'Международный день медицинской сестры',
    description:
      'Профессиональный праздник медицинских сестёр и братьев, ежедневно заботящихся о пациентах.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🩺',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Медсёстрам', 'Медикам', 'Коллегам'],
  },

  {
    id: 'philologist-day',
    date: '05-25',
    title: 'День филолога',
    description:
      'Профессиональный праздник филологов, преподавателей языка и литературы, переводчиков и исследователей языка.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📖',
    calendar: 'secular',
    type: 'professional',
    priority: 86,
    congratulatable: true,
    recipients: ['Филологам', 'Преподавателям', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'entrepreneur-day',
    date: '05-26',
    title: 'День российского предпринимательства',
    description:
      'Профессиональный праздник предпринимателей и людей, развивающих собственное дело.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '💼',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Предпринимателям', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'libraries-day',
    date: '05-27',
    title: 'Общероссийский день библиотек',
    description:
      'Профессиональный праздник библиотекарей и всех, кто сохраняет книги и помогает читателям находить их.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📚',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Библиотекарям', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'chemist-day',
    dateRule: {
      type: 'lastWeekday',
      month: 5,
      weekday: 0,
    },
    title: 'День химика',
    description:
      'Профессиональный праздник работников химической и нефтехимической промышленности.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🧪',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Химикам', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — ИЮНЬ
  // =========================================================

  {
    id: 'social-worker-day',
    date: '06-08',
    title: 'День социального работника',
    description:
      'Профессиональный праздник людей, которые помогают пожилым, семьям, детям и всем, кому нужна социальная поддержка.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🤝',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Социальным работникам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'shipbuilder-day',
    date: '06-29',
    title: 'День кораблестроителя',
    description:
      'Профессиональный праздник работников судостроительной промышленности России.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🚢',
    calendar: 'secular',
    type: 'professional',
    priority: 86,
    congratulatable: true,
    recipients: ['Кораблестроителям', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — ИЮЛЬ
  // =========================================================

  {
    id: 'traffic-police-day',
    date: '07-03',
    title: 'День ГАИ (ГИБДД)',
    description:
      'Профессиональный праздник сотрудников Государственной инспекции безопасности дорожного движения.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🚔',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Сотрудникам ГИБДД', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'russian-post-day',
    dateRule: {
      type: 'nthWeekday',
      month: 7,
      weekday: 0,
      occurrence: 2,
    },
    title: 'День российской почты',
    description:
      'Профессиональный праздник работников почтовой связи России.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📮',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Работникам почты', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'metallurgist-day',
    dateRule: {
      type: 'nthWeekday',
      month: 7,
      weekday: 0,
      occurrence: 3,
    },
    title: 'День металлурга',
    description:
      'Профессиональный праздник работников металлургической промышленности.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🔥',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Металлургам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'trade-workers-day',
    dateRule: {
      type: 'nthWeekday',
      month: 7,
      weekday: 6,
      occurrence: 4,
    },
    title: 'День работника торговли',
    description:
      'Профессиональный праздник работников торговли и сферы обслуживания.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🛍️',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Работникам торговли', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — АВГУСТ
  // =========================================================

  {
    id: 'railway-workers-day',
    dateRule: {
      type: 'nthWeekday',
      month: 8,
      weekday: 0,
      occurrence: 1,
    },
    title: 'День железнодорожника',
    description:
      'Профессиональный праздник работников железнодорожного транспорта России.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🚂',
    calendar: 'secular',
    type: 'professional',
    priority: 96,
    congratulatable: true,
    recipients: ['Железнодорожникам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'archaeologist-day',
    date: '08-15',
    title: 'День археолога',
    description:
      'Профессиональный праздник археологов и исследователей прошлого.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🏺',
    calendar: 'secular',
    type: 'professional',
    priority: 86,
    congratulatable: true,
    recipients: ['Археологам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'miners-day',
    dateRule: {
      type: 'lastWeekday',
      month: 8,
      weekday: 0,
    },
    title: 'День шахтёра',
    description:
      'Профессиональный праздник работников угольной промышленности и горнодобывающей отрасли.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⛏️',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Шахтёрам', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — СЕНТЯБРЬ
  // =========================================================

  {
    id: 'financier-day',
    date: '09-08',
    title: 'День финансиста',
    description:
      'Профессиональный праздник специалистов финансовой сферы России.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '💰',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Финансистам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'tester-day',
    date: '09-09',
    title: 'День тестировщика',
    description:
      'Неформальный профессиональный праздник специалистов по тестированию программного обеспечения.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🐞',
    calendar: 'secular',
    type: 'professional',
    priority: 88,
    congratulatable: true,
    recipients: ['Тестировщикам', 'IT-специалистам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'hairdresser-day',
    date: '09-13',
    title: 'День парикмахера',
    description:
      'Профессиональный праздник парикмахеров, стилистов и мастеров индустрии красоты.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '✂️',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Парикмахерам', 'Стилистам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'machine-builder-day',
    dateRule: {
      type: 'lastWeekday',
      month: 9,
      weekday: 0,
    },
    title: 'День машиностроителя',
    description:
      'Профессиональный праздник работников машиностроительной промышленности.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⚙️',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Машиностроителям', 'Инженерам', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — ОКТЯБРЬ
  // =========================================================

  {
    id: 'agriculture-workers-day',
    dateRule: {
      type: 'nthWeekday',
      month: 10,
      weekday: 0,
      occurrence: 2,
    },
    title: 'День работника сельского хозяйства',
    description:
      'Профессиональный праздник работников сельского хозяйства и перерабатывающей промышленности.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🌾',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Работникам сельского хозяйства', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'road-workers-day',
    dateRule: {
      type: 'nthWeekday',
      month: 10,
      weekday: 0,
      occurrence: 3,
    },
    title: 'День работников дорожного хозяйства',
    description:
      'Профессиональный праздник тех, кто строит, ремонтирует и обслуживает дороги, мосты и дорожную инфраструктуру.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🛣️',
    calendar: 'secular',
    type: 'professional',
    priority: 96,
    congratulatable: true,
    recipients: ['Дорожникам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'food-industry-workers-day',
    dateRule: {
      type: 'nthWeekday',
      month: 10,
      weekday: 0,
      occurrence: 3,
    },
    title: 'День работников пищевой промышленности',
    description:
      'Профессиональный праздник работников предприятий пищевой промышленности России.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🥫',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Работникам пищевой промышленности', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'chefs-day',
    date: '10-20',
    title: 'Международный день повара',
    description:
      'Профессиональный праздник поваров, кулинаров и всех, кто превращает приготовление еды в искусство.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '👨‍🍳',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Поварам', 'Кулинарам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'advertising-workers-day',
    date: '10-23',
    title: 'День работников рекламы',
    description:
      'Профессиональный праздник специалистов рекламы, маркетинга и коммуникаций.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📣',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Рекламистам', 'Маркетологам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'russian-customs-day',
    date: '10-25',
    title: 'День таможенника Российской Федерации',
    description:
      'Профессиональный праздник сотрудников таможенных органов России.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🛃',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Таможенникам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'coach-day',
    date: '10-30',
    title: 'День тренера',
    description:
      'Профессиональный праздник тренеров, наставников и специалистов спортивной подготовки.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🏅',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Тренерам', 'Наставникам', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — НОЯБРЬ
  // =========================================================

  {
    id: 'police-day-russia',
    date: '11-10',
    title: 'День сотрудника органов внутренних дел',
    description:
      'Профессиональный праздник сотрудников органов внутренних дел Российской Федерации.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '👮',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Сотрудникам МВД', 'Полицейским', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'economist-day',
    date: '11-11',
    title: 'День экономиста',
    description:
      'Профессиональный праздник российских специалистов в области экономики.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '📈',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Экономистам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'speech-therapist-day',
    date: '11-14',
    title: 'Международный день логопеда',
    description:
      'Профессиональный праздник логопедов и специалистов по коррекции речи.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🗣️',
    calendar: 'secular',
    type: 'professional',
    priority: 88,
    congratulatable: true,
    recipients: ['Логопедам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'international-students-day',
    date: '11-17',
    title: 'Международный день студентов',
    description:
      'Международный день студенчества, объединяющий учащихся высших учебных заведений разных стран.',
    category: 'education',
    categoryLabel: 'Образование',
    icon: '🎓',
    calendar: 'secular',
    type: 'education',
    priority: 88,
    congratulatable: true,
    recipients: ['Студентам', 'Друзьям'],
  },

  {
    id: 'mens-day',
    date: '11-19',
    title: 'Международный мужской день',
    description:
      'Международный день, посвящённый мужчинам, их роли в семье и обществе.',
    category: 'social',
    categoryLabel: 'Общие',
    icon: '👨',
    calendar: 'secular',
    type: 'social',
    priority: 86,
    congratulatable: true,
    recipients: ['Мужчинам', 'Родным', 'Любимым', 'Друзьям'],
  },

  {
    id: 'university-teacher-day',
    date: '11-19',
    title: 'День преподавателя высшей школы',
    description:
      'Профессиональный праздник преподавателей российских вузов.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '👩‍🏫',
    calendar: 'secular',
    type: 'professional',
    priority: 90,
    congratulatable: true,
    recipients: ['Преподавателям', 'Коллегам'],
  },

  {
    id: 'psychologist-day',
    date: '11-22',
    title: 'День психолога',
    description:
      'Профессиональный праздник российских психологов и специалистов психологической службы.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🧠',
    calendar: 'secular',
    type: 'professional',
    priority: 92,
    congratulatable: true,
    recipients: ['Психологам', 'Коллегам', 'Друзьям'],
  },

  // =========================================================
  // ДОПОЛНИТЕЛЬНЫЕ ПРАЗДНИКИ — ДЕКАБРЬ
  // =========================================================

  {
    id: 'lawyer-day',
    date: '12-03',
    title: 'День юриста',
    description:
      'Профессиональный праздник российских юристов и специалистов в области права.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '⚖️',
    calendar: 'secular',
    type: 'professional',
    priority: 94,
    congratulatable: true,
    recipients: ['Юристам', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'informatics-day',
    date: '12-04',
    title: 'День информатики в России',
    description:
      'Памятная дата, связанная с историей отечественной вычислительной техники и информатики.',
    category: 'technology',
    categoryLabel: 'Технологии',
    icon: '💻',
    calendar: 'secular',
    type: 'technology',
    priority: 84,
    congratulatable: true,
    recipients: ['IT-специалистам', 'Программистам', 'Друзьям', 'Коллегам'],
  },

  {
    id: 'registry-office-workers-day',
    date: '12-18',
    title: 'День работников органов ЗАГС',
    description:
      'Профессиональный праздник работников органов записи актов гражданского состояния.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '💍',
    calendar: 'secular',
    type: 'professional',
    priority: 88,
    congratulatable: true,
    recipients: ['Работникам ЗАГС', 'Коллегам', 'Друзьям'],
  },

  {
    id: 'rescuer-day',
    date: '12-27',
    title: 'День спасателя Российской Федерации',
    description:
      'Профессиональный праздник российских спасателей и сотрудников аварийно-спасательных служб.',
    category: 'professional',
    categoryLabel: 'Профессиональные',
    icon: '🛟',
    calendar: 'secular',
    type: 'professional',
    priority: 96,
    congratulatable: true,
    recipients: ['Спасателям', 'Коллегам', 'Друзьям'],
  },
]

export default occasions

