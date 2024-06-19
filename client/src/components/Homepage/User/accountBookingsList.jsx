import * as React from "react"

import List from "@mui/material/List";
import Tooltip from '@mui/material/Tooltip';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import ListItemButton from "@mui/material/ListItemButton";
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AccountBookingList = ({
  setCurrentView,
  open
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  return(
    <List>
      {["Account", "Bookings", "About Us"].map((text, index) => (
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
                    'Account': <AccountCircleIcon />,
                    'Bookings': <CarCrashIcon />,
                    'About Us': <DescriptionIcon />
                  }[text]
                }
              </ListItemIcon>
              <ListItemText 
              disableTypography
              primary={text} 
              sx={{ opacity: open ? 1 : 0, fontWeight: "bold" }} />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  )
};

export default AccountBookingList;