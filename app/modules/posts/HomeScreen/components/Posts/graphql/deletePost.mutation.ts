import { gql } from "@apollo/client"

export const DELETE_POST = gql`
  mutation DeleteComment($commentId: ID!, $postId: ID!) {
    DeleteComment(commentId: $commentId, postId: $postId)
  }
`
