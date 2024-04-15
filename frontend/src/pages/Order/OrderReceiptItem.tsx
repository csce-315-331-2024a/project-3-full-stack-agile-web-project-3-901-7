import { FaMinus, FaPlus } from "react-icons/fa";

interface OrderReceiptItemProps {
    id: number;
    itemPrice: number;
    name: string;
    desc: string;
    qty: number;
    picture: string;
    totalPrice: number;
    updateOrder: (id:number, name:string, price:number, action:string) => void;
}

export default function OrderReceiptItem({id, itemPrice, name, desc, qty, picture, totalPrice, updateOrder}: OrderReceiptItemProps) {
    return (
        <div className="w-[360px] h-24 flex items-center gap-x-4">
            <div className="flex justify-center items-center h-full w-32 aspect-video border-2 border-black rounded-md p-2">
                <img src={picture === "" ? "/no-image-icon.png" : picture} alt={`image of ${name}`} className="object-contain h-[100%] max-h-[100%]" />
            </div>
            <div className="flex flex-col h-full justify-between">
                <h4 className="font-bold text-base font-ptserif">{name}</h4>
                <p>{desc}</p>
                <div className="flex w-full justify-between mb-2 gap-x-4">
                    <div className="flex gap-x-2 items-center">
                        <button type="button" onClick={() => updateOrder(id, name, itemPrice, "add")} className="w-5 h-5 p-1 rounded-full border-2 border-black flex justify-center items-center"><FaPlus/></button>
                        <p className="font-bold font-inter">{qty}</p>
                        <button type="button" onClick={() => updateOrder(id, name, itemPrice, "subtract")} className="w-5 h-5 p-1 rounded-full border-2 border-black flex justify-center items-center"><FaMinus/></button>
                    </div>
                    <p className="font-bold font-ptserif">${Math.round(totalPrice*100)/100}</p>
                </div>
            </div>
        </div>
    )
}