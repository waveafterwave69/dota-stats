import { Routes, Route } from 'react-router'
import { Suspense, lazy } from 'react'
import { routesConfig } from './app/routes/routesConfig'
import Header from './widgets/Header/ui/Header'
import { AuthProvider } from './entities/user/model/AuthContext'

const AuthCallback = lazy(() => import('./pages/AuthCallback'))
const AuthError = lazy(() => import('./pages/AuthError'))

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Header />
            <div className="container">
                <Suspense
                    fallback={
                        <div className="loader">Загрузка страницы...</div>
                    }
                >
                    <Routes>
                        {routesConfig.map(({ page: Page, url }) => (
                            <Route key={url} path={url} element={<Page />} />
                        ))}

                        <Route
                            path="/auth/callback"
                            element={<AuthCallback />}
                        />
                        <Route path="/auth/error" element={<AuthError />} />
                    </Routes>
                </Suspense>
            </div>
        </AuthProvider>
    )
}

export default App
