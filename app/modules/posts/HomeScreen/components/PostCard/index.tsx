import React from "react"
import { View, ViewStyle } from "react-native"
import ImageValidateType from "../../../../../components/ImageValidateType"
import { Text } from "../../../../../components/Text"
import { EllipsisVertical } from "lucide-react-native"
import ContentForImage from "./ContentForImage"
import ContentFooterPost from "./ContentFooterPost"
import ContentForText from "./ContentForText"

const PostCard = (props: any) => {
  const { post, setPostIdList, userSession } = props
  const imageContent = post?.imageUrl || false
  const nameAuthor = post?.author?.name
  const imageAuthor = post?.author?.avatar  
 
  return (
    <View style={$container}>
      <View style={$contentHeader}>
        <View style={$contentImage}>
          <ImageValidateType image={imageAuthor}  width={40} height={40} radius={50} />
          <Text style={{fontWeight:'bold'}}>{nameAuthor}</Text>
        </View>
        <EllipsisVertical size={25} color={"black"} style={{}} />
      </View>

      {imageContent ? (
        <ContentForImage  post={post} />
      ) : (
        <ContentForText post={post}/>
      )}
      <ContentFooterPost post={post} setPostIdList={setPostIdList} userSession={userSession}/>
    </View>
  )
}

export default PostCard

const $container: ViewStyle = {
  flex: 1,
 // marginBottom:1,
  // height: height * 0.79,
  marginVertical: 15,
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
