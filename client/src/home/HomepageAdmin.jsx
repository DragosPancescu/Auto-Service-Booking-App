import * as React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Alert from '@mui/material/Alert';
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Tooltip from '@mui/material/Tooltip';
import { blue } from "@mui/material/colors";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ListItem from "@mui/material/ListItem";
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CircularProgress from "@mui/material/CircularProgress";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme, styled, ThemeProvider, useTheme } from "@mui/material/styles";

import { HomeServices } from "../services/homeService";
import UsersTable from "../components/Homepage/Admin/usersTable";
import LogoutDialog from "../components/Homepage/User/logoutDialog";
import BookingsListAdmin from "../components/Homepage/Admin/bookingsListAdmin";
const drawerWidth = 240;

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}<b>{process.env.REACT_APP_APP_NAME} </b>{new Date().getFullYear()}{"."}
    </Typography>
  );
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(',')
  }
});

export default function HomePageAdmin() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [state, setState] = React.useState("");
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);
  const [currentView, setCurrentView] = React.useState("Users");
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [successAlertText, setSuccessAlertText] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessAlert(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useMemo(() => {
    HomeServices.getAllUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.log(err);
        setShowSuccessAlert(true)
        setSuccessAlertText("Could not retrieve users list from database.")
        setAlertSeverity("error")
      });
  }, [])

  if (state === "error") return <h1>{error.toString()}</h1>;

  if (state === "loading") {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box sx={{ display: "flex" }}>
          <Snackbar open={showSuccessAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" severity={alertSeverity !== "" ? alertSeverity : "info"} onClose={handleClose}>{successAlertText}</Alert>
          </Snackbar>
          <LogoutDialog
            show={showLogoutDialog}
            setShow={setShowLogoutDialog}
          />
          <CssBaseline />
          <AppBar position='fixed' open={open}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h5' noWrap component='div'>
                {currentView}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant='permanent' open={open}>
            <DrawerHeader sx={{ backgroundColor: blue[700] }}>
              <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black" }} />
            <List>
              {["Users", "Bookings"].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <Tooltip title={text} placement="right" disableHoverListener={open}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={(event) => {
                        setCurrentView(text);
                        setSelectedIndex(index);
                      }}
                      selected={selectedIndex === index ? true : false}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {
                          {
                            'Users': <AccountCircleIcon />,
                            'Bookings': <CarCrashIcon />
                          }[text]
                        }
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={text}
                        sx={{ opacity: open ? 1 : 0, fontWeight: "bold" }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black" }} />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Logout" placement="right" disableHoverListener={open}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={(event) => { setShowLogoutDialog(true); }}

                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Logout"}
                      sx={{ opacity: open ? 1 : 0, fontWeight: "bold" }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
            <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black" }} />
          </Drawer>
          {
            {
              "Users": <UsersTable
                setAlert={setShowSuccessAlert}
                setAlertText={setSuccessAlertText}
                setAlertSeverity={setAlertSeverity}
              />,
              "Bookings": <BookingsListAdmin
                setState={setState}
                setError={setError}
                setAlert={setShowSuccessAlert}
                setAlertText={setSuccessAlertText}
                setAlertSeverity={setAlertSeverity}
                users={users}
              />
            }[currentView]
          }
        </Box>
        <footer
          class="text-center text-lg-start"
          style={{
            backgroundColor: " #e0e0e0",
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 50
          }}>
          <div class="text-center p-3" >
            <Copyright />
          </div>
        </footer>
      </ThemeProvider>
    )
  }
}
