import type { IngredientTypes } from "./ingredientTypes"

export interface RecipeContextType {
    recipes: RecipeType[] | undefined
    recipe: RecipeType | undefined
    getRecipeById: (id: string) => void
    getRecipes: () => void
    getFavoriteRecipes: (token: string) => void
}

export interface RecipeType {
    id: number
    name: string
    description: string
    instructions: string
    user?: number
    ingredients?: IngredientTypes[]
    favorites?: number
}
