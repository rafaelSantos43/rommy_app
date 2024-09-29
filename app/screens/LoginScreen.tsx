import React, { FC, useEffect, useRef } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useReactiveVar } from "@apollo/client"
import { emailVar, passwordVar } from "app/store/reactiveVars"
import useLogin from "app/models/graphql/mutations/login"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = function LoginScreen(_props) {
  //const authPasswordInput = useRef<TextInput>(null)

  const email = useReactiveVar(emailVar)
  const password = useReactiveVar(passwordVar)
  const [setLogin] = useLogin()
 
  function login() {
    try {
      setLogin()
    } catch (error) {
      console.error("UPSSSS Error", error)
    }
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.logIn" preset="heading" style={$logIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />

      <TextField
        value={email}
        onChangeText={(content) => emailVar(content)}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        // helper={error}
        //status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
       // ref={authPasswordInput}
        value={password}
        onChangeText={(content) => passwordVar(content)}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        //RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToLogIn"
        style={$tapButton}
        preset="reversed"
        onPress={login}
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
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

