import { gql } from "@apollo/client"

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
