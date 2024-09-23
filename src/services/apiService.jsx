// src/services/api.js
import { create } from "apisauce";
import { CONSTANTS } from "../constants";
import { clearAllData, getItem } from "./storageService";
import { toast } from "react-toastify";

const api = create({
  baseURL: CONSTANTS.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request transforms to handle token
api.addRequestTransform((request) => {
  const token = getItem(CONSTANTS.TOKEN); // Retrieve token from storage
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

// Utility functions

export const get = async (endpoint) => {
  const response = await api.get(endpoint);
  if (response.ok) return response.data;
  else if (response.status === 401) {
    toast("Session expired. Please login again");
    clearAllData();
    window.location.href = CONSTANTS.CONTROLLER.LOGIN_PAGE;
  }
  throw new Error(response.problem);
};

export const post = async (endpoint, data) => {
  const response = await api.post(endpoint, data);
  if (response.ok) return response.data;
  else if (response.status === 401) {
    toast("Session expired. Please login again");
    clearAllData();
    window.location.href = CONSTANTS.CONTROLLER.LOGIN_PAGE;
  }
  throw new Error(response.problem);
};

export const put = async (endpoint, data) => {
  const response = await api.put(endpoint, data);
  if (response.ok) return response.data;
  else if (response.status === 401) {
    toast("Session expired. Please login again");
    clearAllData();
    window.location.href = CONSTANTS.CONTROLLER.LOGIN_PAGE;
  }
  throw new Error(response.problem);
};
