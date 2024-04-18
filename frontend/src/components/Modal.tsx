import { FaRegWindowClose } from "react-icons/fa";

interface ModalProps {
    message: string | JSX.Element;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({message, open, setOpen}: ModalProps) {
    return (
        <div className={`w-screen h-screen fixed left-0 top-0 bg-black/80 backdrop-blur-md flex justify-center items-center ${(open) ? "flex":"hidden"}`}>

            <div className="bg-white rounded-md p-4 flex flex-col font-ptserif font-bold text-lg gap-y-2">
                <button 
                    type="button" 
                    onClick={() => setOpen(false)}
                    className="self-end mb-2"
                >
                    <FaRegWindowClose size={24}/>
                </button>
                {message}
            </div>

        </div>
    )
}