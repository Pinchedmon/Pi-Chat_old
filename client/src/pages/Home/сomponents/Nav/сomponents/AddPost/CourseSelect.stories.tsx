import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CourseSelect from './CourseSelect'

export default {
  title: 'UX/CourseSelect',
  component: CourseSelect,
} as ComponentMeta<typeof CourseSelect>
const Template: ComponentStory<typeof CourseSelect> = (args: any) => <CourseSelect {...args} />
export const Default = Template.bind({})
Default.args = {}
