interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}

export const addSelected = (y: string, selected: iSelected, setSelected: (selected: iSelected) => void) => {
  setSelected({
    ...selected,
    amount: selected.amount + 1,
    statements: [...selected.statements, y],
  })
}
