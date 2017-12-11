<template>
  <v-app>
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <my-menu></my-menu>
    </v-navigation-drawer>
    <my-tool-bar></my-tool-bar>
    <v-content>
      <v-container fruid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer></v-footer>
  </v-app>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";

import MyMenu from "components/Menu.vue";
import MyToolBar from "components/ToolBar.vue";
import store from "store/store";

@Component({
  components: {
    MyMenu,
    MyToolBar,
  },
  store
})
export default class AppMain extends Vue {

  public get drawer() {
    return this.$store.getters.drawer;
  }

  public set drawer(val) {
    // suppress no setter warn[Vue.js]
  }
}
</script>
