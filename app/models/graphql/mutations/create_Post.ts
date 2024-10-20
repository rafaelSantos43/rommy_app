import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
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

const useCreatePost = () => {
   return useMutation(CREATE_POST) 
}

export default useCreatePost