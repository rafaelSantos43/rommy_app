import { useState } from "react"
import useCreateComments from "../graphql/create_commet.mutation"
import { COMMENTS } from "../graphql/comments.query"

const useCreateComment = ({ postId, user, flatListRef }: any) => {
  const { _id: userId, name, avatar } = user
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")

  const [createComment] = useCreateComments()
  const isButtonDisabled = !content || isLoading

  const updateCommentsInCache = (cache: any, CreateComment: Comment, existingComments: any) => {
    try {
      const newComment = {
        __typename: "Comment",
        id: CreateComment.id,
        content: CreateComment.content,
        postId,
        author: {
          __typename: "User",
          id: userId,
          name,
          avatar,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const dataIncache = cache.writeQuery({
        query: COMMENTS,
        variables: { postId },
        data: {
          GetComments: [...existingComments?.GetComments, newComment],
        },
      })

      if (dataIncache) {
        cache.modify({
          id: cache.identify({ __typename: "Post", id: postId }),
          fields: {
            commentCount(existingCommentCount = 0) {
              return existingCommentCount + 1
            },
          },
        })
      }

      return dataIncache
    } catch (error) {
      throw new Error(`Error al escribir la cuenta de comentarios ${error}`)
    }
  }

  const handleCreateComments = async () => {
    setIsLoading(true)
    try {
      await createComment({
        variables: {
          filter: {
            postId,
            content,
          },
        },
        update(cache, { data: { CreateComment } }) {
          if (!CreateComment) return

          const existingComments = cache.readQuery({
            query: COMMENTS,
            variables: {
              postId,
            },
          })

          updateCommentsInCache(cache, CreateComment, existingComments)
        },

        optimisticResponse: {
          __typename: "Mutation",
          CreateComment: {
            __typename: "Comment",
            id: Math.random().toString(),
            content,
            postId,
            author: {
              __typename: "User",
              id: userId,
              name,
              avatar,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      })
      setContent("")
      flatListRef.current?.scrollToEnd({ animated: true })
    } catch (error) {
      console.error("Error al crear el comnetario!", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleCreateComments,
    setContent,
    content,
    isButtonDisabled,
  }
}

export default useCreateComment
