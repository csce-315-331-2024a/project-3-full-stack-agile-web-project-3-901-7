import '../index.css';
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar";

interface Item {
    _id: number;
    name: string;
    price: number;
    category: string;
    ingredientInfo: string;
    startDate: Date;
    endDate: Date;
    picture: string;
    itemDesc: string;
}

export default function Menu() {
    const [menuItems, setItems] = useState<Item[]>([]);
    const [groupedItems, setGroupedItems] = useState<Record<string, Item[]>>({});

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAllAvailable");
            const data = await response.json();
            setItems(data);
        }

        fetchItems();

    }, [])

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
        <div className="w-full h-full p-8 relative dark:bg-black text-black dark:text-white border-black dark:border-white">
            {/* nav bar */}
            <Navbar/>
            
            <div className="border-4 border-black my-16 mx-8">
                {/* menu title */}
                <div className="flex flex-col items-center justify-center py-5">
                    <img src="/menu-ribbon-text.svg" alt="Menu Items" className="block my-4 w-1/2" />
                </div>
                
                {/* menu categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 px-16">
                    {Object.entries(groupedItems).map(([category, items], index) => (
                        <div key={category} className={`mb-4 ${index % 2 === 0 ? "pr-6 md:border-r md:border-black dark:md:border-white" : "pl-6 md:border-l md:border-black dark:md:border-white"}`}>
                            <h1 className="text-4xl font-ptserif font-bold py-4 px-2 border-y-2 dark:border-white border-black">{category}</h1>
                            <ul>
                                {items.map((item) => (
                                    <li key={item._id} className="py-2">
                                        <ItemCard name={item.name} price={item.price} itemDesc={item.itemDesc}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ItemCard({name, price, itemDesc} : Item) {
    return (
        <>
            <div className="flex justify-between">
                <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pl-2">{name}</div>
                <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pr-2">{price}</div>
            </div>
            <div className="text-gray-700 dark:text-gray-200 text-xl font-ptserif pt-2 pb-4 pr-64 pl-2">{itemDesc}</div>
        </>
    )
}

