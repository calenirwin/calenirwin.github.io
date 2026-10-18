---
title: Building this site
date: 2026-10-11
published: true
description: How a conversation with Codex became a portfolio I can host for
  free and keep editing without touching the code
tags:
  - AI
  - Codex
---
For many, many years I have wanted a small space on the internet to organize my work and share my ideas. I have experimented with lots of different personal websites over the years. I have made a site with handwritten HTML and CSS, used a plug-and-play template, and asked various agent harnesses to build something. All of these end results were interesting to begin with, but I quickly lost motivation to maintain them because manually editing HTML or MD files, then committing them was slow and full of friction.

The latest iteration of my portfolio, this site, came to be after a conversation with ChatGPT on the mobile app. I started by pointing it to my existing portfolio repository and a design system I worked on in a previous session that was based on a particular cover of *The Once and Future King* that I love. I explained my frustration with trying to build a habit of maintaining this site and mentioned I would like to be able to edit the content of my site in one clean view. From there, I found out about Pages CMS and figured out that there was a workflow that I may actually enjoy. Turns out, I do!

## Using Pages CMS to edit in my voice

The part that makes this sustainable for me is [Pages CMS](https://pagescms.org/). My posts, project descriptions, and main page copy are stored as Markdown, but Pages CMS gives me a clean editor on top of those files.

That creates a really useful separation of concerns. Codex can build a page, configure a new content type, or help me get an article started. I can then open Pages CMS to rewrite a paragraph, change a title, upload an image, or publish a draft. The edit is committed back to GitHub and deployed like any other change.

AI-generated writing is something I do not want to accept without reading closely. The first draft can save time, but I still want whatever I host on my site to be from me. Pages CMS makes that part easy because changing the writing does not require changing the site itself.

## A prompt to build something similar

If you have Codex, ChatGPT, or another coding assistant that can work with a GitHub repository, this prompt is a good starting point. Replace the details in brackets with your own.

```text
Help me create and publish a personal portfolio and blog in my GitHub repository.

I want the site to include Home, Blog, Projects, About, and CV pages. Use Astro to create a fast static site that can be hosted on GitHub Pages. Configure a GitHub Actions deployment and Pages CMS so I can edit page copy, create blog posts, manage project pages, upload images, save drafts, and publish content without editing code.

Use this visual direction: [describe your design system, colours, typography, references, and the feeling you want]. The site should feel personal, polished, accessible, and work well on phones and desktop screens.

My name is [your name]. I am [your role and a short description of your work]. The projects I want to feature are [list projects or leave placeholders]. My social links are [links]. Do not invent experience, achievements, or biographical details. Keep uncertain content clearly marked as a draft for me to edit.

Store editorial content in Markdown with clear frontmatter. Add a published switch so drafts never appear on the built site. Keep the content compatible with Pages CMS and make the code easy to maintain. Preserve any existing work in the repository and check for newer remote edits before pushing.

Work directly in the repository. First inspect the current project and its instructions, then implement the site in sensible steps. Use your judgement for routine choices instead of stopping for every decision. Show me the site as it develops, run the appropriate checks, fix any issues you find, and explain how I can update it afterward. You may commit and push the finished site once the checks pass.
```

The more useful details you put into the visual direction and personal background, the less generic the first version will feel. You do not need to know every design or technical decision before you start. Being able to react to a working page is part of what makes this process so effective.

This site will keep changing as I add work and ideas to it. I am going to become a better writer but it will take time and consistency. This site is set up to nudge me in the right direction. To make practicing my writing and sharing my projects something that feels easy and unburdened. If you read this far and have any advice on writing or building an online presence, please reach out!

Calen
