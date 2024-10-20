import { gql, useMutation } from "@apollo/client";

export const CREATE_COMMENT = gql`
mutation Mutation($input: CommentCreate!) {
  CreateComment(input: $input) {
    content
    id
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