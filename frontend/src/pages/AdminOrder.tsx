import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Item, OrderType } from "../types/dbTypes";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";

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

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
            const data = await response.json();
            setItems(data);
        }

        fetchItems();

    }, [])

    function mapToObj(map: Map<number, number>) {
        let obj = Object.create(null);
        for (let [k,v] of map) {
            obj[k] = v;
        }
        return obj;
    }

    async function sendOrder() {
        const body = {
            numItems: order.numItems,
            orderInfo: order.orderInfo,
            itemToQuantity: mapToObj(order.itemToQuantity),
            total: order.total,
            dateTime: order.date
        }
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/order/insert", {method: "POST",  body: JSON.stringify(body), headers: {"Content-Type": "application/json"}});
        const data = await response.json();
        if(data.success === true)
            alert("Order Successfully Processed!")
        else
            alert("Uh oh something went wrong :(")
    }

    return (
        <div className="w-full h-full p-8 flex flex-col gap-y-8">

            <Navbar/>

            <div className="mt-8 flex items-end gap-x-12">
                <div className="min-w-[320px] flex items-center border-b-2 border-black gap-x-4 px-4 py-2">
                    <FaSearch/>
                    <input
                        type="text"
                        placeholder="search item"
                        className="w-full px-2 py-1 font-ptserif text-xl"
                    />
                </div>
                <button
                    type="button"
                    onClick={sendOrder}
                    className="px-4 py-3 bg-black rounded-md font-ptserif font-lg text-white"
                >
                    submit order
                </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-16 pb-12">
                {categories.map((category, index) => {
                    return (
                        <AdminOrderItemContainer
                            key={index}
                            title={category}
                            items={items.filter((item:Item) => item.category === category)}
                            order={order}
                            setOrder={setOrder}
                        />
                    )
                })}
            </div>

        </div>
    )
}

interface AdminOrderItemContainerProps {
    title: string;
    items: Item[];
    order: OrderType;
    setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

function AdminOrderItemContainer({title, items, order, setOrder}: AdminOrderItemContainerProps) {

    function increaseItem(price:number, name: string, id:number) {
        setOrder({
            ...order,
            numItems: order.numItems + 1,
            total: order.total + price,
            orderInfo: order.orderInfo + name + (order.orderInfo === "" ? "," : ""),
            itemToQuantity: order.itemToQuantity.set(id, (order.itemToQuantity.has(id)) ? order.itemToQuantity.get(id)! + 1 : 1)
        })
    }

    function decreaseItem(price:number, name:string, id:number) {
        if (!order.itemToQuantity.has(id))
            return
        if (order.itemToQuantity.get(id)! <= 0)
            return
        setOrder({
            ...order,
            numItems: order.numItems - 1,
            total: order.total - price,
            orderInfo: order.orderInfo.replace(name + " ", ""),
            itemToQuantity: order.itemToQuantity.set(id, order.itemToQuantity.get(id)! - 1)
        })
    }

    return (
        <div className="flex flex-col gap-y-2">
            <h4 className="font-bold text-2xl font-ptserif">{title}</h4>
            <div>
                {items.map((item:Item) => {
                    return (
                        <div key={item._id} className="flex items-center gap-x-6 font-ptserif text-lg">
                            <p>{item.name}</p>
                            <div className="flex gap-x-2 items-center font-bold">
                                <button
                                    type="button"
                                    onClick={() => decreaseItem(item.price, item.name, item._id)}
                                    className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center p-1"
                                >
                                    <FaMinus/>
                                </button>
                                <p>
                                    {(order.itemToQuantity.has(item._id)) ? order.itemToQuantity.get(item._id) : 0}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => increaseItem(item.price, item.name, item._id)}
                                    className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center p-1"
                                >
                                    <FaPlus/>
                                </button>
                            </div>
                            <p className="font-bold">${item.price}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
