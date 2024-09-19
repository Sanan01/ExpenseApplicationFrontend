import { CONSTANTS } from "../constants";
import { Link } from "react-router-dom";
import { clearAllData, getItem } from "../services/storageService";
const Header = () => {
  const user = getItem(CONSTANTS.USERNAME);
  const logoutSubmit = () => {
    clearAllData();
    window.location.href = CONSTANTS.CONTROLLER.LOGIN_PAGE;
  };
  return (
    <header className="w-full h-16 min-h-16 bg-gradient-to-r from-red-500 to-white flex items-center justify-between px-4 shadow-md z-50">
      <Link
        className="text-2xl font-bold text-black"
        to={CONSTANTS.CONTROLLER.HOME}
      >
        <img
          src="https://www.veripark.com/themes/custom/rocketship_theme_flex/logo.svg"
          alt="Home"
          className="h-8"
        />
      </Link>
      {user && (
        <div className="flex-grow text-center font-bold text-xl text-black">
          Welcome, {user?.toUpperCase()}
        </div>
      )}
      {user && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={logoutSubmit}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
