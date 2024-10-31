import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
mutation addLike($postId: ID!) {
  addLike(postId: $postId) {
    author {
      id
      name
      avatar
    }
  }
}
`