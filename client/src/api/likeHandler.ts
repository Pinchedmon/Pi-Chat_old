import redaxios from 'redaxios'
export const likeHandler = (userId: string, id: number, likes: any) => {
  if (likes !== '0') {
    if (/\s/.test(likes)) {
      if (likes.split(' ').indexOf(userId) !== -1) {
        redaxios.put(
          `http://localhost:6060/feed?id=${id}&likes='${likes
            .split(' ')
            .splice(likes.split(' ').indexOf(userId) + 1, 1)
            .join(' ')}' `,
        )
      } else {
        redaxios.put(`http://localhost:6060/feed?id=${id}&likes='${likes.split(' ').push(`${userId}`).join(' ')}' `)
      }
    } else {
      if (likes === userId) {
        redaxios.put(`http://localhost:6060/feed?id=${id}&likes="0"`)
      } else {
        redaxios.put(`http://localhost:6060/feed?id=${id}&likes='${likes + ` ${userId}`}' `)
      }
    }
  } else {
    redaxios.put(`http://localhost:6060/feed?id=${id}&likes='${userId}'`)
  }
}
export const likeHandlerCom = (userId: string, id: number, likes: any) => {
  if (likes !== '0') {
    if (/\s/.test(likes)) {
      if (likes.split(' ').indexOf(userId) !== -1) {
        redaxios.put(
          `http://localhost:6060/feed/comments?id=${id}&likes='${likes
            .split(' ')
            .splice(likes.split(' ').indexOf(userId) + 1, 1)
            .join(' ')}' `,
        )
      } else {
        redaxios.put(
          `http://localhost:6060/feed/comments?id=${id}&likes='${likes.split(' ').push(`${userId}`).join(' ')}' `,
        )
      }
    } else {
      if (likes === userId) {
        redaxios.put(`http://localhost:6060/feed/comments?id=${id}&likes="0"`)
      } else {
        redaxios.put(`http://localhost:6060/feed/comments?id=${id}&likes='${likes + ` ${userId}`}' `)
      }
    }
  } else {
    redaxios.put(`http://localhost:6060/feed/comments?id=${id}&likes='${userId}'`)
  }
}
