import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import CssBaseline from "@mui/material/CssBaseline";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { HomeServices } from "../../services/homeService";
import DeleteAccountDialog from "../Homepage/User/deleteAccountDialog";

const theme = createTheme();

const AccountInfo = ({
  userId,
  setAlert,
  setAlertText,
  setAlertSeverity,
  navigateRequest,
  setShowUserPopUp,
  refreshTable,
  marginTopValue
}) => {
  const [errorInfoPhone, setErrorInfoPhone] = React.useState("");
  const [errorInfoEmail, setErrorInfoEmail] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});
  const [effectState, setEffectState] = React.useState('');
  const [showDialog, setshowDialog] = React.useState(false);
  const [submitDisable, setSubmitDisable] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useMemo (() => {
    HomeServices.getUser(userId)
      .then((res) => {
        setUserInfo({
          email: res.email,
          phone: res.phone
        })
      })
      .catch((err) => {
        console.log(err)
        setAlert(true)
        setAlertText("Could not retrieve your information from the database.")
        setAlertSeverity("error")
      })
  }, [effectState]);

  const handleChangeEmail = (event) => {
    setUserInfo({
      email: event.target.value,
      phone: userInfo.phone
    });
    setErrorInfoEmail("")
    setSubmitDisable(false)
  }

  const handleChangePhone = (event) => {
    setUserInfo({
      email: userInfo.email,
      phone: event.target.value
    });
    setErrorInfoPhone("")
    setSubmitDisable(false)
  }

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const user = {
			email: data.get("email").toString(),
			phone: data.get("phone").toString(),
    };

    if(data.get("password").toString() !== ""){
      user.password = data.get("password").toString()
    }

		// Update user account
		HomeServices.updateUser(user, userId)
			.then((res) => {
				console.log(res);
        setAlert(true)
        setAlertText("User updated with success!")
        setAlertSeverity("success")
        refreshTable(true)
			})
			.catch((err) => {
				console.log(err);
        setAlert(true)
        setAlertText("Could not update your information.")
        setAlertSeverity("error")
				if (err.response.status === 400) {
          setErrorInfoPhone(err.response.data.phone)
          setErrorInfoEmail(err.response.data.email)
				}
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs' sx={{display: "flex", flexDirection: "column", alignItems: "center", ml: 8}}>
        <DeleteAccountDialog 
          show={showDialog}
          setShow={setshowDialog}
          userId={userId}
          navigateRequest={navigateRequest}
          setShowUserPopUp={setShowUserPopUp}
          setAlert={setAlert}
          setAlertText={setAlertText}
          setAlertSeverity={setAlertSeverity}
          refreshTable={refreshTable}
        />
				<CssBaseline />
        <Paper elevation={3} sx={{ p: 3, mt: marginTopValue, pt: 0,  width: 450 }}>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update user information below
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mb:4 }}>
                  <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black"}} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errorInfoEmail === "" ? false : true}
                    helperText={errorInfoEmail}
                    required
                    fullWidth
                    label='Email'
                    InputLabelProps={{ shrink: true }}
                    id='email'
                    name='email'
                    autoComplete='email'
                    value={userInfo.email}
                    onChange={handleChangeEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errorInfoPhone === "" ? false : true}
                    helperText={errorInfoPhone}
                    required
                    fullWidth
                    label='Phone Number'
                    InputLabelProps={{ shrink: true }}
                    id='phone'
                    name='phone'
                    autoComplete='phone'
                    value={userInfo.phone}
                    type="tel"
                    onChange={handleChangePhone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='new-password'
                    onChange={(event) => { 
                      if (event.target.value !== ""){
                        setSubmitDisable(false) 
                      } else {
                        setSubmitDisable(true)
                      } 
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type='button'
                fullWidth
                variant='contained'
                sx={{ mt: 5, mb: 1 }}
                color="error"
                onClick={ () => { 
                  setshowDialog(true)
                }}
              >
                Delete Account
              </Button>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 1, mb: 1 }}
                disabled={submitDisable}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Paper>
			</Container>
		</ThemeProvider>
	);
}

export default AccountInfo