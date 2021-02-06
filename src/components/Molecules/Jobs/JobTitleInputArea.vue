<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from "@vue/composition-api";
import JobTitleInput from "@/components/Atoms/Forms/JobTitleInput.vue";

type State = {
  titleLimit: number;
};

const initialState = (): State => ({
  titleLimit: 0,
});

export default defineComponent({
  components: {
    JobTitleInput,
  },
  props: {
    value: { type: String },
    name: { type: String, required: true },
    textLabel: { type: String, required: true },
    mandatory: { type: Boolean, required: true, defalut: false },
    mandatoryText: { type: String },
    placeholder: { type: String, required: true },
    maxlength: { type: String, required: true },
    remaining: { type: Boolean, required: true, defalut: false },
  },
  setup: (props, ctx) => {
    const state = reactive<State>(initialState());

    const mandatoryLabel = computed(() => {
      if (props.mandatory == true) {
        return true;
      }
      return false;
    });

    const remainingLabel = computed(() => {
      if (props.remaining == true) {
        return true;
      }
      return false;
    });

    const input = (e: any) => {
      state.titleLimit = e.length;
      ctx.emit("input", e);
    };
    return {
      ...toRefs(state),
      mandatoryLabel,
      remainingLabel,
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
    <JobTitleInput
      :value="value"
      type="text"
      :name="name"
      @input="input"
      :placeholder="placeholder"
      :maxlength="maxlength"
    />
    <small id="rem" v-if="remainingLabel">残り{{ 60 - titleLimit }}文字</small>
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

#rem {
  color: $text-sub-color;
  margin-top: 2px;
  font-size: 12px;
  font-weight: bold;
}
</style>
