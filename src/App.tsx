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
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface NewUser {
  name: string;
  email: string;
  phone: string;
}

interface EditingUser extends NewUser {
  id: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
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
      <Typography variant="h1" className="app-name">User Management</Typography>
      <Typography variant="h2" className="user-table">Users</Typography>
      <TableContainer className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => setEditingUser(user)}>Edit</Button>
                  <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="create-user-form">
        <Typography variant="h2" className="form-heading">Create User</Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <Button variant="contained" onClick={createUser}>
          Add User
        </Button>
      </Box>
      <Box>
        {editingUser && (
          <Box className="edit-user-form">
            <Typography variant="h2" className="form-heading">Edit User</Typography>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              value={editingUser.phone}
              onChange={(e) =>
                setEditingUser({ ...editingUser, phone: e.target.value })
              }
            />
            <Button variant="contained" onClick={updateUser}>
              Update User
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserManagement;
