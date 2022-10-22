import { FormEvent } from 'react'
import { NavigateFunction } from 'react-router-dom'

import axios from 'axios'
interface IAddPostSubmit {
  name: string
  text: string
  course: string
  category: string
  file: FileList | null
  refetch: () => void
  navigate: NavigateFunction
}
export function addPostSubmit(event: FormEvent<HTMLFormElement>, props: IAddPostSubmit) {
  let data = new FormData()
  data.append('post', props.file !== null ? props.file[0] : undefined)
  if (props.text !== '' && props.category !== '' && props.course !== '') {
    axios
      .post(
        `http://localhost:6060/posts/feed?name=${props.name}&text=${props.text}&course=${props.course}&category=${props.category}`,
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
