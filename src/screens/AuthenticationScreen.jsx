/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import React, { useState } from "react";
import { CONSTANTS } from "../constants";
import { post } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { setItem } from "../services/storageService";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function AuthenticationScreen() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "username":
        newErrors.username =
          value.length < 5 ? "Username must be at least 3 characters" : "";
        break;
      case "password": {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        newErrors.password = !passwordRegex.test(value)
          ? "Password must be at least 8 characters long, contain a uppercase letter, a digit, and a special character"
          : "";
        break;
      }
      default:
        break;
    }
    setErrors(newErrors);
  };

  const checkNavigation = (data) => {
    switch (data.role) {
      case "Admin":
        window.location.href = CONSTANTS.CONTROLLER.ADMIN_REPORTS;
        break;
      case "Manager":
        window.location.href = CONSTANTS.CONTROLLER.MANAGER_APPROVAL;
        break;
      case "Employee":
        window.location.href = CONSTANTS.CONTROLLER.EXPENSE_LIST;
        break;
      case "Accountant":
        window.location.href = CONSTANTS.CONTROLLER.ACCOUNTANT_PAYMENT;
        break;
      default:
        window.location.href = CONSTANTS.CONTROLLER.HOME;
        break;
    }
  };

  const login = (payload) => {
    post(CONSTANTS.CONTROLLER.LOGIN, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          setItem(CONSTANTS.AUTHENTICATED, CONSTANTS.TRUE);
          setItem(CONSTANTS.USERNAME, response.data.username);
          setItem(CONSTANTS.ROLE, response.data.role);
          setItem(CONSTANTS.TOKEN, response.data.token);
          checkNavigation(response.data);
        } else {
          toast("Incorrect Username or Password");
        }
      })
      .catch((error) => {
        toast("Incorrect Username or Password");
      });
  };

  const register = (payload) => {
    payload.role = "Employee";
    payload.managerId = "";
    post(CONSTANTS.CONTROLLER.REGISTER, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast("User registered successfully");
          setIsLogin(true);
        } else {
          toast("Error registering user");
        }
      })
      .catch((error) => {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password,
    };
    isLogin ? login(payload) : register(payload);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pl-10"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pl-10 pr-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FaEye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-spacing-1 text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isLogin ? "Sign in" : "Register"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={toggleAuthMode}
            className="font-medium text-red-600 hover:text-red-500"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationScreen;
