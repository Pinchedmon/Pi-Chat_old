// export const checkSelect = (x: string, y: string, setSelected: () => void) => {
//   if (x === 'x') {
//     setSelected((selected: iSelected) => ({ ...selected, amount: 0 }))
//     setSelected((selected: iSelected) => ({ ...selected, statements: [] }))
//     setSelected((selected: iSelected) => ({ ...selected, resetStatus: false }))
//   }
//   if (x === '+') {
//     setSelected((selected: iSelected) => ({ ...selected, amount: selected.amount + 1 }))
//     setSelected((selected: iSelected) => ({ ...selected, statements: [...selected.statements, y] }))
//   }
//   if (x === '-') {
//     setSelected((selected: iSelected) => ({ ...selected, amount: selected.amount - 1 }))
//     setSelected((selected: iSelected) => ({
//       ...selected,
//       statements: selected.statements.filter((item) => item !== y),
//     }))
//   }
// }
