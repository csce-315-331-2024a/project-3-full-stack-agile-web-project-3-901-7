import { Link, useNavigate } from "react-router-dom"
import { Routes, User } from "../types/dbTypes"
import CookieManager from "../utils/CookieManager"
import { useEffect, useRef, useState } from "react";
import GoogleTranslate from "./GoogleTranslate";
import { GoPlus } from "react-icons/go";
import { useTextSize } from "../TextSizeContext";

import { FaMoon } from "react-icons/fa";
interface NavbarProps {
    userInfo?: User;
    userType?: string;
}

export default function Navbar({userInfo, userType}: NavbarProps) {

    const navigate = useNavigate();
    const [routes, setRoutes] = useState<Routes[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const initialButtonWidth = useRef<number | null>(null);
    const { enlargeText, resetTextSize } = useTextSize();

    useEffect(() => {
        if (userType === "admin") {
            setRoutes([
                {name: "edit roles", path: "/admin/roles"},
                {name: "manager page", path: "/manager"},
                {name: "cashier page", path: "/cashier"},
            ])
        } else if (userType === "manager") {
            setRoutes([
                {name: "create order", path: "/manager/orders/new"},
                {name: "order history", path: "/manager/orders"},
                {name: "reports", path: "/manager/salestrends"},
                {name: "inventory", path: "/manager/inventory"},
                {name: "menu", path: "/manager/menu"},
                {name: "log", path: "/manager/logs"},
                {name: "cashier", path: "/cashier"},
            ])
        } else if (userType === "cashier") {
            setRoutes([
                {name: "create order", path: "/manager/orders/new"},
                {name: "kitchen", path: "/cashier/kitchen"},
                {name: "log", path: "/cashier/log"},
            ])
        } else {
            setRoutes([
                {name: "menu", path: "/menu"},
                {name: "order", path: "/order"},
                {name: "login", path: "/manager/login"},
            ])
        }
    }, [])

    useEffect(() => {
        if (buttonRef.current && initialButtonWidth.current === null) {
            initialButtonWidth.current = buttonRef.current.offsetWidth;
        }

        function handleClickOutside(event: MouseEvent) {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isDropdownOpen) {
            requestAnimationFrame(() => {
                if (dropdownRef.current && buttonRef.current && initialButtonWidth.current !== null) {
                    const dropdownWidth = dropdownRef.current.offsetWidth;
                    if (dropdownWidth > initialButtonWidth.current) {
                        buttonRef.current.style.width = `${dropdownWidth + 20}px`;
                    }
                }
            });
        } else {
            if (buttonRef.current && initialButtonWidth.current !== null) {
                buttonRef.current.style.width = `${initialButtonWidth.current}px`;
            }
        }
    }, [isDropdownOpen]);

    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            localStorage.setItem('theme', '');
            document.documentElement.classList.remove('dark');
        } else {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        }
    }

    return (
        <nav className="px-4 py-2 shadow-sm rounded flex flex-col gap-y-4">
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-x-4 items-center">
                    <Link to={"/"}>
                        <img src="/logo.png" alt="Logo" width={40} height={40} className="border-2 rounded-sm border-black"/>
                    </Link>
                    <h1 className="font-bold text-2xl font-ptserif">
                        {userInfo ? `Welcome ${userInfo.given_name}` : "Welcome to Rev's Grill"}
                    </h1>
                </div>
                <div className="flex items-center gap-x-6">
                    {userInfo ? (
                    <button
                        onClick={() => {
                        CookieManager.delete('tokenResponse');
                        navigate('/cashier/login');
                        }}
                        className="flex gap-x-2 items-center border-2 border-black dark:border-white hover:bg-black hover:text-white px-4 py-2 rounded-sm transition-all duration-300"
                    >
                        <img
                            src={userInfo.picture || "/icons/profile.png"} 
                            alt="Profile"
                            className="w-6 h-6"
                        />
                        <p className="font-bold text-lg font-ptserif">
                            {userInfo.name}
                        </p>
                    </button>
                    ) : (
                    routes.map((route, index:number) => 
                        <Link 
                            key={index}
                            to={route.path}
                            className="text-lg font-bold font-ptserif transition-all duration-300 hover:underline underline-offset-4"
                        >
                            {route.name}
                        </Link>
                    ))}
                    <button 
                        className="px-4 py-2 border-2 border-black dark:border-white rounded-sm text-lg font-bold font-ptserif transition-all duration-300 hover:bg-black hover:text-white"
                    >
                      <GoogleTranslate />
                    </button>
                    <button
                        aria-label="dark-mode"
                        className="p-2 border-2 border-black dark:border-white rounded-sm transition-all duration-300 hover:bg-black hover:text-white"
                        onClick={toggleTheme}
                    >
                        <FaMoon/>
                    </button>
                    <div className="relative">
                        <button
                            aria-label="dropdown-button"
                            ref={buttonRef}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="border-2 border-black dark:border-white px-4 py-2 ml-2 rounded-sm text-lg font-medium font-ptserif transition-all duration-300 flex items-center justify-center "
                        >
                            <span
                                className={`block transition-transform duration-300 ${isDropdownOpen ? 'rotate-45' : ''}`}
                                style={{ display: 'inline-block' }}
                            >
                                <GoPlus/>
                            </span>
                        </button>
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-2 py-2 w-auto bg-white shadow-xl border rounded-md transition-all duration-300"
                            >
                                <a
                                    href="/weather"
                                    className="block px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    Weather
                                </a>
                                <button
                                    onClick={enlargeText}
                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    Enlarge Text
                                </button>
                                <button
                                    onClick={resetTextSize}
                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    Reset Text Size
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {userInfo ? (
            <div className="flex gap-x-4 items-center">
                {routes.map((route, index:number) => 
                    <Link 
                        key={index}
                        to={route.path}
                        className="px-4 py-2 border-2 border-black dark:border-white rounded-sm text-lg font-bold font-ptserif transition-all duration-300 hover:bg-black hover:text-white"
                    >
                        {route.name}
                    </Link>
                )}
            </div>
            ) : (
                <></>
            )}
        </nav>
    )
}