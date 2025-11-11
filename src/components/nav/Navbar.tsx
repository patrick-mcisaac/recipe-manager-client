import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useEffect } from "react"

export const Navbar = () => {
    const { token, getToken } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        getToken()
    }, [])
    return (
        <ul className="flex h-20 items-center justify-between p-5 md:p-10 dark:bg-gray-950 dark:text-white">
            <Link to="/recipes">
                <li className="text-2xl hover:scale-105">Recipes</li>
            </Link>

            {token ?
                <div className="">
                    <li
                        onClick={() => {
                            localStorage.removeItem("recipe_token")
                            navigate("/login")
                        }}
                        className="cursor-pointer text-2xl hover:scale-105"
                    >
                        Logout
                    </li>
                </div>
            :   <div className="flex items-center gap-5 md:gap-10">
                    <Link to="/login">
                        <li className="text-2xl hover:scale-105">Login</li>
                    </Link>
                    <Link to="/register">
                        <li className="text-2xl hover:scale-105">Register</li>
                    </Link>
                </div>
            }
        </ul>
    )
}
