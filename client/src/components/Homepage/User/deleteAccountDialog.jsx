import * as React from "react";

import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { RegisterServices } from "../../../services/registerService";

const DeleteAccountDialog = ({
	show,
	setShow,
  setShowUserPopUp,
  userId,
  navigateRequest,
  setAlert,
  setAlertText,
  setAlertSeverity,
  refreshTable
}) => {
  const navigate = useNavigate();

	const handleConfirmClick = () => {
		setShow(false);

    RegisterServices.deleteAccount(userId)
      .then((res) => {
        console.log(res);
        if (navigateRequest) { 
          navigate('/register') 
        } else {
          setAlert(true)
          setAlertText("User deleted with success!")
          setAlertSeverity("info")
          setShowUserPopUp(false)
          refreshTable(true)
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert(true)
        setAlertText("Could not delete your account.")
        setAlertSeverity("error")
      })
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
          <Typography>
            <b>Are you sure you want to delete your account ?</b>
            <br />
            <b>This action is irreversible and you will lose all your data.</b>
            <br />
            <br />
            <b>If you want to continue with this action please press the <Typography display="inline" sx={{ color: "red", fontWeight: "bold" }}>DELETE</Typography> button.</b>
          </Typography>
				</DialogContentText>
			</DialogContent>

			<DialogActions className='ms-2 me-2 d-flex'>
        <Button
            onClick={() => {setShow(false);}}
            variant='contained'
            color='inherit'
          >
            Cancel
        </Button>
				<Button
					onClick={handleConfirmClick}
					variant='contained'
          color='error'
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteAccountDialog;
