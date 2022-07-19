import axios from 'axios'

interface apiPayload {
  sort: string | number
  category: string
}
export const getPosts = async (payload: apiPayload) => {
  const { sort, category } = payload
  const response = await axios.get(`http://localhost:6060/feed?sort=${sort}&category=${category}`)
  return response.data.data
}
