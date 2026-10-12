---
title: "Building this portfolio with Codex, GitHub Pages, and Pages CMS"
date: "2026-10-11"
published: true
description: "How a conversation with Codex became a portfolio I can host for free, own through GitHub, and keep editing without touching the code."
tags:
  - AI
  - Codex
  - Building in public
cover: ""
coverAlt: ""
---

I wanted a place that felt like mine: a portfolio for my work, a home for side projects, and somewhere to write about AI. What I did not want was another half-finished website that I would need to relearn every time I wanted to update a sentence.

This site came together through a conversation with Codex. I started with a GitHub repository and an existing design system called Albion. From there, I described what I wanted in the same way I would explain it to another person: make the homepage more interesting, give projects their own space, stop repeating my name, add my CV, and make the portrait feel like it belongs with the rest of the design.

Codex worked directly in the repository, translated that direction into code, tested the result, and deployed it through GitHub Pages. I could keep the site open beside the conversation, look at each version, and respond with things like “this page feels too busy” or “the frame loads a little late.” Those are small observations, but they are usually where a website starts to feel considered.

## The easy part was the conversation

I am an AI developer, so I spend a lot of time thinking about how people actually adopt these tools. The interesting part of this experience was not that AI could produce HTML or CSS. It was how little translation was needed between an idea and a working change.

I did not need to turn every preference into a technical specification. Codex could inspect the project, understand the existing patterns, and work out which files needed to change. It also handled the less visible work: checking the site at different screen sizes, preserving content edited elsewhere, running tests, and watching the deployment finish.

That did not remove me from the process. I still made the product decisions. I chose the structure, the words, the tone, and what felt right or wrong when I looked at it. The feedback loop was simply much faster.

## GitHub Pages keeps it simple

The finished site is an Astro site hosted on GitHub Pages. The code and content live together in a repository I own, and a GitHub Action builds and publishes the site whenever the main branch changes.

That setup is useful for a personal site because there is very little machinery to maintain. There is no application server or content database, and the public site is made of static files. GitHub keeps the history, so every change is visible and reversible.

It also means Codex can help with more than the first version. I can come back with a new idea, ask it to inspect what is already there, and make a focused change without rebuilding the whole thing.

## Pages CMS gives me the last word

The part that makes this sustainable for me is [Pages CMS](https://pagescms.org/). My posts, project descriptions, and main page copy are stored as Markdown, but Pages CMS gives me a clean editor on top of those files.

That creates a useful division of labour. Codex can build a page, configure a new content type, or help me get an article started. I can then open Pages CMS to rewrite a paragraph, change a title, upload an image, or publish a draft. The edit is committed back to GitHub and deployed like any other change.

AI-generated writing is rarely something I want to accept without reading closely. The first draft can save time, but I still want the final words to sound like me. Pages CMS makes that part easy because changing the writing does not require changing the site itself.

The result is a workflow that feels practical: AI helps with momentum, GitHub gives me ownership and history, and the CMS keeps everyday editing approachable.

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

This site will keep changing as I add work and ideas to it. The important thing is that adding the next thing now feels easy.
