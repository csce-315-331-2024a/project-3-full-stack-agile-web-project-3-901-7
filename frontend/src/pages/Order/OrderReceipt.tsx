import { FaArrowRight } from "react-icons/fa";
import { Item } from "../../types/dbTypes";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext } from "react";
import { ModalContext, OrderContext } from "./Order";

interface OrderReceiptProps {
    items: Item[];
}

// TODO: fix duplicate item in orderInfo

export default function OrderReceipt({items}: OrderReceiptProps) {

    const {setOpen, setModalMsg} = useContext(ModalContext);
    const {order} = useContext(OrderContext);

    let receiptItem:any = []
    order.itemToQuantity.forEach((value, key) => {
        const itemName = items.map((item) => { if (item._id == key) return item.name }).filter((item) => item !== undefined).at(0)!;
        const itemPrice = items.map((item) => { if (item._id == key) return item.price}).filter((item) => item !== undefined).at(0)!;
        const itemPicture = items.map((item) => { if (item._id == key) return item.picture}).filter((item) => item !== undefined).at(0)!;
        if (value != 0) {
            receiptItem.push({id: key, qty: value, name: itemName, itemPrice:itemPrice, price: value*itemPrice, picture: itemPicture})
        }
    })

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
            setModalMsg("Order successfully submitted!")
        else
        setModalMsg("Uh oh something went wrong :(, contact staff for help.")
        setOpen(true);
    }

    return (
        <div className="min-w-[320px] p-4 border-2 border-black rounded-md flex flex-col items-center gap-y-6 h-fit order-[-1] md:order-1">

            <h1 className="text-3xl font-bold font-ptserif">My <em>Order</em></h1>

            <div className="w-full flex flex-col gap-y-4">
                {
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
                    <p className="text-black/60">Total</p>
                    <p className="text-black">${Math.round(order.total*100)/100}</p>
                </div>

                <button
                    type="button"
                    onClick={sendOrder}
                    className="w-full px-4 py-2 flex justify-between items-center bg-black text-white rounded-md cursor-pointer duration-500 hover:bg-green-700">
                    <p>Checkout</p>
                    <FaArrowRight/>
                </button>


            </div>

        </div>
    )
}

interface OrderReceiptItemProps {
    id: number;
    itemPrice: number;
    name: string;
    desc: string;
    qty: number;
    picture: string;
    totalPrice: number;
}

function OrderReceiptItem({id, itemPrice, name, desc, qty, picture, totalPrice}: OrderReceiptItemProps) {
    
    const {order, setOrder} = useContext(OrderContext);
    
    function addQuantity() {
        setOrder({
            ...order,
            numItems: order.numItems + 1,
            total: order.total + itemPrice,
            orderInfo: order.orderInfo + name + (order.orderInfo === "" ? "," : ""),
            itemToQuantity: order.itemToQuantity.set(id, (order.itemToQuantity.has(id)) ? order.itemToQuantity.get(id)! + 1 : 1)
        });
    }

    function subtractQuantity() {
        if (qty > 0) {
            setOrder({
                ...order,
                numItems: order.numItems - 1,
                total: order.total - itemPrice,
                orderInfo: order.orderInfo.replace(name + " ", ""),
                itemToQuantity: order.itemToQuantity.set(id, order.itemToQuantity.get(id)! - 1)
            })
        }
    }

    return (
        <div className="w-[320px] h-24 flex items-center gap-x-4">
            <div className="flex justify-center items-center h-full w-32 aspect-video border-2 border-black rounded-md p-2">
                <img src={picture === "" ? "/no-image-icon.png" : picture} alt={`image of ${name}`} className="object-contain h-[100%] max-h-[100%]" />
            </div>
            <div className="flex flex-col h-full justify-between">
                <h4 className="font-bold text-base font-ptserif">{name}</h4>
                <p>{desc}</p>
                <div className="flex w-full justify-between mb-2 gap-x-4">
                    <div className="flex gap-x-2 items-center">
                        <button type="button" onClick={addQuantity} className="w-5 h-5 p-1 rounded-full border-2 border-black flex justify-center items-center"><FaPlus/></button>
                        <p className="font-bold font-inter">{qty}</p>
                        <button type="button" onClick={subtractQuantity} className="w-5 h-5 p-1 rounded-full border-2 border-black flex justify-center items-center"><FaMinus/></button>
                    </div>
                    <p className="font-bold font-ptserif">${Math.round(totalPrice*100)/100}</p>
                </div>
            </div>
        </div>
    )
}