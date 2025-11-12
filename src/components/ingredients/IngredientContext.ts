import { createContext } from "react"
import type { IngredientContextType } from "../../types/ingredientTypes"

export const IngredientContext = createContext<
    IngredientContextType | undefined
>(undefined)
