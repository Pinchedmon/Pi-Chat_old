import redaxios from 'redaxios'

export const getPosts = async (payload: { sort: string | number; category: string }) => {
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

export async function getPath(name: string | object | any) {
  let response
  if (name.name === undefined) {
    await redaxios.get(`http://localhost:6060/path?name="${name}"`).then((res) => {
      if (res.status === 200) {
        response = res
      }
    })
  } else {
    await redaxios.get(`http://localhost:6060/path?name="${name.name}";`).then((res) => {
      if (res.status === 200) {
        response = res
      }
    })
  }
  return response
}
export async function getMyPosts(name: string) {
  const response = await redaxios.get(`http://localhost:6060/posts/getMyPosts?name=${name}`)
  return response.data.data
}
export async function getMessages(name: string) {
  const response = await redaxios.get(`http://localhost:6060/message/links?name=${name}`)
  return response.data
}
export async function getMessagesInfo(names: string) {
  const response = await redaxios.get(`http://localhost:6060/message/info?names=${names}`)
  if (response !== undefined) {
    return response.data.data
  }
}
