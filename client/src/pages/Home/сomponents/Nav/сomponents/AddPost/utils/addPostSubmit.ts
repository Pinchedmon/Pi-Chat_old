import { FormEvent } from 'react'
import redaxios from 'redaxios'
interface IAddPostSubmit {
  name: string
  author: string
  text: string
  course: string
  path: string
  category: string
  handlePopup: () => void
  file: FileList
  refetch: () => void
}
export function addPostSubmit(event: FormEvent<HTMLFormElement>, props: IAddPostSubmit) {
  let data = new FormData()
  data.append('post', props.file[0])
  if (props.text !== '' && props.category !== '' && props.course !== '') {
    redaxios
      .post(
        `http://localhost:6060/posts/feed?author=${props.author}&name=${props.name}&text=${props.text}&course=${props.course}&category=${props.category}&userImg=${props.path}`,
        data,
      )
      .then((response) => {
        if (response.status === 200) {
          props.refetch()
        }
      })
    props.handlePopup()
    event.preventDefault()
  } else {
    window.alert('Какое-то поле незаполнено!')
    event.preventDefault()
  }
}
