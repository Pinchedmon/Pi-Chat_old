import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import SendField from '.'
import { Isendfield } from './types/sendfield.interface'

export default {
  title: 'SendField',
  component: SendField,
} as ComponentMeta<typeof SendField>
const Template: ComponentStory<typeof SendField> = (args: Isendfield) => <SendField {...args} />
export const Default = Template.bind({})
Default.args = {}
