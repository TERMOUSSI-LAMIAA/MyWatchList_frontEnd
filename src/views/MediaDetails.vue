<template>
  <div v-if="media">
    <h2>{{ media.title }}</h2>
    <img v-if="media.poster" :src="getPosterUrl(media.poster)" alt="Poster" />

    <p>
      <strong>Type:</strong>
      {{ media.type }}
    </p>
    <p>
      <strong>Genre:</strong>
      {{ media.genre }}
    </p>
    <p>
      <strong>Status:</strong>
      {{ media.status }}
    </p>
    <p>
      <strong>Progress:</strong>
      {{ media.progress }}
    </p>
    <p>
      <strong>Description:</strong>
      {{ media.description }}
    </p>

    <div class="actions">
      <button @click="deleteMedia">🗑 Delete</button>
      <button @click="editing = true">✏️ Edit</button>
    </div>

    <div v-if="editing" class="modal-overlay">
      <div class="modal">
        <button class="close-btn" @click="editing = false">✖</button>
        <MediaForm :initialData="media" mode="edit" @media-updated="handleMediaUpdated" />
      </div>
    </div>
  </div>
</template>

<script>
import MediaForm from "../components/MediaForm.vue";

export default {
  name: "MediaDetails",
  props: ["id"],
  components: { MediaForm },
  data() {
    return {
      media: null,
      editing: false,
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/media/${this.id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      if (!response.ok) throw new Error("Failed to fetch media details");
      this.media = await response.json();
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    getPosterUrl(poster) {
      return `http://localhost:3000/uploads/${poster}`;
    },
    async deleteMedia() {
      const confirmDelete = confirm("Are you sure?");
      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/media/${this.id}`, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        });

        if (!response.ok) throw new Error("Failed to delete media");

        alert("Media deleted!");
        this.$router.push("/medialist");
      } catch (err) {
        console.error(err);
      }
    },
    handleMediaUpdated(updatedMedia) {
      this.media = updatedMedia;
      this.editing = false;
    },
  },
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: rgb(0, 0, 0);
  padding: 1rem;
  border-radius: 8px;
  position: relative;
}
.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>