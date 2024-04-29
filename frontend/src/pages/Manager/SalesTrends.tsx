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
import { Ingredient, Item, User } from "../../types/dbTypes";
import Loading from "../../components/Loading";

type DateField = 'pu' | 'er' | 'ps'; 

type SalesMapping = Map<string, number>;

interface SoldTogether {
    count: number;
    item1: Item;
    item2: Item;
}

interface ISalesData {
    productUsage: SalesMapping | undefined;
    excess: Ingredient[];
    pairSells: SoldTogether[];
    sales: SalesMapping | undefined;
}

const SalesTrends = () => {
    const [data, setData] = useState<ISalesData>({
        productUsage: undefined,
        excess: [],
        pairSells: [],
        sales: undefined,
    });
    const [dates, setDates] = useState({
        pu: { start: null, end: null },
        er: { start: null },
        ps: { start: null, end: null },
    });
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const setProductUsage = (productUsage : SalesMapping) => {
        setData(prevData => ({ ...prevData, productUsage, }));
    };
    const setExcess = (excess : Ingredient[]) => {
        setData(prevData => ({ ...prevData, excess, }));
    };
    const setPairSells = (pairSells : SoldTogether[]) => {
        setData(prevData => ({ ...prevData, pairSells, }));
    };
    const setSales = (sales : SalesMapping) => {
        setData(prevData => ({ ...prevData, sales, }));
    };
    
    async function fetchData() {
        setLoading(true);
        await Promise.all([
            fetchProductUsage(dates.pu.start || new Date(0), dates.pu.end || new Date()),
            fetchPairSells(dates.ps.start || new Date(0), dates.ps.end || new Date()),
            fetchExcess(dates.er.start || new Date(0)),
            fetchSalesReport(new Date(0), new Date())
        ]);
        setLoading(false);
    }

    async function fetchProductUsage(start : Date, end : Date) {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/inventoryUsed?start=${start.getTime()}&end=${end.getTime()}`);
        const usage = new Map<string, number>(Object.entries(await response.json())) as SalesMapping;
        console.log('product usage', usage);
        setProductUsage(usage);
    };
    
    async function fetchExcess(start : Date) {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/findExcess?start=${start.getTime()}`);
        const excess = await response.json() as Ingredient[];
        console.log('excess', excess);
        setExcess(excess);
    };
    
    async function fetchPairSells(start : Date, end : Date) {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/item/sellsTogether?start=${start.getTime()}&end=${end.getTime()}`);
        const pairSells = await response.json() as SoldTogether[];
        console.log('pair sells', pairSells);
        setPairSells(pairSells);
    };
    
    async function fetchSalesReport(start : Date, end : Date) {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/salesReport?start=${start.getTime()}&end=${end.getTime()}`);
        const report = new Map<string, number>(Object.entries(await response.json())) as SalesMapping;
        console.log('sales reports', report);
        setSales(report);
    };

    useEffect(() => {
        getUserAuth("manager").then(setUserProfile).catch(console.error);
    }, []);

    useEffect(() => {
        fetchData();
    }, [
        dates.pu.start,
        dates.pu.end,
        dates.er.start,
        dates.ps.start,
        dates.ps.end,
    ]);

    const handleDateChange = (field : DateField, bound : 'start' | 'end') => (date : Date) => {
        setDates((prevDates) => ({
            ...prevDates,
            [field]: {
                ...prevDates[field],
                [bound]: date,
            },
        }));
    };

    function instanceOfSoldTogether(object : any) : object is SoldTogether {
        return 'item1' in object;
    }
    function instanceOfIngredient(object : any) : object is Ingredient {
        return 'quantity' in object;
    }

    function mapSalesMapping<T>(mapping : SalesMapping, mapFn : (key : string, val : number) => T) {
        console.log('mapping for', mapping);
        let mapped : T[] = [];
        mapping.forEach((val, key) => { 
            mapped.push(mapFn(key, val));
        });
        return mapped;
    }

    const renderTable = (data : Ingredient[] | SoldTogether[]) => ( data.length > 0 &&
        <TableContainer component={Paper} className="mb-4">
            <Table>
                <TableHead>
                    <TableRow>
                        {instanceOfIngredient(data) ? (
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
                            {instanceOfIngredient(row) && (
                                <>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">
                                        {row.quantity}
                                    </TableCell>
                                </>
                            )}
                            {instanceOfSoldTogether(row) && (
                                <>
                                    <TableCell>{row.item1.name}</TableCell>
                                    <TableCell>{row.item2.name}</TableCell>
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
        userProfile ? (
            <div className="p-4">
                <ManagerNavbar userInfo={userProfile} />
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-6">Sales Trends</h1>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
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
                                {data.productUsage && renderTable(
                                    mapSalesMapping<Ingredient>(
                                        data.productUsage, 
                                        (ingName, count) => ({ 
                                            name: ingName,
                                            quantity: count,
                                        }) as Ingredient
                                    )
                                )}
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    Sales Report
                                </h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart 
                                        data={data.sales && mapSalesMapping<{name: string, sales: number}>(
                                            data.sales, (key, value) => ({
                                                name: key, sales: value,
                                            })
                                        )}
                                    >
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
                                {data.excess && renderTable(data.excess)}
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
                                {data.pairSells && renderTable(data.pairSells)}
                            </div>
                        </>
                    )}
                </div>
            </div>
        ) : (
            loading && <Loading />
        )
    );
};

export default SalesTrends;
