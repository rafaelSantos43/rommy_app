type Creddnetials = {
  userNameOrEmail: string
  password: string
}

export const oauth = async ({ userNameOrEmail, password }: Creddnetials) => {
  try {
    const response = await fetch("http://10.2.20.100:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        userNameOrEmail,
        password,
      }),
    })
    const dataJson = await response.json()
    return dataJson
  } catch (error) {
    console.error("!Ups error en la solicitud", error)
  }
}
