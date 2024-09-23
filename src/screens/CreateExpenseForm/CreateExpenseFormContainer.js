import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../constants";
import { getItem } from "../../services/storageService";
import { post, put } from "../../services/apiService";
import { toast } from "react-toastify";

export const useCreateExpenseFormContainer = () => {
  const isEmpty = (obj) => Object.keys(obj).length === 0;
  const currencies = ["USD", "EUR", "GBP", "JPY", "PKR"];
  const types = ["Travel", "Food", "Lodging", "Miscellaneous"];
  const user = getItem(CONSTANTS.USERNAME);
  const role = getItem(CONSTANTS.ROLE);
  const navigate = useNavigate();
  const location = useLocation();
  const expense = location.state || {};
  const isCreate = isEmpty(expense) ? true : false;
  const numberOfExpenses = isEmpty(expense) ? 0 : expense.expenses.length;

  const [currency, setCurrency] = useState(
    !isEmpty(expense) ? expense.currency : "USD"
  );

  const [expenses, setExpenses] = useState(
    !isEmpty(expense)
      ? expense.expenses
      : [{ id: 1, type: "", amount: "", title: "", description: "" }]
  );
  const [totalAmount, setTotalAmount] = useState(
    !isEmpty(expense) ? expense.totalAmount : 0
  );
  const [status, setStatus] = useState(
    !isEmpty(expense) ? expense.status : "PENDING"
  );

  const handleAddExpense = () => {
    setExpenses([
      ...expenses,
      {
        id: expenses.length + 1,
        type: "",
        amount: "",
        title: "",
        description: "",
      },
    ]);
  };

  const handleRemoveExpense = (exp) => {
    setExpenses(expenses.filter((expense) => expense.id !== exp.id));
    setTotalAmount((prev) => prev - exp.amount);
  };

  const handleExpenseChange = (id, field, value) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === id) {
        return { ...expense, [field]: value };
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    calculateTotal(updatedExpenses);
  };

  const calculateTotal = (expenses) => {
    const total = expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount || 0),
      0
    );
    setTotalAmount(total);
  };

  const removeKeysFromNewExpenses = () => {
    const ids = new Set(expense.expenses.map((obj) => obj.id));
    const updatedArray = expenses.map((obj) => {
      if (!ids.has(obj.id)) {
        const { id, expenseFormId, ...rest } = obj;
        return rest;
      }
      return obj;
    });
    return updatedArray;
  };

  const updateForm = () => {
    const payload = {
      id: expense.id,
      currency: currency,
      totalAmount: totalAmount,
      expenses: removeKeysFromNewExpenses(),
    };
    put(CONSTANTS.CONTROLLER.UPDATE_EXPENSES, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          setStatus("PENDING");
          toast("Expense form submitted for approval");
          navigate(CONSTANTS.CONTROLLER.EXPENSE_LIST);
        } else {
          toast("Error updating expense form");
        }
      })
      .catch((error) => {
        console.error("Error updating expense form", error);
      });
  };

  const addForm = () => {
    const payload = {
      currency: currency,
      totalAmount: totalAmount,
      expenses: expenses.map(({ id, expenseFormId, ...rest }) => rest),
    };
    post(CONSTANTS.CONTROLLER.ADD_EXPENSES, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          setStatus("PENDING");
          toast("Expense form submitted for approval");
          navigate(CONSTANTS.CONTROLLER.EXPENSE_LIST);
        } else {
          toast("Error creating expense form");
        }
      })
      .catch((error) => {
        console.error("Error creating expense form", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any individual expense exceeds 5000
    for (const exp of expenses) {
      if (parseFloat(exp.amount) > 5000) {
        toast(
          "Each expense amount cannot exceed 5000 units of the chosen currency."
        );
        return; // Stop the form submission
      }
    }
    isCreate ? addForm() : updateForm();
  };
  return {
    currencies,
    types,
    user,
    role,
    navigate,
    expense,
    isCreate,
    numberOfExpenses,
    currency,
    setCurrency,
    expenses,
    setExpenses,
    totalAmount,
    setTotalAmount,
    status,
    setStatus,
    handleAddExpense,
    handleRemoveExpense,
    handleExpenseChange,
    handleSubmit,
  };
};
