import Session from "./Session";

export default {
  title: "Atoms/Session",
  component: Session,
  argTypes: {
    num: {
      control: {
        type: "inline-radio",
        options: [1, 2, 3],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  // props: Object.keys(argTypes),
  components: { Session },
  setup() {
    return { args };
  },
  template: `<Session v-bind="$props" /> `,
});

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
