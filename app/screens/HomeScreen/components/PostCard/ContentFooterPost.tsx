import { Icon, Text } from "app/components"
import { Pressable, TouchableOpacity, View, ViewStyle } from "react-native"
import { BookmarkPlus, MessageCircle, Share } from "lucide-react-native"
import { openModalVar, postIdVar } from "app/store/reactiveVars"

const ContentFooterPost = ({post}:any) => {  

   const postId = post.id
   const likeCount = post.likeCount
   const commentCount = post.commentCount
  return ( 
    <>
      <View style={$container}>
        <View style={$contentLikes}>
          <Icon icon="heart" size={20} color="black" />
          <Text>{likeCount}</Text>
        </View>
        <TouchableOpacity onPress={() =>{
           openModalVar(true)
           postIdVar(postId)
          }} 
           style={$contentComments}>
          <MessageCircle size={20} color="black" />
          <Text>{commentCount}</Text>
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
