import redaxios from 'redaxios'
interface apiPayload {
  text: string
  category: string
  course: string | number
}
export const addPost = (payload: apiPayload) => {
  const { text, category, course } = payload
  return redaxios.post('http://localhost:6060/posts/feed', {
    author: 'Noname',
    text: text,
    category: category,
    course: course,
  })
}
