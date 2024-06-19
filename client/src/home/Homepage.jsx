import * as React from "react";

import dayjs from "dayjs";
import { useAuthUser } from 'react-auth-kit'
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Alert from '@mui/material/Alert';
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from '@mui/material/Tooltip';
import { blue } from "@mui/material/colors";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Backdrop from '@mui/material/Backdrop';
import ListItem from "@mui/material/ListItem";
import Snackbar from '@mui/material/Snackbar';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItemButton from "@mui/material/ListItemButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CircularProgress from "@mui/material/CircularProgress";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { createTheme, styled, ThemeProvider, useTheme } from "@mui/material/styles";

import { HomeServices } from "../services/homeService";
import AboutUs from "../components/Miscellaneous/aboutUs";
import BookingsList from "../components/Homepage/User/bookingsList";
import LogoutDialog from "../components/Homepage/User/logoutDialog";
import AccountInfo from "../components/UserInformation/accountInformation";
import AccountBookingList from "../components/Homepage/User/accountBookingsList";

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

export default function HomePage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [dummy, setDummy] = React.useState(false);
  const navigate = useNavigate();

  const [bookings, setBookings] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [state, setState] = React.useState("");
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);
  const [currentBooking, setCurrentBooking] = React.useState({});
  const [currentView, setCurrentView] = React.useState("Bookings");
  const [showAddBookingDialog, setShowAddBookingDialog] = React.useState(false);
  const [showUpdateBookingDialog, setShowUpdateBookingDialog] = React.useState(false);
  const passedData = useLocation();
  const [services, setServices] = React.useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [successAlertText, setSuccessAlertText] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [addedBooking, setAddedBooking] = React.useState("");
  const [updatedBooking, setUpdatedBooking] = React.useState("");

  const auth = useAuthUser();

  React.useEffect(() => {
    // Get bookings
    HomeServices.getBookings(auth().id)
      .then((res) => {
        var bookingsData = [];
        var promises = [];

        res.forEach((booking) => {
          // Get data for each booking
          promises.push(
            HomeServices.getBookingData(booking)
              .then((res) => {
                bookingsData.push({
                  id: booking.id,
                  date: booking.date,
                  time: booking.time,
                  name: res.name,
                  duration: res.duration,
                });
              })
              .catch((err) => {
                setState("error");
                setError(err);
                setShowSuccessAlert(true)
                setSuccessAlertText(`Error while retrieving data for booking: ${booking.name}`)
                setAlertSeverity("error")
                console.log(err);
              })
          );
        });

        Promise.all(promises).then(() => {
          bookingsData.sort((a, b) => dayjs(a.date) - (dayjs(b.date)))
          setBookings(bookingsData);
          setState("success");
          handleCloseBackdrop();
        });
      })
      .catch((err) => {
        setState("error");
        setError(err);
        setShowSuccessAlert(true)
        setSuccessAlertText(`Error while retrieving bookings`)
        setAlertSeverity("error")
        console.log(err);
      });

    HomeServices.getServices().then((res) => {
      setServices(res);
    });

  }, [currentBooking, addedBooking, updatedBooking]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessAlert(false);
  };

  const handleCloseBackdrop = () => {
    setOpenBackDrop(false);
  };

  const handleOpenBackdrop = () => {
    setOpenBackDrop(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <Box sx={{ display: "flex", mb: "50px" }}>
          <Snackbar open={showSuccessAlert} autoHideDuration={5000} onClose={handleClose}>
            <Alert variant="filled" severity={alertSeverity != "" ? alertSeverity : "info"} onClose={handleClose}>{successAlertText}</Alert>
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
              <Tooltip title={theme.direction === "rtl" ? "Expand" : "Retract"} placement="right">
                <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </Tooltip>
            </DrawerHeader>
            <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black" }} />
            <AccountBookingList setCurrentView={setCurrentView} open={open} />
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
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Logout"}
                      sx={{ opacity: open ? 1 : 0, fontWeight: "bold" }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
            <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black" }} />
          </Drawer>
          {
            {
              "Account": <AccountInfo
                userId={auth().id}
                setAlert={setShowSuccessAlert}
                setAlertText={setSuccessAlertText}
                setAlertSeverity={setAlertSeverity}
                navigateRequest={true}
                setShowUserPopUp={setDummy}
                marginTopValue={15}
              />,
              "Bookings": <BookingsList
                showDeleteDialog={showDeleteDialog}
                setShowDeleteDialog={setShowDeleteDialog}
                showAddBookingDialog={showAddBookingDialog}
                setShowAddBookingDialog={setShowAddBookingDialog}
                showUpdateBookingDialog={showUpdateBookingDialog}
                setShowUpdateBookingDialog={setShowUpdateBookingDialog}
                currentBooking={currentBooking}
                setCurrentBooking={setCurrentBooking}
                setState={setState}
                setError={setError}
                bookings={bookings}
                services={services}
                userId={auth().id}
                setAlert={setShowSuccessAlert}
                setAlertText={setSuccessAlertText}
                setAlertSeverity={setAlertSeverity}
                setAddedBooking={setAddedBooking}
                setUpdatedBooking={setUpdatedBooking}
              />,
              "About Us": <AboutUs />
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
