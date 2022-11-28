import { PaperClipIcon } from '@heroicons/react/solid'
import React from 'react'
import { IchooseFileBtn } from './ChooseFIleBtn.interface'

const ChooseFileBtn = (props: IchooseFileBtn) => {
  const { handleChangeFile, preview } = props
  return (
    <>
      <label className='postPage-sendField-buttons__label'>
        <input type='file' className='hidden' accept='.png,.gif,.jpg,.jpeg' onChange={() => handleChangeFile} />
        <i>
          <PaperClipIcon className='postPage-sendField-buttons-icon' />
        </i>
        {preview !== null && <img className='postPage-sendField-buttons-previewImg ' alt='' src={preview} />}
      </label>
    </>
  )
}

export default ChooseFileBtn
