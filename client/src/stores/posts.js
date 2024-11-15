import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const usePostsStore = defineStore('postsStore', {
  state: () => {
    return {
      errors: {},
    };
  },
  actions: {
    async getAllPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();

      return data;
    },

    async getPost(post) {
      const res = await fetch(`/api/posts/${post}`);
      const data = await res.json();

      return data.post;
    },

    async createPost(formData) {
      const res = await fetch('/api/posts', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.router.push({ name: 'home' });
      }
    },
    async deletePost(post) {
      const authStore = useAuthStore();
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: 'delete',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          this.router.push({ name: 'home' });
        }
        console.log(data);
      }
    },
    async updatePost(post, formData) {
      const authStore = useAuthStore();
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: 'put',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
          this.errors = data.errors;
        } else {
          this.router.push({ name: 'home' });
          this.errors = {};
        }
      }
    },
  },
});
