import React, { FC } from "react"
import * as Application from "expo-application"
import { Platform, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Drawer } from "react-native-drawer-layout"

import { useStore } from "app/store/useStore"
import { TabScreenProps } from "app/navigators/TabNavigator"
import { Button, ListItem, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { isRTL } from "app/i18n"
import { DrawerIconButton } from "app/screens/DemoShowroomScreen/DrawerIconButton"
import { X } from "lucide-react-native"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */

export const SettingScreen: FC<TabScreenProps<"Settings">> = (_props) => {
  const { setRemoveSession } = useStore()
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="front"
      drawerPosition="right"
      drawerStyle={{right:0}}
      renderDrawerContent={() => {
        return (
          <TouchableOpacity onPress={() => setOpen(false)} style={ {top:30}}>
            <X size={30} color='black' style={{alignSelf:'flex-end', right:10}} />
          </TouchableOpacity>
        )
      }}
    >
      <View style={ {top:25, backgroundColor: colors.background }}>
          <View style={{ alignSelf:'flex-end'}}>
            <DrawerIconButton onPress={() => setOpen((prevOpen) => !prevOpen)}/>
          </View>
      </View>
    </Drawer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  buttons: {
    gap: 8,
  },
})
const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
}

// @demo remove-file
