import { Icon, Text } from "app/components"
import { View, ViewStyle } from "react-native"


const ContentFooterComment = () => {
  return (
    <View style={$container}>
      <View style={$contentLikes}>
        <Icon icon="heart" size={20} color="black" />
        <Text>12345</Text>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  // paddingHorizontal: 5,
}

const $contentLikes: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 8,
}

const $contentComments: ViewStyle = {
  ...$contentLikes,
}

export default ContentFooterComment
