import axios from 'axios'

export const getPosts = async (payload: {
  sort: string | number
  category: string
  page: number
  count: number
  name: string
}) => {
  const { sort, category, page, count, name } = payload
  const response = await axios.get(
    `http://localhost:6060/posts/feed?sort=${sort}&category=${category}&page=${page}&count=${count}&name=${name}`,
  )
  return response.data
}

export const getPost = async (payload: { search: string; page: number; count: number; name: string }) => {
  const { search, page, count, name } = payload
  const response = await axios.get(`http://localhost:6060/posts/post${search}&page=${page}&count=${count}&name=${name}`)
  return response.data
}
export const getPostInfo = async (payload: { id: number; name: string }) => {
  const response = await axios.get(`http://localhost:6060/posts/postInfo?id=${payload.id}&name=${payload.name}`)
  return response.data
}
export const getPostComments = async (payload: { page: number; count: number; name: string; id: number }) => {
  const { name, page, count, id } = payload
  const response = await axios.get(
    `http://localhost:6060/posts/postComments?page=${page}&count=${count}&id=${id}&name=${name}`,
  )
  return response.data
}

export async function getPath(name: string | object | any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await axios.get(`http://localhost:6060/path?name="${name.name === undefined ? name : name.name}"`).then((res) => {
    if (res.status === 200) {
      return res.data
    }
  })
}

export async function getMyPosts(name: string, page: number, count: number) {
  const response = await axios.get(`http://localhost:6060/posts/getMyPosts?name=${name}&page=${page}&count=${count}`)
  return response.data
}

export async function getDialogs(name: string) {
  const response = await axios.get(`http://localhost:6060/message/links?name=${name}`)
  return response.data.data
}
export async function getMessages(names: string, name: string, page: number, count: number) {
  // const response = await axios.get(
  //   `http://localhost:6060/message/info?names=${names}&name=${name}&page=${page}&count=${count}`,
  // )
  // return response.data
  const response = await axios.get(
    `http://localhost:6060/message/info?names=${names}&name=${name}&page=${page}&count=${count}`,
  )
  return response.data
}

export async function getMyUsername(name: string) {
  const response = await axios.get(`http://localhost:6060/profile/getMyUsername?name=${name}`)
  if (response !== undefined) {
    return response
  }
}
export const getSubscribes = async (name: string) => {
  const response = await axios.get(`http://localhost:6060/follow/mySubs?name=${name}`)
  return response.data
}
export const getNotifications = async (name: string) => {
  const response = await axios.get(`http://localhost:6060/notifs/?name=${name}`)
  return response.data
}
