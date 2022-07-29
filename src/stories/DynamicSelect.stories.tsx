import { ComponentMeta, ComponentStory } from '@storybook/react';
import 'antd/dist/antd.css';
import { EditableSelect } from '../components';

import { Header } from './Header';

export default {
  title: 'Example/DynamicSelect',
  component: EditableSelect,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof EditableSelect> = (args) => <EditableSelect {...args} />;

const defaultArgs = {
  style: { width: '200px' },
  options: [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ],
};

export const AllowMannualInput = Template.bind({});
AllowMannualInput.args = {
  mannualInput: true,
  ...defaultArgs,
};

export const DisableMannualInput = Template.bind({});
DisableMannualInput.args = {
  ...defaultArgs,
};
