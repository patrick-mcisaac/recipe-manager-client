import { createContext } from "react"
import type { RecipeContextType } from "../../types/recipeTypes"

export const RecipeContext = createContext<RecipeContextType | undefined>(
    undefined
)
