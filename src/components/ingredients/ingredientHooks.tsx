import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import type { IngredientTypes } from "../../types/ingredientTypes"

const API_URL = "http://localhost:8000"

const fetchIngredients = async (token: string): Promise<IngredientTypes[]> => {
    const response = await fetch(`${API_URL}/ingredients`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch ingredients")
    }
    return response.json()
}

export const useIngredients = () => {
    const { token } = useAuth()
    return useQuery<IngredientTypes[], Error>({
        queryKey: ["ingredients"],
        queryFn: () => fetchIngredients(token || ""),
        enabled: !!token
    })
}
