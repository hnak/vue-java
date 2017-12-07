<template>
  <div>
    <div>
      <p>{{ myCategoryName }}</p>
      <ul>
        <v-list v-for="(item, id) in myItems" :key="item.name">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }} {{ item.price }}円</v-list-tile-title>
          </v-list-tile-content>
        </v-list>
      </ul>
    </div>
    <div>
      <v-text-field v-model="myCategoryName" label="カテゴリ名"></v-text-field>
      <ul>
        <v-list v-for="(item, id) in myItems" :key="item.name">
          名前：{{ item.name }}
          <v-text-field @input="edit(item.price, id)" v-model="item.price" label="価格"></v-text-field>
        </v-list>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";
import HttpClient from "http/httpclient";

import store from "store/store";

@Component({
  store
})
export default class HomePage extends Vue {

  public get myCategoryName()  {
    return this.$store.getters.categoryName;
  }

  public set myCategoryName(val)  {
    this.$store.commit("updateCategoryName", val);
  }

  public get myItems() {
    return this.$store.getters.items
  }

  public edit(price: number, id: number) {
    this.$store.commit("updatePriceById", { id: id, price: price })
  }
}
</script>