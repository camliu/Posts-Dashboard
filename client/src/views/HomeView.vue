<script setup>
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const { getAllPosts } = usePostsStore();
const posts = ref([]);

onMounted(async () => (posts.value = await getAllPosts()));
</script>

<template>
  <main>
    <h1 class="title">Post</h1>

    <div v-if="posts.length > 0">
      <div
        v-for="post in posts"
        :key="'post.id'"
        class="border-l-4 border-blue-500 pl-4 mb-12"
      >
        <h2 class="font-bold text-3xl">{{ post.title }}</h2>
        <p class="text-xs text-slate-600 mb-4">
          Posted by {{ post.user.name }}
        </p>
        <p>{{ post.body }}</p>
        <RouterLink
          :to="{ name: 'show', params: { id: post.id } }"
          class="text-blue-500 font-bold underline"
          >Read more...</RouterLink
        >
      </div>
    </div>
    <div v-else><h2 class="title">There are no post</h2></div>
  </main>
</template>
