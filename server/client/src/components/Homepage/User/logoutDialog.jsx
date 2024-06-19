import * as React from "react";

import { useSignOut } from 'react-auth-kit';
import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const LogoutDialog = ({
	show,
	setShow,
}) => {
  const navigate = useNavigate();
  const singOut = useSignOut();

	const handleConfirmClick = () => {
		setShow(false);
    singOut();
    navigate('/login');
	};

	return (
		<Dialog
			open={show}
			onClose={() => setShow(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title' sx={{ fontWeight: "bold"}}>Are you sure you want to logout?</DialogTitle>
      <Divider sx={{ borderBottomWidth: 2 }} />
			<DialogActions className='ms-2 me-2 d-flex'>
				<Button
					onClick={handleConfirmClick}
					variant='contained'
				>
					Logout
				</Button>
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

export default LogoutDialog;
