<template>
  <div>
    <router-view></router-view>
    <h1>member</h1>
    <v-btn light v-on:click="getUser">PUSH!</v-btn>
    <p>{{ user }}</p>
  </div>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";
import HttpClient from "@/http/httpclient";

@Component
export default class MemberPage extends Vue {
  private user: string = "init"

  private getUser() {
    this.user = HttpClient.getUser("12345");
  }
}
</script>