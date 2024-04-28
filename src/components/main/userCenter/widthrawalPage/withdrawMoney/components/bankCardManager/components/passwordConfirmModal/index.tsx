import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../../../../../globalFunctions/globalContext";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, Button, FormControl } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OTPInput from "react-otp-input";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import '../../indexBankCardManager.css'
import { useModalStates, useWithdrawPass } from "../../../../../../../../globalFunctions/store";
import { useConfirmPasswords, useGetSecurityInfo } from "../../../../../../../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../../../../../../../globalFunctions/toastr";

export default function ConfirmPassword(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()

    const confirmPassword = useConfirmPasswords()
    const getSecurityInfo = useGetSecurityInfo()
    const getInfo = getSecurityInfo?.data?.data

    const [showOldWithdrawPass, setShowOldWithdrawPass] = useState(false);
    const handleClickShowOldWithdrawPassword = () => setShowOldWithdrawPass((show) => !show);
    const handleMouseDownOldWithdrawPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const confirmWithdrawPass = useWithdrawPass(state => state.password)
    const setConfirmPassword = (pass: any) => {
        useWithdrawPass.setState({ password: pass })
    }

    const withdrawModalPass = useModalStates(state => state.withdrawPassModal)

    const closeModal = () => {
        useModalStates.setState({ withdrawPassModal: false })
    }

    const openAddBank = () => {
        getSecurityInfo.refetch()
        confirmPassword.mutate({
            pwd: confirmWithdrawPass,
            type: 2
        })
    }

    return (
        <React.Fragment>
            <Dialog
                open={withdrawModalPass}
                sx={{
                    " .MuiDialog-paper": {
                        // maxWidth: "max-content !important",
                        width: "6rem",
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
                            <label className="modalTitle" style={{ color: colorP.text4 }}>{t("ts1116", { ns: 'ts' })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={closeModal}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: colorP.text4, fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
                    <div className="enterPassContainerConfirmPass">
                        <div className="enterPassContainer">
                            <div className="labelWithEyeBox">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldWithdrawPassword}
                                    onMouseDown={handleMouseDownOldWithdrawPassword}
                                    className="passWordEye"
                                    tabIndex={-1}
                                >
                                    {showOldWithdrawPass ? <Visibility sx={{ color: colorP.forGround, width: ".3rem", height: ".3rem" }} /> : <VisibilityOff sx={{ color: colorP.fourth, width: ".3rem", height: ".3rem" }} />}
                                </IconButton>
                            </div>
                            <FormControl
                                sx={{
                                    "input:focus": {
                                        borderColor: colorP.forGround + " !important",
                                        color: colorP.text4 + " !important",
                                    },
                                    "input": {
                                        borderColor: colorP.fourth + " !important",
                                        color: colorP.text4 + " !important",
                                    }
                                }}
                            >
                                <OTPInput
                                    inputType={showOldWithdrawPass ? 'number' : 'password'}
                                    onChange={(event) => setConfirmPassword(event)}
                                    numInputs={6}
                                    value={confirmWithdrawPass}
                                    inputStyle="withdrawPassAutoTab"
                                    renderInput={(props) => <input {...props} />}
                                />
                            </FormControl>
                        </div>
                        <div className="paraLabelContainer">
                            <div className="labelBoxes" style={{ color: colorP.text4 }}>{t('ts1117', { ns: 'ts' })}</div>
                            <div className="labelBoxes labelQuestion" style={{ color: colorP.forGround }}>{t('ts1118', { ns: 'ts' })}</div>
                        </div>
                        <Button style={{ backgroundColor: colorP.forGround, color: colorP.text4 }} onClick={openAddBank} className="confirmButton" variant="contained">{t('ts216', { ns: 'ts' })}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}