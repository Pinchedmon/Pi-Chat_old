import React, { useState, useCallback } from 'react'
import axios from 'axios'

const FilesUploadComponent = (name: any) => {
  const [img, setImg] = useState(null)
  const sendFile = useCallback(async () => {
    const data = new FormData()
    data.append('avatar', img)
    await axios.put(`http://localhost:6060/profile?name="${name.name}"`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }, [img, name])

  return (
    <div>
      <input type='file' onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={sendFile}>Edit Avatar</button>
    </div>
  )
}

export default FilesUploadComponent
