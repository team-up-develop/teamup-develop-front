import Logout from "./Logout";

export default {
  title: "Logout",
  component: Logout,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Logout },
  template: `<Logout v-bind="$props" /> `,
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  secondary: false,
  label: "プライマリーボタン",
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  scondary: true,
  label: "セカンダリーボタン",
};
