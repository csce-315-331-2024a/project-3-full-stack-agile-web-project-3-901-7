export interface IConfirmationPopupProps {
    active: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Confirmation  component
 * @param props 
 * @returns confirmation
 */
export const ConfirmationPopup : React.FC<IConfirmationPopupProps> = (props) => {
    return (props.active &&
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-lg mb-4">{props.message}</p>
                <div className="flex flex-row justify-center">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={props.onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}