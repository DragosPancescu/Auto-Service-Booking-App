import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import CssBaseline from "@mui/material/CssBaseline";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { RegisterServices } from "../services/registerService";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{"Copyright © "}<b>RideRevolution </b>{new Date().getFullYear()}{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function Register() {
	const navigate = useNavigate();
  const [errorInfoPhone, setErrorInfoPhone] = React.useState("");
  const [errorInfoEmail, setErrorInfoEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [formArgs, setFormArgs] = React.useState(["1", "2", "3", "4", "5"]);
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event, id) => {
    let currentArgs = [formArgs[0], formArgs[1], formArgs[2], formArgs[3], formArgs[4]];
    currentArgs[id] = event.target.value;
    setFormArgs(currentArgs);
  }

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		let args = [
			data.get("firstname"),
			data.get("lastname"),
			data.get("email"),
			data.get("phone"),
			data.get("password"),
		];
    setFormArgs(args)

    let areFieldsPopulated = args.every((arg) => arg !== "")

    if (!areFieldsPopulated){
      console.log('Not all fields are populated')
    } else {
      // Create user account
      RegisterServices.createAccount
      .apply(null, args)
      .then((res) => {
        const userInfo = {
          id: res.data.id,
          role: res.data.role,
          token: res.data.accessToken
        }
  
        // Authenticate
        signIn({
          token: userInfo.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { role: userInfo.role, id: userInfo.id }
        })

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrorInfoPhone(err.response.data.phone)
          setErrorInfoEmail(err.response.data.email)
        }
      });
    }
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs' sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
				<CssBaseline />
        <Paper elevation={3} sx={{ p: 3, mt: 8, pt: 0,  width: 500 }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
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
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='new-password'
                    onChange={(event) => {  handleInputChange(event, 4) }}
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
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
				  <Copyright sx={{ mt: 5 }} />
        </Paper>
			</Container>
		</ThemeProvider>
	);
}
