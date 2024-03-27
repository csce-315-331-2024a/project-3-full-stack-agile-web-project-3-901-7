import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Menu from './pages/Menu'
import Order from './pages/Order'

ReactDOM.createRoot(document.getElementById('root')!).render(
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
)

function PlaceHolder() {
    return (
        <>
        </>
    )
}
