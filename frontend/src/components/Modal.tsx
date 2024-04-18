interface ModalProps {
    message: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Modal({message, open, setOpen}: ModalProps) {
    return (
        <div className={`w-screen h-screen fixed left-0 top-0 bg-black/80 backdrop-blur-md flex justify-center items-center ${(open) ? "flex":"hidden"}`}>

            <div className="bg-white rounded-md p-4 flex flex-col font-ptserif font-bold text-lg gap-y-4">
                {message}
                <button 
                    type="button" 
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 font-inter text-white bg-red-400 rounded-md hover:bg-red-500 duration-500 transition"
                >
                    cancel
                </button>
            </div>

        </div>
    )
}