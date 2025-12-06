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
        <form className="flex flex-col items-center justify-center gap-10 p-40">
            <h1 className="text-5xl md:text-6xl font-bold text-center">Recipe Manager Login</h1>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                    className="rounded-2xl border pl-2 bg-button text-(--background)"
                    type="text"
                    placeholder="username"
                    id="username"
                    name="username"
                    value={userLogin.username}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                    className="rounded-2xl border pl-2 bg-button text-(--background)"
                    onChange={handleChange}
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                    value={userLogin.password}
                />
            </fieldset>
            <fieldset className="flex gap-10">
                <button
                   className='mt-10 h-10 w-20  cursor-pointer self-center font-semibold text-(--background) rounded-2xl bg-button hover:scale-105  transition'
                    onClick={handleSubmit}
                >
                    Login
                </button>
                <button
                    className='mt-10 h-10 w-20  cursor-pointer self-center font-semibold text-(--background) rounded-2xl bg-button hover:scale-105  transition'
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/register")
                    }}
                >
                    Register
                </button>
            </fieldset>
        </form>
    )
}
