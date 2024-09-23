/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get } from "../../services/apiService";
import { CONSTANTS } from "../../constants/index";
import { getItem } from "../../services/storageService";

export const useExpenseHistoryContainer = () => {
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(4); // Page size
  const user = getItem(CONSTANTS.USERNAME);

  useEffect(() => {
    fetchExpenseHistory();
  }, [searchTerm, sortOrder, currentPage]);

  const fetchExpenseHistory = () => {
    get(
      `${CONSTANTS.CONTROLLER.ADMIN_API_EXPENSE_HISTORY}?searchKeyword=${searchTerm}&orderBy=${sortOrder}&pageNumber=${currentPage}&pageSize=${itemsPerPage}`
    )
      .then((response) => {
        if (response.statusCode === 200) {
          setExpenseHistory(response.data.items);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Error fetching expense history");
          toast("Error fetching expense history");
        }
      })
      .catch((error) => {
        console.error("Error fetching expense history", error);
        toast("Error fetching expense history");
      });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return {
    expenseHistory,
    searchTerm,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    user,
    formatDate,
    toggleSortOrder,
    handleSearch,
    handlePageChange,
  };
};
