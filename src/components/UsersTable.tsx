import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { User, EditingUser } from "../interfaces";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
interface Props {
  users: User[];
  setEditingUser: React.Dispatch<React.SetStateAction<EditingUser | null>>;
  deleteUser: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => Promise<void>;
  setIsEditUserIconClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreateNewUserIconClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersTable = ({
  users,
  setEditingUser,
  deleteUser,
  setIsEditUserIconClicked,
  setIsCreateNewUserIconClicked,
}: Props) => {
  const navigate = useNavigate();
  return (
    <TableContainer className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="table-head">
          <TableRow className="table-row">
            <TableCell className="cell-name">Name</TableCell>
            <TableCell className="cell-name" align="right">
              E-mail
            </TableCell>
            <TableCell className="cell-name" align="right">
              Phone
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => navigate("/user-details", {state: {userDetail: {...user}}})}
              style={{cursor: "pointer"}}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">
                <FaEdit
                  onClick={(event) => {
                    event.stopPropagation();
                    setEditingUser(user);
                    setIsEditUserIconClicked(true);
                    setIsCreateNewUserIconClicked(false);
                  }}
                  className="icon edit-icon"
                />
                <MdDelete
                  onClick={(event) => deleteUser(event, user.id)}
                  className="icon delete-icon"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
