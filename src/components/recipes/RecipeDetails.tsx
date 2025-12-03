import { useNavigate, useParams } from "react-router-dom"
import {
    useRecipeById,
    useAddFavorite,
    useRemoveFavorite,
    useDeleteRecipe
} from "../../hooks/useRecipes"

export const RecipeDetails = () => {
    const { recipeId } = useParams()
    const navigate = useNavigate()

    const { data: recipe } = useRecipeById(recipeId || "")
    const addFavoriteMutation = useAddFavorite()
    const removeFavoriteMutation = useRemoveFavorite()
    const deleteRecipeMutation = useDeleteRecipe()

    const handleAddFavorite = () => {
        if (recipeId) {
            addFavoriteMutation.mutate(recipeId, {
                onSuccess: () => {
                    navigate("/recipes/favorites")
                }
            })
        }
    }

    const handleRemoveFavorite = () => {
        if (recipeId) {
            removeFavoriteMutation.mutate(recipeId, {
                onSuccess: () => {
                    navigate("/recipes/favorites")
                }
            })
        }
    }

    const handleDeleteRecipe = () => {
        if (recipeId) {
            deleteRecipeMutation.mutate(recipeId, {
                onSuccess: () => {
                    navigate("/recipes")
                }
            })
        }
    }

    return (
        recipe && (
            <div className="flex flex-col items-center justify-center p-8 md:gap-10 md:p-15">
                <h1 className="text-center text-3xl font-bold md:mt-10 md:text-6xl">
                    {recipe.name}
                </h1>
                <p className="mt-2 text-center md:mt-8 md:text-3xl md:font-semibold">
                    {recipe.description}
                </p>
                {recipe.image ?
                    <div className="w-100 overflow-hidden rounded-2xl">
                        <img src={recipe.image} alt="" />
                    </div>
                :   ""}
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
                {recipe.is_favorite ?
                    <button
                        onClick={handleRemoveFavorite}
                        className="h-10 w-40 cursor-pointer self-center rounded-2xl bg-gray-800 text-white hover:scale-105"
                    >
                        Remove Favorite
                    </button>
                :   <button
                        onClick={handleAddFavorite}
                        className="h-10 w-40 cursor-pointer self-center rounded-2xl bg-gray-800 text-white hover:scale-105"
                    >
                        Favorite
                    </button>
                }
                {recipe.is_owner ?
                    <>
                        <button
                            onClick={() =>
                                navigate(`/recipes/${recipeId}/edit`)
                            }
                            className="h-10 w-40 cursor-pointer self-center rounded-2xl bg-gray-800 text-white hover:scale-105"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDeleteRecipe}
                            className="h-10 w-40 cursor-pointer self-center rounded-2xl bg-gray-800 text-white hover:scale-105"
                        >
                            Delete
                        </button>
                    </>
                :   ""}
            </div>
        )
    )
}
