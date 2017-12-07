<template>
  <div id="menu">
  <v-list dense class="pt-0">
    <v-list-tile v-for="menu in menus" :key="menu.title">
      <v-list-tile-action>
      <v-icon>{{ menu.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <router-link :to="menu.link" exact>{{ menu.title }}</router-link>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  </div>
</template>


<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Menu extends Vue {
    public menus = [
      { title: 'Index', icon: 'dashboard', link: '/' },
      { title: 'Home', icon: 'home', link: '/home' },
      { title: 'Member', icon: 'face', link: '/member' },
      { title: 'Subject', icon: 'book', link: '/subject' },
    ];
}
</script>