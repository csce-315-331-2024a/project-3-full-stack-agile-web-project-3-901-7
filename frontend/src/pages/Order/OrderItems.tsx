import { Item } from "../../types/dbTypes";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "./Order";

interface OrderItemContainerProps {
    items: Item[];
    currCategory: string;
}

export default function OrderItems({items, currCategory}: OrderItemContainerProps) {
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
}

function OrderItemCard({id, name, price, picture} : ItemCardProps) {

    const {order, addQty, subQty, inputHandler} = useContext(OrderContext);
    const [quantity, setQuantity] = useState<string>((order.itemToQuantity.has(id) ? order.itemToQuantity.get(id)! : 0).toString());

    useEffect(() => {
        setQuantity((order.itemToQuantity.has(id) ? order.itemToQuantity.get(id)! : 0).toString())
    }, [order])

    return (
        <div className="w-[280px] h-[280px] relative rounded-md bg-white shadow-md dark:bg-black dark:border-white dark:border-2">

            <div className="absolute left-4 top-4 flex flex-col items-center bg-white dark:bg-black rounded-md">
                <button 
                    type="button"
                    onClick={() => {addQty(price, name, id); setQuantity((prev) => (parseInt(prev) + 1).toString());}}
                    className="p-1 border-2 border-black dark:border-white text-black dark:text-white font-ptserif rounded-md hover:bg-black duration-300 hover:text-white"
                >
                    <FaPlus />
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
                        inputHandler(e, id, price, name); 
                        setQuantity(e.target.value);
                    }}
                    className="py-1 font-semibold w-6 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:bg-black dark:text-white"
                />
                <button
                    type="button"
                    onClick={() => {
                        subQty(price, name, id); 
                        setQuantity((prev) => {
                            if (parseInt(prev) > 0) return (parseInt(prev) - 1).toString();
                            return prev;
                        })
                    }}
                    className="p-1 border-2 border-black dark:border-white text-black dark:text-white font-ptserif rounded-md hover:bg-black duration-300 hover:text-white"
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
