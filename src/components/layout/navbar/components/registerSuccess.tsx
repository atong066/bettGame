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

export default function RegisterSuccess(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()

    const logOut = useLogout()

    const closeNewReg = () => {
        useGlobalVariables.setState({ newRegPop: false })
    }
    const openNew = useGlobalVariables(state => state.newRegPop)

    const openDeposit = () => {
        useGlobalVariables.setState({ depoModal: true });
        useGlobalVariables.setState({ newRegPop: false })
    }

    return (
        <React.Fragment>
            <Dialog
                open={openNew}
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

                <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component={'span'}>
                            <label className="modalTitle" style={{ color: colorP.text, fontSize: ".22rem" }}>{t("ts169", { ns: "ts" })}</label>
                        </Typography>
                    </Toolbar>
                    <CloseIcon onClick={closeNewReg}
                        sx={{
                            height: ".4rem",
                            width: ".4rem",
                            padding: "8px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            color: "#fff",
                            position: "absolute",
                            right: 0,
                        }}
                        className="closeIcon"
                    />
                </AppBar>
                <DialogContent sx={{ backgroundColor: colorP.backGorund }}>

                    <div className="confirmOutLabel">
                        <div className="labelBoxOut" style={{ width: "5rem", margin: ".2rem 0 .2rem 0" }}>
                            <span style={{ fontSize: ".18rem" }}>{t("ts1207", { ns: "ts" })}</span>
                        </div>
                        <div className="buttonBoxOut" style={{ width: "100%" }}>
                            <Button style={{ borderColor: colorP.forGround, backgroundColor: colorP.forGround, color: colorP.text2, width: "100%" }} className="buttonOut" onClick={openDeposit} variant="contained">{t("ts986", { ns: "ts" })}</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}