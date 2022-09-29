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
  setAreaData({ textArea: '', file: null, preview: null, validForm: false })
}
export default handleSubmit
