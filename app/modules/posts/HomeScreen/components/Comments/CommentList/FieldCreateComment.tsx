import { Pressable, View } from "react-native"
import { SendHorizontal } from "lucide-react-native"

import { TextField } from "app/components"
import useCreateComment from "./hooks/useCreateComment"

const FieldCreateComment = ({ postId, user, flatListRef }: any) => {
    
  const { setContent, content, handleCreateComments, isButtonDisabled } = useCreateComment({
    postId,
    user,
    flatListRef,
  })

  return (
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
      <Pressable
        onPress={handleCreateComments}
        disabled={isButtonDisabled}
        style={{ opacity: isButtonDisabled ? 0.55 : 1 }}
      >
        <SendHorizontal size={35} color={"black"} />
      </Pressable>
    </View>
  )
}

export default FieldCreateComment
