import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerNavbar from "../../components/ManagerNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserAuth, UserInfo } from '../Login';

interface Order {
    _id: number;
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    date: Date;
}

interface OrderCardProps {
  order: Order;
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
        date: new Date('2024-12-12'),
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
        date: new Date('2024-12-03'),
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
        date: new Date('2024-12-18'),
    },
];

const OrderCard = ({ order }: { order: Order }) => {
    const [itemsDetails, setItemsDetails] = useState<{ [key: number]: { name: string, price: number } }>({});

    const getFormattedDate = (date: Date) => date.toLocaleDateString();

    useEffect(() => {
        async function fetchItemDetails() {
            const details: { [key: number]: { name: string, price: number } } = {};

            for (const [itemId, quantity] of Array.from(order.itemToQuantity)) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/item/findOneById?itemId=${itemId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch');
                    }
                    const data = await response.json();
                    details[itemId] = { name: data.name, price: data.price };
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }

            setItemsDetails(details);
        }

        fetchItemDetails();
    }, [order]);
    
      
    return (
      <div className="relative border-2 border-black p-4 m-2 flex flex-col" style={{ width: '350px', height: '400px', flexBasis: 'auto', flexGrow: 0, flexShrink: 0 }}>
          <button onClick={handleEditClick} className="absolute top-2 right-8 bg-white text-black border-2 border-black px-1 rounded font-ptserif hover:bg-black hover:text-white">
            Edit
          </button>
          <button onClick={() => onDeleteOrder(order._id)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded">
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
              <span>{getFormattedDate(order.date)}</span>
          </div>
      </div>
  );
};


const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [sortDirection, setSortDirection] = useState<string>('asc');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

  const handleDeleteOrder = async (id: number) => {
      try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/deleteById?orderId=${id}`, {
            method: 'POST',
          });
          const data = await response.json();
          if (data) {
              const updatedOrders = orders.filter(order => order._id !== id);
              setOrders(updatedOrders);
          } else {
              throw new Error('Failed to delete the order');
          }
      } catch (error) {
          console.error('Delete order error:', error);
          alert('Failed to delete the order. Please try again.');
      }
  };

  useEffect(() => {
    async function fetchOrders() {
      const orderLimit = 10; 
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/findAll?limit=${orderLimit}`);
      
      if (response.ok) {
        const fetchedOrders: Order[] = await response.json();
        console.log(fetchedOrders);
    
        const ordersWithItemToQuantity = fetchedOrders.map(order => {
          // Check if itemToQuantity exists and has at least one entry
          const isItemToQuantityAvailable = order.itemToQuantity && Array.from(order.itemToQuantity).length > 0;
          
          // If itemToQuantity is not available or empty, set a default Map with a dummy itemId of 0 and quantity of 0
          // Otherwise, use the existing itemToQuantity Map
          const itemToQuantity = isItemToQuantityAvailable ? order.itemToQuantity : new Map([[0, 0]]);
    
          return {
            ...order,
            itemToQuantity
          };
        });
    
        setOrders(ordersWithItemToQuantity);
      } else {
        console.error('Failed to fetch orders:', response.status);
      }
    }

    const sortOrders = (direction: string) => {
        setSortDirection(direction);
        setOrders(orders => [...orders].sort((a, b) => {
            if (direction === 'asc') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
        }));
    };

    const filterByDateRange = () => {
        if (startDate && endDate) {
            setOrders(mockOrders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= startDate && orderDate <= endDate;
            }));
        }
    };


  return (
    <div className="p-4">
      <ManagerNavbar />
      <div className="flex flex-col sm:flex-row items-center">
      <h1 className="mt-8 ml-8 text-4xl font-bold my-4 font-ptserif">recent orders</h1>
      </div>
      <div className="flex flex-nowrap overflow-x-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
        {orders.map(order => (
          <OrderCard key={order._id} order={order} onDeleteOrder={handleDeleteOrder} />
        ))}
      </div>
    </div>
  );
};
export default OrderHistory;
