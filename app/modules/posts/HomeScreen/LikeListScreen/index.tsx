import { Screen, Text } from "app/components"
import { FlatList, View } from "react-native"
import useGetListLIke from "../graphql/GetListLike.query";

export const LikeListScreen = ({route}) => {
  const postId = route.params.postId

  const {data, error} = useGetListLIke({postId})

  
    return(
        <Screen 
        //style={$screenContainer} 
        preset="fixed">
        <FlatList
          data={data?.GetListLike}
          keyExtractor={(like) => like.id}
          renderItem={({ item: like }) => (
             <View>
              <Text>{like.author.name}</Text>
             </View>
          )}
        />
      </Screen>
    )
}