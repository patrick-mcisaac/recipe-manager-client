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
            <div className="flex flex-col items-center justify-center p-8 md:gap-10 md:p-15">
                <h1 className="text-center text-3xl font-bold md:mt-10 md:text-6xl">
                    {recipe.name}
                </h1>
                <p className="mt-2 text-center md:mt-8 md:text-3xl md:font-semibold">
                    {recipe.description}
                </p>
                <div className="mt-5 self-start md:mt-10 md:self-center">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        Ingredients
                    </h2>
                    {recipe.ingredients?.map((i) => {
                        return (
                            <p
                                key={i.id}
                                className="ml-8 md:m-0 md:text-center md:text-lg"
                            >
                                {i.name}
                            </p>
                        )
                    })}
                </div>
                <div className="mt-10 grid grid-cols-[1rem_1fr] items-center gap-y-3 md:gap-x-2">
                    {recipe.instructions.split(".").map((r) => {
                        return (
                            <p
                                key={r}
                                className={
                                    parseInt(r) ?
                                        "font-bold md:text-2xl"
                                    :   "md:text-xl"
                                }
                            >
                                {r}
                            </p>
                        )
                    })}
                </div>
            </div>
        )
    )
}
