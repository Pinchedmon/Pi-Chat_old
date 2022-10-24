import { Iselected } from '../../../../../types/handleSelected.interface'

export const resetSelected = (y: string, selected: Iselected, setSelected: (selected: Iselected) => void) => {
  setSelected({ ...selected, amount: 0, statements: null, resetStatus: false })
}
