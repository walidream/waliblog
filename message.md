---
layout: page
title: 留言区
tagline: 
permalink: /message
comments: true
---

{% if site.disques.shortname %}	
	{% include disqus-comments.html %}		
{% endif %}


<script src="{{ '/assets/lib/av-mini-0.6.10.js?v=' | append: site.github.build_revision | relative_url }}"></script>
<script src="{{ '/assets/lib/hit-kounter-lc-0.2.0.js?v=' | append: site.github.build_revision | relative_url }} "></script>

<script src="{{ '/assets/js/post.bundle.js?v=' | append: site.github.build_revision | relative_url }}"></script>




