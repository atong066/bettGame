
import { useTranslation } from "react-i18next";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, Button } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import './confirmOutModal.css'
import { useLogout } from "../../../hooks/getUserInfoHook";
import { useGlobalVariables, useModalStates } from "../../../globalFunctions/store";

export default function TermsCondition(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()

    const termsState = useModalStates(state => state.termsModal)

    const agree = () => {
        useModalStates.setState({ termsModal: false })
    }

    return (
        <React.Fragment>
            <Dialog
                open={termsState}
                sx={{
                    " .MuiDialog-paper": {
                        // maxWidth: "max-content !important",
                        width: "5.5rem",
                        maxWidth: "5.5rem",
                        height: "8.4rem"
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
                        padding: "0 .3rem 0 .3rem",
                        height: "4.2rem"
                    },
                    " .MuiToolbar-root": {
                        justifyContent: "flex-end",
                        minHeight: ".45rem !important",
                        marginBottom: ".2rem",
                        " .MuiButtonBase-root": {
                            top: "10px",
                            " .MuiSvgIcon-root": {
                                fontSize: ".25rem"
                            }
                        }
                    },
                    " .MuiDialogActions-root": {
                        backgroundColor: colorP.backGorund,
                        padding: ".3rem .3rem .3rem .3rem"
                    }
                }}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
                    <Toolbar>
                        <IconButton
                            edge="end"
                            color="inherit"
                            value="8"
                            onClick={agree}
                            aria-label="close"
                            tabIndex={-1}
                        >
                            <CloseIcon style={{ color: colorP.text }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
                    <div className="termsConditionMainContainer">
                        <div className="termsConditionContainer">
                            <div className="termsTitle">
                                <span className="title">{t("ts1134", { ns: "ts" })}</span>
                            </div>
                            <div className="termsContentBox">
                                <span className="termsContent">{t("ts1135", { ns: "ts" })}</span>
                                <span className="termsContent">{t("ts1136", { ns: "ts" })}</span>
                                <span className="termsContent">{t("ts1137", { ns: "ts" })}</span>
                                <span className="termsContent">{t("ts1138", { ns: "ts" })}</span>
                                <span className="termsContent">{t("ts1139", { ns: "ts" })}</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button style={{ borderColor: colorP.forGround, backgroundColor: colorP.forGround, color: colorP.text2 }} className="termsButton" onClick={agree} variant="contained">{t("ts1140", { ns: "ts" })}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}