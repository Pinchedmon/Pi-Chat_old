import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { PaperClipIcon } from '@heroicons/react/solid'
import useAuth from '../../../hooks/useAuth'
interface iTextAreaPage {
  file: File | null
  preview: string
  textArea: string
  textAreaError: string
  validForm: boolean
}
function SendField(props: { postFuncProps: any; postFunc: (postFuncProps: any, areaImg: any) => void }) {
  const { postFuncProps, postFunc } = props
  const { user } = useAuth()
  const [path, setPath] = useState(null)
  const [areaData, setAreaData] = useState<iTextAreaPage>({
    file: null,
    preview: '',
    textArea: '',
    textAreaError: 'Сообщение не может быть пустым',
    validForm: false,
  })
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAreaData((areaData: iTextAreaPage) => ({ ...areaData, textArea: e.target.value }))
    if (!e.target.value) {
      setAreaData((areaData: iTextAreaPage) => ({ ...areaData, textAreaError: 'Сообщение не может быть пустым' }))
    } else {
      setAreaData((areaData: iTextAreaPage) => ({ ...areaData, textAreaError: '' }))
    }
  }

  const handleChangeFile = (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement
    setAreaData((areaData: iTextAreaPage) => ({ ...areaData, file: target.files[0] }))
    e.preventDefault()
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const areaImg = new FormData()
    if (areaData.file !== null) {
      areaImg.append('comment', areaData.file)
    }
    event.preventDefault()
    postFunc({ ...postFuncProps, text: areaData.textArea }, areaImg)
    setAreaData((areaData: iTextAreaPage) => ({ ...areaData, textArea: '' }))
    setAreaData((areaData: iTextAreaPage) => ({ ...areaData, textAreaError: '' }))
    setAreaData((areaData: iTextAreaPage) => ({ ...areaData, file: null }))
    setAreaData((areaData: iTextAreaPage) => ({ ...areaData, validForm: true }))
  }
  useEffect(() => {
    setPath(user.pathImg)
    if (areaData.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAreaData((areaData: iTextAreaPage) => ({ ...areaData, preview: reader.result as string }))
      }
      reader.readAsDataURL(areaData.file)
    } else {
      setAreaData((areaData: iTextAreaPage) => ({ ...areaData, preview: null }))
    }
  }, [areaData.file, user.name, areaData.textAreaError, user.pathImg])
  useEffect(() => {
    if (areaData.textArea === '') {
      setAreaData((areaData: iTextAreaPage) => ({ ...areaData, textAreaError: 'Сообщение не может быть пустым' }))
    }
    if (areaData.textAreaError === '' && areaData.file === null) {
      setAreaData((areaData: iTextAreaPage) => ({ ...areaData, validForm: false }))
    } else {
      setAreaData((areaData: iTextAreaPage) => ({ ...areaData, validForm: true }))
    }
  }, [areaData.file, areaData.textArea, areaData.textAreaError])
  return (
    <>
      <form className='w-full mb-6px' onSubmit={handleSubmit}>
        <div className='flex justify-center mb-10px'>
          <TextareaAutosize
            cacheMeasurements
            onChange={(e) => handleChangeText(e)}
            value={areaData.textArea}
            className='rounded-2xl resize-none outline-none pt-16px pb-16px pl-16px pr-16px border-2 w-90%'
            placeholder='Написать комментарий'
          />
        </div>
        <div className='flex ml-16px'>
          <label className='flex  '>
            <input type='file' className='hidden' accept='.png,.gif,.jpg,.jpeg' onChange={(e) => handleChangeFile(e)} />
            <i className=''>
              <PaperClipIcon className='w-40px text-white bg-green-600 p-6px rounded-xl' />
            </i>
            {areaData.file !== null && (
              <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={areaData.preview} />
            )}
          </label>
          <button
            disabled={areaData.validForm}
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
