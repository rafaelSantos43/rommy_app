import { gql } from "@apollo/client"

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    DeleteComment(commentId: $commentId)
  }
`
