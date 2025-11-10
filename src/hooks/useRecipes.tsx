import { useContext } from "react"
import { RecipeContext } from "../components/recipes/RecipeContext"

export const useRecipes = () => {
    const context = useContext(RecipeContext)

    if (!context) {
        throw new Error("Context must be used within provider")
    }
    return context
}
