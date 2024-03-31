import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Login from './pages/Login'
import Menu from './pages/Menu'
import Order from './pages/Order'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="12221267435-lsk9h3j605atjq4n35dvpsf2gun7dh6a.apps.googleusercontent.com">
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PlaceHolder/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/order" element={<Order/>}/>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>,
    </GoogleOAuthProvider>
)

function PlaceHolder() {
    return (
        <>
        </>
    )
}
