---
layout: ../../../layouts/Layout.astro
title: "Основы анализа текста на Python"
description: "Практический курс, который я сделал, работая ассистентом преподавателя: от парсинга сайтов и частот слов до тематических моделей и LSTM."
date: "2025-12-15"
category: "Обучение / NLP"
tags: ["NLP", "Разработка курса", "Jupyter", "Kiwi"]
---

## Обзор

Анализ текста находится ровно между неупорядоченным сырым текстом и структурированными данными, которые нужны моделям. Работая ассистентом преподавателя, я заметил, что студенты обычно застревают в двух местах: при настройке окружения и при переходе от матриц tf-idf к нейросетевым эмбеддингам.

Чтобы помочь и с тем и с другим, я сделал курс **«Основы анализа текста на Python»** для кафедры Big Data Science **Университета Корё**. Это 11 практических Jupyter-ноутбуков, которые проходят весь цикл анализа текста, а сам курс опирается на корейский учебник *«잡아라! 텍스트마이닝 with 파이썬»*.

## Что входит в курс

Ноутбуки разбиты на четыре части:

<ol class="flow">
  <li><strong>Сбор данных</strong>Парсинг сайтов (<code>Crawling.ipynb</code>).</li>
  <li><strong>Подсчёты и словари</strong>Частоты слов, словари тональности, совместная встречаемость.</li>
  <li><strong>Группировка документов</strong>Разбиение на кластеры и иерархическая кластеризация.</li>
  <li><strong>Смысл</strong>Тематические модели LDA, эмбеддинги Word2Vec и LSTM для тональности.</li>
</ol>

### По ноутбукам

1. **Парсинг (`Crawling.ipynb`):** HTTP-запросы и разбор HTML с помощью `requests` и BeautifulSoup.
2. **Частоты слов (`Word Frequency Analysis.ipynb`):** токенизация, удаление стоп-слов и графики частот в NLTK и Matplotlib.
3. **Тональность по словарям (`Simple sentiment analysis.ipynb`, `Sentiment Analysis.ipynb`):** оценка текста с помощью AFINN и собственных словарей.
4. **Совместная встречаемость (`Co-occurrence Frequency Analysis.ipynb`):** матрицы совместной встречаемости слов и сети слов в NetworkX.
5. **Сходство (`Association Analysis with TF-IDF & Cosine Similarity.ipynb`):** веса TF-IDF и косинусное сходство между документами.
6. **Кластеризация (`Partitional Clustering.ipynb`, `Hierarchical Clustering.ipynb`):** k-средних и агломеративная кластеризация в scikit-learn и SciPy.
7. **Эмбеддинги слов (`Association Analysis with Word2Vec.ipynb`):** обучение моделей CBOW и skip-gram в Gensim.
8. **Тематическое моделирование (`LDA Topic Modeling.ipynb`):** поиск скрытых тем в коллекции документов с помощью LDA.
9. **Глубокое обучение (`LSTM-based Sentiment Analysis.ipynb`):** LSTM-сеть на TensorFlow/Keras, которая определяет тональность по дополненным последовательностям токенов.

## Чтобы всё запускалось у всех

Ничто так не губит занятие, как «а у меня работает». Поэтому курс начинается с единой настройки окружения, которую проходят все студенты.

### Окружение Conda

```bash
# 1. Создать чистое окружение
conda create -n textmining python=3.9 -y

# 2. Активировать его
conda activate textmining

# 3. Установить поддержку Jupyter
pip install ipykernel notebook

# 4. Зарегистрировать окружение как ядро Jupyter
python -m ipykernel install --user --name textmining --display-name "Python (textmining)"
```

### Зависимости

В `requirements.txt` зафиксированы основные библиотеки:

- **Основа:** `numpy`, `pandas`, `scipy`
- **Графики:** `matplotlib`, `seaborn`, `wordcloud`
- **Машинное обучение:** `scikit-learn`, `pyclustering`, `networkx`
- **NLP:** `nltk`, `gensim`, `afinn`
- **Глубокое обучение:** `tensorflow`
- **Парсинг:** `beautifulsoup4`, `requests`
- **Корейский язык:** `kiwipiepy` (морфологический анализатор Kiwi)
