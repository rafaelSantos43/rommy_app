import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Text } from "app/components"
import { navigate } from "app/navigators"
import useListCount from "./useLikeCountList"
import { GET_LIST_LIKE } from "../../../../../LikeListScreen/graphql/GetListLike.query"
import { useQuery } from "@apollo/client"

const LikesCount = ({ userSession, likeCount, postId }: any) => {
  const { handleAddLike } = useListCount(postId, userSession)

  const { data } = useQuery(GET_LIST_LIKE, {
    variables: { postId },
    fetchPolicy: "cache-and-network",
  })
  
  const likeListPost =  data?.GetListLike
  const hasUserLiked = data?.GetListLike.some((like: any) => like.author.id === userSession._id)

  const likeText =
    likeCount === 0
      ? ""
      : likeCount > 1 && hasUserLiked
      ? "you other.."
      : likeCount >= 1 && !hasUserLiked
      ? "other.."
      : "you"

  return (
    <View style={$containerLikes}>
      <TouchableOpacity onPress={handleAddLike} style={$contentIconLike}>
        <Icon icon="heart" size={20} color={hasUserLiked ? "red" : "black"} />
        <Text style={{ fontSize: 12 }}>{likeCount || ""}</Text>
      </TouchableOpacity>
      {likeText ? (
        <TouchableOpacity
          style={$contentLikeList}
          onPress={() => navigate("LikeListScreen", { likeList: likeListPost })}
        >
          <Text style={{ fontSize: 14 }}>{likeText}</Text>
        </TouchableOpacity>
      ) : null}
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
}

const $contentLikeList: ViewStyle = {}

export default LikesCount
