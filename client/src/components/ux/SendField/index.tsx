import React, { useContext, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { PaperClipIcon } from '@heroicons/react/solid'
import { UserContext } from '../../../App'
import handleChangeText from './utils/handleChangeText'
import handleChangeFile from './utils/handleChangeFile'
import handleSubmit from './utils/handleSubmit'
import { Isendfield } from '../../../api/types/sendfield.interface'
import { Itextarea } from '../../../api/types/textarea.interface'

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
    <div className='absolute bottom-0px w-full'>
      <form
        className='postPage-sendField'
        onSubmit={(event) => {
          handleSubmit(event, setAreaData, areaData, postFuncProps, postFunc, object)
        }}
      >
        <div className='postPage-sendField-textArea '>
          <TextareaAutosize
            cacheMeasurements
            onChange={(e) => handleChangeText(e, setAreaData, areaData)}
            value={areaData.textArea || ''}
            className='postPage-sendField__textArea'
            placeholder='Написать'
          />
        </div>
        <div className='postPage-sendField-buttons'>
          <label className='postPage-sendField-buttons__label'>
            <input
              type='file'
              className='hidden'
              accept='.png,.gif,.jpg,.jpeg'
              onChange={(e) => handleChangeFile(e, setAreaData, areaData)}
            />
            <i>
              <PaperClipIcon className='postPage-sendField-buttons-icon' />
            </i>
            {areaData.preview !== null && (
              <img className='postPage-sendField-buttons-previewImg ' alt='' src={areaData.preview} />
            )}
          </label>
          <button disabled={!areaData.validForm} className='postPage-sendField-buttons__button'>
            Отправить
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendField
