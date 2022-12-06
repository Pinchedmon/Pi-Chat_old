interface iTextAreaPage {
  file: File
  preview: string
  textArea: string
  validForm: boolean
}
const handleChangeFile = (
  e: React.SyntheticEvent<HTMLInputElement, Event>,
  setAreaData: (text: iTextAreaPage) => void,
  areaData: iTextAreaPage,
) => {
  const target = e.target as unknown as HTMLInputElement
  setAreaData({ ...areaData, file: target.files[0] })
  e.preventDefault()
}
export default handleChangeFile
