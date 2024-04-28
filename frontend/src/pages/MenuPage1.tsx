import React, { useEffect, useState } from "react";
import MenuColumn from "../components/MenuColumn";
import { Item } from "./Menu";

const MenuPage1: React.FC = () => {
    const [menuItems, setItems] = useState<Item[]>([]);
    const [groupedItems, setGroupedItems] = useState<Record<string, Item[]>>({});

    useEffect(() => {
        // Fetch data and group items
        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
            const data = await response.json();
            setItems(data);
        }

        fetchItems();
    }, []);

    useEffect(() => {
        // Group items by category
        const grouped = menuItems.reduce((acc: Record<string, Item[]>, item: Item) => {
            acc[item.category] = acc[item.category] || [];
            acc[item.category].push(item);
            return acc;
        }, {});

        setGroupedItems(grouped);
    }, [menuItems]);
    
    return (
        <div className="w-full h-full p-8 overflow-hidden">
            <div className="flex flex-col items-center justify-center">
                <img src="/revs-ribbon.svg" alt="Menu Items" className="block my-4 w-1/2 h-[5.75rem]" />
            </div>
            <div className="menu-boards grid grid-cols-3 gap-4 my-5 mx-8">
                {Object.entries(groupedItems).map(([category, items], index) => (
                    index % 3 === 0 && (
                        <div key={category} className="border-4 border-black">
                            <MenuColumn category={category} items={items} />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default MenuPage1;

