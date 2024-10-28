import { TouchableOpacity, View, ViewStyle } from "react-native"
import { BookmarkPlus, MessageCircle, Share } from "lucide-react-native"
import { useQuery } from "@apollo/client"

import { openModalVar } from "app/store/reactiveVars"
import { Icon, Text } from "app/components"
import { COMMENTS_COUNT } from "../../graphql/Comments_count.query"

const ContentFooterPost = ({ post, setPostId, postId }: any) => {
  const likeCount = post.likeCount

  const { data, error } = useQuery(COMMENTS_COUNT, {
    variables: {
      postId,
    },
  })
  const commentCount = data?.CommentsCount
  console.log(commentCount,'siiii', postId);
  
  return (
    <>
      <View style={$container}>
        <View style={$contentLikes}>
          <Icon icon="heart" size={20} color="black" />
          <Text>{likeCount}</Text>
        </View>
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
