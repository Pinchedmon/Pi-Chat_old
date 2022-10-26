import React from 'react'
import { Iinfo } from '../../../types/post.interface'

const Info = (props: Iinfo) => {
  const { img, text } = props
  return (
    <div className='post__info'>
      <div className='post__info-text'>{text}</div>
      {img !== '' && <img className='post__info-img' src={img} alt=' ' />}
    </div>
  )
}

export default Info
