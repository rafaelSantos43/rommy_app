import React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import { MessageCircle } from "lucide-react-native"
import { openModalVar } from "app/store/reactiveVars"

import { Text } from "app/components"

const CommentCount = ({ setPostIdList, commentCount, postId }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        openModalVar(true)
        setPostIdList(postId)
      }}
      style={$contentComments}
    >
      <MessageCircle size={20} color="black" />
      {commentCount ? <Text style={{ fontSize: 12 }}>{commentCount}</Text> : ""}
    </TouchableOpacity>
  )
}

const $contentComments: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 2,
  padding: 5,
}

export default CommentCount
