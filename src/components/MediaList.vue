<template>
  <div>
    <h2>My Media List</h2>
    <MediaItem v-for="media in medias" :key="media.id" :media="media" />
  </div>
</template>

<script>
import MediaItem from './MediaItem.vue';

export default {
  components: { MediaItem },
  data() {
    return {
      medias: [] // plus tard récupérer depuis API
    };
  }
};
</script>
