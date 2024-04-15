import { useEffect, useState } from "react"
import { Item, OrderType } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import OrderCategoryCard from "./OrderCategoryCard";
import OrderItemContainer from "./OrderItemContainer";
import OrderReceipt from "./OrderReceipt";

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
    const [order, setOrder] = useState<OrderType>({
        numItems: 0,
        orderInfo: "",
        itemToQuantity: new Map(),
        total: 0,
        date: new Date()
    });
    const [currCategory, setCurrCategory] = useState<string>("Burger");
    const [getHelp, setGetHelp] = useState<boolean>(false);

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
            const data = await response.json();
            setItems(data);
        }

        fetchItems();

    }, [])

    function updateOrder(id:number, name:string, price:number, action: string) {
        if (action === "add") {
            setOrder({
                ...order,
                numItems: order.numItems + 1,
                total: order.total + price,
                orderInfo: order.orderInfo + name + (order.orderInfo === "" ? "," : ""),
                itemToQuantity: order.itemToQuantity.set(id, (order.itemToQuantity.has(id)) ? order.itemToQuantity.get(id)! + 1 : 1)
            });
        } else {
            setOrder({
                ...order,
                numItems: order.numItems - 1,
                total: order.total - price,
                orderInfo: order.orderInfo.replace(name + " ", ""),
                itemToQuantity: order.itemToQuantity.set(id, order.itemToQuantity.get(id)! - 1)
            })
        }
    }

    return (
        <div className="w-full h-full p-8 relative flex flex-col">
            
            <Navbar/>

            {(items.length === 0) ? <Loading/> :
            <> 
                <div className="flex flex-wrap gap-6 mt-14">
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
                        onClick={() => setGetHelp(true)} 
                        className="px-4 py-3 rounded-md bg-[#FF4545] text-white font-bold font-inter hover:shadow-[inset_120px_0_0_0_rgba(255,255,255,1)] duration-500 border-2 border-[#FF4545] hover:text-[#FF4545]">
                            Call Help
                    </button>
                </div>

                <div className="flex justify-between mt-9 w-full h-full md:flex-row flex-col gap-8">
                    
                    <OrderItemContainer 
                        items={items} 
                        currCategory={currCategory}
                        order={order}
                        updateOrder={updateOrder}
                    />

                    <OrderReceipt
                        items={items}
                        order={order}
                        updateOrder={updateOrder}
                    />
                
                </div>
            </>
            }

            <div className={`w-screen h-screen fixed left-0 top-0 bg-black/80 backdrop-blur-md flex justify-center items-center ${(getHelp) ? "flex":"hidden"}`}>


                <div className="bg-white rounded-md p-4 flex flex-col font-ptserif font-bold text-lg gap-y-4">
                    An employee will be with you shortly.
                    <br/>
                    Please wait...
                    <button 
                        type="button" 
                        onClick={() => setGetHelp(false)}
                        className="px-3 py-2 font-inter text-white bg-red-400 rounded-md hover:bg-red-500 duration-500 transition"
                    >
                        cancel
                    </button>
                </div>

            </div>

        </div>
    )
}