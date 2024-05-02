import { useEffect, useState } from "react";
import { getUserAuth } from '../Login';
import { User } from "../../types/dbTypes";
import Order from '../Order/Order';
import Navbar from "../../components/Navbar";

interface Order {
    _id: number;
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    dateTime: Date;
    status: string; // 'received', 'in progress', or 'completed'
}

interface OrderCardProps {
  order: Order;
  onDeleteOrder: (id: number) => void; 
}

const OrderCard : React.FC<{ order : Order, onChangeStatus: (id: number) => void }> = ({ order, onChangeStatus }) => {
    const [itemsDetails, setItemsDetails] = useState<{ [key: number]: { name: string, price: number } }>({});

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
          <div className="text-lg font-bold mb-2">Order #{order._id}</div>
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
              <span>{order.dateTime.getFullYear()}-{order.dateTime.getMonth()+1}-{order.dateTime.getDate()+1}</span>
          </div>
          <button onClick={() => onChangeStatus(order._id)} className="mt-2 border-2 border-black bg-white px-4 py-2 rounded">
              {order.status === 'received' ? "Start Order" : "Complete Order"}
          </button>
      </div>
  );
};


const Kitchen = () => {

    const [receivedOrders, setReceivedOrders] = useState<Order[]>([]);
    const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('cashier')
            .then(setUserProfile)
            .catch(console.error);
    }, []);

    useEffect(() => {
        async function fetchReceivedOrders() {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/order/findByStatus?status=received');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Ensure the data is an array before proceeding
                if (!Array.isArray(data)) {
                    throw new Error("Data is not an array");
                }
                const ordersWithMaps = Array.isArray(data) ? data.map((order: any) => {
                    // Convert itemToQuantity from object to Map
                    const itemToQuantityMap = new Map(Object.entries(order.itemToQuantity));
                    // Construct and return the new order object
                    return {
                        ...order,
                        itemToQuantity: itemToQuantityMap,
                        dateTime: new Date(order.dateTime)
                    };
                }) : [];
                setReceivedOrders(ordersWithMaps);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        }
        async function fetchInProgressOrders() {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/order/findByStatus?status=in%20progress');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Ensure the data is an array before proceeding
                if (!Array.isArray(data)) {
                    throw new Error("Data is not an array");
                }
                const ordersWithMaps = Array.isArray(data) ? data.map((order: any) => {
                    // Convert itemToQuantity from object to Map
                    const itemToQuantityMap = new Map(Object.entries(order.itemToQuantity));
                    // Construct and return the new order object
                    return {
                        ...order,
                        itemToQuantity: itemToQuantityMap,
                        dateTime: new Date(order.dateTime)
                    };
                }) : [];
                setInProgressOrders(ordersWithMaps);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        }

        fetchReceivedOrders();
        fetchInProgressOrders();
    }, []);

    const handleChangeStatus = async (id: number) => {
        try {
            // Find the order with the given id
            const orders = [...receivedOrders, ...inProgressOrders];
            const orderToUpdate = orders.find(order => order._id === id);

            if (!orderToUpdate) {
                console.error('Order not found');
                return;
            }

            // Determine the new status based on the current status
            const newStatus = orderToUpdate.status === 'received' ? 'in progress' : 'completed';

            // Update the order status locally
            if (newStatus === 'in progress') {
                setReceivedOrders(prevOrders => prevOrders.filter(order => order._id !== id));
                setInProgressOrders(prevOrders => [...prevOrders, {...orderToUpdate, status: newStatus}]);
            } else if (newStatus === 'completed') {
                setInProgressOrders(prevOrders => prevOrders.filter(order => order._id !== id));
            }

            function mapToObj(map: Map<number, number>) {
                let obj = Object.create(null);
                for (let [k,v] of map) {
                    obj[k] = v;
                }
                return obj;
            }

            // Send a request to update the order status in the database
            const body = {
                _id: orderToUpdate._id,
                numItems: orderToUpdate.numItems,
                orderInfo: orderToUpdate.orderInfo,
                itemToQuantity: mapToObj(orderToUpdate.itemToQuantity),
                total: orderToUpdate.total,
                dateTime: orderToUpdate.dateTime,
                status: newStatus
            }
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/order/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            console.log('Order status updated successfully');
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    if (!userProfile) {
        return null; // Return null or a loading indicator while user profile is being fetched
    }

    return (
        <div className="p-4">
            <Navbar userType="cashier" userInfo={userProfile} />
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <h1 className="text-4xl font-bold my-4">Tickets</h1>
            </div>

            {/* Section for received orders */}
            <div className="my-4">
                <h2 className="text-xl font-bold">Received Orders</h2>
                <div className="flex flex-wrap -mx-2">
                    {receivedOrders.map(order => (
                        <OrderCard key={order._id} order={order} onChangeStatus={handleChangeStatus} />
                    ))}
                </div>
            </div>

            {/* Section for in progress orders */}
            <div className="my-4">
                <h2 className="text-xl font-bold">In Progress Orders</h2>
                <div className="flex flex-wrap -mx-2">
                    {inProgressOrders.map(order => (
                        <OrderCard key={order._id} order={order} onChangeStatus={handleChangeStatus} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Kitchen;