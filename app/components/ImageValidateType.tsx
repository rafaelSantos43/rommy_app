import { AutoImage } from "./AutoImage"

const ImageValidateType = ({image, width = 50, height = 50, radius=0, objectFit = 'cover'}:any) => {
 // console.log(image,'xxxxxxx');
  
  const imageFake = "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
  return <AutoImage source={{uri:image ?? imageFake }} style={{width , height, borderRadius:radius, objectFit}}/>  
}

export default ImageValidateType 