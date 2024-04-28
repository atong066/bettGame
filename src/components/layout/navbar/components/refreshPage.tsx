import { useTranslation } from "react-i18next";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, Button } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import './confirmOutModal.css'
import { useLogout } from "../../../hooks/getUserInfoHook";
import { useGlobalVariables } from "../../../globalFunctions/store";

export default function ConfirmRefresh(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()

    const logOut = useLogout()

    const cancelOut = () => {
        useGlobalVariables.setState({ confirmRefersg: false })
    }
    function refreshPage() {
        useGlobalVariables.setState({ confirmRefersg: false })
        window.location.reload();
    }
    return (
        <React.Fragment>
            <Dialog
                open={props.modalStatus}
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
                        fontSize: ".22rem",
                        marginLeft: "0",
                        fontWeight: 100,
                        marginTop: ".11rem"
                    }
                }}
            >
                <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
                    <div className="confirmOutLabel">
                        <div className="labelBoxOut">
                            <span style={{ fontSize: ".18rem" }}>{t("ts1070", { ns: "ts" })}</span>
                        </div>
                        <div className="buttonBoxOut">
                            <Button style={{ color: colorP.forGround, borderColor: colorP.forGround }} className="buttonOut" onClick={refreshPage} variant="contained">{t("ts216", { ns: "ts" })}</Button>
                            <Button style={{ backgroundColor: colorP.forGround, borderColor: colorP.forGround, color: colorP.text2 }} className="buttonOut" onClick={cancelOut} variant="contained">{t("ts320", { ns: "ts" })}</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}