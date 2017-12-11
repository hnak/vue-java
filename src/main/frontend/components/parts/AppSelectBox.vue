<template>
<v-layout row>
  <v-flex xs4>
    <v-subheader>{{ input.subheader }}</v-subheader>
  </v-flex>
  <v-flex xs8>
    <v-select
      :items="input.items"
      @input="emit"
      v-model=value
      :label="input.label"
      single-line
      bottom
      required
    ></v-select>
  </v-flex>
</v-layout>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";

// model
import input from "@/components/parts/AppSelectBoxModel"

@Component({
  props: {
    input
  }
})
export default class AppSelectBox extends Vue {
  private value: string = null;
  private emit() {
    this.$emit('appselectbox-event', this.value)
  }
}

</script>