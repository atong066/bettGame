import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../../../../../globalFunctions/globalContext";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React from "react";
import { Button } from "react-scroll";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function PhoneNumberModal(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    return (
        <React.Fragment>
            <Dialog
                open={props.openPhoneNumber}
                sx={{
                    " .MuiDialog-paper": {
                        maxWidth: "max-content !important"
                    },
                    " .MuiPaper-root": {
                        boxShadow: "none",
                    },
                    " .MuiPaper-root.MuiPaper-rounded": {
                        borderRadius: ".2rem",
                        border: "thin solid",
                        borderColor: "#313843"
                    },
                    " .MuiDialogContent-root": {
                        padding: 0
                    },
                    " .MuiToolbar-root": {
                        height: ".5rem"
                    },
                    " .MuiTypography-root": {
                        fontSize: ".22rem"
                    }
                }}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component={'span'}>
                            <label className="modalTitle" style={{ color: colorP.text }}>{t("ts296", { ns: "ts" })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={props.closePhoneNumber}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: colorP.text, fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
                    {props.children}
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}