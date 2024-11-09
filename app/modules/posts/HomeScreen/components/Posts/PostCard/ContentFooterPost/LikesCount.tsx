import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Text } from "app/components"
import { navigate } from "app/navigators"
import useListCount from "./useLikeCountList"
import { GET_LIST_LIKE } from "../../../../graphql/GetListLike.query"
import { useQuery } from "@apollo/client"

const LikesCount = ({userSession, likeCount, postId }: any) => {

   const {handleAddLike} = useListCount(postId, userSession)
   const {data} = useQuery(GET_LIST_LIKE,{
    variables: {postId},
    fetchPolicy: "cache-and-network",
  })
 
  return (
    <View style={$containerLikes}>
      <TouchableOpacity onPress={handleAddLike} style={$contentIconLike}>
        <Icon icon="heart" size={20} color={"black"} />
        <Text style={{ fontSize: 12 }}>{!likeCount ? "" : likeCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={$contentLikeList}
        onPress={() => navigate("LikeListScreen", { postId, data})}
      >
        <Text style={{ fontSize: 14 }}>like List</Text>
      </TouchableOpacity>
    </View>
  )
}

const $containerLikes: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 15,
  padding: 5,
}

const $contentIconLike: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 3,
  // borderWidth: 1,
}

const $contentLikeList: ViewStyle = {
  // borderWidth: 1,
}

export default LikesCount
