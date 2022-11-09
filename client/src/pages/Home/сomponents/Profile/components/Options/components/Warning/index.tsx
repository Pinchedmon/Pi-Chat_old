import React from 'react'

const Warning = (props: { setIsOpen: () => void }) => {
  const { setIsOpen } = props
  return (
    <div className='text-xl rounded-xl bottom-2/3 p-10px font-bold bg-white border-3 border-green-600 '>
      <div className='mb-16px'>Вы действительно уверены, что хотите заблокировать этого человека?</div>
      <button className='pl-10px pr-10px pt-4px pb-4px bg-red-600 rounded-lg text-white' onClick={() => {}}>
        Да
      </button>
      <button
        className='pl-10px pr-10px pt-4px pb-4px ml-5px bg-gray-600 text-white rounded-lg float-right'
        onClick={() => setIsOpen()}
      >
        Нет
      </button>
    </div>
  )
}

export default Warning
