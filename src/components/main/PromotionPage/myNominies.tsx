import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import { useQuery } from "react-query";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Button, FormControl, Stack } from "@mui/material";
import QRcode from 'qrcode.react'
import { useGetNom, useNomToday } from "../../hooks/getUserInfoHook";
import { dateReducer, initialDate, initialMonth } from "../reducers/dateReduce";
import { DatePicker, DatePickerV2, NomeDatePicker } from "../common/components/dropdownComponent";
import DateModal from "../common/dateModal";
import Loader from "../../backdropLoader/backdrop-loader";
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalVariables } from "../../globalFunctions/store";
import { Link } from "react-router-dom";
function MyNiminies() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)
    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    const inviteData = useGetNom()
    const inviteTodayData = useNomToday()
    const intData = inviteData?.data?.data
    const intTodayData = inviteTodayData?.data?.data
    const payload = { startDate: commonReducer.startDate, endDate: commonReducer.endDate }
    useEffect(() => {
        // inviteTodayData.refetch()
        inviteData.mutate(payload)
    }, [])

    const handleGetdateEven = (e: any) => {

        dispatch({ type: e.value, dates: e })
    }
    const changeTabt = (id: number) => {
        useGlobalVariables.setState({ tabIndex: id })
    }
    return (
        <>
            <div className="maionBX">
                <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
                <Loader setLoader={inviteData.isLoading} />
                <div className="nomiNietitle" style={{ backgroundColor: color.backGorund, color: color.text4 }}>
                    {t("ts789", { ns: "ts" })}
                </div>
                <div className="nominies">
                    <div className="socialLinks" style={{ backgroundColor: color.backGorund }}>
                        <div className="qrContainer">
                            <div className="qrcode" style={{ backgroundColor: "#fff" }}>
                                <QRcode

                                    value={intData?.content?.prompInfo.linkUrl}
                                    style={{ width: "1.3rem", height: "1.3rem" }}
                                    fgColor="#000000"
                                />
                                <div className="clickBg" >
                                    {t("ts642", { ns: "ts" })}
                                </div>
                            </div>
                        </div>
                        <div className="socialSites">
                            <div className="title" style={{ color: "#68707B" }}>{t("ts643", { ns: "ts" })}</div>
                            {intData?.content?.prompInfo.linkUrl && <div className="link exLinkstyle" style={{ borderColor: "#313843", height: "0.4rem" }}><span>{intData?.content?.prompInfo.linkUrl}</span><img width={22} src="/navbarImages/copy.png" onClick={() => copyText(intData?.content?.prompInfo.linkUrl)} className="copyIcon"></img></div>}
                            <div className="socialLinkstab">
                                <Link to="https://telegram.com" className="linktab">
                                    <img src="footerImage/11.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Telegram</label>
                                </Link>
                                <Link to="https://facebook.com" className="linktab">
                                    <img src="footerImage/10.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Facebook</label>
                                </Link>
                                <Link to="https://whatsapp.com" className="linktab">
                                    <img src="footerImage/12.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Whats App</label>
                                </Link>
                                <Link to="https://instagram.com" className="linktab">
                                    <img src="footerImage/13.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Instagram</label>
                                </Link>

                                <Link to="https://Youtube.com" className="linktab">
                                    <img src="footerImage/14.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Youtube</label>
                                </Link>
                                <Link to="https://Tiktok.com" className="linktab">
                                    <img src="footerImage/15.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Tiktok</label>
                                </Link>
                                <Link to="https://Twitter.com" className="linktab">
                                    <img src="footerImage/16.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Twitter</label>
                                </Link>
                                <Link to="https://Kuwai.com" className="linktab">
                                    <img src="footerImage/17.png" alt="" />
                                    <label htmlFor="" className="linksLabel">Kuwai</label>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="extraContainer" style={{ marginTop: ".2rem" }}>
                    <div className="extraTab" style={{ backgroundColor: color.backGorund }}>
                        <div className="title" style={{ borderColor: "#313843" }}>
                            <div className="titleWithIcon" style={{ color: color.text4 }}><span>{t("ts814", { ns: "ts" })}</span></div>
                            <div onClick={() => changeTabt(3)} style={{ color: color.forGround }} className="titleWithIcon"><span className="more">{t("ts647", { ns: "ts" })} <ArrowForwardIosIcon style={{ width: ".2rem", height: "auto", color: "#313843" }} className="arrowIconRight" /></span></div>
                        </div>
                        <div className="contents">
                            <div className="top" style={{ borderColor: color.backGorund }}>
                                <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                    <span style={{ color: "#68707B" }}>{t("ts815", { ns: "ts" })}</span>
                                    <span style={{ color: "#FFAA09" }}>{intData?.content?.newInfo.rebatePrompActBonus ? intData?.content?.newInfo.rebatePrompActBonus : "0.00"}</span>
                                </div>
                                <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                    <span style={{ color: "#68707B" }}>{t("ts816", { ns: "ts" })}</span>
                                    <span style={{ color: "#FFAA09" }}>{intData?.content?.newInfo.todayRebatePrompActBonus ? intData?.content?.newInfo.todayRebatePrompActBonus : "0.00"}</span>
                                </div>
                                <div>
                                    <span style={{ color: "#68707B" }}>{t("ts817", { ns: "ts" })}</span>
                                    <span style={{ color: "#FFAA09" }}>{intData?.content?.newInfo.lastBonus ? intData?.content?.newInfo.lastBonus : "0.00"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="extraTab" style={{ borderColor: color.forGround, backgroundColor: color.backGorund }}>
                        <div className="title" style={{ borderColor: "#313843" }}>
                            <div className="titleWithIcon" style={{ color: color.text4 }}><span>{t("ts818", { ns: "ts" })}</span></div>
                            <div onClick={() => changeTabt(4)} style={{ color: color.forGround }} className="titleWithIcon"><span className="more">{t("ts647", { ns: "ts" })} <ArrowForwardIosIcon style={{ width: ".2rem", height: "auto", color: "#313843" }} className="arrowIconRight" /></span></div>
                        </div>
                        <div className="contents">
                            <div className="top" style={{ borderColor: color.backGorund }}>
                                <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                    <span style={{ color: "#68707B" }}>{t("ts819", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.teamRegCount ? intData?.content?.newInfo.teamRegCount : "0"}</span>
                                </div>
                                <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                    <span style={{ color: "#68707B" }}>{t("ts820", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.directSubRegCount ? intData?.content?.newInfo.directSubRegCount : "0"}</span>
                                </div>
                                <div>
                                    <span style={{ color: "#68707B" }}>{t("ts821", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.otherSubRegCount ? intData?.content?.newInfo.otherSubRegCount : "0"}</span>
                                </div>
                            </div>
                            <div className="top" style={{ borderColor: "#313843" }}>
                                <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                    <span style={{ color: "#68707B" }}>{t("ts916", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.totalBetBateMoney ? intData?.content?.newInfo.totalBetBateMoney : "0.00"}</span>
                                </div>
                                <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                    <span style={{ color: "#68707B" }}>{t("ts914", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.directSubBetBackMoney ? intData?.content?.newInfo.directSubBetBackMoney : "0.00"}</span>
                                </div>
                                <div>
                                    <span style={{ color: "#68707B" }}>{t("ts915", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.otherBetBackMoney ? intData?.content?.newInfo.otherBetBackMoney : "0.00"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="extraTab" style={{ borderColor: "#313843", backgroundColor: color.backGorund }}>
                        <div className="title" >
                            <div className="titleWithIcon" style={{ color: color.text4 }}>{t("ts827", { ns: "ts" })}</div>
                            <div onClick={() => changeTabt(7)} style={{ color: color.forGround }} className="titleWithIcon"><span className="more">{t("ts647", { ns: "ts" })} <ArrowForwardIosIcon style={{ width: ".2rem", height: "auto", color: "#313843" }} className="arrowIconRight" /></span></div>
                        </div>
                        <div className="contents">
                            <div className="top" style={{ borderColor: "#313843" }}>
                                <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                    <span style={{ color: "#68707B" }}>{t("ts828", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.totalBetMoney ? intData?.content?.newInfo.totalBetMoney : "0.00"}</span>
                                </div>
                                <div style={{ borderRight: "1px solid", borderColor: color.backGorund }}>
                                    <span style={{ color: "#68707B" }}>{t("ts829", { ns: "ts" })}</span>
                                    <span style={{ color: color.text4 }}>{intData?.content?.newInfo.totalBetOrderNum ? intData?.content?.newInfo.totalBetOrderNum : "0"}</span>
                                </div>
                                <div>
                                    <span style={{ color: "#68707B" }}>{t("ts830", { ns: "ts" })}</span>
                                    <span style={{ color: "#EA4E3D" }}>{intData?.content?.newInfo.totalWinLost ? intData?.content?.newInfo.totalWinLost : "0.00"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyNiminies;
