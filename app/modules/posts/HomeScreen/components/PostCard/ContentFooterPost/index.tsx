import React from "react"
import { View, ViewStyle } from "react-native"
import { BookmarkPlus, Share } from "lucide-react-native"
import LikesCount from "./LikesCount"
import CommentCount from "./CommentCount"
import {  useQuery } from "@apollo/client"
import { GET_LIST_LIKE } from "../../../graphql/GetListLike.query"

const ContentFooterPost = ({ post, setPostIdList, userSession }: any) => {
  const { likeCount, commentCount } = post
   useQuery(GET_LIST_LIKE, {
    variables:{
      postId: post.id
    },
  })
 
  return (
    <View style={$container}>
      <LikesCount userSession={userSession} likeCount={likeCount} postId={post.id}/>
      <CommentCount setPostIdList={setPostIdList} commentCount={commentCount} postId={post.id}/>
      <View>
        <Share size={20} color="black" />
      </View>
      <View>
        <BookmarkPlus size={20} color="black" />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 5,
}


export default ContentFooterPost
