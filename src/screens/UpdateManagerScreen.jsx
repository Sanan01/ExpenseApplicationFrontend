import { useState } from "react";
import { CONSTANTS } from "../constants/index";
import { getItem } from "../services/storageService";
import { post } from "../services/apiService";
import { toast } from "react-toastify";

export default function UpdateManagerScreen() {
  const [managerId, setManagerId] = useState("");
  const [userId, setUserId] = useState("");
  const user = getItem(CONSTANTS.USERNAME);

  const handleAssignManager = (e) => {
    e.preventDefault();

    const payload = {
      managerId,
      userId,
    };

    post(CONSTANTS.CONTROLLER.ADMIN_API_UPDATE_MANAGER, payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast("Manager assigned successfully");
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

  if (!user) {
    return <p>User not found.</p>; // Fallback if user is null
  }

  return (
    <>
      <div className="p-8 bg-white">
        <form
          onSubmit={handleAssignManager}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="managerId"
              className="mb-2 text-gray-700 font-medium"
            >
              Manager ID
            </label>
            <input
              type="text"
              id="managerId"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent w-full max-w-md"
              placeholder="Enter Manager ID"
              required
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="userId" className="mb-2 text-gray-700 font-medium">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent w-full max-w-md"
              placeholder="Enter User ID"
              required
            />
          </div>

          <div className="text-center w-full max-w-md">
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
            >
              Assign Manager
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
