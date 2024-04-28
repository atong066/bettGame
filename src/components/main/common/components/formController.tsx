import { FormControl } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";

export default function FormControler(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <FormControl
            size="small"
            sx={{
                minWidth: 255,
                fontSize: ".16rem",
                color: "#68707b !important",
                "& .MuiPaper-root": {
                    background: colorP.backGorund,
                    fontSize: ".16rem",
                    color: "#68707b !important",
                },
                "& fieldset": {
                    borderColor: "#313843 !important",
                    "& legend": {
                        "& span": {
                            color: colorP.forGround + " !important"
                        }
                    }
                },
                "& label": {
                    fontSize: ".16rem",
                    color: "#68707b !important",
                },
                "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderColor: colorP.forGround + "!important",
                }, "& .MuiInputBase-root": {
                    color: "#68707b !important",
                    fontSize: ".16rem"
                }, "& .MuiSvgIcon-root": {
                    color: "#68707b !important",
                    width: ".15em",
                },
                " .MuiSelect-select": {
                    color: "#68707b !important",
                },
                marginTop: ".06rem !important"
            }}
        >
            {props.children}
        </FormControl>
    )
}