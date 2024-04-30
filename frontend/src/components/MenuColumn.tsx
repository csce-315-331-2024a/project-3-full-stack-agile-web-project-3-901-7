import React from "react";
import { Item } from "../types/dbTypes";

interface Props {
  category: string;
  items: Item[];
}
/**
 * Menu Column Component 
 * @returns Menu Column
 */
const MenuColumn: React.FC<Props> = ({ category, items }) => {
  return (
    <div className="menu-column flex flex-col">
        <div className="w-full text-center">
            <h1 className="text-4xl font-ptserif font-bold py-4 px-2 border-y-2 border-black">{category}</h1>
        </div>
      <ul className="list-none p-0">
        {items.map((item) => (
          <li key={item._id} className="my-4">
            <ItemCard name={item.name} price={item.price} picture={item.picture} />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ItemCardProps {
  name: string;
  price: number;
  picture: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, price, picture }) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center"> {/* Container for image */}
        <img src={picture} alt={name} className="object-contain max-w-full max-h-full justify-center" />
      </div>
      <div className="text-2xl font-ptserif flex-grow px-2">{name}</div>
      <div className="text-2xl font-ptserif">{`$${price.toFixed(2)}`}</div>
    </div>
  );
};

export default MenuColumn;

