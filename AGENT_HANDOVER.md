# Agent Handover Document - Portfolio, Resume Host & Blog

This document serves as the technical and architectural context for any future AI agents working on this codebase. It outlines the project's layout, constraints, design system, and operational procedures.

---

## 1. Current Directory Structure

Below is the clean ASCII tree of the final active application source (`src/`) and asset (`public/`) directories:

```
.
├── public/
│   ├── images/
│   │   ├── demian.jpg
│   │   ├── main.jpg
│   │   └── portrait.png
│   ├── Abdurakhmon_Dadaboev_Resume.pdf
│   ├── favicon.ico
│   └── favicon.svg
└── src/
    ├── layouts/
    │   └── Layout.astro
    ├── pages/
    │   ├── books/
    │   │   ├── demian.md
    │   │   └── index.astro
    │   ├── essays/
    │   │   ├── does-being-good-require-honesty.md
    │   │   ├── index.astro
    │   │   ├── on-love-and-usefulness.md
    │   │   ├── the-architecture-of-will.md
    │   │   ├── the-mandate-of-privilege.md
    │   │   ├── the-trapped-god.md
    │   │   └── the-true-hell.md
    │   ├── research-and-projects/
    │   │   ├── amorphous-bottleneck.md
    │   │   ├── index.astro
    │   │   ├── omr-htr-digitization.md
    │   │   ├── road-damage-detection.md
    │   │   ├── semantic-segmentation-modality-reduction.md
    │   │   └── text-mining-fundamentals.md
    │   ├── about.astro
    │   ├── contact.astro
    │   ├── index.astro
    │   └── resume.astro
    └── styles/
        └── global.css
```

*Note: All original reference files (PDFs, docs, and text files) are archived under `_reference_materials/` in the root folder, which is ignored by git.*

---

## 2. Tech Stack & Styling Rules

* **Astro Framework**: The site is built with Astro. The markdown compilation is configured to support LaTeX formatting.
* **LaTeX Math Equations**: Handled via `remark-math` and `rehype-katex` plugins. Markdown files can render inline equations with `$` (e.g. $C_w$) and block equations with `$$` (e.g. $$S = T_{TP} - \alpha \cdot T_{FP}$$). KaTeX stylesheets are imported in the main HTML layout head.
* **Fluid CSS Styling**: No Tailwind or CSS frameworks are used. All styling is defined in `src/styles/global.css` using vanilla CSS:
  - Responsive layouts are powered by CSS Grid and Flexbox with `flex-wrap: wrap` and `repeat(auto-fit, minmax(280px, 1fr))`.
  - No fixed widths or heights on primary container wrappers. Layout bounds are governed by fluid padding, `vw`/`vh`, and `rem` units, scaling up to a max-width variable of `75rem` (`1200px`).
  - Typography is fluidly scaled using `clamp()` (e.g. `clamp(2rem, 4vw + 0.5rem, 3rem)`).

---

## 3. Strict Terminology Constraint

> [!IMPORTANT]
> **Strict Constraint**: Under no circumstances should the word **"forensic"** be used to describe model performance, testing reports, systematic evaluations, or error analyses. Instead, always use standard academic/engineering terms such as:
> - *empirical evaluation*
> - *comparative analysis*
> - *systematic audit*
> - *error analysis*

---

## 4. Standard Operating Procedures (SOP)

### How to Add a New Item (Project, Essay, or Book Review)
To add content to `/research-and-projects`, `/essays`, or `/books`, create a new `.md` file inside the corresponding subfolder of `src/pages/`. The Astro router will dynamically map it and display it on its respective index page.

#### Required YAML Frontmatter Structure

1. **For Research & Projects (`src/pages/research-and-projects/*.md`)**:
   ```yaml
   ---
   layout: ../../layouts/Layout.astro
   title: "Project Title"
   description: "Brief 1-sentence technical description."
   date: "YYYY-MM-DD"
   category: "Model Architecture" # or "Computer Vision", "NLP", etc.
   tags: ["Tag1", "Tag2"]
   ---
   ```

2. **For Essays (`src/pages/essays/*.md`)**:
   ```yaml
   ---
   layout: ../../layouts/Layout.astro
   title: "Essay Title"
   description: "Brief philosophical or theoretical overview."
   date: "YYYY-MM-DD"
   tags: ["Tag1", "Tag2"]
   ---
   ```

3. **For Book Reviews (`src/pages/books/*.md`)**:
   ```yaml
   ---
   layout: ../../layouts/Layout.astro
   title: "Book Title"
   author: "Author Name"
   date: "YYYY-MM-DD"
   rating: "X/5"
   description: "Brief summary of key themes or takeaways."
   ---
   ```

### Working with Images
* **Native Component**: Never use standard HTML `<img>` tags for images in new Astro files.
* **Optimization**: Import the `Image` component from `astro:assets` and use it:
  ```astro
  ---
  import { Image } from 'astro:assets';
  ---
  
  <Image src="/images/your-image.jpg" width={500} height={500} alt="Description" />
  ```
  Provide explicit width/height values for static paths to enable Astro build-time optimizations and maintain high Lighthouse scores.
