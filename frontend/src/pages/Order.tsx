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

export default function Order() {

    function callHelp() {
        console.log("fk u")
    }

    const [items, setItems] = useState<Item[]>([])

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
                category: "Burgers",
                ingredients: "Beef patty, cheese, lettuce, tomato, onion, pickles, ketchup, mayo",
                startdate: new Date(),
                enddate: new Date()
            }
        ]

        setItems(exampleData)

        // fetchItems()

    }, [])

    return (
        <div className="w-full h-full p-8 relative">
            
            <Navbar/>

            <div className="flex flex-wrap gap-x-6 mt-14">
                <OrderCategoryCard/>
                <OrderCategoryCard/>
                <OrderCategoryCard/>
                <button type="button" onClick={callHelp} className="px-4 py-3 rounded-md bg-[#FF4545] text-white font-bold font-inter hover:shadow-[inset_120px_0_0_0_rgba(255,255,255,1)] duration-500 border-2 border-[#FF4545] hover:text-[#FF4545]">
                        Call Help
                </button>
            </div>

            <div className="flex justify-between mt-9 w-full h-full">
                <div className="mt-9 flex flex-wrap gap-8">
                    {items.map((item, index) => <ItemCard key={index} itemid={item.itemid} name={item.name} price={item.price} category={item.category} ingredients={item.ingredients} startdate={item.startdate} enddate={item.enddate}/>)}
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                    <OrderReceipt/>
                </div>
            </div>


        </div>
    )
}

function OrderCategoryCard() {
    return (
    <div className="w-[136px] h-[112px] bg-black">
    </div>
    )
}

function OrderReceipt() {
    return (
        <div className="p-4 border-2 border-black rounded-md flex flex-col items-center gap-y-6">

            <h1 className="text-3xl font-bold font-ptserif">My <em>Order</em></h1>

            <div className="w-full flex flex-col gap-y-4">
                <OrderReceiptItem/>
                <OrderReceiptItem/>
                <OrderReceiptItem/>
            </div>

            <div className="w-full flex flex-col font-ptserif text-base">

                <div className="w-full px-4 py-2 flex justify-between items-center">
                    <p className="text-black/60">Total</p>
                    <p className="text-black">$69.69</p>
                </div>

                <div className="w-full px-4 py-2 flex justify-between items-center bg-black text-white rounded-md cursor-pointer duration-500 hover:bg-green-700">
                    <button type="button" onClick={() => alert("check out")}>Checkout</button>
                    <FaArrowRight/>
                </div>


            </div>

        </div>
    )
}

function OrderReceiptItem() {
    return (
        <div className="w-[360px] h-24 flex gap-x-4 bg-black">

        </div>
    )
}

function ItemCard({name, price} : Item) {
    return (
        <div className="w-[280px] h-[230px] relative rounded-md">
            <img src={""} alt="image of the item" width={280} height={196}/>
            
            <div className="mt-1 w-full flex justify-between items-center">
                <p>{name}</p>
                <p>${price}</p>
            </div>

        </div>
    )
}