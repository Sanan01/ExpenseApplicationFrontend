import { FaEdit, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useExpenseListContainer } from "./ExpenseListContainer";

const ExpenseList = () => {
  const {
    expenses,
    isModalOpen,
    modalReason,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    handleEdit,
    handleViewReason,
    closeModal,
    handleSearch,
    toggleSortOrder,
    handlePageChange,
    formatDate,
  } = useExpenseListContainer();

  return (
    <div className="mt-64px">
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Status"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Sort Button */}
          <button
            onClick={toggleSortOrder}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
          >
            {sortOrder === "asc" ? (
              <>
                <FaSortAmountDown className="mr-2" />
                Sort Desc
              </>
            ) : (
              <>
                <FaSortAmountUp className="mr-2" />
                Sort Asc
              </>
            )}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form Id
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
                    {expense.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        expense.status === "APPROVED" ||
                        expense.status === "PAID"
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
                        className="text-red-600 hover:text-red-900 mr-2"
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

      {/* Pagination */}
      <div className="flex justify-between items-center m-4">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, expenses.length)} of{" "}
          {expenses.length} results
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
