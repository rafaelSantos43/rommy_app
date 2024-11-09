import { useMutation } from "@apollo/client"
import { ADD_LIKE } from "app/modules/posts/HomeScreen/graphql/addLike_post.mutation"
import { GET_LIST_LIKE } from "app/modules/posts/HomeScreen/graphql/GetListLike.query"

const useListCount = (postId: string, userSession: any) => {

  const removeLikeInCache = (cache: any, dataInCache: any) => {
   const postCacheId = cache.identify({ __typename: "Post", id: postId })
    cache.modify({
      id: postCacheId,
      fields: {
        likeCount(existingLikes = 0) {
          return Math.max(existingLikes - 1, 0)
        },
      },
    })
    const newList = dataInCache?.GetListLike.filter(
      (like: any) => like.author.id !== userSession._id,
    )
    const responseIncache = cache.writeQuery({
      query: GET_LIST_LIKE,
      variables: { postId },
      data: {
        GetListLike: newList || [],
      },
    })
    return responseIncache
  }

  const addLikeInCache = (cache: any, ) => {
    const postCacheId = cache.identify({ __typename: "Post", id: postId })

    const dataInCache = cache.readQuery({
      query: GET_LIST_LIKE,
      variables: { postId },
    })
    console.log("🚀 ~ addLikeInCache ~ dataInCache:", dataInCache)
    // const existingLikes = dataInCache?.GetListLike || []
    // const updatedLikes = [
    //   ...existingLikes,
    //   {
    //     __typename: "Like",
    //     id: `temp-${Date.now()}`,
    //     author: {
    //       __typename: "User",
    //       id: userSession._id,
    //       name: userSession.name,
    //       avatar: userSession.avatar || "",
    //     },
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //   },
    // ]

    // cache.writeQuery({
    //   query: GET_LIST_LIKE,
    //   variables: { postId },
    //   data: { GetListLike: updatedLikes || [] },
    // })

    // cache.modify({
    //   id: postCacheId,
    //   fields: {
    //     likeCount(existingLikes = 0) {
    //       return existingLikes + 1
    //     },
    //   },
    // })
  }

  const [addLike] = useMutation(ADD_LIKE, {
    variables: { postId },
    update(cache, { data: { addLike } }) {
      if (!addLike) return
     // const postCacheId = cache.identify({ __typename: "Post", id: postId })

      const dataInCache = cache.readQuery({
        query: GET_LIST_LIKE,
        variables: { postId },
      })
      
      const userHasLiked = dataInCache?.GetListLike.some(
        (likeUser: any) => likeUser.author.id === userSession._id,
      )

      if (userHasLiked) {

        const updatedLikes = dataInCache?.GetListLike.filter(like => like.author.id !== userSession._id)
        console.log("🚀 ~ update ~ existingLikes:", updatedLikes)
     cache.modify({
          id: cache.identify({__typename: 'Post', id: postId}),
          fields: {
            likeCount(existingLike = 0){
              console.log("🚀 ~ likeCount ~ existingLike:", existingLike)
              return  Math.max(existingLike - 1, 0)
            }
          }
        })

        
  
          cache.writeQuery({
            query: GET_LIST_LIKE,
            variables: { postId },
            data: { GetListLike: updatedLikes },
          })
        


        // console.log(jejje, 'que paso');
        
      }else{
    
        const newLike = {
          __typename: "Like",
          id: addLike?.author?.id || `temp-${Date.now()}`,
          author: {
            __typename: "User",
            id: userSession._id,
            name: userSession.name,
            avatar: userSession.avatar || "",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };


        const updatedLikes = [...(dataInCache?.GetListLike || []), newLike];
        cache.modify({
          id: cache.identify({__typename: 'Post', id: postId}),
          fields: {
            likeCount(existingLike = 0){
              console.log("🚀 ~ likeCount ~ existingLike:", existingLike)
              return  existingLike + 1
            }
          }
        })
         
        cache.writeQuery({
          query: GET_LIST_LIKE,
          variables: { postId },
          data: { GetListLike: updatedLikes },
        })
        // cache.modify({
        //   id: `GetListLike({"postId":"${postId}"})`,
        //   fields: {
        //     GetListLike(existingLikes = []) {
        //       console.log("🚀 ~ GetListLike ~ existingLikes:", existingLikes)
        //       return [...existingLikes, newLike];
        //     },
        //   },
        // });
        
      }

 

      // if (userHasLiked) {
      //   removeLikeInCache(cache, postCacheId, dataInCache)
      // } else {
      //   console.log("agrego")
      //   addLikeInCache(cache, postCacheId, dataInCache)
      // }
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
     
   

  return {
    addLike,
  }
}

export default useListCount
