import axios from 'axios'

export const getPosts = async (payload: { sort: string | number; category: string; page: number }) => {
  const { sort, category, page } = payload
  const response = await axios.get(`http://localhost:6060/posts/feed?sort=${sort}&category=${category}&page=${page}`)
  return response.data
}

export const getPost = async (payload: { search: string; page: number }) => {
  const { search, page } = payload
  const response = await axios.get(`http://localhost:6060/posts/post${search}&page=${page}`)
  return response.data
}

export async function getPath(name: string | object | any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let response = await axios
    .get(`http://localhost:6060/path?name="${name.name === undefined ? name : name.name}"`)
    .then((res) => {
      if (res.status === 200) {
        return res.data
      }
    })
}

export async function getMyPosts(name: string) {
  const response = await axios.get(`http://localhost:6060/posts/getMyPosts?name=${name}`)
  return response.data.data
}

export async function getDialogs(name: string) {
  const response = await axios.get(`http://localhost:6060/message/links?name=${name}`)
  return response.data
}
export async function getMessages(names: string, name: string) {
  const response = await axios.get(`http://localhost:6060/message/info?names=${names}&name=${name}`)
  console.log(response)
  return response.data
}

export async function getMyUsername(name: string) {
  const response = await axios.get(`http://localhost:6060/profile/getMyUsername?name=${name}`)
  if (response !== undefined) {
    return response
  }
}
