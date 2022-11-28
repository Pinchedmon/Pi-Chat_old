import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import CancelBtn from './CancelBtn'

export default {
  title: 'Warning/cancel',
  component: CancelBtn,
} as ComponentMeta<typeof CancelBtn>
const Template: ComponentStory<typeof CancelBtn> = (args: any) => <CancelBtn {...args} />
export const Default = Template.bind({})
Default.args = {
  setIsOpen: () => false,
}
