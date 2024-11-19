import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { useStore } from "app/store/useStore"


const useApolloConfig = () => {
  const {session} = useStore()

  const httpLink = createHttpLink({
    uri: "http://192.168.1.5:4000/graphql"
  })
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
       authorization: session ? `${session?.token}` : ""
      },
    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            GetListLike: {
              merge(existing, incoming) {
                // Sobrescribir con la nueva lista de likes (incoming)
                return incoming;
              },
            },
            GetListLikeComment: {
              merge(existing = [], incoming) {
                const mergedLikes = [
                  ...existing,
                  ...incoming.filter(
                    (newLike) =>
                      !existing.some(
                        (existingLike) => existingLike.__ref === newLike.__ref
                      )
                  ),
                ];
                return mergedLikes;
              },
            },
            // GetListLikeComment: {
            //   merge(existing, incoming) {
            //     // Sobrescribir con la nueva lista de likes (incoming)
            //     return incoming;
            //   },
            // },
            GetComments: {
              merge(existing = [], incoming) {
                // Filtra duplicados solo si es necesario
                const merged = [...existing, ...incoming].filter(
                  (item, index, self) =>
                    index === self.findIndex((t) => t.__ref === item.__ref)
                );
                return merged;
              },
            },
          },
        },

        GetListLikeComment: {
          keyFields: ["id"], // Normaliza usando el campo `id`
        },
      },
    }),
  });
  

  return client
}
// cache: new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         GetComments: {
//           keyArgs: ['postId'], // Cache los comentarios en función del postId
//         },
//       },
//     },
//   }, 
// }),
export default useApolloConfig
