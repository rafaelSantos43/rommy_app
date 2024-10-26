import { gql, useQuery } from "@apollo/client"

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

const usePosts = () => {
  return useQuery(POSTS)
}

export default usePosts
