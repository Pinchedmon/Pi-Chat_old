import React from 'react'

function Info(props: { img: string; text: string }) {
  const { img, text } = props
  return (
    <>
      <div
        className='break-all text-md
            pt-4px
            pb-12px'
      >
        {text}
      </div>
      {img !== '' && <img className='w-1/2 rounded-xl' src={img} alt=' ' />}
    </>
  )
}

export default Info
