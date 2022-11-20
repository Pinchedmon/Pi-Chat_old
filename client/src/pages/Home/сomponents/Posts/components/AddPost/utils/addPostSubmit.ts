import { FormEvent } from 'react'
import axios from 'axios'
import { IaddPostSubmit } from '../../../types/addPostSubmit.interface'

export const addPostSubmit = (event: FormEvent<HTMLFormElement>, props: IaddPostSubmit) => {
  console.log('132131')
  let data = new FormData()
  data.append('post', props.file !== null ? props.file[0] : undefined)
  if (props.text !== '' && props.category !== '' && props.course !== '') {
    axios
      .post(
        `http://localhost:6060/posts/feed?name=${props.name}&text=${props.text}&course=${props.course}&category=${
          props.category
        }&time=${new Date().toUTCString()}`,
        data,
      )
      .then((response) => {
        if (response.status === 200) {
          props.refetch()
          props.navigate('')
        }
      })
    event.preventDefault()
  } else {
    window.alert('Какое-то поле незаполнено!')
    event.preventDefault()
  }
}
