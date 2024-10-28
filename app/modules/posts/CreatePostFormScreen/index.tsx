import React, { FC, useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ImageUp } from "lucide-react-native"

import { spacing } from "app/theme"
import { navigate } from "app/navigators"

import { CREATE_POST } from "app/modules/posts/CreatePostFormScreen/graphql/create_Post.mutation"
import { POSTS } from "app/modules/posts/HomeScreen/graphql/posts.query"

import { getLibraryPermision, launchImageLibrary } from "app/utils/getPermisionFile"
import { handleimageUpload } from "app/services/api/uploadApi"
import { TabScreenProps } from "app/navigators/TabNavigator"
import { Button, Screen, Text, TextField } from "app/components"
import { Post } from "./interface/Post"

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

  const buildNewPost = (CreatePost: Post) => ({
    __typename: "Post",
    id: CreatePost.id,
    title: CreatePost.title,
    content: CreatePost.content,
    imageUrl: CreatePost.imageUrl || "",
    commentCount: 0,
    createdAt: CreatePost.createdAt,
    updatedAt: CreatePost.updatedAt,
    author: {
      __typename: "User",
      id: userId,
      name: name,
      avatar: "",
    },
    likes: [],
    likeCount: 0,
    comments: [],
  })

  const updateCache = (cache: any, CreatePost: Post) => {
    try {
      const existingPosts = cache.readQuery({ query: POSTS })

      if (!existingPosts) {
        console.error("No se encontraron publicaciones existentes en la caché")
        return
      }
      const newPost = buildNewPost(CreatePost)

      cache.writeQuery({
        query: POSTS,
        data: {
          GetPosts: [
            newPost,
            ...existingPosts?.GetPosts].sort(
              (a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            ),
        },
      })
    } catch (error) {
      throw new Error(`Error al escribir el post en el cache: ${error}`)
    }
  }

  const handleCreatePost = async () => {
    let image = ""
    //setIsLoading(true)
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
            commentCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: {
              __typename: "User",
              id: userId,
              name: name,
              avatar: "",
            },
            likes: [],
            likeCount: 0,
            comments: [],
          },
        },

        update(cache, { data: { CreatePost } }) {
          if (CreatePost) {

            updateCache(cache,CreatePost)
            //setIsLoading(false)
            setContentTitle("")
            setContentDescription("")
            setSelectedImage("")
            navigate("HomeScreen")
          }
        },
      })
    } catch (error) {
      console.error("Error al crear el post!", error)
      //setIsLoading(false)
    }
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
          //labelTx="loginScreen.passwordFieldLabel"
          //placeholderTx="loginScreen.passwordFieldPlaceholder"
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
          //placeholderTx="loginScreen.emailFieldPlaceholder"
          placeholder="escribe algo aqui..."
        />
      </View>

      <View style={$containerButton}>
        <TouchableOpacity
          onPress={async () => {
            setIspermision(true)
            const image = await launchImageLibrary()
            setSelectedImage(image)
          }}
        >
          <ImageUp size={50} color={"black"} />
        </TouchableOpacity>
        <Button text="Create" onPress={handleCreatePost} />
        <Button text="Cancel" style={$buttonCancel} />
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

const $containerButton: ViewStyle = {}

const $buttonCreate: ViewStyle = {
  marginBottom: 20,
}

const $buttonCancel: ViewStyle = {}
