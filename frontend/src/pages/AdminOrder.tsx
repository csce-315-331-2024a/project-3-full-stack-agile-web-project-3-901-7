import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Item, OrderType } from "../types/dbTypes";

export default function AdminOrder() {

    const categories = ["Burger", "Chicken", "Side", "Salad", "Snack", "Beverage", "Dessert", "Seasonal"]
    const [items, setItems] = useState<Item[]>([]);
    const [order, setOrder] = useState<OrderType>({
        numItems: 0,
        orderInfo: "",
        itemToQuantity: new Map(),
        total: 0,
        date: new Date()
    });
    const [currCategory, setCurrCategory] = useState<string>("Burger");

useEffect(() => {

        async function fetchItems() {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
        const data = await response.json();
        setItems(data);
        }

        fetchItems();

        }, [])

    return (
        <div className="w-full h-full p-8 flex flex-col gap-y-8">

            <Navbar/>

            <div className="flex items-end gap-x-12">
                <div className="border-b-2 border-black flex items-center gap-x-2 px-4 py-2 text-lg">
                    <FaSearch/>
                    <input 
                        type="text" 
                        placeholder="search item"
                        className="px-2 py-1 font-ptserif placeholder:text-black/60" 
                    />
                </div>
            
                <button
                    type="button"
                    onClick={() => console.log("btn")}
                    className={"bg-black rounded-md px-4 py-3 font-ptserif font-bold text-white text-base"}
                >
                    submit order
                </button>
            </div>

            <div className="flex flex-wrap gap-16">
                {categories.map((category:string) => {
                    const categoryItems:Item[] = items.filter((item) => item.category === category)
                    return <AdminOrderBlock title={category} items={categoryItems}/>
                })}
            </div>

        </div>
    )
}

interface AdminOrderBlockProps {
    title: string;
    items: Item[]; 
}

function AdminOrderBlock({title, items} : AdminOrderBlockProps) {

    return (
        <div>
            <h4 className="font-ptserif font-bold text-xl mb-2">{title}</h4>
            {items.map((item:Item) => {
                return (
                    <div className="flex gap-x-2 mb-1">
                        <p>{item.name}</p>
                        <button>0</button>
                        <p>{item.price}</p>
                    </div>
            )})}
        </div>
    )
}




