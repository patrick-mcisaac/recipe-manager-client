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

    const getRecipes = (token: string) => {
        fetch(`http://localhost:8000/recipes`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res) => res.json())
            .then(setRecipes)
    }

    const getRecipeById = (id: string, token: string) => {
        fetch(`http://localhost:8000/recipes/${id}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res) => res.json())
            .then(setRecipe)
    }

    const getFavoriteRecipes = (token: string) => {
        fetch(`http://localhost:8000/recipes?favorite=true`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res) => res.json())
            .then(setRecipes)
    }

    const addFavorite = (id: string, token: string) => {
        return fetch(`http://localhost:8000/recipes/${id}?favorite=true`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`
            }
        })
    }

    const removeFavorite = (id: string, token: string) => {
        return fetch(`http://localhost:8000/recipes/${id}?favorite=false`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`
            }
        })
    }

    const createRecipe = (token: string, data: FormData) => {
        return fetch(`http://localhost:8000/recipes`, {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`
            },
            body: data
        })
    }

    const updateRecipe = (id: string, token: string, data: FormData) => {
        return fetch(`http://localhost:8000/recipes/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`
            },
            body: data
        })
    }

    const deleteRecipe = (id: string, token: string) => {
        return fetch(`http://localhost:8000/recipes/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`
            }
        })
    }

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                recipe,
                getRecipeById,
                getRecipes,
                getFavoriteRecipes,
                addFavorite,
                removeFavorite,
                createRecipe,
                updateRecipe,
                deleteRecipe
            }}
        >
            {children}
        </RecipeContext.Provider>
    )
}
