# Agent Handover: Portfolio, Resume & Writing

Technical context for anyone (human or AI agent) working on this codebase: layout, conventions, and rules.

---

## 1. Structure

The site is an Astro static site in three languages: English (`/`), Korean (`/ko/`), and Russian (`/ru/`).

```
src/
├── i18n/site.ts                 # ALL interface copy for all three languages (home, about, resume,
│                                #   project/book/essay index pages, header, footer, labels)
├── data/projectSummaries.ts     # 4-part summary shown at the top of each project page, per language
├── layouts/Layout.astro         # <head>, header, footer, theme toggle, article layout for .md pages
├── components/
│   ├── pages/                   # One component per page type, rendered for any locale:
│   │   ├── HomePage.astro       #   <HomePage locale="ko" />
│   │   ├── AboutPage.astro
│   │   ├── ResumePage.astro
│   │   ├── ProjectsPage.astro
│   │   ├── BooksPage.astro
│   │   └── EssaysPage.astro
│   ├── EducationList.astro      # Shared education list (home, about, resume)
│   ├── EducationTitle.astro     # Degree title with school logo
│   └── InstitutionLink.astro    # Small external-link icon after a school name
├── pages/
│   ├── index.astro, about.astro, resume.astro           # thin wrappers: <XPage locale="en" />
│   ├── research-and-projects/*.md   # project write-ups (EN)
│   ├── essays/*.md                  # personal essays (EN, not linked from the nav)
│   ├── books/*.md                   # one file per book (frontmatter only)
│   ├── ko/...                       # same tree, Korean
│   └── ru/...                       # same tree, Russian
└── styles/global.css            # design tokens (light + dark), shared components, prose styles
```

To change text on the home, about, or resume pages, edit `src/i18n/site.ts`. Don't add copy directly to the page components.

---

## 2. Design system

- **No CSS framework.** Everything is in `src/styles/global.css` plus scoped `<style>` blocks in components.
- **Tokens:** colors are CSS variables on `:root`. Dark mode follows the OS by default and can be forced with the header toggle, which sets `data-theme="light|dark"` on `<html>` and saves it to `localStorage`.
- **Type:** Inter (Latin, Cyrillic), Pretendard (Korean, loaded on `/ko/` only), JetBrains Mono for labels, dates, and metadata.
- **Motif:** the `.bbox` utility draws detection-box corner ticks (used on the logo mark and the home portrait).
- **Pipelines in project notes:** use `<ol class="flow"><li><strong>Step</strong>Description</li></ol>` instead of Mermaid. Mermaid is not rendered on this site.
- **Math:** `remark-math` + `rehype-katex`. Inline `$...$`, block `$$...$$`. In Russian text, write decimal commas inside math as `0{,}5`.
- **Korean markdown:** when bold text ends with `)`, `%`, or a closing quote, a Korean particle can't follow it directly (CommonMark won't close the bold). Move the parenthesis outside: `**필기 인식**(HTR)이`.

---

## 3. Terminology rule

> [!IMPORTANT]
> Never use the word **"forensic"** to describe model performance, test reports, evaluations, or error analyses. Use *empirical evaluation*, *comparative analysis*, *systematic audit*, or *error analysis* instead.

---

## 4. Adding content

Create a `.md` file in the matching folder for **each** language (`src/pages/…`, `src/pages/ko/…`, `src/pages/ru/…`). Index pages pick files up automatically.

**Project** (`research-and-projects/*.md`):
```yaml
---
layout: ../../layouts/Layout.astro      # ../../../layouts/Layout.astro under ko/ and ru/
title: "Project title"
description: "One or two plain sentences."
date: "YYYY-MM-DD"
category: "Computer Vision"
tags: ["Tag1", "Tag2"]
---
```
Also add the project's summary to `src/data/projectSummaries.ts` for all three languages. To feature it, add its slug to `featuredProjectSlugs` in `src/i18n/site.ts`.

**Essay** (`essays/*.md`): `layout`, `title`, `description`, `date`, `tags`.

**Book** (`books/*.md`): `layout`, `title`, `author`, `date` (may be empty), `cover` (path under `public/book covers/`), `description`.

### Writing style
Write like a person, not a brochure: first person, short sentences, concrete numbers, no filler such as "leveraging", "robust", "cutting-edge", or "seamless". Korean pages use 합쇼체 (-습니다); Korean essays use 평어체 (-다).
