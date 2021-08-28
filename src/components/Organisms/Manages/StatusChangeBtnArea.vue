<script lang="ts">
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { defineComponent, computed } from "@vue/composition-api";
import { doneParticipate, doneReject } from "@/modules/manages";

const propsOption = {
  statusId: { type: Number as PropType<number>, default: 0, required: true },
  openModal: { type: Function as PropType<() => void>, required: true },
  openCancelModal: { type: Function as PropType<() => void>, required: true },
} as const;

type PropsOption = typeof propsOption;
export type StatusChangeProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup: (props) => {
    const onModal = () => {
      props.openModal?.();
    };
    const onCancelModal = () => {
      props.openCancelModal?.();
    };

    return {
      onCancelModal,
      onModal,
      doneParticipate: computed(() => doneParticipate(props.statusId)),
      doneReject: computed(() => doneReject(props.statusId)),
    };
  },
});
</script>

<template>
  <v-container>
    <div v-if="doneParticipate || doneReject" />
    <v-row v-else class="mb-1">
      <v-btn class="btn-applicant" @click="onModal">一緒に開発する</v-btn>
      <v-btn class="btn-reject" @click="onCancelModal">お断りする</v-btn>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-applicant {
  @include red-btn;
  @include neumorphism;
  color: $white;
  padding: 0rem 2.5rem !important;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 0.8rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  @media screen and (max-width: $ti) {
    padding: 0rem 1.7rem !important;
  }
}
.btn-reject {
  @include neumorphismGrey;
  color: $red;
  padding: 0rem 2.8rem !important;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin-left: 1rem;
  font-size: 0.9rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  @media screen and (max-width: $ti) {
    padding: 0rem 1.9rem !important;
  }
}
</style>
