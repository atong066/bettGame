import { Button } from "@mui/material";
import {
    useButtonStates,
    useGlobalVariables,
} from "../../globalFunctions/store";
import MainLayout from "../../layout";
import { TabContainer, TabItem } from "../common/components/tabComponent";
import { EvenHeader, HeaderWithAction } from "../common/header";
import "./turnTable.css";
import TurnTableDailyWin from "./components/turnTableDailyWin";
import TurnTableInstruction from "./components/turnTableInstruction";
import { useEffect, useRef, useState } from "react";
import { ToastrPngk } from "../../globalFunctions/toastr";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import { useAward, useGetActivityDetails, useGetEvents, useGetTurnTablePrize, useGetTurnTableRecord, useGetTurnlateData, useGetTurnlateList, } from "../../hooks/getUserInfoHook";
import ScrollContainer from "react-indiana-drag-scroll";
import Cookies from "universal-cookie";
import { EventDetailsGet } from "../../globalFunctions/eventContext";
import { useNavigate } from "react-router";
import TurnModal from "../common/modal/turnlate-modal/alert-modal";
export default function TurnTable() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte();
    const turnlateData = useGlobalVariables((state) => state.turnlate);
    const [activeId, setActiveId] = useState()
    const getPrizes = useGetTurnTablePrize();
    const [rotate, setRotate] = useState(0);
    const [rotateActive, setRotateActive] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(0);
    const [buttonState, setButtonState] = useState(true);
    const cookies = new Cookies();
    const id = cookies.get("eventID");
    const navigate = useNavigate();
    const eventDetails = useGetActivityDetails(id);
    const eventDetailsAll = useGetEvents();
    const eventDet = EventDetailsGet();
    const turnData = useGetTurnlateData()
    const turnlateList = useGlobalVariables(state => state.turnlateList)
    const turnList = useGetTurnlateList()
    const [alert, setAlert] = useState(false)
    const [prize, setPrize] = useState()

    function getEventDetails(value: any) {
        eventDet(value);
        cookies.set("eventID", value);
        navigate("/event-details");
    }

    useEffect(() => {
        turnList.refetch()
        eventDetailsAll.refetch();
    }, []);

    const getAward = useAward()

    const openAlert = () => {
        setAlert(true)
    }
    const closeAlert = () => {
        setAlert(false)
    }

    const [imagePrize, setImagePrize] = useState("")
    const [titlePrize, setTitle] = useState("")

    async function turnMain(prizeId: any) {
        try {
            const response = await axios.get("/userTurnlate/award2.do", {
                params: {
                    activeId: prizeId
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest",
                }
            });
            if (response.data.success == false) {
                dontSpinPrize(response.data.msg)
                setButtonState(true)
            } else {
                if (response.data.index) {
                    rotateFn(response.data.index, JSON.parse(turnlateData?.awardsName)[response.data.index - 1]);
                    if (JSON.parse(turnlateData?.awardsName)[response.data.index - 1] === turnlateData?.awardsNameOther) {
                        setImagePrize("empty-bag.png")
                        setTitle("ts961")
                        setPrize(response.data.awardName)
                    } else {
                        setImagePrize("gold-bag.png")
                        setTitle("ts962")
                        setPrize(response.data.awardName)
                    }
                    setButtonState(false);
                } else {
                    ToastrPngk({ msg: response.data.msg, type: "error", id: "turn01" });
                }
            }
        } catch (error) {
            ToastrPngk({ msg: error, type: "error", id: "turn01" });
        }
    }


    var rotateFn = function (item: any, text: any) {
        var angles = item * (360 / JSON.parse(turnlateData?.awardsName)?.length) - 360 / (JSON.parse(turnlateData?.awardsName)?.length * 2) - 5400;
        if (angles < 360) {
            angles = 360 - angles;
        } else {
            angles = 360 - angles + 360;
        }
        JSON.parse(turnlateData?.awardsName)?.length == 10 ? setRotate(angles + 19) :
            JSON.parse(turnlateData?.awardsName)?.length == 9 ? setRotate(angles + 20) :
                JSON.parse(turnlateData?.awardsName)?.length == 8 ? setRotate(angles + 22) :
                    JSON.parse(turnlateData?.awardsName)?.length == 7 ? setRotate(angles + 26) :
                        JSON.parse(turnlateData?.awardsName)?.length == 6 ? setRotate(angles + 30) : setRotate(0)
        setRotateActive(true);
        setAnimationDuration(7);
        setTimeout(() => {
            setRotateActive(false);
            setButtonState(true);
            getPrizes.refetch();
            turnList.refetch()
            turnData.refetch()
            openAlert()
        }, 7000);
    };

    const spinPrize = (activeId: any) => {
        turnMain(activeId);
        setButtonState(false);
    };
    const dontSpinPrize = (msg: any) => {
        ToastrPngk({
            msg: msg,
            type: "warning",
            id: "turn01",
        });
    };

    const buttonStates = useButtonStates((state) => state.turnButton);
    const value = useGlobalVariables((state) => state.tabIndex2);

    const [types, setTypes] = useState(3)

    const setTurnType = (type: any, id: any) => {
        setRotate(0)
        useButtonStates.setState({ turnButton: type });
        useButtonStates.setState({ turnLateType: type });
        setTypes(type)
        setActiveId(id)
        setTimeout(() => {
            turnData.refetch()
        }, 100)
    };

    useEffect(() => {
        for (var i = 0; i < parseInt(turnlateList?.length); i++) {
            if (turnlateList[i].joinType !== 5) {
                if (turnlateList[i].joinType === 3) {
                    useButtonStates.setState({ turnLateType: turnlateList[i].joinType });
                    useButtonStates.setState({ turnButton: turnlateList[i].joinType });
                    setTypes(turnlateList[i].joinType)
                    setActiveId(turnlateList[i].id)
                    setTimeout(() => {
                        turnData.refetch()
                    }, 100)
                } else if (turnlateList[i].joinType === 2) {
                    useButtonStates.setState({ turnLateType: turnlateList[i].joinType });
                    useButtonStates.setState({ turnButton: turnlateList[i].joinType });
                    setTypes(turnlateList[i].joinType)
                    setActiveId(turnlateList[i].id)
                    setTimeout(() => {
                        turnData.refetch()
                    }, 100)
                } else if (turnlateList[i].joinType === 1) {
                    useButtonStates.setState({ turnLateType: turnlateList[i].joinType });
                    useButtonStates.setState({ turnButton: turnlateList[i].joinType });
                    setTypes(turnlateList[i].joinType)
                    setActiveId(turnlateList[i].id)
                    setTimeout(() => {
                        turnData.refetch()
                    }, 100)
                }
            }
        }
    }, [])

    function getTab(index: any) {
        switch (index) {
            case 0:
                return <TurnTableInstruction />;
            case 1:
                return <TurnTableDailyWin />;
            default:
                return <TurnTableInstruction />;
        }
    }

    const degree = [
        { index: 0, value: "0" },
        { index: 1, value: "39" },
        { index: 2, value: "80" },
        { index: 3, value: "120" },
        { index: 4, value: "159" },
        { index: 5, value: "200" },
        { index: 6, value: "240" },
        { index: 7, value: "281" },
        { index: 8, value: "320" },
    ]
    const degree2 = [
        { index: 0, value: "1" },
        { index: 1, value: "45" },
        { index: 2, value: "90" },
        { index: 3, value: "135" },
        { index: 4, value: "180" },
        { index: 5, value: "225" },
        { index: 6, value: "270" },
        { index: 7, value: "315.5" },
    ]
    const degree3 = [
        { index: 0, value: "0" },
        { index: 1, value: "51" },
        { index: 2, value: "103" },
        { index: 3, value: "154" },
        { index: 4, value: "206" },
        { index: 5, value: "257" },
        { index: 6, value: "309" },
    ]
    const degree4 = [
        { index: 0, value: "0" },
        { index: 1, value: "60" },
        { index: 2, value: "120" },
        { index: 3, value: "180" },
        { index: 4, value: "240" },
        { index: 5, value: "300" },
    ]
    const degree5 = [
        { index: 0, value: "0" },
        { index: 1, value: "36" },
        { index: 2, value: "72" },
        { index: 3, value: "108" },
        { index: 4, value: "144" },
        { index: 5, value: "179" },
        { index: 6, value: "215" },
        { index: 7, value: "251" },
        { index: 8, value: "288" },
        { index: 9, value: "324" },
    ]

    const turnTableData = useGetTurnTableRecord();

    useEffect(() => {
        turnTableData.refetch();
        getPrizes.refetch();
    }, []);

    return (
        <>
            <MainLayout>
                <section>
                    <TurnModal
                        alertMode="alertDefault"
                        alertTitle={titlePrize}
                        openAlert={alert}
                        closeAlert={closeAlert}
                        alertContent={prize}
                        imagePrize={imagePrize}
                    />
                    <EvenHeader>{t("ts1038", { ns: "ts" })}</EvenHeader>
                    <div className="turnTableMainContainer" style={{ backgroundColor: color.backGorund }}>
                        <div className="headerTurnBox">
                            {types === 3 &&
                                <>
                                    <div className="boxLabel">
                                        <span className="labelLabel">{t("ts1039", { ns: "ts" })}</span>
                                        <span className="labelLabel labelLabelContent">{turnlateData?.userScore}</span>
                                        <Link to="/point-redemption" className="labelLabel labelLabelDetail">
                                            {t("ts561", { ns: "ts" })}
                                        </Link>
                                    </div>
                                    {turnlateList.code !== "ERR_BAD_RESPONSE" && turnlateList?.filter((turnSelector: any) => turnSelector?.joinType === 3)?.map((value: any, index: any) =>
                                        <div className="boxLabel" key={index}>
                                            <span className="labelLabel">{t("ts1208", { ns: "ts" })}</span>
                                            <span className="labelLabel labelLabelContent">{value?.score}</span>
                                            <span className="labelLabel">{t("ts1209", { ns: "ts" })}</span>
                                        </div>
                                    )}
                                </>
                            }
                            {types === 2 && turnlateList.code !== "ERR_BAD_RESPONSE" && turnlateList?.filter((turnSelector: any) => turnSelector?.joinType === 2)?.map((value: any, index: any) =>
                                <div className="boxLabel" key={index}>
                                    <span className="labelLabel">{t("ts1210", { ns: "ts" })}</span>
                                    <span className="labelLabel labelLabelContent">{JSON.parse(value?.playConfig)[0]?.minNum}</span>
                                    <span className="labelLabel">{t("ts1212", { ns: "ts" })}</span>
                                    <span className="labelLabel labelLabelContent">{JSON.parse(value?.playConfig)[0]?.playNum}</span>
                                    <span className="labelLabel">{t("ts1213", { ns: "ts" })}</span>
                                </div>
                            )}
                            {types === 1 && turnlateList.code !== "ERR_BAD_RESPONSE" && turnlateList?.filter((turnSelector: any) => turnSelector?.joinType === 1)?.map((value: any, index: any) =>
                                <div className="boxLabel" key={index}>
                                    <span className="labelLabel">{t("ts1211", { ns: "ts" })}</span>
                                    <span className="labelLabel labelLabelContent">{JSON.parse(value?.playConfig)[0]?.minNum}</span>
                                    <span className="labelLabel">{t("ts1212", { ns: "ts" })}</span>
                                    <span className="labelLabel labelLabelContent">{JSON.parse(value?.playConfig)[0]?.playNum}</span>
                                    <span className="labelLabel">{t("ts1213", { ns: "ts" })}</span>
                                </div>
                            )}

                        </div>
                        <div className="turnTableBoxContainers">
                            <div className="turnTableMainBox" style={{ backgroundColor: color.third }}>
                                <div className="turnTableSelector">
                                    {turnlateList.code !== "ERR_BAD_RESPONSE" && turnlateList?.filter((turnSelector: any) => turnSelector.joinType !== 5)?.sort((a: any, b: any) => a.joinType < b.joinType ? 1 : -1)?.map((value: any, index: any) =>
                                        <div key={index} className={buttonStates == value.joinType ? "selectTor active" + value.joinType : "selectTor"}
                                            onClick={buttonState == true ? () => setTurnType(value.joinType, value.id) : void (0)}
                                            style={buttonState == true ? { cursor: "pointer" } : { cursor: "no-drop" }}
                                        >
                                            <span className="selectTitle" style={buttonStates == value.joinType ? { color: "#fff" } : { color: color.text4 }}>
                                                {/* {t("ts1047", { ns: "ts" })} */}
                                                {value.name}
                                            </span>
                                            {/* <span className="selectLabel">
                                                {value.score} {t("ts1046", { ns: "ts" })}
                                            </span> */}
                                        </div>
                                    )}
                                </div>
                                <div className="turnTableTurningTable">
                                    <div className={rotateActive == true ? "transFormRotateFrame active" : "transFormRotateFrame"} style={{ transform: "rotate(" + rotate + "deg)", animationDuration: animationDuration + "s", }}>
                                        {turnlateData?.awardsName !== undefined && JSON.parse(turnlateData?.awardsName)?.length > 10 ? turnlateData?.awardsName !== undefined && JSON.parse(turnlateData?.awardsName).slice(0, 10).map(
                                            (value: any, index: any) => (
                                                <div key={index} className="turnTableMainFrameContainer" style={
                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length > 10 ? { transform: "rotate(" + degree[index].value + "deg)" } : { transform: "rotate(" + degree[index].value + "deg)" }
                                                }>
                                                    <span>
                                                        <span>{value}</span>
                                                    </span>
                                                    <img src="/turnlateImages/img_zphdjp_s1.png" alt="." />
                                                </div>
                                            )
                                        ) :
                                            turnlateData?.awardsName !== undefined && JSON.parse(turnlateData?.awardsName).map(
                                                (value: any, index: any) => (
                                                    <div key={index} className="turnTableMainFrameContainer" style={
                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 10 ? { transform: "rotate(" + degree5[index].value + "deg)" } :
                                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 9 ? { transform: "rotate(" + degree[index].value + "deg)" } :
                                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 8 ? { transform: "rotate(" + degree2[index].value + "deg)" } :
                                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 7 ? { transform: "rotate(" + degree3[index].value + "deg)" } :
                                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 6 ? { transform: "rotate(" + degree4[index].value + "deg)" } : { transform: "rotate(" + degree[index].value + "deg)" }
                                                    }>
                                                        <span>
                                                            <span>{value}</span>
                                                        </span>
                                                        <img src="/turnlateImages/img_zphdjp_s1.png" alt="." />
                                                    </div>
                                                )
                                            )
                                        }
                                        <img className="turnTableMainFrame" src={
                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 10 ? "/turnlateImages/img_s" + buttonStates + "_10.png" :
                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 9 ? "/turnlateImages/img_s" + buttonStates + "_9.png" :
                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 8 ? "/turnlateImages/img_s" + buttonStates + "_8.png" :
                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 7 ? "/turnlateImages/img_s" + buttonStates + "_7.png" :
                                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 6 ? "/turnlateImages/img_s" + buttonStates + "_6.png" : "/turnlateImages/img_s" + buttonStates + "_10.png"}
                                            style={
                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 10 ? { transform: "rotate(0deg)" } :
                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 9 ? { transform: "rotate(10deg)" } :
                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 8 ? { transform: "rotate(23deg)" } :
                                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 7 ? { transform: "rotate(38.5deg)" } :
                                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 6 ? { transform: "rotate(0deg)" } : { transform: "rotate(0deg)" }
                                            }
                                            alt="T" />
                                    </div>
                                    <img className="turnTableMainEye" src={
                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 10 ? "/turnlateImages/img_eye" + buttonStates + "_10.png" :
                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 9 ? "/turnlateImages/img_eye" + buttonStates + "_9.png" :
                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 8 ? "/turnlateImages/img_eye" + buttonStates + "_8.png" :
                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 7 ? "/turnlateImages/img_eye" + buttonStates + "_7.png" :
                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 6 ? "/turnlateImages/img_eye" + buttonStates + "_6.png" : "/turnlateImages/img_eye" + buttonStates + "_10.png"} alt="T" />

                                    <div className="spinButtonBox" style={buttonState == true ? { cursor: "pointer" } : { cursor: "no-drop" }} onClick={buttonState == true ? () => spinPrize(activeId) : dontSpinPrize}>
                                        <img className="turnTableMainButton" style={buttonState == true ? { cursor: "pointer" } : { cursor: "no-drop" }} src={"/turnlateImages/zphd_ljcj_s" + buttonStates + ".png"} />
                                        <span className="buttonLabelSpin" style={buttonState == true ? { cursor: "pointer" } : { cursor: "no-drop" }}>
                                            {t("ts1049", { ns: "ts" })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="turnTableTable" style={{ backgroundColor: color.third }}>
                                <TabContainer>
                                    <TabItem className={value === 0 ? "active" : ""} index={0}>
                                        {t("ts1050", { ns: "ts" })}
                                    </TabItem>
                                    <TabItem className={value === 1 ? "active" : ""} index={1}>
                                        {t("ts1051", { ns: "ts" })}{" "}
                                    </TabItem>
                                </TabContainer>
                                <div>{getTab(value)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="turnTableInstructionContainer" style={{ backgroundColor: color.backGorund }}>
                        <div className="titleBox">
                            <span className="turnTitle">{t("ts1059", { ns: "ts" })}(UTC-3):</span>
                            <div className="turnTableInstructionTitle">
                                <span className="turnTitle">
                                    {turnlateData?.activeStartTime} - {turnlateData?.activeEndTime}
                                </span>
                            </div>
                        </div>
                        <div className="instructionContent">
                            <span className="turnTitle">{t("ts1052", { ns: "ts" })}</span>
                            <div className="instructionContentContent">
                                {/* <div dangerouslySetInnerHTML={{ __html: turnlateData?.tlNotice[0].content }} /> */}
                                {turnlateData?.activeHelp}
                                {/* {t("ts1053", { ns: "ts" })} <br />
                                {t("ts1054", { ns: "ts" })} <br />
                                {t("ts1055", { ns: "ts" })} <br />
                                {t("ts1056", { ns: "ts" })} <br />
                                {t("ts1057", { ns: "ts" })} <br />
                                {t("ts1058", { ns: "ts" })} <br /> */}
                            </div>
                        </div>
                    </div>
                    <div className="allDetailsContainer">
                        <div
                            className="allAct"
                            style={{ backgroundColor: "#313843" }}
                        ></div>
                        <div className="spanLabel">
                            <span style={{ color: "#adb6c3" }}>
                                {t("ts813", { ns: "ts" })}
                            </span>
                        </div>
                        <div
                            className="allAct"
                            style={{ backgroundColor: "#313843" }}
                        ></div>
                    </div>
                    <div className="turnTableEventContainer">
                        <div>
                            <img className="left" src="/images/arrow-left.png" alt="" />
                        </div>
                        <ScrollContainer className="turnEvent">
                            {eventDetails.isLoading == false &&
                                eventDetailsAll?.data?.data.map((item: any, index: any) => (
                                    <div className="fitContainer">
                                        <div
                                            key={index}
                                            className="imgCOntianerTurnTable"
                                            onClick={() => getEventDetails(item.id)}
                                        >
                                            <img className="eventImages" src={item.titleImg} alt="" />
                                        </div>
                                    </div>
                                ))}
                        </ScrollContainer>
                        <div>
                            <img className="right" src="/images/arrow-left.png" alt="" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
}
