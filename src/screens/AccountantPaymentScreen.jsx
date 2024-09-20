import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { get, put } from "../services/apiService";
import { CONSTANTS } from "../constants";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const AccountantPayment = () => {
  const [expensesToPay, setExpensesToPay] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(5); // Items per page

  useEffect(() => {
    fetchExpenses();
  }, [searchTerm, sortOrder, currentPage]);

  const fetchExpenses = () => {
    get(
      `${CONSTANTS.CONTROLLER.GET_EXPENSES_ACCOUNTANT}?searchKeyword=${searchTerm}&orderBy=${sortOrder}&pageNumber=${currentPage}&pageSize=${itemsPerPage}`
    )
      .then((response) => {
        if (response.statusCode === 200) {
          setExpensesToPay(response.data.items);
          setTotalPages(response.data.totalPages);
        } else {
          toast("Error fetching expenses");
        }
      })
      .catch((error) => {
        console.error("Error fetching expenses", error);
      });
  };

  const handleMarkAsPaid = (id) => {
    const payload = { id, paidBy: "" };
    put(CONSTANTS.CONTROLLER.PAID_ACCOUNTANT, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast("Expense Paid Successfully");
          setExpensesToPay((prev) =>
            prev.filter((expense) => expense.id !== id)
          );
        } else {
          toast("Error paying expense");
        }
      })
      .catch((error) => {
        console.error("Error paying expense", error);
      });
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="p-8 bg-white">
        <div className="flex justify-between mb-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Status"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleSearch}
          />

          {/* Sorting */}
          <div className="flex space-x-4">
            <button
              onClick={() => toggleSortOrder()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
            >
              {sortOrder === "asc" ? (
                <>
                  <FaSortAmountUp className="mr-2" />
                  Sort by Date Desc
                </>
              ) : (
                <>
                  <FaSortAmountDown className="mr-2" />
                  Sort by Date Asc
                </>
              )}
            </button>
          </div>
        </div>

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
              {expensesToPay.length > 0 ? (
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
                  <td colSpan="5" className="text-center text-gray-500">
                    No expenses to pay
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, expensesToPay.length)} of{" "}
            {expensesToPay.length} results
          </div>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber + 1)}
                className={`px-3 py-1 rounded-md ${
                  pageNumber + 1 === currentPage
                    ? "bg-red-600 text-white"
                    : "bg-white text-red-600 hover:bg-red-50"
                }`}
              >
                {pageNumber + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountantPayment;
