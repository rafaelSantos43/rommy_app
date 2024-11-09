import { gql } from "@apollo/client";

export const GET_LIST_LIKE = gql`
query GetListLike($postId: ID!) {
  GetListLike(postId: $postId) {
    id
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