import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { get, put } from "../services/apiService";
import { CONSTANTS } from "../constants";

const AccountantPayment = () => {
  useEffect(() => {
    const fetchExpenses = () => {
      get(CONSTANTS.CONTROLLER.GET_EXPENSES_ACCOUNTANT)
        .then((response) => {
          if (response.statusCode === 200) {
            setExpensesToPay(response.data);
            console.log("Expenses to pay:", response.data);
          } else {
            toast("Error fetching expenses");
          }
        })
        .catch((error) => {
          console.error("Error fetching expenses", error);
        });
    };
    fetchExpenses();
  }, []);
  const [expensesToPay, setExpensesToPay] = useState([]);

  const handleMarkAsPaid = (id) => {
    setExpensesToPay(expensesToPay.filter((expense) => expense.id !== id));
    console.log("Marked as paid:", id);
    const payload = {
      id: id,
      paidBy: "",
    };
    put(CONSTANTS.CONTROLLER.PAID_ACCOUNTANT, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast("Expense Paid Successfully");
          setExpensesToPay(
            expensesToPay.filter((expense) => expense.id !== id)
          );
        } else {
          toast("Error paying expense");
        }
      })
      .catch((error) => {
        console.error("Error paying expense", error);
      });
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <div className="p-8 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expensesToPay > 0 ? (
                expensesToPay.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.applicationUserId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(expense.dateUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${expense.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleMarkAsPaid(expense.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Mark as Paid
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 mt-48">
                    No expenses to pay
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AccountantPayment;
