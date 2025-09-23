<template>
  <div class="signup-page">
    <h1>Créer un compte</h1>

    <form @submit.prevent="handleSignup">
      <div>
        <label for="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          required
          placeholder="Votre pseudo"
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="********"
        />
      </div>

      <button type="submit">S'inscrire</button>
    </form>

    <!-- Messages -->
    <p v-if="message" :class="{ error: isError, success: !isError }">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
      message: "",
      isError: false,
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur lors de l'inscription");
        }

        // ✅ Save token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // ✅ Succès
        this.message = "Inscription réussie 🎉 Bienvenue " + data.user.username;
        this.isError = false;

        // Reset form
        this.form = { username: "", email: "", password: "" };
      } catch (err) {
        // ❌ Erreur
        this.message = err.message;
        this.isError = true;
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
form div {
  margin-bottom: 15px;
}
button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #369870;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
