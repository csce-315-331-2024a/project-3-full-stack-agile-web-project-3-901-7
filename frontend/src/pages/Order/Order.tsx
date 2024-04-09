import { useEffect, useState } from "react"
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa"
import { Item, OrderType } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import OrderCategoryCard from "./OrderCategoryCard";
import OrderItemContainer from "./OrderItemContainer";

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
    
    function callHelp() {
        console.log("asked for help");
    }

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
                orderInfo: order.orderInfo + name + " ",
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
                        onClick={callHelp} 
                        className="px-4 py-3 rounded-md bg-[#FF4545] text-white font-bold font-inter hover:shadow-[inset_120px_0_0_0_rgba(255,255,255,1)] duration-500 border-2 border-[#FF4545] hover:text-[#FF4545]">
                            Call Help
                    </button>
                </div>

                <div className="flex justify-between mt-9 w-full h-full">
                    
                    <OrderItemContainer 
                        items={items} 
                        currCategory={currCategory}
                        updateOrder={updateOrder}
                    />

                    <OrderReceipt
                        items={items}
                        order={order}
                    />
                
                </div>
            </>
            }

        </div>
    )
}

interface OrderReceiptProps {
    order: OrderType;
    items: Item[];
}

function OrderReceipt({order, items}: OrderReceiptProps) {

    let receiptItem:any = []
    order.itemToQuantity.forEach((value, key) => {
        const itemName = items.map((item) => { if (item._id == key) return item.name }).filter((item) => item !== undefined).at(0)!;
        const itemPrice = items.map((item) => { if (item._id == key) return item.price}).filter((item) => item !== undefined).at(0)!;
        if (value != 0) {
            receiptItem.push({id: key, qty: value, name: itemName, price: value*itemPrice})
        }
    })

    return (
        <div className="min-w-[396px] p-4 border-2 border-black rounded-md flex flex-col items-center gap-y-6 h-fit">

            <h1 className="text-3xl font-bold font-ptserif">My <em>Order</em></h1>

            <div className="w-full flex flex-col gap-y-4">
                {
                    receiptItem.map((itemInfo:any) => {
                        return (
                            <OrderReceiptItem 
                                key={itemInfo.id}
                                name={itemInfo.name}
                                desc={""}
                                qty={itemInfo.qty}
                                totalPrice={itemInfo.price}
                            />
                        )})
                }
            </div>

            <div className="w-full flex flex-col font-ptserif text-base">

                <div className="w-full px-4 py-2 flex justify-between items-center">
                    <p className="text-black/60">Total</p>
                    <p className="text-black">${order.total}</p>
                </div>

                <div className="w-full px-4 py-2 flex justify-between items-center bg-black text-white rounded-md cursor-pointer duration-500 hover:bg-green-700">
                    <button type="button" onClick={() => alert("check out")}>Checkout</button>
                    <FaArrowRight/>
                </div>


            </div>

        </div>
    )
}

interface OrderReceiptItemProps {
    img?: string;
    name: string;
    desc: string;
    qty: number;
    totalPrice: number;
}

function OrderReceiptItem({img, name, desc, qty, totalPrice}: OrderReceiptItemProps) {
    return (
        <div className="w-[360px] h-24 flex items-center gap-x-4">
            <div className="w-32 aspect-video border-2 border-black rounded-md p-2 flex items-center justify-center">
                <img src={(img) ? img : "/item-default-img.png"} alt="image of item" className="w-full object-contain"/>
            </div>
            <div className="flex flex-col h-full justify-between">
                <h4 className="font-bold text-base font-ptserif">{name}</h4>
                <p>{desc}</p>
                <div className="flex w-full justify-between mb-2">
                    <div className="flex gap-x-2 items-center">
                        <button type="button" className="w-5 h-5 p-1 rounded-full border-2 border-black flex justify-center items-center"><FaPlus/></button>
                        <p className="font-bold font-inter">{qty}</p>
                        <button type="button" className="w-5 h-5 p-1 rounded-full border-2 border-black flex justify-center items-center"><FaMinus/></button>
                    </div>
                    <p className="font-bold font-ptserif">${Math.round(totalPrice*100)/100}</p>
                </div>
            </div>
        </div>
    )
}