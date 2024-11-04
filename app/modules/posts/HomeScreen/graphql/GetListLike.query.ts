import { gql, useQuery } from "@apollo/client";

export const GET_LIST_LIKE = gql`
query GetListLike($postId: ID!) {
  GetListLike(postId: $postId) {
    author {
      id
      name
    }
    id
    createdAt
    updatedAt
  }
}
`

const useGetListLIke = ({postId}:{postId:string}) => {
  return useQuery(GET_LIST_LIKE, {
    variables:{
      postId
    }
  })
}

export default useGetListLIke