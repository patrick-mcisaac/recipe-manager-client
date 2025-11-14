import type { IngredientTypes } from "./ingredientTypes"

export interface RecipeContextType {
    recipes: RecipeType[] | undefined
    recipe: RecipeType | undefined
    getRecipeById: (id: string, token: string) => void
    getRecipes: (token: string) => void
    getFavoriteRecipes: (token: string) => void
    addFavorite: (id: string, token: string) => Promise<Response>
    removeFavorite: (id: string, token: string) => Promise<Response>
    createRecipe: (token: string, data: FormData) => Promise<Response>
    updateRecipe: (
        id: string,
        token: string,
        data: RecipeType
    ) => Promise<Response>
    deleteRecipe: (id: string, token: string) => Promise<Response>
}

export interface RecipeType {
    id?: number
    name: string
    description: string
    instructions: string
    user?: number
    ingredients?: IngredientTypes[]
    favorites?: number
    is_favorite?: boolean
    is_owner?: boolean
    image?: string
}
