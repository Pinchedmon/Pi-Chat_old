import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
export interface ItextArea {
  handleChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
}
const TextArea = (props: ItextArea) => {
  const { handleChangeText, value } = props
  return (
    <>
      <div className='postPage-sendField-textArea '>
        <TextareaAutosize
          cacheMeasurements
          onChange={() => handleChangeText}
          value={value || ''}
          className='postPage-sendField__textArea'
          placeholder='Написать'
        />
      </div>
    </>
  )
}

export default TextArea
