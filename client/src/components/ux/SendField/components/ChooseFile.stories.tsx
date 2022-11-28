import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import ChooseFileBtn from './ChooseFileBtn'
import { IchooseFileBtn } from './ChooseFIleBtn.interface'

export default {
  title: 'SendField/ChooseFile',
  component: ChooseFileBtn,
} as ComponentMeta<typeof ChooseFileBtn>
const Template: ComponentStory<typeof ChooseFileBtn> = (args: IchooseFileBtn) => <ChooseFileBtn {...args} />
export const Default = Template.bind({})
Default.args = {
  handleChangeFile: () => false,
  preview: '',
}
