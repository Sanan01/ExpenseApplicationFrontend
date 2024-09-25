import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CONSTANTS } from "../constants";
import { getItem } from "../services/storageService";
import PlaceholderImage from "../assets/person.png";
import { useMemo } from "react";
import { roleNavItems } from "../constants/roleNavItems";
import { UserProfile } from "./UserProfile";
import { NavigationLinks } from "./NavigationLinks";

const Navbar = () => {
  const userName = getItem(CONSTANTS.USERNAME);
  const role = getItem(CONSTANTS.ROLE);
  const navItems = useMemo(() => roleNavItems[role] || [], [role]);

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-red-500 to-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <img
            alt="VeriPark Logo"
            src="https://www.veripark.com/themes/custom/rocketship_theme_flex/logo.svg"
            className="h-8"
          />
          {role && (
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavigationLinks items={navItems} />
              </div>
            </div>
          )}
        </div>

        {role && (
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <UserProfile />
              <div className="ml-3 text-base font-medium text-black">
                {userName}
              </div>
            </div>
          </div>
        )}

        {role && (
          <div className="-mr-2 flex md:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-red-500 p-2 text-white hover:bg-red-600">
              <Bars3Icon className="block h-6 w-6" />
              <XMarkIcon className="hidden h-6 w-6" />
            </DisclosureButton>
          </div>
        )}
      </div>

      {role && (
        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <NavigationLinks items={navItems} isMobile />
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <img
                alt="User Profile"
                src={PlaceholderImage}
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3 text-base font-medium text-black">
                {userName}
              </div>
            </div>
          </div>
        </DisclosurePanel>
      )}
    </Disclosure>
  );
};

export default Navbar;
