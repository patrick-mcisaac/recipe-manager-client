import { AuthProvider } from "./auth/AuthProvider"
import { IngredientProvider } from "./components/ingredients/IngredientProvider"
import { RecipeProvider } from "./components/recipes/RecipeProvider"
import { ApplicationViews } from "./views/ApplicationViews"

function App() {
    return (
        <>
            <AuthProvider>
                <RecipeProvider>
                    <IngredientProvider>
                        <ApplicationViews />
                    </IngredientProvider>
                </RecipeProvider>
            </AuthProvider>
        </>
    )
}

export default App
