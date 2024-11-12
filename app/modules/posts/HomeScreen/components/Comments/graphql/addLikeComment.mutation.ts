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

const removeLikeInCache = (cache: any, likeListInCacheh: any, commentId:any, userSession:any) => {
  const postCacheId = cache.identify({ __typename: "Comment", id: commentId })
 cache.modify({
    id: postCacheId,
    fields: {
      likeCount(existingLike = 0) {
        return Math.max(existingLike - 1, 0)
      },
      GetListLikeComment(existingLike = []) {
        return existingLike.filter(
          (like) => like.author?.id !== userSession._id
        );
      },
    },
  })

    // cache.modify({
    //   fields:{
    //     GetListLikeComment(existingLike = []){
    //       return existingLike.filter(
    //         (like:any) => like.author?.id !== userSession._id
    //       );
    //     }
    //   }
    // })
 
  
  // cache.writeQuery({
  //   query: GET_LIST_LIKE_COMMENT,
  //   variables: { commentId },
  //   data: {
  //     GetListLikeComment: likeListInCacheh.filter((like) => like.author.id !== userSession._id),
  //   },
  // })

  
 // return responseIncache
}

const addLikeInCache = (cache: any, likeListInCache: any, addLikeComment: any, commentId:any) => {
//  console.log(likeListInCache,'jajajjaj');
  
  
  const postCacheId = cache.identify({ __typename: "Comment", id: commentId })
  const newLike = {
    __typename: "LikeComment",
    id: addLikeComment.id || `temp-${Date.now()}`,
    content:addLikeComment.content,
    author: {
      __typename: "User",
      id: addLikeComment.author.id,
      name: addLikeComment.author.name,
      avatar: addLikeComment.author.avatar,
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

    GetListLikeComment(existingLike = []) {
      // Evitar duplicados
      if (existingLike.some((like) => like.id === newLike.id)) {
        return existingLike;
      }
      return [...existingLike, newLike];
    },
  })


  // cache.modify({
  //   fields:{
  //     GetListLikeComment( existingLike = []){
  //       console.log('esto es lo que hay');
        
  //       return [...existingLike, newLike]
  //     }
  //   }
  // })
}


export const useAddLikeComment = ({ commentId, userSession }: any) => {
  const [addLikeComment] = useMutation(ADD_LIKE_COMMENT)

  const handleAddLikeComment = async () => {
    try {
      await addLikeComment({
        variables: { commentId },
        update(cache, {data:{addLikeComment}}) {
          if(!addLikeComment) return
          
          const {GetListLikeComment: likeListInCache} = cache.readQuery({
            query:GET_LIST_LIKE_COMMENT,
            variables:{ commentId }
          })
          
          const hasLiked = likeListInCache.some((like:any) => like.author.id ===  userSession._id)

          if (hasLiked) {
            console.log('ya esta en el cache');
            removeLikeInCache(cache, likeListInCache, commentId, userSession)
          } else {
            console.log('no esta en el cache');
            addLikeInCache(cache, likeListInCache, addLikeComment, commentId)
          }
        },
        optimisticResponse: {
          __typename: "addLikeComment",
          addLikeComment: {
            __typename: "LikeComment",
            id: `temp-${Date.now()}`,
            content:"",
            likeCount:0,
            author: {
              __typename: "User",
              id: userSession._id,
              name: userSession.name,
              avatar: userSession.avatar || "",
            },
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          },
        },
      })
    } catch (error) {
      console.error("Error al eliminar el like", error)
    }
  }

  return {
    handleAddLikeComment
  }
}
