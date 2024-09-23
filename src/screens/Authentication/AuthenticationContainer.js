import { toast } from "react-toastify";
import { useState } from "react";
import { CONSTANTS } from "../../constants";
import { post } from "../../services/apiService";
import { setItem } from "../../services/storageService";

export const useAuthenticationContainer = () => {
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
        console.log("error", error);
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
      .catch((error) => {
        console.log("error", error);
      });
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
  return {
    isLogin,
    showPassword,
    formData,
    errors,
    handleChange,
    handleSubmit,
    toggleAuthMode,
    setShowPassword,
  };
};
