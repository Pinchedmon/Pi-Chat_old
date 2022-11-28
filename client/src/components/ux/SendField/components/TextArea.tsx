import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { ItextArea } from './TextArea.interface'

const TextArea = (props: ItextArea) => {
  const { handleChangeText, value } = props
  return (
    <>
      <div className='postPage-sendField-textArea '>
        <TextareaAutosize
          cacheMeasurements
          onChange={handleChangeText}
          value={value}
          className='postPage-sendField__textArea'
          placeholder='Написать'
        />
      </div>
    </>
  )
}

export default TextArea
