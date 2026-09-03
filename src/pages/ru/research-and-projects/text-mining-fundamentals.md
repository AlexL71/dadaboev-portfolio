---
layout: ../../../layouts/Layout.astro
title: "Основы анализа текста с Python"
description: "Практический учебный курс по сбору текстов, анализу тональности на основе словарей, тематическому моделированию и LSTM-сетям."
date: "2025-12-15"
category: "Обработка текста"
tags: ["Обработка естественного языка", "Разработка учебного курса", "Jupyter Notebooks", "Kiwi NLP"]
---

## Обзор

Анализ текста связывает неструктурированные документы со статистикой и прогнозными моделями. Студентам часто мешают сложная настройка окружения и резкий переход от матриц TF-IDF к эмбеддингам и последовательным моделям глубокого обучения.

В рамках работы ассистентом преподавателя на кафедре Big Data Science **Университета Корё** я подготовил курс **«Основы анализа текста с Python»**. Он состоит из 11 практических ноутбуков Jupyter, которые последовательно охватывают весь процесс анализа текста. В качестве основы использовался корейский учебник *«잡아라! 텍스트마이닝 with 파이썬»*.

---

## Структура курса

Каждая тема оформлена как отдельный самостоятельный ноутбук в репозитории проекта:

```mermaid
graph TD
    A[Основы анализа текста] --> B[Сбор данных]
    A --> C[Лексический и статистический анализ]
    A --> D[Кластеризация документов]
    A --> E[Семантическое моделирование]

    B --> B1[Crawling.ipynb]
    C --> C1[Word Frequency.ipynb]
    C --> C2[Sentiment Analysis.ipynb]
    C --> C3[Co-occurrence Analysis.ipynb]
    D --> D1[Partitional Clustering.ipynb]
    D --> D2[Hierarchical Clustering.ipynb]
    E --> E1[LDA Topic Modeling.ipynb]
    E --> E2[Word2Vec Embeddings.ipynb]
    E --> E3[LSTM Sentiment Networks.ipynb]
```

### Учебные модули

1. **Автоматический сбор (`Crawling.ipynb`):** HTTP-запросы и разбор HTML с BeautifulSoup и requests.
2. **Частотный анализ (`Word Frequency Analysis.ipynb`):** токенизация, удаление стоп-слов и визуализация частот с NLTK и Matplotlib.
3. **Анализ тональности на основе словарей (`Simple sentiment analysis.ipynb`, `Sentiment Analysis.ipynb`):** AFINN и собственные словари.
4. **Совстречаемость (`Co-occurrence Frequency Analysis.ipynb`):** матрицы совстречаемости и семантические сети NetworkX.
5. **Сходство текстов (`Association Analysis with TF-IDF & Cosine Similarity.ipynb`):** веса TF-IDF и матрицы косинусного сходства.
6. **Кластеризация документов (`Partitional Clustering.ipynb`, `Hierarchical Clustering.ipynb`):** K-Means и агломеративная иерархическая кластеризация в scikit-learn и SciPy.
7. **Word2Vec (`Association Analysis with Word2Vec.ipynb`):** обучение моделей CBOW и skip-gram в Gensim.
8. **Тематическое моделирование LDA (`LDA Topic Modeling.ipynb`):** поиск скрытых тематических смесей в коллекции документов.
9. **Последовательные модели глубокого обучения (`LSTM-based Sentiment Analysis.ipynb`):** рекуррентная сеть LSTM в TensorFlow и Keras для классификации тональности.

---

## Воспроизводимое окружение

Чтобы ноутбуки одинаково работали на компьютерах студентов, курс задаёт единый порядок настройки окружения.

### Настройка Conda

Студенты создают отдельное виртуальное окружение с фиксированной версией Python:

```bash
# 1. Создать чистое виртуальное окружение
conda create -n textmining python=3.9 -y

# 2. Активировать окружение
conda activate textmining

# 3. Установить Jupyter и поддержку ядер
pip install ipykernel notebook

# 4. Зарегистрировать отдельное ядро Jupyter
python -m ipykernel install --user --name textmining --display-name "Python (textmining)"
```

### Необходимые зависимости

Файл `requirements.txt` фиксирует основные библиотеки:

- **Обработка данных:** `numpy`, `pandas`, `scipy`
- **Визуализация:** `matplotlib`, `seaborn`, `wordcloud`
- **Машинное обучение:** `scikit-learn`, `pyclustering`, `networkx`
- **Анализ текста:** `nltk`, `gensim`, `afinn`
- **Глубокое обучение:** `tensorflow`
- **Сбор данных:** `beautifulsoup4`, `requests`
- **Корейский язык:** `kiwipiepy`, морфологический анализатор Kiwi
