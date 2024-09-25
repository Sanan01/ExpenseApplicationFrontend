import { NavLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

export const NavigationLinks = ({ items, isMobile = false }) => (
  <>
    {items.map((item) => (
      <NavLink
        key={item.name}
        to={item.href}
        className={({ isActive }) =>
          clsx(
            isActive ? "bg-red-600 text-white" : "text-white hover:bg-red-400",
            isMobile
              ? "block rounded-md px-3 py-2 text-base font-medium"
              : "rounded-md px-3 py-2 text-sm font-medium"
          )
        }
      >
        {item.name}
      </NavLink>
    ))}
  </>
);

NavigationLinks.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  isMobile: PropTypes.bool,
};
