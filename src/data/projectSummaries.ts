import type { Locale } from '../i18n/site';

export type ProjectSummary = {
  challenge: string;
  role: string;
  result: string;
  status: string;
};

export const projectResultDocuments: Record<string, { href: string; label: Record<Locale, string> }> = {
  'road-damage-detection': {
    href: encodeURI('/files/TWPF 016 04 R06 시험성적서 일반용.pdf'),
    label: { en: 'Open the test report (PDF)', ko: '시험성적서 보기 (PDF)', ru: 'Отчёт об испытаниях (PDF)' },
  },
  'semantic-segmentation-modality-reduction': {
    href: encodeURI('/files/Efficient Semantic Segmentation Leveraging Knowledge Distillation for Modality Reduction.pdf'),
    label: { en: 'Read the paper (PDF)', ko: '논문 보기 (PDF)', ru: 'Читать статью (PDF)' },
  },
};

export const projectSummaries: Record<Locale, Record<string, ProjectSummary>> = {
  en: {
    'north-american-road-data': {
      challenge: 'Build a useful road-image dataset out of a huge public source, keeping only images that match the region, date, and quality requirements, without drowning in near-duplicates.',
      role: 'I design the collection pipeline, the similarity search, and the human review step.',
      result: 'One repeatable pipeline now runs from Mapillary collection through DINOv3 and FAISS retrieval to a final manual check.',
      status: 'In progress, with industry and university partners.',
    },
    'amorphous-bottleneck': {
      challenge: 'Find faint, irregular defects that standard object detectors routinely miss.',
      role: 'I did the data analysis, built the model ensemble, and designed the instance-level evaluation.',
      result: 'On 591 held-out images, the ensemble recovered 27 missed defects for every one it lost. I checked the results by hand.',
      status: 'Presented at CVGAI 2026; the paper is going through publication.',
    },
    'omr-htr-digitization': {
      challenge: 'Turn scanned exam papers into reliable digital records without sending student data to an outside service.',
      role: 'I designed and built the whole flow: page alignment, student matching, answer extraction, recognition, and storage.',
      result: 'A working offline app that keeps the full process on one machine and makes human checking quick.',
      status: 'Still in active development.',
    },
    'road-damage-detection': {
      challenge: 'Describe thin, irregular road cracks accurately and judge how severe they are.',
      role: 'I redesigned the labeling approach and built the segmentation, classification, and evaluation pipeline.',
      result: 'The model found 91% of road damage in the test set (recall 0.91), beating the 0.90 target in the AIWORKX test report.',
      status: 'Finished and independently tested.',
    },
    'text-mining-fundamentals': {
      challenge: 'Make text mining hands-on and reproducible for students with very different technical backgrounds.',
      role: 'I designed the course structure, notebooks, datasets, and setup guide.',
      result: 'A reusable course that goes from collecting text to classic analysis, topic modeling, and neural classification.',
      status: 'Finished teaching material.',
    },
    'semantic-segmentation-modality-reduction': {
      challenge: 'Cut the dependence on expensive near-infrared and LiDAR sensors without losing too much segmentation quality.',
      role: 'I co-authored the paper and ran the teacher–student knowledge distillation experiments.',
      result: 'The RGB-only student reached 0.6002 mIoU and closed 62.8% of the gap to the multi-sensor teacher.',
      status: 'Presented at AEECA 2025 and published in IEEE Xplore.',
    },
    'daily-doer-agent': {
      challenge: 'Handle everyday chores like scheduling, email, and news from one chat, by text or by voice.',
      role: 'I built the Python automation and the Telegram and Google integrations.',
      result: 'A working bot that takes text or voice requests and gets several daily tasks done in one conversation.',
      status: 'Finished personal project; code is on GitHub.',
    },
    'local-llm-assistant': {
      challenge: 'Use a language model from my phone while keeping prompts and documents on my own computer.',
      role: 'I built the local model server, the API, and the Flutter mobile app.',
      result: 'A prototype that talks to an offline model over the local network. Nothing is sent to a cloud model.',
      status: 'Finished personal project; code is on GitHub.',
    },
    'autonomous-hexapod-robot': {
      challenge: 'Get 18 servos, sensors, power, and 3D-printed parts to work together as a robot that walks steadily.',
      role: 'I designed and assembled the robot and wrote the walking and obstacle-avoidance control.',
      result: 'The robot walks with a tripod gait, steers around nearby obstacles, and follows a green marker.',
      status: 'Finished undergraduate project, with a demo video.',
    },
    'autonomous-ball-launcher': {
      challenge: 'Track a moving target and adjust aim and launch power automatically.',
      role: 'I brought together the computer vision, distance sensing, motor control, and mechanical launcher.',
      result: 'The launcher follows a colored target, measures how far away it is, and sets its launch power to match.',
      status: 'Finished undergraduate project, with a demo video.',
    },
  },
  ko: {
    'north-american-road-data': {
      challenge: '방대한 공개 데이터에서 지역, 촬영 시기, 품질 조건에 맞는 도로 이미지만 골라, 비슷한 사진이 잔뜩 쌓이지 않게 쓸 만한 데이터셋을 만드는 것.',
      role: '데이터 수집 파이프라인, 유사 이미지 검색, 사람의 검수 단계를 설계하고 있습니다.',
      result: 'Mapillary 수집부터 DINOv3·FAISS 검색, 최종 수동 검수까지 한 번에 이어지는 반복 가능한 파이프라인을 만들었습니다.',
      status: '기업·대학과 함께 진행 중입니다.',
    },
    'amorphous-bottleneck': {
      challenge: '일반적인 객체 탐지 모델이 자주 놓치는, 흐릿하고 형태가 불규칙한 결함을 찾는 것.',
      role: '데이터 분석, 모델 앙상블 구성, 인스턴스 단위 평가 방법 설계를 맡았습니다.',
      result: '홀드아웃 이미지 591장에서 새로 놓친 결함 1건당 27건의 놓쳤던 결함을 되찾았습니다. 결과는 직접 눈으로 검수했습니다.',
      status: 'CVGAI 2026에서 발표했고, 논문은 출판 절차를 밟고 있습니다.',
    },
    'omr-htr-digitization': {
      challenge: '학생 데이터를 외부 서비스로 보내지 않고, 스캔한 시험지를 믿을 수 있는 디지털 기록으로 바꾸는 것.',
      role: '시험지 정렬, 학생 정보 매칭, 답안 추출, 문자 인식, 저장까지 전체 흐름을 설계하고 개발했습니다.',
      result: '모든 과정을 PC 한 대에서 처리하고, 사람이 빠르게 확인할 수 있는 오프라인 프로그램을 완성해 쓰고 있습니다.',
      status: '계속 개발 중입니다.',
    },
    'road-damage-detection': {
      challenge: '가늘고 불규칙한 도로 균열을 정확하게 표시하고, 손상이 얼마나 심각한지 판단하는 것.',
      role: '라벨링 방식을 새로 설계하고 세그멘테이션, 분류, 평가 파이프라인을 개발했습니다.',
      result: '시험 데이터의 도로 손상 91%를 찾아내 재현율 0.91을 기록했습니다. ㈜에이아이웍스 시험성적서의 목표치 0.90을 넘었습니다.',
      status: '개발을 마치고 외부 성능 검증까지 받았습니다.',
    },
    'text-mining-fundamentals': {
      challenge: '배경지식이 제각각인 학생들이 텍스트 마이닝을 직접 실습하고 같은 결과를 재현할 수 있게 하는 것.',
      role: '수업 구성, 실습 노트북, 데이터셋, 환경 설정 안내를 만들었습니다.',
      result: '텍스트 수집부터 고전적 분석, 토픽 모델링, 신경망 분류까지 이어지는 재사용 가능한 실습 과정을 만들었습니다.',
      status: '완성된 수업 자료입니다.',
    },
    'semantic-segmentation-modality-reduction': {
      challenge: '비싼 근적외선(NIR)·LiDAR 센서에 대한 의존을 줄이면서도 세그멘테이션 품질은 최대한 지키는 것.',
      role: '논문을 공동 집필하고 교사–학생 지식 증류 실험을 진행했습니다.',
      result: 'RGB 전용 학생 모델이 mIoU 0.6002를 기록해, 멀티센서 교사 모델과의 격차를 62.8% 줄였습니다.',
      status: 'AEECA 2025에서 발표했고 IEEE Xplore에 게재되었습니다.',
    },
    'daily-doer-agent': {
      challenge: '일정 관리, 이메일, 뉴스 확인 같은 일상 업무를 채팅창 하나에서 글이나 음성으로 처리하는 것.',
      role: 'Python 자동화와 텔레그램·Google 서비스 연동을 개발했습니다.',
      result: '글이나 음성으로 요청하면 대화 하나 안에서 여러 일상 업무를 처리하는 봇을 만들었습니다.',
      status: '개인 프로젝트로 완료했고, 코드는 GitHub에 있습니다.',
    },
    'local-llm-assistant': {
      challenge: '프롬프트와 문서를 내 컴퓨터 밖으로 보내지 않고 휴대폰에서 언어 모델을 쓰는 것.',
      role: '로컬 모델 서버, API, Flutter 모바일 앱을 만들었습니다.',
      result: '같은 네트워크 안에서 오프라인 모델과 대화하는 프로토타입입니다. 클라우드 모델로는 아무것도 보내지 않습니다.',
      status: '개인 프로젝트로 완료했고, 코드는 GitHub에 있습니다.',
    },
    'autonomous-hexapod-robot': {
      challenge: '서보 모터 18개와 센서, 전원, 3D 프린팅 부품이 한데 맞물려 안정적으로 걷는 로봇을 만드는 것.',
      role: '로봇을 설계·조립하고 보행과 장애물 회피 제어를 구현했습니다.',
      result: '트라이포드 보행으로 걷고, 가까운 장애물을 피하고, 초록색 마커를 따라가는 로봇을 완성했습니다.',
      status: '학부 프로젝트로 완료했고, 시연 영상이 있습니다.',
    },
    'autonomous-ball-launcher': {
      challenge: '움직이는 표적을 따라가면서 조준 방향과 발사 세기를 자동으로 맞추는 것.',
      role: '컴퓨터 비전, 거리 측정, 모터 제어, 기계식 발사 장치를 하나로 통합했습니다.',
      result: '색깔 표적을 따라가고, 거리를 재고, 그에 맞게 발사 세기를 조절하는 발사기를 완성했습니다.',
      status: '학부 프로젝트로 완료했고, 시연 영상이 있습니다.',
    },
  },
  ru: {
    'north-american-road-data': {
      challenge: 'Собрать полезный набор дорожных изображений из огромного открытого источника: оставить только снимки нужного региона, даты и качества и не утонуть в почти одинаковых кадрах.',
      role: 'Проектирую сбор данных, поиск похожих изображений и этап ручной проверки.',
      result: 'Работает единый повторяемый процесс: сбор из Mapillary, поиск через DINOv3 и FAISS и финальная ручная проверка.',
      status: 'В работе, совместно с индустриальными и университетскими партнёрами.',
    },
    'amorphous-bottleneck': {
      challenge: 'Находить слабые дефекты неправильной формы, которые обычные детекторы регулярно пропускают.',
      role: 'Анализ данных, ансамбль моделей и оценка на уровне отдельных объектов.',
      result: 'На 591 отложенном изображении ансамбль нашёл 27 пропущенных ранее дефектов на каждый новый пропуск. Результаты я проверил вручную.',
      status: 'Доклад на CVGAI 2026; статья готовится к публикации.',
    },
    'omr-htr-digitization': {
      challenge: 'Превращать сканы экзаменационных работ в надёжные цифровые записи, не отправляя данные студентов во внешние сервисы.',
      role: 'Спроектировал и написал весь процесс: выравнивание страниц, сопоставление студентов, извлечение ответов, распознавание и хранение.',
      result: 'Рабочее офлайн-приложение, в котором весь процесс идёт на одном компьютере, а ручная проверка занимает мало времени.',
      status: 'Активно дорабатывается.',
    },
    'road-damage-detection': {
      challenge: 'Точно размечать тонкие трещины неправильной формы и оценивать, насколько серьёзно повреждение.',
      role: 'Переделал подход к разметке и построил пайплайн сегментации, классификации и оценки.',
      result: 'Модель нашла 91% повреждений в тестовых данных (полнота 0,91) при целевом значении 0,90 в отчёте AIWORKX.',
      status: 'Завершён и прошёл независимые испытания.',
    },
    'text-mining-fundamentals': {
      challenge: 'Сделать анализ текста практическим и воспроизводимым для студентов с очень разной подготовкой.',
      role: 'Разработал структуру курса, ноутбуки, наборы данных и инструкцию по настройке.',
      result: 'Курс, который можно использовать повторно: от сбора текстов до классического анализа, тематического моделирования и нейросетевой классификации.',
      status: 'Готовый учебный материал.',
    },
    'semantic-segmentation-modality-reduction': {
      challenge: 'Уменьшить зависимость от дорогих сенсоров ближнего ИК и LiDAR, не потеряв слишком много в качестве сегментации.',
      role: 'Соавтор статьи; проводил эксперименты по дистилляции знаний «учитель — ученик».',
      result: 'RGB-модель-ученик достигла mIoU 0,6002 и закрыла 62,8% разрыва с мультисенсорным учителем.',
      status: 'Доклад на AEECA 2025, статья опубликована в IEEE Xplore.',
    },
    'daily-doer-agent': {
      challenge: 'Решать повседневные дела — расписание, почту, новости — в одном чате, текстом или голосом.',
      role: 'Написал автоматизацию на Python и интеграции с Telegram и сервисами Google.',
      result: 'Рабочий бот, который принимает текстовые и голосовые запросы и выполняет несколько дел в рамках одного диалога.',
      status: 'Личный проект завершён, код на GitHub.',
    },
    'local-llm-assistant': {
      challenge: 'Пользоваться языковой моделью с телефона, не выпуская запросы и документы за пределы своего компьютера.',
      role: 'Сделал локальный сервер модели, API и мобильное приложение на Flutter.',
      result: 'Прототип, который общается с офлайн-моделью через локальную сеть. В облачные модели ничего не уходит.',
      status: 'Личный проект завершён, код на GitHub.',
    },
    'autonomous-hexapod-robot': {
      challenge: 'Заставить 18 сервоприводов, датчики, питание и напечатанные детали работать вместе так, чтобы робот уверенно ходил.',
      role: 'Спроектировал и собрал робота, написал управление ходьбой и объездом препятствий.',
      result: 'Робот ходит трёхопорной походкой, обходит близкие препятствия и следует за зелёным маркером.',
      status: 'Завершённый студенческий проект, есть видео.',
    },
    'autonomous-ball-launcher': {
      challenge: 'Следить за движущейся целью и автоматически подстраивать направление и силу броска.',
      role: 'Объединил компьютерное зрение, измерение расстояния, управление моторами и механику установки.',
      result: 'Установка следит за цветной целью, измеряет расстояние до неё и подбирает силу броска.',
      status: 'Завершённый студенческий проект, есть видео.',
    },
  },
};
