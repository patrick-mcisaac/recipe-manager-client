import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import type { LoginType } from "../types/authTypes"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [userLogin, setUserLogin] = useState<LoginType>({
        username: "",
        password: ""
    })
    const { login } = useAuth()

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "username") {
            setUserLogin({ ...userLogin, username: e.target.value })
        }
        if (e.target.name === "password") {
            setUserLogin({ ...userLogin, password: e.target.value })
        }
    }

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        if (userLogin.username !== "" && userLogin.password !== "") {
            login(userLogin)
        }
    }

    return (
        <form>
            <fieldset>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    name="username"
                    value={userLogin.username}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                    value={userLogin.password}
                />
            </fieldset>
            <button onClick={handleSubmit}>Login</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    navigate("/register")
                }}
            >
                Register
            </button>
        </form>
    )
}
