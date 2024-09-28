import "./App.css";
import { useState, useEffect } from "react";
import {
  getUserData,
  addNewUser,
  deleteExistingUser,
  updateExistingUser,
} from "./api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { User, NewUser, EditingUser } from "./interfaces";
import UsersTable from "./components/UsersTable";
import Form from "./components/Form";
import { IoMdPersonAdd } from "react-icons/io";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isCreateNewUserIconClicked, setIsCreateNewUserIconClicked] =
    useState(false);
  const [isEditUserIconClicked, setIsEditUserIconClicked] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    phone: "",
  });
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await getUserData();
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, []);

  const createUser = async () => {
    try {
      const response = await addNewUser(newUser);
      setUsers([...users, response?.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
    setNewUser({ name: "", email: "", phone: "" });
  };

  const updateUser = async () => {
    try {
      const response = await updateExistingUser(editingUser);
      const updatedUsers = users.map((user) =>
        user.id === (editingUser !== null && editingUser.id)
          ? response?.data
          : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await deleteExistingUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box className="app">
      {isCreateNewUserIconClicked && (
        <Form
          formType="create"
          userState={newUser}
          setUserState={setNewUser}
          onClickFunction={createUser}
          setIsCreateNewUserIconClicked={setIsCreateNewUserIconClicked}
          setIsEditUserIconClicked={setIsEditUserIconClicked}
        />
      )}
      {editingUser && isEditUserIconClicked && (
        <Form
          formType="edit"
          userState={editingUser}
          setUserState={(userState) => setEditingUser(userState as EditingUser)}
          onClickFunction={updateUser}
          setIsCreateNewUserIconClicked={setIsCreateNewUserIconClicked}
          setIsEditUserIconClicked={setIsEditUserIconClicked}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Typography variant="h1" className="app-name">
                User Management
              </Typography>
              <Typography variant="h2" className="user-table-name">
                Users Data Table
              </Typography>
              <IoMdPersonAdd
                onClick={() => {
                  setIsCreateNewUserIconClicked(true);
                  setIsEditUserIconClicked(false);
                }}
                style={{ cursor: "pointer" }}
              />
              <UsersTable
                users={users}
                deleteUser={deleteUser}
                setEditingUser={setEditingUser}
                setIsEditUserIconClicked={setIsEditUserIconClicked}
                setIsCreateNewUserIconClicked={setIsCreateNewUserIconClicked}
              />
            </>
          }
        />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </Box>
  );
};

export default App;
