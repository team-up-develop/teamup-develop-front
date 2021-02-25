<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Email from "@/components/Atoms/Forms/Email.vue";
export default defineComponent({
  components: {
    Email,
  },
  props: {
    type: { type: String, required: true },
    value: { type: String, required: false, default: null },
    textLabel: { type: String, required: true },
    mandatory: { type: Boolean, required: true, defalut: false },
    placeholder: { type: String, required: false },
  },
  setup: (props, ctx) => {
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
