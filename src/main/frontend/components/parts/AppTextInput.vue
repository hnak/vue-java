<template>
<v-layout row>
  <v-flex xs4>
    <v-subheader>{{ input.subheader }}</v-subheader>
  </v-flex>
  <v-flex xs8>
    <v-text-field
      :name="input.name"
      :label="input.label"
      :id="input.id"
      @input="emit"
      v-model="value"
    ></v-text-field>
  </v-flex>
</v-layout>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";

// model
import input from "@/components/parts/AppTextInputModel"

@Component({
  props: {
    input
  }
})
export default class AppTextInput extends Vue {
  private value: string = "";
  private emit() {
     this.$emit('apptextinput-event', this.value)
  }
}

</script>