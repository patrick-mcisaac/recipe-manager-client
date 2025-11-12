import { useEffect } from "react"
import { useRecipes } from "../../hooks/useRecipes"
import { RecipeList } from "./RecipeList"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const Recipes = () => {
    const { recipes, getRecipes } = useRecipes()
    const { token, getToken } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        getToken()
    }, [])

    useEffect(() => {
        getRecipes(token)
    }, [token])
    return (
        <div className="flex flex-col p-10">
            <h1 className="text-center text-6xl font-bold tracking-wider md:mt-15 md:text-6xl">
                Recipes
            </h1>
            <button
                onClick={() => navigate("/recipes/add")}
                className="mt-10 h-10 w-40 cursor-pointer self-center rounded-2xl bg-gray-800 text-white hover:scale-105 lg:self-end"
            >
                Add Recipe
            </button>
            <div className="mt-10 flex flex-wrap items-start justify-around gap-5 md:mt-20 md:gap-10">
                {recipes &&
                    recipes.map((recipe) => (
                        <RecipeList key={recipe.id} recipe={recipe} />
                    ))}
            </div>
        </div>
    )
}
