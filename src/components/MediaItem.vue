<template>
  <div class="media-card" @click="goToDetails">
    <img v-if="media.poster" :src="getPosterUrl(media.poster)" alt="Poster" class="poster" />
    <h3>{{ media.title }}</h3>
  </div>
</template>

<script>
export default {
  name: "MediaItem",
  props: {
    media: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getPosterUrl(filename) {
      if (!filename) return "";
      return `http://localhost:3000/uploads/${filename}`;
    },
    goToDetails() {
      this.$router.push(`/media/${this.media.id}`);
    },
  },
};
</script>

<style scoped>
.media-card {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer; /* 🖱️ indicates it's clickable */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* smooth hover effect */
}

.media-card:hover {
  transform: translateY(-3px); /* slight lift */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* subtle shadow */
}

.poster {
  width: 100px;
  height: auto;
  display: block;
  margin-bottom: 0.5rem;
}
</style>
