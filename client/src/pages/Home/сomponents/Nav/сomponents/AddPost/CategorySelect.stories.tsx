import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import CategorySelect from './CategorySelect'

export default {
  title: 'UX/CategorySelect',
  component: CategorySelect,
} as ComponentMeta<typeof CategorySelect>
const Template: ComponentStory<typeof CategorySelect> = (args: any) => <CategorySelect {...args} />
export const Default = Template.bind({})
Default.args = {}
