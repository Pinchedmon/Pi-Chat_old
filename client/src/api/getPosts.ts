import redaxios from 'redaxios'

interface apiPayload {
  sort: string | number
  category: string
}
export const getPosts = async (payload: apiPayload) => {
  const { sort, category } = payload
  const response = await redaxios.get(`http://localhost:6060/posts/feed?sort=${sort}&category=${category}`)
  return response.data.data
}
export const getPost = async (payload: { search: string }) => {
  const { search } = payload
  const response = await redaxios.get(`http://localhost:6060/posts/post${search}`)
  console.log(response)
  return response.data.post
}
export const getComments = async (payload: { search: string }) => {
  const { search } = payload
  const response = await redaxios.get(`http://localhost:6060/posts/post${search}`)
  return response.data.comments
}
