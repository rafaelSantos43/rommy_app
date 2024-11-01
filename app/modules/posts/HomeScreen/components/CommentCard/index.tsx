import { Card, Text } from "app/components"
import { View } from "react-native"
import ContentFooter from "../PostCard/ContentFooterPost"
import { Trash2 } from "lucide-react-native"
import {formatDistanceToNow} from 'date-fns'
import ContentFooterComment from "./ContentFooterComment"

const CommentCard = ({comment}:any) => {
  const createdAt = Number(comment?.createdAt)
  const created = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  
  return (
    <Card
      style={{borderWidth:0, borderRadius:0,}}
      LeftComponent={
      <View style = {{
        width: 40,
        height:40,
        borderWidth:1,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
        }}>
        <Text>AV</Text>
      </View>
      }
      HeadingComponent={
        <View>
          <Text style={{fontWeight:'bold'}}>Dahiana</Text>
          <Text style={{fontSize:11, color:'gray', top:-8}}>{created}</Text>
        </View>
      }

      RightComponent={
        <View>
          <Trash2 size={25} color={'black'}/>
        </View>
      }
     ContentComponent={
      <View style={{backgroundColor:'#F6F4F4', paddingHorizontal:5, borderRadius:5}}>
        <Text style={{color:'#736F6F'}}>{comment.content}</Text>
      </View>
     }
      
      FooterComponent={<ContentFooterComment/>}
    />
  )
}

export default CommentCard