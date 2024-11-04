import { gql } from "@apollo/client";

export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    content
    postId
    author {
      id
      name
      avatar
    }
    createdAt
    updatedAt
  }
`;