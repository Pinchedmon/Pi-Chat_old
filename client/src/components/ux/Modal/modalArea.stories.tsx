import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import ModalArea from './ModalArea'
import Warning from '../Warning'

export default {
  title: 'modal',
  component: ModalArea,
} as ComponentMeta<typeof ModalArea>
const Template: ComponentStory<typeof ModalArea> = (args: any) => <ModalArea {...args} />
export const Default = Template.bind({})
Default.args = {
  children: <Warning propsFunc={() => false} title={'Пример модального окна'} setIsOpen={() => false} />,
}
