import { Routes, Route } from 'react-router'
import { Suspense } from 'react'
import { routesConfig } from './app/routes/routesConfig'
import Header from './widgets/Header/ui/Header'

const App: React.FC = () => {
    return (
        <>
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
                    </Routes>
                </Suspense>
            </div>
        </>
    )
}

export default App
