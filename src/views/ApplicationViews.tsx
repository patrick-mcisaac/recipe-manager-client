import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../components/home/Home"
import { Navbar } from "../components/nav/Navbar"
import { Recipes } from "../components/recipes/Recipes"
import { RecipeDetails } from "../components/recipes/RecipeDetails"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
                path=""
                element={
                    <>
                        <Navbar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Home />} />
                <Route path="recipes" element={<Outlet />}>
                    <Route index element={<Recipes />} />
                    <Route path=":recipeId" element={<RecipeDetails />} />
                </Route>
            </Route>
        </Routes>
    )
}
