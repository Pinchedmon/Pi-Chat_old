import React from 'react'
import { Icomment } from '../../types/comment.interface'
import Comment from '../Comment'
const Comments = (props: {
  name: string
  data: Array<Icomment>
  refetch: () => void
  likeComment: (id: number, likes: number) => void
  postId: number
}) => {
  const { data, refetch, likeComment, name, postId } = props
  return (
    <>
      {data.length === 0 ? (
        <div className='no-comments'>Нет комментариев</div>
      ) : (
        <>
          {data &&
            data.map((item: Icomment, index: number) => (
              <div key={index}>
                {(item.commentId === null || item.commentId === 'undefined') && (
                  <Comment
                    item={{
                      commentId: item.commentId,
                      ID: item.ID,
                      postId: item.postId,
                      name: item.name,
                      text: item.text,
                      commentImg: item.commentImg,
                      date: item.date,
                      username: item.username,
                      img: item.img,
                      likes: item.likes,
                      comments: item.comments,
                    }}
                    index={index}
                    likeComment={likeComment}
                    name={name}
                    refetch={refetch}
                    postId={postId}
                    isMain={true}
                  />
                )}
                {data
                  .filter((comment: Icomment) => {
                    return comment.commentId === item.ID
                  })
                  .map((comm: Icomment, ind: number) => (
                    <div key={ind}>
                      {comm.commentId !== null && (
                        <Comment
                          item={{
                            commentId: comm.commentId,
                            ID: comm.ID,
                            postId: comm.postId,
                            name: comm.name,
                            text: comm.text,
                            commentImg: comm.commentImg,
                            date: comm.date,
                            username: comm.username,
                            img: comm.img,
                            likes: comm.likes,
                            comments: comm.comments,
                          }}
                          index={ind}
                          likeComment={likeComment}
                          name={name}
                          refetch={refetch}
                          postId={postId}
                          isMain={false}
                        />
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </>
      )}
    </>
  )
}

export default Comments
