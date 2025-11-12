import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../components/home/Home"
import { Recipes } from "../components/recipes/Recipes"
import { RecipeDetails } from "../components/recipes/RecipeDetails"
import { Login } from "../auth/Login"
import { Authorized } from "../auth/Authorized"
import { Register } from "../auth/Register"
import { Favorites } from "../components/recipes/Favorites"
import { AddRecipeForm } from "../components/recipes/AddRecipeForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
                element={
                    <>
                        <Authorized />
                    </>
                }
            >
                <Route index element={<Home />} />
                <Route path="recipes" element={<Outlet />}>
                    <Route index element={<Recipes />} />
                    <Route path=":recipeId" element={<RecipeDetails />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="add" element={<AddRecipeForm />} />
                </Route>
            </Route>
        </Routes>
    )
}
