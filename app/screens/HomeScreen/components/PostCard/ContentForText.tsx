import { View, ViewStyle } from "react-native"
import { Text } from "../../../../components/Text"

const ContentForText = (props: any) => {
  const { title = 'my post', content = "content", } = props
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
