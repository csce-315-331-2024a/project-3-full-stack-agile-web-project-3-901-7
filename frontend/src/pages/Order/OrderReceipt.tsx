import { FaArrowRight } from "react-icons/fa";
import { Item, OrderType } from "../../types/dbTypes";
import OrderReceiptItem from "./OrderReceiptItem";

interface OrderReceiptProps {
    order: OrderType;
    items: Item[];
}

export default function OrderReceipt({order, items}: OrderReceiptProps) {

    let receiptItem:any = []
    order.itemToQuantity.forEach((value, key) => {
        const itemName = items.map((item) => { if (item._id == key) return item.name }).filter((item) => item !== undefined).at(0)!;
        const itemPrice = items.map((item) => { if (item._id == key) return item.price}).filter((item) => item !== undefined).at(0)!;
        if (value != 0) {
            receiptItem.push({id: key, qty: value, name: itemName, price: value*itemPrice})
        }
    })

    return (
        <div className="min-w-[396px] p-4 border-2 border-black rounded-md flex flex-col items-center gap-y-6 h-fit order-[-1] md:order-1">

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
                    <p className="text-black">${Math.round(order.total*100)/100}</p>
                </div>

                <div className="w-full px-4 py-2 flex justify-between items-center bg-black text-white rounded-md cursor-pointer duration-500 hover:bg-green-700">
                    <button type="button" onClick={() => alert("check out")}>Checkout</button>
                    <FaArrowRight/>
                </div>


            </div>

        </div>
    )
}