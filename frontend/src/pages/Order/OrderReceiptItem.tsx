import { FaMinus, FaPlus } from "react-icons/fa";

interface OrderReceiptItemProps {
    img?: string;
    name: string;
    desc: string;
    qty: number;
    totalPrice: number;
}

export default function OrderReceiptItem({img, name, desc, qty, totalPrice}: OrderReceiptItemProps) {
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