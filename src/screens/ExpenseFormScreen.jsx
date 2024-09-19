/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CONSTANTS } from "../constants";
import { getItem } from "../services/storageService";
import { toast } from "react-toastify";
import { post, put } from "../services/apiService";

const ExpenseForm = () => {
  const isEmpty = (obj) => Object.keys(obj).length === 0;
  const currencies = ["USD", "EUR", "GBP", "JPY", "PKR"];
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
    if (totalAmount > 25000) {
      toast("Total amount cannot exceed 25000 units of the chosen currency.");
      return;
    }
    isCreate ? addForm() : updateForm();
  };

  return (
    <>
      <div className="p-8 bg-white">
        <div className="w-[200px] mb-[20px] mx-auto">
          <label className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          {expenses.map((expense) => (
            <div key={expense.id} className="mb-6 p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    value={expense.title}
                    onChange={(e) =>
                      handleExpenseChange(expense.id, "title", e.target.value)
                    }
                    disabled={!role == "Employee"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    value={expense.type}
                    onChange={(e) =>
                      handleExpenseChange(expense.id, "type", e.target.value)
                    }
                    disabled={!role == "Employee"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    value={expense.amount}
                    onChange={(e) => {
                      if (e.target.value > 5000) {
                        toast(
                          "Amount cannot exceed 5000 units of the chosen currency."
                        );
                      }
                      handleExpenseChange(expense.id, "amount", e.target.value);
                    }}
                    disabled={!role == "Employee"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    value={expense.description}
                    onChange={(e) =>
                      handleExpenseChange(
                        expense.id,
                        "description",
                        e.target.value
                      )
                    }
                    disabled={role !== "Employee"}
                    required
                    rows={4} // This determines the height of the textarea (number of visible lines)
                  ></textarea>
                </div>
              </div>
              {expenses.length > 1 && role == "Employee" && (
                <button
                  type="button"
                  onClick={() => handleRemoveExpense(expense)}
                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaMinus className="mr-1" /> Remove
                </button>
              )}
            </div>
          ))}
          {role == "Employee" && (
            <button
              type="button"
              onClick={handleAddExpense}
              className="mb-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaPlus className="mr-2" /> Add Expense
            </button>
          )}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">
              Total Amount: {totalAmount.toFixed(2)} {expenses[0].currency}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">Status:</span>
              {status === "PENDING" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  PENDING
                </span>
              )}
              {status === "APPROVED" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  APPROVED
                </span>
              )}
              {status === "REJECTED" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  REJECTED
                </span>
              )}
            </div>
            {role == "Employee" && (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Submit for Approval
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
