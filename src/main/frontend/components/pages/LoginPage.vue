<template>
  <div>
    <router-view></router-view>
    <h4>login</h4>
    <v-btn light v-on:click="doLogin">Login!</v-btn>
    <v-btn light v-on:click="doLogout">Logout!</v-btn>
    <p>{{ isLogin }}</p>
    
  </div>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";

import store from "@/store/store";

@Component({
  store
})
export default class LoginPage extends Vue {

  public get isLogin()  {
    return this.$store.getters.isLogin;
  }

  public doLogin()  {
    this.$store.commit("doLogin");
  }

  
  public doLogout()  {
    this.$store.commit("doLogout");
  }
}
</script>