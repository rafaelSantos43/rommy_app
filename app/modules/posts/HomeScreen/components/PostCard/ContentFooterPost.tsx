import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { BookmarkPlus, MessageCircle, Share } from "lucide-react-native";
import { openModalVar } from "app/store/reactiveVars";
import { Icon, Text } from "app/components";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE } from "../../graphql/addLike_post.mutation";
import { navigate } from "app/navigators";
import { GET_LIST_LIKE } from "../../graphql/GetListLike.query";

const ContentFooterPost = ({ post, setPostIdList, userSession }:any) => {
  const { id, likeCount, commentCount } = post;
    
  const { data: likeList } = useQuery(GET_LIST_LIKE, {
    variables: { postId: id },
  })

  const userHasLiked = likeList?.GetListLike?.some(
    (likeUser) => likeUser.author.id === userSession._id
  )

  const [addLike] = useMutation(ADD_LIKE, {
    variables: {
      postId: id,
    },

    update(cache, { data: { addLike } }) {
      if (addLike) {
        const postCacheId = cache.identify({ __typename: "Post", id });
        const readListLikeInCache = cache.readQuery({
          query: GET_LIST_LIKE,
          variables: { postId: id },
        });
        const existingLikeIncache = readListLikeInCache?.GetListLike?.some(
          (likeUser) => likeUser.author.id === userSession._id
        )

        cache.modify({
          id: postCacheId,
          fields: {
            likeCount(existingLikes) {
              return existingLikeIncache ? Math.max(existingLikes - 1, 0) : existingLikes + 1;
            },
          },
        });

        const updatedLikes = existingLikeIncache
          ? readListLikeInCache?.GetListLike.filter(
              (likeUser) => likeUser.author.id !== userSession._id
            )
          : [
              ...readListLikeInCache?.GetListLike,
              {
                __typename: "Like",
                id: addLike.id || `temp-${Date.now()}`,
                author: {
                  __typename: "User",
                  id: userSession._id,
                  name: userSession.name,
                  avatar: userSession.avatar || "",
                },
                createdAt: "",
                updatedAt: "",
              },
            ];

        cache.writeQuery({
          query: GET_LIST_LIKE,
          variables: { postId: id },
          data: {
            GetListLike: updatedLikes,
          },
        });
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  });

  const handleAddLike = async () => {
    try {
      addLike();
    } catch (error) {
      console.error(`Error al dar like ${error}`);
    }
  };

  return (
    <View style={$container}>
      <TouchableOpacity onPress={handleAddLike} style={$contentLikes}>
        <Icon icon="heart" size={20} color={userHasLiked ? "red" : "black"} />
        <TouchableOpacity onPress={() => navigate("LikeListScreen", { postId: id })}>
          <Text>{likeCount} you other...</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          openModalVar(true);
          setPostIdList(post.id);
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
  );
};

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 5,
};

const $contentLikes: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 8,
  padding: 5,
};

const $contentComments: ViewStyle = {
  ...$contentLikes,
};

export default ContentFooterPost;
