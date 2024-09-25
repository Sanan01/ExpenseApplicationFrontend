import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import PlaceholderImage from "../assets/person.png";
import clsx from "clsx";

import { clearAllData } from "../services/storageService";
import { CONSTANTS } from "../constants";

export const UserProfile = () => {
  const logoutSubmit = () => {
    clearAllData();
    window.location.href = CONSTANTS.CONTROLLER.LOGIN_PAGE;
  };
  return (
    <Menu as="div" className="relative ml-3">
      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="sr-only">Open user menu</span>
        <img
          alt="User Profile"
          src={PlaceholderImage}
          className="h-8 w-8 rounded-full"
        />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
        <MenuItem>
          {({ active }) => (
            <button
              onClick={logoutSubmit}
              className={clsx(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              Sign out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
