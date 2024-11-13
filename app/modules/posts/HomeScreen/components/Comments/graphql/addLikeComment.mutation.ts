import { gql, useMutation } from "@apollo/client"
import { GET_LIST_LIKE_COMMENT } from "app/modules/posts/LikeListScreen/graphql/GetListLikeComment.query"

export const ADD_LIKE_COMMENT = gql`
  mutation addLikeComment($commentId: ID!) {
    addLikeComment(commentId: $commentId) {
      content
      id
      likeCount
      author {
        name
        avatar
        id
      }
    }
  }
`

export const useAddLikeComment = ({ commentId, userSession }: any) => {
  const [addLikeComment] = useMutation(ADD_LIKE_COMMENT)

  const handleAddLikeComment = async () => {
    try {
      await addLikeComment({
        variables: { commentId },
        update(cache) {
          const { GetListLikeComment: likeListInCache } = cache.readQuery({
            query: GET_LIST_LIKE_COMMENT,
            variables: { commentId },
          }) || { GetListLikeComment: [] }

          const hasLiked = likeListInCache.some((like: any) => like.author.id === userSession._id)

          if (hasLiked) {
            const updatedLikes = likeListInCache.filter(
              (like: any) => like.author.id !== userSession._id,
            )
            cache.writeQuery({
              query: GET_LIST_LIKE_COMMENT,
              variables: { commentId },
              data: {
                GetListLikeComment: updatedLikes,
              },
            })
          } else {
            const newLike = {
              __typename: "LikeComment",
              id: `new-id-${userSession._id}`,
              author: {
                id: userSession._id,
                name: userSession.name,
                avatar: userSession.avatar,
              },
              createdAt: new Date().toString(),
              updatedAt: new Date().toString(),
            }

            const updatedLikes =  [...likeListInCache, newLike]
            cache.writeQuery({
              query: GET_LIST_LIKE_COMMENT,
              variables: { commentId },
              data: {
                GetListLikeComment: updatedLikes,
              },
            })
          }
        },
      })
    } catch (error) {
      console.error("Error al manejar el like", error)
    }
  }

  return {
    handleAddLikeComment,
  }
}
