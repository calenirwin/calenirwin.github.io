---
layout: page
title: Blog
permalink: /blog/
subtitle: Thoughts on Technology, AI, Rail Industry, and More
description: Technical blog covering data science, rail autonomy, AI, startups, literature, gaming, and wellness. Insights from my journey in technology and transportation.
---

## About This Blog

Welcome to my technical blog! Here I share insights, experiences, and thoughts on a wide range of topics that intersect with my professional work and personal interests. You'll find content covering:

### Core Topics
- **Data Science & AI**: Machine learning, statistical analysis, and artificial intelligence applications
- **Rail Autonomy**: Transportation technology, autonomous systems, and rail industry insights
- **Technology Trends**: Emerging technologies, startups, and innovation in various industries
- **Professional Development**: Career insights, learning strategies, and industry observations

### Personal Interests
- **Literature & Philosophy**: Book reviews, thought experiments, and intellectual exploration
- **Gaming & Interactive Media**: Game design, storytelling, and the intersection of technology and entertainment
- **Wellness & Lifestyle**: How technology can enhance human well-being and work-life balance

## Recent Posts

{% raw %}{% for post in site.posts %}
<article class="post-preview">
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <div class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        {% if post.categories %}
            <span>in {{ post.categories | join: ', ' }}</span>
        {% endif %}
        {% if post.read_time %}
            <span>{{ post.read_time }} min read</span>
        {% endif %}
    </div>
    {% if post.excerpt %}
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    {% endif %}
    {% if post.tags %}
    <div class="post-tags">
        {% for tag in post.tags %}
        <span class="tag">{{ tag }}</span>
        {% endfor %}
    </div>
    {% endif %}
</article>
{% endfor %}{% endraw %}

## Categories

Explore posts by topic:

- **[Data Science](/blog/category/data-science/)** - Machine learning, statistics, and analytics
- **[Rail Autonomy](/blog/category/rail-autonomy/)** - Transportation technology and autonomous systems
- **[Technology](/blog/category/technology/)** - General tech trends and innovations
- **[Literature](/blog/category/literature/)** - Book reviews and literary discussions
- **[Gaming](/blog/category/gaming/)** - Game design and interactive media
- **[Wellness](/blog/category/wellness/)** - Technology and human well-being

## Stay Connected

Keep up with my latest posts through:

- **[RSS Feed](/feed.xml)** - Subscribe for automatic updates
- **[GitHub](https://github.com/calenirwin)** - Follow for project updates and technical content
- **[LinkedIn](https://linkedin.com/in/calen-irwin)** - Professional insights and industry discussions
- **[Email Newsletter](mailto:calen.irwin@gmail.com)** - Contact me to discuss topics or suggest content

## Guest Posts & Collaboration

I'm always interested in collaborating with other writers and thought leaders. If you have:
- **Technical expertise** to share in data science, AI, or transportation
- **Unique perspectives** on technology, literature, or innovation
- **Collaboration ideas** for joint posts or series

Feel free to reach out at [calen.irwin@gmail.com](mailto:calen.irwin@gmail.com).

---

*Have a topic you'd like me to explore? I'm always looking for new ideas and perspectives to share with the community.*

