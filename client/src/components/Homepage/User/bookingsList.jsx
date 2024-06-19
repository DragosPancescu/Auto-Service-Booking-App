import * as React from "react";

import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import { grey } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import FormControlLabel from '@mui/material/FormControlLabel';

import BookingCard from "../Bookings/bookingCard";
import DeleteDialog from "../Bookings/deleteDialog";
import AddBooking from "../Bookings/addBookingDialog";
import BookingCardAdd from "../Bookings/bookingCardAdd";
import UpdateBooking from "../Bookings/updateBookingDialog"
import { HomeServices } from "../../../services/homeService";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const BookingsList = ({
  showDeleteDialog,
  setShowDeleteDialog,
  showAddBookingDialog,
  setShowAddBookingDialog,
  showUpdateBookingDialog,
  setShowUpdateBookingDialog,
  currentBooking,
  setCurrentBooking,
  setState,
  setError,
  bookings,
  services,
  userId,
  setAlert,
  setAlertText,
  setAlertSeverity,
  setAddedBooking,
  setUpdatedBooking
}) => {
  const [hideOld, setHideOld] = React.useState(false);

  return (
    <Box component='main' sx={{ p: 3 }}>
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
        setUpdatedBooking={setUpdatedBooking}
      />
      
      <DrawerHeader />
      <Chip sx={{ ml: 1.5, background: grey[150]}} label={
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

export default BookingsList;