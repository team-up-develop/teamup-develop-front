<script>
import Vue from 'vue';

export default Vue.extend({ 
  props: {
    type: { type: String, required: true },
  },
  data() {
    return {
      date: "",
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  methods: {
    onInputTitle() {
      this.modal = false;
      this.$refs.dialog.save(this.date)
      this.$emit("input", this.date);
    }
  }
});
</script>

<template>
  <section>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="開発開始日"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            dense
            filled
            height="42px"
          ></v-text-field>
        </template>
        <v-date-picker
          color="#2196F3"
          v-model="date"
          scrollable
          locale="jp-ja"
          :day-format="date => new Date(date).getDate()"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color=$primary-color
            @click="modal = false"
          >
            閉じる
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="onInputTitle"
          >
            決定
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

</style>