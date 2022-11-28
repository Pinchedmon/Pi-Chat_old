import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../App'
import handleChangeFile from './utils/handleChangeFile'
import handleSubmit from './utils/handleSubmit'
import { Isendfield } from '../../../api/types/sendfield.interface'
import { Itextarea } from '../../../api/types/textarea.interface'
import TextArea from './components/TextArea'
import handleChangeText from './utils/handleChangeText'
import ChooseFileBtn from './ChooseFileBtn'
import SendBtn from './SendBtn'

const SendField = (props: Isendfield) => {
  const { postFuncProps, postFunc, object } = props
  const user = useContext(UserContext)
  const [areaData, setAreaData] = useState<Itextarea>({
    file: null,
    preview: '',
    textArea: '',
    validForm: false,
  })
  useEffect(() => {
    if (areaData.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAreaData((areaData: Itextarea) => ({ ...areaData, preview: reader.result as string }))
      }
      reader.readAsDataURL(areaData.file)
    } else {
      setAreaData((areaData: Itextarea) => ({ ...areaData, preview: null }))
    }
  }, [areaData.file, user.name])
  useEffect(() => {
    if (areaData.textArea === '' && areaData.preview === null) {
      setAreaData((areaData: Itextarea) => ({ ...areaData, validForm: false }))
    } else {
      setAreaData((areaData: Itextarea) => ({ ...areaData, validForm: true }))
    }
  }, [areaData.file, areaData.preview, areaData.textArea])
  return (
    <>
      <form
        className='postPage-sendField'
        onSubmit={(event) => {
          handleSubmit(event, setAreaData, areaData, postFuncProps, postFunc, object)
        }}
      >
        <TextArea handleChangeText={(e) => handleChangeText(e, setAreaData, areaData)} value={''} />
        <div className='postPage-sendField-buttons'>
          <ChooseFileBtn handleChangeFile={(e) => handleChangeFile(e, setAreaData, areaData)} preview={''} />
          <SendBtn validForm={areaData.validForm} />
        </div>
      </form>
    </>
  )
}

export default SendField
