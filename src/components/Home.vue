<template>
  <div class="home">
    <h1>Florent Cima's website</h1>
    <p>Hello there. This is an early release listing my Medium blog posts.</p>
    <Blog/>
  </div>
</template>

<script>
import Blog from "@/components/Blog.vue";

export default {
  components: {
    Blog
  }
}
</script>
