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

import Inventory from './pages/Manager/Inventory'
import EditInventory from './pages/Manager/EditInventory'
import OrderHistory from './pages/Manager/OrderHistory' 
import EditOrderHistory from './pages/Manager/EditOrderHistory' 

import AdminOrder from './pages/AdminOrder'
import Weather from './pages/Weather'
import ManagerMenu from './pages/Manager/Menu/ManagerMenu'


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
                    <Route path="/inventory" element={<Inventory/>}/>
                    <Route path="/editinventory" element={<EditInventory/>}/>
                    <Route path="/editmenu" element={<ManagerMenu/>}/>
                    <Route path="/orderhistory" element={<OrderHistory/>}/>
                    <Route path="/editorderhistory" element={<EditOrderHistory/>}/>
                    <Route path="/admin/order" element={<AdminOrder/>}/>
                    <Route path="/weather" element={<Weather/>}/>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>
)

