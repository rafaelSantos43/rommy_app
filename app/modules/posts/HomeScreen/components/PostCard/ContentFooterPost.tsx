import React from "react"
import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { BookmarkPlus, MessageCircle, Share } from "lucide-react-native"
import { openModalVar } from "app/store/reactiveVars"
import { Icon, Text } from "app/components"
import { useMutation } from "@apollo/client"
import { ADD_LIKE } from "../../graphql/addLike_post.mutation"

// mutation addLike($postId: ID!) {
//   addLike(postId: $postId) {
//     author {
//       name
//       avatar
//       id
//     }
//   }
// }
const updateLikeInCache = (cache: any, postId: string) => {
 cache.modify({
    id: cache.identify({ __typename: "Post", id: postId }),
    fields: {
      likeCount(existingLikeCount = 0) {
        console.log("🚀 ~ likeCount ~ existingLikeCount:", existingLikeCount)
        if (!existingLikeCount) {
           existingLikeCount = 0
          return existingLikeCount
        }
        return existingLikeCount 
      },
    },
  })

}

const ContentFooterPost = ({ post, setPostId, postId }: any) => {
  const { likeCount, commentCount } = post

  const [addLike] = useMutation(ADD_LIKE, {
    variables: {
      postId,
    },
    update(cache, { data: { addLike } }) {
      if (addLike) updateLikeInCache(cache, postId)
    },
    // optimisticResponse: {
    //   __typename: "Post",
    //   postId
    // }
  })

  const handleAddLike = async () => {
    try {
      await addLike()
      console.log("se dio like")
    } catch (error) {
      console.error(`Error al dar like ${error}`)
    }
  }
  return (
    <>
      <View style={$container}>
        <TouchableOpacity
          onPress={() => {
            setPostId(post.id)
           if(postId) handleAddLike()
          }}
          style={$contentLikes}
        >
          <Icon icon="heart" size={20} color="black" />
          {!likeCount ? "" : <Text>{likeCount}</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPostId(post.id)
            openModalVar(true)
          }}
          style={$contentComments}
        >
          <MessageCircle size={20} color="black" />
          {!commentCount ? "" : <Text>{commentCount}</Text>}
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
