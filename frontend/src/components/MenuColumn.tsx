import React from "react";
import { Item } from "./Menu";

interface Props {
    category: string;
    items: Item[];
}

const MenuColumn: React.FC<Props> = ({ category, items }) => {
    return (
        <div className="menu-column">
            <h1 className="text-4xl font-ptserif font-bold py-4 px-2 border-y-2 border-black">{category}</h1>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        <ItemCard name={item.name} price={item.price} picture={item.picture}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface ItemCardProps {
    name: string;
    price: number;
    picture: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, price, picture}) => {
    return (
        <div className="flex justify-between">
            <img src={picture} alt={name} className="w-20 h-20 object-cover" style={{ width: "80px", height: "80px" }} />
            <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pl-2">{name}</div>
            <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pr-2">{price}</div>
        </div>
    );
}

export default MenuColumn;
