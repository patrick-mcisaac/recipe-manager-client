import { useEffect } from "react"
import { useRecipes } from "../../hooks/useRecipes"
import { RecipeList } from "./RecipeList"

export const Favorites = () => {
    const { recipes, getFavoriteRecipes } = useRecipes()

    useEffect(() => {
        getFavoriteRecipes()
    }, [])
    return (
        <div className="p-10">
            <h1 className="text-center text-6xl font-bold tracking-wider md:mt-15 md:text-6xl">
                Favorite Recipes
            </h1>
            <div className="mt-10 flex flex-wrap items-start justify-around gap-5 md:mt-20 md:gap-10">
                {recipes &&
                    recipes.map((recipe) => (
                        <RecipeList key={recipe.id} recipe={recipe} />
                    ))}
            </div>
        </div>
    )
}
