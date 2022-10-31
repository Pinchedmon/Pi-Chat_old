import { Iselected } from '../../../../../types/handleSelected.interface'

export const addSelected = (y: string, selected: Iselected, setSelected: (selected: Iselected) => void) => {
  setSelected({
    ...selected,
    amount: selected.amount + 1,
    statements: [...selected.statements, y],
  })
}
