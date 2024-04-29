import { useEffect, useState } from "react";
import { getUserAuth } from "../Login";
import { User, Worklog } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";

export default function ManagerLog() {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const [cashierLogs, setCashierLogs] = useState<Worklog[]>([]);
    const [roleId, setRoleId] = useState<number>(-1);
    const [newLog, setNewLog] = useState<Worklog>({
        log_id: -1,
        emp_id: -1,
        checkin: new Date().toISOString(),
        checkout: new Date().toISOString(),
        comments: "",
    });

    useEffect(() => {
        const authenticateUser = async () => {
            const user = await getUserAuth('cashier');
            setUserProfile(user);
            return user;
        };

        authenticateUser()
            .then(user => {
                if (user && user.email) {
                    fetchCashierLogs()
                }
            })
            .catch(console.error);
    }, []);


    const fetchCashierLogs = async () => {
        if (roleId !== null) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/log/findAll`);
                const data = await response.json();
                setCashierLogs(data);
            } catch (error) {
                console.error("Error fetching cashier logs:", error);
            }
        }
    };

    useEffect(() => {
        fetchCashierLogs();
    }, []);


    const headerColumns = ["Log ID", "Employee ID", "Check-in Time", "Check-out Time", "Comments"];

    const formatDateTime = (dateTimeString: string | null) => {
        if (!dateTimeString) return "-";
        const utcDateTime = new Date(dateTimeString);
        const localDateTime = new Date(utcDateTime.getTime() + (utcDateTime.getTimezoneOffset() * 60000));
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return localDateTime.toLocaleString(undefined, options);
    };

    return (
        <div>
            {userProfile && <Navbar userInfo={userProfile} userType="manager"/>}
            <div className="mt-4 ml-4">
                <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 380px)" }}>
                    <table className="overflow-scroll w-full text-sm text-center text-black font-ptserif">
                        <thead className="text-s text-black bg-gray-50 font-ptserif">
                            <tr>
                                {headerColumns.map((columnTitle) => (
                                    <th key={columnTitle} scope="col" className="py-3 px-6 font-ptserif">
                                        {columnTitle}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {cashierLogs.map((log) => (
                                <tr key={log.log_id} className="bg-white hover:bg-gray-50 border-b">
                                    <th className="py-4 px-6 font-ptserif">{log.log_id}</th>
                                    <th className="py-4 px-6 font-ptserif">{log.emp_id}</th>
                                    <td className="py-4 px-6 font-ptserif">{formatDateTime(log.checkin)}</td>
                                    <td className="py-4 px-6 font-ptserif">{formatDateTime(log.checkout)}</td>
                                    <td className="py-4 px-6 font-ptserif">{log.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}