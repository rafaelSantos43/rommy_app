import { gql, useMutation } from "@apollo/client"
import { emailVar, passwordVar } from "app/store/reactiveVars"
import { useStore } from "app/store/useStore"

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    Login(email: $email, password: $password)
  }
`

const useLogin = () => {
  const email = emailVar()
  const password = passwordVar()
  const { setSession } = useStore()
  
  return useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
    onCompleted: (data) => {
     setSession(data.Login)
    },
    onError: (error) => {
      console.log("Error!",error)
    }
  })
}

export default useLogin
