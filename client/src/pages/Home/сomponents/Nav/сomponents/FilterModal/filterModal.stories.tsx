import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IfilterModal } from '../../types/filterModal.interface'
import FilterModal from '.'

export default {
  title: 'FilterModal',
  component: FilterModal,
} as ComponentMeta<typeof FilterModal>
const Template: ComponentStory<typeof FilterModal> = (args: IfilterModal) => <FilterModal {...args} />
export const Default = Template.bind({})
Default.args = {}
