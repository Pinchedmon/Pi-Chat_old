interface iTextAreaPage {
  file: File
  preview: string
  textArea: string
  validForm: boolean
}
function handleChangeText(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setAreaData: (text: iTextAreaPage) => void,
  areaData: iTextAreaPage,
) {
  setAreaData({ ...areaData, textArea: e.target.value })
}

export default handleChangeText
