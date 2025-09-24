<template>
  <div class="media-card">
    <img v-if="media.poster" :src="getPosterUrl(media.poster)" alt="Poster" class="poster" />
    <h3>{{ media.title }}</h3>
    <p>
      <strong>Type:</strong>
      {{ media.type }}
    </p>
    <p v-if="media.genre">
      <strong>Genre:</strong>
      {{ media.genre }}
    </p>
    <p>
      <strong>Status:</strong>
      {{ media.status }}
    </p>
    <p v-if="media.progress">
      <strong>Progress:</strong>
      {{ media.progress }}
    </p>
    <p v-if="media.description">
      <strong>Description:</strong>
      {{ media.description }}
    </p>
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
      if (!filename) return '';
      return `http://localhost:3000/uploads/${filename}`;
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
}

.poster {
  width: 100px;
  height: auto;
  display: block;
  margin-bottom: 0.5rem;
}
</style>