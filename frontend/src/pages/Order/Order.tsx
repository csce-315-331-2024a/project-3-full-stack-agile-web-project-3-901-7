import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { Item, OrderType } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";
import OrderCategoryCard from "./OrderCategoryCard";
import Loading from "../../components/Loading";

export default function Order() {

    const categories = [
        {name: "Burger", icon: "/icons/burger.png"},
        {name: "Chicken", icon: "/icons/chicken.svg"},
        {name: "Side", icon: "/icons/meal.svg"},
        {name: "Salad", icon: "/icons/salad.svg"},
        {name: "Snack", icon: "/icons/appetizer.svg"},
        {name: "Beverage", icon: "/icons/beverages.svg"},
        {name: "Dessert", icon: "/icons/treats.svg"},
        {name: "Seasonal", icon: "/icons/seasonal.svg"}
    ]

    const [items, setItems] = useState<Item[]>([]);
    const [order, setOrder] = useState<OrderType | null>(null);
    const [currCategory, setCurrCategory] = useState<string>("Burger");
    
    function callHelp() {
        console.log("asked for help");
    }

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
            const data = await response.json();
            setOrder(null);
            console.log(order);
            setItems(data);
        }

        fetchItems();

    }, [])

    return (
        <div className="w-full h-full p-8 relative flex flex-col">
            
            <Navbar/>

            {(items.length === 0) ? <Loading/> :
            <> 
                <div className="flex flex-wrap gap-x-6 mt-14">
                    {categories.map((category, index) => {
                        let isActive = false
                        if (category.name === currCategory)
                            isActive = true
                        return (
                            <OrderCategoryCard 
                                key={index} 
                                name={category.name} 
                                icon={category.icon}
                                setCurrentCategory={setCurrCategory}
                                active={isActive}
                            />
                        )
                    })}
                    <button 
                        type="button" 
                        onClick={callHelp} 
                        className="px-4 py-3 rounded-md bg-[#FF4545] text-white font-bold font-inter hover:shadow-[inset_120px_0_0_0_rgba(255,255,255,1)] duration-500 border-2 border-[#FF4545] hover:text-[#FF4545]">
                            Call Help
                    </button>
                </div>

                <div className="flex justify-between mt-9 w-full h-full">
                    <div className="mt-9 flex flex-wrap gap-8">
                        {items.map((item, index) => {
                            const today = new Date();
                            if (item.startDate != null && item.startDate <= today)
                                return
                            if (item.endDate != null && item.endDate >= today)
                                return
                            if (item.category !== currCategory)
                                return
                            return (
                                <ItemCard 
                                    key={index} 
                                    name={item.name} 
                                    price={item.price} 
                                />
                            )
                        })}
                    </div>
                    <div className="flex flex-col items-end justify-between h-full">
                        <OrderReceipt/>
                    </div>
                </div>
            </>
            }

        </div>
    )
}

function OrderReceipt() {
    return (
        <div className="p-4 border-2 border-black rounded-md flex flex-col items-center gap-y-6">

            <h1 className="text-3xl font-bold font-ptserif">My <em>Order</em></h1>

            <div className="w-full flex flex-col gap-y-4">
                <OrderReceiptItem/>
                <OrderReceiptItem/>
                <OrderReceiptItem/>
            </div>

            <div className="w-full flex flex-col font-ptserif text-base">

                <div className="w-full px-4 py-2 flex justify-between items-center">
                    <p className="text-black/60">Total</p>
                    <p className="text-black">$69.69</p>
                </div>

                <div className="w-full px-4 py-2 flex justify-between items-center bg-black text-white rounded-md cursor-pointer duration-500 hover:bg-green-700">
                    <button type="button" onClick={() => alert("check out")}>Checkout</button>
                    <FaArrowRight/>
                </div>


            </div>

        </div>
    )
}

function OrderReceiptItem() {
    return (
        <div className="w-[360px] h-24 flex gap-x-4 bg-black">

        </div>
    )
}

interface ItemCardProps {
    name: string;
    price: number;
}
function ItemCard({name, price} : ItemCardProps) {
    return (
        <div className="w-[280px] h-[230px] relative rounded-md">
            <img src={"/item-default-img.png"} alt="image of the item" width={280} height={196}/>
            
            <div className="mt-2 font-bold font-ptserif text-xl w-full flex justify-between items-center">
                <p>{name}</p>
                <p>${price}</p>
            </div>

        </div>
    )
}
