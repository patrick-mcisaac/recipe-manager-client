import { AuthProvider } from "./auth/AuthProvider"
import { RecipeProvider } from "./components/recipes/RecipeProvider"
import { ApplicationViews } from "./views/ApplicationViews"

function App() {
    return (
        <>
            <AuthProvider>
                <RecipeProvider>
                    <ApplicationViews />
                </RecipeProvider>
            </AuthProvider>
        </>
    )
}

export default App
