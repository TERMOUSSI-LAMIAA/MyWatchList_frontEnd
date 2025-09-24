<template>
  <div class="login-page">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit">Login</button>
    </form>

    <p v-if="message" :class="{ error: isError, success: !isError }">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      message: "",
      isError: false,
    };
  },
  methods: {
    async handleLogin() {
      this.message = "";
      this.isError = false;

      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Backend returned an error
          this.isError = true;
          this.message = data.message || "Login failed";
          return;
        }

        // Success: store token and display welcome message
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.dispatchEvent(new Event("storage"));
        this.message = `Login successful 🎉 Welcome ${data.username}`;
        this.isError = false;
        this.$router.push("/");
      } catch (err) {
        this.isError = true;
        this.message = "An error occurred. Please try again.";
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input {
  width: 100%;
  padding: 0.4rem;
  margin: 0.4rem 0;
}

button {
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
