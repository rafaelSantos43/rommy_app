import { View, ViewStyle } from "react-native"
import ImageValidateType from "app/components/ImageValidateType"

const ContentForImage = (props: any) => {
  const {post} = props
  const imageContent = post?.imageUrl
  
  return (
      <View style={$contentCenter}>
        <ImageValidateType image={imageContent} width={'100%'} height={'100%'} radius={20}/>
      </View>
  )
}

export default ContentForImage

const $contentCenter: ViewStyle = {
  
  borderColor:'gray',
  borderRadius:20,
  marginVertical:10,
  height:200,
}