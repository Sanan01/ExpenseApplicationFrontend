import { useState, useEffect } from "react";
import { CONSTANTS } from "../constants/index";
import { get } from "../services/apiService";
import { toast } from "react-toastify";

export default function AdminExpenseFormScreen() {
  const [pendingExpenses, setPendingExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = () => {
      get(CONSTANTS.CONTROLLER.ADMIN_API_EXPENSE_FORMS)
        .then((response) => {
          if (response.statusCode === 200) {
            setPendingExpenses(response.data);
          } else {
            console.error("Error fetching expenses");
            toast("Error fetching expenses");
          }
        })
        .catch((error) => {
          console.error("Error fetching expenses", error);
          toast("Error fetching expenses");
        });
    };

    fetchExpenses();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Sample formatting
  };

  return (
    <div className="p-8 bg-white">
      {pendingExpenses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pendingExpenses.map((expense) => (
            <div
              key={expense.id}
              className="p-6 bg-red-50 border-2 border-red-100 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-red-100 hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Employee Id:{" "}
                  <span className="text-red-600 text-sm">
                    {expense.applicationUserId}
                  </span>
                </h3>
                <p className="text-gray-500 text-sm">
                  Date:{" "}
                  <span className="font-semibold">
                    {formatDate(expense.dateUpdated)}
                  </span>
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-red-500">
                  Expense Items:
                </h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {expense.expenses.map((item, index) => (
                    <li key={index} className="mb-2">
                      <div>
                        <strong className="text-gray-800">{item.title}</strong>
                        <p className="text-sm">
                          Description: {item.description}
                        </p>
                        <p className="text-sm">Type: {item.type}</p>
                        <p className="text-sm">
                          Amount: {expense.currency} {item.amount}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 text-right">
                <p className="text-xl font-bold text-gray-700">
                  Total:{" "}
                  <span className="text-red-600">
                    {expense.currency} {expense.totalAmount}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No expenses found.</p>
      )}
    </div>
  );
}
