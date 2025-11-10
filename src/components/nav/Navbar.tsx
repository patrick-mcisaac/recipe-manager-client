import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <ul className="flex h-20 items-center justify-between p-5 md:p-10 dark:bg-gray-950 dark:text-white">
            <Link to="/recipes">
                <li className="text-2xl hover:scale-105">Recipes</li>
            </Link>

            <div className="flex items-center gap-5 md:gap-10">
                <Link to="/login">
                    <li className="text-2xl hover:scale-105">Login</li>
                </Link>
                <Link to="/register">
                    <li className="text-2xl hover:scale-105">Register</li>
                </Link>
            </div>
        </ul>
    )
}
