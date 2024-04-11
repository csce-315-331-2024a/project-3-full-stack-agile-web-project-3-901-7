import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"

export default function Navbar() {
    function changeLang() {
        console.log("language change");
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const initialButtonWidth = useRef(null);

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    }

    useEffect(() => {
        if (buttonRef.current && initialButtonWidth.current === null) {
            initialButtonWidth.current = buttonRef.current.offsetWidth;
        }

        function handleClickOutside(event) {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
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
                if (dropdownRef.current && buttonRef.current) {
                    const dropdownWidth = dropdownRef.current.offsetWidth;
                    if (dropdownWidth > initialButtonWidth.current) {
                        buttonRef.current.style.width = `${
                            dropdownWidth + 20
                        }px`;
                    }
                }
            });
        } else {
            if (buttonRef.current) {
                buttonRef.current.style.width = `${initialButtonWidth.current}px`;
            }
        }
    }, [isDropdownOpen]);

    return (
        <nav className="text-black pb-2 flex justify-between items-center shadow-sm border-hidden rounded px-3">
            <div className="flex items-center flex-1">
                <Link to={"/"} className="square-black border-black border-[2px] rounded">
                    <img src="/logo.png" alt="Logo"></img>
                </Link>
                <span className="font-bold text-4xl ml-2 font-ptserif">
                    Welcome to Rev's Grill
                </span>
            </div>
            <div className="flex items-center justify-end flex-2">
                <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif transition-all duration-300">
                    <a href="/menu" className="hover:text-white">
                        view menu
                    </a>
                </button>
                <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif transition-all duration-300">
                    <a href="/order" className="hover:text-white">
                        start order
                    </a>
                </button>
                <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif transition-all duration-300">
                    <a href="/login" className="hover:text-white">
                        manager login
                    </a>
                </button>
                <button
                    onClick={changeLang}
                    className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif transition-all duration-300"
                >
                    EN
                </button>
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={toggleDropdown}
                        className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif transition-all duration-300"
                    >
                        <span
                            className={`block transition-transform duration-300 ${isDropdownOpen ? 'rotate-45' : ''}`}
                            style={{ display: 'inline-block' }}
                        >
                            +
                        </span>
                    </button>
                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 py-2 w-auto bg-white shadow-xl border rounded-md transition-all duration-300"
                        >
                            {/* TODO: perhaps have the + icon be a weather symbol icon of the current weather (possible via api). Dropdown menu will have: view weather forecast and "recommend me an item based on the weather" options */}
                            <a
                                href="/weather"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Weather
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Option 2
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                A Longer Option 3
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
