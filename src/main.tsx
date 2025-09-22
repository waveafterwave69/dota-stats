import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import PlayerProvider from './context/PlayerContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <PlayerProvider>
                <App />
            </PlayerProvider>
        </BrowserRouter>
    </StrictMode>
)
