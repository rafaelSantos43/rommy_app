import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import * as Screens from "app/screens"
import { colors} from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import ImageValidateType from "app/components/ImageValidateType"
import { LoaderPinwheel, SquarePen } from "lucide-react-native"
import { navigate } from "./navigationUtilities"


export type TabParamList = {
  DemoCommunity: undefined
  HomeScreen: {userSession:object}
  Settings: {userSession:object}
  SearchFrinedScreen: undefined
  CreatePostFormScreen: {userSession:object}
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function TabNavigator({route}) {
  const { bottom } = useSafeAreaInsets()
  const {userSession} = route?.params  

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 55 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarItemStyle: $tabBarItem,
        tabBarLabelStyle: $tabBarLabel,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Screens.HomeScreen}
        initialParams={{userSession}}
        options={{
          title: "Roomy",
          headerTitleAlign: "center",
          headerShown: true,
          tabBarLabel: translate("demoNavigator.componentsTab"),
          headerLeft: () => (
            <View style={{ paddingHorizontal: 10 }}>
              <Icon icon="camera" color={colors.tint} size={30} />
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingHorizontal: 10 }}>
              <ImageValidateType width={30} height={30} radius={50} />
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="SearchFrinedScreen"
        component={Screens.SearchFrinedScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="search" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="CreatePostFormScreen"
        component={Screens.CreatePostFormScreen}
        initialParams={{userSession}}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <LoaderPinwheel size={50} color={focused ? colors.tint : "black"} onPress={() => navigate("CreatePostFormScreen")}/>
          ),
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={Screens.DemoCommunityScreen}
        options={{
          tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Screens.SettingScreen}
        initialParams={{userSession}}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="user" color={focused ? colors.tint : undefined} size={33} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {}

const $tabBarLabel: TextStyle = {
  fontSize: 0,
  display: "none",
}

// @demo remove-file
