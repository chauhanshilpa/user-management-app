import axios from "axios";
import { NewUser, EditingUser } from "./interfaces";

// Create New User
export const addNewUser = async (newUser: NewUser) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newUser
    );
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
  }
  return;
};

// Read User
export const getUserData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response;
};

// Update Existing User
export const updateExistingUser = async (editingUser: EditingUser | null) => {
  try {
    const response = axios.put(
      `https://jsonplaceholder.typicode.com/users/${
        editingUser !== null && editingUser.id
      }`,
      editingUser
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
  }
  return;
};

// Delete Existing User
export const deleteExistingUser = async (id: number) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
  return;
};
