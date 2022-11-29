import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PersonData from '.'

export default {
  title: 'personData',
  component: PersonData,
} as ComponentMeta<typeof PersonData>
const Template: ComponentStory<typeof PersonData> = (args: any) => <PersonData {...args} />
export const Default = Template.bind({})
Default.args = {
  pathImg:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fanime-characters-fight.fandom.com%2Fru%2Fwiki%2F%25D0%259F%25D0%25B8%25D0%25BA%25D0%25B0%25D1%2587%25D1%2583_%25D0%25AD%25D1%2588%25D0%25B0&psig=AOvVaw0pma-t3zxW5Q3Lg0cy22Ff&ust=1669812303755000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJDzg9y10_sCFQAAAAAdAAAAABAE',
  username: 'Pinchedmon',
  name: 'Pinchedmon',
}
