import React from 'react'
import { Iinfo } from '../../../types/post.interface'

const Info = (props: Iinfo) => {
  const { img, text } = props
  return (
    <div className='flex flex-col'>
      <div
        className='break-all text-md
            pt-4px
            pb-6px'
      >
        {text}
      </div>
      {img !== '' && <img className='w-1/2 rounded-xl mb-16px' src={img} alt=' ' />}
    </div>
  )
}

export default Info
