<script lang="ts">
import { defineComponent, computed, PropType } from "@vue/composition-api";
import Email from "@/components/Atoms/Forms/Email.vue";

type Props = {
  type: string;
  value: string;
  textLabel: string;
  mandatory: boolean;
  placeholder: string;
};
export default defineComponent({
  components: {
    Email,
  },
  props: {
    type: { type: String as PropType<string>, required: true },
    value: { type: String as PropType<string>, required: false, default: null },
    textLabel: { type: String as PropType<string>, required: true },
    mandatory: {
      type: Boolean as PropType<boolean>,
      required: true,
      defalut: false,
    },
    placeholder: { type: String as PropType<string>, required: false },
  },
  setup: (props: Props, ctx) => {
    const mandatoryLabel = computed(() => {
      return props.mandatory ? true : false;
    });

    const input = (e: any) => {
      ctx.emit("input", e);
    };

    return {
      input,
      mandatoryLabel,
    };
  },
});
</script>

<template>
  <section>
    <label for="name" class="label">{{ textLabel }}</label
    ><label for="name" class="label-required" v-if="mandatoryLabel">必須</label>
    <Email
      type="text"
      :value="value"
      @input="input"
      :placeholder="placeholder"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
}

.label-required {
  color: $white;
  background-color: $error-message-color;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0.25rem 0.9rem;
  text-align: center;
  margin-left: 10px;
}
</style>
