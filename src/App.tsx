import { AuthProvider } from "./auth/AuthProvider"

import { ApplicationViews } from "./views/ApplicationViews"

function App() {
    return (
        <>
            <AuthProvider>
              
                        <ApplicationViews />
                   
            </AuthProvider>
        </>
    )
}

export default App
