import React from 'react';

interface DataValidationWarningProps {
  message: string;
  onCancel: () => void;
}

/**
 * Data validation warning component
 * @returns Data validation warning
 */
const DataValidationWarning: React.FC<DataValidationWarningProps> = ({ message, onCancel }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-lg text-red-500 mb-4">{message}</p>
        <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default DataValidationWarning;
