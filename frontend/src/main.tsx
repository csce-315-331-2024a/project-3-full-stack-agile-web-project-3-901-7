import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Landing from './pages/Landing' 
import { Login } from './pages/Login'
import Menu from './pages/Menu'
import MenuPage1 from './pages/MenuPage1'
import MenuPage2 from './pages/MenuPage2'
import MenuPage3 from './pages/MenuPage3'
import Order from './pages/Order/Order'
import Manager from './pages/Manager/Manager'

import Inventory from './pages/Manager/Inventory'
import OrderHistory from './pages/Manager/OrderHistory' 
import EditOrderHistory from './pages/Manager/EditOrderHistory'
import SalesTrends from './pages/Manager/SalesTrends'

import AdminOrder from './pages/Manager/NewOrder'
import Weather from './pages/Weather'
import ManagerMenu from './pages/Manager/Menu/ManagerMenu'
import NewMenuItemPage from './pages/Manager/Menu/NewMenuItem'
import EditMenuItemPage from './pages/Manager/Menu/EditMenuItem'
import Cashier from './pages/Cashier/Cashier'
import Admin from './pages/Admin/Admin'
import AdminRoles from './pages/Admin/AdminRoles'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="12221267435-lsk9h3j605atjq4n35dvpsf2gun7dh6a.apps.googleusercontent.com">
        <React.StrictMode>
            <BrowserRouter>
                <div>
                    <Routes>

                        {/* Landing */}
                        <Route path="/" element={<Landing/>}/>

                        {/* Customer-side */}
                        <Route path="/menu" element={<Menu/>}/>
                        <Route path="/menu1" element={<MenuPage1/>}/>
                        <Route path="/menu2" element={<MenuPage2/>}/>
                        <Route path="/menu3" element={<MenuPage3/>}/>
                        <Route path="/order" element={<Order/>}/>
                        <Route path="/weather" element={<Weather/>}/>

                        {/* Cashier-side */}
                        <Route path="/cashier" element={<Cashier/>}/>
                        <Route path="/cashier/signup" element={<Login type="cashier" signup/>}/>
                        <Route path="/cashier/login" element={<Login type="cashier"/>}/>

                        {/* Manager-side */}
                        <Route path="/manager" element={<Manager/>}/>
                        <Route path="/manager/signup" element={<Login type="manager" signup/>}/>
                        <Route path="/manager/login" element={<Login type="manager"/>}/>
                        <Route path="/manager/inventory" element={<Inventory/>}/>
                        <Route path="/manager/menu" element={<ManagerMenu/>}/>
                        <Route path="/manager/menu/new" element={<NewMenuItemPage/>}/>
                        <Route path="/manager/menu/edit/:itemId" element={<EditMenuItemPage/>}/>
                        <Route path="/manager/orders" element={<OrderHistory/>}/>
                        <Route path="/manager/orders/edit" element={<EditOrderHistory/>}/>
                        <Route path="/manager/orders/new" element={<AdminOrder/>}/>
                        <Route path="/manager/salestrends" element={<SalesTrends/>}/>

                        {/* Admin-side */}
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/signup" element={<Login type="admin" signup/>}/>
                        <Route path="/admin/login" element={<Login type="admin"/>}/>
                        <Route path="/admin/roles" element={<AdminRoles/>}/>

                    </Routes>
                </div>
            </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>
)

