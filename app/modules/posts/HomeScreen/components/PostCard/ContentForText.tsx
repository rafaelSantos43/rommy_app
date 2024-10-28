import { Text } from "app/components"
import { View, ViewStyle } from "react-native"


const ContentForText = (props: any) => {
  const {post } = props
  const title = post?.title
  const content = post?.content
  return (
    <View style={$contentCenter}>
      <Text>{title}</Text>
      <Text numberOfLines={6} style={$contentDescription}>
        {content}
      </Text>
    </View>
  )
}

export default ContentForText

const $contentCenter: ViewStyle = {
  borderWidth: 1,
  borderColor: "gray",
  borderRadius: 20,
  padding: 10,
  marginVertical: 10,
  height: 200,
}

const $contentDescription: ViewStyle = {
    
}
