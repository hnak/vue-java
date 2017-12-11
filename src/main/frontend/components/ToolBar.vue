<template>
  <v-toolbar clipped-left fixed app dark class="primary">
    <v-toolbar-side-icon v-on:click="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Toolbar extends Vue {
  public toggleDrawer()  {
    this.$store.commit("toggleDrawer");
  }
}
</script>