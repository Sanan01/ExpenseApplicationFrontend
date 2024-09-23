import { Navigate, Routes, Route } from "react-router-dom";
import AuthenticationScreen from "../screens/Authentication/AuthenticationScreen";
import { CONSTANTS } from "../constants";
import ExpenseList from "../screens/ExpenseList/ExpenseList";
import ExpenseForm from "../screens/CreateExpenseForm/ExpenseFormScreen";
import AdminReports from "../screens/AdminReport/AdminReportScreen";
import AccountantPayment from "../screens/AccountantPayment/AccountantPaymentScreen";
import ManagerApproval from "../screens/ApproveExpenseForm/ManagerApprovalScreen";
import { getItem } from "../services/storageService";
import ProtectedRoute from "./protectedRoute";
import ExpenseHistoryScreen from "../screens/ExpenseHistory/ExpenseHistoryScreen";
import AdminExpenseFormScreen from "../screens/AdminExpenseForm/AdminExpenseFormScreen";
import UpdateManagerScreen from "../screens/AssignManager/UpdateManagerScreen";
import AboutDeveloper from "../screens/AboutDeveloper/AboutDeveloper";

export const RouteManager = () => {
  const isAuth = getItem(CONSTANTS.AUTHENTICATED);
  const userRole = getItem(CONSTANTS.ROLE);
  const isEmployee = userRole === "Employee";
  const isManager = userRole === "Manager";
  const isAdmin = userRole === "Admin";
  const isAccountant = userRole === "Accountant";

  return (
    <Routes>
      {isAuth ? (
        <Route element={<ProtectedRoute />}>
          <Route
            path={CONSTANTS.CONTROLLER.LOGIN_PAGE}
            element={<Navigate to={CONSTANTS.CONTROLLER.HOME} />}
          />

          {isEmployee && (
            <>
              <Route
                path={CONSTANTS.CONTROLLER.HOME}
                element={<Navigate to={CONSTANTS.CONTROLLER.EXPENSE_LIST} />}
              />
              <Route
                path={CONSTANTS.CONTROLLER.EXPENSE_LIST}
                element={<ExpenseList />}
              />
              <Route
                path={CONSTANTS.CONTROLLER.EXPENSE_FORM}
                element={<ExpenseForm />}
              />
            </>
          )}

          {/* Manager Routes */}
          {isManager && (
            <>
              <Route
                path={CONSTANTS.CONTROLLER.HOME}
                element={
                  <Navigate to={CONSTANTS.CONTROLLER.MANAGER_APPROVAL} />
                }
              />
              <Route
                path={CONSTANTS.CONTROLLER.MANAGER_APPROVAL}
                element={<ManagerApproval />}
              />
            </>
          )}

          {/* Admin Routes */}
          {isAdmin && (
            <>
              <Route
                path={CONSTANTS.CONTROLLER.HOME}
                element={<Navigate to={CONSTANTS.CONTROLLER.ADMIN_REPORTS} />}
              />
              <Route
                path={CONSTANTS.CONTROLLER.ADMIN_REPORTS}
                element={<AdminReports />}
              />
              <Route
                path={CONSTANTS.CONTROLLER.EXPENSE_HISTORY}
                element={<ExpenseHistoryScreen />}
              />
              <Route
                path={CONSTANTS.CONTROLLER.ADMIN_EXPENSE_FORMS}
                element={<AdminExpenseFormScreen />}
              />
              <Route
                path={CONSTANTS.CONTROLLER.ADMIN_UPDATE_MANAGER}
                element={<UpdateManagerScreen />}
              />
            </>
          )}

          {/* Accountant Routes */}
          {isAccountant && (
            <>
              <Route
                path={CONSTANTS.CONTROLLER.HOME}
                element={
                  <Navigate to={CONSTANTS.CONTROLLER.ACCOUNTANT_PAYMENT} />
                }
              />
              <Route
                path={CONSTANTS.CONTROLLER.ACCOUNTANT_PAYMENT}
                element={<AccountantPayment />}
              />
            </>
          )}
        </Route>
      ) : (
        <>
          {/* Public Routes (Unauthenticated) */}
          <Route
            path={CONSTANTS.CONTROLLER.HOME}
            element={<AuthenticationScreen />}
          />
          <Route
            path={CONSTANTS.CONTROLLER.LOGIN_PAGE}
            element={<AuthenticationScreen />}
          />
        </>
      )}
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/aboutdev" element={<AboutDeveloper />} />
    </Routes>
  );
};
