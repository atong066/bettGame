import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, Button } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { useGlobalVariables, useModalStates, useTurnModalData } from "../../../../globalFunctions/store";
import { useNomV3 } from "../../../../hooks/getUserInfoHook";

export default function RetirarDialog() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const withdraw = useModalStates(state => state.withdrawInvite)
    const turnlateData = useGlobalVariables(state => state.turnlateType5)
    const stationConfig = useGlobalVariables(state => state.stationConfig)

    const currentAwardValue = useTurnModalData(state => state.currentValue)
    const awardValue = useTurnModalData(state => state.awardValue)

    const invite = useNomV3()

    const valueDeducted = (awardValue ? awardValue - currentAwardValue : 0)

    const closeWithdrawModal = () => {
        useModalStates.setState({ withdrawInvite: false })
    }

    const openShareInvite = () => {
        useModalStates.setState({ shareInviteModal: true })
        invite.refetch()
    }

    return (
        <React.Fragment>
            <Dialog
                open={withdraw}
                sx={{
                    height: "fit-content",
                    " .MuiPaper-root": {
                        boxShadow: "none",
                        width: "4.57rem",
                        maxHeight: "100%",
                    },
                    " .MuiPaper-root.MuiPaper-rounded": {
                        borderRadius: ".1rem",
                        border: "thin solid",
                        borderColor: "#1d2230"
                    },
                    " .MuiDialogContent-root": {
                        padding: 0,
                        backgroundColor: "#1d2230"
                    },
                    " .MuiToolbar-root": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: ".4rem",
                        minHeight: "0",
                        padding: ".1rem",
                        paddingLeft: ".25rem",
                        userSelect: "none"
                    },
                    " .MuiTypography-root": {
                        fontSize: ".18rem",
                        " .modalTitle": {
                            display: "flex",
                            alignItems: "center",
                            gap: ".1rem"
                        }
                    },
                    " .MuiButtonBase-root": {
                        padding: "0"
                    }
                }}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: "#1d2230" }}>
                    <Toolbar>
                        <Typography component={'span'}>
                            <label className="modalTitle" style={{ color: "#fff" }}><img src="/turnlateImages/money_icon.png" style={{ width: ".25rem" }} alt="." className="moneyIcon" />{t('ts1064', { ns: 'ts' })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={closeWithdrawModal}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: "#fff", fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: "#1c1e23" }}>
                    <div className="withdrawMainContainerBox">
                        <div className="titleMoneyBox">
                            <span className="titleLabel">{t('ts1075', { ns: 'ts' })}</span>
                            <span className="titleLabel titleMoney">{stationConfig.moneyUnit} {turnlateData.pddTurnRecord ? turnlateData.pddTurnRecord.currentAwardValue : (currentAwardValue ? currentAwardValue : 0)}</span>
                        </div>
                        <div className="mapContainerBox">
                            <div className="mapListBox">
                                <div className="imageBox active">
                                    <img className="mapImage" src="/turnlateImages/check.png" alt="." />
                                </div>
                                <span className="mapLabel active">{t('ts1076', { ns: 'ts' })}</span>
                                <div className="divLine active">
                                    <div className="dotBox"></div>
                                </div>
                            </div>
                            <div className="mapListBox">
                                <div className="imageBox active">
                                    <img className="mapImage" src="/turnlateImages/check.png" alt="." />
                                </div>
                                <span className="mapLabel active">{t('ts1077', { ns: 'ts' })} <span className="mapMoney active">{turnlateData?.pddTurnRecord ? (turnlateData?.pddTurnRecord?.awardValue - turnlateData?.pddTurnRecord?.currentAwardValue).toFixed(2) : (valueDeducted ? valueDeducted.toFixed(2) : 0)}</span> {t('ts1079', { ns: 'ts' })}</span>
                                <div className="divLine">
                                    <div className="dotBox"></div>
                                </div>
                            </div>
                            <div className="mapListBox">
                                <div className="imageBox">
                                    <img className="mapImage" src="/turnlateImages/check.png" alt="." />
                                </div>
                                <span className="mapLabel">{awardValue ? awardValue : turnlateData?.pddTurnRecord?.awardValue ? turnlateData?.pddTurnRecord?.awardValue : 0} {t('ts1078', { ns: 'ts' })}</span>
                            </div>
                        </div>
                        <Button onClick={openShareInvite} className="conVideButton" variant="contained">{t('ts1078', { ns: 'ts' })}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}