import { useFavoriteRecipes } from "../../hooks/useRecipes"
import { RecipeList } from "./RecipeList"

export const Favorites = () => {
    const { data: recipes } = useFavoriteRecipes()

    return (
        <div className="p-10">
            <h1 className="text-center text-6xl font-bold tracking-wider md:mt-15 md:text-6xl">
                Favorite Recipes
            </h1>
            <div className="mt-10 flex flex-wrap items-start justify-around gap-5 md:mt-20 md:gap-10">
                {recipes?.map((recipe) => (
                    <RecipeList key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}
