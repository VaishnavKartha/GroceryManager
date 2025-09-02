import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthUser from './context/AuthUser.jsx'
import ListManager from './context/ListManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthUser>
      <ListManager>
      <App />
      </ListManager>
    </AuthUser>
    </BrowserRouter>
  </StrictMode>,
)
