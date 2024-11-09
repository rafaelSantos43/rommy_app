import { gql } from "@apollo/client";

export const COMMENTS_COUNT = gql`
query Query($postId: ID!) {
  CommentsCount(postId: $postId)
}
`