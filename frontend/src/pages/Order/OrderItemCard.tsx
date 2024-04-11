import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";

interface ItemCardProps {
    id: number;
    name: string;
    price: number;
    updateOrder: (id:number, name:string, price:number, action:string) => void;
}

export default function OrderItemCard({id, name, price, updateOrder} : ItemCardProps) {

    const [quantity, setQuantity] = useState<number>(0);

    function addQuantity() {
        setQuantity((prev) => prev + 1);
        updateOrder(id, name, price, "add");
    }

    function subtractQuantity() {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
            updateOrder(id, name, price, "subtract");
        }
    }

    return (
        <div className="w-[280px] h-[230px] relative rounded-md">

            <div className="absolute left-4 top-4 flex flex-col items-center">
                <button 
                    type="button"
                    onClick={addQuantity}
                    className="p-1 border-2 border-black text-black rounded-md hover:bg-black duration-300 hover:text-white"
                >
                    <FaPlus/>
                </button>
                <p className="py-1 font-semibold font-inter">
                    {quantity}
                </p>
                <button
                    type="button"
                    onClick={subtractQuantity}
                    className="p-1 border-2 border-black text-black rounded-md hover:bg-black duration-300 hover:text-white"    
                >
                    <FaMinus/>
                </button>
            </div>

            <img src={"/item-default-img.png"} alt="image of the item" width={280} height={196} className="border-2 p-4 rounded-md"/>
            
            <div className="mt-2 font-bold font-ptserif text-xl w-full flex justify-between items-center">
                <p>{name}</p>
                <p>${price}</p>
            </div>

        </div>
    )
}
