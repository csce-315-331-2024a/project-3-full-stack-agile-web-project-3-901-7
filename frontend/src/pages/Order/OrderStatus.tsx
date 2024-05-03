import { useEffect, useState } from "react";

interface Order {
  _id: string;
  date: string;
  status: string;
}

const OrderStatus: React.FC = () => {
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fetchOrders = async () => {
      try {
        const inProgressResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/order/findByStatus?status=in%20progress`
        );
        const inProgressData = await inProgressResponse.json();
        setInProgressOrders(inProgressData);

        const completedResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/order/findAll?limit=8`
        );
        const completedData = await completedResponse.json();
        if (Array.isArray(completedData)) {
          const recentCompletedOrders = completedData.filter(
            (order: Order) => order.status === "completed"
          );
          setCompletedOrders(recentCompletedOrders);
        } else {
          console.error("Unexpected data format for completed orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 bg-gray-100 font-ptserif">
        <h2 className="text-4xl font-bold mb-4 text-red-900">Orders In Progress</h2>
        <ul>
          {inProgressOrders.map((order) => (
            <li key={order._id} className="mb-2 text-2xl">
              Order #{order._id}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2 p-4 bg-gray-50 font-ptserif">
        <h2 className="text-4xl font-bold mb-4 text-green-900">Orders Completed</h2>
        <ul>
          {completedOrders.map((order) => (
            <li key={order._id} className="mb-2 text-2xl">
              Order #{order._id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderStatus;