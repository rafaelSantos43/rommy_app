import { Icon, Text } from "app/components"
import { Pressable, TouchableOpacity, View, ViewStyle } from "react-native"
import { BookmarkPlus, MessageCircle, Share } from "lucide-react-native"
import CommentModal from "../CommentContentModal"
import { useState } from "react"
import { openModalVar, postIdVar } from "app/store/reactiveVars"

const ContentFooterPost = ({postId}:any) => {  
  return (
    <>
      <View style={$container}>
        <View style={$contentLikes}>
          <Icon icon="heart" size={20} color="black" />
          <Text>12345</Text>
        </View>
        <TouchableOpacity onPress={() =>{
           openModalVar(true)
           postIdVar(postId)
          }} 
           style={$contentComments}>
          <MessageCircle size={20} color="black" />
          <Text>12</Text>
        </TouchableOpacity>
        <View>
          <Share size={20} color="black" />
        </View>
        <View>
          <BookmarkPlus size={20} color="black" />
        </View>
      </View>

    </>
  )
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 5,
}

const $contentLikes: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 8,
}

const $contentComments: ViewStyle = {
  ...$contentLikes,
}

export default ContentFooterPost
