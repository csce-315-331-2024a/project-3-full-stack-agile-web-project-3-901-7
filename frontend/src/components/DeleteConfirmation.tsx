import React from 'react';

interface DeleteConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-lg font-bold mb-4">Are you sure you want to delete this order?</p>
        <div className="flex justify-end">
          <button onClick={onCancel} className="border border-gray-500 px-4 py-2 mr-2 rounded">Cancel</button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
