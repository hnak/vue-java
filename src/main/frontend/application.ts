// Webpack CSS import
// import 'onsenui/css/onsenui.css';
// import 'onsenui/css/onsen-css-components.css';

// Framework
import VeeValidate from "vee-validate";
import Vue from "vue";
import Component from "vue-class-component";
import Vuetify from "vuetify";
import router from "./router/router";

// App Components
import AppMain from "components/AppMain.vue";

// CSS
// tslint:disable-next-line:no-import-side-effect
import "vuetify/dist/vuetify.css";

Vue.use(Vuetify);
Vue.use(VeeValidate);

@Component({
  components: {
    AppMain,
  },
  router,
  template: "<app-main/>",
})
export default class App extends Vue {
}

const app = new App({
  el: "#app",
});
