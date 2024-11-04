import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import { colors } from "app/theme"
import { ListPostScreen } from "./ListPostScreen"
import { LikeListScreen } from "./LikeListScreen"

export type HomeScreenNavigatorParamList = {
  ListPostScreen: { userSession: object }
  LikeListScreen: undefined
}

export type HomeScreenNavigatorProps<T extends keyof HomeScreenNavigatorParamList> =
  NativeStackScreenProps<HomeScreenNavigatorParamList, T>
const Stack = createNativeStackNavigator<HomeScreenNavigatorParamList>()

export const HomeScreenNavigator = ({ route }) => {
  const { userSession } = route.params
  // console.log(session?.name, "-----------------")

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: colors.background }}>
      <Stack.Screen
        name="ListPostScreen"
        component={ListPostScreen}
        initialParams={{ userSession }}
      />
      <Stack.Screen
        name="LikeListScreen"
        component={LikeListScreen}
        options={{
          headerShown:true,
          presentation:'fullScreenModal'
        }}
       // initialParams={{ userSession }}
      />
    </Stack.Navigator>
  )
}
