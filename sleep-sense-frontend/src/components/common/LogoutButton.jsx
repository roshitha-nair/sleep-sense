import { IconButton, Tooltip } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  return (
    <Tooltip
      title="Logout"
      arrow
      placement="bottom"
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "0.75rem",
            borderRadius: 1,
          },
        },
        arrow: {
          sx: {
            color: "#000",
          },
        },
      }}
    >
      <IconButton
        onClick={handleLogout}
        sx={{
          color: "text.primary",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <LogoutRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}
