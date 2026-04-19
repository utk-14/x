import { createContext, useState } from "react"
import { loginUser } from "../api/authApi"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (data) => {
    const res = await loginUser(data)

    if (res.access_token) {
      localStorage.setItem("token", res.access_token)
      setUser(res)
    }

    return res
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  )
}