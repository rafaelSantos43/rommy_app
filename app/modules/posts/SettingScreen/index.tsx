import React, { FC } from "react"
import * as Application from "expo-application"
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import { Drawer } from "react-native-drawer-layout"

import { useStore } from "app/store/useStore"
import { TabScreenProps } from "app/navigators/TabNavigator"
import { Button, ListItem, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { isRTL } from "app/i18n"
import { DrawerIconButton } from "app/screens/DemoShowroomScreen/DrawerIconButton"
import { X } from "lucide-react-native"
import ImageValidateType from "app/components/ImageValidateType"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */

export const SettingScreen: FC<TabScreenProps<"Settings">> = ({ route }) => {
  const { setRemoveSession } = useStore()
  const { userSession } = route.params
  const [open, setOpen] = React.useState(false)
  const imageFake =
    "https://images.unsplash.com/photo-1427694012323-fb5e8b0c165b?q=80&w=889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="front"
      drawerPosition="right"
      drawerStyle={{ right: 0 }}
      renderDrawerContent={() => {
        return (
          <TouchableOpacity onPress={() => setOpen(false)} style={{ top: 30 }}>
            <X size={30} color="black" style={{ alignSelf: "flex-end", right: 10 }} />
            <Button text="salir" onPress={setRemoveSession} />
          </TouchableOpacity>
        )
      }}
    >
      <View style={{ top: 25, backgroundColor: colors.background }}>
        <View>
          <ImageBackground src={imageFake} style={{ width: "100%", height: 200 }}>
            <View style={{ alignSelf: "flex-end" }}>
              <DrawerIconButton onPress={() => setOpen((prevOpen) => !prevOpen)} />
            </View>
            <View
              style={{
                alignSelf: "center",
                top: 110,
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 50,
              }}
            >
              <ImageValidateType image={userSession?.avatar} width={70} height={70} radius={50} />
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 7,
          }}
        >
          <Text>fallow</Text>
          <Text>fallowing</Text>
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 10, flexDirection: "row" }}
        >
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "gray" }}>
            {userSession.name}
          </Text>
          <View
            style={{
              width: 8,
              height: 8,
              marginLeft: 4,
              backgroundColor: "green",
              borderRadius: 50,
            }}
          ></View>
        </View>
      </View>
    </Drawer>
  )
}
