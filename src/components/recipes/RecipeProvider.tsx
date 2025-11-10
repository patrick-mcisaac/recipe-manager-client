import type React from "react"
import { useState } from "react"
import type { RecipeType } from "../../types/recipeTypes"
import { RecipeContext } from "./RecipeContext"

interface Props {
    children: React.ReactNode
}

export const RecipeProvider = ({ children }: Props) => {
    const [recipes, setRecipes] = useState<RecipeType[] | undefined>(undefined)
    const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined)

    const getRecipes = () => {
        fetch(`http://localhost:8000/recipes`)
            .then((res) => res.json())
            .then(setRecipes)
    }

    const getRecipeById = (id: string) => {
        fetch(`http://localhost:8000/recipes/${id}`)
            .then((res) => res.json())
            .then(setRecipe)
    }

    return (
        <RecipeContext.Provider
            value={{ recipes, recipe, getRecipeById, getRecipes }}
        >
            {children}
        </RecipeContext.Provider>
    )
}
