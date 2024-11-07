import React, { useEffect } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { BookmarkPlus, MessageCircle, Share } from "lucide-react-native"
import { useApolloClient, useMutation } from "@apollo/client"
import { openModalVar } from "app/store/reactiveVars"

import { Icon, Text } from "app/components"
import { navigate } from "app/navigators"

import { ADD_LIKE } from "../../graphql/addLike_post.mutation"
import { GET_LIST_LIKE } from "../../graphql/GetListLike.query"

const ContentFooterPost = ({ post, setPostIdList, userSession }: any) => {
  const { id, likeCount, commentCount } = post
  const client = useApolloClient()

  useEffect(() => {
    if (userSession) {
      console.log('de ejecuro ');
      
      client.query({
        query: GET_LIST_LIKE,
        variables: { postId: id },
      }).then(response => {
        const updatedLikes = response?.data?.GetListLike || [];
        // Aquí puedes actualizar el cache manualmente si es necesario
        client.cache.writeQuery({
          query: GET_LIST_LIKE,
          variables: { postId: id },
          data: { GetListLike: updatedLikes },
        });
      }).catch(error => {
        console.error("Error al obtener likes del servidor:", error);
      });
    }
  }, [userSession, id]);


  const [addLike] = useMutation(ADD_LIKE, {
    variables: { postId: id },
    refetchQueries: [
      {
        query: GET_LIST_LIKE,
        variables: { postId: id },
      },
    ],
    update(cache, { data: { addLike } }) {
      if (!addLike) return

      const postCacheId = cache.identify({ __typename: "Post", id })

      const dataInCache = cache.readQuery({
        query: GET_LIST_LIKE,
        variables: { postId: id },
      })

      const userHasLiked = dataInCache?.GetListLike.some(
        (likeUser: any) => likeUser.author.id === userSession._id,
      )

      if (userHasLiked) {
        const newList = dataInCache?.GetListLike.filter(
          (like: any) => like.author.id !== userSession._id,
        )
        cache.writeQuery({
          query: GET_LIST_LIKE,
          variables: { postId: id },
          data: {
            GetListLike: newList || [],
          },
        })

        cache.modify({
          id: postCacheId,
          fields: {
            likeCount(existingLikes = 0) {
              return Math.max(existingLikes - 1, 0)
            },
          },
        })
      } else {
        const existingLikes = dataInCache?.GetListLike || []
        const updatedLikes = [
          ...existingLikes,
          {
            __typename: "Like",
            id: addLike?.author?.id || `temp-${Date.now()}`,
            author: {
              __typename: "User",
              id: userSession._id,
              name: userSession.name,
              avatar: userSession.avatar || "",
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]

        cache.writeQuery({
          query: GET_LIST_LIKE,
          variables: { postId: id },
          data: { GetListLike: updatedLikes || [] },
        })

        cache.modify({
          id: postCacheId,
          fields: {
            likeCount(existingLikes = 0) {
              return existingLikes + 1
            },
          },
        })
      }
    },
    optimisticResponse: {
      __typename: "Mutation",
      addLike: {
        __typename: "Like",
        id: `temp-${Date.now()}`,
        author: {
          __typename: "User",
          id: userSession._id,
          name: userSession.name,
          avatar: userSession.avatar || "",
        },
      },
    },
  })

  const handleAddLike = async () => {
    try {
      console.log("se dio like")

      await addLike()
    } catch (error) {
      console.error(`Error al dar like ${error}`)
    }
  }

  return (
    <View style={$container}>
      <TouchableOpacity onPress={handleAddLike} style={$contentLikes}>
        <Icon icon="heart" size={20} color={"black"} />
        <Text>{!likeCount ? "" : likeCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ right: 20 }}
        onPress={() => navigate("LikeListScreen", { postId: id })}
      >
        <Text>{"you"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          openModalVar(true)
          setPostIdList(post.id)
        }}
        style={$contentComments}
      >
        <MessageCircle size={20} color="black" />
        {commentCount ? <Text>{commentCount}</Text> : ""}
      </TouchableOpacity>
      <View>
        <Share size={20} color="black" />
      </View>
      <View>
        <BookmarkPlus size={20} color="black" />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 5,
}

const $contentLikes: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 8,
  padding: 5,
}

const $contentComments: ViewStyle = {
  ...$contentLikes,
}

export default ContentFooterPost
