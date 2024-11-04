import React, { FC, ReactElement } from "react"
import { Dimensions, View, ViewStyle } from "react-native"

import { Screen, Text } from "../../components"
import { isRTL, translate } from "../../i18n"

import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"

const ICON_SIZE = 30
const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width
console.log(height, "------")


export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

export const ProfilePersonScreen: FC<TabScreenProps<"ProfilePersonScreen">> = ({ route }) => {
  const { _id: userId } = route.params.userSession

  return (
    <>
      <Screen style={$screenContainer} preset="fixed">
        <View>
            <Text>
                Profile peoples
            </Text>
        </View>
      </Screen>
    </>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: 15,
}



