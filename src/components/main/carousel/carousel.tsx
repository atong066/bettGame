import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import "./carousel.css";
import ReactSlick from "./reactCarousel";
import Swipers from "./swipe";

function Carousel() {
  return (
    <>
      {/* <div style={{minHeight:"2.9rem"}}> */}
        <Box
           sx={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   // width: "100%",
            margin: "0 3.6rem"
          }}
        >
          {/* <Box width={'72%'}> */}
            <Swipers />
          {/* </Box> */}
        </Box>
      {/* </div> */}

    </>
  );
}

export default Carousel;
