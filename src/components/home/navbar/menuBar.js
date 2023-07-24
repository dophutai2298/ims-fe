import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authActions } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MenuBar() {
  // state open menu mutil level and navbar
  const [openUv, setOpenUv] = React.useState(null);
  const [openUvNav, setOpenUvNav] = useState(null);
  const [openBatch, setOpenBatch] = React.useState(null);
  const [openBatchNav, setOpenBatchNav] = useState(null);
  const [openNav, setOpenNav] = useState(null);

  const isOpenUv = Boolean(openUv);
  const isOpenBatch = Boolean(openBatch);
  const isOpenNav = Boolean(openNav);
  const isOpenUvNav = Boolean(openUvNav);
  const isOpenBatchNav = Boolean(openBatchNav);
  const id = useSelector((state) => state.auth.id);

  // login/logout
  const dispatch = useDispatch();
  const logoutHandler = () => {
    setOpenNav(null);
    Swal.fire({
      title: "Bạn có muốn đăng xuất ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(authActions.logout());
      }
    });
  };

  /* set value object with MUI */
  // navbar responsive lg
  const handleOpenUv = (event) => {
    setOpenUv(event.currentTarget);
  };
  const handleOpenBatch = (event) => {
    setOpenBatch(event.currentTarget);
  };

  // navbar responsive md
  const handleOpenUvNav = (event) => {
    setOpenUvNav(event.currentTarget);
  };
  const handleOpenBatchNav = (event) => {
    setOpenBatchNav(event.currentTarget);
  };

  const handleOpenNav = (event) => {
    setOpenNav(event.currentTarget);
  };

  // navbar responsive md
  const handleCloseUvNav = () => {
    setOpenUvNav(null);
  };
  const handleCloseBatchNav = () => {
    setOpenBatchNav(null);
  };

  const handleClose = () => {
    setOpenBatch(null);
    setOpenNav(null);
    setOpenUv(null);
    setOpenBatchNav(null);
    setOpenUvNav(null);
  };

  return (
    <>
      {/* position="static" */}
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* menu responsive md */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              IMS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNav}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={openNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={isOpenNav}
                onClose={handleClose}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <Typography
                    component={Link}
                    onClick={handleClose}
                    to="/mentor"
                    sx={{
                      my: 0,
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Mentor
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    sx={{ my: 0, display: "block" }}
                    onClick={handleOpenUvNav}
                  >
                    Ứng viên
                  </Typography>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={openUvNav}
                    open={isOpenUvNav}
                    onClose={handleCloseUvNav}
                    // TransitionComponent={Fade}
                  >
                    <MenuItem
                      component={Link}
                      to="/candidate"
                      onClick={handleClose}
                    >
                      Quản lý ứng viên
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/interview"
                      onClick={handleClose}
                    >
                      Kết quả phỏng vấn
                    </MenuItem>
                  </Menu>
                </MenuItem>

                <MenuItem>
                  <Typography
                    component={Link}
                    to="/student"
                    sx={{
                      my: 0,
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Sinh viên
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    sx={{ my: 0, display: "block" }}
                    onClick={handleOpenBatchNav}
                  >
                    Khóa thực tập
                  </Typography>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={openBatchNav}
                    open={isOpenBatchNav}
                    onClose={handleCloseBatchNav}
                    // TransitionComponent={Fade}
                  >
                    <MenuItem
                      component={Link}
                      to="/internshipcourse"
                      onClick={handleClose}
                    >
                      Quản lý khóa thực tập
                    </MenuItem>
                    <MenuItem component={Link} to="/dg" onClick={handleClose}>
                      Quản lý nhóm
                    </MenuItem>
                  </Menu>
                </MenuItem>

                <MenuItem sx={{ pb: 2 }}>
                  <Typography
                    component={Link}
                    to="/batch"
                    sx={{
                      my: 0,
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Chọn Batch
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ borderTop: "1px solid black" }}>
                  <Tooltip>
                    <Typography
                      onClick={logoutHandler}
                      sx={{ color: "#e84747" }}
                    >
                      Đăng xuất
                    </Typography>
                  </Tooltip>
                </MenuItem>
              </Menu>
            </Box>

            {/* menu responsive lg */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              IMS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={Link}
                to="/mentor"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Quản lý Mentor
              </Button>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleOpenUv}
              >
                Ứng viên
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={openUv}
                open={isOpenUv}
                onClose={handleClose}
                // TransitionComponent={Fade}
              >
                <MenuItem
                  component={Link}
                  to="/candidate"
                  onClick={handleClose}
                >
                  Quản lý ứng viên
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/interview"
                  onClick={handleClose}
                >
                  Kết quả phỏng vấn
                </MenuItem>
              </Menu>
              <Button
                component={Link}
                to="/student"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Quản lý sinh viên
              </Button>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleOpenBatch}
              >
                Quản lý khóa thực tập
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={openBatch}
                open={isOpenBatch}
                onClose={handleClose}
                // TransitionComponent={Fade}
              >
                <MenuItem
                  component={Link}
                  to="/internshipcourse"
                  onClick={handleClose}
                >
                  Quản lý khóa thực tập
                </MenuItem>
                <MenuItem component={Link} to="/dg" onClick={handleClose}>
                  Quản lý nhóm
                </MenuItem>
              </Menu>
              <Button
                component={Link}
                to="/batch"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Chọn Batch
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Typography sx={{ pt: 0.6 }}>
                <AccountCircleIcon />
              </Typography>
              <Typography sx={{ pr: 2, pt: 0.8 }}>{id}</Typography>
              <Tooltip>
                <Button onClick={logoutHandler} sx={{ color: "white" }}>
                  Đăng xuất
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="div" sx={{ height: "70px" }} />
    </>
  );
}
