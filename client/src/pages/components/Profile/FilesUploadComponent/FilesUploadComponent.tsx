import React, { useState, useCallback, useEffect } from 'react'
import redaxios from 'redaxios'
import { useQuery } from 'react-query'
import { getPath } from '../../../../api/session'
const FilesUploadComponent = (name: any) => {
  const [image, setImage] = useState(null)
  const [validForm, setValidForm] = useState(false)
  const { refetch } = useQuery('profile', () => getPath(name))
  const sendFile = useCallback(async () => {
    const data = new FormData()
    data.append('avatar', image)
    await redaxios.put(`http://localhost:6060/profile?name="${name.name}"`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    setTimeout(() => refetch(), 1000)
  }, [image, name.name, refetch])
  useEffect(() => {
    if (image !== null) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [setValidForm, image])
  return (
    <div>
      <input type='file' onChange={(e) => setImage(e.target.files[0])} />
      <button
        disabled={!validForm}
        className='text-green-600'
        onClick={() => {
          sendFile()
        }}
      >
        Изменить аватар
      </button>
    </div>
  )
}

export default FilesUploadComponent
