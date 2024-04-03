import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Landing from './pages/Landing' 
import Login from './pages/Login'
import Menu from './pages/Menu'
import Order from './pages/Order/Order'
import Manager from './pages/Manager'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="12221267435-lsk9h3j605atjq4n35dvpsf2gun7dh6a.apps.googleusercontent.com">
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/manager" element={<Manager/>}/>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>
)

