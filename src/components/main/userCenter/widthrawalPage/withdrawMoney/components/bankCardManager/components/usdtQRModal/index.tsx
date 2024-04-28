import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../../../../../globalFunctions/globalContext";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, TextField, FormControl, Button, Stack } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ToastrPngk } from "../../../../../../../../globalFunctions/toastr";
import axios from "axios";
import { useGetRecharge, useGetUSDTInfo, useGetUSDTInfos, useSaveUSDT } from "../../../../../../../../hooks/getUserInfoHook";
import { useGlobalVariables } from "../../../../../../../../globalFunctions/store";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function USDTQRModal(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()

    const offlineBanks = useGlobalVariables(state => state.offlineBankcards)
    const getUSDTInfo = useGetUSDTInfo()
    const getUSDTInfos = useGetUSDTInfos()
    const usdtInfo = getUSDTInfo?.data?.data

    useEffect(() => {
        // getUSDTInfo.refetch()
        // getUSDTInfos.refetch()
    }, [usdtInfo])

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    const bnks = offlineBanks?.bankList?.filter((entry: { payPlatformCode: any; }) =>
        entry.payPlatformCode == "USDT"
    )

    return (
        <React.Fragment>
            <Dialog
                open={props.openUSDTQR}
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
                <AppBar sx={{ position: 'relative', backgroundColor: "#1c1e23" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component={'span'}>
                            <label className="modalTitle" style={{ color: color.text }}>{t("ts205", { ns: "ts" })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={props.closeUSDTQR}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: color.text, fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: "#1c1e23" }}>
                    <div className="usdtQRContainer">
                        <div className="remarkBox">
                            {/* {usdtInfo?.content?.remark} */}
                        </div>
                        <div className="qrImageBox">
                            <img src={bnks && bnks[0]?.qrCodeImg} className="qrImage" />
                        </div>
                        <div className="copyQrBox">
                            <div className="copyID">{bnks && bnks[0]?.bankCard ? bnks[0]?.bankCard : "-"} {bnks && bnks[0]?.bankCard && <ContentCopyIcon style={{ color: color.forGround }} className="copyIcon" onClick={() => copyText(bnks[0]?.bankCard)} />}</div>
                        </div>
                        <div className="TRXBox">
                            {/* <span className="trxLabel">{t("ts087", { ns: "ts" })}:</span><span className="trxLabel" style={{ color: color.forGround }}> {usdtInfo?.content?.initTrx}</span> */}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}