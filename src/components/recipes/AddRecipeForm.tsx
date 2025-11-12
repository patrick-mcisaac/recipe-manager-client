import type React from "react"
import { useEffect, useState } from "react"
import type { RecipeType } from "../../types/recipeTypes"
import { useIngredients } from "../../hooks/useIngredients"
import { useAuth } from "../../hooks/useAuth"

import { IngredientsList } from "../ingredients/IngredientsList"
import type { IngredientCheckboxType } from "../../types/ingredientTypes"
import { useRecipes } from "../../hooks/useRecipes"
import { useNavigate } from "react-router-dom"

export const AddRecipeForm = () => {
    const [count, setCount] = useState<number[]>([0])
    const [recipe, setRecipe] = useState<RecipeType>({
        name: "",
        description: "",
        instructions: "",
        ingredients: []
    })
    const [instructionArray, setInstructionArray] = useState<string[]>([""])

    const [checkboxes, setCheckboxes] = useState<IngredientCheckboxType[]>([
        {
            id: 0,
            name: "",
            checked: false
        }
    ])

    const navigate = useNavigate()

    const { ingredients, getIngredients } = useIngredients()
    const { createRecipe } = useRecipes()
    const { token } = useAuth()

    useEffect(() => {
        if (token) {
            getIngredients(token)
        }
    }, [token])

    useEffect(() => {
        const initialState = []
        if (ingredients) {
            for (const i of ingredients) {
                initialState.push({
                    id: i.id,
                    name: i.name,
                    checked: false
                })
            }
            setCheckboxes(initialState)
        }
    }, [ingredients])

    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let instructionString = ""
        const copyArray = [...instructionArray]
        for (let i = 0; i < copyArray.length; i++) {
            instructionString += `${i + 1}. ${copyArray[i]}. `
        }

        if (
            recipe.name !== "" &&
            recipe.description !== "" &&
            instructionString !== ""
        ) {
            const copyRecipe = {
                ...recipe
            }
            for (const checkbox of checkboxes) {
                if (checkbox.checked) {
                    copyRecipe.ingredients?.push({
                        id: checkbox.id,
                        name: checkbox.name
                    })
                }
            }
            copyRecipe.instructions = instructionString

            createRecipe(token, copyRecipe).then(() => navigate("/recipes"))
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "name":
                setRecipe({ ...recipe, name: e.target.value })
                break
            case "description":
                setRecipe({ ...recipe, description: e.target.value })
                break
            default:
                break
        }
    }
    return (
        <form
            action=""
            className="flex flex-col items-center justify-center gap-10 p-20"
        >
            <h1 className="text-6xl font-bold">Add Recipe</h1>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                    className="rounded-2xl border pl-2"
                    type="text"
                    placeholder="name"
                    id="name"
                    name="name"
                    value={recipe.name}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <input
                    className="rounded-2xl border pl-2"
                    type="text"
                    placeholder="description"
                    id="description"
                    name="description"
                    value={recipe.description}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <legend>Ingredients</legend>
                {/* checkboxes for ingredients */}
                {ingredients &&
                    checkboxes.map((i) => (
                        <IngredientsList
                            key={i.id}
                            ingredient={i}
                            setCheckboxes={setCheckboxes}
                            checkboxes={checkboxes}
                        />
                    ))}
            </fieldset>
            <fieldset className="flex flex-col gap-5">
                <legend className="mb-5">Instructions</legend>
                {count.map((c) => (
                    <input
                        key={c}
                        className="w-100 rounded-2xl border pl-2"
                        onChange={(e) => {
                            const copyInstruction = [...instructionArray]
                            copyInstruction[c] = e.target.value
                            setInstructionArray(copyInstruction)
                        }}
                        type="text"
                        id={`instruction_${c}`}
                        value={instructionArray[c]}
                    />
                ))}
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setCount([...count, count.slice(-1)[0] + 1])
                    }}
                    className="h-10 w-15 cursor-pointer self-end rounded-2xl bg-gray-800 text-white hover:scale-105"
                >
                    add
                </button>
            </fieldset>
            <button
                className="h-10 w-30 cursor-pointer rounded-2xl bg-gray-800 text-white hover:scale-105"
                onClick={handleSave}
            >
                Save
            </button>
        </form>
    )
}
