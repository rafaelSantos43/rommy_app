import { useMutation } from "@apollo/client"
import { DELETE_POST } from "../../../Posts/graphql/deletePost.mutation"

const useDeleteComment = ({ commentId, postId }: any) => {
  const [deleteComment] = useMutation(DELETE_POST)

  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        variables: { commentId, postId },
        update(cache) {
          cache.modify({
            id: cache.identify({ __typename: "Post", id: postId }),
            fields: {
              commentCount(existingCommentCount = 0) {
                return Math.max(existingCommentCount - 1, 0)
              },
            },
          })

          cache.modify({
            fields: {
              GetComments(existingComments = []) {
                return existingComments.filter(
                  (commentRef: any) => commentRef.__ref !== `Comment:${commentId}`,
                )
              },
            },
          })
        },
      })
    } catch (error) {
      console.error("Error al eliminar el comentario", error)
    }
  }

  return {
    handleDeleteComment,
  }
}

export default useDeleteComment
