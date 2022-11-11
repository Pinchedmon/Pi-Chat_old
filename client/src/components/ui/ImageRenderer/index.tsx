import React, { useState, useRef } from 'react'
import { useIntersection } from '../../../hooks/useIntersectionObserver'

const ImageRenderer = ({ url, classname }: any) => {
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()
  useIntersection(imgRef, () => {
    setIsInView(true)
  })

  return (
    <div className='classname' ref={imgRef}>
      {isInView && <img className={classname} src={url} alt='' />}
    </div>
  )
}

export default ImageRenderer
