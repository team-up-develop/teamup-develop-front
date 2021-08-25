import Chip from "./Chip";

export default {
  title: "Atoms/Chip",
  component: Chip,
  argTypes: {
    color: {
      control: "color",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Chip },
  setup() {
    return { args };
  },
  template: `<Chip v-bind="$props" />`,
});

export const Primary = Template.bind({});
Primary.args = {
  icon: "mdi-label",
  title: "新規募集",
};
