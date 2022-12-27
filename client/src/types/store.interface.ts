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
    isMenuShowed: boolean
  }
  message: { selected: Iselected; activeDialog: { avatar: string; name: string } }
  modal: { isOpen: boolean }
}
