interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}

export const resetSelected = (y: string, selected: iSelected, setSelected: (selected: iSelected) => void) => {
  setSelected({ ...selected, amount: 0, statements: null, resetStatus: false })
}
