import React, { useEffect, useRef, useState } from "react"
import { useReactiveVar } from "@apollo/client"
import useComments, { COMMENTS } from "app/models/graphql/querys/comment/comments"
import { openModalVar, postIdVar } from "app/store/reactiveVars"
import { SendHorizontal, X } from "lucide-react-native"
import { StyleSheet, Pressable, View, FlatList } from "react-native"
import CommentCard from "./CommentCard"
import { Text, TextField } from "app/components"
import useCreateComments from "app/models/graphql/mutations/create_commets"

const CommentContentModal = ({ userId }) => {
  const [ getComments,{ data, loading, error }] = useComments()
  const [content, setContent] = useState("")


  
  const [createComment] = useCreateComments()
  const modalVisible = useReactiveVar(openModalVar)
  const postId = useReactiveVar(postIdVar)
  const flatListRef = useRef(null)
  const ITEM_HEIGHT = 100;


  useEffect(() => {
    if (modalVisible) {
      getComments({
          variables: {
            postId,
          },
      })
    }
  }, [modalVisible, postId, getComments])

  const handleCreateComments = async () => {
    try {
      await createComment({
        variables: {
          input: {
            postId,
            content,
            authorId: userId,
          },
        },
        update(cache, { data: { CreateComment } }) {
          if (CreateComment) {
            const existingComments = cache.readQuery({
              query: COMMENTS,
              variables: {
                postId,
              },
            })

            if (!existingComments) {
              console.error("No se encontraron publicaciones existentes en la caché")
              return <Text>Error al cargar comentarios</Text>;
            }

            const newComment = {
              __typename: "Comment",
              id: CreateComment.id,
              content: CreateComment.content,
              postId,
              author: {
                __typename: "User",
                id: userId,
                name: "",
                avatar: "",
              },
              createdAt: CreateComment.createdAt,
              updatedAt: CreateComment.updatedAt,
            }

            cache.writeQuery({
              query: COMMENTS,
              variables: { postId },
              data: {
                GetComments: [...existingComments?.GetComments, newComment],
              },
            })
          }
        },

        optimisticResponse: {
          __typename: "Mutation",
          CreateComment: {
            __typename: "Comment",
            id: Math.random().toString(),
            content,
            postId,
            author: {
              __typename: "User",
              id: userId,
              name: "",
              avatar: "", 
            },
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        },
      })
      setContent("")
      flatListRef.current?.scrollToEnd({ animated: true })
    } catch (error) {
      console.error("Error al crear el comnetario!", error.message)
    }
  }

  return (
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.modalView}>
          <Pressable style={styles.buttonClose} onPress={() => openModalVar(!modalVisible)}>
            <X size={18} color={"white"} />
          </Pressable>
          <FlatList
            ref={flatListRef}
            style={{ width: "100%", top: 10, marginBottom: 60 }}
            data={data?.GetComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item: comment }) => <CommentCard comment={comment} />}
            getItemLayout={(data, index) =>(
              {length:ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            initialNumToRender={5}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "white",
          }}
        >
          <View style={{ width: "89.5%", padding: 6 }}>
            <TextField
             onChangeText={(text) => setContent(text)}
             placeholder="escribe algo aqui..." 
             value={content}
            />
          </View>
          <Pressable onPress={handleCreateComments}>
            <SendHorizontal size={35} color={"black"} />
          </Pressable>
        </View>
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
