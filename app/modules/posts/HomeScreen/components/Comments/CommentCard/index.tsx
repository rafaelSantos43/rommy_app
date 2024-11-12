import React from "react"
import { Card, Text } from "app/components"
import { TouchableOpacity, View } from "react-native"

import { Trash2 } from "lucide-react-native"
import {formatDistanceToNow} from 'date-fns'
import ContentFooterComment from "./ContentFooterComment"
import ImageValidateType from "app/components/ImageValidateType"
import useDeleteComment from "../CommentList/hooks/useDeleteComment"

const CommentCard = ({comment, postId, userSession}:any) => {
  const avatar = comment?.author?.avatar
  const name = comment?.author.name
  const content = comment.content
  const {handleDeleteComment} = useDeleteComment({commentId: comment.id, postId})
  //const createdAt = Number(comment?.createdAt)
  //const created = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <Card
      style={{borderWidth:0, borderRadius:0, elevation:2}}
      LeftComponent={
      <View>
        <ImageValidateType image={avatar} width={40} height={40} radius={50}/>
      </View>
      }
      HeadingComponent={
        <View>
          <Text style={{fontWeight:'bold'}}>{name ? name : 'Author Desconocido'}</Text>
          {/* <Text style={{fontSize:11, color:'gray', top:-8}}>{created}</Text> */}
        </View>
      }

      RightComponent={
        <TouchableOpacity onPress={handleDeleteComment}>
          <Trash2 size={25} color={'black'}/>
        </TouchableOpacity>
      }
     ContentComponent={
      <View style={{backgroundColor:'#F6F4F4', paddingHorizontal:5, borderRadius:5}}>
        <Text style={{color:'#736F6F'}}>{content}</Text>
      </View>
     }
      
      FooterComponent={<ContentFooterComment comment={comment} userSession={userSession}/>}
    />
  )
}

export default CommentCard