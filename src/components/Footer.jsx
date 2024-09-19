import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          © 2024 Expense Application. All rights reserved.
        </p>
        <div className="space-x-4 mt-4">
          <a href="#" className="hover:text-red-500">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-red-500">
            Terms of Service
          </a>
          <Link to="/aboutdev" className="hover:text-red-500">
            About Developer
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
