import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { ChangeColorPallte } from "../globalFunctions/globalContext";

export default function Loader(props: any) {
    const color = ChangeColorPallte();
    return (
        <>
            <Backdrop
                sx={{ color: color.text, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.setLoader}
            >
                <Stack spacing={2} direction={"column"} alignItems={"center"}>
                    <CircularProgress color="inherit" />
                    {props.children ? props.children : ""}
                </Stack>
            </Backdrop>
        </>
    )
}