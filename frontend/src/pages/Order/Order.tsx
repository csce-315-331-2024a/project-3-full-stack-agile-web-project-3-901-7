import { useEffect, useState } from "react"
import { Item, OrderType } from "../../types/dbTypes";
import { defaultCategories, defaultOrder } from "../../types/defaults";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import OrderReceipt from "./OrderReceipt";
import Modal from "../../components/Modal";

export default function Order() {

    const categories = defaultCategories;
    const [items, setItems] = useState<Item[]>([]);
    const [order, setOrder] = useState<OrderType>(defaultOrder);
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

                <OrderHeader 
                    categories={categories} 
                    currCategory={currCategory} 
                    setCurrCategory={setCurrCategory}
                    setGetHelp={setGetHelp}
                />

                <div className="flex justify-between mt-9 w-full h-full md:flex-row flex-col gap-8">
                    
                    <OrderItems
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

            <Modal
                message={<p>An employee will be with you shortly.<br/>Please wait...</p>}
                open={getHelp}
                setOpen={setGetHelp}
            />

        </div>
    )
}