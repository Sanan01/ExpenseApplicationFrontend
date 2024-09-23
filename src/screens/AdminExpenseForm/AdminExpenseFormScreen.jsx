import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useAdminExpenseForm } from "./AdminExpenseFormContainer";

export default function AdminExpenseFormScreen() {
  const {
    pendingExpenses,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    formatDate,
    toggleSortOrder,
    handleSearch,
    handlePageChange,
  } = useAdminExpenseForm();

  return (
    <div className="p-8 bg-white">
      {/* Search Bar */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Status"
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

      {/* Expense Cards */}
      {pendingExpenses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pendingExpenses.map((expense) => (
            <div
              key={expense.id}
              className="p-6 bg-red-50 border-2 border-red-100 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-red-100 hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Employee :{" "}
                  <span className="text-red-600 text-sm">
                    {expense.applicationUser.userName}
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
                <p className="text-xl font-bold text-gray-700">
                  Status: <span className="text-red-600">{expense.status}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No expenses found.</p>
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
  );
}
