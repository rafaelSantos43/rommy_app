import { Dimensions, View, ViewStyle } from "react-native"
import ImageValidateType from "../../../../components/ImageValidateType"
import { Text } from "../../../../components/Text"
import {EllipsisVertical} from 'lucide-react-native'

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

const ContentForImage = (props: any) => {
  const {image} = props
  return (
      <View style={$contentCenter}>
        <ImageValidateType image={image} width={'100%'} height={'100%'} radius={20}/>
      </View>
  )
}

export default ContentForImage

const $contentCenter: ViewStyle = {
  
  borderColor:'gray',
  borderRadius:20,
  marginVertical:10,
  height:200,
}