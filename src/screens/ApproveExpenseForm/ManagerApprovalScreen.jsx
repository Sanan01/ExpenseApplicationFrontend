import {
  FaCheck,
  FaEdit,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { useApprovedExpenseContainer } from "./ApprovedExpenseContainer";

const ManagerApproval = () => {
  const {
    pendingExpenses,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    handleApprove,
    formatDate,
    toggleSortOrder,
    handleSearch,
    handlePageChange,
    showModal,
    rejectionReason,
    setRejectionReason,
    handleModalClose,
    handleSubmitRejection,
    handleRequestChanges,
  } = useApprovedExpenseContainer();

  return (
    <>
      <div className="p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">Expenses Awaiting Approval</h2>
        {/* Search and Sorting */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Employee ID"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleSearch}
          />

          <div className="flex space-x-4">
            <button
              onClick={() => toggleSortOrder("dateUpdated")}
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

        {pendingExpenses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingExpenses.map((expense) => (
              <div key={expense.id} className="mb-8 p-6 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-600">
                    Employee : {expense.applicationUser.userName}
                  </h3>
                  <p className="text-gray-600">
                    Date: {formatDate(expense.dateUpdated)}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Expense Items:</h4>
                  <ul className="list-disc pl-5">
                    {expense.expenses.map((item, index) => (
                      <li key={index} className="mb-1">
                        <div>
                          <strong>{item.title}</strong>
                          <p>Description: {item.description}</p>
                          <p>Type: {item.type}</p>
                          <p>
                            Amount: {expense.currency} {item.amount}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    Total: {expense.currency} {expense.totalAmount}
                  </p>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleApprove(expense.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaCheck className="mr-2" /> Approve
                  </button>
                  <button
                    onClick={() => handleRequestChanges(expense.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <FaEdit className="mr-2" /> Request Changes
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No expenses pending approval.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, pendingExpenses.length)} of{" "}
            {pendingExpenses.length} results
          </div>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal for requesting changes */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4">Request Changes</h3>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Enter reason for rejection"
                rows="4"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRejection}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManagerApproval;
