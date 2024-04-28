import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Item, OrderType } from "../../types/dbTypes";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";

export default function AdminOrder() {

    const categories = ["Burger", "Chicken", "Side", "Salad", "Snack", "Beverage", "Dessert", "Seasonal"]

    const [items, setItems] = useState<Item[]>([]);
    const [allItems, setAllItems] = useState<Item[]>([]);
    const [order, setOrder] = useState<OrderType>({
        numItems: 0,
        orderInfo: "",
        itemToQuantity: new Map(),
        total: 0,
        date: new Date()
    });
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
            const data = await response.json();
            setAllItems(data);
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
            dateTime: order.date,
            status: "received"
        }
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/order/insert", {method: "POST",  body: JSON.stringify(body), headers: {"Content-Type": "application/json"}});
        const data = await response.json();
        if(data.success === true)
            alert("Order Successfully Processed!")
        else
            alert("Uh oh something went wrong :(")
    }

    function searchItem(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
        if (e.target.value === "") {
            setItems(allItems);
            return;
        }
        setItems(items.filter((item:Item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
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
                        onChange={searchItem}
                        value={searchTerm}
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

    return (
        <div className="flex flex-col gap-y-2">
            <h4 className="font-bold text-2xl font-ptserif">{title}</h4>
            <div>
                {items.map((item:Item) => {
                    
                    const [quantity, setQuantity] = useState<string>("0");

                    function increaseItem(price:number, name: string, id:number) {
                        setQuantity((prev) => (parseInt(prev) + 1).toString());
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
                        setQuantity((prev) => (parseInt(prev) - 1).toString());
                        setOrder({
                            ...order,
                            numItems: order.numItems - 1,
                            total: order.total - price,
                            orderInfo: order.orderInfo.replace(name + " ", ""),
                            itemToQuantity: order.itemToQuantity.set(id, order.itemToQuantity.get(id)! - 1)
                        })
                    }
                
                    function inputHandler(e: React.ChangeEvent<HTMLInputElement>, id: number, itemPrice: number, name: string) {
                        setQuantity(e.target.value);
                        const currentQty:number = (order.itemToQuantity.has(id) ? order.itemToQuantity.get(id)! : 0);
                        const input:string = e.target.value;
                        const value = (input === "") ? 0 : parseInt(e.target.value);
                        setOrder({
                            ...order,
                            numItems: order.numItems + value - currentQty,
                            total: order.total + itemPrice * value - itemPrice * currentQty,
                            orderInfo: order.orderInfo + name + "(" + value+")"+ (order.orderInfo === "" ? "," : ""),
                            itemToQuantity: order.itemToQuantity.set(id, value)
                        })
                    }

                    return (
                        <div key={item._id} className="grid grid-flow-col justify-start gap-8 font-ptserif text-lg">
                            <p className="w-4">{item._id}</p>
                            <p className="w-52">{item.name}</p>
                            <div className="flex gap-x-2 items-center font-bold">
                                <button
                                    type="button"
                                    onClick={() => decreaseItem(item.price, item.name, item._id)}
                                    className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center p-1"
                                >
                                    <FaMinus/>
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onBlur={() => {if (quantity === "" || parseInt(quantity) < 0) setQuantity("0");}}
                                    onChange={(e) => {
                                        if (parseInt(e.target.value) < 0) {
                                            setQuantity("0");
                                            return;
                                        }
                                        inputHandler(e, item._id, item.price, item.name); 
                                    }}
                                    className="py-1 font-semibold w-6 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
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
