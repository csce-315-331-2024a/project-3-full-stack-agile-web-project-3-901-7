import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import {
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import ManagerNavbar from "../../components/ManagerNavbar";
import { getUserAuth, UserInfo } from '../Login';

interface Ingredient {
  name: string;
  quantity: number;
}

interface ItemPair {
  item1: string;
  item2: string;
  count: number;
}

interface SalesData {
  name: string;
  sales: number;
}

const SalesTrends = () => {
  const [productUsageData, setProductUsageData] = useState<Ingredient[]>([]);
  const [excessData, setExcessData] = useState<Ingredient[]>([]);
  const [pairSells, setPairSells] = useState<ItemPair[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [puStartDate, setPuStartDate] = useState<dayjs.Dayjs | null>(
    dayjs().subtract(1, 'month')
  );
  const [puEndDate, setPuEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [erStartDate, setErStartDate] = useState<dayjs.Dayjs | null>(
    dayjs().subtract(1, 'month')
  );
  const [psStartDate, setPsStartDate] = useState<dayjs.Dayjs | null>(
    dayjs().subtract(1, 'month')
  );
  const [psEndDate, setPsEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    getUserAuth('manager')
      .then(setUserProfile)
      .catch(console.error);
  }, [])

  useEffect(() => {
    loadData();
  }, [puStartDate, puEndDate, erStartDate, psStartDate, psEndDate]);

  const loadData = async () => {
    // Sample data get from db later after manager permissions are done
    setProductUsageData([
      { name: 'Tomatoes', quantity: 80 },
      { name: 'Onions', quantity: 50 },
    ]);
    setExcessData([
      { name: 'Cucumbers', quantity: 20 },
      { name: 'Carrots', quantity: 10 },
    ]);
    setPairSells([
      { item1: 'Burger', item2: 'Fries', count: 100 },
      { item1: 'Pizza', item2: 'Soda', count: 85 },
    ]);
    setSalesData([
      { name: 'Burger', sales: 300 },
      { name: 'Pizza', sales: 200 },
      { name: 'Salad', sales: 150 },
    ]);
  };

  const renderDatePickers = (
    label: string,
    startDate: dayjs.Dayjs | null,
    setStartDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>,
    endDate?: dayjs.Dayjs | null,
    setEndDate?: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
  ) => (
    <>
      <TextField
        label={label}
        value={startDate?.format('YYYY-MM-DD') || ''}
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setStartDate(dayjs(e.target.value))}
        type="date"
      />
      {endDate && setEndDate && (
        <TextField
          label="End Date"
          value={endDate?.format('YYYY-MM-DD') || ''}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEndDate(dayjs(e.target.value))}
          type="date"
        />
      )}
    </>
  );
  

  const renderTable = (data: (Ingredient | ItemPair)[], type: string) => (
    <TableContainer component={Paper} className="mb-4">
      <Table>
        <TableHead>
          <TableRow>
            {type === 'ingredient' ? (
              <>
                <TableCell><b>Inventory Item</b></TableCell>
                <TableCell align="right"><b>Amount Used</b></TableCell>
              </>
            ) : (
              <>
                <TableCell><b>Item 1</b></TableCell>
                <TableCell><b>Item 2</b></TableCell>
                <TableCell align="right"><b>Sell Count</b></TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`${(row as Ingredient).name || ''}_${(row as ItemPair).count || ''}`}>
              {type === 'ingredient' ? (
                <>
                  <TableCell>{(row as Ingredient).name}</TableCell>
                  <TableCell align="right">{(row as Ingredient).quantity}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{(row as ItemPair).item1}</TableCell>
                  <TableCell>{(row as ItemPair).item2}</TableCell>
                  <TableCell align="right">{(row as ItemPair).count}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  

  return (userProfile &&
    <div className="p-4">
      <ManagerNavbar userInfo={userProfile} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6">Sales Trends</h1>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Product Usage</h2>
            {renderDatePickers('Start Date', puStartDate, setPuStartDate, puEndDate, setPuEndDate)}
            {renderTable(productUsageData, 'ingredient')}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Excess Inventory</h2>
            {renderDatePickers('Start Date', erStartDate, setErStartDate)}
            {renderTable(excessData, 'ingredient')}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Pairs of Items That Sell Together</h2>
            {renderDatePickers(
              'Start Date',
              psStartDate,
              setPsStartDate,
              psEndDate,
              setPsEndDate
            )}
            {renderTable(pairSells, 'pair')}
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default SalesTrends;
