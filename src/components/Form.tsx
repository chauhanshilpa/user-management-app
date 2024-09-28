import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { NewUser, EditingUser } from "../interfaces";

type userState = NewUser | EditingUser;

interface Props {
  formType: "create" | "edit";
  userState: NewUser | EditingUser;
  setUserState: React.Dispatch<React.SetStateAction<userState>>;
  onClickFunction: () => Promise<void>;
}

const Form = ({
  formType,
  userState,
  setUserState,
  onClickFunction,
}: Props) => {
  return (
    <>
      <Typography variant="h2" className="form-heading">
        {formType === "create" && "Create User"}
        {formType === "edit" && "Edit User"}
      </Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={userState.name}
        onChange={(e) => setUserState({ ...userState, name: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        value={userState.email}
        onChange={(e) => setUserState({ ...userState, email: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        value={userState.phone}
        onChange={(e) => setUserState({ ...userState, phone: e.target.value })}
      />
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
    </>
  );
};

export default Form;
