import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get } from "../services/apiService";
import { CONSTANTS } from "../constants/index";
import { getItem } from "../services/storageService";

export default function ExpenseHistoryScreen() {
  const [expenseHistory, setExpenseHistory] = useState([]);
  const user = getItem(CONSTANTS.USERNAME);

  useEffect(() => {
    const fetchExpenseHistory = () => {
      get(CONSTANTS.CONTROLLER.ADMIN_API_EXPENSE_HISTORY)
        .then((response) => {
          if (response.statusCode === 200) {
            setExpenseHistory(response.data);
            console.log("Expense history", response.data);
          } else {
            console.error("Error fetching expense history");
            toast("Error fetching expense history");
          }
        })
        .catch((error) => {
          console.error("Error fetching expense history", error);
          toast("Error fetching expense history");
        });
    };

    fetchExpenseHistory();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Sample formatting
  };

  if (!user) {
    return <p>User not found.</p>; // Fallback if user is null
  }

  return (
    <>
      <div className="p-8 bg-white">
        {expenseHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expenseHistory.map((history) => (
              <div
                key={history.id}
                className="mb-8 p-6 bg-red-50 border-2 border-red-100 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-red-100 hover:shadow-lg"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <p className="text-gray-600 text-sm">
                    <strong>ID:</strong> {history.id}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Action:</strong> {history.action}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <p className="text-gray-600 text-sm">
                    <strong>Date:</strong> {formatDate(history.date)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Comment:</strong> {history.comment || "No Comment"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <p className="text-gray-600 text-sm">
                    <strong>User ID:</strong> {history.userId}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Manager ID:</strong> {history.managerId}
                  </p>
                </div>

                <div className="mb-4 text-right">
                  <p className="text-gray-600 text-sm">
                    <strong>Expense Form ID:</strong> {history.expenseFormId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No expense history found.</p>
        )}
      </div>
    </>
  );
}
