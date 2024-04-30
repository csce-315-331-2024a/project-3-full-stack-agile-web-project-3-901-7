/**
 * Modal component props.
 */
interface ModalProps {
    message: string | JSX.Element;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Modal component.
 * @param message - The message to be displayed in the modal.
 * @param open - A boolean indicating whether the modal is open or not.
 * @param setOpen - A function to set the state of the modal.
 * @returns The Modal component.
 */
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