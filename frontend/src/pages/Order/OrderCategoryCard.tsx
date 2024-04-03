interface OrderCategoryCardProps {
    name: string;
    icon: string;
    setCurrentCategory: (category: string) => void;
    active: boolean;
}

export default function OrderCategoryCard({name, icon, active, setCurrentCategory}: OrderCategoryCardProps) {
    return (
    <button 
        className={`w-[136px] h-[112px] rounded-md flex flex-col justify-center items-center cursor-pointer border-2 hover:border-black/80 duration-300 ${(active) ? "shadow-lg" : "shadow-sm"}`}
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
