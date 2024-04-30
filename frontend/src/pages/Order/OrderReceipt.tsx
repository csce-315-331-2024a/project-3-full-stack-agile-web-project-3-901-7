import { FaArrowRight } from "react-icons/fa";
import { Item } from "../../types/dbTypes";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ModalContext, OrderContext } from "./Order";

/**
 * Props for the OrderReceipt component.
 */
interface OrderReceiptProps {
    items: Item[];
}

/**
 * Renders the order receipt.
 * @param items - The list of items in the order.
 * @returns The rendered OrderReceipt component.
 */
export default function OrderReceipt({items}: OrderReceiptProps) {

    const {setOpen, setModalMsg} = useContext(ModalContext);
    const {order, clearOrder} = useContext(OrderContext);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const receiptItem:any = []
    order.itemToQuantity.forEach((value, key) => {
        const itemName = items.map((item) => { if (item._id == key) return item.name }).filter((item) => item !== undefined).at(0)!;
        const itemPrice = items.map((item) => { if (item._id == key) return item.price}).filter((item) => item !== undefined).at(0)!;
        const itemPicture = items.map((item) => { if (item._id == key) return item.picture}).filter((item) => item !== undefined).at(0)!;
        if (value != 0) {
            receiptItem.push({id: key, qty: value, name: itemName, itemPrice:itemPrice, price: value*itemPrice, picture: itemPicture})
        }
    })

    /**
     * Converts a Map to an object.
     * @param map - The Map to convert.
     * @returns The converted object.
     */
    function mapToObj(map: Map<number, number>) {
        const obj = Object.create(null);
        for (const [k,v] of map) {
            obj[k] = v;
        }
        return obj;
    }

    /**
     * Sends the order to the backend.
     */
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
        if(data.success === true) {
            setModalMsg("Order successfully submitted!")
            clearOrder()
        }
        else {
            setModalMsg("Uh oh something went wrong :(, contact staff for help.")
        }
        setOpen(true);
    }

    return (
        <div className="min-w-[320px] p-4 border-2 border-black dark:border-white rounded-md flex flex-col items-center gap-y-6 h-fit order-[-1] md:order-1">

            <h1 className="text-3xl font-bold font-ptserif">My <em>Order</em></h1>

            <div className="w-full flex flex-col gap-y-4">
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    receiptItem.map((itemInfo:any) => {
                        return (
                            <OrderReceiptItem 
                                key={itemInfo.id}
                                id={itemInfo.id}
                                itemPrice={itemInfo.itemPrice}
                                name={itemInfo.name}
                                desc={""}
                                qty={itemInfo.qty}
                                picture={itemInfo.picture}
                                totalPrice={itemInfo.price}
                            />
                        )})
                }
            </div>

            <div className="w-full flex flex-col font-ptserif text-base">

                <div className="w-full px-4 py-2 flex justify-between items-center">
                    <p className="text-black/60 dark:text-white/60">Total</p>
                    <p className="text-black dark:text-white">${Math.round(order.total*100)/100}</p>
                </div>

                <button
                    type="button"
                    onClick={sendOrder}
                    className="w-full px-4 py-2 flex justify-between items-center bg-black dark:bg-white text-white  dark:text-black rounded-md cursor-pointer duration-500 hover:bg-green-700">
                    <p>Checkout</p>
                    <FaArrowRight/>
                </button>


            </div>

        </div>
    )
}

/**
 * Props for the OrderReceiptItem component.
 */
interface OrderReceiptItemProps {
    id: number;
    itemPrice: number;
    name: string;
    desc: string;
    qty: number;
    picture: string;
    totalPrice: number;
}

/**
 * Renders an item in the order receipt.
 * @param id - The ID of the item.
 * @param itemPrice - The price of the item.
 * @param name - The name of the item.
 * @param desc - The description of the item.
 * @param qty - The quantity of the item.
 * @param picture - The picture of the item.
 * @param totalPrice - The total price of the item.
 * @returns The rendered OrderReceiptItem component.
 */
function OrderReceiptItem({id, itemPrice, name, desc, qty, picture, totalPrice}: OrderReceiptItemProps) {
    
    const {order, addQty, subQty, inputHandler} = useContext(OrderContext);
    const [quantity, setQuantity] = useState<string>((order.itemToQuantity.has(id) ? order.itemToQuantity.get(id)! : 0).toString());

    useEffect(() => {
        setQuantity(qty.toString());
    }, [order])

    return (
        <div className="w-[320px] h-24 flex items-center gap-x-4">
            <div className="flex justify-center items-center h-full w-32 aspect-video border-2 border-black dark:border-white rounded-md p-2">
                <img src={picture === "" ? "/no-image-icon.png" : picture} alt={`image of ${name}`} className="object-contain h-[100%] max-h-[100%]" />
            </div>
            <div className="w-full gap-y-2 flex flex-col h-full justify-between">
                <h4 className="font-bold text-base font-ptserif">{name}</h4>
                <p>{desc}</p>
                <div className="flex w-fit items-center justify-between mb-2 gap-x-4">
                    <div className="flex gap-x-2 items-center">
                        <button 
                            type="button" 
                            onClick={() => {
                                addQty(itemPrice, name, id); 
                                setQuantity((prev) => (parseInt(prev) + 1).toString());
                            }} 
                            className="w-5 h-5 p-1 rounded-full border-2 border-black dark:border-white flex justify-center items-center"
                        >
                            <FaPlus/>
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
                                if (e.target.value === "") {
                                    setQuantity("");
                                    return;
                                }
                                inputHandler(e, id, itemPrice, name)
                            }}
                            className="py-1 font-bold font-inter w-6 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:bg-black dark:text-white"
                        />
                        <button 
                            type="button" 
                            onClick={() => {
                                subQty(itemPrice, name, id);
                                setQuantity((prev) => {
                                    if (parseInt(prev) > 0) return (parseInt(prev) - 1).toString();
                                    return prev;
                                })
                            }} 
                            className="w-5 h-5 p-1 rounded-full border-2 border-black dark:border-white flex justify-center items-center">
                                <FaMinus/>
                        </button>
                    </div>
                    <p className="font-bold font-ptserif">${Math.round(totalPrice*100)/100}</p>
                </div>
            </div>
        </div>
    )
}