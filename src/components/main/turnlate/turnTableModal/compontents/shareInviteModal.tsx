import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { useGlobalVariables, useModalStates } from "../../../../globalFunctions/store";
import { ToastrPngk } from "../../../../globalFunctions/toastr";
import { Link } from "react-router-dom";
import { useNomV3 } from "../../../../hooks/getUserInfoHook";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
export default function ShareDialog() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const shareInvite = useModalStates(state => state.shareInviteModal)
    const stationConfig = useGlobalVariables(state => state.stationConfig)
    const color = ChangeColorPallte()
    const invite = useNomV3()
    const inviteLink = invite?.data?.data

    const closeShareModal = () => {
        useModalStates.setState({ shareInviteModal: false })
    }

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    return (
        <React.Fragment>
            <Dialog
                open={shareInvite}
                sx={{
                    height: "fit-content",
                    " .MuiPaper-root": {
                        boxShadow: "none",
                    },
                    " .MuiPaper-root.MuiPaper-rounded": {
                        borderRadius: ".1rem",
                        border: "thin solid",
                        borderColor: "#052a63"
                    },
                    " .MuiDialogContent-root": {
                        padding: 0,
                        backgroundColor: "#052a63"
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
                        fontSize: ".18rem"
                    },
                    " .MuiButtonBase-root": {
                        padding: "0"
                    }
                }}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: "#052a63" }}>
                    <Toolbar>
                        <Typography component={'span'}>
                            <label className="modalTitle" style={{ color: "#fff" }}>{t('ts1081', {ns: 'ts'})}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={closeShareModal}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: "#fff", fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: "#1c1e23" }}>
                    <div className="shareMainContainerModal">
                        <div className="socialMedaPlatformContainer">
                            <Link to="https://www.instagram.com" target="_blank">
                                <div className="socialMediaBox">
                                    <img src="footerImage/13.png" alt="" />
                                    <label htmlFor="" className="linksLabel">{t('ts1081', {ns: 'ts'})}</label>
                                </div> </Link>
                            <Link to={`https://web.whatsapp.com/send?url=${inviteLink?.content?.prompInfo.linkUrl && inviteLink?.content?.prompInfo.linkUrl}`} target="_blank">
                                <div className="socialMediaBox">
                                    <img src="footerImage/12.png" alt="" />
                                    <label htmlFor="" className="linksLabel">{t('ts990', {ns: 'ts'})}</label>
                                </div>
                            </Link>
                            <Link to="https://twitter.com" target="_blank">
                                <div className="socialMediaBox">
                                    <img src="footerImage/16.png" alt="" />
                                    <label htmlFor="" className="linksLabel">{t('ts1081', {ns: 'ts'})}</label>
                                </div>
                            </Link>
                            <Link to={`https://t.me/share?url=${inviteLink?.content?.prompInfo.linkUrl && inviteLink?.content?.prompInfo.linkUrl}`} target="_blank">
                                <div className="socialMediaBox">
                                    <img src="footerImage/11.png" alt="" />
                                    <label htmlFor="" className="linksLabel">{t('ts989', {ns: 'ts'})}</label>
                                </div>
                            </Link>
                            <Link to={`https://www.facebook.com/sharer/sharer.php?url=${inviteLink?.content?.prompInfo.linkUrl && inviteLink?.content?.prompInfo.linkUrl}`} target="_blank">
                                <div className="socialMediaBox">
                                    <img src="footerImage/10.png" alt="" />
                                    <label htmlFor="" className="linksLabel">{t('ts991', {ns: 'ts'})}</label>
                                </div>
                            </Link>
                        </div>
                        <div className="linkBoxContainer">
                            <div className="linkBox">
                                <span className="linkLabel">{inviteLink?.content?.prompInfo.linkUrl ? inviteLink?.content?.prompInfo.linkUrl : "-"}</span>
                            </div>
                            <div className="copyBox">
                                <img src={color.copy} alt="." onClick={inviteLink?.content?.prompInfo.linkUrl ? () => copyText(inviteLink?.content?.prompInfo.linkUrl) : () => copyText("-")} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}