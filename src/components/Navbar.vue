<template>
  <nav>
    <router-link to="/">Home</router-link>
    <!-- If logged in -->
    <template v-if="isLoggedIn">
      <router-link to="/medialist">My MediaList</router-link>
      <span>{{ username }}</span>
      <button @click="logout">Logout</button>
    </template>

    <!-- If NOT logged in -->
    <template v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </template>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      username: localStorage.getItem("username") || null,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.username = null;
      this.isLoggedIn = false;
      this.$router.push("/login"); // redirect to login page
    },
    syncAuth() {
      this.username = localStorage.getItem("username");
      this.isLoggedIn = !!localStorage.getItem("token");
    },
  },
  mounted() {
    window.addEventListener("storage", this.syncAuth);

    this.syncAuth();
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.syncAuth);
  },
};
</script>
