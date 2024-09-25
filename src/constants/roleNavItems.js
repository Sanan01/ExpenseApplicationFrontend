import { CONSTANTS } from "./index";

export const roleNavItems = {
  Employee: [
    { name: "Expense Form Status", href: CONSTANTS.CONTROLLER.EXPENSE_LIST },
    { name: "Create New", href: CONSTANTS.CONTROLLER.EXPENSE_FORM },
  ],
  Manager: [
    { name: "Manager Approval", href: CONSTANTS.CONTROLLER.MANAGER_APPROVAL },
  ],
  Admin: [
    { name: "Admin Reports", href: CONSTANTS.CONTROLLER.ADMIN_REPORTS },
    { name: "Expense History", href: CONSTANTS.CONTROLLER.EXPENSE_HISTORY },
    {
      name: "Expense Forms Status",
      href: CONSTANTS.CONTROLLER.ADMIN_EXPENSE_FORMS,
    },
    { name: "Assign Manager", href: CONSTANTS.CONTROLLER.ADMIN_UPDATE_MANAGER },
  ],
  Accountant: [
    { name: "Expense Payment", href: CONSTANTS.CONTROLLER.ACCOUNTANT_PAYMENT },
  ],
};
