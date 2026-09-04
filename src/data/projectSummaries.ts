export type ProjectSummary = {
  challenge: string;
  role: string;
  result: string;
  status: string;
};

type Locale = 'en' | 'ko' | 'ru';

export const projectResultDocuments: Record<string, { href: string; label: Record<Locale, string> }> = {
  'road-damage-detection': {
    href: encodeURI('/files/TWPF 016 04 R06 시험성적서 일반용.pdf'),
    label: { en: 'View test report (PDF)', ko: '시험성적서 보기 (PDF)', ru: 'Открыть отчёт об испытаниях (PDF)' },
  },
  'semantic-segmentation-modality-reduction': {
    href: encodeURI('/files/Efficient Semantic Segmentation Leveraging Knowledge Distillation for Modality Reduction.pdf'),
    label: { en: 'Read paper (PDF)', ko: '논문 보기 (PDF)', ru: 'Читать статью (PDF)' },
  },
};

export const projectSummaryLabels: Record<Locale, Record<keyof ProjectSummary, string>> = {
  en: { challenge: 'Challenge', role: 'My role', result: 'Result', status: 'Status' },
  ko: { challenge: '해결 과제', role: '담당 역할', result: '결과', status: '진행 상태' },
  ru: { challenge: 'Задача', role: 'Моя роль', result: 'Результат', status: 'Статус' },
};

export const projectDetailsLabel: Record<Locale, string> = {
  en: 'Technical details and process',
  ko: '기술 상세 및 개발 과정',
  ru: 'Технические детали и процесс',
};

export const projectSummaries: Record<Locale, Record<string, ProjectSummary>> = {
  en: {
    'north-american-road-data': {
      challenge: 'Build a useful road-image dataset from a large public source while meeting location, date, and quality requirements and avoiding unnecessary duplicates.',
      role: 'I design the collection pipeline, similarity search, and human review workflow.',
      result: 'A repeatable pipeline now connects Mapillary collection, DINOv3 and FAISS retrieval, and final manual validation.',
      status: 'Ongoing industry and university collaboration.',
    },
    'amorphous-bottleneck': {
      challenge: 'Detect low-contrast, irregular defects that standard object detectors often miss.',
      role: 'I developed the data analysis, model ensemble, and instance-level evaluation approach.',
      result: 'The final ensemble recovered 27 useful detections for every regression on a held-out set of 591 images, with results checked manually.',
      status: 'Presented at CVGAI 2026; proceedings publication in progress.',
    },
    'omr-htr-digitization': {
      challenge: 'Turn scanned exam papers into reliable digital records without sending student data to an external service.',
      role: 'I designed and built the document alignment, student matching, answer extraction, recognition, and storage workflow.',
      result: 'The working offline application brings the full process into one local system and keeps human checking practical.',
      status: 'Ongoing research and development.',
    },
    'road-damage-detection': {
      challenge: 'Represent thin, irregular road cracks accurately and classify their severity.',
      role: 'I redesigned the labeling approach and developed the segmentation, classification, and evaluation pipeline.',
      result: 'The model detected 91% of road damage in the test set (recall 0.91), exceeding the 90% target in the AIWORKX test report.',
      status: 'Completed and externally verified.',
    },
    'text-mining-fundamentals': {
      challenge: 'Make text-mining concepts practical and reproducible for students with different technical backgrounds.',
      role: 'I designed the course structure, notebooks, datasets, and setup instructions.',
      result: 'A reusable learning path now connects data collection, classical analysis, topic modeling, and neural text classification.',
      status: 'Completed teaching framework.',
    },
    'semantic-segmentation-modality-reduction': {
      challenge: 'Reduce dependence on expensive NIR and LiDAR sensors while retaining useful segmentation performance.',
      role: 'I co-authored the research and implemented the teacher-student knowledge-distillation experiments.',
      result: 'The RGB-only student reached 0.6002 mIoU and closed 62.8% of the gap to the multi-sensor teacher.',
      status: 'Published by IEEE after presentation at AEECA 2025.',
    },
    'daily-doer-agent': {
      challenge: 'Connect everyday tasks such as schedules, email, news, and voice commands in one simple interface.',
      role: 'I built the Python automation workflow and its Telegram and Google service integrations.',
      result: 'The working prototype accepts text or voice requests and completes several daily tasks from one conversation.',
      status: 'Completed personal project; source code available.',
    },
    'local-llm-assistant': {
      challenge: 'Use a language model from a phone while keeping prompts and documents on a local computer.',
      role: 'I built the local model service, API connection, and Flutter mobile client.',
      result: 'The prototype provides mobile access to an offline model through the local network without sending content to a cloud model.',
      status: 'Completed personal project; source code available.',
    },
    'autonomous-hexapod-robot': {
      challenge: 'Coordinate 18 motors, sensing, power, and mechanical parts in a stable walking robot.',
      role: 'I designed and assembled the robot and implemented walking and obstacle-avoidance control.',
      result: 'The completed prototype walks with a tripod gait, avoids nearby obstacles, and demonstrates integrated hardware control.',
      status: 'Completed undergraduate project with demonstration video.',
    },
    'autonomous-ball-launcher': {
      challenge: 'Track a moving target and adjust aim and launch power automatically.',
      role: 'I integrated computer vision, distance sensing, motor control, and the mechanical launcher.',
      result: 'The working prototype follows a colored target, estimates distance, and adjusts its launcher automatically.',
      status: 'Completed undergraduate project with demonstration video.',
    },
  },
  ko: {
    'north-american-road-data': {
      challenge: '대규모 공개 데이터에서 지역, 촬영 시점, 품질 조건을 만족하는 도로 이미지를 찾고 불필요한 중복을 줄이는 일입니다.',
      role: '데이터 수집 파이프라인과 유사 이미지 검색, 수동 검수 과정을 설계하고 있습니다.',
      result: 'Mapillary 수집부터 DINOv3·FAISS 검색, 최종 수동 검수까지 이어지는 반복 가능한 파이프라인을 구축했습니다.',
      status: '기업·대학 협력으로 진행 중입니다.',
    },
    'amorphous-bottleneck': {
      challenge: '일반적인 객체 탐지기가 놓치기 쉬운 저대비·불규칙 결함을 안정적으로 찾는 일입니다.',
      role: '데이터 분석, 모델 앙상블, 인스턴스 단위 평가 방법을 개발했습니다.',
      result: '이미지 591장의 홀드아웃 데이터에서 성능 저하 1건당 유효 탐지 27건을 복구했고, 결과를 직접 검수했습니다.',
      status: 'CVGAI 2026 발표 완료, 프로시딩 출판 절차가 진행 중입니다.',
    },
    'omr-htr-digitization': {
      challenge: '학생 데이터를 외부 서비스로 보내지 않고 스캔 시험지를 신뢰할 수 있는 디지털 기록으로 변환하는 일입니다.',
      role: '문서 정렬, 학생 매칭, 답안 추출, 문자 인식, 결과 저장 과정을 설계하고 개발했습니다.',
      result: '전체 과정을 하나의 로컬 프로그램으로 연결해 오프라인 처리와 수동 확인이 가능한 시스템을 만들었습니다.',
      status: '연구개발을 진행 중입니다.',
    },
    'road-damage-detection': {
      challenge: '가늘고 불규칙한 도로 균열을 정확하게 표현하고 손상 심각도를 분류하는 일입니다.',
      role: '라벨링 방식을 재설계하고 세그멘테이션, 분류, 평가 파이프라인을 개발했습니다.',
      result: '시험 데이터의 도로 손상 91%를 검출해 검출 정확도(Recall) 0.91을 기록했습니다. ㈜에이아이웍스 시험성적서의 목표 0.90을 넘었습니다.',
      status: '개발 및 외부 성능 검증을 완료했습니다.',
    },
    'text-mining-fundamentals': {
      challenge: '서로 다른 배경의 학생들이 텍스트 마이닝을 실습하고 같은 결과를 재현할 수 있게 하는 일입니다.',
      role: '교육 과정, 실습 노트북, 데이터셋, 실행 환경 안내를 설계했습니다.',
      result: '데이터 수집부터 전통적 분석, 토픽 모델링, 신경망 기반 분류까지 이어지는 재사용 가능한 실습 과정을 만들었습니다.',
      status: '교육 프레임워크를 완성했습니다.',
    },
    'semantic-segmentation-modality-reduction': {
      challenge: '고가의 NIR·LiDAR 센서 의존도를 줄이면서 의미 있는 세그멘테이션 성능을 유지하는 일입니다.',
      role: '연구를 공동 집필하고 교사·학생 모델 기반 지식 증류 실험을 구현했습니다.',
      result: 'RGB 전용 학생 모델이 mIoU 0.6002를 기록해 멀티센서 교사 모델과의 성능 격차를 62.8% 줄였습니다.',
      status: 'AEECA 2025 발표 후 IEEE에 출판되었습니다.',
    },
    'daily-doer-agent': {
      challenge: '일정, 이메일, 뉴스, 음성 명령 같은 일상 작업을 하나의 간단한 인터페이스로 연결하는 일입니다.',
      role: 'Python 자동화 흐름과 Telegram·Google 서비스 연동을 개발했습니다.',
      result: '텍스트와 음성 요청을 받아 여러 일상 작업을 하나의 대화에서 처리하는 프로토타입을 완성했습니다.',
      status: '개인 프로젝트 완료, 소스 코드를 공개했습니다.',
    },
    'local-llm-assistant': {
      challenge: '프롬프트와 문서를 외부로 보내지 않고 휴대전화에서 로컬 언어 모델을 사용하는 일입니다.',
      role: '로컬 모델 서비스, API 연결, Flutter 모바일 클라이언트를 개발했습니다.',
      result: '콘텐츠를 클라우드 모델로 보내지 않고 로컬 네트워크에서 오프라인 모델을 사용할 수 있는 프로토타입을 만들었습니다.',
      status: '개인 프로젝트 완료, 소스 코드를 공개했습니다.',
    },
    'autonomous-hexapod-robot': {
      challenge: '18개 모터와 센서, 전원, 기계 부품을 안정적으로 움직이는 로봇 하나로 통합하는 일입니다.',
      role: '로봇을 설계·조립하고 보행 및 장애물 회피 제어를 구현했습니다.',
      result: '트라이포드 보행으로 이동하고 가까운 장애물을 피하는 하드웨어 프로토타입을 완성했습니다.',
      status: '학부 프로젝트 완료, 시연 영상을 공개했습니다.',
    },
    'autonomous-ball-launcher': {
      challenge: '움직이는 표적을 추적하고 조준 방향과 발사 출력을 자동으로 조절하는 일입니다.',
      role: '컴퓨터 비전, 거리 센서, 모터 제어, 기계식 발사 장치를 통합했습니다.',
      result: '색상 표적을 따라가고 거리를 측정해 발사 장치를 자동 조절하는 프로토타입을 완성했습니다.',
      status: '학부 프로젝트 완료, 시연 영상을 공개했습니다.',
    },
  },
  ru: {
    'north-american-road-data': {
      challenge: 'Собрать полезный набор дорожных изображений из большого открытого источника с учетом региона, даты, качества и повторов.',
      role: 'Я проектирую сбор данных, поиск похожих изображений и процесс ручной проверки.',
      result: 'Создан повторяемый процесс от Mapillary до поиска через DINOv3 и FAISS и финальной ручной проверки.',
      status: 'Текущий совместный проект с компанией и университетом.',
    },
    'amorphous-bottleneck': {
      challenge: 'Надежно находить слабоконтрастные дефекты неправильной формы, которые часто пропускают обычные детекторы.',
      role: 'Я разработал анализ данных, ансамбль моделей и оценку на уровне отдельных объектов.',
      result: 'На отложенном наборе из 591 изображения ансамбль восстановил 27 полезных обнаружений на одну регрессию; результаты проверены вручную.',
      status: 'Представлено на CVGAI 2026; публикация в материалах конференции готовится.',
    },
    'omr-htr-digitization': {
      challenge: 'Преобразовать сканы экзаменационных работ в надежные цифровые записи без передачи данных студентов внешнему сервису.',
      role: 'Я спроектировал выравнивание документов, сопоставление студентов, извлечение ответов, распознавание и хранение.',
      result: 'Рабочее офлайн-приложение объединяет весь процесс локально и оставляет удобную возможность ручной проверки.',
      status: 'Исследование и разработка продолжаются.',
    },
    'road-damage-detection': {
      challenge: 'Точно представить тонкие дорожные трещины неправильной формы и определить их серьезность.',
      role: 'Я переработал разметку и разработал сегментацию, классификацию и оценку качества.',
      result: 'Модель обнаружила 91% повреждений в тестовых данных (полнота, recall 0,91), превысив целевой показатель 90% в отчёте AIWORKX.',
      status: 'Завершено и проверено внешней организацией.',
    },
    'text-mining-fundamentals': {
      challenge: 'Сделать текстовый анализ практичным и воспроизводимым для студентов с разным уровнем подготовки.',
      role: 'Я разработал структуру курса, ноутбуки, наборы данных и инструкции по запуску.',
      result: 'Создан повторно используемый курс от сбора данных до тематического моделирования и нейросетевой классификации.',
      status: 'Учебный материал завершен.',
    },
    'semantic-segmentation-modality-reduction': {
      challenge: 'Снизить зависимость от дорогих сенсоров NIR и LiDAR, сохранив полезное качество сегментации.',
      role: 'Я участвовал в написании статьи и реализовал эксперименты по дистилляции знаний.',
      result: 'RGB-модель достигла mIoU 0,6002 и сократила разрыв с мультисенсорной моделью на 62,8%.',
      status: 'Опубликовано IEEE после доклада на AEECA 2025.',
    },
    'daily-doer-agent': {
      challenge: 'Объединить расписание, почту, новости и голосовые команды в одном простом интерфейсе.',
      role: 'Я разработал автоматизацию на Python и интеграции с Telegram и сервисами Google.',
      result: 'Рабочий прототип принимает текстовые и голосовые запросы и выполняет несколько повседневных задач из одного диалога.',
      status: 'Личный проект завершен, исходный код открыт.',
    },
    'local-llm-assistant': {
      challenge: 'Использовать языковую модель с телефона, сохраняя запросы и документы на локальном компьютере.',
      role: 'Я разработал локальный сервис модели, API и мобильный клиент на Flutter.',
      result: 'Прототип дает мобильный доступ к офлайн-модели через локальную сеть без передачи данных облачной модели.',
      status: 'Личный проект завершен, исходный код открыт.',
    },
    'autonomous-hexapod-robot': {
      challenge: 'Объединить 18 приводов, датчики, питание и механику в устойчиво шагающем гексаподе.',
      role: 'Я спроектировал и собрал робота и реализовал управление ходьбой и обходом препятствий.',
      result: 'Готовый прототип ходит трехопорной походкой, объезжает препятствия и демонстрирует совместную работу аппаратных узлов.',
      status: 'Учебный проект завершен, доступно демонстрационное видео.',
    },
    'autonomous-ball-launcher': {
      challenge: 'Отслеживать движущуюся цель и автоматически менять направление и мощность запуска.',
      role: 'Я объединил компьютерное зрение, датчик расстояния, управление моторами и механическую пусковую установку.',
      result: 'Рабочий прототип отслеживает цветную цель, оценивает расстояние и автоматически настраивает запуск.',
      status: 'Учебный проект завершен, доступно демонстрационное видео.',
    },
  },
};
