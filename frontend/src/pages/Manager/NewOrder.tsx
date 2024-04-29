import { useEffect, useState } from "react";
import { Item, OrderType } from "../../types/dbTypes";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";

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
    const [speedOrderId, setSpeedOrderId] = useState<string>("");
    const [speedOrderQty, setSpeedOrderQty] = useState<string>("");

    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('cashier')
            .then(setUserProfile)
            .catch(console.error);
    }, [])

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAllAvailable");
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

    function addItemToOrder(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // get values from form
        const id = parseInt(speedOrderId);
        const qty = parseInt(speedOrderQty);

        // check if item exists
        const exists = order.itemToQuantity.has(id);
        if (exists) {
            // if item exists, update quantity
            const currentQty = order.itemToQuantity.get(id)!;
            setOrder({
                ...order,
                numItems: order.numItems + qty - currentQty,
                total: order.total + allItems.find((item:Item) => item._id === id)!.price * qty - allItems.find((item:Item) => item._id === id)!.price * currentQty,
                orderInfo: order.orderInfo + allItems.find((item:Item) => item._id === id)!.name + "(" + qty + ")" + (order.orderInfo === "" ? "," : ""),
                itemToQuantity: order.itemToQuantity.set(id, qty)
            })
        } else {
            // if item doesn't exist, add item to order
            setOrder({
                ...order,
                numItems: order.numItems + qty,
                total: order.total + allItems.find((item:Item) => item._id === id)!.price * qty,
                orderInfo: order.orderInfo + allItems.find((item:Item) => item._id === id)!.name + "(" + qty + ")" + (order.orderInfo === "" ? "," : ""),
                itemToQuantity: order.itemToQuantity.set(id, qty)
            })
        }
        
        // reset form
        setSpeedOrderId("");
        setSpeedOrderQty("");
    }

    return (
        <div className="w-full h-full p-8 flex flex-col gap-y-8">
            {userProfile && <Navbar userInfo={userProfile} userType="cashier" />}

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

            <form onSubmit={(e) => {addItemToOrder(e)}} className="flex gap-4 flex-col justify-center">
                <label className="font-semibold text-lg">Quick Order Station</label>
                <div className="flex items-center gap-x-4">
                    <label className="font-semibold text-lg">Item ID</label>
                    <input
                        type="number"
                        value={speedOrderId}
                        placeholder={"Enter item id to quickly order..."}
                        onChange={(e) => { 
                            if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > allItems.length){
                                setSpeedOrderId("1")
                                return
                            }
                            setSpeedOrderId(e.target.value)
                        }}
                        className="py-1 px-2 font-semibold w-64 text-lg border-2 border-black"
                        required
                    />
                </div>
                <div className="flex items-center gap-x-4">
                    <label className="font-semibold text-lg">Quantity</label>
                    <input
                        type="number"
                        value={speedOrderQty}
                        placeholder={"Enter quantity..."}
                        onChange={(e) => {
                            if (parseInt(e.target.value) < 0) {
                                setSpeedOrderQty("0");
                                return;
                            }
                            setSpeedOrderQty(e.target.value)
                        }}
                        className="py-1 px-2 font-semibold w-64 text-lg border-2 border-black"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-fit px-4 py-2 bg-black text-white rounded-md font-ptserif"  
                >
                    add
                </button>
            </form>

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
                {items.map((item:Item) =>
                    <AdminOrderItem key={item._id} item={item} order={order} setOrder={setOrder}/>
                )}
            </div>
        </div>
    )
}

interface AdminOrderItem {
    item: Item;
    order: OrderType;
    setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

function AdminOrderItem({item, order, setOrder}: AdminOrderItem) {

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
}