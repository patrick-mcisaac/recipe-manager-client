import { useContext } from "react"
import { IngredientContext } from "../components/ingredients/IngredientContext"

export const useIngredients = () => {
    const context = useContext(IngredientContext)

    if (!context) {
        throw new Error("Ingredients context must be used within provider")
    }
    return context
}
