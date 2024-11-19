import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { Search, UserPlus } from "lucide-react-native"
import { useDebounce } from "use-debounce"

import { TabScreenProps } from "app/navigators/TabNavigator"
import {  Card, Screen, Text, TextField } from "app/components"
import useSearchUsers from "./graphql/searchUsers.query"
import ImageValidateType from "app/components/ImageValidateType"

export const SearchFrinedScreen: FC<TabScreenProps<"SearchFrinedScreen">> = (_props) => {
  const [value, setValue] = useState("")
  const [debouncedValue] = useDebounce(value, 500)

  let [searchUsers, { data, loading, error }] = useSearchUsers()
  
  useEffect(() => {
    if (debouncedValue.trim()) {
      const handleUserSearch = async () => {
        try {
          await searchUsers({ variables: { query: debouncedValue } })
        } catch (error) {
          console.error("no se pudo hacer la consulta --->", error)
        }
      }
      handleUserSearch()
    }
  }, [debouncedValue])
 
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <TextField
        onChangeText={(value) => setValue(value)}
        inputWrapperStyle={{ borderWidth: 0 }}
        LeftAccessory={() => <Search style={{ alignSelf: "center" }} size={24} color="black" />}
        placeholder="Search Friends"
      />
      {loading ? (
        <View style={{ top: 10 }}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <FlatList
          style={{ top: 25 }}
          data={debouncedValue ? data?.SearchUsers : []}
          keyExtractor={(search) => search.id}
          renderItem={({ item }) => (
            <Card
              style={{
                borderWidth: 0,
                borderRadius: 0,
                elevation: 0,
                backgroundColor: "trasnparent",
              }}
              LeftComponent={
                <View style={{ justifyContent: "center" }}>
                  <ImageValidateType image={item.avatar} width={50} height={50} radius={50} />
                </View>
              }
              ContentComponent={
                <View style={{ top: 20 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ fontSize: 11, color: "gray", top: -8 }}>8 mutual friends</Text>
                </View>
              }
              RightComponent={
                <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {}}>
                  <UserPlus size={25} color={"black"} />
                </TouchableOpacity>
              }
            />
          )}
        />
        
      )}

      {error && <Text>{error.message}</Text>}
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  padding: 15,
}
