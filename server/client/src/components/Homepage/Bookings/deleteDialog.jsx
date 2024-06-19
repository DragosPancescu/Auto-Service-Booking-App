import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const DeleteDialog = ({
	show,
	setShow,
  booking,
  setBooking,
  deleteBooking,
  setState,
  setError,
  setAlert,
  setAlertText,
  setAlertSeverity
}) => {
	const handleConfirmClick = () => {
		setShow(false);

    deleteBooking(booking.id)
    .then((res) => {
      console.log(res);
      setAlert(true)
      setAlertText(`Booking ${booking.name} was deleted.`)
      setAlertSeverity('info')
    })
    .catch((err) => {
      setAlert(true)
      setAlertText(`Could not delete ${booking.name}.`)
      setAlertSeverity("error")
      setError(err);
      console.log(err);
    })

    setBooking({});
	};

	return (
		<Dialog
			open={show}
			onClose={() => setShow(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title' sx={{ fontWeight: "bold"}}>Warning</DialogTitle>
      <Divider sx={{ borderBottomWidth: 2 }} />
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Are you sure you want to delete booking: <b>{booking.name}</b> ?
				</DialogContentText>
			</DialogContent>

			<DialogActions className='ms-2 me-2 d-flex'>
        <Button
					onClick={() => {setShow(false); setBooking({});}}
					variant='contained'
          color='inherit'
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirmClick}
					variant='contained'
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
