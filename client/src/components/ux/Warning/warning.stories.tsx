import React from 'react'

import Warning from '.'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Iwarning } from './components/warning.interface'

export default {
  title: 'Warning',
  component: Warning,
} as ComponentMeta<typeof Warning>
const Template: ComponentStory<typeof Warning> = (args: Iwarning) => <Warning {...args} />
export const Default = Template.bind({})
Default.args = { propsFunc: () => false, title: 'Вы действительно хотите сделать это?', setIsOpen: () => false }
