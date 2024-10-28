export interface Comment {
  __typename: string
  id: string
  content: string
  postId: string
  author: {
    __typename: string
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
}
