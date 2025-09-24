<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Title:</label>
      <input type="text" v-model="form.title" required />
    </div>

    <div>
      <label>Type:</label>
      <select v-model="form.type" required>
        <option value="MOVIE">Movie</option>
        <option value="SERIES">Series</option>
      </select>
    </div>

    <div>
      <label>Genre:</label>
      <input type="text" v-model="form.genre" />
    </div>

    <div>
      <label>Status:</label>
      <select v-model="form.status" required>
        <option value="TO_WATCH">To Watch</option>
        <option value="WATCHING">Watching</option>
        <option value="WATCHED">Watched</option>
      </select>
    </div>

    <div>
      <label>Progress:</label>
      <input type="text" v-model="form.progress" placeholder="e.g. Episode 3" />
    </div>

    <div>
      <label>Description:</label>
      <textarea v-model="form.description"></textarea>
    </div>

    <div>
      <label>Poster:</label>
      <input type="file" @change="handleFileChange" />
    </div>

    <button type="submit">Add Media</button>
    <p v-if="message" :class="{ error: isError, success: !isError }">{{ message }}</p>
  </form>
</template>

<script>
export default {
  name: "MediaForm",
  data() {
    return {
      form: {
        title: "",
        type: "MOVIE",
        genre: "",
        status: "TO_WATCH",
        progress: "",
        description: "",
        poster: null, // file object
      },
      message: "",
      isError: false,
    };
  },
  methods: {
    handleFileChange(event) {
      this.form.poster = event.target.files[0];
    },
    async handleSubmit() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You must be logged in");

        const formData = new FormData();
        for (const key in this.form) {
          if (this.form[key] !== null) {
            formData.append(key, this.form[key]);
          }
        }

        const response = await fetch("http://localhost:3000/api/media", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to add media");

        // Emit new media to parent
        this.$emit("media-added", data.media);

        // Reset form
        this.form = {
          title: "",
          type: "MOVIE",
          genre: "",
          status: "TO_WATCH",
          progress: "",
          description: "",
          poster: null,
        };
        this.message = "Media added successfully 🎉";
        this.isError = false;
      } catch (err) {
        this.message = err.message;
        this.isError = true;
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input, select, textarea, button {
  padding: 0.4rem;
  font-size: 1rem;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>

