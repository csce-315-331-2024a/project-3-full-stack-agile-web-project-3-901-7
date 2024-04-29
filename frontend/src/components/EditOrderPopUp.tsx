import React, { useState, useEffect } from 'react';

interface Order {
    _id: number;
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    dateTime: Date;
    status: string; 
}

interface ItemDetails {
    name: string;
    price: number;
}

const EditOrderPopup: React.FC<{ order: Order, onSave:() => void, onCancel: () => void }> = ({ order, onSave, onCancel }) => {
    // Transform the Map to an editable format
    const [items, setItems] = useState<Map<number, { quantity: number; price?: number; }>>(() => {
        const newMap = new Map<number, { quantity: number; price?: number; }>();
        order.itemToQuantity.forEach((quantity, itemId) => {
            newMap.set(itemId, { quantity, price: 0 }); // Set default price as 0 or fetch if necessary
        });
        return newMap;
    });

    useEffect(() => {
        const fetchItemPrices = async () => {
            const itemDetails = new Map();
            for (const [itemId, quantity] of order.itemToQuantity.entries()) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/item/findOneById?itemId=${itemId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch item details');
                    }
                    const data = await response.json();
                    itemDetails.set(itemId, { quantity, price: data.price });
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
            setItems(itemDetails);
        };

        fetchItemPrices();
    }, [order]); 

    const calculateTotal = () => {
        let total = 0;
        items.forEach(item => {
            total += item.quantity * (item.price || 0); 
        });
        console.log('Total:', total);
        return total;
    };

    const transformItemsToMap = () => {
        const itemsMap = new Map<number, number>();
        items.forEach((item, itemId) => {
            itemsMap.set(itemId, item.quantity);
        });
        return itemsMap;
    };


    const handleSave = () => {
        const itemToQuantityObject: Record<number, number> = {};
        items.forEach((item, itemId) => {
            itemToQuantityObject[itemId] = item.quantity;
        });
    
        const updatedOrder = {
            _id: order._id,
            numItems: Object.values(itemToQuantityObject).reduce((total, quantity) => total + quantity, 0),
            orderInfo: order.orderInfo,
            itemToQuantity: itemToQuantityObject,
            total: calculateTotal(),
            dateTime: order.dateTime.toString(),
            status: order.status
        };
    
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order/edit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrder)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Order update successful:', data);
            onSave(); // This should trigger a refresh in the parent component
        })
        .catch(error => {
            console.error('Failed to update order:', error);
        });
    };
    
    


    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded">
                <h2>Edit Order</h2>
                {Array.from(items.entries()).map(([itemId, item]) => (
                    <div key={itemId}>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => setItems(new Map(items.set(itemId, { ...item, quantity: parseInt(e.target.value) })))}
                            className="border-2 border-gray-300 p-2"
                        />
                        <button onClick={() => {
                            const newItems = new Map(items);
                            newItems.delete(itemId);
                            setItems(newItems);
                        }}>Delete Item</button>
                    </div>
                ))}
                <button onClick={handleSave} className="m-2 bg-blue-500 text-white p-2 rounded">Save</button>
                <button onClick={onCancel} className="m-2 bg-gray-300 p-2 rounded">Cancel</button>
            </div>
        </div>
    );
};

export default EditOrderPopup;
