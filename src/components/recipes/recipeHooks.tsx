import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import type { RecipeType } from "../../types/recipeTypes"

const API_URL = "http://localhost:8000"

// --- Recipe Fetching (useQuery) ---

const fetchRecipes = async (token: string): Promise<RecipeType[]> => {
    const response = await fetch(`${API_URL}/recipes`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch recipes")
    }
    return response.json()
}

const fetchRecipeById = async (
    id: string,
    token: string
): Promise<RecipeType> => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch recipe with ID ${id}`)
    }
    return response.json()
}

const fetchFavoriteRecipes = async (token: string): Promise<RecipeType[]> => {
    const response = await fetch(`${API_URL}/recipes?favorite=true`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch favorite recipes")
    }
    return response.json()
}

export const useRecipes = () => {
    const { token } = useAuth()
    return useQuery<RecipeType[], Error>({
        queryKey: ["recipes"],
        queryFn: () => fetchRecipes(token || ""),
        enabled: !!token // Only run if token exists
    })
}

export const useRecipeById = (id: string) => {
    const { token } = useAuth()
    return useQuery<RecipeType, Error>({
        queryKey: ["recipes", id],
        queryFn: () => fetchRecipeById(id, token || ""),
        enabled: !!id && !!token // Only run if id and token exist
    })
}

export const useFavoriteRecipes = () => {
    const { token } = useAuth()
    return useQuery<RecipeType[], Error>({
        queryKey: ["favoriteRecipes"],
        queryFn: () => fetchFavoriteRecipes(token || ""),
        enabled: !!token
    })
}

// --- Recipe Mutations (useMutation) ---

const addFavoriteMutation = async ({
    id,
    token
}: {
    id: string
    token: string
}) => {
    const response = await fetch(`${API_URL}/recipes/${id}?favorite=true`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (!response.ok) {
        throw new Error("Failed to add favorite")
    }
    if (response.status === 204) {
        return {} // Return an empty object for 204 No Content
    }
    return response.json()
}

const removeFavoriteMutation = async ({
    id,
    token
}: {
    id: string
    token: string
}) => {
    const response = await fetch(`${API_URL}/recipes/${id}?favorite=false`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (!response.ok) {
        throw new Error("Failed to remove favorite")
    }
    if (response.status === 204) {
        return {} // Return an empty object for 204 No Content
    }
    return response.json()
}

const createRecipeMutation = async ({
    token,
    data
}: {
    token: string
    data: FormData
}) => {
    const response = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`
        },
        body: data
    })
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to create recipe: ${errorText || response.statusText}`)
    }
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
        return response.json()
    }
    // If no JSON content, return a generic success object
    return {}
}

const updateRecipeMutation = async ({
    id,
    token,
    data
}: {
    id: string
    token: string
    data: FormData
}) => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`
        },
        body: data
    })
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to update recipe: ${errorText || response.statusText}`)
    }
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
        return response.json()
    }
    // If no JSON content, return a generic success object
    return {}
}

const deleteRecipeMutation = async ({
    id,
    token
}: {
    id: string
    token: string
}) => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to delete recipe: ${errorText || response.statusText}`)
    }
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
        return response.json()
    }
    // If no JSON content, return a generic success object
    return {}
}

export const useAddFavorite = () => {
    const queryClient = useQueryClient()
    const { token } = useAuth()
    return useMutation({
        mutationFn: (id: string) => addFavoriteMutation({ id, token: token || "" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] })
            queryClient.invalidateQueries({ queryKey: ["favoriteRecipes"] })
        }
    })
}

export const useRemoveFavorite = () => {
    const queryClient = useQueryClient()
    const { token } = useAuth()
    return useMutation({
        mutationFn: (id: string) =>
            removeFavoriteMutation({ id, token: token || "" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] })
            queryClient.invalidateQueries({ queryKey: ["favoriteRecipes"] })
        }
    })
}

export const useCreateRecipe = () => {
    const queryClient = useQueryClient()
    const { token } = useAuth()
    return useMutation({
        mutationFn: (data: FormData) =>
            createRecipeMutation({ token: token || "", data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] })
        }
    })
}

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient()
    const { token } = useAuth()
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: FormData }) =>
            updateRecipeMutation({ id, token: token || "", data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] })
            queryClient.invalidateQueries({ queryKey: ["recipes", variables.id] })
        }
    })
}

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient()
    const { token } = useAuth()
    return useMutation({
        mutationFn: (id: string) =>
            deleteRecipeMutation({ id, token: token || "" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] })
            queryClient.invalidateQueries({ queryKey: ["favoriteRecipes"] })
        }
    })
}
