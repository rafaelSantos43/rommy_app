import { ApolloClient, InMemoryCache } from "@apollo/client"

const apolloConfig = () => {
  const client = new ApolloClient({
    uri: "http://192.168.1.5:4000/graphql",
    cache: new InMemoryCache(),
  })

  return client
}

export default apolloConfig
