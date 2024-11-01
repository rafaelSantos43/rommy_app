import React, { FC, useEffect, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ImageUp } from "lucide-react-native"

import { spacing } from "app/theme"
import { navigate } from "app/navigators"
import { CREATE_POST } from "app/modules/posts/CreatePostFormScreen/graphql/create_Post.mutation"
import { getLibraryPermision, launchImageLibrary } from "app/utils/getPermisionFile"
import { handleimageUpload } from "app/services/api/uploadApi"
import { TabScreenProps } from "app/navigators/TabNavigator"
import { Button, Screen, Text, TextField } from "app/components"
import { Post } from "./interface/Post"
import { FRAGMENT_POST } from "../HomeScreen/graphql/posts.query"
import ImageValidateType from "app/components/ImageValidateType"

interface CreatePostFormScreenProps extends TabScreenProps<"CreatePostFormScreen"> {}

export const CreatePostFormScreen: FC<CreatePostFormScreenProps> = ({ route }) => {
  const { _id: userId, name } = route.params.userSession

  const [createPost] = useMutation(CREATE_POST)

  const idFake = Math.random().toString(36).substr(2, 9)

  const [contentTitle, setContentTitle] = useState("")
  const [contentDescription, setContentDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [ispermision, setIspermision] = useState(false)

  useEffect(() => {
    if (ispermision) {
      getLibraryPermision() // Solicitar permisos al iniciar
    }
  }, [ispermision])
  // const isButtonDisabled = !contentTitle || !contentDescription || isLoading

  const updateCache = (cache: any, CreatePost: Post) => {
    try {
      const newPost = {
        __typename: "Post",
        id: CreatePost.id,
        title: CreatePost.title,
        content: CreatePost.content,
        imageUrl: CreatePost.imageUrl || "",
        createdAt: CreatePost.createdAt,
        updatedAt: CreatePost.updatedAt,
        author: {
          __typename: "User",
          id: userId,
          name,
          avatar: "",
        },
        commentCount:0,
        likeCount: 0,
      }
   
      cache.modify({
        fields:{
          GetPosts( existingPosts = []){
            const newPostRef = cache.writeFragment({
              data: newPost,
              fragment: FRAGMENT_POST
            })
            return [newPostRef, ...existingPosts].sort(
              (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            )
          }
        }
      })
    } catch (error) {
      throw new Error(`Error al escribir el post en el cache: ${error}`)
    }
  }

  const handleCreatePost = async () => {
    let image = ""
    // setIsLoading(true)
    try {
      if (selectedImage) image = await handleimageUpload(selectedImage)

      await createPost({
        variables: {
          filter: {
            title: contentTitle,
            content: contentDescription,
            imageUrl: image || "",
          },
        },

        optimisticResponse: {
          CreatePost: {
            __typename: "Post",
            id: idFake,
            title: contentTitle,
            content: contentDescription,
            imageUrl: image || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: {
              __typename: "User",
              id: userId,
              name,
              avatar: "",
            },
            commentCount:0,
            likeCount: 0,
            
          },
        },

        update(cache, { data: { CreatePost } }) {
          if (CreatePost) {
            updateCache(cache, CreatePost)
            
          }
        },
      })
      setContentTitle("")
      setContentDescription("")
      setSelectedImage("")
      navigate("HomeScreen")
    } catch (error) {
      console.error("Error al crear el post!", error)
      // setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setSelectedImage("")
    setContentTitle("")
    setContentDescription("")
  }
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" text="Create Post" />
      <View style={$containerTextField}>
        <TextField
          value={contentTitle}
          onChangeText={(title) => setContentTitle(title)}
          containerStyle={$textFieldTitle}
          autoCapitalize="none"
          label="Tilte"
          autoCorrect={false}
          placeholder="escribe un titulo."
          // status={isLoading ? "error" : undefined}
          // labelTx="loginScreen.passwordFieldLabel"
          // placeholderTx="loginScreen.passwordFieldPlaceholder"
        />

        <TextField
          multiline
          value={contentDescription}
          onChangeText={(content) => setContentDescription(content)}
          containerStyle={$textArea}
          autoCapitalize="none"
          autoCorrect={false}
          label="Description"
          // labelTx="loginScreen.emailFieldLabel"
          // placeholderTx="loginScreen.emailFieldPlaceholder"
          placeholder="escribe algo aqui..."
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={async () => {
            setIspermision(true)
            const image = await launchImageLibrary()
            setSelectedImage(image)
          }}
        >
          <ImageUp size={50} color={"black"} />
        </TouchableOpacity>
        {selectedImage && (
          <View style={$imageSelected}>
            <ImageValidateType image={selectedImage} width={"100%"} height={200} />
          </View>
        )}
        <View style={$containerButton}>
          <Button text="Create" onPress={handleCreatePost} />
          <Button text="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  // paddingTop: spacing.lg + spacing.xl,
  // paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

const $containerTextField: ViewStyle = {}

const $textFieldTitle: ViewStyle = {
  marginBottom: 20,
}

const $textArea: ViewStyle = {
  marginBottom: 30,
}

const $containerButton: ViewStyle = {
  height:130,
  marginVertical:20,
  justifyContent:'space-around'
}

const $imageSelected: ViewStyle = {
  width: "100%",
  marginVertical: 10,
}
