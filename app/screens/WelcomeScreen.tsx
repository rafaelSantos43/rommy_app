import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageBackground, ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import {Button,Text,} from "app/components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  //const { navigation } = _props
 /*
  /*function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
  }*/

 /* useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logout,
    },
    [logout],
  )*/
  // @demo remove-block-end

  

  return (
    <ImageBackground
    source={{ uri: "https://i.pinimg.com/originals/d0/8f/88/d08f886bd8c39663eb12ad00738e7236.jpg" }} // Cambia la URL por la de tu imagen
    style={styles.backgroundImage}
    resizeMode="cover" // Ajusta la imagen para cubrir todo el espacio sin distorsionarse
  >
    <View style={styles.overlay}>
      <Text style={styles.text}>Comparte tu aventura!</Text>
    <Button
     text="Sign In"
     style={styles.button}
     onPress={() => navigate("Login")}
    />
    </View>
  </ImageBackground>
  )
})

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end', 
    paddingBottom:20// Opcional: Centra el contenido verticalmente
     // Opcional: Centra el contenido horizontalmente
  },
  _overlay: {
    justifyContent: 'center', // Opcional: Centra el contenido verticalmente
    alignItems: 'center',
    gap:20
  },
  get overlay() {
    return this._overlay
  },
  set overlay(value) {
    this._overlay = value
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  button:{
    width:100
  }
});

