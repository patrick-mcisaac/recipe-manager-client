import type React from "react"
import { useRecipeById, useUpdateRecipe } from "../../hooks/useRecipes"
import { useIngredients } from "../../hooks/useIngredients"
import { IngredientsList } from "../ingredients/IngredientsList"
import { useEffect, useState } from "react"
import type { IngredientCheckboxType, IngredientTypes } from "../../types/ingredientTypes"
import { useNavigate, useParams } from "react-router-dom"
import type { RecipeType } from "../../types/recipeTypes"

export const EditRecipeForm = () => {
    const { recipeId } = useParams()
    const navigate = useNavigate()

    const { data: recipe } = useRecipeById(recipeId || "")
    const { data: ingredients } = useIngredients()
    const updateRecipeMutation = useUpdateRecipe()

    const [count, setCount] = useState<number[]>([0])
    const [instructionArray, setInstructionArray] = useState<string[]>([""])
    const [checkboxes, setCheckboxes] = useState<IngredientCheckboxType[]>([
        {
            id: 0,
            name: "",
            checked: false
        }
    ])
    const [editRecipe, setEditRecipe] = useState<RecipeType>({
        name: "",
        description: "",
        instructions: "",
        ingredients: []
    })

    const [selectedFile, setSelectedFile] = useState<File | undefined>(
        undefined
    )

    useEffect(() => {
        if (recipe) {
            setEditRecipe(recipe)
        }
        if (ingredients && recipe?.ingredients) {
            const initialState = []
            for (const i of ingredients) {
                if (recipe.ingredients.find((r) => r.id === i.id)) {
                    initialState.push({
                        id: i.id,
                        name: i.name,
                        checked: true
                    })
                } else {
                    initialState.push({
                        id: i.id,
                        name: i.name,
                        checked: false
                    })
                }
            }
            setCheckboxes(initialState)
        }
    }, [ingredients, recipe])

    useEffect(() => {
        
        if (recipe?.instructions) {
            const instructionBreak = recipe?.instructions.split('.')
            if (instructionBreak) {
                const parsedInstructions: string[] = []
                const newCounts: number[] = []
                let currentCountValue = 0

                for (let i = 0; i < instructionBreak.length; i++) {
                    if(parseInt(instructionBreak[i])){
                        continue
                    }else if(instructionBreak[i] === '' || instructionBreak[i].trim() === ''){
                        continue
                    }
                    else{
                        parsedInstructions.push(instructionBreak[i])
                        newCounts.push(currentCountValue)
                        currentCountValue ++
                    }
                    }
                    setInstructionArray(parsedInstructions)
                    setCount(newCounts) // Set counts once with unique values
                }
            }
        }
    , [recipe])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "name":
                setEditRecipe({ ...editRecipe, name: e.target.value })
                break
            case "description":
                setEditRecipe({ ...editRecipe, description: e.target.value })
                break
            default:
                break
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            setSelectedFile(file)
        }
    }

    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let instructionString = ""
        const copyArray = [...instructionArray]
        for (let i = 0; i < copyArray.length; i++) {
            instructionString += `${i + 1}. ${copyArray[i]}. `
        }

        if (
            editRecipe.name !== "" &&
            editRecipe.description !== "" &&
            instructionString !== ""
        ) {
            

            const ingredientArray : IngredientTypes[] = []
            for (const checkbox of checkboxes) {
                if (checkbox.checked) {
                    ingredientArray.push({
                        id: checkbox.id,
                        name: checkbox.name
                    })
                }
            }

            const copyRecipe= {
                ...editRecipe,
                ingredients: ingredientArray
            }

            const formData = new FormData()

            formData.append("name", copyRecipe.name)
            formData.append("description", copyRecipe.description)
            formData.append('ingredients', JSON.stringify(copyRecipe.ingredients))
            formData.append("instructions", instructionString)
            if (selectedFile) {
                formData.append("image", selectedFile)
            }

            if (recipeId) {
                updateRecipeMutation.mutate(
                    { id: recipeId, data: formData },
                    {
                        onSuccess: () => {
                            navigate("/recipes")
                        },
                        onError: (error) => {
                            console.error("Failed to update recipe:", error)
                            alert("Failed to update recipe. Check console for details.")
                        }
                    }
                )
            }
        }
    }
    return (
        recipe && (
            <form
                action=""
                className="flex flex-col items-center justify-center gap-10 p-20"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-center">Add Recipe</h1>
                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        className="rounded-2xl border pl-2 bg-button text-(--background)"
                        type="text"
                        placeholder="name"
                        id="name"
                        name="name"
                        value={editRecipe.name}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <input
                        className="rounded-2xl border pl-2 bg-button text-(--background)"
                        type="text"
                        placeholder="description"
                        id="description"
                        name="description"
                        value={editRecipe.description}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                    <label htmlFor="image">Add Image</label>
                    <input
                    className="w-full md:w-100 rounded-2xl border pl-2 bg-button text-(--background)"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                    <legend className="font-semibold text-xl mb-4 text-center">Ingredients</legend>
                    {/* checkboxes for ingredients */}
                     <div className="flex flex-wrap w-50 gap-2 justify-center items-center">
                    {ingredients &&
                        checkboxes.map((i) => (
                            <IngredientsList
                                key={i.id}
                                ingredient={i}
                                setCheckboxes={setCheckboxes}
                                checkboxes={checkboxes}
                            />
                        ))}
                    </div>
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                    <legend className="mb-5">Instructions</legend>
                    {count.map((c) => (
                        <input
                            key={c}
                            className="w-full md:w-100 rounded-2xl border pl-2 bg-button text-(--background)"
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
                            setCount((prevCount) => [
                                ...prevCount,
                                prevCount.length > 0
                                    ? prevCount.slice(-1)[0] + 1
                                    : 0
                            ])
                        }}
                        className="h-10 w-15 cursor-pointer self-end font-semibold text-(--background) rounded-2xl bg-button hover:scale-105  transition"
                    >
                        Add
                    </button>
                </fieldset>
                <button
                    className='mt-10 h-10 w-full  cursor-pointer self-center font-semibold text-(--background) rounded-2xl bg-button hover:scale-105  transition'
                    onClick={handleSave}
                >
                    Save
                </button>
            </form>
        )
    )
}
