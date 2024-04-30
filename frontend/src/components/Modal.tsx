interface ModalProps {
    message: string | JSX.Element;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({message, open, setOpen}: ModalProps) {
    return (
        <div className={`w-screen h-screen fixed left-0 top-0 bg-black/80 backdrop-blur-md flex justify-center items-center ${(open) ? "flex":"hidden"}`}>

            <div className="bg-white rounded-md p-4 flex flex-col font-ptserif font-bold text-lg gap-y-2 text-black ">
                {message}
                <button 
                    type="button" 
                    onClick={() => setOpen(false)}
                    className="border-2 rounded-md px-4 py-1 border-black mt-2 text-lg font-ptserif font-bold hover:bg-black hover:text-white duration-500 cursor-pointer"
                >
                    close
                </button>
            </div>

        </div>
    )
}