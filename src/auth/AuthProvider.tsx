import type React from "react"
import { AuthContext } from "./AuthContext"
import { useState } from "react"
import type { LoginType, RegisterType } from "../types/authTypes"
import { useNavigate } from "react-router-dom"

interface Props {
    children: React.ReactNode
}
export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string>("")
    const navigate = useNavigate()

    const login = (data: LoginType) => {
        fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((authInfo) => {
                if (authInfo.valid) {
                    localStorage.setItem(
                        "recipe_token",
                        JSON.stringify(authInfo)
                    )
                    setToken(authInfo.token)
                }
            })
            .then(() => navigate("/"))
    }

    const register = (data: RegisterType) => {
        fetch(`http://localhost:8000/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((authInfo) => {
                if (authInfo && authInfo.token) {
                    localStorage.setItem(
                        "recipe_token",
                        JSON.stringify(authInfo)
                    )
                    navigate("/")
                } else {
                    window.alert("User already exists")
                }
            })
    }

    return (
        <AuthContext.Provider value={{ token, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}
