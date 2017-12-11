<template>
  <v-container fluid>
    <form>
    <v-text-field
      v-model="name"
      label="Name"
      :counter="10"
      :error-messages="errors.collect('name')"
      v-validate="'required|max:10'"
      data-vv-name="name"
      required
      @input="hoge"
    ></v-text-field>
    <app-text-input :input="input1" v-model="input1.value" v-validate="'required'" :error-messages="errors.collect('name')" @apptextinput-event="receiveAppTextInputEvent($event, input1)"></app-text-input>
    </form>
    <app-select-box :input="input3" v-model="input3.value" @appselectbox-event="receiveAppSelectBoxEvent($event, input3)"></app-select-box>
    <app-select-box :input="input2" v-model="input2.value" @appselectbox-event="receiveEventUpdateChapters($event, input2)"></app-select-box>
    <v-layout row wrap>
      <v-flex xs4 v-for="chapter in chapters" :key="chapter.name">
        <v-card>
          <v-card-title primary-title>
            <div class="headline" v-text="chapter.name"></div>
          </v-card-title>
          <v-card-text>
            <app-text-input :input="chapter" v-model="chapter.value" @apptextinput-event="receiveAppTextInputEvent($event, chapter)"></app-text-input>
            <v-text-field box multi-line label="Memo"></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-right">
      <v-btn dark @click="doSave" :class="{ green: valid, red: !valid }">保存する</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
// Framework 
import Vue from "vue";
import Component from "vue-class-component";
import HttpClient from "http/httpclient";
//
import {VForm} from "vuetify/src/components/index.js";

// parts
import AppTextInput from "@/components/parts/AppTextInput.vue";
import AppTextInputModel from "@/components/parts/AppTextInputModel";
import AppSelectBox from "@/components/parts/AppSelectBox.vue";
import AppSelectBoxModel from "@/components/parts/AppSelectBoxModel";
import { SubjectType, allSubjectType } from "@/enums/subjectType";
import { Chapters, allChapter } from "@/enums/chapters";

@Component({
  components: {
    AppTextInput,
    AppSelectBox,
  },
  inject: {
    $validator: '$validator'
  }
})
export default class SubjectPage extends Vue {
  private name = "";
  private input1 = new AppTextInputModel("教科名", "例) 宇宙編(2017年度夏期講習)", null, null);
  private input2 = new AppSelectBoxModel("章立て（授業回数）", "選択してください", allChapter, null, null);
  private input3 = new AppSelectBoxModel("教科カテゴリ", "選択してください", allSubjectType, null, null);
  private chapters: AppTextInputModel[] = null;
  public valid = false;


  private receiveAppTextInputEvent(val: string, input: AppTextInputModel) {
    this.$set(input, "value", val);
        this.$validator.validateAll().then((result) => {
        // eslint-disable-next-line
        this.valid = result
      });
  }

  private hoge() {
    console.log("aaaaaaaaaa");
    this.$validator.validateAll().then((result) => {
        // eslint-disable-next-line
        this.valid = result
      });
  }
  private receiveAppSelectBoxEvent(val: string, input: AppSelectBoxModel) {
    this.$set(input, "value", val);
        this.$validator.validateAll().then((result) => {
        // eslint-disable-next-line
        this.valid = result
      });
  }

  private receiveEventUpdateChapters(val: string, input: AppSelectBoxModel) {
    this.receiveAppSelectBoxEvent(val, input);
    for (var i = 0; i < Chapters[val]; i++) {
      let title =  "第" + (i + 1) + "章";
      if (i == 0) {
        this.chapters = [new AppTextInputModel("章タイトル", "例) 銀河と太陽系", title, null)];
      } else {
        this.chapters.push(new AppTextInputModel("章タイトル", "例) 銀河と太陽系", title, null));
      }
    }
  }
  
  $refs: {
    form: VForm
  }
  private doSave() {
    if (this.$refs.form.validate()) {
      console.log(this.$refs.form.getInputs());
      // this.$refs.form.$el.submit();
    }
  }

}

</script>