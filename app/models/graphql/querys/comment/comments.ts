import { gql, useLazyQuery, useQuery, useReactiveVar } from "@apollo/client"
import { COMMENT_FIELDS } from "./commmentFragments"
import { postIdVar } from "app/store/reactiveVars"

export const COMMENTS = gql`
  query GetComments($postId: ID!) {
    GetComments(postId: $postId) {
      id
      content
      postId
      author {
        id
        name
        avatar
      }
      createdAt
      updatedAt
    }
  }
`

const useComments = () => {
  const postId = useReactiveVar(postIdVar)
  return useLazyQuery(COMMENTS)
}

export default useComments
