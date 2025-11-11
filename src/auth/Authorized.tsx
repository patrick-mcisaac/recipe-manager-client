import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/nav/Navbar"

export const Authorized = () => {
    if (localStorage.getItem("recipe_token"))
        return (
            <>
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </>
        )
    return <Navigate to="/login" replace />
}
