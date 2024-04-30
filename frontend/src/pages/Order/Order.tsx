import { createContext, useEffect, useState } from "react"
import { Item, OrderType } from "../../types/dbTypes";
import { defaultCategories, defaultOrder } from "../../types/defaults";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import OrderReceipt from "./OrderReceipt";
import Modal from "../../components/Modal";
import PageLayout from "../../layouts/PageLayout";

interface OrderContextProps {
    order: OrderType;
    addQty: (itemPrice: number, name: string, id: number) => void;
    subQty: (itemPrice: number, name: string, id: number) => void;
    inputHandler: (e: React.ChangeEvent<HTMLInputElement>, id: number, itemPrice: number, name: string) => void;
    clearOrder: () => void;
}

interface ModalContextProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalMsg: React.Dispatch<React.SetStateAction<string | JSX.Element>>;
}

export const OrderContext = createContext<OrderContextProps>({order: defaultOrder, addQty: () => {}, subQty: () => {}, inputHandler: () => {}, clearOrder: () => {}});
export const ModalContext = createContext<ModalContextProps>({setOpen: () => {}, setModalMsg: () => {}});

export default function Order() {

    const categories = defaultCategories;
    const [items, setItems] = useState<Item[]>([]);
    const [order, setOrder] = useState<OrderType>(defaultOrder);
    const [currCategory, setCurrCategory] = useState<string>("Burger");
    const [open, setOpen] = useState<boolean>(false);
    const [modalMsg, setModalMsg] = useState<string | JSX.Element>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAllAvailable");
            const data = await response.json();
            setItems(data);
            setIsLoading(false);
        }

        fetchItems();

    }, [])

    if (isLoading) {
        return <Loading/>;
    }

    function addQty(itemPrice: number, name: string, id: number) {
        setOrder({
            ...order,
            numItems: order.numItems + 1,
            total: order.total + itemPrice,
            orderInfo: order.orderInfo + name + (order.orderInfo === "" ? "," : ""),
            itemToQuantity: order.itemToQuantity.set(id, (order.itemToQuantity.has(id)) ? order.itemToQuantity.get(id)! + 1 : 1)
        });
    }

    function subQty(itemPrice: number, name: string, id: number) {
        if (order.itemToQuantity.get(id)! > 0) {
            setOrder({
                ...order,
                numItems: order.numItems - 1,
                total: order.total - itemPrice,
                orderInfo: order.orderInfo.replace(name + " ", ""),
                itemToQuantity: order.itemToQuantity.set(id, order.itemToQuantity.get(id)! - 1)
            })
        }
    }

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>, id: number, itemPrice: number, name: string) {
        const currentQty:number = (order.itemToQuantity.has(id) ? order.itemToQuantity.get(id)! : 0);
        const input:string = e.target.value;
        const value = (input === "") ? 0 : parseInt(e.target.value);
        setOrder({
            ...order,
            numItems: order.numItems + value - currentQty,
            total: order.total + itemPrice * value - itemPrice * currentQty,
            orderInfo: order.orderInfo + name + "(" + value+")"+ (order.orderInfo === "" ? "," : ""),
            itemToQuantity: order.itemToQuantity.set(id, value)
        })
    }

    function clearOrder() {
        setOrder({
            numItems: 0,
            total: 0,
            orderInfo: "",
            itemToQuantity: new Map<number, number>(),
            date: new Date()
        });
    }

    return (
        <PageLayout>
            
            <Navbar/>

            <OrderContext.Provider value={{order, addQty, subQty, inputHandler, clearOrder}}>
                <ModalContext.Provider value={{setOpen, setModalMsg}}>

                    <OrderHeader 
                        categories={categories} 
                        currCategory={currCategory} 
                        setCurrCategory={setCurrCategory}
                    />

                    <div className="flex justify-between mt-9 w-full h-full md:flex-row flex-col gap-8">
                        
                        <OrderItems
                            items={items} 
                            currCategory={currCategory}
                        />

                        <OrderReceipt
                            items={items}
                        />
                    
                    </div>

                </ModalContext.Provider>
            </OrderContext.Provider>

            <Modal
                message={modalMsg}
                open={open}
                setOpen={setOpen}
            />

        </PageLayout>
    )
}