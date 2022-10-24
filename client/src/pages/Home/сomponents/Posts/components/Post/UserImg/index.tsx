import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IuserImg } from '../../../types/post.interface'

const UserImg = (props: IuserImg) => {
  const { name, userImg } = props
  const navigate = useNavigate()
  return (
    <>
      <img
        onClick={() => navigate(`/${name}`)}
        className='ml-24px mr-16px h-54px rounded-xl w-54px cursor-pointer'
        src={userImg}
        alt=''
      />
    </>
  )
}

export default UserImg
