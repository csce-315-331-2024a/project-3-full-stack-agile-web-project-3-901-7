import '../index.css';
import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import Navbar from "../components/Navbar";

interface Item {
    itemid: number;
    name: string;
    price: number;
    category: string;
    ingredients: string;
    startdate: Date;
    enddate: Date;
}

export default function Menu() {
    const [menuItems, setItems] = useState<Item[]>([]);
    const [groupedItems, setGroupedItems] = useState<Record<string, Item[]>>({});

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/")
            const data = await response.json()
            setItems(data)
        }

        const exampleData = [
            {
                itemid: 1,
                name: "Cheeseburger",
                price: 5.99,
                category: "Burgers",
                ingredients: "Beef patty, cheese, lettuce, tomato, onion, pickles, ketchup, mayo",
                startdate: new Date(),
                enddate: new Date()
            },
            {
                itemid: 2,
                name: "Cheeseburger",
                price: 5.99,
                category: "Burgers",
                ingredients: "Beef patty, cheese, lettuce, tomato, onion, pickles, ketchup, mayo",
                startdate: new Date(),
                enddate: new Date()
            },
            {
                itemid: 3,
                name: "Cheeseburger",
                price: 5.99,
                category: "Sandwiches",
                ingredients: "Beef patty, cheese, lettuce, tomato, onion, pickles, ketchup, mayo",
                startdate: new Date(),
                enddate: new Date()
            },
            {
                itemid: 4,
                name: "Cheeseburger",
                price: 5.99,
                category: "Drinks",
                ingredients: "Beef patty, cheese, lettuce, tomato, onion, pickles, ketchup, mayo",
                startdate: new Date(),
                enddate: new Date()
            },
            {
                itemid: 4,
                name: "Cheeseburger",
                price: 5.99,
                category: "Meals",
                ingredients: "Beef patty, cheese, lettuce, tomato, onion, pickles, ketchup, mayo",
                startdate: new Date(),
                enddate: new Date()
            }
        ]

        setItems(exampleData)

        // fetchItems()

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
        <div className="w-full h-full p-8 relative">
            {/* nav bar */}
            <Navbar/>
            
            <div className="border-4 border-black my-16 mx-8">
                {/* menu title */}
                <div className="flex flex-col items-center justify-center py-5">
                    <img src="/menu-ribbon-text.svg" alt="Menu Items" className="block my-4 w-1/2" />
                </div>
                
                {/* menu categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-16">
                    {Object.entries(groupedItems).map(([category, items]) => (
                        <div key={category} className="mb-4">
                            <h1 className="text-4xl font-ptserif font-bold py-4 px-2 border-y-2 border-black">{category}</h1>
                            <ul className="divide-y divide-gray-300">
                                {items.map((item) => (
                                    <li key={item.itemid} className="py-2">
                                        <ItemCard itemid={item.itemid} name={item.name} price={item.price} category={item.category} ingredients={item.ingredients} startdate={item.startdate} enddate={item.enddate} />
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

function ItemCard({name, price, ingredients} : Item) {
    return (
        <>
            <div className="flex justify-between">
                <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pl-2">{name}</div>
                <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pr-2">{price}</div>
            </div>
            {ingredients && <div className="text-gray-700 text-xl font-ptserif pt-2 pb-4 pr-64 pl-2">{ingredients}</div>}
        </>
    )
}

