import React, { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Legend,
    ResponsiveContainer,
} from "recharts";
import ManagerNavbar from "../../components/ManagerNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";

interface Ingredient {
    name: string;
    quantity: number;
    date: Date;
}

interface ItemPair {
    item1: string;
    item2: string;
    count: number;
    date: Date;
}

interface SalesData {
    name: string;
    sales: number;
    date: Date;
}

// Sample data
const mockData = {
    productUsage: [
        { name: "Tomatoes", quantity: 80, date: new Date("2024-04-01") },
        { name: "Onions", quantity: 50, date: new Date("2024-04-02") },
    ],
    excess: [
        { name: "Cucumbers", quantity: 20, date: new Date("2024-04-03") },
        { name: "Carrots", quantity: 10, date: new Date("2024-04-04") },
    ],
    pairSells: [
        {
            item1: "Burger",
            item2: "Fries",
            count: 100,
            date: new Date("2024-04-05"),
        },
        {
            item1: "Pizza",
            item2: "Soda",
            count: 85,
            date: new Date("2024-04-06"),
        },
    ],
    sales: [
        { name: "Burger", sales: 300, date: new Date("2024-04-07") },
        { name: "Pizza", sales: 200, date: new Date("2024-04-08") },
        { name: "Salad", sales: 150, date: new Date("2024-04-09") },
    ],
};

const filterDataByDate = (data, startDate, endDate) => {
    return data.filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0); // Remove time from the date for comparison

        const start = startDate
            ? new Date(startDate).setHours(0, 0, 0, 0)
            : null;
        const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

        return (!start || itemDate >= start) && (!end || itemDate <= end);
    });
};

const SalesTrends = () => {
    const [data, setData] = useState({
        productUsage: mockData.productUsage,
        excess: mockData.excess,
        pairSells: mockData.pairSells,
        sales: mockData.sales,
    });
    const [dates, setDates] = useState({
        pu: { start: null, end: null },
        er: { start: null },
        ps: { start: null, end: null },
    });
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth("manager").then(setUserProfile).catch(console.error);
    }, []);

    useEffect(() => {
        setData({
            productUsage: filterDataByDate(
                mockData.productUsage,
                dates.pu.start,
                dates.pu.end
            ),
            excess: filterDataByDate(mockData.excess, dates.er.start, null),
            pairSells: filterDataByDate(
                mockData.pairSells,
                dates.ps.start,
                dates.ps.end
            ),
            sales: mockData.sales, // Assuming no date filter for sales data
        });
    }, [
        dates.pu.start,
        dates.pu.end,
        dates.er.start,
        dates.ps.start,
        dates.ps.end,
    ]);

    const handleDateChange = (field, bound) => (date) => {
        setDates((prevDates) => ({
            ...prevDates,
            [field]: {
                ...prevDates[field],
                [bound]: date,
            },
        }));
    };

    const renderTable = (data, type) => (
        <TableContainer component={Paper} className="mb-4">
            <Table>
                <TableHead>
                    <TableRow>
                        {type === "ingredient" ? (
                            <>
                                <TableCell>
                                    <b>Inventory Item</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Amount Used</b>
                                </TableCell>
                            </>
                        ) : (
                            <>
                                <TableCell>
                                    <b>Item 1</b>
                                </TableCell>
                                <TableCell>
                                    <b>Item 2</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Sell Count</b>
                                </TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {type === "ingredient" ? (
                                <>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">
                                        {row.quantity}
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{row.item1}</TableCell>
                                    <TableCell>{row.item2}</TableCell>
                                    <TableCell align="right">
                                        {row.count}
                                    </TableCell>
                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        userProfile && (
            <div className="p-4">
                <ManagerNavbar userInfo={userProfile} />
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-6">Sales Trends</h1>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Product Usage
                        </h2>
                        <div className="mb-4 flex gap-2">
                            <div className="border-2 border-black bg-white px-4 py-2 rounded">
                                Filter by Date Range:
                            </div>
                            <DatePicker
                                selected={dates.pu.start}
                                onChange={handleDateChange("pu", "start")}
                                selectsStart
                                startDate={dates.pu.start}
                                endDate={dates.pu.end}
                                maxDate={new Date()}
                                placeholderText="Start Date"
                                className="border-2 border-black bg-white px-4 py-2 rounded"
                            />
                            <DatePicker
                                selected={dates.pu.end}
                                onChange={handleDateChange("pu", "end")}
                                selectsEnd
                                startDate={dates.pu.start}
                                endDate={dates.pu.end}
                                minDate={dates.pu.start}
                                maxDate={new Date()}
                                placeholderText="End Date"
                                className="border-2 border-black bg-white px-4 py-2 rounded"
                            />
                        </div>
                        {renderTable(data.productUsage, "ingredient")}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Sales Report
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.sales}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="sales"
                                    fill="#8884d8"
                                    name="Sales Volume"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Excess Inventory
                        </h2>
                        <div className="mb-4 flex gap-2">
                            <div className="border-2 border-black bg-white px-4 py-2 rounded">
                                Filter by Date:
                            </div>
                            <DatePicker
                                selected={dates.er.start}
                                onChange={handleDateChange("er", "start")}
                                placeholderText="Start Date"
                                className="border-2 border-black bg-white px-4 py-2 rounded"
                            />
                        </div>
                        {renderTable(data.excess, "ingredient")}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Pairs of Items That Sell Together
                        </h2>
                        <div className="mb-4 flex gap-2">
                            <div className="border-2 border-black bg-white px-4 py-2 rounded">
                                Filter by Date Range:
                            </div>
                            <DatePicker
                                selected={dates.ps.start}
                                onChange={handleDateChange("ps", "start")}
                                selectsStart
                                startDate={dates.ps.start}
                                endDate={dates.ps.end}
                                maxDate={new Date()}
                                placeholderText="Start Date"
                                className="border-2 border-black bg-white px-4 py-2 rounded"
                            />
                            <DatePicker
                                selected={dates.ps.end}
                                onChange={handleDateChange("ps", "end")}
                                selectsEnd
                                startDate={dates.ps.start}
                                endDate={dates.ps.end}
                                minDate={dates.ps.start}
                                maxDate={new Date()}
                                placeholderText="End Date"
                                className="border-2 border-black bg-white px-4 py-2 rounded"
                            />
                        </div>
                        {renderTable(data.pairSells, "pair")}
                    </div>
                </div>
            </div>
        )
    );
};

export default SalesTrends;
