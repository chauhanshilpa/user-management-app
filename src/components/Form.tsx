import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { NewUser, EditingUser } from "../interfaces";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { MdCancel } from "react-icons/md";

type userState = NewUser | EditingUser;
interface Props {
  formType: "create" | "edit";
  userState: NewUser | EditingUser;
  setUserState: React.Dispatch<React.SetStateAction<userState>>;
  onClickFunction: () => Promise<void>;
  setIsCreateNewUserIconClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditUserIconClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({
  formType,
  userState,
  setUserState,
  onClickFunction,
  setIsCreateNewUserIconClicked,
  setIsEditUserIconClicked,
}: Props) => {
  return (
    <Card className="form-card">
      <MdCancel
        className="cancel-icon"
        onClick={() => {
          setIsCreateNewUserIconClicked && setIsCreateNewUserIconClicked(false);
          setIsEditUserIconClicked && setIsEditUserIconClicked(false);
        }}
      />
      <Typography variant="h2" className="form-heading">
        {formType === "create" && "Create User"}
        {formType === "edit" && "Edit User"}
      </Typography>
      <Box className="text-fields-box">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          className="text-field"
          value={userState.name}
          onChange={(e) => setUserState({ ...userState, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          className="text-field"
          value={userState.email}
          onChange={(e) =>
            setUserState({ ...userState, email: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          className="text-field"
          value={userState.phone}
          onChange={(e) =>
            setUserState({ ...userState, phone: e.target.value })
          }
        />
      </Box>
      {formType === "create" && (
        <Button variant="contained" onClick={onClickFunction}>
          Add User
        </Button>
      )}
      {formType === "edit" && (
        <Button variant="contained" onClick={onClickFunction}>
          Update User
        </Button>
      )}
    </Card>
  );
};

export default Form;
