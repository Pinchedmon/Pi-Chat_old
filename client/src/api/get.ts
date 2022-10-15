import redaxios from 'redaxios'
// Getting all posts to feed
export const getPosts = async (payload: { sort: string | number; category: string; page: number }) => {
  const { sort, category, page } = payload
  const response = await redaxios.get(`http://localhost:6060/posts/feed?sort=${sort}&category=${category}&page=${page}`)
  return response.data
}
// Getting only one picked post with his comments
export const getPost = async (payload: { search: string }) => {
  const { search } = payload
  const response = await redaxios.get(`http://localhost:6060/posts/post${search}`)
  return response.data
}
// Getting path of image
export async function getPath(name: string | object | any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let response = await redaxios
    .get(`http://localhost:6060/path?name="${name.name === undefined ? name : name.name}"`)
    .then((res) => {
      if (res.status === 200) {
        return res.data
      }
    })
}
// Getting all user's posts
export async function getMyPosts(name: string) {
  const response = await redaxios.get(`http://localhost:6060/posts/getMyPosts?name=${name}`)
  return response.data.data
}
// Getting all user's dialogs
export async function getDialogs(name: string) {
  const response = await redaxios.get(`http://localhost:6060/message/links?name=${name}`)
  return response.data
}
// Getting all messages for dialog
export async function getMessages(names: string, name: string) {
  const response = await redaxios.get(`http://localhost:6060/message/info?names=${names}&name=${name}`)
  console.log(response)
  return response.data
}
// Getting user's username (Not name!)
export async function getMyUsername(name: string) {
  const response = await redaxios.get(`http://localhost:6060/profile/getMyUsername?name=${name}`)
  if (response !== undefined) {
    return response
  }
}
