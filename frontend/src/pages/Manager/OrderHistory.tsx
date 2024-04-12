import React, { useState, useEffect } from 'react';
import ManagerNavbar from "../../components/ManagerNavbar";

interface Order {
    _id: number;
    numItems: number;
    orderInfo: string;
    itemToQuantity: { itemId: number, quantity: number }[];
    total: number;
    date: string;
}

const mockOrders: Order[] = [
    {
      _id: 1,
      numItems: 2,
      orderInfo: "Cheeseburger(2),Fries(3)",
      itemToQuantity: [{ itemId: 1, quantity: 2 }, { itemId: 2, quantity: 3 }],
      total: 14.99,
      date: '12/12/2024'
    },
    {
      _id: 2,
      numItems: 2,
      orderInfo: "Cheeseburger(2),Fries(3)",
      itemToQuantity: [{ itemId: 1, quantity: 2 }, { itemId: 2, quantity: 3 }],
      total: 14.99,
      date: '12/12/2024'
    },
  ];
  
  const OrderCard = ({ order }: { order: Order }) => (
    <div className="border-2 border-black p-4 m-2 flex flex-col" style={{ width: '350px', height: '400px' }}>
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
            {order.itemToQuantity.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-1">{item.quantity}</td>
                <td className="p-1">{/* Item name here based on itemId */}</td>
                <td className="p-1">${/* Item price here based on itemId */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 pt-2 border-t flex justify-between items-center">
        <span className="font-bold">total: ${order.total.toFixed(2)}</span>
        <span>{order.date}</span>
      </div>
    </div>
  );
  
  
  
  
  

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // async function fetchOrders() {
    //     const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/order/findAll");
    //     const data = await response.json();
    //     setOrders(data);
    // }

    // fetchOrders();

    setOrders(mockOrders);
  }, []);

  return (
    <div className="p-4">
      <ManagerNavbar />
      <h1 className="mt-8 ml-8 text-4xl font-bold font-ptserif my-4 font-ptserif">recent orders</h1>
      <div className="flex overflow-x-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
        {orders.map(order => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
