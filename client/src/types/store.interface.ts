import { Iselected } from '../pages/Home/сomponents/Dialogs/types/handleSelected.interface'

export interface Istore {
  nav: {
    sort: string | number
    category: string
    addPostStyle: boolean
    messageStyle: boolean
    addMessageStyle: boolean
    editProfileStyle: boolean
    isNavExpanded: boolean
  }
  message: { selected: Iselected }
  modal: { isOpen: boolean }
}
