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
    <>
      <form
        className='w-full mb-6px'
        onSubmit={(event) => {
          handleSubmit(event, setAreaData, areaData, postFuncProps, postFunc, object)
        }}
      >
        <div className='flex justify-center mb-10px'>
          <TextareaAutosize
            cacheMeasurements
            onChange={(e) => handleChangeText(e, setAreaData, areaData)}
            value={areaData.textArea || ''}
            className='rounded-2xl resize-none outline-none pt-16px pb-16px pl-16px pr-16px border-2 w-90%'
            placeholder='Написать'
          />
        </div>
        <div className='flex ml-16px'>
          <label className='flex'>
            <input
              type='file'
              className='hidden'
              accept='.png,.gif,.jpg,.jpeg'
              onChange={(e) => handleChangeFile(e, setAreaData, areaData)}
            />
            <i className=''>
              <PaperClipIcon className='w-40px text-white bg-green-600 p-6px rounded-xl' />
            </i>
            {areaData.preview !== null && (
              <img className='h-40px object-cover ml-40px rounded-md' alt='' src={areaData.preview} />
            )}
          </label>
          <button
            disabled={!areaData.validForm}
            className='ml-auto mr-16px bg-green-600 text-white pt-6px pb-6px pl-16px pr-16px rounded-xl'
          >
            Отправить
          </button>
        </div>
      </form>
    </>
  )
}

export default SendField
