import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import AcceptBtn from './AcceptBtn'
import { IacceptBtn } from './AcceptBtn.interface'

export default {
  title: 'Warning/accept',
  component: AcceptBtn,
} as ComponentMeta<typeof AcceptBtn>
const Template: ComponentStory<typeof AcceptBtn> = (args: IacceptBtn) => <AcceptBtn {...args} />
export const Default = Template.bind({})
Default.args = {
  propsFunc: () => false,
  setIsOpen: () => false,
}
