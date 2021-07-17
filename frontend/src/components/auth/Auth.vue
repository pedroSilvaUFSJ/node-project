<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" alt="Logo" width="200" />
      <hr />
      <div class="auth-title">
        {{ showSignup ? "Cadastro" : "Login" }}
      </div>
      <input
        name="name"
        type="text"
        v-if="showSignup"
        v-model="user.name"
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        v-model="user.email"
        placeholder="E-mail"
      />
      <input
        name="password"
        type="password"
        v-model="user.password"
        placeholder="Password"
      />
      <input
        name="confirmPassword"
        type="password"
        v-if="showSignup"
        v-model="user.confirmPassword"
        placeholder="Confirm Password"
      />
      <button v-else @click="signin">Signin</button>
      <button v-if="showSignup" @click="signup">Signup</button>
      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Are you a member? Signin</span>
        <span v-else>Are you a member? Signin</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: () => {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}
.auth-modal a {
  margin-top: 35px;
}
.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1;
  background-image: linear-gradient(
    to right,
    rgb(255, 255, 255),
    rgba(120, 120, 120, 0),
    rgb(255, 255, 255)
  );
}
</style>