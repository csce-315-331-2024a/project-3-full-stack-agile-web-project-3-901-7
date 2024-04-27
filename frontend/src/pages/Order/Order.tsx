import { createContext, useEffect, useState } from "react"
import { Item, OrderType } from "../../types/dbTypes";
import { defaultCategories, defaultOrder } from "../../types/defaults";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import OrderReceipt from "./OrderReceipt";
import Modal from "../../components/Modal";

interface OrderContextProps {
    order: OrderType;
    setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

interface ModalContextProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalMsg: React.Dispatch<React.SetStateAction<string | JSX.Element>>;
}

export const OrderContext = createContext<OrderContextProps>({order: defaultOrder, setOrder: () => {}});
export const ModalContext = createContext<ModalContextProps>({setOpen: () => {}, setModalMsg: () => {}});

export default function Order() {

    const categories = defaultCategories;
    const [items, setItems] = useState<Item[]>([]);
    const [order, setOrder] = useState<OrderType>(defaultOrder);
    const [currCategory, setCurrCategory] = useState<string>("Burger");
    const [open, setOpen] = useState<boolean>(false);
    const [modalMsg, setModalMsg] = useState<string | JSX.Element>("");

    useEffect(() => {

        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
            const data = await response.json();
            setItems(data);
        }

        fetchItems();

    }, [])

    return (
        <div className="w-full h-full p-8 relative flex flex-col">
            
            <Navbar/>

            <OrderContext.Provider value={{order, setOrder}}>
                <ModalContext.Provider value={{setOpen, setModalMsg}}>
                {(items.length === 0) ? <Loading/> :
                <> 

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
                </>
                }
                </ModalContext.Provider>
            </OrderContext.Provider>

            <Modal
                message={modalMsg}
                open={open}
                setOpen={setOpen}
            />

        </div>
    )
}