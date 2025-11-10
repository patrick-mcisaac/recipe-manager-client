import { useNavigate } from "react-router-dom"
import type { RecipeType } from "../../types/recipeTypes"

interface RecipeProps {
    recipe: RecipeType
}
export const RecipeList = ({ recipe }: RecipeProps) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            className="flex h-50 w-full cursor-pointer items-center justify-center rounded-2xl border hover:scale-105 md:w-90"
        >
            <h1>{recipe.name}</h1>
        </div>
    )
}
