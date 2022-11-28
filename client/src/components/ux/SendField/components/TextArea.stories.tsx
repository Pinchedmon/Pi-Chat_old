import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextArea from './TextArea'
import { ItextArea } from './TextArea.interface'

export default {
  title: 'SendField/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>
const Template: ComponentStory<typeof TextArea> = (args: ItextArea) => {
  const [localValue, setValue] = useState('')
  return <TextArea value={localValue} handleChangeText={(e) => setValue('3123213')} />
}

export const Default = Template.bind({})
Default.args = {}
