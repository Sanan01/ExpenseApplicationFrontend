/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { get } from "../../services/apiService";
import { CONSTANTS } from "../../constants";
import { toast } from "react-toastify";

export const useAdminExpenseForm = () => {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(4); // Page size

  useEffect(() => {
    fetchExpenses();
  }, [searchTerm, sortOrder, currentPage]);

  const fetchExpenses = () => {
    get(
      `${CONSTANTS.CONTROLLER.ADMIN_API_EXPENSE_FORMS}?searchKeyword=${searchTerm}&orderBy=${sortOrder}&pageNumber=${currentPage}&pageSize=${itemsPerPage}`
    )
      .then((response) => {
        if (response.statusCode === 200) {
          setPendingExpenses(response.data.items);
          setTotalPages(response.data.totalPages);
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Sample formatting
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after searching
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return {
    pendingExpenses,
    searchTerm,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    fetchExpenses,
    formatDate,
    toggleSortOrder,
    handleSearch,
    handlePageChange,
  };
};
