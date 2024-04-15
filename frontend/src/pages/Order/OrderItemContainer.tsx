import { Item, OrderType } from "../../types/dbTypes";
import OrderItemCard from "./OrderItemCard";

interface OrderItemContainerProps {
    items: Item[];
    currCategory: string;
    order: OrderType;
    updateOrder: (id:number, name:string, price:number, action:string) => void;
}

export default function OrderItemContainer({items, currCategory, order, updateOrder}: OrderItemContainerProps) {
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