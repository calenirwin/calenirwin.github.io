---
layout: page
permalink: /blog/
---

<div class="blog-container">
  <!-- Main content area -->
  <div class="blog-main">
    <div id="all-posts" class="posts">
      {% for post in site.posts %}
      <div class="post" data-tags="{{ post.tags | join: ',' }}" data-year="{{ post.date | date: '%Y' }}">
        <h1 class="post-title">
          <a href="{{ post.url | relative_url }}">
            {{ post.title }}
          </a>
        </h1>

        <span class="post-date">{{ post.date | date_to_string }}</span>

        {% if post.tags and post.tags.size > 0 %}
        <div class="post-tags">
          {% for tag in post.tags %}
          <button class="post-tag-button" data-tag="{{ tag }}">{{ tag }}</button>
          {% endfor %}
        </div>
        {% endif %}

        {% if post.excerpt %}
          {{ post.excerpt }}
          {% if post.excerpt != post.content %}
            <p><a href="{{ post.url | relative_url }}">Read more →</a></p>
          {% endif %}
        {% else %}
          {{ post.content }}
        {% endif %}
      </div>
      {% endfor %}
    </div>

    {% if site.posts.size == 0 %}
    <div class="no-posts">
      <p>No posts yet, but stay tuned for insights on data science, rail autonomy, and the fascinating intersection of technology and transportation!</p>
    </div>
    {% endif %}
  </div>

  <!-- Tag navigation sidebar -->
  <div class="blog-sidebar">
    <div class="tag-navigation">
      <h3>Filter by Tag</h3>

      <div class="tag-list">
        <button class="tag-filter active" data-tag="all">All Posts <span class="tag-count">{{ site.posts.size }}</span></button>

        <!-- Year tags first -->
        <div class="tag-section">
          <h4>Years</h4>
          {% assign years = site.posts | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}
          {% for year_group in years %}
            <button class="tag-filter" data-tag="year-{{ year_group.name }}" data-type="year">{{ year_group.name }} <span class="tag-count">{{ year_group.items.size }}</span></button>
          {% endfor %}
        </div>

        <!-- Content tags -->
        <div class="tag-section">
          <h4>Topics</h4>
          <div class="tag-grid">
            {% assign all_tags = site.posts | map: "tags" | join: "," | split: "," | uniq | sort %}
            {% for tag in all_tags %}
              {% if tag != "" %}
                {% assign tag_posts = site.posts | where_exp: "post", "post.tags contains tag" %}
                <button class="tag-filter" data-tag="{{ tag }}" data-type="topic">{{ tag }} <span class="tag-count">{{ tag_posts.size }}</span></button>
              {% endif %}
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  let currentFilter = 'all';

  const tagFilters = document.querySelectorAll('.tag-filter');
  const postTagButtons = document.querySelectorAll('.post-tag-button');
  const posts = document.querySelectorAll('.post[data-tags]');

  function filterPosts(selectedTag) {
    currentFilter = selectedTag;

    posts.forEach(post => {
      let shouldShow = false;

      if (selectedTag === 'all') {
        shouldShow = true;
      } else if (selectedTag.startsWith('year-')) {
        const year = selectedTag.replace('year-', '');
        shouldShow = post.getAttribute('data-year') === year;
      } else {
        const postTags = post.getAttribute('data-tags').split(',').map(tag => tag.trim());
        shouldShow = postTags.includes(selectedTag);
      }

      post.style.display = shouldShow ? 'block' : 'none';
    });

    // Update post tag button states
    updatePostTagStates(selectedTag);
  }

  function updatePostTagStates(selectedTag) {
    postTagButtons.forEach(button => {
      const buttonTag = button.getAttribute('data-tag');
      if (buttonTag === selectedTag) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }

  function updateSidebarStates(selectedTag) {
    tagFilters.forEach(filter => {
      const filterTag = filter.getAttribute('data-tag');
      if (filterTag === selectedTag) {
        filter.classList.add('active');
      } else {
        filter.classList.remove('active');
      }
    });
  }

  // Sidebar filter click handlers
  tagFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const selectedTag = this.getAttribute('data-tag');

      // Toggle behavior: if already active, deselect (show all)
      if (this.classList.contains('active') && selectedTag !== 'all') {
        updateSidebarStates('all');
        filterPosts('all');
      } else {
        updateSidebarStates(selectedTag);
        filterPosts(selectedTag);
      }
    });
  });

  // Post tag click handlers
  postTagButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedTag = this.getAttribute('data-tag');

      // Toggle behavior: if already selected, deselect (show all)
      if (currentFilter === selectedTag) {
        updateSidebarStates('all');
        filterPosts('all');
      } else {
        updateSidebarStates(selectedTag);
        filterPosts(selectedTag);
      }
    });
  });
});
</script>

