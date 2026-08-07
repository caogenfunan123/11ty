---
layout: layout.njk
permalink: false
---

# {{ site.title }}

> {{ site.description }}

## 文章列表

{% assign posts = collections.post | reverse %}
{% for post in posts %}
- [{{ post.data.title }}]({{ post.url }}) — {{ post.data.date | date: "%Y-%m-%d" }}
{% else %}
暂无文章
{% endfor %}
