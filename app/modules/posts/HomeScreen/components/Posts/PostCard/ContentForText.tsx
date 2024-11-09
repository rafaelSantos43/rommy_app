import { Text } from "app/components"
import { View, ViewStyle } from "react-native"


const ContentForText = (props: any) => {
  const {post } = props
  const title = post?.title
  const content = post?.content
  return (
    <View style={$contentCenter}>
      <Text style={{fontWeight:'bold', color:'gray'}}>{title}</Text>
      <View style={{backgroundColor:'white', opacity:0.8, padding:10, borderRadius:5}}>
        <Text numberOfLines={6} style={{color:'#736F6F'}}>{content}</Text>
      </View>
    </View>
  )
}

export default ContentForText

const $contentCenter: ViewStyle = {
  rowGap :10,
  borderRadius: 10,
  marginVertical: 10,
}

