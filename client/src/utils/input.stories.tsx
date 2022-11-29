import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input from './input'

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>
const Template: ComponentStory<typeof Input> = (args: any) => <Input {...args} />
export const Default = Template.bind({})
Default.args = {
  value: '',
  blurHandler: () => false,
  handleChange: (e) => false,
  name: 'password',
  placeholder: 'Example',
  type: 'password',
}
