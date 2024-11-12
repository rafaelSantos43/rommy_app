import React, { useRef } from "react"
import { useQuery, useReactiveVar } from "@apollo/client"
import { COMMENTS } from "app/modules/posts/HomeScreen/components/Comments/graphql/comments.query"
import { openModalVar } from "app/store/reactiveVars"
import {  X } from "lucide-react-native"
import { StyleSheet, Pressable, View, FlatList } from "react-native"

import CommentCard from "../CommentCard"
import FieldCreateComment from "./FieldCreateComment"

const CommentContentModal = ({ user, postId, userSession }: any) => {
  
  const { data } = useQuery(COMMENTS, {
    variables: {
      postId,
    },
  })

  const modalVisible = useReactiveVar(openModalVar)
  const flatListRef = useRef(null)
  const ITEM_HEIGHT = 100

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <View style={styles.modalView}>
        <Pressable style={styles.buttonClose} onPress={() => openModalVar(!modalVisible)}>
          <X size={18} color={"white"} />
        </Pressable>
        <FlatList
          ref={flatListRef}
          style={{ width: "100%", top: 10, marginBottom: 60 }}
          data={data?.GetComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item: comment }) => <CommentCard comment={comment} postId={postId} userSession={userSession}/>}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialNumToRender={5}
        />
      </View>
      <FieldCreateComment postId={postId} user={user} flatListRef={flatListRef}/>
    </View>
  )
}

export default CommentContentModal

const styles = StyleSheet.create({
  modalView: {
    height: "70%",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  buttonClose: {
    right: 5,
    top: 5,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-end",
  },
})
