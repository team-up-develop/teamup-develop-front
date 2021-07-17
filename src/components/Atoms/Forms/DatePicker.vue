<script lang="ts">
// FIXME: Composition にすると $refs.dialogが取得できない？
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    type: { type: String as PropType<string>, required: true, default: "" },
    value: { type: String as PropType<string>, required: false, default: "" },
    placeholder: {
      type: String as PropType<string>,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      date: "",
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  methods: {
    onInputDialog() {
      this.modal = false;
      // @ts-ignore
      this.$refs.dialog.save(this.date);
      this.$emit("input", this.date);
    },
  },
});
</script>

<template>
  <section>
    <v-col>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="value"
            :label="placeholder"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
            outlined
            dense
            filled
            height="42px"
          />
        </template>
        <v-date-picker
          color="#2196F3"
          v-model="date"
          scrollable
          locale="jp-ja"
          :day-format="(date) => new Date(date).getDate()"
        >
          <v-spacer/>
          <v-btn text color="$primary-color" @click="modal = false">
            閉じる
          </v-btn>
          <v-btn text color="primary" @click="onInputDialog">
            決定
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
