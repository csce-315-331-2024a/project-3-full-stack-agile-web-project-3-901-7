import { useEffect, useState } from "react";
import { getUserAuth } from "../Login";
import { User, Worklog } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";

/**
 * ManagerLog component displays the work logs for cashiers and allows the manager to edit them.
 */
export default function ManagerLog() {
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
  const [cashierLogs, setCashierLogs] = useState<Worklog[]>([]);
  const [editingLog, setEditingLog] = useState<Worklog | null>(null);

  useEffect(() => {
    /**
     * Authenticates the user as a manager and fetches the cashier logs.
     */
    const authenticateUser = async () => {
      const user = await getUserAuth('manager');
      setUserProfile(user);
      return user;
    };

    authenticateUser()
      .then(() => {
        fetchCashierLogs();
      })
      .catch(console.error);
  }, []);

  /**
   * Fetches the cashier logs from the backend.
   */
  const fetchCashierLogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/log/findAll`);
      const data = await response.json();
      setCashierLogs(data);
    } catch (error) {
      console.error("Error fetching cashier logs:", error);
    }
  };

  /**
   * Sets the editingLog state to the selected log for editing.
   * @param log - The log to be edited.
   */
  const handleEdit = (log: Worklog) => {
    setEditingLog(log);
  };

  /**
   * Updates the editingLog state with the changes made in the input fields.
   * @param e - The change event triggered by the input fields.
   */
  const handleEditLogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setEditingLog(prevLog => {
      if (!prevLog) return null;

      if (name === 'checkin' || name === 'checkout') {
        const localDateTime = new Date(value);
        const utcDateTime = new Date(localDateTime.getTime() - (localDateTime.getTimezoneOffset() * 60000)).toISOString();
        return {
          ...prevLog,
          [name]: utcDateTime
        };
      } else {
        return {
          ...prevLog,
          [name]: value
        };
      }
    });
  };

  /**
   * Updates the log in the backend and updates the cashierLogs state with the updated log.
   */
  const handleUpdateLog = async () => {
    if (editingLog) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/log/edit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingLog)
        });

        if (response.ok) {
          const updatedLog = await response.json();
          setCashierLogs(prevLogs => prevLogs.map(log => log.log_id === updatedLog.log_id ? updatedLog : log));
          setEditingLog(null);
          alert("Updated work log!");
          fetchCashierLogs();
        } else {
          alert("Failed to update log");
        }
      } catch (error) {
        console.error('Error updating log:', error);
      }
    }
  };

  const headerColumns = ["Log ID", "Employee ID", "Check-in Time", "Check-out Time", "Comments", "Actions"];

  /**
   * Formats the given date-time string to a localized date-time string.
   * @param dateTimeString - The date-time string to be formatted.
   * @returns The formatted date-time string.
   */
  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return "-";
    const utcDateTime = new Date(dateTimeString);
    const localDateTime = new Date(utcDateTime.getTime() + (utcDateTime.getTimezoneOffset() * 60000));
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return localDateTime.toLocaleString(undefined, options);
  };

  return (
    <div>
      {userProfile && <Navbar userInfo={userProfile} userType="manager" />}
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
                  <td className="py-4 px-6 font-ptserif">
                    {editingLog && editingLog.log_id === log.log_id ? (
                      <div className="flex gap-2">
                        <input
                          type="datetime-local"
                          name="checkin"
                          value={editingLog.checkin ? new Date(editingLog.checkin).toISOString().slice(0, 16) : ""}
                          onChange={handleEditLogChange}
                          className="border rounded px-3 py-2"
                        />
                        <input
                          type="datetime-local"
                          name="checkout"
                          value={editingLog.checkout ? new Date(editingLog.checkout).toISOString().slice(0, 16) : ""}
                          onChange={handleEditLogChange}
                          className="border rounded px-3 py-2"
                        />
                        <textarea
                          placeholder="Enter comments"
                          name="comments"
                          value={editingLog.comments}
                          onChange={handleEditLogChange}
                          className="w-full border rounded px-3 py-2"
                        />
                        <button
                          type="button"
                          onClick={handleUpdateLog}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingLog(null)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(log)}
                        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}