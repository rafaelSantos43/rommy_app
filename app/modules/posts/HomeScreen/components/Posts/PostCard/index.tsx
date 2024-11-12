import React, { useState } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import ImageValidateType from "app/components/ImageValidateType"
import { Text } from "app/components/Text"
import { EllipsisVertical } from "lucide-react-native"
import ContentForImage from "./ContentForImage"
import ContentFooterPost from "./ContentFooterPost"
import ContentForText from "./ContentForText"
import OptionPost from "./OptionPost"

const PostCard = (props: any) => {
  const { post, setPostIdList, userSession } = props
  const imageContent = post?.imageUrl || false
  const nameAuthor = post?.author?.name
  const imageAuthor = post?.author?.avatar
  const [openOptions, setOpenOptions] = useState(false)

 const handleOpenOptions = () => {
   setOpenOptions(!openOptions)
 } 

  return (
    <>
      <View style={$container}>
        <View style={$contentHeader}>
          <View style={$contentImage}>
            <ImageValidateType image={imageAuthor} width={40} height={40} radius={50} />
            <Text style={{ fontWeight: "bold" }}>{nameAuthor}</Text>
          </View>
          <TouchableOpacity onPress={handleOpenOptions}>
            <EllipsisVertical size={25} color={"black"} style={{}} />
          </TouchableOpacity>
        </View>

        {imageContent ? <ContentForImage post={post} /> : <ContentForText post={post} />}
        <ContentFooterPost post={post} setPostIdList={setPostIdList} userSession={userSession} />
      </View>
      {openOptions && (
        <View style={$optionPost}>
          <OptionPost userSession={userSession} post={post} />
        </View>
      )}
    </>
  )
}

export default PostCard

const $container: ViewStyle = {
  flex: 1,
  // marginBottom:1,
  // height: height * 0.79,
  marginVertical: 15,
  rowGap: 20,
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

const $optionPost: ViewStyle = {
  position:'absolute',
  alignSelf: 'flex-end',
  right:20,
  top:25,
  width:100,
  borderRadius:8,
  backgroundColor:'#F4F2F1',
  opacity:0.83,
  padding:8
}

