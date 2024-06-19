import * as React from "react";

import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { grey } from "@mui/material/colors";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';
import { styled } from "@mui/material/styles";
import FormControlLabel from '@mui/material/FormControlLabel';

import { HomeServices } from "../../../services/homeService";
import BookingCard from "../../../components/Homepage/Bookings/bookingCard";
import DeleteDialog from "../../../components/Homepage/Bookings/deleteDialog";
import AddBooking from "../../../components/Homepage/Bookings/addBookingDialog";
import BookingCardAdd from "../../../components/Homepage/Bookings/bookingCardAdd";
import UpdateBooking from "../../../components/Homepage/Bookings/updateBookingDialog"

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const BookingsListAdmin = ({
  setState,
  setError,
  setAlert,
  setAlertText,
  setAlertSeverity,
  users
}) => {
  const [bookings, setBookings] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [showAddBookingDialog, setShowAddBookingDialog] = React.useState(false);
  const [showUpdateBookingDialog, setShowUpdateBookingDialog] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [currentBooking, setCurrentBooking] = React.useState({});
  const [addedBooking, setAddedBooking] = React.useState("");
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  const [hideOld, setHideOld] = React.useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackDrop(false);
  };

  const handleOpenBackdrop = () => {
    setOpenBackDrop(true);
  };

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  React.useMemo(() => {
    setUserId(users[0].id)
  }, [])

  React.useEffect(() => {
    handleOpenBackdrop();

    // Get bookings
    HomeServices.getBookings(userId)
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
                setAlert(true)
                setAlertText(`Error while retrieve data for booking: ${booking.name}`)
                setAlertSeverity("error")
                setError(err);
                console.log(err);
              })
          );
        });

        Promise.all(promises).then(() => {
          bookingsData.sort((a, b) => dayjs(a.date) - (dayjs(b.date)))
          setBookings(bookingsData);
        });
      })
      .catch((err) => {
        setState("error");
        setError(err);
        console.log(err);
      });

    HomeServices.getServices().then((res) => {
      setServices(res);
    });
	}, [userId, currentBooking, addedBooking]);

	return (
    <Box component='main' sx={{ paddingTop: 11, paddingLeft: 3 }}>
      <DeleteDialog
        show={showDeleteDialog}
        setShow={setShowDeleteDialog}
        booking={currentBooking}
        setBooking={setCurrentBooking}
        deleteBooking={HomeServices.deleteBooking}
        setState={setState}
        setError={setError}
        setAlert={setAlert}
        setAlertText={setAlertText}
        setAlertSeverity={setAlertSeverity}
      />

      <AddBooking
        userId={userId}
        show={showAddBookingDialog}
        setShow={setShowAddBookingDialog}
        serviceTypes={services}
        setState={setState}
        setError={setError}
        setAlert={setAlert}
        setAlertText={setAlertText}
        setAlertSeverity={setAlertSeverity}
        setAddedBooking={setAddedBooking}
      />

      <UpdateBooking
        userId={userId}
        show={showUpdateBookingDialog}
        setShow={setShowUpdateBookingDialog}
        serviceTypes={services}
        setState={setState}
        setError={setError}
        booking={currentBooking}
        setBooking={setCurrentBooking}
        setAlert={setAlert}
        setAlertText={setAlertText}
        setAlertSeverity={setAlertSeverity}
      />
      <FormControl sx={{ m: 1.5 }}>
        <InputLabel  id="select-user-label">Users</InputLabel>
        <Select
          labelId="select-user-label"
          label="Column"
          id="select-user"
          value={userId}
          onChange={handleChange}
          sx={{ width: 270 }}
        >
          {
            users.map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.email}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Chip sx={{ mt: 1.5, ml: 1.5, background: grey[150]}} label={
        <FormControlLabel 
          sx={{ pl: 1, pr: 1.5}} 
          control={<Switch onChange={(event) => (setHideOld(event.target.checked))} />} 
          label="Hide finished bookings" 
        />
      }/>
      <div className='d-flex flex-row flex-wrap'>
        <BookingCardAdd 
          createBooking={HomeServices.createBooking} 
          setShow={setShowAddBookingDialog}
        />
        {
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              setShow={setShowDeleteDialog}
              setShowUpdate={setShowUpdateBookingDialog}
              setBooking={setCurrentBooking}
              hideOld={hideOld}
            />
          ))
        }
      </div>
	</Box>
  )
};

export default BookingsListAdmin;