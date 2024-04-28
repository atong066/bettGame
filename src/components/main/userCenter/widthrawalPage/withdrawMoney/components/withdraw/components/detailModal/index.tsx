import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../../../../../globalFunctions/globalContext";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, Stack, FormControl } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useEffect } from "react";
import { Button } from "react-scroll";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGlobalVariables } from "../../../../../../../../globalFunctions/store";
import './detailModal.css'
import { useStationConfig } from "../../../../../../../../hooks/getUserInfoHook";

export default function DetailModal(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()

    const config2 = useGlobalVariables(state => state.stationConfig)
    const wihtdrawInfo = useGlobalVariables(state => state.withdrawInfo)

    useEffect(() => {

    }, [props])

    return (
        <React.Fragment>
            <Dialog
                open={props.openDetailModal}
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
                            <label className="modalTitle" style={{ color: colorP.text4 }}>{t("ts561", { ns: "ts" })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={props.closeDetailModal}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: colorP.text4, fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
                    <div className="bankWithdrawalInfoContainers">
                        <div className="bnkWithrawalData">
                                <Stack spacing={2} direction={"row"} width={"100%"}>
                                    <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                        <div className="infoLabelBox">
                                            <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts468", { ns: "ts" })}:</span>
                                            <span className="infoContent" style={{ color: colorP.forGround }}>{props.withdrawInfo ? props.withdrawInfo.dayTimes : ""}</span><span className="timesLabel">{t("ts476", { ns: "ts" })}</span>
                                        </div>
                                    </div>
                                </Stack>
                                {props.withdrawInfo?.lastTimes > 0 && <Stack spacing={2} direction={"row"} width={"100%"}>
                                    <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                        <div className="infoLabelBox">
                                            <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts469", { ns: "ts" })}:</span>
                                            <span className="infoContent" style={{ color: colorP.forGround }}>{props.withdrawInfo ? props.withdrawInfo.lastTimes : ""}</span><span className="timesLabel">{t("ts476", { ns: "ts" })}</span>
                                        </div>
                                    </div>
                                </Stack>}
                                {/* <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts470", { ns: "ts" })}:</span>
                                        <span className="currencyLabel" style={{ color: colorP.text4 }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{props?.amountFee}</span>
                                    </div>
                                </div>
                            </Stack> */}
                                <Stack spacing={2} direction={"row"} width={"100%"}>
                                    <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                        <div className="infoLabelBox">
                                            <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts471", { ns: "ts" })}:</span>
                                            <span className="currencyLabel" style={{ color: colorP.text4 }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{props.withdrawInfo ? props?.withdrawInfo?.minDrawMoney : ""}</span>
                                        </div>
                                    </div>
                                </Stack>
                                <Stack spacing={2} direction={"row"} width={"100%"}>
                                    <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                        <div className="infoLabelBox">
                                            <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts472", { ns: "ts" })}:</span>
                                            <span className="currencyLabel" style={{ color: colorP.text4 }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{props.withdrawInfo ? props?.withdrawInfo?.maxDrawMoney : ""}</span>
                                        </div>
                                    </div>
                                </Stack>
                                <Stack spacing={2} direction={"row"} width={"100%"}>
                                    <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                        <div className="infoLabelBox">
                                            <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts473", { ns: "ts" })}:</span>
                                            <span className="currencyLabel" style={{ color: colorP.text4 }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{props.withdrawInfo ? props?.withdrawInfo?.bet?.betNum : ""}</span>
                                        </div>
                                    </div>
                                </Stack>
                                <Stack spacing={2} direction={"row"} width={"100%"}>
                                    <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                        <div className="infoLabelBox">
                                            <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts474", { ns: "ts" })}:</span>
                                            <span className="currencyLabel" style={{ color: colorP.text4 }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{props.withdrawInfo ? props?.withdrawInfo?.bet?.drawNeed : ""}</span>
                                        </div>
                                    </div>
                                </Stack>
                                <Stack spacing={2} direction={"row"} width={"100%"}>
                                    <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                        <div className="infoLabelBox">
                                            <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts475", { ns: "ts" })}:</span>
                                            <span className="infoContent" style={{ color: colorP.forGround }}>{props.withdrawInfo ? props.withdrawInfo.minDrawTime : ""} -{props.withdrawInfo ? props?.withdrawInfo?.maxDrawTime : ""}</span>
                                        </div>
                                    </div>
                                </Stack>
                        </div>
                        {wihtdrawInfo?.strategy?.feeType == 1 ?
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround, width: "1fr" }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts982", { ns: "ts" })}: <span style={{ color: colorP.forGround }}>{wihtdrawInfo?.strategy?.drawNum}</span> <span className="timesLabel">{t("ts476", { ns: "ts" })}</span></span>
                                    </div>
                                </div>
                            </Stack> :
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround, width: "1fr" }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text4 }}>{t("ts979", { ns: "ts" })} <span style={{ color: "red" }}>{wihtdrawInfo?.strategy?.drawNum}</span> {t("ts476", { ns: "ts" })}, {t("ts980", { ns: "ts" })} <span style={{ color: "red" }}>{wihtdrawInfo?.strategy?.feeValue}%</span> {t("ts981", { ns: "ts" })}</span>
                                    </div>
                                </div>
                            </Stack>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}