import React from "react"
import { Card, Icon, Screen, Text } from "app/components"
import { FlatList, View, ViewStyle } from "react-native"
import { GET_LIST_LIKE } from "../graphql/GetListLike.query"
import ImageValidateType from "app/components/ImageValidateType"
import { SquarePlus } from "lucide-react-native"
import { useQuery } from "@apollo/client"

export const LikeListScreen = ({ route }) => {
  const {postId} = route.params

  const { data } = useQuery(GET_LIST_LIKE, {
    variables:{
      postId
    },
  })

  return (
    <Screen
      style={$screenContainer}
      preset="fixed"
    >
      <FlatList
        data={data?.GetListLike}
        keyExtractor={(like) => like.id}
        renderItem={({ item: like }) => (
          <Card
            style={$styleCardList}
            LeftComponent={
              <View style={$leftComponent}>
                <Icon icon="heart" size={20} color="red" />
              </View>
            }
           
            ContentComponent={
              <View style={$contentComponent}>
                <ImageValidateType  image={like?.author?.avatar} width={50} heigth={50} radius={50}/>
                <View>
                  <Text style={{fontWeight:'bold'}}>{like.author.name}</Text>
                  <Text style={{fontSize:12, color:'gray'}}>Medellin Colombia</Text>
                </View>
              </View>
            }

            RightComponent={
              <View style={$rightComponent}>
                <SquarePlus size={30} color='orange'/>
              </View>
            }
            
          />
        )}
      />
    </Screen>
  )
}

const $screenContainer: ViewStyle = {
  
}

const $styleCardList: ViewStyle = {
  borderRadius:0,
  borderWidth:0,
  height:90,
  elevation:1,
  marginBottom:2
}

const $contentComponent: ViewStyle = {  
  flexDirection:'row',
  columnGap:8,
  top:10
  
}

const $leftComponent: ViewStyle = {
  justifyContent:'center',
  paddingHorizontal:6
}

const $rightComponent: ViewStyle = {
  justifyContent:'center'
}

//const $