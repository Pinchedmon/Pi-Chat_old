import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import SendBtn from './SendBtn'
import { IsendBtn } from './SendBtn.interface'

export default {
  title: 'SendField/SendBtn',
  component: SendBtn,
} as ComponentMeta<typeof SendBtn>
const Template: ComponentStory<typeof SendBtn> = (args: IsendBtn) => <SendBtn {...args} />
export const Default = Template.bind({})
Default.args = {
  validForm: false,
}
