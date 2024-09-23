/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../constants";
import { get } from "../../services/apiService";
import { toast } from "react-toastify";

export const useExpenseListContainer = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReason, setModalReason] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(5);

  // Fetch expenses based on current page, sort order, and search term
  const fetchExpenses = async (searchTerm = "") => {
    try {
      const response = await get(
        `${CONSTANTS.CONTROLLER.GET_EXPENSES}/?orderBy=${sortOrder}&searchKeyword=${searchTerm}&pageNumber=${currentPage}&pageSize=${itemsPerPage}`
      );
      if (response.statusCode === 200) {
        setExpenses(response.data.items);
        setCurrentPage(response.data.pageIndex);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error("Error fetching expenses");
      }
    } catch (error) {
      console.error("Error fetching expenses", error);
      toast.error("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [sortOrder, currentPage]);

  const handleEdit = (expense) => {
    navigate(CONSTANTS.CONTROLLER.EXPENSE_FORM, { state: expense });
  };

  const handleViewReason = (reason) => {
    setModalReason(reason);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (searchTerm) => {
    setCurrentPage(1);
    fetchExpenses(searchTerm);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };
  return {
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
  };
};
