import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import Divider from "@mui/material/Divider";
import { CiGlobe } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";

const UserDetails = () => {
  const { state } = useLocation();
  const userDetails = state.userDetail;

  return (
    <Box className="user-details-container">
      <Typography className="name">{userDetails.name}</Typography>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          color: "gray",
        }}
      >
        <Typography className="email">
          <MdOutlineEmail />
          {userDetails.email}
        </Typography>
        <Typography className="phone">
          <MdOutlinePhone />
          {userDetails.phone}
        </Typography>
      </Box>
      <Divider />
      <Box
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <Typography className="website">
          <CiGlobe />{userDetails.website}
        </Typography>
        <Box>
          <Typography className="company-name">
            <BsBuildings/>{userDetails.company.name}
          </Typography>
          <Typography className="company-catchPhrase">
            <span style={{ fontWeight: "700" }}>Tagline:</span>&nbsp;&nbsp;
            {userDetails.company.catchPhrase}
          </Typography>
          <Typography className="company-bs">
            <span style={{ fontWeight: "700" }}>Slogan:</span>
            &nbsp;&nbsp;{userDetails.company.bs}
          </Typography>
        </Box>
        <Typography className="address">
          <FaRegAddressCard /> {userDetails.address.city},&nbsp;
          {userDetails.address.street},&nbsp;{userDetails.address.zipcode}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserDetails;
