import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Auth context must be used within provider")
    }
    return context
}
