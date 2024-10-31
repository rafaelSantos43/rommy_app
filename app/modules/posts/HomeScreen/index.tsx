import React, { FC, ReactElement, useState } from "react"
import { Dimensions, FlatList, ViewStyle } from "react-native"

// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated"
// import { AutoImage, ButtonAccessoryProps, Card, Icon, Screen, Text } from "../../../components"
// import { translate } from "../../../i18n"
// import { useStores } from "../../../models"
// import { Episode } from "../../../models/Episode"
import { TabScreenProps } from "../../../navigators/TabNavigator"
// import { colors } from "../../../theme"
import CommentContentModal from "./components/CommentContentModal"
import CommonModal from "app/components/CommonModal"
import { useQuery } from "@apollo/client"
import { POSTS } from "./graphql/posts.query"
import PostCard from "./components/PostCard"
import { Screen } from "app/components"

// const ICON_SIZE = 30
// const height = Dimensions.get("screen").height
// const width = Dimensions.get("screen").width

// const rnrImage1 = require("../../assets/images/demo/rnr-image-1.png")
// const rnrImage2 = require("../../assets/images/demo/rnr-image-2.png")
// const rnrImage3 = require("../../assets/images/demo/rnr-image-3.png")
// const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

// const imageFake = "https://th.bing.com/th/id/OIP.XrT5xQxuU-eJr5gadwIkfAHaIk?rs=1&pid=ImgDetMain"
// const textFake =
//   "El componente de Ignite es una versión mejorada del componente integrado de React Native Text. Agrega internacionalización y varios ajustes preestablecidos de propiedades útiles (y personalizables). No deberías necesitar el componente integrado de React Native Text si lo utilizas. Hace todo lo que hace el incorporado y más.TextAl mejorar el componente Ignite Text y usarlo en toda la aplicación, puede asegurarse de que las fuentes, el peso de la fuente y otros estilos y comportamientos correctos se compartan en toda la aplicación."

// const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

export const HomeScreen: FC<TabScreenProps<"HomeScreen">> = function HomeScreen({ route }) {
  //  const [refreshing, setRefreshing] = React.useState(false)
  const { _id: userId } = route.params.userSession
  const [postId, setPostId] = useState("")

  // const [isLoading, setIsLoading] = React.useState(false)
  const { data } = useQuery(POSTS)
  return (
    <>
      <Screen style={$screenContainer} preset="fixed">
        <FlatList
          data={data?.GetPosts}
          keyExtractor={(post) => post.id}
          renderItem={({ item: post }) => (
            <PostCard post={post} setPostId={setPostId} postId={postId} />
          )}
        />
      </Screen>
      <CommonModal>
        <CommentContentModal userId={userId} postId={postId} />
      </CommonModal>
    </>
  )
}

// const PostCards = function PostCard({
//   post,
//   isFavorite,
//   onPressFavorite,
// }: {
//   post: any
//   onPressFavorite: () => void
//   isFavorite: boolean
// }) {
//   const liked = useSharedValue(isFavorite ? 1 : 0)

//   const imageUri = useMemo<ImageSourcePropType>(() => {
//     return rnrImages[Math.floor(Math.random() * rnrImages.length)]
//   }, [])

//   // Grey heart
//   const animatedLikeButtonStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
//         },
//       ],
//       opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
//     }
//   })

//   // Pink heart
//   const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: liked.value,
//         },
//       ],
//       opacity: liked.value,
//     }
//   })

//   /**
//    * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
//    * @see https://reactnative.dev/docs/accessibility#accessibilityactions
//    */
//   const accessibilityHintProps = useMemo(
//     () =>
//       Platform.select<AccessibilityProps>({
//         // ios: {
//         //   accessibilityLabel: episode?.title,
//         //   accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
//         //     action: isFavorite ? "unfavorite" : "favorite",
//         //   }),
//         // },
//         android: {
//           accessibilityLabel: post.title,
//           accessibilityActions: [
//             {
//               name: "longpress",
//               label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
//             },
//           ],
//           onAccessibilityAction: ({ nativeEvent }) => {
//             if (nativeEvent.actionName === "longpress") {
//               handlePressFavorite()
//             }
//           },
//         },
//       }),
//     [post, isFavorite],
//   )

//   const handlePressFavorite = () => {
//     onPressFavorite()
//     liked.value = withSpring(liked.value ? 0 : 1)
//   }

//   // const handlePressCard = () => {
//   //   openLinkInBrowser(episode.enclosure.link)
//   // }

//   // const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
//   //   () =>
//   //     function ButtonLeftAccessory() {
//   //       return (
//   //         <View>
//   //           <Animated.View
//   //             style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
//   //           >
//   //             <Icon
//   //               icon="heart"
//   //               size={ICON_SIZE}
//   //               color={colors.palette.neutral800} // dark grey
//   //             />
//   //           </Animated.View>
//   //           <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
//   //             <Icon
//   //               icon="heart"
//   //               size={ICON_SIZE}
//   //               color={colors.palette.primary400} // pink
//   //             />
//   //           </Animated.View>
//   //         </View>
//   //       )
//   //     },
//   //   [],
//   // )

//   return (
//     <Card
//       style={$item}
//       verticalAlignment="force-footer-bottom"
//       // onPress={handlePressCard}
//       // onLongPress={handlePressFavorite}
//       HeadingComponent={<Text style={$nameText} text={post.author.name} />}
//       content={textFake}
//       contentStyle={{
//         padding: 8,
//         borderRadius: 6,
//       }}
//       //{...accessibilityHintProps}
//       LeftComponent={
//         <View style={$contentAvatar}>
//           <AutoImage
//             source={{ uri: imageFake }}
//             style={{ width: 50, height: 50, borderRadius: 50 }}
//           />
//         </View>
//       }
//       FooterComponent={
//         <View style={{ flexDirection: "row", gap: 10, alignSelf: "flex-end" }}>
//           <Icon icon="heart" size={ICON_SIZE} color={colors.palette.neutral800} />
//           <Text>[CM]</Text>
//         </View>
//       }
//     />
//   )
// }

const $screenContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: 15,
}

// const $item: ViewStyle = {
//   flex: 1,
//   // padding: spacing.md,
//   borderRadius: 0,
//   // marginTop: spacing.md,
//   minHeight: 150,
//   // padding: 0,
//   marginBottom: 30,

//   width,
//   height: height * 0.795,
// }

// const $contentAvatar: ViewStyle = {
//   // borderWidth: 1,
// }

// const $itemThumbnail: ImageStyle = {
//   // backgroundColor:'red'
//   //marginTop: spacing.sm,
//   // borderRadius: 50,
//   // alignSelf: "flex-start",
// }

// const $iconContainer: ViewStyle = {
//   // height: ICON_SIZE,
//   //width: ICON_SIZE,
//   // flexDirection: "row",
//   // marginEnd: spacing.sm,
// }

// const $nameText: ViewStyle = {
//   // left: -90,
// }

// const $metadata: TextStyle = {
//   color: colors.textDim,
//   //marginTop: spacing.xs,
//   // flexDirection: "row",
// }

// const $metadataText: TextStyle = {
//   // color: colors.textDim,
//   backgroundColor: "red",
//   // marginEnd: spacing.md,
//   //marginBottom: spacing.xs,
// }
