import { useState } from "react";
import { CONSTANTS } from "../../constants/index";
import { getItem } from "../../services/storageService";
import { put } from "../../services/apiService";
import { toast } from "react-toastify";

export const useAssignManagerContainer = () => {
  const [managerId, setManagerId] = useState("");
  const [userId, setUserId] = useState("");
  const user = getItem(CONSTANTS.USERNAME);

  const handleAssignManager = (e) => {
    e.preventDefault();

    const payload = {
      userId: userId,
      managerId: managerId,
    };

    put(CONSTANTS.CONTROLLER.ADMIN_API_UPDATE_MANAGER, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast("Manager assigned successfully");
          setManagerId("");
          setUserId("");
        } else {
          console.error("Error assigning manager");
          toast("Error assigning manager");
        }
      })
      .catch((error) => {
        console.error("Error assigning manager", error);
        toast("Error assigning manager");
      });
  };
  return {
    managerId,
    setManagerId,
    userId,
    setUserId,
    user,
    handleAssignManager,
  };
};
