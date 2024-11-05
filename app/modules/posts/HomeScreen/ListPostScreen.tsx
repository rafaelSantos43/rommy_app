import React, { FC, ReactElement, useState } from "react"
import { FlatList, ViewStyle } from "react-native"

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

// import { colors } from "../../../theme"

import CommonModal from "app/components/CommonModal"
import { useQuery } from "@apollo/client"
import { POSTS } from "./graphql/posts.query"
import PostCard from "./components/PostCard"
import { Screen } from "app/components"
import CommentContentModal from "./components/CommentContentModal"
import { HomeScreenNavigatorProps } from "./HomeScreenNavigator"

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

export const ListPostScreen: FC<HomeScreenNavigatorProps<"ListPostScreen">> = ({ route })  => {
  //  const [refreshing, setRefreshing] = React.useState(false)
  const { userSession} = route.params
  const [postIdList, setPostIdList] = useState("")

console.log('poer qq--------------',postIdList);

  // const [isLoading, setIsLoading] = React.useState(false)
  const { data } = useQuery(POSTS)
  return (
    <>
      <Screen style={$screenContainer} preset="fixed">
        <FlatList
          data={data?.GetPosts}
          keyExtractor={(post) => post.id}
          renderItem={({ item: post }) => (
            <PostCard post={post} userSession={userSession}  setPostIdList={setPostIdList}/>
          )}
        />
      </Screen>
      <CommonModal>
        <CommentContentModal user={userSession} postId={postIdList} />
      </CommonModal>
    </>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: 15,
}


