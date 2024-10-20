import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export const getLibraryPermision  = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitas habilitar permisos para acceder a las imágenes.')
    }
}

export const launchImageLibrary =  async () => {
  
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing:true,
    aspect:[4, 3],
    quality: 1,
  })

  if(!result.canceled){
    const { uri } = result.assets[0]
    return uri
  }
  return Alert.alert("error al selecionar la imagen!")
}