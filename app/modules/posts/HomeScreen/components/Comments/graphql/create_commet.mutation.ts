import { gql, useMutation } from "@apollo/client";

export const CREATE_COMMENT = gql`
mutation CreateComment($filter: CommentCreate!) {
  CreateComment(filter: $filter) {
    content
    id
    postId
    author {
      id
      name
      avatar
    }
  }
}
`

const useCreateComments = () => {
    return useMutation(CREATE_COMMENT)
}

export default useCreateComments