import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { useStore } from "app/store/useStore"

const arra = [1]

console.log(arra.slice(0,0))

const useApolloConfig = () => {
  const {session} = useStore()

  const httpLink = createHttpLink({
    uri: "http://10.2.20.100:4000/graphql"
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
            GetComments: {
              merge(existing = [], incoming) {
              
                const merged = [...existing, ...incoming].filter(
                  (item, index, self) =>
                    index === self.findIndex((t) => t.__ref === item.__ref)
                );
                return merged;
              },
            },
          },
        },
      },
    }),
  })

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
