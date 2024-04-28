import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { useStationConfig } from "../../../hooks/getUserInfoHook";

const RegFieldsPromoAgent = (props: any) => {
    const colorP = ChangeColorPallte()
    const [fields, setFields] = useState<any>()
    const item = props.children
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const staLang = useStationConfig()
    var lang = staLang?.data?.data?.staLang
    const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z-\-" "]+$/;

    return (
        <>
            <FormControl size="small" sx={{
                "& .MuiInputBase-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                        fontSize: ".18rem"
                    },
                    "& .MuiOutlinedInput-input": {
                        color: colorP.text4 + " !important",
                        fontSize: ".18rem"
                    },
                    padding: "0"
                },
                "& .MuiFormLabel-root": {
                    color: "#808080 !important",
                    fontSize: ".18rem"
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                    fontSize: ".18rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: colorP.forGround + " !important",
                        fontSize: ".18rem"
                    }
                },
                " .MuiSvgIcon-root": {
                    width: ".3rem",
                    height: ".3rem",
                    color: "#68707b"
                },
                " .MuiButtonBase-root": {
                    marginRight: "0"
                }
            }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{item.name}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    label={item.name}
                    onChange={(event) => props.handleChange(event)}
                    name={item.eleName}
                    value={props.valueS[item.eleName] ? props.valueS[item.eleName] : ""}
                    type={!showPassword && item.eleName == "pwd" || !showConfirmPassword && item.eleName === "rpwd" ? "password" : "text"}
                    required={item.required === 2 ? true : false}
                    onKeyDown={item.eleName == "realName" ? ((event) => { if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) { event.preventDefault() } }) : ((event) => { })}
                    endAdornment={
                        <>
                            {item.eleName == "pwd" &&
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff sx={{ color: colorP.fourth }} />}
                                </IconButton>}
                            {item.eleName == "rpwd" &&
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff sx={{ color: colorP.fourth }} />}
                                </IconButton>
                            }
                        </>
                    }
                    startAdornment={
                        <img src={"/images/"+ item.eleName + ".png"} style={{ width: ".22rem", margin: ".1rem" }} />
                    }
                />
            </FormControl>
        </>
    )
}
export default RegFieldsPromoAgent;