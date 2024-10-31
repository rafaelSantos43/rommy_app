import React from "react"
import { Button, Screen, Text, TextField } from "app/components"
import { spacing } from "app/theme"
import { TextStyle, ViewStyle } from "react-native"

export const UserRegisterScreen = () => {
  

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.logIn" preset="heading" style={$logIn} />
      {/* <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} /> */}

      <TextField
        value={""}
        onChangeText={(content) => {}}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        //labelTx="loginScreen.emailFieldLabel"
        //placeholderTx="loginScreen.emailFieldPlaceholder"
        placeholder="name"
        // helper={error}
        //status={error ? "error" : undefined}
        // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        // ref={authPasswordInput}
        value={""}
        onChangeText={(content) => {}}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder="last Name"
        //labelTx="loginScreen.passwordFieldLabel"
        // placeholderTx="loginScreen.passwordFieldPlaceholder"
        //RightAccessory={PasswordRightAccessory}
      />

      <TextField
        // ref={authPasswordInput}
        value={""}
        onChangeText={(content) => {}}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder="email"
        // labelTx="loginScreen.passwordFieldLabel"
        // placeholderTx="loginScreen.passwordFieldPlaceholder"
        //RightAccessory={PasswordRightAccessory}
      />
      <TextField
        // ref={authPasswordInput}
        value={""}
        onChangeText={(content) => {}}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder="password"
        // labelTx="loginScreen.passwordFieldLabel"
        // placeholderTx="loginScreen.passwordFieldPlaceholder"
        //RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToLogIn"
        style={$tapButton}
        preset="reversed"
        // onPress={login}
      />
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $logIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  // color: color.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
