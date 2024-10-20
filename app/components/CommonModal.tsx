import React from "react"
import { useReactiveVar } from "@apollo/client"
import { openModalVar } from "app/store/reactiveVars"
import { Modal } from "react-native"

const CommonModal = ({ children }: any) => {
  const modalVisible = useReactiveVar(openModalVar)

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {children}
    </Modal>
  )
}

export default CommonModal
