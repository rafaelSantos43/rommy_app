import React from "react"
import { Card, Text } from "app/components"
import { View } from "react-native"

import { Trash2 } from "lucide-react-native"
import {formatDistanceToNow} from 'date-fns'
import ContentFooterComment from "./ContentFooterComment"
import ImageValidateType from "app/components/ImageValidateType"

const CommentCard = ({comment}:any) => {
  console.log(comment,'hallloq');
  
  //const createdAt = Number(comment?.createdAt)
  //const created = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <Card
      style={{borderWidth:0, borderRadius:0,}}
      LeftComponent={
      <View>
        <ImageValidateType image={comment.author.avatar} width={40} height={40} radius={50}/>
      </View>
      }
      HeadingComponent={
        <View>
          <Text style={{fontWeight:'bold'}}>{comment.author?.name ? comment.author.name : 'Author Desconocido'}</Text>
          {/* <Text style={{fontSize:11, color:'gray', top:-8}}>{created}</Text> */}
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