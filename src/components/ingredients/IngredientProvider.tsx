import type React from "react"
import { useState } from "react"
import { IngredientContext } from "./IngredientContext"
import type { IngredientTypes } from "../../types/ingredientTypes"

interface Props {
    children: React.ReactNode
}
export const IngredientProvider = ({ children }: Props) => {
    const [ingredients, setIngredients] = useState<
        IngredientTypes[] | undefined
    >(undefined)

    const getIngredients = (token: string) => {
        fetch(`http://localhost:8000/ingredients`, {
            headers: {
                Authorization: `Token: ${token}`
            }
        })
            .then((res) => res.json())
            .then(setIngredients)
    }
    return (
        <IngredientContext.Provider value={{ ingredients, getIngredients }}>
            {children}
        </IngredientContext.Provider>
    )
}
