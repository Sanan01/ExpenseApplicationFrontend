/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { get, put } from "../../services/apiService";
import { CONSTANTS } from "../../constants";

export const useApprovedExpenseContainer = () => {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(5); // Items per page

  const [showModal, setShowModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, [searchTerm, sortOrder, currentPage]);

  const fetchExpenses = () => {
    get(
      `${CONSTANTS.CONTROLLER.GET_EXPENSES_MANAGER}?searchKeyword=${searchTerm}&orderBy=${sortOrder}&pageNumber=${currentPage}&pageSize=${itemsPerPage}`
    )
      .then((response) => {
        if (response.statusCode === 200) {
          setPendingExpenses(response.data.items);
          setTotalPages(response.data.totalPages);
        } else {
          toast("Error fetching expenses");
        }
      })
      .catch((error) => {
        console.error("Error fetching expenses", error);
      });
  };

  const handleApprove = (id) => {
    const payload = {
      id,
      status: "APPROVED",
      rejectionReason: "",
    };
    put(CONSTANTS.CONTROLLER.UPDATE_EXPENSE_MANAGER, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast("Expense approved successfully");
          setPendingExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== id)
          );
        } else {
          toast("Error approving expense");
        }
      })
      .catch((error) => {
        console.error("Error approving expense", error);
      });
  };

  const handleRequestChanges = (id) => {
    setSelectedExpenseId(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRejectionReason("");
  };

  const handleSubmitRejection = () => {
    if (!rejectionReason.trim()) {
      toast("Please provide a reason for rejection.");
      return;
    }
    const payload = {
      id: selectedExpenseId,
      status: "REJECTED",
      rejectionReason: rejectionReason,
    };
    put(CONSTANTS.CONTROLLER.UPDATE_EXPENSE_MANAGER, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast("Expense rejected and awaiting changes");
          setPendingExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== selectedExpenseId)
          );
        } else {
          toast("Error rejecting expense");
        }
      })
      .catch((error) => {
        console.error("Error rejecting expense", error);
      });

    handleModalClose();
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
    pendingExpenses,
    searchTerm,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    handleApprove,
    handleRequestChanges,
    formatDate,
    toggleSortOrder,
    handleSearch,
    handlePageChange,
    showModal,
    rejectionReason,
    setRejectionReason,
    handleModalClose,
    handleSubmitRejection,
  };
};
