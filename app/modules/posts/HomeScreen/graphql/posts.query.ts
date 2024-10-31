import { gql } from "@apollo/client"

export const FRAGMENT_POST = gql`
  fragment NewPost on Post {
    id
    title
    content
    imageUrl
    author {
      id
      name
    }
    commentCount
    likeCount
    createdAt
    updatedAt
  }
`

export const POSTS = gql`
  query GetPosts {
    GetPosts {
      id
      content
      title
      imageUrl
      author {
        id
        name
        avatar
      }
      commentCount
      likeCount
      createdAt
      updatedAt
    }
  }
`
