import React from "react"
import { View, ViewStyle } from "react-native"
import { BookmarkPlus, Share } from "lucide-react-native"
import LikesCount from "./LikesCount"
import CommentCount from "./CommentCount"

const ContentFooterPost = ({ post, setPostIdList, userSession }: any) => {
  const {id, likeCount, commentCount } = post
   
  return (
    <View style={$container}>
      <LikesCount userSession={userSession} likeCount={likeCount} postId={id}/>
      <CommentCount setPostIdList={setPostIdList} commentCount={commentCount} postId={id}/>
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
