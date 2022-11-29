import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SortSelect from './SortSelect'
import { IsortSelect } from './SortSelect.interface'

export default {
  title: 'FilterModal/SortSelect',
  component: SortSelect,
} as ComponentMeta<typeof SortSelect>
const Template: ComponentStory<typeof SortSelect> = (args: IsortSelect) => <SortSelect {...args} />
export const Default = Template.bind({})
Default.args = {}
