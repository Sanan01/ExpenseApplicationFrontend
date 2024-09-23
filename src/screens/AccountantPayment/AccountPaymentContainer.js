/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { get, put } from "../../services/apiService";
import { CONSTANTS } from "../../constants";
import { toast } from "react-toastify";

export const useAccountPaymentContainer = () => {
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

  return {
    expensesToPay,
    searchTerm,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    handleMarkAsPaid,
    formatDate,
    toggleSortOrder,
    handleSearch,
    handlePageChange,
  };
};
