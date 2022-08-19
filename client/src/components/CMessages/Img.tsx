import React, { useEffect, useState } from 'react'
import { getPath } from '../../api/session'

function Img(props: { name: string; className: string; onClick: Function }) {
  const [img, setImg] = useState('')
  useEffect(() => {
    getPath(props.name).then((res: any) => {
      if (res.status === 200) {
        setImg(res.data.data)
      }
    })
  }, [])

  return (
    <>
      <img onClick={() => props.onClick()} src={img} alt='' className={props.className} />
    </>
  )
}

export default Img
