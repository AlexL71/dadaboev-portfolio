// All interface copy for the site, in one place per language.
// Long-form writing (project notes, essays, books) lives in src/pages as markdown.

export type Locale = 'en' | 'ko' | 'ru';

export const locales: Locale[] = ['en', 'ko', 'ru'];

export const EMAIL = 'dadaboev170998@gmail.com';

export const links = {
  github: 'https://github.com/AlexL71',
  linkedin: 'https://www.linkedin.com/in/abdurakhmon-dadaboev/',
  kaggle: 'https://www.kaggle.com/alexl98',
};

export const localePath = (locale: Locale, path = '/') => {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}/` : `/${locale}${path}`;
};

export const getLocale = (pathname: string): Locale => {
  if (pathname === '/ko' || pathname.startsWith('/ko/')) return 'ko';
  if (pathname === '/ru' || pathname.startsWith('/ru/')) return 'ru';
  return 'en';
};

const monthNames: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ko: [],
  ru: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
};

/** "2025-12-17" -> "Dec 2025" / "2025.12" / "дек. 2025" */
export const formatMonth = (date: string | undefined, locale: Locale) => {
  if (!date) return '';
  const [year, month] = date.split('-');
  const m = Number(month);
  if (!year || !m) return date;
  if (locale === 'ko') return `${year}.${month}`;
  return `${monthNames[locale][m - 1]} ${year}`;
};

/* ------------------------------------------------------------------
   Layout: header, footer, project-note labels
------------------------------------------------------------------- */
export const ui = {
  en: {
    siteDescription: 'Abdurakhmon (Alex) Dadaboev is a computer vision engineer in Sejong, South Korea, working on road-image data, segmentation, image retrieval, and offline OCR.',
    skip: 'Skip to content',
    homeLabel: 'Home',
    navLabel: 'Main',
    languageLabel: 'Language',
    themeLabel: 'Switch light or dark theme',
    nav: [
      { href: '/about', label: 'About' },
      { href: '/research-and-projects', label: 'Projects' },
      { href: '/resume', label: 'Resume' },
    ],
    footerRole: 'Computer vision engineer in Sejong, South Korea.',
    footerCta: 'The quickest way to reach me is email.',
    email: 'Email',
    reading: 'Books',
    externalLinks: 'Elsewhere',
    builtWith: 'Built with Astro',
    backToProjects: 'All projects',
    backToEssays: 'All essays',
    summaryLabel: 'Project summary',
    summary: { challenge: 'The problem', role: 'What I did', result: 'Result', status: 'Status' },
    details: 'Full technical write-up',
  },
  ko: {
    siteDescription: '도로 이미지 데이터, 세그멘테이션, 유사 이미지 검색, 오프라인 OCR을 다루는 컴퓨터 비전 엔지니어 다다버예브 압두라흐먼(Alex)의 포트폴리오입니다.',
    skip: '본문으로 건너뛰기',
    homeLabel: '홈',
    navLabel: '주 메뉴',
    languageLabel: '언어',
    themeLabel: '밝은 테마 또는 어두운 테마로 전환',
    nav: [
      { href: '/ko/about', label: '소개' },
      { href: '/ko/research-and-projects', label: '프로젝트' },
      { href: '/ko/resume', label: '이력서' },
    ],
    footerRole: '세종에서 일하는 컴퓨터 비전 엔지니어입니다.',
    footerCta: '이메일로 연락 주시면 가장 빨리 답장드립니다.',
    email: '이메일',
    reading: '읽은 책',
    externalLinks: '다른 곳의 저',
    builtWith: 'Astro로 제작',
    backToProjects: '전체 프로젝트',
    backToEssays: '전체 에세이',
    summaryLabel: '프로젝트 요약',
    summary: { challenge: '풀어야 했던 문제', role: '맡은 일', result: '결과', status: '현재 상태' },
    details: '기술 상세 보기',
  },
  ru: {
    siteDescription: 'Абдурахмон (Алекс) Дадабоев — инженер по компьютерному зрению из Седжона (Южная Корея). Дорожные данные, сегментация, поиск изображений и офлайн-OCR.',
    skip: 'Перейти к содержанию',
    homeLabel: 'Главная',
    navLabel: 'Основное меню',
    languageLabel: 'Язык',
    themeLabel: 'Переключить светлую или тёмную тему',
    nav: [
      { href: '/ru/about', label: 'Обо мне' },
      { href: '/ru/research-and-projects', label: 'Проекты' },
      { href: '/ru/resume', label: 'Резюме' },
    ],
    footerRole: 'Инженер по компьютерному зрению, Седжон, Южная Корея.',
    footerCta: 'Быстрее всего со мной можно связаться по почте.',
    email: 'Почта',
    reading: 'Книги',
    externalLinks: 'Я в сети',
    builtWith: 'Сделано на Astro',
    backToProjects: 'Все проекты',
    backToEssays: 'Все эссе',
    summaryLabel: 'Кратко о проекте',
    summary: { challenge: 'Задача', role: 'Что я сделал', result: 'Результат', status: 'Статус' },
    details: 'Подробное техническое описание',
  },
} as const;

/* ------------------------------------------------------------------
   Education (shared by home, about, resume)
------------------------------------------------------------------- */
export type EducationItem = {
  institution: 'korea-university' | 'sun-moon-university' | 'sun-moon-language-institute';
  degree: string;
  school: string;
  href: string;
  period: string;
  note: string;
};

export const education: Record<Locale, EducationItem[]> = {
  en: [
    { institution: 'korea-university', degree: 'M.S. in Big Data Science', school: 'Korea University, Sejong', href: 'https://bigdatascience.korea.ac.kr/', period: '2024 – Aug 2026', note: 'GPA 4.46 / 4.5' },
    { institution: 'sun-moon-university', degree: 'B.S. in Electronic Engineering', school: 'Sun Moon University', href: 'https://electric.sunmoon.ac.kr/', period: '2019 – 2023', note: 'GPA 4.18 / 4.5' },
    { institution: 'sun-moon-language-institute', degree: 'Korean Language Program', school: 'Sun Moon University Korean Language Institute', href: 'https://kli.sunmoon.ac.kr/new_en/web/page1-1.asp', period: 'Sep 2017 – Dec 2018', note: 'Finished Level 7, the top class · TOPIK Level 6' },
  ],
  ko: [
    { institution: 'korea-university', degree: '빅데이터사이언스 석사', school: '고려대학교 세종캠퍼스', href: 'https://bigdatascience.korea.ac.kr/', period: '2024 – 2026.08', note: '학점 4.46 / 4.5' },
    { institution: 'sun-moon-university', degree: '전자공학 학사', school: '선문대학교', href: 'https://electric.sunmoon.ac.kr/', period: '2019 – 2023', note: '학점 4.18 / 4.5' },
    { institution: 'sun-moon-language-institute', degree: '한국어 정규과정', school: '선문대학교 한국어교육원', href: 'https://kli.sunmoon.ac.kr/new/web/page1-1.asp', period: '2017.09 – 2018.12', note: '최고급반(7단계) 수료 · TOPIK 6급' },
  ],
  ru: [
    { institution: 'korea-university', degree: 'Магистр, Big Data Science', school: 'Университет Корё, кампус Седжон', href: 'https://bigdatascience.korea.ac.kr/', period: '2024 – авг. 2026', note: 'GPA 4,46 / 4,5' },
    { institution: 'sun-moon-university', degree: 'Бакалавр, электроника', school: 'Университет Сонмун', href: 'https://electric.sunmoon.ac.kr/', period: '2019 – 2023', note: 'GPA 4,18 / 4,5' },
    { institution: 'sun-moon-language-institute', degree: 'Программа корейского языка', school: 'Институт корейского языка Университета Сонмун', href: 'https://kli.sunmoon.ac.kr/new_en/web/page1-1.asp', period: 'сент. 2017 – дек. 2018', note: 'Окончил высший, 7-й уровень · TOPIK 6' },
  ],
};

/* ------------------------------------------------------------------
   Home
------------------------------------------------------------------- */
export const home = {
  en: {
    title: 'Abdurakhmon Dadaboev',
    greeting: 'Hi, I’m Alex',
    name: 'Abdurakhmon Dadaboev',
    role: 'Computer vision engineer',
    lede: 'I build vision systems end to end, from collecting and cleaning the data to checking whether the model really works. Lately that means road-image datasets, crack segmentation, image retrieval, and OCR that runs entirely offline.',
    lede2: 'The parts I care about most are the unglamorous ones: data you can trust, tests that don’t flatter the model, and an easy way for a person to check results before anyone relies on them.',
    portraitAlt: 'Portrait of Abdurakhmon Dadaboev',
    facts: ['Sejong, South Korea', 'M.S. Big Data Science, Korea University', 'B.S. Electronic Engineering'],
    ctaResume: 'Resume',
    ctaProjects: 'See my projects',
    metricsLabel: 'Highlights',
    metrics: [
      { value: '0.91', label: 'recall on road damage, measured by an independent test lab', href: '/research-and-projects/road-damage-detection' },
      { value: '62.8%', label: 'of the multi-sensor accuracy gap closed with RGB alone (IEEE, 2025)', href: '/research-and-projects/semantic-segmentation-modality-reduction' },
      { value: '27 : 1', label: 'missed defects recovered for every one lost, presented at CVGAI 2026', href: '/research-and-projects/amorphous-bottleneck' },
      { value: 'TOPIK 6', label: 'the top level of Korean. I also work in English, Russian, and Uzbek', href: '/about' },
    ],
    nowTitle: 'What I’m working on',
    nowLink: 'Full experience',
    now: [
      { when: 'Since Jul 2026', title: 'North American road data', org: 'Hyundai Motor Genesis Chassis Test Team · Vegas · Korea University', text: 'I pull road imagery from Mapillary, filter it by region, capture date, and resolution, and use DINOv3 with FAISS to find similar scenes. A small review tool leaves the final call on each image to a person.', href: '/research-and-projects/north-american-road-data' },
      { when: 'Since Feb 2026', title: 'Offline exam OCR', org: 'Big Data Mining Lab · Korea University', text: 'One desktop app that straightens scanned exam sheets, matches them to students, reads the marks and handwriting, and stores the results. None of the data leaves the machine.', href: '/research-and-projects/omr-htr-digitization' },
    ],
    workTitle: 'Selected work',
    workLink: 'All projects',
    work: [
      { slug: 'road-damage-detection', meta: '2025 · Independently tested', title: 'Road damage segmentation', text: 'Box labels couldn’t describe thin cracks, so I switched the dataset to polygons and built the segmentation and severity pipeline on top. An outside lab measured 0.91 recall against a 0.90 target.', metric: '0.91', metricLabel: 'recall' },
      { slug: 'semantic-segmentation-modality-reduction', meta: '2025 · IEEE publication', title: 'Segmentation without the extra sensors', text: 'We trained an RGB-only model to imitate a teacher that also sees near-infrared and LiDAR. It recovered most of the lost accuracy, and the biggest gains came on rare classes like shrubs.', metric: '62.8%', metricLabel: 'gap closed' },
      { slug: 'amorphous-bottleneck', meta: '2026 · CVGAI 2026', title: 'The Amorphous Bottleneck', text: 'An ensemble of augmentation “specialists” for faint, shapeless defects. Recall went up 7.7 points, and when I checked the ensemble’s false alarms by hand, 95% were real defects the annotators had missed.', metric: '+7.7 pp', metricLabel: 'recall' },
    ],
    backgroundTitle: 'Background',
    educationTitle: 'Education',
    toolboxTitle: 'Toolbox',
    toolbox: [
      { title: 'Vision', text: 'Segmentation, classification, image retrieval, OCR and OMR, knowledge distillation' },
      { title: 'Data', text: 'Collection pipelines, metadata filters, de-duplication, labeling guidelines, review tools' },
      { title: 'Stack', text: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git' },
    ],
    contactTitle: 'Say hello',
    contactText: 'If you’re working on something where the data is messy and the results matter, I’d be glad to hear about it.',
  },
  ko: {
    title: '다다버예브 압두라흐먼',
    greeting: '안녕하세요, Alex입니다',
    name: '다다버예브 압두라흐먼',
    role: '컴퓨터 비전 엔지니어',
    lede: '데이터를 모으고 정리하는 일부터 모델이 실제로 제대로 동작하는지 확인하는 일까지, 컴퓨터 비전 시스템을 처음부터 끝까지 만듭니다. 요즘은 도로 이미지 데이터셋, 균열 세그멘테이션, 유사 이미지 검색, 인터넷 없이 돌아가는 OCR을 주로 다룹니다.',
    lede2: '제가 가장 신경 쓰는 건 눈에 잘 띄지 않는 부분입니다. 믿을 수 있는 데이터, 모델을 부풀리지 않는 평가, 그리고 결과를 쓰기 전에 사람이 쉽게 확인할 수 있는 방법이요.',
    portraitAlt: '다다버예브 압두라흐먼 사진',
    facts: ['대한민국 세종', '고려대학교 빅데이터사이언스 석사', '선문대학교 전자공학 학사'],
    ctaResume: '이력서',
    ctaProjects: '프로젝트 보기',
    metricsLabel: '주요 성과',
    metrics: [
      { value: '0.91', label: '외부 시험기관이 측정한 도로 손상 검출 재현율(Recall)', href: '/ko/research-and-projects/road-damage-detection' },
      { value: '62.8%', label: 'RGB 영상만으로 좁힌 멀티센서 모델과의 성능 격차 (IEEE, 2025)', href: '/ko/research-and-projects/semantic-segmentation-modality-reduction' },
      { value: '27 : 1', label: '놓쳤던 결함을 새로 찾은 건수 대 새로 놓친 건수 (CVGAI 2026 발표)', href: '/ko/research-and-projects/amorphous-bottleneck' },
      { value: 'TOPIK 6급', label: '한국어 최고 등급. 영어·러시아어·우즈베크어로도 일합니다', href: '/ko/about' },
    ],
    nowTitle: '지금 하고 있는 일',
    nowLink: '전체 경력',
    now: [
      { when: '2026.07 –', title: '북미 도로 데이터 구축', org: '현대자동차 제네시스샤시시험팀 · ㈜베가스 · 고려대학교', text: 'Mapillary에서 도로 이미지를 모아 지역, 촬영 시기, 해상도 조건으로 거르고 DINOv3와 FAISS로 비슷한 장면을 찾습니다. 이미지를 데이터셋에 넣을지는 검수 도구에서 사람이 한 장씩 최종 판단합니다.', href: '/ko/research-and-projects/north-american-road-data' },
      { when: '2026.02 –', title: '오프라인 시험지 OCR', org: '고려대학교 Big Data Mining Lab', text: '스캔한 시험지를 반듯하게 펴고, 학생 정보와 맞추고, 마킹과 손글씨를 읽어 결과를 저장하는 데스크톱 프로그램입니다. 데이터는 PC 밖으로 나가지 않습니다.', href: '/ko/research-and-projects/omr-htr-digitization' },
    ],
    workTitle: '대표 프로젝트',
    workLink: '전체 프로젝트',
    work: [
      { slug: 'road-damage-detection', meta: '2025 · 외부 성능 검증', title: '도로 손상 세그멘테이션', text: '가는 균열은 박스로 제대로 표시할 수 없어서 라벨을 폴리곤으로 바꾸고, 그 위에 세그멘테이션과 심각도 분류 파이프라인을 만들었습니다. 외부 시험에서 목표치 0.90을 넘는 재현율 0.91을 받았습니다.', metric: '0.91', metricLabel: '재현율' },
      { slug: 'semantic-segmentation-modality-reduction', meta: '2025 · IEEE 논문', title: '추가 센서 없는 세그멘테이션', text: '근적외선(NIR)과 LiDAR까지 보는 교사 모델을 RGB만 보는 학생 모델이 따라 배우도록 했습니다. 잃었던 성능 대부분을 되찾았고, 관목처럼 드문 클래스에서 개선 폭이 가장 컸습니다.', metric: '62.8%', metricLabel: '격차 감소' },
      { slug: 'amorphous-bottleneck', meta: '2026 · CVGAI 2026 발표', title: 'Amorphous Bottleneck', text: '흐릿하고 형태가 일정하지 않은 결함을 찾기 위해 증강 기법별 전문 모델을 앙상블했습니다. 재현율이 7.7%p 올랐고, 오탐으로 분류된 결과를 직접 확인해 보니 95%는 라벨러가 놓친 실제 결함이었습니다.', metric: '+7.7%p', metricLabel: '재현율' },
    ],
    backgroundTitle: '배경',
    educationTitle: '학력',
    toolboxTitle: '다루는 기술',
    toolbox: [
      { title: '비전', text: '세그멘테이션, 분류, 유사 이미지 검색, OCR·OMR, 지식 증류' },
      { title: '데이터', text: '수집 파이프라인, 메타데이터 필터링, 중복 제거, 라벨링 가이드, 검수 도구' },
      { title: '도구', text: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git' },
    ],
    contactTitle: '연락하기',
    contactText: '데이터는 복잡하고 결과는 중요한 일을 하고 계신다면 꼭 이야기 나눠 보고 싶습니다.',
  },
  ru: {
    title: 'Абдурахмон Дадабоев',
    greeting: 'Привет, я Алекс',
    name: 'Абдурахмон Дадабоев',
    role: 'Инженер по компьютерному зрению',
    lede: 'Я делаю системы компьютерного зрения целиком: от сбора и очистки данных до проверки того, действительно ли модель работает. Сейчас это наборы дорожных изображений, сегментация трещин, поиск похожих изображений и OCR, которому не нужен интернет.',
    lede2: 'Больше всего я ценю незаметную часть работы: данные, которым можно доверять, тесты, которые не приукрашивают модель, и простой способ для человека проверить результат, прежде чем на него положиться.',
    portraitAlt: 'Фотография Абдурахмона Дадабоева',
    facts: ['Седжон, Южная Корея', 'Магистратура Big Data Science, Университет Корё', 'Бакалавриат по электронике'],
    ctaResume: 'Резюме',
    ctaProjects: 'Мои проекты',
    metricsLabel: 'Главное',
    metrics: [
      { value: '0,91', label: 'полнота (recall) по дорожным повреждениям, измеренная независимой лабораторией', href: '/ru/research-and-projects/road-damage-detection' },
      { value: '62,8%', label: 'разрыва с мультисенсорной моделью удалось закрыть одним RGB (IEEE, 2025)', href: '/ru/research-and-projects/semantic-segmentation-modality-reduction' },
      { value: '27 : 1', label: 'найденных пропусков на один новый пропуск — доклад на CVGAI 2026', href: '/ru/research-and-projects/amorphous-bottleneck' },
      { value: 'TOPIK 6', label: 'высший уровень корейского. Также работаю на английском, русском и узбекском', href: '/ru/about' },
    ],
    nowTitle: 'Чем я занят сейчас',
    nowLink: 'Весь опыт',
    now: [
      { when: 'с июля 2026', title: 'Дорожные данные Северной Америки', org: 'Hyundai Motor Genesis Chassis Test Team · Vegas · Университет Корё', text: 'Собираю дорожные снимки из Mapillary, фильтрую их по региону, дате съёмки и разрешению, а похожие сцены ищу с помощью DINOv3 и FAISS. Окончательное решение по каждому снимку принимает человек в небольшом инструменте проверки.', href: '/ru/research-and-projects/north-american-road-data' },
      { when: 'с февраля 2026', title: 'Офлайн-OCR для экзаменов', org: 'Big Data Mining Lab · Университет Корё', text: 'Настольное приложение, которое выравнивает отсканированные бланки, сопоставляет их со студентами, распознаёт отметки и рукописный текст и сохраняет результаты. Данные не покидают компьютер.', href: '/ru/research-and-projects/omr-htr-digitization' },
    ],
    workTitle: 'Избранные работы',
    workLink: 'Все проекты',
    work: [
      { slug: 'road-damage-detection', meta: '2025 · Независимая проверка', title: 'Сегментация дорожных повреждений', text: 'Прямоугольники плохо описывают тонкие трещины, поэтому я перевёл разметку на полигоны и построил поверх неё сегментацию и оценку степени повреждения. Внешняя лаборатория намерила полноту 0,91 при цели 0,90.', metric: '0,91', metricLabel: 'полнота' },
      { slug: 'semantic-segmentation-modality-reduction', meta: '2025 · Публикация IEEE', title: 'Сегментация без дополнительных сенсоров', text: 'Мы научили RGB-модель подражать учителю, который видит ещё ближний ИК и LiDAR. Она вернула большую часть потерянной точности, а сильнее всего выросли редкие классы вроде кустарников.', metric: '62,8%', metricLabel: 'разрыва закрыто' },
      { slug: 'amorphous-bottleneck', meta: '2026 · CVGAI 2026', title: 'The Amorphous Bottleneck', text: 'Ансамбль «специалистов» по аугментациям для слабых дефектов без чёткой формы. Полнота выросла на 7,7 п. п., а когда я вручную проверил ложные срабатывания, 95% из них оказались настоящими дефектами, которые пропустили разметчики.', metric: '+7,7 п. п.', metricLabel: 'полнота' },
    ],
    backgroundTitle: 'Образование и навыки',
    educationTitle: 'Образование',
    toolboxTitle: 'Инструменты',
    toolbox: [
      { title: 'Зрение', text: 'Сегментация, классификация, поиск изображений, OCR и OMR, дистилляция знаний' },
      { title: 'Данные', text: 'Пайплайны сбора, фильтрация по метаданным, удаление дубликатов, правила разметки, инструменты проверки' },
      { title: 'Стек', text: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git' },
    ],
    contactTitle: 'Напишите мне',
    contactText: 'Если вы работаете над задачей, где данные запутанные, а от результата многое зависит, буду рад о ней услышать.',
  },
} as const;

/* ------------------------------------------------------------------
   About
------------------------------------------------------------------- */
export const about = {
  en: {
    title: 'About',
    description: 'Background, interests, and experience of Abdurakhmon (Alex) Dadaboev, computer vision engineer.',
    eyebrow: 'About',
    heading: 'A bit about me',
    portraitAlt: 'Abdurakhmon Dadaboev',
    bio: [
      'I started out in art and technical automation, then studied electronic engineering. Art taught me to look closely at shapes, edges, and small details. Engineering taught me how separate parts turn into one working system. Computer vision turned out to be the place where both habits are useful.',
      'I came to South Korea on my own and learned Korean from scratch. Along the way I studied, worked as an interpreter, and represented Uzbek students at my university. That taught me to ask plain questions, listen properly, and work with people whose background is nothing like mine.',
      'These days I work on road-image data, segmentation, image retrieval, and offline OCR. I usually start by looking hard at the data and talking to whoever will use the result, then build something that can be tested and checked by a person. I don’t mind unfamiliar territory. I would rather find out early what I don’t know than discover it after the system is in use.',
    ],
    links: { resume: 'Resume', projects: 'Projects' },
    interestsTitle: 'What I’m interested in',
    interests: [
      { title: 'Computer vision', text: 'Segmentation, classification, image retrieval, OCR, and knowledge distillation.' },
      { title: 'Data curation', text: 'Collection rules, metadata filters, duplicate checks, labeling guidelines, and tools for human review.' },
      { title: 'Systems that ship', text: 'Offline inference, tight memory budgets, API workflows, reproducible evaluation, and structured outputs.' },
    ],
    timelineTitle: 'Experience',
    timeline: [
      { when: 'Jul 2026 – now', title: 'North American road data and auto-labeling', org: 'Hyundai Motor Genesis Chassis Test Team · Vegas · Korea University', text: 'Building a repeatable way to collect road images, find the useful ones, and have a person review them.' },
      { when: 'Jul 2026', title: 'AI Vision Research Intern', org: 'Youngchang Labs', text: 'Built and analysed road-image datasets and worked on computer vision models.' },
      { when: 'Feb 2026 – now', title: 'Offline exam OCR system', org: 'Big Data Mining Lab · Korea University', text: 'One local app that matches students, reads their answers, and stores the results without sending data anywhere.' },
      { when: 'Mar – Dec 2025', title: 'Road damage detection research', org: 'Crowdsourcing-based mobility support project (R2320973)', text: 'Reworked how irregular cracks were labeled and built a system that passed independent performance testing.' },
      { when: 'Sep 2024 – Dec 2025', title: 'Graduate teaching assistant', org: 'Department of Big Data Science · Korea University', text: 'Helped teach text mining, deep learning, statistics, and multivariate analysis.' },
    ],
    educationTitle: 'Education',
    languagesTitle: 'Languages',
    languages: 'Uzbek (native), Korean (TOPIK 6), English, and Russian.',
    toolsTitle: 'Everyday tools',
    tools: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git, and Jupyter.',
  },
  ko: {
    title: '소개',
    description: '컴퓨터 비전 엔지니어 다다버예브 압두라흐먼의 배경, 관심 분야, 경력을 소개합니다.',
    eyebrow: '소개',
    heading: '저는 이런 사람입니다',
    portraitAlt: '다다버예브 압두라흐먼',
    bio: [
      '미술과 기술 자동화를 먼저 공부한 뒤 전자공학을 전공했습니다. 미술에서는 형태와 경계, 작은 디테일을 오래 들여다보는 습관을 얻었고, 공학에서는 따로 떨어진 부품이 하나의 시스템으로 움직이는 원리를 배웠습니다. 컴퓨터 비전은 이 두 습관이 모두 쓸모 있는 분야였습니다.',
      '혼자 한국에 와서 한국어를 처음부터 배웠습니다. 공부하면서 통역을 하고, 대학에서는 우즈베키스탄 유학생 대표로 활동했습니다. 그 시간 동안 쉬운 말로 묻고, 상대의 말을 끝까지 듣고, 배경이 전혀 다른 사람들과 함께 일하는 법을 익혔습니다.',
      '지금은 도로 이미지 데이터, 세그멘테이션, 유사 이미지 검색, 오프라인 OCR을 연구하고 개발합니다. 보통 데이터를 꼼꼼히 들여다보고 결과를 실제로 쓸 사람과 먼저 이야기한 다음, 시험해 볼 수 있고 사람이 확인할 수 있는 형태로 만듭니다. 낯선 분야도 두렵지 않습니다. 모르는 부분은 시스템을 쓰기 시작한 뒤가 아니라 초기에 발견하는 편이 훨씬 낫다고 생각합니다.',
    ],
    links: { resume: '이력서', projects: '프로젝트' },
    interestsTitle: '관심 분야',
    interests: [
      { title: '컴퓨터 비전', text: '이미지 세그멘테이션, 분류, 유사 이미지 검색, OCR, 지식 증류.' },
      { title: '데이터 큐레이션', text: '수집 기준, 메타데이터 필터링, 중복 확인, 라벨링 가이드, 사람이 검수하는 도구.' },
      { title: '실제로 쓰이는 시스템', text: '오프라인 추론, 제한된 메모리, API 워크플로, 재현 가능한 평가, 구조화된 출력.' },
    ],
    timelineTitle: '경력',
    timeline: [
      { when: '2026.07 – 현재', title: '북미 도로 데이터 구축 및 자동 라벨링', org: '현대자동차 제네시스샤시시험팀 · ㈜베가스 · 고려대학교', text: '도로 이미지를 모으고, 쓸 만한 이미지를 골라내고, 사람이 검수하는 과정을 반복 가능한 형태로 만들고 있습니다.' },
      { when: '2026.07', title: 'AI 비전 연구 인턴', org: '㈜영창랩스', text: '도로 이미지 데이터셋을 구축·분석하고 컴퓨터 비전 모델 개발에 참여했습니다.' },
      { when: '2026.02 – 현재', title: '오프라인 시험지 OCR 시스템', org: '고려대학교 Big Data Mining Lab', text: '학생 정보 매칭, 답안 인식, 결과 저장을 외부 전송 없이 처리하는 로컬 프로그램을 만들고 있습니다.' },
      { when: '2025.03 – 2025.12', title: '도로 손상 탐지 연구', org: '크라우드소싱 기반 모빌리티 지원 과제 (R2320973)', text: '불규칙한 균열의 라벨링 방식을 바꾸고, 외부 성능 시험을 통과한 시스템을 개발했습니다.' },
      { when: '2024.09 – 2025.12', title: '대학원 조교', org: '고려대학교 빅데이터사이언스학부', text: '텍스트 마이닝, 딥러닝, 통계학, 다변량 분석 수업을 도왔습니다.' },
    ],
    educationTitle: '학력',
    languagesTitle: '언어',
    languages: '우즈베크어(모국어), 한국어(TOPIK 6급), 영어, 러시아어.',
    toolsTitle: '자주 쓰는 도구',
    tools: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git, Jupyter.',
  },
  ru: {
    title: 'Обо мне',
    description: 'Биография, интересы и опыт Абдурахмона (Алекса) Дадабоева, инженера по компьютерному зрению.',
    eyebrow: 'Обо мне',
    heading: 'Немного о себе',
    portraitAlt: 'Абдурахмон Дадабоев',
    bio: [
      'Начинал я с рисования и технической автоматизации, а потом изучал электронику. Рисование приучило меня внимательно смотреть на форму, границы и мелкие детали. Инженерия научила понимать, как отдельные части складываются в работающую систему. Компьютерное зрение оказалось местом, где пригодилось и то и другое.',
      'В Корею я приехал сам и выучил корейский с нуля. Параллельно учился, работал переводчиком и представлял узбекских студентов в университете. Это научило меня задавать простые вопросы, внимательно слушать и работать с людьми совсем другого опыта и культуры.',
      'Сейчас я занимаюсь дорожными данными, сегментацией, поиском изображений и офлайн-OCR. Обычно начинаю с того, что внимательно изучаю данные и разговариваю с теми, кто будет пользоваться результатом, а потом строю то, что можно протестировать и проверить вручную. Незнакомые области меня не пугают: лучше рано понять, чего я не знаю, чем обнаружить это, когда системой уже пользуются.',
    ],
    links: { resume: 'Резюме', projects: 'Проекты' },
    interestsTitle: 'Что мне интересно',
    interests: [
      { title: 'Компьютерное зрение', text: 'Сегментация, классификация, поиск изображений, OCR и дистилляция знаний.' },
      { title: 'Работа с данными', text: 'Правила сбора, фильтры по метаданным, поиск дубликатов, правила разметки и инструменты ручной проверки.' },
      { title: 'Системы для реальной работы', text: 'Офлайн-инференс, ограниченная память, API-процессы, воспроизводимая оценка и структурированный вывод.' },
    ],
    timelineTitle: 'Опыт',
    timeline: [
      { when: 'июль 2026 – сейчас', title: 'Дорожные данные Северной Америки и автоматическая разметка', org: 'Hyundai Motor Genesis Chassis Test Team · Vegas · Университет Корё', text: 'Строю повторяемый процесс: собрать дорожные снимки, отобрать полезные и отдать их на проверку человеку.' },
      { when: 'июль 2026', title: 'Стажёр-исследователь по компьютерному зрению', org: 'Youngchang Labs', text: 'Собирал и анализировал наборы дорожных изображений, работал над моделями компьютерного зрения.' },
      { when: 'февр. 2026 – сейчас', title: 'Офлайн-OCR для экзаменов', org: 'Big Data Mining Lab · Университет Корё', text: 'Локальное приложение, которое сопоставляет студентов, распознаёт ответы и сохраняет результаты, никуда не отправляя данные.' },
      { when: 'март – дек. 2025', title: 'Исследование дорожных повреждений', org: 'Проект поддержки мобильности на основе краудсорсинга (R2320973)', text: 'Переделал разметку трещин неправильной формы и построил систему, прошедшую независимые испытания.' },
      { when: 'сент. 2024 – дек. 2025', title: 'Ассистент преподавателя', org: 'Кафедра Big Data Science · Университет Корё', text: 'Помогал вести курсы по анализу текста, глубокому обучению, статистике и многомерному анализу.' },
    ],
    educationTitle: 'Образование',
    languagesTitle: 'Языки',
    languages: 'Узбекский (родной), корейский (TOPIK 6), английский и русский.',
    toolsTitle: 'Рабочие инструменты',
    tools: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git и Jupyter.',
  },
} as const;

/* ------------------------------------------------------------------
   Resume
------------------------------------------------------------------- */
type ResumeEntry = { title: string; org: string; when: string; bullets?: string[]; text?: string };

export const resume: Record<Locale, {
  title: string; description: string; eyebrow: string; name: string; role: string; summary: string;
  location: string; print: string;
  experienceTitle: string; experience: ResumeEntry[];
  researchTitle: string; research: ResumeEntry[];
  educationTitle: string;
  skillsTitle: string; skills: { title: string; text: string }[];
  languagesTitle: string; languages: { name: string; level: string }[];
  awardsTitle: string; awards: { name: string; year: string }[];
  leadershipTitle: string; leadership: string;
}> = {
  en: {
    title: 'Resume',
    description: 'Resume of Abdurakhmon (Alex) Dadaboev, computer vision engineer with experience in road-data pipelines, segmentation, OCR, and applied machine learning.',
    eyebrow: 'Resume · updated September 2026',
    name: 'Abdurakhmon Dadaboev',
    role: 'Computer vision engineer',
    summary: 'I work across the whole vision pipeline: data collection, model development, evaluation, and human review. Recent work includes an independently tested road-damage model, an IEEE paper on knowledge distillation, a road-image data pipeline built with industry partners, and an offline OCR system.',
    location: 'Sejong, South Korea',
    print: 'Print or save as PDF',
    experienceTitle: 'Experience',
    experience: [
      { title: 'AI Vision Research Intern', org: 'Youngchang Labs', when: 'Jul 2026', bullets: [
        'Built and reviewed road-image datasets for computer vision research.',
        'Delivered a reusable Mapillary workflow for collecting North American road scenes.',
      ] },
      { title: 'North American Road Data & Auto-Labeling', org: 'Hyundai Motor Genesis Chassis Test Team · Vegas · Korea University', when: 'Jul 2026 – present', bullets: [
        'Designed a repeatable collection process driven by location, capture date, and image-quality requirements.',
        'Connected DINOv3 + FAISS similarity search to a review tool, so reviewers can find useful road scenes quickly and confirm each one.',
      ] },
      { title: 'Offline Exam OCR System', org: 'Big Data Mining Lab · Korea University', when: 'Feb 2026 – present', bullets: [
        'Designed one offline workflow covering page alignment, student matching, answer recognition, and result storage.',
        'Kept student data on the local machine and made manual review and correction part of the normal workflow.',
      ] },
      { title: 'AI Vision Researcher', org: 'Crowdsourcing-based Mobility Support · Project R2320973', when: 'Mar – Dec 2025', bullets: [
        'Led the vision work and replaced box labels with polygons, which fit thin, irregular cracks far better.',
        'Built the segmentation and severity-classification pipeline.',
        'Reached 0.91 recall (91% of road damage found) against a 0.90 target in AIWORKX test report TWR-202512-A-0072.',
      ] },
      { title: 'Graduate Teaching Assistant', org: 'Department of Big Data Science · Korea University', when: 'Sep 2024 – Dec 2025', bullets: [
        'Assisted with courses in text mining, deep learning, statistics, and multivariate analysis.',
        'Wrote hands-on materials, mentored student teams, and helped in class in both Korean and English.',
      ] },
    ],
    researchTitle: 'Research & selected work',
    research: [
      { title: 'The Amorphous Bottleneck: A Recall-Optimized Ensemble for Anomaly Detection', org: 'CVGAI 2026 · SPIE Proceedings (in press)', when: '2026', text: 'Presented an ensemble for faint, irregular road defects. It raised operational recall by 7.7 points on 591 held-out images, recovering 27 missed defects for every one it lost.' },
      { title: 'Efficient Semantic Segmentation: Leveraging Knowledge Distillation for Modality Reduction', org: 'AEECA 2025 · Dalian, China · IEEE Xplore', when: 'Aug 2025', text: 'Co-authored paper. Our RGB-only student reached 0.6002 mIoU and closed 62.8% of the gap to the multi-sensor teacher.' },
      { title: 'AI Hub Image Data Education Framework', org: 'Eco-Up Innovation Fusion University · Project R2320813', when: 'Sep 2024 – Jan 2025', text: 'Reviewed the data specs for six AI Hub domains and built one Python framework for exploring, preprocessing, and modeling image data.' },
      { title: 'Embedded systems projects', org: 'Sun Moon University', when: '2021 – 2022', text: 'Built an Arduino hexapod robot and a Raspberry Pi ball launcher that aims with OpenCV, combining sensors, motor control, and circuit design.' },
    ],
    educationTitle: 'Education',
    skillsTitle: 'Skills',
    skills: [
      { title: 'Vision', text: 'Segmentation, classification, retrieval, knowledge distillation, OCR, OMR' },
      { title: 'Tools', text: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git, Jupyter' },
      { title: 'Systems', text: 'Data curation, API pipelines, offline inference, evaluation, human review tools' },
    ],
    languagesTitle: 'Languages',
    languages: [
      { name: 'Uzbek', level: 'Native' },
      { name: 'Korean', level: 'TOPIK Level 6 · Oct 2025' },
      { name: 'English', level: 'TOEIC 800 · Jul 2026 · IELTS 6.5 (Speaking 7.5)' },
      { name: 'Russian', level: 'Advanced' },
    ],
    awardsTitle: 'Certificates & awards',
    awards: [
      { name: 'Judicial Interpreter', year: '2024' },
      { name: 'KIIP (Korea Immigration & Integration Program), Stage 5', year: '2023' },
      { name: 'GKS Outstanding Self-Funded Student Scholarship', year: '2020, 2021' },
    ],
    leadershipTitle: 'Leadership',
    leadership: 'Led the Uzbek Student Association at Sun Moon University: helped international students settle in, built a KakaoTalk FAQ bot, and interpreted for visiting university delegations.',
  },
  ko: {
    title: '이력서',
    description: '도로 데이터 파이프라인, 세그멘테이션, OCR, 응용 머신러닝 경험을 가진 컴퓨터 비전 엔지니어 다다버예브 압두라흐먼의 이력서입니다.',
    eyebrow: '이력서 · 2026년 9월 기준',
    name: '다다버예브 압두라흐먼',
    role: '컴퓨터 비전 엔지니어',
    summary: '데이터 수집, 모델 개발, 성능 평가, 사람의 검수까지 비전 파이프라인 전 과정을 다룹니다. 최근에는 외부 시험을 통과한 도로 손상 모델, 지식 증류에 관한 IEEE 논문, 기업과 함께 구축 중인 도로 이미지 데이터 파이프라인, 오프라인 OCR 시스템을 작업했습니다.',
    location: '대한민국 세종',
    print: '인쇄 또는 PDF로 저장',
    experienceTitle: '경력',
    experience: [
      { title: 'AI 비전 연구 인턴', org: '㈜영창랩스', when: '2026.07', bullets: [
        '컴퓨터 비전 연구에 쓸 도로 이미지 데이터셋을 구축하고 검수했습니다.',
        '북미 도로 장면을 반복해서 수집할 수 있는 Mapillary 기반 작업 흐름을 만들어 전달했습니다.',
      ] },
      { title: '북미 도로 데이터 구축 및 자동 라벨링', org: '현대자동차 제네시스샤시시험팀 · ㈜베가스 · 고려대학교', when: '2026.07 – 현재', bullets: [
        '지역, 촬영 시기, 이미지 품질 조건에 따라 움직이는 반복 가능한 수집 과정을 설계했습니다.',
        'DINOv3·FAISS 유사 이미지 검색을 검수 도구와 연결해, 필요한 도로 장면을 빠르게 찾고 한 장씩 확인할 수 있게 했습니다.',
      ] },
      { title: '오프라인 시험지 OCR 시스템 개발', org: '고려대학교 Big Data Mining Lab', when: '2026.02 – 현재', bullets: [
        '시험지 정렬, 학생 정보 매칭, 답안 인식, 결과 저장을 하나의 오프라인 흐름으로 설계했습니다.',
        '학생 데이터는 PC 안에만 두고, 사람이 결과를 확인하고 고치는 과정을 기본 작업 흐름에 넣었습니다.',
      ] },
      { title: 'AI 비전 연구원', org: '크라우드소싱 기반 모빌리티 지원 · 과제 R2320973', when: '2025.03 – 2025.12', bullets: [
        '비전 파트를 맡아, 가늘고 불규칙한 균열에 맞지 않던 박스 라벨을 폴리곤 라벨로 바꿨습니다.',
        '세그멘테이션과 심각도 분류 파이프라인을 개발했습니다.',
        '㈜에이아이웍스 시험성적서 TWR-202512-A-0072에서 목표 0.90을 넘는 재현율 0.91(도로 손상 91% 검출)을 기록했습니다.',
      ] },
      { title: '대학원 조교', org: '고려대학교 빅데이터사이언스학부', when: '2024.09 – 2025.12', bullets: [
        '텍스트 마이닝, 딥러닝, 통계학, 다변량 분석 수업을 지원했습니다.',
        '실습 자료를 만들고 학생 팀 프로젝트를 지도했으며, 수업을 한국어와 영어로 도왔습니다.',
      ] },
    ],
    researchTitle: '논문 및 주요 프로젝트',
    research: [
      { title: 'The Amorphous Bottleneck: A Recall-Optimized Ensemble for Anomaly Detection', org: 'CVGAI 2026 · SPIE 프로시딩 게재 예정', when: '2026', text: '흐릿하고 불규칙한 도로 결함을 찾는 앙상블을 발표했습니다. 홀드아웃 이미지 591장에서 운영 재현율을 7.7%p 높였고, 새로 놓친 결함 1건당 27건을 새로 찾아냈습니다.' },
      { title: 'Efficient Semantic Segmentation: Leveraging Knowledge Distillation for Modality Reduction', org: 'AEECA 2025 · 중국 다롄 · IEEE Xplore', when: '2025.08', text: '공동 저자로 참여했습니다. RGB 전용 학생 모델이 mIoU 0.6002를 기록해 멀티센서 교사 모델과의 격차를 62.8% 줄였습니다.' },
      { title: 'AI Hub 이미지 데이터 교육 프레임워크', org: '에코업 혁신융합대학 · 과제 R2320813', when: '2024.09 – 2025.01', text: 'AI Hub 6개 분야의 데이터 사양을 검토하고, 이미지 데이터 탐색·전처리·모델링을 한 번에 다루는 Python 프레임워크를 만들었습니다.' },
      { title: '임베디드 시스템 프로젝트', org: '선문대학교', when: '2021 – 2022', text: 'Arduino 헥사포드 로봇과, OpenCV로 조준하는 Raspberry Pi 공 발사기를 만들었습니다. 센서, 모터 제어, 회로 설계를 함께 다뤘습니다.' },
    ],
    educationTitle: '학력',
    skillsTitle: '기술',
    skills: [
      { title: '비전', text: '세그멘테이션, 분류, 유사 이미지 검색, 지식 증류, OCR, OMR' },
      { title: '도구', text: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git, Jupyter' },
      { title: '시스템', text: '데이터 큐레이션, API 파이프라인, 오프라인 추론, 성능 평가, 검수 도구' },
    ],
    languagesTitle: '언어',
    languages: [
      { name: '우즈베크어', level: '모국어' },
      { name: '한국어', level: 'TOPIK 6급 · 2025.10' },
      { name: '영어', level: 'TOEIC 800 · 2026.07 · IELTS 6.5 (Speaking 7.5)' },
      { name: '러시아어', level: '상급' },
    ],
    awardsTitle: '자격 및 수상',
    awards: [
      { name: '사법통역사', year: '2024' },
      { name: '사회통합프로그램(KIIP) 5단계', year: '2023' },
      { name: 'GKS 우수 자비유학생 장학금', year: '2020, 2021' },
    ],
    leadershipTitle: '리더십',
    leadership: '선문대학교 우즈베키스탄 학생회를 이끌었습니다. 유학생들의 적응을 돕고, 카카오톡 FAQ 봇을 만들고, 대학을 찾은 방문단의 통역을 맡았습니다.',
  },
  ru: {
    title: 'Резюме',
    description: 'Резюме Абдурахмона (Алекса) Дадабоева, инженера по компьютерному зрению: дорожные данные, сегментация, OCR и прикладное машинное обучение.',
    eyebrow: 'Резюме · сентябрь 2026',
    name: 'Абдурахмон Дадабоев',
    role: 'Инженер по компьютерному зрению',
    summary: 'Работаю со всем циклом задачи компьютерного зрения: сбор данных, разработка модели, оценка и ручная проверка. Из последнего: модель для дорожных повреждений, прошедшая независимые испытания, статья в IEEE о дистилляции знаний, пайплайн дорожных данных вместе с индустриальными партнёрами и офлайн-система OCR.',
    location: 'Седжон, Южная Корея',
    print: 'Распечатать или сохранить в PDF',
    experienceTitle: 'Опыт работы',
    experience: [
      { title: 'Стажёр-исследователь по компьютерному зрению', org: 'Youngchang Labs', when: 'июль 2026', bullets: [
        'Собирал и проверял наборы дорожных изображений для исследований в области компьютерного зрения.',
        'Подготовил повторно используемый процесс сбора дорожных сцен Северной Америки из Mapillary.',
      ] },
      { title: 'Дорожные данные Северной Америки и автоматическая разметка', org: 'Hyundai Motor Genesis Chassis Test Team · Vegas · Университет Корё', when: 'июль 2026 – сейчас', bullets: [
        'Спроектировал повторяемый процесс сбора с учётом региона, даты съёмки и требований к качеству изображений.',
        'Связал поиск похожих изображений на DINOv3 и FAISS с инструментом проверки, чтобы нужные сцены быстро находились и подтверждались вручную.',
      ] },
      { title: 'Офлайн-система OCR для экзаменов', org: 'Big Data Mining Lab · Университет Корё', when: 'февр. 2026 – сейчас', bullets: [
        'Спроектировал единый офлайн-процесс: выравнивание страниц, сопоставление студентов, распознавание ответов и сохранение результатов.',
        'Данные студентов остаются на компьютере, а ручная проверка и исправление встроены в обычный рабочий процесс.',
      ] },
      { title: 'Исследователь по компьютерному зрению', org: 'Поддержка мобильности на основе краудсорсинга · проект R2320973', when: 'март – дек. 2025', bullets: [
        'Руководил частью по компьютерному зрению и заменил прямоугольную разметку полигональной: она гораздо лучше описывает тонкие трещины неправильной формы.',
        'Построил пайплайн сегментации и классификации степени повреждения.',
        'Полнота 0,91 (найдено 91% повреждений) при цели 0,90 — по отчёту AIWORKX TWR-202512-A-0072.',
      ] },
      { title: 'Ассистент преподавателя', org: 'Кафедра Big Data Science · Университет Корё', when: 'сент. 2024 – дек. 2025', bullets: [
        'Помогал вести курсы по анализу текста, глубокому обучению, статистике и многомерному анализу.',
        'Готовил практические материалы, курировал студенческие команды и помогал на занятиях на корейском и английском.',
      ] },
    ],
    researchTitle: 'Исследования и избранные проекты',
    research: [
      { title: 'The Amorphous Bottleneck: A Recall-Optimized Ensemble for Anomaly Detection', org: 'CVGAI 2026 · SPIE Proceedings (в печати)', when: '2026', text: 'Доклад об ансамбле для слабых дорожных дефектов неправильной формы. На 591 отложенном изображении рабочая полнота выросла на 7,7 п. п.: на каждый новый пропуск ансамбль находил 27 ранее пропущенных дефектов.' },
      { title: 'Efficient Semantic Segmentation: Leveraging Knowledge Distillation for Modality Reduction', org: 'AEECA 2025 · Далянь, Китай · IEEE Xplore', when: 'авг. 2025', text: 'Соавтор статьи. Наша RGB-модель-ученик достигла mIoU 0,6002 и закрыла 62,8% разрыва с мультисенсорной моделью-учителем.' },
      { title: 'Учебный фреймворк для данных AI Hub', org: 'Eco-Up Innovation Fusion University · проект R2320813', when: 'сент. 2024 – янв. 2025', text: 'Разобрал спецификации данных шести направлений AI Hub и написал единый Python-фреймворк для исследования, предобработки и моделирования изображений.' },
      { title: 'Проекты по встраиваемым системам', org: 'Университет Сонмун', when: '2021 – 2022', text: 'Собрал шагающего робота-гексапода на Arduino и пусковую установку для мячей на Raspberry Pi, которая целится с помощью OpenCV. Датчики, управление моторами и схемотехника.' },
    ],
    educationTitle: 'Образование',
    skillsTitle: 'Навыки',
    skills: [
      { title: 'Зрение', text: 'Сегментация, классификация, поиск изображений, дистилляция знаний, OCR, OMR' },
      { title: 'Инструменты', text: 'Python, PyTorch, OpenCV, Ultralytics YOLO, DINOv3, FAISS, SQLite, Git, Jupyter' },
      { title: 'Системы', text: 'Подготовка данных, API-пайплайны, офлайн-инференс, оценка моделей, инструменты ручной проверки' },
    ],
    languagesTitle: 'Языки',
    languages: [
      { name: 'Узбекский', level: 'родной' },
      { name: 'Корейский', level: 'TOPIK 6 · окт. 2025' },
      { name: 'Английский', level: 'TOEIC 800 · июль 2026 · IELTS 6.5 (Speaking 7.5)' },
      { name: 'Русский', level: 'свободно' },
    ],
    awardsTitle: 'Сертификаты и награды',
    awards: [
      { name: 'Судебный переводчик', year: '2024' },
      { name: 'Программа интеграции KIIP, 5-й уровень', year: '2023' },
      { name: 'Стипендия GKS для лучших студентов-самофинансистов', year: '2020, 2021' },
    ],
    leadershipTitle: 'Общественная работа',
    leadership: 'Возглавлял Ассоциацию узбекских студентов Университета Сонмун: помогал иностранным студентам освоиться, сделал FAQ-бота в KakaoTalk и переводил для делегаций, приезжавших в университет.',
  },
};

/* ------------------------------------------------------------------
   Projects index
------------------------------------------------------------------- */
export const projectsPage = {
  en: {
    title: 'Projects',
    description: 'Computer vision, data pipelines, offline AI, and embedded engineering projects by Abdurakhmon (Alex) Dadaboev.',
    eyebrow: 'Research & projects',
    heading: 'Projects',
    intro: 'Research and engineering work in computer vision, data pipelines, and offline AI. Further down are a few older projects, from before I moved from hardware to vision.',
    count: (n: number) => `${n} projects`,
    featured: 'Featured',
    more: 'Other projects',
  },
  ko: {
    title: '프로젝트',
    description: '다다버예브 압두라흐먼의 컴퓨터 비전, 데이터 파이프라인, 오프라인 AI, 임베디드 프로젝트입니다.',
    eyebrow: '연구 및 프로젝트',
    heading: '프로젝트',
    intro: '컴퓨터 비전, 데이터 파이프라인, 오프라인 AI 분야의 연구와 개발 작업입니다. 아래쪽에는 하드웨어에서 비전으로 넘어오기 전에 했던 프로젝트도 몇 개 있습니다.',
    count: (n: number) => `프로젝트 ${n}개`,
    featured: '대표 프로젝트',
    more: '그 밖의 프로젝트',
  },
  ru: {
    title: 'Проекты',
    description: 'Проекты Абдурахмона (Алекса) Дадабоева: компьютерное зрение, пайплайны данных, офлайн-ИИ и встраиваемые системы.',
    eyebrow: 'Исследования и проекты',
    heading: 'Проекты',
    intro: 'Исследования и инженерные проекты в компьютерном зрении, работе с данными и офлайн-ИИ. Ниже — несколько более ранних работ, ещё до того, как я перешёл от железа к зрению.',
    count: (n: number) => {
      const mod10 = n % 10;
      const mod100 = n % 100;
      const word = mod10 === 1 && mod100 !== 11 ? 'проект' : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'проекта' : 'проектов';
      return `${n} ${word}`;
    },
    featured: 'Главные проекты',
    more: 'Другие проекты',
  },
};

export const featuredProjectSlugs = [
  'road-damage-detection',
  'semantic-segmentation-modality-reduction',
  'amorphous-bottleneck',
  'north-american-road-data',
  'omr-htr-digitization',
];

/* ------------------------------------------------------------------
   Books and essays
------------------------------------------------------------------- */
export const booksPage = {
  en: {
    title: 'Books',
    description: 'Books Abdurakhmon (Alex) Dadaboev has read: mostly literature and philosophy, with some psychology and religion.',
    eyebrow: 'Reading',
    heading: 'Books I’ve read',
    intro: 'Mostly literature and philosophy, plus some psychology and religion. Dostoevsky shows up more than anyone else. Click a cover to look the book up.',
    by: (author: string) => author,
    coverAlt: (title: string) => `Cover of ${title}`,
  },
  ko: {
    title: '읽은 책',
    description: '다다버예브 압두라흐먼이 읽은 문학, 철학, 심리학, 종교 분야의 책입니다.',
    eyebrow: '독서',
    heading: '읽은 책',
    intro: '주로 문학과 철학, 그리고 심리학과 종교 책을 읽습니다. 가장 많이 등장하는 작가는 도스토옙스키입니다. 표지를 누르면 책 정보를 찾아볼 수 있습니다.',
    by: (author: string) => author,
    coverAlt: (title: string) => `${title} 표지`,
  },
  ru: {
    title: 'Книги',
    description: 'Книги, которые прочитал Абдурахмон (Алекс) Дадабоев: в основном литература и философия, а также психология и религия.',
    eyebrow: 'Чтение',
    heading: 'Прочитанные книги',
    intro: 'В основном литература и философия, немного психологии и религии. Чаще всех здесь встречается Достоевский. Нажмите на обложку, чтобы найти книгу.',
    by: (author: string) => author,
    coverAlt: (title: string) => `Обложка книги «${title}»`,
  },
};

export const essaysPage = {
  en: {
    title: 'Essays',
    description: 'Personal essays by Abdurakhmon (Alex) Dadaboev on faith, love, responsibility, and the books that stayed with him.',
    eyebrow: 'Writing',
    heading: 'Essays',
    intro: 'Personal notes on faith, love, responsibility, and the books that stayed with me. None of this is advice; it’s just me thinking out loud.',
    read: 'Read',
  },
  ko: {
    title: '에세이',
    description: '신앙, 사랑, 책임, 그리고 오래 남은 책에 대한 다다버예브 압두라흐먼의 개인적인 글입니다.',
    eyebrow: '글',
    heading: '에세이',
    intro: '신앙, 사랑, 책임, 그리고 오래 마음에 남은 책에 대해 적어 둔 개인적인 생각입니다. 누군가를 가르치려는 글이 아니라, 소리 내어 생각해 본 기록입니다.',
    read: '읽기',
  },
  ru: {
    title: 'Эссе',
    description: 'Личные эссе Абдурахмона (Алекса) Дадабоева о вере, любви, ответственности и книгах, которые не отпускают.',
    eyebrow: 'Тексты',
    heading: 'Эссе',
    intro: 'Личные заметки о вере, любви, ответственности и книгах, которые меня не отпускают. Это не советы, а просто размышления вслух.',
    read: 'Читать',
  },
};
