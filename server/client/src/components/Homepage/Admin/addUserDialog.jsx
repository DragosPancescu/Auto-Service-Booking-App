import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { RegisterServices } from "../../../services/registerService";
const AddUserDialog = ({
	show,
	setShow,
  setAlert,
  setAlertText,
  setAlertSeverity,
  refreshTable
}) => {
  const [errorInfoPhone, setErrorInfoPhone] = React.useState("");
  const [errorInfoEmail, setErrorInfoEmail] = React.useState("");
  const [formArgs, setFormArgs] = React.useState(["1", "2", "3", "4", "5"]);

  const handleInputChange = (event, id) => {
    let currentArgs = [formArgs[0], formArgs[1], formArgs[2], formArgs[3], formArgs[4]];
    currentArgs[id] = event.target.value;
    setFormArgs(currentArgs);
  }

  const handleSubmit = () => {
    let areFieldsPopulated = formArgs.every((arg) => arg !== "")

    if (!areFieldsPopulated){
      console.log('Not all fields are populated')
    } else {
      // Create user account
      RegisterServices.createAccount
      .apply(null, formArgs)
      .then((res) => {
        console.log(res);
        setShow(false);
        setAlert(true);
        setAlertText(`User ${formArgs[2]} created with success!`);
        setAlertSeverity("success");
        refreshTable(true);
        setErrorInfoPhone("")
        setErrorInfoEmail("")
        setFormArgs(["1", "2", "3", "4", "5"])
      })
      .catch((err) => {
        console.log(err);
        setAlert(true);
        setAlertText(`Could not create user ${formArgs[2]}.`);
        setAlertSeverity("error");
        if (err.response.status === 400) {
          setErrorInfoPhone(err.response.data.phone)
          setErrorInfoEmail(err.response.data.email)
        }
      });
    }
	};

	return (
		<Dialog
			open={show}
			onClose={() => {
        setShow(false)
        setErrorInfoPhone("")
        setErrorInfoEmail("")
        setFormArgs(["1", "2", "3", "4", "5"])
      }}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
      <DialogTitle id='alert-dialog-title' sx={{ fontWeight: "bold"}}>Add User</DialogTitle>
      <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black"}} />
      <DialogContent>
        <Paper elevation={3} sx={{ p: 3, pt: 2,  width: 500 }}>
          <Box 
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  arg-number={1}
                  error={formArgs[0] === "" ? true : false}
                  helperText={formArgs[0] === "" ? "This field can't be left empty" : ""}
                  autoComplete='given-name'
                  name='firstname'
                  required
                  fullWidth
                  id='firstname'
                  label='First Name'
                  autoFocus
                  onChange={(event) => { handleInputChange(event, 0) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  arg-number={2}
                  error={formArgs[1] === "" ? true : false}
                  helperText={formArgs[1] === "" ? "This field can't be left empty" : ""}
                  required
                  fullWidth
                  id='lastname'
                  label='Last Name'
                  name='lastname'
                  autoComplete='family-name'
                  onChange={(event) => {  handleInputChange(event, 1) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  arg-number={3}
                  error={!errorInfoEmail == "" || formArgs[2] === "" ? true : false}
                  helperText={formArgs[2] === "" ? "This field can't be left empty" : errorInfoEmail}
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(event) => {  handleInputChange(event, 2) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  arg-number={4}
                  error={!errorInfoPhone == "" || formArgs[3] === "" ? true : false}
                  helperText={formArgs[3] === "" ? "This field can't be left empty" : errorInfoPhone}
                  required
                  fullWidth
                  id='phone'
                  label='Phone Number'
                  name='phone'
                  autoComplete='phone'
                  type="tel"
                  onChange={(event) => {  handleInputChange(event, 3) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  arg-number={5}
                  error={formArgs[4] === "" ? true : false}
                  helperText={formArgs[4] === "" ? "This field can't be left empty" : ""}
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={(event) => {  handleInputChange(event, 4) }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </DialogContent>
			<DialogActions className='ms-2 me-2 d-flex'>
        <Button
					onClick={() => {
            setShow(false);
            setErrorInfoPhone("")
            setErrorInfoEmail("")
            setFormArgs(["1", "2", "3", "4", "5"])
          }}
					variant='contained'
          color='inherit'
				>
					Cancel
				</Button>
        <Button
					onClick={() => {
            handleSubmit();
          }}
					variant='contained'
          color='primary'
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddUserDialog;
