import Card from "@mui/material/Card";
import Tooltip from '@mui/material/Tooltip';
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import ButtonBase from '@mui/material/ButtonBase';

const StyledCard = styled(Card)(({ theme }) => ({
	margin: "0.75em",
  backfaceVisibility: "hidden",
	transition: "transform 0.1s ease-in-out",
	"&:hover": { 
    transform: "translateY(0.2rem)",
    "boxShadow": "4em"
  },
}));

const BookingCardAdd = ({
  createBooking,
  setShow
}) => (
  <Tooltip 
    title="Add a new booking" 
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
    <StyledCard>
      <Card
        className='booking-card'
        variant='outlined'
        sx={{ boxShadow: 1, borderRadius: 1.5, background: grey[100] }}
      >
        <ButtonBase 
        sx={{height: 1, width: 1}}
        centerRipple={true}
        onClick={() => {
          setShow(true);
        }}
        >
          <AddIcon sx={{height: 0.2, width: 0.2}} />
        </ButtonBase>
      </Card>
    </StyledCard>
  </Tooltip>
);

export default BookingCardAdd;
