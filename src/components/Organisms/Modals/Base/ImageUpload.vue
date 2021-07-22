<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";

const props = {
  imageDialog: { type: Boolean, default: false, required: true },
  close: { type: Function as PropType<() => void>, required: true },
  onFileChange: { type: Function as PropType<() => void> },
  fileName: { type: String, default: "" },
  uplpadImage: { type: Function as PropType<() => void> },
} as const;
type Props = typeof props;
export type ImageUpload = OutsidePropsType<Props>;

export default defineComponent<InsidePropsType<Props>>({
  props: props,
  setup: () => {},
});
</script>

<template>
  <v-row justify="center">
    <v-dialog
      v-show="imageDialog"
      :value="imageDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h6">
          アバター写真
        </v-card-title>
        <v-card-text>
          <div>
            <v-file-input
              @change="onFileChange"
              counter
              show-size
              prepend-icon="mdi-camera"
              outlined
              dense
              truncate-length="24"
            />
          </div>
          <div v-if="!fileName">
            画像が選択されていません
          </div>
          <div>
            <img
              v-show="fileName"
              class="preview-file"
              :src="fileName"
              alt=""
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="fileName"
            color="blue lighten-1"
            text
            @click="uplpadImage"
          >
            登録する
          </v-btn>
          <v-btn color="blue lighten-1" text @click="close">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.preview-file {
  max-width: 200px;
}
</style>
