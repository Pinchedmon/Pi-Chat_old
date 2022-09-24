interface iTextAreaPage {
  file: File
  preview: string
  textArea: string
  validForm: boolean
}
const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  setAreaData: (text: iTextAreaPage) => void,
  areaData: iTextAreaPage,
  postFuncProps: any,
  postFunc: (postFuncProps: any, areaImg: any) => void,
  object: string,
) => {
  const areaImg = new FormData()
  if (areaData.file !== null) {
    areaImg.append(object, areaData.file)
  }
  event.preventDefault()
  postFunc({ ...postFuncProps, text: areaData.textArea }, areaImg)
  setAreaData({ ...areaData, textArea: '' })
  setAreaData({ ...areaData, file: null })
  setAreaData({ ...areaData, preview: '' })
  setAreaData({ ...areaData, validForm: true })
}
export default handleSubmit
