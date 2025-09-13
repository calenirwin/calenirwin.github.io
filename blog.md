---
layout: page
title: Blog
permalink: /blog/
---

# Blog

Welcome to my blog! Here I share thoughts on technology, development experiences, tutorials, and insights from my journey in software development.

{% raw %}{% for post in site.posts %}
## [{{ post.title }}]({{ post.url }})

**{{ post.date | date: "%B %d, %Y" }}**

{{ post.excerpt }}

[Read more...]({{ post.url }})

---
{% endfor %}{% endraw %}

## Subscribe

Stay updated with my latest posts by following me on [GitHub](https://github.com/calenirwin) or subscribing to the [RSS feed](/feed.xml).

---

*Have a topic you'd like me to write about? Feel free to reach out!*

