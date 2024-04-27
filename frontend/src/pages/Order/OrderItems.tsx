import { Item } from "../../types/dbTypes";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useContext, useState } from "react";
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

    const [quantity, setQuantity] = useState<number>(0);
    const {order, setOrder} = useContext(OrderContext);

    function addQuantity() {
        setQuantity((prev) => prev + 1);
        setOrder({
            ...order,
            numItems: order.numItems + 1,
            total: order.total + price,
            orderInfo: order.orderInfo + name + (order.orderInfo === "" ? "," : ""),
            itemToQuantity: order.itemToQuantity.set(id, (order.itemToQuantity.has(id)) ? order.itemToQuantity.get(id)! + 1 : 1)
        });
    }

    function subtractQuantity() {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
            setOrder({
                ...order,
                numItems: order.numItems - 1,
                total: order.total - price,
                orderInfo: order.orderInfo.replace(name + " ", ""),
                itemToQuantity: order.itemToQuantity.set(id, order.itemToQuantity.get(id)! - 1)
            })
        }
    }

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);
        if (value < 0) return;
        setQuantity(value);
        setOrder({
            ...order,
            numItems: order.numItems + value,
            total: order.total + price * value,
            orderInfo: order.orderInfo + name + "(" + value+")"+ (order.orderInfo === "" ? "," : ""),
            itemToQuantity: order.itemToQuantity.set(id, value)
        })
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
                <input
                    type="number"
                    value={(quantity) ? quantity : 0}
                    // value={order.itemToQuantity.has(id) ? order.itemToQuantity.get(id) : 0}
                    onChange={inputHandler}
                    className="py-1 font-semibold w-6 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
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
