import { gql, useMutation } from "@apollo/client";

export const CREATE_COMMENT = gql`
mutation Mutation($filter: CommentCreate!) {
  CreateComment(filter: $filter) {
    id
    content
    postId
    createdAt
    updatedAt
  }
}
`

const useCreateComments = () => {
    return useMutation(CREATE_COMMENT)
}

export default useCreateComments