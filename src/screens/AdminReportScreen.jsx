import { useState, useEffect } from "react";
import moment from "moment";
import { BarChartComponent } from "../components/BarChatComponent";
import { PieChartComponent } from "../components/PieChartComponent";
import { LineChartComponent } from "../components/LineChartComponent";
import { BarChartActionsComponent } from "../components/BarChartActionsComponent";
import { get } from "../services/apiService";
import { CONSTANTS } from "../constants";
import { toast } from "react-toastify";

// Helper functions for data transformation
const transformDataForCharts = (expenseHistoryData, expenseFormsData) => {
  const actionFrequency = expenseHistoryData.reduce((acc, entry) => {
    acc[entry.action] = (acc[entry.action] || 0) + 1;
    return acc;
  }, {});

  const userActions = expenseHistoryData.reduce((acc, entry) => {
    acc[entry.userId] = (acc[entry.userId] || 0) + 1;
    return acc;
  }, {});

  const actionTimeline = expenseHistoryData.map((entry) => ({
    date: moment(entry.date).format("YYYY-MM-DD HH:mm"),
    action: entry.action,
  }));

  const expenseByForm = expenseFormsData.map((form) => ({
    id: form.id,
    totalAmount: form.totalAmount,
  }));

  const expenseTypes = expenseFormsData.flatMap((form) =>
    form.expenses.map((expense) => expense.type)
  );

  const expenseTypeCounts = expenseTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const formStatusCounts = expenseFormsData.reduce((acc, form) => {
    acc[form.status] = (acc[form.status] || 0) + 1;
    return acc;
  }, {});

  return {
    actionFrequency,
    userActions,
    actionTimeline,
    expenseByForm,
    expenseTypeCounts,
    formStatusCounts,
  };
};

const AdminReports = () => {
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [expense, setExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenseHistory = () => {
      get(CONSTANTS.CONTROLLER.ADMIN_API_EXPENSE_HISTORY)
        .then((response) => {
          if (response.statusCode === 200) {
            setExpenseHistory(response.data);
            console.log("Expense history", response.data);
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
    const fetchExpenses = () => {
      get(CONSTANTS.CONTROLLER.ADMIN_API_EXPENSE_FORMS)
        .then((response) => {
          if (response.statusCode === 200) {
            setExpenses(response.data);
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

    fetchExpenses();
    fetchExpenseHistory();
  }, []);

  const {
    actionFrequency,
    userActions,
    actionTimeline,
    expenseByForm,
    expenseTypeCounts,
    formStatusCounts,
  } = transformDataForCharts(expenseHistory, expense);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699"];

  const expenseByTypeData = Object.entries(expenseTypeCounts).map(
    ([type, count]) => ({ name: type, value: count })
  );
  const formStatusData = Object.entries(formStatusCounts).map(
    ([status, count]) => ({ name: status, value: count })
  );
  const actionFrequencyData = Object.entries(actionFrequency).map(
    ([action, count]) => ({ action, count })
  );
  const userActionsData = Object.entries(userActions).map(
    ([userId, count]) => ({ userId, value: count })
  );

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2>Total Expenses per Expense Form</h2>
          <BarChartComponent data={expenseByForm} />
        </div>
        <div>
          <h2>Expenses by Type</h2>
          <PieChartComponent
            data={expenseByTypeData}
            colors={COLORS}
            label="Expenses by Type"
          />
        </div>
        <div>
          <h2>Expense Form Status Overview</h2>
          <PieChartComponent
            data={formStatusData}
            colors={COLORS}
            label="Expense Form Status Overview"
          />
        </div>
        <div>
          <h2>Expense Form Action Timeline</h2>
          <LineChartComponent data={actionTimeline} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2>Action Frequency</h2>
          <BarChartActionsComponent data={actionFrequencyData} />
        </div>
        <div>
          <h2>User Actions Breakdown</h2>
          <PieChartComponent
            data={userActionsData}
            colors={COLORS}
            label="User Actions Breakdown"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
