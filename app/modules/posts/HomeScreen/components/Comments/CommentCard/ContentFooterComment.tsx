import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { useQuery } from "@apollo/client"

import { Icon, Text } from "app/components"
import { GET_LIST_LIKE_COMMENT } from "app/modules/posts/LikeListScreen/graphql/GetListLikeComment.query"
import { navigate } from "app/navigators"
import { openModalVar } from "app/store/reactiveVars"
import { useAddLikeComment } from "../graphql/addLikeComment.mutation"

const ContentFooterComment = ({ comment,userSession }: any) => {
  const { data } = useQuery(GET_LIST_LIKE_COMMENT, { variables: { commentId: comment.id } })
  const likeListComment = data?.GetListLikeComment
  const likeCount = comment.likeCount ? comment.likeCount : ""
  
  const {handleAddLikeComment} = useAddLikeComment({commentId:comment.id, userSession})

  return (
    <View style={$contentLikes}>
      <TouchableOpacity
       onPress={handleAddLikeComment}
      >
        <Icon icon="heart" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigate("LikeListScreen", { likeList: likeListComment })
          openModalVar(false)
        }}
      >
        <Text style={{ fontSize: 12 }}>{likeCount} likes</Text>
      </TouchableOpacity>
    </View>
  )
}

const $contentLikes: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 8,
}

export default ContentFooterComment
