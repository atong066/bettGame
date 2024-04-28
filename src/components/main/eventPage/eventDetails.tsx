import { useEffect, useReducer, useRef, useState } from "react";
import MainLayout from "../../layout";
import CheckIcon from '@mui/icons-material/Check';
import "./event.css";
import {
    EvenHeader,
    EvenHeaderstStwo,
    HeaderWithAction,
} from "../common/header";
import {
    EventDetailsGet,
    EventProviderData,
} from "../../globalFunctions/eventContext";
import {
    ChangeColorPallte,
    UserUSerConfig2,
} from "../../globalFunctions/globalContext";
import { useNavigate } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../userCenter/common/table";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useTranslation } from "react-i18next";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToastrPngk } from "../../globalFunctions/toastr";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGetActivityDetails, useGetEvents, useStationConfig } from "../../hooks/getUserInfoHook";
import ScrollContainer from 'react-indiana-drag-scroll'
import { Avatar, Button } from "@mui/material";
import RequestModal from "./components/requestModal";
import Cookies from "universal-cookie";
import { useGlobalVariables } from "../../globalFunctions/store";
function Chests(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const chesDetails = props.children;

    const url = window.location.href;
    const cookies = new Cookies();
    var id = cookies.get('eventID')
    const navigate = useNavigate();
    // const eventDetails = EventProviderData()
    const eventDetails = useGetActivityDetails(id);
    if (eventDetails.isError) {

    }
    const config = useGlobalVariables(state => state.stationConfig)
    const [canOpennow, setCanopenNMow] = useState(false)
    async function joinEvent(value: any, canopen: any) {
        if (canopen === false) {
            ToastrPngk({ msg: t("ts831", { ns: "ts" },), type: "error" });
            return 0;
        }
        if (!canopen === true) {
            ToastrPngk({
                msg: t("ts866", { ns: "ts" }),
                type: "error",
            });
            return 0;
        }

        try {

            const response = await axios.post(
                "/joinAct.do",
                {
                    bonusId: value,
                    actId: eventDetails?.data?.id,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            );

            if (response.data.success == true) {
                ToastrPngk({ msg: response.data.msg, type: "success" });
                eventDetails.refetch()
                setCanopenNMow(true)
            } else {
                ToastrPngk({ msg: response.data.msg, type: "error" });
            }
        } catch (e) {

        }
    }
    const indexCurrent = props.indexes;
    return (
        <div
            style={
                props.children.canOpen == true && props.children.hasPick == false
                    ? { filter: "grayscale(0)" }
                    : { filter: "grayscale(1)" }
            }
            className="chest"
            onClick={() =>
                joinEvent(props.children.bonusIndex, props.children.canOpen)
            }
        >
            <div
                className={
                    props.children.hasPick !== undefined
                        ? props.children.hasPick === true
                            ? "eventChest opened"
                            : "eventChest closed"
                        : "eventChest"
                }
                style={
                    props.children.hasPick === true
                        ? { animation: "none !important" }
                        : { whiteSpace: "none" }
                }
            >
                {props.children.hasPick === undefined ||
                    props.children.hasPick === false && canOpennow == false ? (
                    <img className="chestt" src="/images/chests4.png" alt="" />
                ) : (
                    <img className="chestt" src="/images/chesOpen.png" alt="" />
                )}
                <div className="inviTePerson">
                    {props.children.invitePerson} {t("ts598", { ns: "ts" })}
                </div>
                {props.evCashType !== 1 &&
                    <div className="inviteReqard">
                        {props.children.giftMoney},00
                    </div>}
            </div>
        </div>
    );
}
function ChestContainer(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    function getChest() {
        let myComponenst = [];
        const initit = props.currIndex * props.maxpR;
        const max = props.maxpR * (props.currIndex + 1);
        for (
            let i = 0 + initit;
            i < (max > props.totalItems ? props.totalItems : max);
            i++
        ) {
            myComponenst.push(
                <Chests indexes={i} isOdd={props.isOdd} evCashType={props.eventConfType}>
                    {props.children[i]}
                </Chests>
            );

            myComponenst.push(<div className="arrowIcon"><img className="arrow" src="/images/doubleArrow.png" alt="" /></div>)

        }
        return myComponenst;
    }
    return (
        <div className="chesContainerMain">
            <div className="chesContainer">{getChest()}</div>
            <div className="midArrow">
                <img className="arrowBet" src="/images/doubleArrow.png" alt="" />
            </div>
        </div>
    );
}
function EventTypeOne(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const userData = useGlobalVariables(state => state.userDetails)
    const navigate = useNavigate();
    const maxPerRow = 4;
    const [exLinks, setExlink] = useState<any>();
    const config = useStationConfig()
    const userInfo = useGlobalVariables(state => state.userDetails)
    const eventDetails = props.children;
    const bonusConfig = eventDetails?.bonusConfigs ? JSON.parse(eventDetails.bonusConfigs) : []
    if (eventDetails?.length <= 0) {
        navigate("/event");
    } else {
        var rows = Math.ceil(userData?.isLogin ? eventDetails?.configs?.length / maxPerRow : bonusConfig?.length / maxPerRow);
    }

    const colorP = ChangeColorPallte();
    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + "-";
        var M =
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
        var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m =
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
            ":";
        var s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        const strDate = Y + M + D + h + m + s;
        return strDate;
    }
    function getChest() {
        const totalItems = userData?.isLogin ? eventDetails?.configs?.length : bonusConfig?.length
        let myComponenst = [];
        for (let i = 0; i < rows; i++) {
            let subComp = [];
            const oddCheck = i % 2 != 0;
            subComp.push(
                <ChestContainer
                    isOdd={oddCheck}
                    totalItems={totalItems}
                    currIndex={i}
                    maxpR={maxPerRow}
                    rows={rows}
                    eventConfType={eventDetails.showMoney ? eventDetails?.showMoney : "0"}
                >
                    {userData?.isLogin ? eventDetails.configs : bonusConfig}
                </ChestContainer>
            );
            myComponenst.push(subComp);
        }
        return myComponenst;
    }
    async function exLink() {
        const response = await axios.get(
            "/userCenter/agentManage/recommendInfo2.do",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "X-Requested-With": "XMLHttpRequest",
                },
            }
        );
        setExlink(response.data);
    }
    function copyText(text: any) {
        navigator.clipboard.writeText(text);
        ToastrPngk({ msg: "Text Copied to Clipboard", type: "success" });
    }
    useEffect(() => {
        exLink();
    }, []);
    return (
        <>
            <div className="socialActions" style={{ background: colorP.backGorund }}>
                {userInfo.isLogin && exLinks && <div className="exLinks" style={{ borderColor: "#313843" }}>
                    <div className="label" style={{ color: "#68707B" }}>
                        {t("ts589", { ns: "ts" })}
                    </div>
                    <div
                        className="link exLinkstyle"
                        style={{ borderColor: "#313843" }}
                    >
                        <span>{exLinks?.linkUrl}</span>{" "}
                        <img width={22} src="/navbarImages/copy.png" onClick={() => copyText(exLinks?.linkUrl)} className="copyIcon"></img>

                    </div>
                </div>}
                <div className="exLinks2" style={{ borderColor: "#313843" }}>
                    <div className="label" style={{ color: "#68707B", fontWeight: "100" }}>
                        {t("ts590", { ns: "ts" })}
                    </div>
                    <div className="link" style={{ borderColor: colorP.forGround }}>
                        <Link to="https://telegram.com" className="icon">
                            <img src="footerImage/11.png" alt="" />
                            <label htmlFor="" >Telegram</label>
                        </Link>
                        <Link to="https://facebook.com" className="icon">
                            <img src="footerImage/10.png" alt="" />
                            <label htmlFor="" >Facebook</label>
                        </Link>
                        <Link to="https://whatsapp.com" className="icon">
                            <img src="footerImage/12.png" alt="" />
                            <label htmlFor="" >Whats App</label>
                        </Link>
                        <Link to="https://instagram.com" className="icon">
                            <img src="footerImage/13.png" alt="" />
                            <label htmlFor="" >Instagram</label>
                        </Link>
                        <Link to="https://Youtube.com" className="icon">
                            <img src="footerImage/14.png" alt="" />
                            <label htmlFor="" >Youtube</label>
                        </Link>
                        <Link to="https://Tiktok.com" className="icon">
                            <img src="footerImage/15.png" alt="" />
                            <label htmlFor="" >Tiktok</label>
                        </Link>
                        <Link to="https://Twitter.com" className="icon">
                            <img src="footerImage/16.png" alt="" />
                            <label htmlFor="" >Twitter</label>
                        </Link>
                        <Link to="https://Kuwai.com" className="icon">
                            <img src="footerImage/17.png" alt="" />
                            <label htmlFor="" >Kuwai</label>
                        </Link>

                    </div>
                    <div className="moreLinks" style={{ width: "fitContent" }}>
                        <div className="titleWithIcon">
                            <Link
                                to="/PromotionPage"
                                style={{
                                    color: "#F0C059",
                                    marginRight: "1rem",
                                    fontSize: "0.18rem",
                                }}
                            >
                                {t("ts647", { ns: "ts" })}{" "}
                                <ArrowForwardIosIcon className="arrowIconRight" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="socialFooter">
                    <div style={{ color: "#68707B" }}>
                        {t("ts591", { ns: "ts" })}{" "}
                        <em style={{ color: colorP.forGround }}>{eventDetails?.validMemberCount}</em>
                    </div>
                </div>
            </div>
            <div className="questionDiv" style={{ background: colorP.backGorund }}>
                <div className="top" style={{ color: "#68707B" }}>
                    {eventDetails?.validMemberType == 1 ? t("ts595", { ns: "ts" }) : t("ts593", { ns: "ts" })}
                </div>
                <div className="mid">

                    <Table>
                        <TableBody>
                            {eventDetails?.firstDeposit != 0 &&
                                <TableRow>
                                    <TableCell><span style={{ color: "#68707B" }}>{t("ts874", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{eventDetails?.firstDeposit} {t("ts597", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            }
                            {eventDetails?.totalDeposit != 0 &&
                                <TableRow>
                                    <TableCell><span style={{ color: "#68707B" }}>{t("ts875", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{eventDetails?.totalDeposit} {t("ts597", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            }
                            {eventDetails?.totalBetnum != 0 &&
                                <TableRow>
                                    <TableCell><span style={{ color: "#68707B" }}>{t("ts876", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{eventDetails?.totalBetnum} {t("ts597", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            }
                            {eventDetails?.totalDepositTimes != 0 &&
                                <TableRow>
                                    <TableCell><span style={{ color: "#68707B" }}>{t("ts877", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{eventDetails?.totalDepositTimes} {t("ts597", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="chestContainer" style={{ background: colorP.backGorund }}>
                {getChest()}
            </div>
            <div
                className="instructionsAct"
                style={{ background: colorP.backGorund }}
            >
                {/* <div className="actLabel" style={{ color: "#ADB6C3" }}>
                    {t("ts599", { ns: "ts" })}（GMT -3:00）：
                </div>
                <div className="actTime" style={{ color: "#ADB6C3" }}>
                    {timestampToTime(eventDetails?.beginDatetime)}--
                    {timestampToTime(eventDetails?.endDatetime)}
                </div> */}
                {/* <div className="actText" style={{ color: "#ADB6C3" }}>
                    {t("ts600", { ns: "ts" })}:
                </div> */}
                <div className="actInst" style={{ color: "#ADB6C3" }} dangerouslySetInnerHTML={{ __html: eventDetails?.actDesc.replace(/\r\n/g, '<br>') }} >

                </div>
            </div>
        </>
    );
}
function EventDetailstype2(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const eventDetails = props.children.data;
    const colorP = ChangeColorPallte();
    const navigate = useNavigate()
    const [openRequest, setOpenRequest] = useState(false)
    const config = useGlobalVariables(state => state.stationConfig)
    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + "-";
        var M =
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
        var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m =
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
            ":";
        var s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        const strDate = Y + M + D + h + m + s;
        return strDate;
    }
    if (eventDetails == null) {
        navigate("/events")
    }
    return (
        <>
            {eventDetails !== null && (eventDetails?.configs?.length !== 0 && eventDetails?.type !== 10) && <div
                className="eventTabledetails"
                style={{ background: colorP.backGorund }}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            {eventDetails?.type == 3 ?
                                <TableCell><span style={{ color: colorP.text4 }}>{t("ts809", { ns: "ts" })}</span></TableCell> : <TableCell><span style={{ color: colorP.text4 }}>{t("ts601", { ns: "ts" })}</span></TableCell>}
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts602", { ns: "ts" })}</span></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eventDetails?.type == 3
                            ? eventDetails?.configs?.map((value: any, index: any) => (
                                <TableRow>
                                    <TableCell><span style={{ color: colorP.text4 }}>{'≥'}  {value.depositMoney}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{value.giftMoney}</span></TableCell>
                                </TableRow>
                            ))
                            : (eventDetails?.configs)?.map((value: any, index: any) => (
                                <TableRow>
                                    <TableCell><span style={{ color: colorP.text4 }}> {'≥'}  {value.validBetnum}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{value.giftMoney}</span></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>}
            <div
                className="instructionsAct"
                style={{ background: colorP.backGorund }}
            >
                {/* <div className="actLabel" style={{ color: "#68707B" }}>
                    {t("ts599", { ns: "ts" })}（UTC+08:00）：
                </div>
                <div className="actTime" style={{ color: "#68707B" }}>
                    {timestampToTime(eventDetails?.beginDatetime)}--
                    {timestampToTime(eventDetails?.endDatetime)}
                </div> */}
                {/* <div className="actText" style={{ color: "#68707B" }}>
                    {t("ts600", { ns: "ts" })}:
                </div> */}
                <div className="actInst" style={{ color: "#68707B" }} dangerouslySetInnerHTML={{ __html: eventDetails?.actDesc.replace(/\r\n/g, '<br>') }}>
                </div>
            </div>
            {eventDetails?.type === 10 &&
                <div className="requestEvent">
                    <span style={{ color: "#f0b83f", fontSize: 17 }}>{t("ts811", { ns: "ts" })}: {eventDetails?.leftTodayApplyTimes && config.isLogin == true ? eventDetails?.leftTodayApplyTimes : 0}</span>
                    <Button
                        sx={{
                            "&:disabled": {
                                cursor: "not-allowed !important",
                                pointerEvents: "all !important",
                                color: "#fff"
                            },
                        }}
                        disabled={eventDetails.leftTodayApplyTimes && config.isLogin == true ? false : true} onClick={() => setOpenRequest(true)} style={{ background: colorP.forGround, fontWeight: 600, textTransform: "uppercase" }}>{t("ts812", { ns: "ts" })}</Button>
                </div>
            }
            <RequestModal modalAction={setOpenRequest} modalStatus={openRequest}>{props.children}</RequestModal>
        </>
    );
}
function EventDetails() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte();
    const cookies = new Cookies();
    var id = cookies.get('eventID')
    const evIndex = cookies.get('eventINdex')
    const navigate = useNavigate();
    const eventDetailsAll = useGetEvents()
    const eventDetails = useGetActivityDetails(id);
    const ref = useRef(); // We will use React useRef hook to reference the wrapping div:// Now we pass the reference to the useDraggable hook:
    if (eventDetails.isLoading == false) {
        if (!eventDetails?.data || eventDetails === null) {
            navigate("/event");
        }
    }
    const eventDet = EventDetailsGet()
    function getEventDetails(value: any) {
        var element = document.querySelector("#detail_scroll" + value);
        eventDet(value)
        cookies.set('eventID', value);
        navigate('/event-details')
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }
    const length = eventDetailsAll?.data?.data.length
    function getEventDetailsArrow(value: any) {
        const id = eventDetailsAll?.data?.data[value].id
        eventDet(id)
        cookies.set("eventINdex", value);
        cookies.set('eventID', id)
        navigate('/event-details')
    }
    if (eventDetails.isSuccess === true) {

    }
    useEffect(() => {
        eventDetailsAll.refetch()
        const value = cookies.get("eventID")
        var element = document.querySelector("#detail_scroll" + value);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [])
    return (
        <>
            <MainLayout>
                {eventDetails.isLoading ? (
                    <Loader setLoader={eventDetails.isLoading}></Loader>
                ) : (
                    <section className="mainEvent">
                        {eventDetails?.data?.data?.type == 1 ? (
                            <EvenHeader><div className="divWithElepsis">{eventDetails?.data?.title}</div></EvenHeader>
                        ) : (
                            <EvenHeaderstStwo><div className="divWithElepsis">{eventDetails?.data?.title}</div></EvenHeaderstStwo>
                        )}
                        {eventDetails?.data?.type == 1 ? (
                            <EventTypeOne>{eventDetails?.data}</EventTypeOne>
                        ) : (
                            <EventDetailstype2>{eventDetails}</EventDetailstype2>
                        )}

                        <div className="allDetailsContainer" style={{ marginTop: ".2rem" }}>
                            <div className="allAct" style={{ backgroundColor: "#313843" }}></div>
                            <div className="spanLabel"><span style={{ color: "#adb6c3" }}>{t("ts813", { ns: "ts" })}</span></div>
                            <div className="allAct" style={{ backgroundColor: "#313843" }}></div>
                        </div>

                        <div className="actMenu" >
                            <div onClick={() => getEventDetailsArrow(evIndex > 0 ? evIndex - 1 : 0)}><img className="left" src="/images/arrow-left.png" alt="" /></div>
                            <ScrollContainer className="even" >
                                {eventDetails.isLoading == false && eventDetailsAll?.data?.data.map((item: any, index: any) =>
                                    <div className="checkContainer">
                                        <div className={item.id == id ? "imgCOntianer active" : "imgCOntianer"} style={item.id == id ? { borderColor: colorP.forGround } : { borderColor: "none" }} onClick={() => getEventDetails(item.id)} id={"detail_scroll" + item.id}>
                                            <img src={item.titleImg} alt="" />
                                        </div>
                                        <div className={item.id == id ? "badge active" : "badge"} style={item.id == id ? { backgroundColor: colorP.forGround } : {}}>
                                            <Avatar style={{ background: "transparent", width: ".2rem", height: ".2rem" }}><CheckIcon sx={{ color: colorP.text2 + "!important" }} className="checkIcon" style={{ fontSize: 30, width: ".2rem", height: ".2rem" }}></CheckIcon></Avatar>
                                        </div>
                                    </div>
                                )}
                            </ScrollContainer >
                            <div onClick={() => getEventDetailsArrow(evIndex < length ? evIndex + 1 : length)}><img className="right" src="/images/arrow-left.png" alt="" /></div>
                        </div>

                    </section>
                )}
            </MainLayout>
        </>
    );
}
export default EventDetails;
