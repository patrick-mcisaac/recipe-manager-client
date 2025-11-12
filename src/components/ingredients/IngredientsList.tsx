import type React from "react"
import type { IngredientCheckboxType } from "../../types/ingredientTypes"

interface Props {
    ingredient: IngredientCheckboxType
    checkboxes: IngredientCheckboxType[]
    setCheckboxes: React.Dispatch<
        React.SetStateAction<IngredientCheckboxType[]>
    >
}
export const IngredientsList = ({
    ingredient,

    setCheckboxes,
    checkboxes
}: Props) => {
    const handleChange = (id: number) => {
        if (checkboxes) {
            setCheckboxes((prev): IngredientCheckboxType[] => {
                return prev.map((checkbox) =>
                    checkbox.id === id ?
                        { ...checkbox, checked: !checkbox.checked }
                    :   { ...checkbox }
                )
            })
        }
    }
    return (
        <div>
            <label htmlFor={ingredient.name}>{ingredient.name}</label>
            <input
                type="checkbox"
                id={ingredient.name}
                name={ingredient.name}
                checked={ingredient.checked}
                onChange={() => {
                    if (ingredient.id) {
                        handleChange(ingredient.id)
                    }
                }}
            />
        </div>
    )
}
