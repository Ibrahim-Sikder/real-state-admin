import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconSettings, IconUser } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut();
    dispatch(logout());
  };

  return (
    <Box sx={{ backgorund: 'red' }}>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <Link
          href="/dashboard/profile"
          passHref
          style={{
            textDecoration: "none",
          }}
        >
          <MenuItem component="a">
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Link>
        <Link
          href="/dashboard/settings"
          passHref
          style={{
            textDecoration: "none",
          }}
        >
          <MenuItem component="a">
            <ListItemIcon>
              <IconSettings width={20} />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Link>

        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="error"
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
