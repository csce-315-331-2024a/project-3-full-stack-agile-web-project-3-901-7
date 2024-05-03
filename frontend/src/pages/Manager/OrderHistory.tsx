import React, { useState, useEffect } from "react";
import EditOrderPopup from "../../components/EditOrderPopUp";
import DeleteConfirmation from '../../components/DeleteConfirmation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";
import { Order } from "../../components/EditOrderPopUp";
import Navbar from "../../components/Navbar";

interface OrderCardProps {
    order: Order;
    onEdit: (order: Order) => void;
    onDeleteOrder: (id: number) => void; 
}

const mockOrders: Order[] = [
    {
        _id: 1,
        numItems: 2,
        orderInfo: "Cheeseburger,Fries",
        itemToQuantity: new Map([
            [1, 2],
            [2, 3],
        ]),
        total: 14.99,
        dateTime: new Date('2024-12-12'),
        status: 'received',
    },
    {
        _id: 2,
        numItems: 2,
        orderInfo: "Cheeseburger,Fries",
        itemToQuantity: new Map([
            [1, 2],
            [2, 3],
        ]),
        total: 14.99,
        dateTime: new Date('2024-12-03'),
        status: 'completed',
    },
    {
        _id: 3,
        numItems: 2,
        orderInfo: "Cheeseburger,Fries",
        itemToQuantity: new Map([
            [1, 2],
            [2, 3],
        ]),
        total: 14.99,
        dateTime: new Date('2024-12-18'),
        status: 'in progress',
    },
];

const OrderCard : React.FC<{ order : Order, setOrders : React.Dispatch<React.SetStateAction<Order[]>>
    , deleteOrderCallback: (id: number) => void }> = ({order, setOrders, deleteOrderCallback}) => {
    const [itemsDetails, setItemsDetails] = useState<{ [key: number]: { name: string, price: number } }>({});
    const [showEditPopup, setShowEditPopup] = useState(false);
    //const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        async function fetchItemDetails() {
            const details: { [key: number]: { name: string; price: number } } =
                {};

            for (const [itemId, quantity] of Array.from(order.itemToQuantity)) {
                try {
                    const response = await fetch(
                        `${
                            import.meta.env.VITE_BACKEND_URL
                        }/item/findOneById?itemId=${itemId}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch");
                    }
                    const data = await response.json();
                    details[itemId] = { name: data.name, price: data.price };
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            }

            setItemsDetails(details);
        }

        fetchItemDetails();
    }, [order]);

    const handleEditSave = () => {
        setShowEditPopup(false);
        window.alert('Order edited successfully!');
    };

    return (
      <div className="relative border-2 border-black p-4 m-2 flex flex-col" style={{ width: '350px', height: '400px', flexBasis: 'auto', flexGrow: 0, flexShrink: 0 }}>
        {showEditPopup && (
                <EditOrderPopup
                    order={order}
                    onSave={(updatedOrder : Order) => {
                        handleEditSave();
                        console.log('updated order', updatedOrder);
                        setOrders((prevOrders) => prevOrders.map(prevOrder => 
                            updatedOrder._id === prevOrder._id ? updatedOrder : prevOrder
                        ))
                        setShowEditPopup(false);
                    }}
                    onCancel={() => setShowEditPopup(false)}
                />
            )}
            <button onClick={() => setShowEditPopup(true)} className="absolute top-2 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded">
                Edit
            </button>
          <button onClick={() => deleteOrderCallback(order._id)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded">
              -
          </button>
          <div className="text-lg font-bold mb-2">order #{order._id}</div>
          <div className="flex-grow overflow-y-auto">
              <table className="w-full text-sm">
                  <thead>
                      <tr className="border-b-2">
                          <th className="p-1 text-left">qty</th>
                          <th className="p-1 text-left">item</th>
                          <th className="p-1 text-left">price</th>
                      </tr>
                  </thead>
                  <tbody>
                      {Array.from(order.itemToQuantity.entries()).map(([itemId, quantity], index) => (
                          <tr key={index}>
                              <td className="p-1">{quantity}</td>
                              <td className="p-1">{itemsDetails[itemId]?.name}</td>
                              <td className="p-1">${(itemsDetails[itemId]?.price * quantity).toFixed(2)}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          <div className="mt-2 pt-2 border-t flex justify-between">
              <span className="font-bold">total: ${order.total.toFixed(2)}</span>
              <span>{order.dateTime.toLocaleDateString()}</span>
          </div>
      </div>
  );
};


const OrderHistory = () => {
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const [confirmDeleteOrderId, setConfirmDeleteOrderId] = useState<number | null>(null);

    useEffect(() => {
        getUserAuth('manager')
        .then(setUserProfile)
        .catch(console.error);
    }, []);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/order/findAll?limit=20');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error("Data is not an array");
                }
                const ordersWithMaps = data.map((order: any) => {
                    const itemToQuantityMap = new Map(Object.entries(order.itemToQuantity));
                    return {
                        ...order,
                        itemToQuantity: itemToQuantityMap,
                        dateTime: new Date(order.dateTime)
                    };
                });
                setAllOrders(ordersWithMaps);
                setOrders(ordersWithMaps);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        }
    
        fetchOrders();
    }, []);

    const filterByDateRange = () => {
        if (startDate && endDate) {
            setOrders(allOrders.filter(order => {
                const orderDate = new Date(order.dateTime);
                return orderDate >= startDate && orderDate <= endDate;
            }));
        }
    };

    useEffect(() => {
        filterByDateRange();
    }, [startDate, endDate, allOrders]);

    const handleDeleteOrder = async (id: number) => {
        setConfirmDeleteOrderId(id);
    };

    const handleConfirmDeleteOrder = async (id: number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/deleteById?orderId=${id}`, {
              method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the order');
            }
            const updatedOrders = allOrders.filter(order => order._id !== id);
            setAllOrders(updatedOrders);
            setOrders(updatedOrders);
            setConfirmDeleteOrderId(null);
        } catch (error) {
            console.error('Delete order error:', error);
            alert('Failed to delete the order. Please try again.');
        }
    };

    return (
      userProfile &&
      <div className="p-4">
        <Navbar userType="manager" userInfo={userProfile}/>
        <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-4xl font-bold my-4">Recent Orders</h1>
        </div>
        <div className="mb-4 flex gap-2">
            <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="border-2 border-black bg-white px-4 py-2 rounded"
            />
            <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="border-2 border-black bg-white px-4 py-2 rounded"
            />
            <button onClick={filterByDateRange} className="border-2 border-black bg-white px-4 py-2 rounded">Filter by Date Range</button>
        </div>
        {confirmDeleteOrderId !== null && (
            <DeleteConfirmation
                onCancel={() => setConfirmDeleteOrderId(null)}
                onConfirm={() => handleConfirmDeleteOrder(confirmDeleteOrderId)}
            />
        )}
        <div className="flex flex-nowrap overflow-x-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
          {orders.map(order => (
            <OrderCard key={order._id} setOrders={setOrders} deleteOrderCallback={() => handleDeleteOrder(order._id)} order={order} />
          ))}
        </div>
      </div>
    );
};

export default OrderHistory;
