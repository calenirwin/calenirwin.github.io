---
layout: home
title: Welcome
---

# Calen Irwin

Hello, I'm **Cale**. I like to learn and share what I learn with others.

## About Me

I'm working on rail autonomy research at Hitachi Rail in Toronto.

On the side, I read everything I can and escape to the parks of Southern Ontario whenever possible.

## Recent Posts

{% raw %}{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}{% endraw %}

## Get In Touch

- [GitHub](https://github.com/calenirwin)
- [Email](mailto:calen.irwin@gmail..com)

---

*This site is built with Jekyll and hosted on GitHub Pages.*

