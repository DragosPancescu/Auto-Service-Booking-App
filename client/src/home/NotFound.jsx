import * as React from "react";

import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

import notfoundimage from "../images/notfoundimage.svg"

export default function NotFoundPage() {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <img src={notfoundimage} alt="notfoundimage" height={400} width={400} style={{ marginLeft: 175, marginTop: -80 }}></img>
        <Typography variant="h4" component="h1" align="center" style={{ fontFamily: 'Indie Flower', color: blue[700], marginBottom: 20, marginTop: 70 }}>
          Uh-oh! We seem to have misplaced the car you're looking for!
        </Typography>
        <Typography variant="body1" align="center" style={{ fontFamily: 'Arial', fontSize: '18px', marginBottom: '10px' }}>
          Our website is currently on a wild goose chase trying to find it. We apologize for any inconvenience caused.
        </Typography>
        <Typography variant="body1" align="center" style={{ fontFamily: 'Arial', fontSize: '18px' }}>
          While we embark on this car-hunting adventure, why not check out some of our other amazing <Link href="/">pages</Link>?
        </Typography>
      </Grid>
    </Grid>
  )
}
