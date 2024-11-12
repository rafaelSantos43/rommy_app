import { Text } from "app/components"
import { TouchableOpacity, View } from "react-native"
import useOptionPost from "./useOptionPost"
import { ArrowDownToLine, Ban, Share2, Trash2 } from "lucide-react-native"

const OptionPost = ({ userSession, post }: any) => {
  const { handleDeletePost } = useOptionPost({ userSession, postId: post.id })

  const isMyPost = post.author.id === userSession._id

  return (
    <View>
      <TouchableOpacity
        onPress={() => {}}
        style={{ flexDirection: "row", alignItems: "center", columnGap: 7 }}
      >
        <Text>Share</Text>
        <Share2 size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {}}
        style={{ flexDirection: "row", alignItems: "center", columnGap: 7 }}
      >
        <Text>Save</Text>
        <ArrowDownToLine size={20} color="black" />
      </TouchableOpacity>

      {isMyPost && (
        <TouchableOpacity
          onPress={handleDeletePost}
          style={{ flexDirection: "row", alignItems: "center", columnGap: 7 }}
        >
          <Text>Delete</Text>
          <Trash2 size={20} color="black" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {}}
        style={{ flexDirection: "row", alignItems: "center", columnGap: 7 }}
      >
        <Text>Report</Text>
        <Ban size={20} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default OptionPost
