import React, { useState, useEffect } from 'react';
import ManagerNavbar from "../../components/ManagerNavbar";

interface Order {
    _id: number;
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    date: Date;
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
        date: new Date('12-12-2024'),
    },
  ];
  
const OrderCard = ({ order }: { order: Order }) => {
    const [itemsDetails, setItemsDetails] = useState<{ [key: number]: { name: string, price: number } }>({});

    const getFormattedDate = (date: Date | string) => {
        if (date) {
          const dateObj = new Date(date);
          if (!isNaN(dateObj.getTime())) {
            return dateObj.toLocaleDateString();
          }
        }
        return "Invalid date";
      };
  
    useEffect(() => {
      const fetchItemDetails = async () => {
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
      };
  
      fetchItemDetails();
    }, [order]);
      
      return (
        <div className="border-2 border-black p-4 m-2 flex flex-col" style={{ width: '350px', height: '400px', flexBasis: 'auto', flexGrow: 0, flexShrink: 0 }}>
          <div className="text-lg font-bold font-ptserif mb-2">order #{order._id}</div>
          <div className="flex-grow overflow-y-auto">
            <table className="w-full text-sm font-ptserif">
              <thead>
                <tr className="border-b-2">
                  <th className="p-1 text-left font-ptserif">qty</th>
                  <th className="p-1 text-left font-ptserif">item</th>
                  <th className="p-1 text-left font-ptserif">price</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(order.itemToQuantity).map(([itemId, quantity], index) => (
                <tr key={index} className="border-b">
                    <td className="p-1 font-ptserif pl-2">{quantity}</td>
                    <td className="p-1 font-ptserif">{itemsDetails[itemId]?.name}</td>
                    <td className="p-1 font-ptserif">${(itemsDetails[itemId]?.price * quantity).toFixed(2)}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 pt-2 border-t flex justify-between items-center">
            <span className="font-bold font-ptserif">total: ${order.total.toFixed(2)}</span>
            <span className="font-ptserif">{getFormattedDate(order.date)}</span>
          </div>
        </div>
      );
};
  
const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
        const orderLimit = 10; 
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/findAll?limit=${orderLimit}`);
        const data = await response.json();
        setOrders(data);
    }

    //fetchOrders();

    setOrders(mockOrders);
  }, []);

  return (
    <div className="p-4">
      <ManagerNavbar />
      <h1 className="mt-8 ml-8 text-4xl font-bold my-4 font-ptserif">recent orders</h1>
      <div className="flex flex-nowrap overflow-x-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
        {orders.map(order => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};
export default OrderHistory;
