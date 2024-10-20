import * as FileSystem from 'expo-file-system'

export const handleimageUpload = async (imageUrl: string) => {
  if (!imageUrl) throw new Error("no se propoerciono niniguna imagen")

  try {

    const fileUri = await FileSystem.getInfoAsync(imageUrl)
    if (!fileUri.exists) {
        throw new Error('Archivo no encontrado en la ruta proporcionada');
    }

    const formData = new FormData()
    const fileType =  imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg') ? "image/jpeg" : "image/png"
    const fileName = imageUrl.split(".").pop()
    
    formData.append("file", {
      uri: fileUri.uri,
      type: fileType,
      name: fileName,
    })

    formData.append("upload_preset", "crbrmu6m")

    console.log('form data', formData?._parts[0][1]);
    
    const response = await fetch("https://api.cloudinary.com/v1_1/ddvg2h3xe/image/upload", {
      method: "POST",
      body: formData,
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })

    if (!response.ok) {
      throw new Error(`Error al subir--- la imagen: ${response.statusText}`)
    }

    const data = await response.json()
    if (data.secure_url) {
      return data.secure_url
    } else {
      throw new Error("No se encontró la URL segura de la imagen")
    }
  } catch (error) {
    console.error("Error en handleImageUpload:", error.message)
    throw new Error(`Error al subir imagen: ${error?.message}`)
  }
}
