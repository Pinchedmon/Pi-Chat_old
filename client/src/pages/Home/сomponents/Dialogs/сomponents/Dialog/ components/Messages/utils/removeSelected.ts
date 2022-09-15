interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}

export const removeSelected = (y: string, selected: iSelected, setSelected: (selected: iSelected) => void) => {
  setSelected({
    ...selected,
    amount: selected.amount - 1,
    statements: selected.statements.filter((item: string) => item !== y),
  })
}
