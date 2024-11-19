import { gql, useMutation, Reference } from "@apollo/client"
import { GET_LIST_LIKE_COMMENT } from "app/modules/posts/LikeListScreen/graphql/GetListLikeComment.query"

export const ADD_LIKE_COMMENT = gql`
  mutation addLikeComment($commentId: ID!) {
    addLikeComment(commentId: $commentId) {
      id
      content
      likeCount
      author {
        id
        name
        avatar
      }
    }
  }
`

const removeLikeInCache = (cache: any, commentId:any, userSession:any) => {
  const postCacheId = cache.identify({ __typename: "Comment", id: commentId })
 cache.modify({
    id: postCacheId,
    fields: {
      likeCount(existingLike = 0) {
        return Math.max(existingLike - 1, 0)
      },
    },
  })

    cache.modify({
      fields:{
        GetListLikeComment(existingLike = []){
          return existingLike.filter(
            (like:any) => like.author?.id !== userSession._id
          );
        }
      }
    })
 
}

const addLikeInCache = (cache: any,  addLikeComment: any, commentId:any) => {
    
  const postCacheId = cache.identify({ __typename: "Comment", id: commentId })
  const newLike = {
    __typename: "LikeComment",
    author: {
      __typename: "User",
      id:addLikeComment.author.id
    },
  }

  cache.modify({
    id: postCacheId,
    fields: {
      likeCount(existingLike = 0) {
        return existingLike + 1
      },
    },
  })

  cache.modify({
    fields:{
      GetListLikeComment( existingLike = []){ 
        console.log(existingLike,'siiii');
        
        return [...existingLike, newLike]
      }
    }
  })
}


export const useAddLikeComment = ({ commentId, userSession }: any) => {
  
  const [addLikeComment] = useMutation(ADD_LIKE_COMMENT)

const handleAddLikeComment = async () => {
    try {
      await addLikeComment({
        variables: { commentId },
        update(cache, {data:{addLikeComment}}) {
          if(!addLikeComment) return
          
          const dataInCache = cache.readQuery({
            query:GET_LIST_LIKE_COMMENT,
            variables:{ commentId }
          })
        
          const likeListInCache = dataInCache?.GetListLikeComment || [];
          const existingLikeIndex = likeListInCache.findIndex(
            (like: any) => like.author.id === userSession._id
          )    
          
          if (existingLikeIndex !== -1) {
            const updatedLikes = likeListInCache.filter(
              (like: any) => like.author.id !== userSession._id
            );

            
            
            // Escribir el nuevo estado de los likes en el cache, solo eliminando el like del usuario
            const result = cache.writeQuery({
              query: GET_LIST_LIKE_COMMENT,
              variables: { commentId },
              data: {
                GetListLikeComment: updatedLikes,
              },
            });
            console.log(result,'jjajjjaja');
          } else {
            
            const newLike = {
              __typename: "LikeComment",
              id: addLikeComment.id || `temp-${Date.now()}`, // id temporal

              author: {
                __typename: "User",
                id: addLikeComment.author.id, // El ID del usuario actual
                name: addLikeComment.author.name, // Nombre del usuario
                avatar: addLikeComment.author.avatar || "", // Avatar del usuario
              },
              content: "", // Contenido del like (puede ser vacío o algo relevante)
              createdAt: new Date().toISOString(), // Fecha de creación
              updatedAt: new Date().toISOString(), // Fecha de actualización
            };
            
            const newLikeRef = cache.identify(newLike)

            const updateList = {
              ...newLike,
              newLikeRef
            }
            
            
           const result = cache.writeQuery({
              query: GET_LIST_LIKE_COMMENT,
              variables: { commentId },
              data: {
                GetListLikeComment: [...likeListInCache, updateList], // Nueva lista
              },
            });
            console.log(result,'desde add');
          }
          
          
        },
        optimisticResponse: {
          __typename: "Mutation",
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
          },
        },
        
      })
    } catch (error) {
      console.error("Error al eliminar el like", error)
    }
  }  
  // const handleAddLikeComment = async () => {
  //   try {
  //     await addLikeComment({
  //       variables: { commentId },
  //       update(cache, { data: { addLikeComment } }) {
  //         if (!addLikeComment) return;
  
  //         // Leer la lista de likes actual desde el caché
  //         const dataInCache = cache.readQuery({
  //           query: GET_LIST_LIKE_COMMENT,
  //           variables: { commentId },
  //         });
  
  //         const likeListInCache = dataInCache?.GetListLikeComment || [];
  
  //         // Verificar si el usuario actual ya ha dado like
  //         const hasLiked = likeListInCache.some((like: any) => like.author.id === userSession._id);
  
  //         if (hasLiked) {
          
  //           // Actualizar la lista de likes eliminando el like del usuario
  //           cache.writeQuery({
  //             query: GET_LIST_LIKE_COMMENT,
  //             variables: { commentId },
  //             data: {
  //               GetListLikeComment: likeListInCache.filter(
  //                 (likeRef: any) => likeRef.author.id !== userSession._id
  //               ),
  //             },
  //           });
  //         } else {
           
  //           const newLike = {
  //             ...addLikeComment,
  //             likeCount:0,
  //             createdAt: new Date().toISOString(),
  //             updatedAt: new Date().toISOString(),
  //           };
  
  //           cache.writeQuery({
  //             query: GET_LIST_LIKE_COMMENT,
  //             variables: { commentId },
  //             data: {
  //               GetListLikeComment: [...likeListInCache, newLike],
  //             },
  //           });
  //         }
  //       },
  //       optimisticResponse: {
  //         __typename: "Mutation",
  //         addLikeComment: {
  //           __typename: "LikeComment",
  //           content:"",
  //           id: `temp-${Date.now()}`,
  //           likeCount:0,
  //           author: {
  //             __typename: "User",
  //             id: userSession._id,
  //             name: userSession.name,
  //             avatar: userSession.avatar || "",
  //           },
  //           createdAt: new Date().toISOString(),
  //           updatedAt: new Date().toISOString(),
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error al agregar/eliminar el like", error);
  //   }
  // };
  

  return {
    handleAddLikeComment
  }
}
