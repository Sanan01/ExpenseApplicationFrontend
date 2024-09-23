import { BarChartComponent } from "../../components/BarChatComponent";
import { PieChartComponent } from "../../components/PieChartComponent";
import { LineChartComponent } from "../../components/LineChartComponent";
import { BarChartActionsComponent } from "../../components/BarChartActionsComponent";
import { useAdminReportContainer } from "./AdminReportContainer";

const AdminReports = () => {
  const {
    expenseByTypeData,
    formStatusData,
    actionFrequencyData,
    userActionsData,
    actionTimeline,
    COLORS,
    expenseByForm,
  } = useAdminReportContainer();

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
