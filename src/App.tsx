import { RecipeProvider } from "./components/recipes/RecipeProvider"
import { ApplicationViews } from "./views/ApplicationViews"

function App() {
    return (
        <>
            <RecipeProvider>
                <ApplicationViews />
            </RecipeProvider>
        </>
    )
}

export default App
