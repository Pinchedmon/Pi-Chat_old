interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}
export const checkSelect = (x: string, y: string, selected: iSelected, setSelected: (selected: any) => void) => {
  if (x === 'x') {
    setSelected((selected: iSelected) => ({ ...selected, amount: 0, statements: '', resetStatus: false }))
  }
  if (x === '+') {
    setSelected((selected: iSelected) => ({
      ...selected,
      amount: selected.amount + 1,
      statements: [...selected.statements, y],
    }))
  }
  if (x === '-') {
    setSelected((selected: iSelected) => ({
      ...selected,
      amount: selected.amount - 1,
      statements: selected.statements.filter((item) => item !== y),
    }))
  }
}
