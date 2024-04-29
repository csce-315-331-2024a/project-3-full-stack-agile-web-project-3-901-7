import { useEffect, useState } from "react";
import { getUserAuth } from "../Login";
import { User, Worklog } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";

export default function CashierLog() {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const [cashierLogs, setCashierLogs] = useState<Worklog[]>([]);
    const [roleId, setRoleId] = useState<number>(-1);
    const [newLog, setNewLog] = useState<Worklog>({
        log_id: -1,
        emp_id: roleId,
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
                    fetchRoleId(user.email);
                }
            })
            .catch(console.error);
    }, []);

    const fetchRoleId = async (email: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/role/findByEmail?email=${email}`);
            const role = await response.json();
            if (role && role._id) {
                setRoleId(role._id);
            } else {
                console.error("Role ID not found for the given email.");
            }
        } catch (error) {
            console.error("Error fetching role ID:", error);
        }
    };

    const fetchCashierLogs = async () => {
        if (roleId !== null) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/log/findById?ids=${roleId}`);
                const data = await response.json();
                setCashierLogs(data);
            } catch (error) {
                console.error("Error fetching cashier logs:", error);
            }
        }
    };

    useEffect(() => {
        if (roleId !== null) {
            fetchCashierLogs();
        }
    }, [roleId]);


    const headerColumns = ["Check-in Time", "Check-out Time", "Comments"];

    const formatDateTime = (dateTimeString: string | null) => {
        if (!dateTimeString) return "-";
        const utcDateTime = new Date(dateTimeString);
        const localDateTime = new Date(utcDateTime.getTime() + (utcDateTime.getTimezoneOffset() * 60000));
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return localDateTime.toLocaleString(undefined, options);
    };

    const handleNewLogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'checkin' || name === 'checkout') {
            const localDateTime = new Date(value);
            const utcDateTime = new Date(localDateTime.getTime() - (localDateTime.getTimezoneOffset() * 60000)).toISOString();
            setNewLog(prevLog => ({
                ...prevLog,
                [name]: utcDateTime
            }));
        } else {
            setNewLog(prevLog => ({
                ...prevLog,
                [name]: value
            }));
        }
    };

    async function handleAddLog() {
        if (roleId <= 0) {
            alert("Invalid role ID. Please ensure you're logged in correctly.");
            return;
        }
        const body = {
            emp_id: roleId,
            checkin: newLog.checkin,
            checkout: newLog.checkout,
            comments: newLog.comments
        };
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/log/insert", { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        if (data.success === true) {
            alert("Inserted new work!")
            fetchCashierLogs();
        }
        else {
            alert("Uh oh something went wrong :(")
        }
    }

    return (
        <div>
            {userProfile && <Navbar userInfo={userProfile} userType="cashier"/>}
            <div className="mt-4 ml-4">
                <div className="mb-4">
                    <h2 className="font-ptserif text-black mb-2">Add New Log</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
                        <input
                            type="datetime-local"
                            name="checkin"
                            value={newLog.checkin ? new Date(newLog.checkin).toISOString().slice(0, 16) : ""}
                            onChange={handleNewLogChange}
                            className="border rounded px-3 py-2"
                        />
                        <input
                            type="datetime-local"
                            name="checkout"
                            value={newLog.checkout ? new Date(newLog.checkout).toISOString().slice(0, 16) : ""}
                            onChange={handleNewLogChange}
                            className="border rounded px-3 py-2"
                        />
                        <textarea
                            placeholder="Enter comments"
                            name="comments"
                            value={newLog.comments}
                            onChange={handleNewLogChange}
                            className="w-full border rounded px-3 py-2"
                        />
                        <button
                            type="submit"
                            onClick={handleAddLog}
                            className="border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
                        >
                            Add Log
                        </button>
                    </form>
                </div>
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