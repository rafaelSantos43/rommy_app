import { gql } from "@apollo/client"

export const FRAGMENT_GET_LIST_COMMENT = gql`
   fragment CommentLikeListFragment on GetListLikeComment {
    id
    author {
      id
      name
      avatar
    }
   }
`

export const GET_LIST_LIKE_COMMENT = gql`
  query GetListLikeComment($commentId: ID!) {
    GetListLikeComment(commentId: $commentId) {
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
