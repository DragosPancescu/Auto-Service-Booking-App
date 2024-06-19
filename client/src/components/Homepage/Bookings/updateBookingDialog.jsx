import * as React from "react";

import dayjs from "dayjs"

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Select from '@mui/material/Select';
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from '@mui/material/FormControl';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { HomeServices } from "../../../services/homeService";

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

const UpdateBooking = ({
  userId,
  booking,
  setBooking,
	show,
	setShow,
  setError,
  serviceTypes,
  setAlert,
  setAlertText,
  setAlertSeverity,
  setUpdatedBooking
}) => {
  const [selectedService, setSelectedService] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [timeSlotsDisabled, setTimeSlotsDisabled] = React.useState(true);
  const [dateJs, setDateJs] = React.useState(null);
  const [freeSlots, setFreeSlots] = React.useState(null);
  const [dataChanged, setDataChanged] = React.useState(false);
  const [updateButtonDisabled, setUpdateButtonDisabled] = React.useState(true);
  
  const handleConfirmClick = () => {
    HomeServices.updateBooking(booking.id, dateJs.format("YYYY-MM-DD"), selectedSlot, userId, selectedService.id)
      .then((res) => {
        console.log(res)
        setShow(false);
        setDateJs(null);
        setFreeSlots(null);
        setTimeSlotsDisabled(true);
        setUpdateButtonDisabled(true);
        setAlert(true)
        setAlertText(`Booking ${booking.name} was updated with success.`)
        setAlertSeverity("success")

        setUpdatedBooking((Math.random() + 1).toString(36).substring(7));
      })
      .catch((err) => {
        console.log(err)
        setAlert(true)
        setAlertText(`Error while updating booking ${booking.name}.`)
        setAlertSeverity("error")
      })
	};

  const handleChangeService = (event) => {
    setSelectedService({
      id: event.target.value,
      name: event.target.name
    });
    setDataChanged(true);
    if (freeSlots != null){
      setFreeSlots(null);
      setTimeSlotsDisabled(true)
    }
  };

  const handleChangeDate = (newDate) => {
    setDateJs(newDate)
    setDataChanged(true)
    if (freeSlots != null){
      setFreeSlots(null);
      setTimeSlotsDisabled(true)
    }
  };

  const handleChangeSlot = (event) => {
    setSelectedSlot(event.target.value)
    setUpdateButtonDisabled(false)
  };

  if (dataChanged === true){
    HomeServices.getFreeSlots(dateJs.format("YYYY-MM-DD"), selectedService.id, booking.id)
      .then((res) => {
        setTimeSlotsDisabled(false)
        setFreeSlots(res)
        setDataChanged(false)
        setSelectedSlot(null)
      })
      .catch((err) => {
        setAlert(true)
        setAlertText(err)
        setAlertSeverity("error")
        setError(err);
        console.log(err);
      })
  }

  // Sets current booking values
  React.useMemo(() => {
    if (Object.keys(booking).length !== 0){
      setSelectedService(serviceTypes.find(service => service.name === booking.name))
      setDateJs(dayjs(booking.date))
      setDataChanged(true)
      setSelectedSlot(booking.time)
    }
  }, [booking])

	return (
		<Dialog
			open={show}
			onClose={() => {
        setShow(false);
        setDateJs(null);
        setUpdateButtonDisabled(true);
        setBooking({});
        setSelectedService(null);
      }}
			aria-labelledby='addBooking-dialog-title'
			aria-describedby='addBooking-dialog-description'
      fullWidth={true}
      maxWidth = {'xs'}
      titleStyle={{textAlign: "center"}}
		>
			<DialogTitle id='alert-dialog-title' sx={{ fontWeight: "bold"}}>Update Booking</DialogTitle>
      <Divider sx={{ borderBottomWidth: 2 }} />
			<DialogContent sx={{ display: "flex", flexDirection: "column", ml: 8 }}>
          <FormControl required>
            <InputLabel id="serviceType-select-label" sx={{ width: 240, m: 1}}>Service Type</InputLabel>
            <Select
              labelId="serviceType-select-label"
              id="serviceType-select-select"
              value={selectedService?.id}
              label="Service Type"
              onChange={handleChangeService}
              sx={{ width: 240, m: 1}}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 192.5 }}
              }}
            >
            {
              serviceTypes.map((serviceType) => (
                <MenuItem key={serviceType.id} value={serviceType.id}>{serviceType.name}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
          <FormControl required>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                minDate={dayjs()}
                shouldDisableDate={isWeekend}
                label="Date"
                value={dateJs}
                onChange={handleChangeDate}
                sx={{ width: 240, m: 1}}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl required>
            <InputLabel id="timeSlot-select-label" sx={{ width: 240, m: 1}}>Time Slot</InputLabel>
            <Select
              labelId="timeSlot-select-label"
              id="timeSlot-select-select"
              value={selectedSlot?.time}
              defaultValue={booking.time}
              label="Time Slot"
              onChange={handleChangeSlot}
              sx={{ width: 240, m: 1}}
              disabled={timeSlotsDisabled}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 192.5 }}
              }}
            >
            { 
              timeSlotsDisabled === false ? (
                freeSlots.map((freeSlot, index) => (
                  <MenuItem key={index} value={freeSlot[0]}>{`${freeSlot[0]} - ${freeSlot[1]}`}</MenuItem>
                ))
              ) : (
                <MenuItem value="default">default</MenuItem>
              )
            }
            </Select>
          </FormControl>
			</DialogContent>

			<DialogActions sx={{ mr: 16 }}>
        <Button
					onClick={() => {
            setShow(false);
            setDateJs(null);
            setFreeSlots(null);
            setTimeSlotsDisabled(true);
            setUpdateButtonDisabled(true);
            setBooking({});
            setSelectedService(null);
          }}
					variant='contained'
          color='inherit'
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirmClick}
					variant='contained'
          disabled={updateButtonDisabled}
				>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UpdateBooking;
