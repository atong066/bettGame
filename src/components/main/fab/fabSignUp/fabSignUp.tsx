import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import RegModal from "../../../layout/navbar/registrationModal";
import {
  useGenerateOTP,
  useGlobalVariables,
  useLoginStore,
  userRegstore,
} from "../../../globalFunctions/store";

const FabSignUp = () => {
  const userInfo = useGlobalVariables(state=>state.userDetails);
  const handleOpenRegmodal = () => {
    userRegstore.setState({ isOpenRegister: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "6rem",
        width: "45%",
        backgroundColor: "#121212",
        color: "white",
        borderRadius: "15px",
        padding: "20px",
        position: "fixed",
        border: "1px solid rgb(240, 184, 63)",
        bottom: "2rem",
        right: "25%",
        zIndex: 5,
      }}
    >
      <Box>
        <img src="fabImages/giftHands.png" alt="" />
      </Box>
      <Box>
        <Typography variant="h6" color="white">
          Sign up now and receive up to 100 USDT in rewards
        </Typography>
      </Box>
      <Box>
        <Button variant="outlined" color="inherit"
          sx={{
            // backgroundColor: "rgb(240, 184, 63)",
            color: "rgb(240, 184, 63)",
            marginLeft: "10px",
            // "& .MuiButtonBase-root":
            //   {backgroundColor: 'red'},
          }}
          onClick={handleOpenRegmodal}
        >
          Sign up now
        </Button>
      </Box>
    </Box>
  );
};

export default FabSignUp;
