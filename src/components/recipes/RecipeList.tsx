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
            className="card hover:scale-105 transition"
         
        >
            <h1 className="text-2xl">{recipe.name}</h1>
        </div>
    )
}
