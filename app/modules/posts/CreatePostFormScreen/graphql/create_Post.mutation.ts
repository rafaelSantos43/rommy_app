import { gql } from "@apollo/client";

export const CREATE_POST = gql`
mutation CreatePost($filter: postCreate!) {
  CreatePost(filter: $filter) {
      id
    title
    content
    imageUrl
    createdAt
    updatedAt
    author {
      name
      id
    }
  }
}
`