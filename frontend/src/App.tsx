import { Routes, Route } from 'react-router'
import { Suspense } from 'react'
import { routesConfig } from './app/routes/routesConfig'
import Header from './widgets/Header/ui/Header'
import { AuthProvider } from './entities/user/model/AuthContext'
import { Spinner } from './shared/ui'

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Header />
            <div className="container">
                <Suspense
                    fallback={
                        <div className="loader">
                            <Spinner width={80} />
                        </div>
                    }
                >
                    <Routes>
                        {routesConfig.map(({ page: Page, url }) => (
                            <Route key={url} path={url} element={<Page />} />
                        ))}
                    </Routes>
                </Suspense>
            </div>
        </AuthProvider>
    )
}

export default App
