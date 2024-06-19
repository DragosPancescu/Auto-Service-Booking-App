import * as React from "react";

import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Step from '@mui/material/Step';
import Divider from "@mui/material/Divider";
import Stepper from '@mui/material/Stepper';
import { blue } from "@mui/material/colors";
import StepLabel from '@mui/material/StepLabel';
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

const ContentContainer = styled('div')({
  maxWidth: '800px',
  width:'100%',
  padding: 3,
  '@media (min-width: 960px)': {
    padding: 6,
  },
  marginTop: 115,
  marginLeft: 5
});

const Heading = styled(Typography)({
  marginBottom: '20px',
  fontFamily: 'Arial',
  fontWeight: 'bold',
  color: '#333',
});

const BodyText = styled(Typography)({
  fontFamily: 'Arial',
  fontSize: '18px',
  lineHeight: '1.6',
  marginBottom: '10px',
  color: '#555',
});

const steps = [
  'Go to the Bookings tab.',
  'Click on the Add button.',
  'Select what kind of service you want, the date and one of the available time slots.',
  'Click on the Create button.',
  'Done! Your booking is now registered and we will wait for you on the set date.'
];

const AboutUs = () => {

  return (
    <CssBaseline />,
    <Box component="main" sx={{ p: 3, width: '100%', display: "flex",  flexDirection: 'column', alignItems: 'center', maxWidth:'100%', marginLeft:'auto', marginRight:'auto'}}>
      <ContentContainer>
        <Heading variant="h4" component="h1" align="center" sx={{ mt: 0.65 }}>
          Welcome to <span style={{ color: blue[700] }}>{process.env.REACT_APP_APP_NAME}</span>!
        </Heading>
        <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black", mb: 3, mt: 4.5 }} />
        <BodyText variant="body1" align="justify">
          At <span style={{ color: blue[700], fontWeight: 'bold' }}>{process.env.REACT_APP_APP_NAME}</span>, we are passionate about cars and committed to providing <b>top-notch</b> service to our <b>customers</b>. With years of experience in the <b>automotive industry</b>, our team of <b>skilled</b> technicians is dedicated to keeping your vehicle running <b>smoothly and safely</b>.
        </BodyText>
        <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black", mb: 3, mt: 3 }} />
        <BodyText variant="body1" align="justify">
          We offer a <b>comprehensive</b> range of services, from routine maintenance and repairs to advanced diagnostics and performance upgrades. Our <b>state-of-the-art</b> facilities are equipped with the latest tools and technology to handle all types of vehicles, ensuring <b>efficient</b> and <b>reliable</b> service every time.
        </BodyText>
        <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black", mb: 3, mt: 3 }} />
        <BodyText variant="body1" align="justify">
          Whether you need a routine <b>oil change</b>, <b>brake repair</b>, <b>engine tune-up</b>, or any other <b>automotive service</b>, you can trust <span style={{ color: blue[700], fontWeight: 'bold' }}>{process.env.REACT_APP_APP_NAME}</span> to deliver outstanding results. We value the trust you place in us and will go above and beyond to exceed your expectations.
        </BodyText>
        <Divider sx={{ borderBottomWidth: 1.5, borderColor: "black", mb: 5, mt: 5 }} />
        <Typography variant="h6" align="justify" sx={{ mb: 1}}>
          Our system aims to <b>simplify</b> the process of booking a service, in our case the five steps below are enough.
        </Typography>
        <Stepper orientation="vertical">
          {steps.map((label) => (
            <Step 
              key={label}
              active={true}
              >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </ContentContainer>
    </Box>
  )
}

export default AboutUs;