import {  useMutation } from "@apollo/client"
import { ADD_LIKE } from "app/modules/posts/HomeScreen/graphql/addLike_post.mutation"
import { GET_LIST_LIKE } from "app/modules/posts/LikeListScreen/graphql/GetListLike.query"

const useListCount = (postId: string, userSession: any) => {
  
  const removeLikeInCache = (cache: any, likeListInCacheh: any) => {
    const responseIncache = cache.modify({
      id: cache.identify({ __typename: "Post", id: postId }),
      fields: {
        likeCount(existingLike = 0) {
          return Math.max(existingLike - 1, 0)
        },
      },
    })

    cache.writeQuery({
      query: GET_LIST_LIKE,
      variables: { postId },
      data: {
        GetListLike: likeListInCacheh.filter((like) => like.author.id !== userSession._id),
      },
    })
    return responseIncache
  }

  const addLikeInCache = (cache: any, likeListInCache: any, addLike: any) => {
    const postCacheId = cache.identify({ __typename: "Post", id: postId })
    const newLike = {
      __typename: "Like",
      id: addLike.id || `temp-${Date.now()}`,
      author: {
        __typename: "User",
        id: addLike.author.id,
        name: addLike.author.name,
        avatar: addLike.author.avatar,
      },
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    }

    cache.modify({
      id: postCacheId,
      fields: {
        likeCount(existingLike = 0) {
          return existingLike + 1
        },
      },
    })

    cache.writeQuery({
      query: GET_LIST_LIKE,
      variables: { postId },
      data: {
        GetListLike: [...likeListInCache, newLike],
      },
    })
  }

  const [addLike] = useMutation(ADD_LIKE)

  const handleAddLike = async () => {
    try {
      await addLike({
        variables: { postId },
        update(cache, { data: { addLike } }) {
          if (!addLike) return

          const { GetListLike: likeListInCache } = cache.readQuery({
            query: GET_LIST_LIKE,
            variables: { postId },
          })

          const hasLiked = likeListInCache.some((like: any) => like.author.id === userSession._id)

          if (hasLiked) {
            removeLikeInCache(cache, likeListInCache)
          } else {
            addLikeInCache(cache, likeListInCache, addLike)
          }
        },
        optimisticResponse: {
          __typename: "Mutation",
          addLike: {
            __typename: "Like",
            id: `temp-${Date.now()}`,
            author: {
              __typename: "User",
              id: userSession._id,
              name: userSession.name,
              avatar: userSession.avatar || "",
            },
          },
        },
      })
    } catch (error) {
      console.error("Error handling like:", error)
    }
  }

  return {
    handleAddLike,
  }
}

export default useListCount
