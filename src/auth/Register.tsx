import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { RegisterType } from "../types/authTypes"
import { useAuth } from "../hooks/useAuth"

export const Register = () => {
    const [userRegister, setUserRegister] = useState<RegisterType>({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""
    })

    const { register } = useAuth()
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "username":
                setUserRegister({ ...userRegister, username: e.target.value })
                break
            case "password":
                setUserRegister({ ...userRegister, password: e.target.value })
                break
            case "first_name":
                setUserRegister({ ...userRegister, first_name: e.target.value })
                break
            case "last_name":
                setUserRegister({ ...userRegister, last_name: e.target.value })
                break
            case "email":
                setUserRegister({ ...userRegister, email: e.target.value })
                break
            default:
                break
        }
    }
    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        if (
            userRegister.username !== "" &&
            userRegister.password !== "" &&
            userRegister.first_name !== "" &&
            userRegister.last_name !== "" &&
            userRegister.email !== ""
        ) {
            register(userRegister)
        } else {
            window.alert("fill out the form")
        }
    }
    return (
        <form className="flex flex-col items-center justify-center gap-5 p-40">
            <h1 className="text-5xl md:text-6xl font-bold text-center">Register</h1>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                    className="rounded-2xl border pl-2 bg-button text-(--background)"
                    type="text"
                    placeholder="username"
                    id="username"
                    name="username"
                    value={userRegister.username}
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
                    value={userRegister.password}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="password">Email</label>
                <input
                    className="rounded-2xl border pl-2 bg-button text-(--background)"
                    onChange={handleChange}
                    type="email"
                    placeholder="email"
                    id="email"
                    name="email"
                    value={userRegister.email}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="password">First Name</label>
                <input
                    className="rounded-2xl border pl-2 bg-button text-(--background)"
                    onChange={handleChange}
                    type="text"
                    placeholder="john"
                    id="first_name"
                    name="first_name"
                    value={userRegister.first_name}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="password">Last Name</label>
                <input
                    className="rounded-2xl border pl-2 bg-button text-(--background)"
                    onChange={handleChange}
                    type="text"
                    placeholder="Doe"
                    id="last_name"
                    name="last_name"
                    value={userRegister.last_name}
                />
            </fieldset>
            <fieldset className="flex gap-10">
                <button
                    className='mt-10 h-10 w-20  cursor-pointer self-center font-semibold text-(--background) rounded-2xl bg-button hover:scale-105  transition'
                    onClick={handleSubmit}
                >
                    Register
                </button>
                <button
                    className='mt-10 h-10 w-20  cursor-pointer self-center font-semibold text-(--background) rounded-2xl bg-button hover:scale-105  transition'
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/login")
                    }}
                >
                    Login
                </button>
            </fieldset>
        </form>
    )
}
