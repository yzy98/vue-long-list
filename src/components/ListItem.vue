<script setup>
const props = defineProps({
  post: Object
});
</script>

<template>
  <div class="post">
    <h2>{{ props.post.author }}</h2>
    <p>{{ props.post.content }}</p>
  </div>
</template>

<style scoped>
  .post {
    background: #fff;
  }
  .post:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
  .post h2 {
    color: lightcoral;
  }
  .post p {
    color: #888;
  }
</style>