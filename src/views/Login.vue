<template>
  <div>
    <h1>ログイン画面</h1>
    <table>
      <tr>
        <td>
          <label for="email">E-mail</label>
        </td>
        <td>
          <input id="email" type="email" v-model="email" />
        </td>
      </tr>

      <tr>
        <td>
          <label for="password">Password</label>
        </td>
        <td>
          <input id="password" type="password" v-model="password" />
        </td>
      </tr>
    </table>
    <br />
    <br />

    <button @click="login">ログイン</button>
    <br />
    <router-link to="/register">新規登録はこちらから</router-link>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          alert(error.message);
        });
      this.email = "";
      this.password = "";
    },
    created: function() {
      console.log("called created at login");
    },
    mounted: function() {
      console.log("called mounted at login");
    },
    beforeDestroy: function() {
      console.log("called beforeDestroy at login");
    }
  }
};
</script>