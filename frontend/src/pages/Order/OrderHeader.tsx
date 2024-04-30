import React, { useContext } from "react";
import { ModalContext } from "./Order";

/**
 * Props for the OrderHeader component.
 */
interface OrderHeaderProps {
    categories: {name: string, icon: string}[];
    currCategory: string;
    setCurrCategory: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * The header component for the order page.
 * 
 * @param {OrderHeaderProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function OrderHeader({categories, currCategory, setCurrCategory}: OrderHeaderProps): JSX.Element {

    const {setOpen, setModalMsg} = useContext(ModalContext);

    /**
     * Fetches a help request from the backend.
     * 
     * @returns {Promise<any>} The response from the backend.
     * @throws {Error} If the request fails.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function fetchHelpRequest(): Promise<any> {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/requestHelp`, { method: "POST", });
        const status = await response.json();
        
        if (status.success)
            return status;
        throw Error("Failed to fetch help");
    }

    return (
        <div className="flex flex-wrap gap-6 mt-14 items-center">

            {categories.map((category, index) => {
                let isActive = false
                if (category.name === currCategory)
                    isActive = true
                return (
                    <OrderCategoryCard 
                        key={index} 
                        name={category.name} 
                        icon={category.icon}
                        setCurrentCategory={setCurrCategory}
                        active={isActive}
                    />
                )
            })}

            <button 
                type="button" 
                onClick={() => {
                    fetchHelpRequest()
                        .then(() => {
                            setOpen(true); 
                            setModalMsg(<p>An employee will be with you shortly.<br/>Please wait...</p>);
                        })
                        .catch(() => {
                            alert('Failed to request help');
                        })
                }} 
                className="w-fit h-fit px-4 py-3 rounded-md bg-[#FF4545] text-white font-bold font-inter hover:shadow-[inset_120px_0_0_0_rgba(255,255,255,1)] duration-500 border-2 border-[#FF4545] hover:text-[#FF4545]"
            >
                Call Help
            </button>

        </div>
    )
}

/**
 * Props for the OrderCategoryCard component.
 */
interface OrderCategoryCardProps {
    name: string;
    icon: string;
    setCurrentCategory: (category: string) => void;
    active: boolean;
}

/**
 * A card component for an order category.
 * 
 * @param {OrderCategoryCardProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function OrderCategoryCard({name, icon, active, setCurrentCategory}: OrderCategoryCardProps): JSX.Element {
    return (
    <button 
        className={`w-[136px] h-[112px] rounded-md flex flex-col justify-center items-center cursor-pointer border-2 hover:border-black/80 dark:hover:border-white/80 duration-300 ${(active) ? "shadow-lg" : "shadow-sm"}`}
        type="button" 
        onClick={() => setCurrentCategory(name)}
    >
        <div className="w-12 h-12 flex justify-center items-center p-2">
            <img src={icon} alt={`${name} icon`} width={120}/>
        </div>
        <p className="font-ptserif font-bold text-xl">
            {name}
        </p>
    </button>
    )
}
