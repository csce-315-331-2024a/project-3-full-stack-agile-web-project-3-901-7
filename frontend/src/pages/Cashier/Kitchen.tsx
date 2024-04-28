import { useEffect, useState } from "react";
import CashierNavbar from "../../components/CashierNavbar";
import { useNavigate } from 'react-router-dom';
import ManagerNavbar from "../../components/ManagerNavbar";
import { getUserAuth } from '../Login';
import { User } from "../../types/dbTypes";
import Order from '../Order/Order';

interface Order {
    _id: number;
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    dateTime: Date;
    status: string; // 'received', 'in progress', or 'completed'
}

const mockTickets: Order[] = [
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
];


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
              <span>{order.dateTime.toString()}</span>
          </div>
          <button onClick={() => onChangeStatus(order._id)} className="mt-2 border-2 border-black bg-white px-4 py-2 rounded">
              {order.status === 'received' ? "Start Order" : "Complete Order"}
          </button>
      </div>
  );
};


const Kitchen = () => {
    //const [orders, setOrders] = useState<Order[]>([]);
    const [orders, setOrders] = useState<Order[]>(mockTickets);
    const [sortDirection, setSortDirection] = useState<string>('asc');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('manager')
        .then(setUserProfile)
        .catch(console.error);
    }, []);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch('http://localhost:8080/order/findByStatus?status=received');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Ensure the data is an array before proceeding
                if (!Array.isArray(data)) {
                    throw new Error("Data is not an array");
                }
                const ordersWithMaps = Array.isArray(data) ? data.map((order: any) => {
                    // Log the raw itemToQuantity object from the data
                    console.log(order.itemToQuantity);
                    
                    // Convert itemToQuantity from object to Map
                    const itemToQuantityMap = new Map(Object.entries(order.itemToQuantity));
                
                    // Log the date from the data
                    console.log("date:", order.dateTime);
                
                    // Construct and return the new order object
                    return {
                        ...order,
                        itemToQuantity: itemToQuantityMap,
                        date: new Date(order.dateTime) // Convert string to Date object
                    };
                }) : [];
                
                
                //setOrders(ordersWithMaps);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        }
    
        fetchOrders();
    }, []);
    
    const handleChangeStatus = (id: number) => {
        setOrders(orders.map(order => {
            if (order._id === id) {
                const newStatus = order.status === 'received' ? 'in progress' : 'completed';
                return { ...order, status: newStatus };
            }
            return order;
        }).filter(order => order.status !== 'completed')); // Hide completed orders
    };


    return (userProfile &&
      <div className="p-4">
        <ManagerNavbar userInfo={userProfile}/>
        <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-4xl font-bold my-4">Tickets</h1>
        </div>
            
        <div className="flex flex-nowrap overflow-x-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
            {orders.filter(order => order.status === 'received' || order.status === 'in progress').map(order => (
                <OrderCard key={order._id} order={order} onChangeStatus={handleChangeStatus} />
            ))}
        </div>
      </div>
    );
};

export default Kitchen;