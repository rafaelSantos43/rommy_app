import { gql } from "@apollo/client"

export const FRAGMENT_GET_LIST_LIKE = gql`
  fragment LikeListFragment on Like {
    id
    author {
      id
      name
      avatar
    }
  }
`

export const GET_LIST_LIKE = gql`
  query GetListLike($postId: ID!) {
    GetListLike(postId: $postId) {
      ...LikeListFragment
      createdAt
      updatedAt
    }
  }
  ${FRAGMENT_GET_LIST_LIKE}
`
