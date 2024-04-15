import React, { useState, useEffect } from 'react';
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
        <div className="border-2 border-black p-4 m-2 flex flex-col" style={{ width: '350px', height: '400px' }}>
            <div className="text-lg font-bold mb-2">Order #{order._id}</div>
            <div className="flex-grow overflow-y-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2">
                            <th className="p-1 text-left">Qty</th>
                            <th className="p-1 text-left">Item</th>
                            <th className="p-1 text-left">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(order.itemToQuantity).map(([itemId, quantity], index) => (
                            <tr key={index} className="border-b">
                                <td className="p-1 pl-2">{quantity}</td>
                                <td className="p-1">{itemsDetails[itemId]?.name}</td>
                                <td className="p-1">${(itemsDetails[itemId]?.price * quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 pt-2 border-t flex justify-between items-center">
                <span className="font-bold">Total: ${order.total.toFixed(2)}</span>
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

    useEffect(() => {
        getUserAuth()
            .then(setUserProfile)
            .catch(console.error);
    }, [])

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

    useEffect(() => {
        sortOrders('asc');
    }, []);

    return (userProfile &&
        <div className="p-4">
            <ManagerNavbar userInfo={userProfile} />
            <h1 className="text-4xl font-bold my-4">Recent Orders</h1>
            <div className="mb-4 flex gap-2">
                <button className="border-2 border-black bg-white px-4 py-2" onClick={() => sortOrders('asc')}>Sort Ascending</button>
                <button className="border-2 border-black bg-white px-4 py-2" onClick={() => sortOrders('desc')}>Sort Descending</button>
                <button className="border-2 border-black bg-white px-4 py-2" onClick={filterByDateRange}>Filter by Date Range</button>
                <DatePicker className="border-2 border-black bg-white px-4 py-2" selected={startDate} onChange={(date: Date) => setStartDate(date)} placeholderText="Start Date" />
                <DatePicker className="border-2 border-black bg-white px-4 py-2" selected={endDate} onChange={(date: Date) => setEndDate(date)} placeholderText="End Date" />
            </div>
            <div className="flex flex-nowrap overflow-x-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
                {orders.map(order => (
                    <OrderCard key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
};
export default OrderHistory;
