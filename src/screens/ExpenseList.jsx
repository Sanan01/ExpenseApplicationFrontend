/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { CONSTANTS } from "../constants";
import { getItem } from "../services/storageService";
import { get } from "../services/apiService";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ExpenseList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = () => {
      get(CONSTANTS.CONTROLLER.GET_EXPENSES)
        .then((response) => {
          if (response.statusCode === 200) {
            setExpenses(response.data);
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

  const user = getItem(CONSTANTS.USERNAME);

  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReason, setModalReason] = useState("");

  const handleEdit = (expense) => {
    console.log("Edit expense", expense.id);
    navigate(CONSTANTS.CONTROLLER.EXPENSE_FORM, {
      state: expense,
    });
  };

  const handleViewReason = (reason) => {
    setModalReason(reason);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="mt-64px">
      <div className="p-4  bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(expense.dateUpdated)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        expense.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : expense.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.currency} {expense.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    {(expense.status === "PENDING" ||
                      expense.status === "REJECTED") && (
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {expense.status === "REJECTED" && (
                      <button
                        onClick={() =>
                          handleViewReason(expense.rejectionReason)
                        }
                        className="text-red-600 hover:text-red-900"
                      >
                        View Reason
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black opacity-50 fixed inset-0"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Reason for Rejection</h3>
            <p>{modalReason}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
