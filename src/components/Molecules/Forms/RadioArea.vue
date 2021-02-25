<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Radio from "@/components/Atoms/Forms/Radio.vue";

export default defineComponent({
  components: {
    Radio,
  },
  props: {
    value: { type: String, required: true },
    options: { type: Array, required: true },
    name: { type: String, required: true },
    textLabel: { type: String, required: true },
    mandatory: { type: Boolean, required: true, defalut: false },
  },
  setup: (props, ctx) => {
    const mandatoryLabel = computed(() => {
      return props.mandatory ? true : false;
    });

    const input = (e: any) => {
      ctx.emit("input", e);
    };
    return {
      mandatoryLabel,
      input,
    };
  },
});
</script>

<template>
  <section>
    <label for="name" class="label">{{ textLabel }}</label
    ><label for="name" class="label-required" v-if="mandatoryLabel">必須</label>
    <Radio
      :value="value"
      :options="options"
      name="jobStatusId"
      @input="input"
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
