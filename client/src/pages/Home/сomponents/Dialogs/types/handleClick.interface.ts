export interface IhandleClick {
  selectedMsg: string
  addSelected: (text: number) => void
  removeSelected: (text: number) => void
  dispatch: (arg0: any) => void
  setSelectedMsg: (x: any) => void
  ID: number
}
