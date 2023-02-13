import React from 'react'
import { Icomment } from '../../types/comment.interface'
import Comment from '../Comment'
interface Icomments {
  name: string
  data: Array<Icomment>
  deleteComment: (id: number) => void
  addComment: (comment: Icomment) => void
  likeComment: (id: number, likes: number) => void
  postId: number
}
const Comments = (props: Icomments) => {
  const { data, name, postId, deleteComment, addComment, likeComment } = props
  return (
    <>
      {data && (
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
                          liked: item.liked,
                        }}
                        index={index}
                        name={name}
                        postId={postId}
                        deleteComment={deleteComment}
                        addComment={addComment}
                        likeComment={likeComment}
                        isMain={true}
                      />
                    )}
                    {data
                      .filter((comment: Icomment) => {
                        return comment.commentId === item.ID
                      })
                      .map((comm: Icomment, ind: number) => (
                        <div className='ml-16px' key={ind}>
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
                                liked: comm.liked,
                              }}
                              index={ind}
                              name={name}
                              deleteComment={deleteComment}
                              addComment={addComment}
                              likeComment={likeComment}
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
      )}
    </>
  )
}

export default Comments
