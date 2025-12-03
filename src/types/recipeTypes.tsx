import type { IngredientTypes } from "./ingredientTypes"


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
