<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import SkillSelect from "@/components/Atoms/Forms/SkillSelect.vue";

export default defineComponent({
  components: {
    SkillSelect,
  },
  props: {
    value: { type: Array, required: true },
    options: { type: Array, required: true },
    name: { type: String, required: true },
    textLabel: { type: String, required: true },
    mandatory: { type: Boolean, required: true, defalut: false },
    mandatoryText: { type: String },
    max: { type: Number, required: true },
  },
  setup: (props, ctx) => {
    const mandatoryLabel = computed(() => {
      if (props.mandatory == true) {
        return true;
      }
      return false;
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
    ><label for="name" class="label-required" v-if="mandatoryLabel"
      >必須 {{ mandatoryText }}</label
    >
    <SkillSelect
      :value="value"
      :options="options"
      :max="max"
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