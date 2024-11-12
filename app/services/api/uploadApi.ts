import * as FileSystem from 'expo-file-system'

export const handleImageUpload = async (imageUrl: string) => {
  if (!imageUrl) throw new Error("No se proporcionó ninguna imagen");

  try {
    const fileUri = await FileSystem.getInfoAsync(imageUrl)
    if (!fileUri.exists) {
      throw new Error('Archivo no encontrado en la ruta proporcionada');
    }

    const fileType = imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg') ? 'image/jpeg' :
                     imageUrl.endsWith('.png') ? 'image/png' : null

    if (!fileType) {
      throw new Error('El tipo de archivo no es válido. Se aceptan imágenes JPG, JPEG, PNG.');
    }

    const fileName = imageUrl.split('/').pop()

    const formData = new FormData();
    formData.append("file", {
      uri: fileUri.uri,
      type: fileType,
      name: fileName,
    });

    formData.append("upload_preset", "crbrmu6m");

    const response = await fetch("https://api.cloudinary.com/v1_1/ddvg2h3xe/image/upload", {
      method: "POST",
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (!response.ok) {
      throw new Error(`Error al subir la imagen: ${response.statusText}`)
    }

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url
    } else {
      throw new Error("No se encontró la URL segura de la imagen");
    }
  } catch (error) {
    console.error("Error en handleImageUpload:", error.message);
    throw new Error(`Error al subir imagen: ${error?.message}`);
  }
}
