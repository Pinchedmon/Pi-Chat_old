import axios from 'axios'
export const likeHandler = (userId: string, id: number, likes: any) => {
  if (likes !== '0') {
    if (/\s/.test(likes)) {
      if (likes.split(' ').indexOf(userId) !== -1) {
        axios.put(
          `http://localhost:6060/feed?id=${id}&likes='${likes
            .split(' ')
            .splice(likes.split(' ').indexOf(userId) + 1, 1)
            .join(' ')}' `,
        )
      } else {
        axios.put(`http://localhost:6060/feed?id=${id}&likes='${likes.split(' ').push(`${userId}`).join(' ')}' `)
      }
    } else {
      if (likes === userId) {
        axios.put(`http://localhost:6060/feed?id=${id}&likes="0"`)
      } else {
        axios.put(`http://localhost:6060/feed?id=${id}&likes='${likes + ` ${userId}`}' `)
      }
    }
  } else {
    axios.put(`http://localhost:6060/feed?id=${id}&likes='${userId}'`)
  }
}
