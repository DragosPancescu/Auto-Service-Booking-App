import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import AccountInfo from "../../UserInformation/accountInformation";

const UpdateUserDialog = ({
	show,
	setShow,
  row,
  setAlert,
  setAlertText,
  setAlertSeverity,
  refreshTable
}) => {
  
	return (
		<Dialog
			open={show}
			onClose={() => setShow(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
      <DialogTitle id='alert-dialog-title' sx={{ fontWeight: "bold"}}>{`${row.lastname} ${row.firstname}`}</DialogTitle>
      <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black"}} />
      <DialogContent sx={{ width: 600 }}>
        <Box sx={{ ml: -2 }}>
          <AccountInfo 
            userId={row.id}
            setAlert={setAlert}
            setAlertText={setAlertText}
            setAlertSeverity={setAlertSeverity}
            navigateRequest={false}
            setShowUserPopUp={setShow}
            refreshTable={refreshTable}
          />
        </Box>
      </DialogContent>
			<DialogActions className='ms-2 me-2 d-flex'>
        <Button
					onClick={() => {setShow(false);}}
					variant='contained'
          color='inherit'
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UpdateUserDialog;
