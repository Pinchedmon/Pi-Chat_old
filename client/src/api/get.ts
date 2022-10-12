import redaxios from 'redaxios'

export const getPosts = async (payload: { sort: string | number; category: string }) => {
  const { sort, category } = payload
  const response = await redaxios.get(`http://localhost:6060/posts/feed?sort=${sort}&category=${category}`)
  return response.data
}
export const getPost = async (payload: { search: string }) => {
  const { search } = payload
  const response = await redaxios.get(`http://localhost:6060/posts/post${search}`)
  return response.data
}
// export const getComments = async (payload: { search: string }) => {
//   const { search } = payload
//   const response = await redaxios.get(`http://localhost:6060/posts/post${search}`)
//   return response.data.comments
// }
export async function getPath(name: string | object | any) {
  let response = await redaxios
    .get(`http://localhost:6060/path?name="${name.name === undefined ? name : name.name}"`)
    .then((res) => {
      if (res.status === 200) {
        return res.data
      }
    })
}
export async function getMyPosts(name: string) {
  const response = await redaxios.get(`http://localhost:6060/posts/getMyPosts?name=${name}`)
  return response.data.data
}
export async function getMessages(name: string) {
  const response = await redaxios.get(`http://localhost:6060/message/links?name=${name}`)
  return response.data
}
export async function getMessagesInfo(names: string, name: string) {
  const response = await redaxios.get(`http://localhost:6060/message/info?names=${names}&name=${name}`)
  if (response !== undefined) {
    return response.data
  }
}
export async function getMyUsername(name: string) {
  const response = await redaxios.get(`http://localhost:6060/profile/getMyUsername?name=${name}`)
  if (response !== undefined) {
    return response
  }
}
