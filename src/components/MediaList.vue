<template>
  <div>
    <h2>My Media List</h2>
    <!-- Add Media button -->
    <button @click="showForm = true">Add Media</button>

    <!-- Pop-up / Modal -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal">
        <button class="close-btn" @click="showForm = false">✖</button>
        <MediaForm @media-added="handleMediaAdded" />
      </div>
    </div>

    <div v-if="medias.length === 0">
      <p>You don’t have any media yet.</p>
    </div>
    <MediaItem v-for="media in medias" :key="media.id" :media="media" />
  </div>
</template>

<script>
import MediaItem from "./MediaItem.vue";
import MediaForm from "./MediaForm.vue";

export default {
  name: "Watchlist",
  components: { MediaItem, MediaForm },
  data() {
    return {
      medias: [],
      showForm: false,
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/api/media", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) throw new Error("Failed to load watchlist");

      const data = await response.json();
      console.log("📦 Response data:", data);
      this.medias = data; // because backend sends `res.json(medias)`
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    handleMediaAdded(newMedia) {
      // Add new media to the list and close modal
      this.medias.push(newMedia);
      this.showForm = false;
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