export interface Post {
    __typename: string
    id: string
    title: string
    content: string
    imageUrl: string
    commentCount: number
    updatedAt: string
    author: {
      __typename: string
      id: string
      name: string
      avatar: string
    }
    likes: Array<[]>
    likeCount: number
    comments: Array<[]>
    createdAt: string
  }