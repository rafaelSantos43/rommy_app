import { useMutation } from "@apollo/client"
import { DELETE_POST } from "../../graphql/deletePost.mutation"

const useOptionPost = ({ postId }: any) => {
  const [deletePost] = useMutation(DELETE_POST)

  const handleDeletePost = async () => {
    try {
      await deletePost({
        variables: { postId },
        update(cache) {
          cache.modify({
            fields: {
              GetPosts(existingPosts = []) {
                return existingPosts.filter((postRef: any) => postRef.__ref !== `Post:${postId}`)
              },
            },
          })
        },
      })
    } catch (error) {
      console.error("Error al eliminar el post")
    }
  }

  return {
    handleDeletePost,
  }
}

export default useOptionPost
