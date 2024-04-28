import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./textField.scss";

export default function TextFieldMui(props: any) {
  return (
    <TextField
      id="outlined-start-adornment"
      sx={{ m: 1, width: "40rem" }}
      className="textField"
      type="password"
      inputProps={{ maxLength: 6 }}
      onChange={(event) => props.onChange(event.target.value)}
    />
  );
}
