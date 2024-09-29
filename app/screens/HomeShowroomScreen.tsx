import { type ContentStyle } from "@shopify/flash-list"

import React, { ComponentType, FC, useEffect, useMemo, ReactElement } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import {
  Button,
  ButtonAccessoryProps,
  Card,
  EmptyState,
  Icon,
  ListView,
  Screen,
  Text,
  TextField,
  Toggle,
} from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { TabScreenProps } from "../navigators/TabNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"

const ICON_SIZE = 30

const rnrImage1 = require("../../assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("../../assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("../../assets/images/demo/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

const width = Dimensions.get("screen").width

import { useStore } from "app/store/useStore"
import usePosts from "app/models/graphql/querys/posts"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

export const HomeShowroomScreen: FC<TabScreenProps<"HomeShowroomScreen">> =
  function HomeShowroomScreen(_props) {
    const { setRemoveSession } = useStore()
    const [refreshing, setRefreshing] = React.useState(false)
    //const [isLoading, setIsLoading] = React.useState(false)
    const { data } = usePosts()
   
    return (
      <Screen style={$screenContainer} preset="fixed">
        <FlatList
          data={data?.GetPosts}
          keyExtractor={(post) => post.id}
          renderItem={({ item: post }) => (
            <>
              <Card
                style={$item}
                verticalAlignment="force-footer-bottom"
                content={post.title}
                //{...accessibilityHintProps}
                LeftComponent={
                  <View style={$contentAvatar}>
                    <Text style={$nameText} text={post.author.name} />
                    <Text style={{color:'black'}} text={post.content} />
                  </View>
                }
                FooterComponent={
                  <View>
                    <View>
                      <Icon
                        icon="heart"
                        size={ICON_SIZE}
                        color={colors.palette.neutral800} // dark grey
                      />
                    </View>
                  </View>
                }
              />
            </>
          )}
        />
      </Screen>
    )
  }

const PostCard = function PostCard({
  post,
  isFavorite,
  onPressFavorite,
}: {
  post: any
  onPressFavorite: () => void
  isFavorite: boolean
}) {
  const liked = useSharedValue(isFavorite ? 1 : 0)

  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  // Grey heart
  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
        },
      ],
      opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    }
  })

  // Pink heart
  const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    }
  })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        // ios: {
        //   accessibilityLabel: episode?.title,
        //   accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
        //     action: isFavorite ? "unfavorite" : "favorite",
        //   }),
        // },
        android: {
          accessibilityLabel: post.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressFavorite()
            }
          },
        },
      }),
    [post, isFavorite],
  )

  const handlePressFavorite = () => {
    onPressFavorite()
    liked.value = withSpring(liked.value ? 0 : 1)
  }

  // const handlePressCard = () => {
  //   openLinkInBrowser(episode.enclosure.link)
  // }

  const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
            <Animated.View
              style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
            >
              <Icon
                icon="heart"
                size={ICON_SIZE}
                color={colors.palette.neutral800} // dark grey
              />
            </Animated.View>
            <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
              <Icon
                icon="heart"
                size={ICON_SIZE}
                color={colors.palette.primary400} // pink
              />
            </Animated.View>
          </View>
        )
      },
    [],
  )

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      //onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      // HeadingComponent={
      //   <View style={$metadata}>
      //     <Text
      //       //style={$metadataText}
      //       size="xxs"
      //       accessibilityLabel={post.description}
      //     >
      //       {/* {episode.datePublished.textLabel} */}
      //     </Text>
      //     <Text
      //       style={$metadataText}
      //       size="xxs"
      //       // accessibilityLabel={episode.duration.accessibilityLabel}
      //     >
      //       {/* {episode.duration.textLabel} */}
      //     </Text>
      //   </View>
      // }
      content={post.title}
      //{...accessibilityHintProps}
      LeftComponent={
        <View style={$contentAvatar}>
          <Image source={imageUri} style={$itemThumbnail} />
          <Text style={$nameText} text={post.author.name} />
          <Text text={post.description} />
        </View>
      }
      FooterComponent={
        <View>
          <View>
            <Icon
              icon="heart"
              size={ICON_SIZE}
              color={colors.palette.neutral800} // dark grey
            />
          </View>
        </View>
      }
    />
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $item: ViewStyle = {
  flex:1,
  //padding: spacing.md,
  borderRadius: 0,
  //marginTop: spacing.md,
  minHeight: 150,
  padding: 0,
  marginVertical: 10,
  // height: 500,
  width: width,
}

const $contentAvatar: ViewStyle = {
  flexDirection: "row",
  borderWidth: 1,
  height: 55,
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}

const $itemThumbnail: ImageStyle = {
  //marginTop: spacing.sm,
  // borderRadius: 50,
  // alignSelf: "flex-start",
}

const $iconContainer: ViewStyle = {
  // height: ICON_SIZE,
  //width: ICON_SIZE,
  // flexDirection: "row",
  // marginEnd: spacing.sm,
}

const $nameText: ViewStyle = {
  left: -90,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  //marginTop: spacing.xs,
  // flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  // marginEnd: spacing.md,
  //marginBottom: spacing.xs,
}
