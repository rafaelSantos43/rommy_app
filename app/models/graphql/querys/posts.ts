import { gql, useQuery } from "@apollo/client"

export const POSTS = gql`
  query GetPosts {
    GetPosts {
      id
      content
      title
      imageUrl
      commentCount
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
      comments {
        id
        postId
        content
        createdAt
        updatedAt
        author {
          id
          avatar
          name
        }
      }
    }
  }
`

const usePosts = () => {
  return useQuery(POSTS)
}

export default usePosts
