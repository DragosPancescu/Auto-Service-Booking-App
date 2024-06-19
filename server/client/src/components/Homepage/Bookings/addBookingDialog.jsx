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

const lastMonday = dayjs().startOf('week');
const nextSunday = dayjs().endOf('week').startOf('day');

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

const AddBooking = ({
  userId,
	show,
	setShow,
  setState,
  setError,
  serviceTypes,
  setAlert,
  setAlertText,
  setAlertSeverity,
  setAddedBooking
}) => {
  const [selectedService, setSelectedService] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [timeSlotsDisabled, setTimeSlotsDisabled] = React.useState(true);
  const [dateJs, setDateJs] = React.useState(null);
  const [freeSlots, setFreeSlots] = React.useState(null);
  const [dataChanged, setDataChanged] = React.useState(false);
  const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true);

  const handleConfirmClick = () => {
    HomeServices.createBooking(dateJs.format("YYYY-MM-DD"), selectedSlot, userId, selectedService.id)
      .then((res) => {
        console.log(selectedService)
        setAlert(true)
        setAlertText(`Created new booking ${selectedService.name} for ${dateJs.format("DD-MMM-YYYY")}`)
        setAlertSeverity('success')
        
        setShow(false);
        setDateJs(null);
        setFreeSlots(null);
        setTimeSlotsDisabled(true);
        setCreateButtonDisabled(true);
        setSelectedService(null);

        setAddedBooking((Math.random() + 1).toString(36).substring(7));
      })
      .catch((err) => {
        console.log(err)
        setAlert(true)
        setAlertText(`Could not create new booking ${selectedService.name} for ${dateJs.format("DD-MMM-YYYY")}`)
        setAlertSeverity("error")
      })
	};

  const handleChangeService = (event) => {
    setSelectedService({
      id: event.target.value.split("-")[0],
      name: event.target.value.split("-")[1]
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
    setCreateButtonDisabled(false)
  };

  if (selectedService != null && dateJs != null && freeSlots == null && dataChanged === true){
    HomeServices.getFreeSlots(dateJs.format("YYYY-MM-DD"), selectedService.id)
      .then((res) => {
        setTimeSlotsDisabled(false)
        setFreeSlots(res)
        setDataChanged(false)
      })
      .catch((err) => {
        setState("error");
        setError(err);
        console.log(err);
      })
  }

	return (
		<Dialog
			open={show}
			onClose={() => {
        setShow(false);
        setDateJs(null);
        setFreeSlots(null);
        setTimeSlotsDisabled(true);
        setCreateButtonDisabled(true);
        setSelectedService(null);
      }}
			aria-labelledby='addBooking-dialog-title'
			aria-describedby='addBooking-dialog-description'
      fullWidth={true}
      maxWidth = {'xs'}
      titleStyle={{textAlign: "center"}}
		>
			<DialogTitle id='alert-dialog-title' sx={{ fontWeight: "bold"}}>Add Booking</DialogTitle>
      <Divider sx={{ borderBottomWidth: 2 }} />
			<DialogContent sx={{ display: "flex", flexDirection: "column", ml: 8 }}>
          <FormControl required>
            <InputLabel id="serviceType-select-label" sx={{ width: 240, m: 1}}>Service Type</InputLabel>
            <Select
              labelId="serviceType-select-label"
              id="serviceType-select-select"
              value={selectedService?.name}
              label="Service Type"
              onChange={handleChangeService}
              sx={{ width: 240, m: 1}}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 192.5 }}
              }}
            >
            {
              serviceTypes.map((serviceType) => (
                <MenuItem key={serviceType.id} value={`${serviceType.id}-${serviceType.name}`}>{serviceType.name}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
          <FormControl required>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                minDate={dayjs().add(1, 'day')}
                shouldDisableDate={isWeekend}
                label="Date"
                value={dateJs}
                onChange={handleChangeDate}
                sx={{ width: 240, m: 1}}
                InputProps={{
                  required: true
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl required>
            <InputLabel id="timeSlot-select-label" sx={{ width: 240, m: 1}}>Time Slot</InputLabel>
            <Select
              labelId="timeSlot-select-label"
              id="timeSlot-select-select"
              value={selectedSlot?.time}
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
            setCreateButtonDisabled(true);
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
          disabled={createButtonDisabled}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddBooking;
