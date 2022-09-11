interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}

export const checkSelect = (x: string, y: string, selected: iSelected, setSelected: (selected: iSelected) => void) => {
  if (x === 'x') {
    setSelected({ ...selected, amount: 0, statements: null, resetStatus: false })
  }
  if (x === '+') {
    setSelected({
      ...selected,
      amount: selected.amount + 1,
      statements: [...selected.statements, y],
    })
  }
  if (x === '-') {
    setSelected({
      ...selected,
      amount: selected.amount - 1,
      statements: selected.statements.filter((item: string) => item !== y),
    })
  }
}
