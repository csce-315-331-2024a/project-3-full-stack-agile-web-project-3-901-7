import React from 'react';

interface ConfirmationPopupProps {
    action: 'add' | 'edit';
    onClose: () => void;
}

/**
 *  Confirmation popup component
 * @returns Confirmation popup
 */
const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ action, onClose }) => {
    let message = '';
    if (action === 'add') {
        message = 'Ingredient added!';
    } else if (action === 'edit') {
        message = 'Ingredient edited!';
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg border border-gray-300 shadow-lg">
            <p>{message}</p>
            <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                OK
            </button>
        </div>
    );
};

export default ConfirmationPopup;
