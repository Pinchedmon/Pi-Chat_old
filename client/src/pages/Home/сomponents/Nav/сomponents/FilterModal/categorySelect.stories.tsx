import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CategorySelect from './CategorySelect'
import { IcategorySelect } from './CategorySelect.interface'
export default {
  title: 'FilterModal/CategorySelect',
  component: CategorySelect,
} as ComponentMeta<typeof CategorySelect>
const Template: ComponentStory<typeof CategorySelect> = (args: IcategorySelect) => <CategorySelect {...args} />
export const Default = Template.bind({})
Default.args = {}
