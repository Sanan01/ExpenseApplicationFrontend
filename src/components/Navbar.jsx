import { Link } from "react-router-dom";
import { CONSTANTS } from "../constants";
import { getItem } from "../services/storageService";

const Navbar = () => {
  const role = getItem(CONSTANTS.ROLE);

  return (
    <nav className="bg-white text-red-500 shadow-sm">
      <div className="flex justify-start pl-5 items-center h-12">
        <div className="flex justify-between h-16">
          {role == "Employee" && (
            <div className="flex items-center">
              <Link
                to={CONSTANTS.CONTROLLER.EXPENSE_LIST}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Expense Form Status
              </Link>
              <Link
                to={CONSTANTS.CONTROLLER.EXPENSE_FORM}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Create New
              </Link>
            </div>
          )}
          {role == "Manager" && (
            <div className="flex items-center">
              <Link
                to={CONSTANTS.CONTROLLER.MANAGER_APPROVAL}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Manager Approval
              </Link>
            </div>
          )}
          {role == "Admin" && (
            <div className="flex items-center">
              <Link
                to={CONSTANTS.CONTROLLER.ADMIN_REPORTS}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Admin Reports
              </Link>
              <Link
                to={CONSTANTS.CONTROLLER.EXPENSE_HISTORY}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Expense History
              </Link>
              <Link
                to={CONSTANTS.CONTROLLER.ADMIN_EXPENSE_FORMS}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Expense Forms Status
              </Link>
              <Link
                to={CONSTANTS.CONTROLLER.ADMIN_UPDATE_MANAGER}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Assign Manager
              </Link>
            </div>
          )}
          {role == "Accountant" && (
            <div className="flex items-center">
              <Link
                to={CONSTANTS.CONTROLLER.ACCOUNTANT_PAYMENT}
                className="text-red-800 text-lg font-semibold mr-6"
              >
                Expense Payment
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
