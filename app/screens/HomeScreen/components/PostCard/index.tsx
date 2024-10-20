import { View, ViewStyle } from "react-native"
import ImageValidateType from "../../../../components/ImageValidateType"
import { Text } from "../../../../components/Text"
import { EllipsisVertical } from "lucide-react-native"
import ContentForImage from "./ContentForImage"
import ContentFooter from "./ContentFooterPost"
import ContentForText from "./ContentForText"

const PostCard = (props: any) => {
  const { post } = props
 
  const imageContent = post?.imageUrl
  const nameAuthor = post?.author?.name 
  const title = post?.title
  const content = post?.content

  return (
    <View style={$container}>
      <View style={$contentHeader}>
        <View style={$contentImage}>
          <ImageValidateType  width={40} height={40} radius={50} />
          <Text>{nameAuthor}</Text>
        </View>
        <EllipsisVertical size={25} color={"black"} style={{}} />
      </View>

      {imageContent ? (
        <ContentForImage image={imageContent} />
      ) : (
        <ContentForText title={title} content={content} />
      )}
      <ContentFooter postId={post.id}/>
    </View>
  )
}

export default PostCard

const $container: ViewStyle = {
  flex: 1,
  // height: height * 0.79,
  marginVertical: 20,
}

const $contentHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $contentImage: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

const $contentDescription: ViewStyle = {}
const $containerFooter: ViewStyle = {}
