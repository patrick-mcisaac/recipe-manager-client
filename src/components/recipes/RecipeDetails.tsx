import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRecipes } from "../../hooks/useRecipes"

export const RecipeDetails = () => {
    const { recipeId } = useParams()
    const { recipe, getRecipeById } = useRecipes()

    useEffect(() => {
        if (recipeId) {
            getRecipeById(recipeId)
        }
    }, [recipeId])
    // TODO: maybe refactor how ingredients are stored to map it nicer
    // TODO: add image to db
    return (
        recipe && (
            <div className="flex flex-col items-center justify-center p-8">
                <h1 className="text-center text-3xl font-bold">
                    {recipe.name}
                </h1>
                <p className="mt-2">{recipe.description}</p>
                <div className="mt-5 self-start">
                    <h2 className="text-xl font-semibold">Ingredients</h2>
                    {recipe.ingredients?.map((i) => {
                        return <p className="ml-8">{i.name}</p>
                    })}
                </div>
                <div className="mt-10 grid grid-cols-[1rem_1fr] gap-y-3">
                    {recipe.instructions.split(".").map((r) => {
                        return (
                            <p className={parseInt(r) ? "font-bold" : ""}>
                                {r}
                            </p>
                        )
                    })}
                </div>
            </div>
        )
    )
}
