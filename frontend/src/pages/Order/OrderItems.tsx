import { Item, OrderType } from "../../types/dbTypes";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";

interface OrderItemContainerProps {
    items: Item[];
    currCategory: string;
    order: OrderType;
    updateOrder: (id:number, name:string, price:number, action:string) => void;
}

export default function OrderItems({items, currCategory, order, updateOrder}: OrderItemContainerProps) {
    return (
        <div className="flex gap-8 flex-wrap h-fit">
            {items.map((item, index) => {
                if (item.category !== currCategory) return;

                return (
                    <OrderItemCard 
                        key={index} 
                        id={item._id}
                        name={item.name} 
                        price={item.price} 
                        picture={item.picture}
                        order={order}
                        updateOrder={updateOrder}
                    />
                )
            })}
        </div>
    )
}

interface ItemCardProps {
    id: number;
    name: string;
    price: number;
    picture: string;
    order: OrderType;
    updateOrder: (id:number, name:string, price:number, action:string) => void;
}

function OrderItemCard({id, name, price, picture, order, updateOrder} : ItemCardProps) {
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
        <div className="w-[280px] h-[280px] relative rounded-md bg-white shadow-md">

            <div className="absolute left-4 top-4 flex flex-col items-center bg-white rounded-md">
                <button 
                    type="button"
                    onClick={addQuantity}
                    className="p-1 border-2 border-black text-black font-ptserif rounded-md hover:bg-black duration-300 hover:text-white"
                >
                    <FaPlus />
                </button>
                <p className="py-1 font-semibold">
                    {
                        order.itemToQuantity.has(id) ? order.itemToQuantity.get(id) : 0
                    }
                </p>
                <button
                    type="button"
                    onClick={subtractQuantity}
                    className="p-1 border-2 border-black text-black font-ptserif rounded-md hover:bg-black duration-300 hover:text-white"
                >
                    <FaMinus />
                </button>
            </div>

            <div className="flex justify-center items-center h-full">
                <img src={picture === "" ? "/no-image-icon.png" : picture} alt={`image of ${name}`} className="object-contain h-[60%] max-h-[60%]" />
            </div>

            <div className="absolute bottom-0 w-full px-4 pb-2 flex justify-between items-center">
                <p className="font-ptserif text-xl">{name}</p>
                <p className="font-ptserif text-xl">${price.toFixed(2)}</p>
            </div>

        </div>
    );
}
