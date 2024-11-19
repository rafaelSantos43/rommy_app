import { gql, useLazyQuery } from "@apollo/client"

const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    SearchUsers(query: $query) {
      id
      name
      avatar
    }
  }
`

const useSearchUsers = () => {
  return useLazyQuery(SEARCH_USERS)
}

export default useSearchUsers