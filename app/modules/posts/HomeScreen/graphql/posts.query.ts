import { gql } from "@apollo/client"

export const POSTS = gql`
  query GetPosts {
    GetPosts {
      id
      content
      title
      imageUrl
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    commentCount
    likeCount
    likes
    }
  }
`
