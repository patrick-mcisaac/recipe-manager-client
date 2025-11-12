export interface IngredientTypes {
    id: number
    name: string
}

export interface IngredientContextType {
    ingredients: IngredientTypes[] | undefined
    getIngredients: (token: string) => void
}

export interface IngredientCheckboxType {
    id: number
    name: string
    checked: boolean
}
