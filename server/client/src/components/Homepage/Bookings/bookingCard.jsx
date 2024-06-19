import dayjs from "dayjs"

import Card from "@mui/material/Card";
import List from '@mui/material/List';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from '@mui/material/Tooltip';
import { styled } from "@mui/material/styles";
import ListItem from '@mui/material/ListItem';
import InfoIcon from "@mui/icons-material/Info";
import CardHeader from "@mui/material/CardHeader";
import { blue, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import EventIcon from '@mui/icons-material/Event';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PendingIcon from '@mui/icons-material/Pending';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledCard = styled(Card)(({ theme }) => ({
	margin: "0.75em",
	backfaceVisibility: "hidden",
	transition: "transform 0.1s ease-in-out",
	"&:hover": { 
    transform: "translateY(0.2rem)",
    "box-shadow": "4em"
  },
}));

const durationBeautify = (duration) => {
  let hours = duration.toString().split(".")[0]
  let minutes = duration.toString().split(".")[1]

  let stringDuration = `${parseInt(hours) > 0 ? hours : ""} ${parseInt(hours) > 0 ? parseInt(hours) > 1 ? "hours" : "hour": ""}${minutes === "0" ? "" : ` ${30} minutes`}`
  return stringDuration
}

const isBookingOver = (date) => {
  return dayjs().isBefore(dayjs(date))
}

const displayBooking = (date, hideOld) => {
  let bookingOver = isBookingOver(date)

  if (!bookingOver && hideOld){
    return "none"
  }
  return "inline"
}

const BookingCard = ({ 
  booking,
	setShow,
  setBooking,
  setShowUpdate,
  hideOld
}) => {
  const dateText = dayjs(booking.date).format("DD-MM-YYYY")
  const timeText = booking.time.substring(0, 5)
  const durationText = durationBeautify(booking.duration)

  return (
    <StyledCard key={booking.id} sx={{ display: displayBooking(`${booking.date}T${booking.time}Z`, hideOld) }}>
        <Card
        className='booking-card'
        variant='outlined'
        sx={{ boxShadow: 1, borderRadius: 1.5 }}
      >
        <Tooltip 
          title={booking.name} 
          placement="top-end"
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [2, -10],
                },
              },
            ],
          }}
        >
          <div><CardHeader titleTypographyProps={{variant:'h6', noWrap: true, width:240 }} title={booking.name} sx={{ background: blue[600], color: "#ffffff" }} /></div>
        </Tooltip>
        <CardContent sx={{ background: grey[100] }}>
          <Typography variant="body1">
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemIcon sx={{minWidth: '40px'}} >
                    <EventIcon />
                </ListItemIcon>
                <ListItemText primary={dateText} />
                <Tooltip title={!isBookingOver(`${booking.date}T${booking.time}Z`) ? "Done" : "To be serviced"} placement="bottom">
                  <ListItemIcon sx={{minWidth: '40px'}}>
                      {!isBookingOver(`${booking.date}T${booking.time}Z`) ? <CheckCircleIcon color="success"/> : <PendingIcon color="primary"/>}
                  </ListItemIcon>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{minWidth: '40px'}}>
                    <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary={timeText} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{minWidth: '40px'}}>
                    <TimelapseIcon />
                </ListItemIcon>
                <ListItemText primary={durationText} />
              </ListItem>
            </List>
          </Typography>
        </CardContent>
        <CardActions sx={{ pl: 3.75, pB: 5, background: grey[100]}}>
          <Button 
            variant='text' 
            startIcon={<InfoIcon />} 
            onClick={event => { setShowUpdate(true); setBooking(booking); }}
            disabled={!isBookingOver(`${booking.date}T${booking.time}Z`) ? true : false}
          >
            Update
          </Button>
          <Divider flexItem orientation="vertical" sx={{ borderColor: "black", borderWidth: 0.5, marginLeft: 1 }} />
          <Button 
            variant='text' 
            color='error' 
            startIcon={<DeleteIcon />} 
            onClick={event => { setShow(true); setBooking(booking); }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </StyledCard>
  )
};

export default BookingCard