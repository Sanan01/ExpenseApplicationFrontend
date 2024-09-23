import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useExpenseHistoryContainer } from "./ExpenseHistoryContainer";

export default function ExpenseHistoryScreen() {
  const {
    expenseHistory,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    user,
    formatDate,
    toggleSortOrder,
    handleSearch,
    handlePageChange,
  } = useExpenseHistoryContainer();

  if (!user) {
    return <p>User not found.</p>; // Fallback if user is null
  }

  return (
    <>
      <div className="p-8 bg-white">
        {/* Search Bar */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Action or User ID"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleSearch}
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

        {/* Expense History Cards */}
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
                    <strong>User :</strong> {history.userName}
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, expenseHistory.length)} of{" "}
            {expenseHistory.length} results
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
}
