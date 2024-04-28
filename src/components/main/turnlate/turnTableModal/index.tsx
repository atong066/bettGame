import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useAlertStates, useButtonStates, useGlobalVariables, useModalStates, useTurnModalData, userRegstore } from "../../../globalFunctions/store";
import { TabContainer, TabItem } from "../../common/components/tabComponent";
import TurnTableInstruction from "../components/turnTableInstruction";
import TurnTableDailyWin from "../components/turnTableDailyWin";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useGetTurnTablePrize, useGetTurnTableRecord, useGetTurnlateDataType5, useNomV3 } from "../../../hooks/getUserInfoHook";
import Cookies from "universal-cookie";
import axios from "axios";
import './turnTableType5.css'
import TurnTableTableType5 from "./compontents/turnTableTableType5";
import TurnTablePrizes from "./compontents/turnTablePrizes";
import ShareIcon from '@mui/icons-material/Share';
import ShareDialog from "./compontents/shareInviteModal";
import RetirarDialog from "./compontents/retirarModal";
import { NoDataV2, NoDataV3 } from "../../../noData/no-data";
import CountDown from "./compontents/countdown";
import { useLocation } from "react-router-dom";

export default function HomeTurnTable() {
    const { t } = useTranslation(["main"]);
    const color = ChangeColorPallte()

    const turnlateDataType5 = useGetTurnlateDataType5()
    const turnlateData = useGlobalVariables(state => state.turnlateType5)

    const turnLateModalState = useGlobalVariables(state => state.turnLateModal)
    const activeId = turnlateData?.activeId

    const stationConfig = useGlobalVariables(state => state.stationConfig)

    // const newTurnCount = 10 - (turnlateData?.awardsName ? JSON.parse(turnlateData?.awardsName)?.length : 0)
    // const turnCount = JSON.parse(turnlateData?.awardsName ? turnlateData?.awardsName : 0)?.length + newTurnCount

    const getPrizes = useGetTurnTablePrize()
    const invite = useNomV3()

    const [rotate, setRotate] = useState(0)
    const [rotateActive, setRotateActive] = useState(false)
    const [animationDuration, setAnimationDuration] = useState(0)

    // const [buttonState, setButtonState] = useState(true)
    // const [turnState, setTurnState] = useState(false)

    const buttonState = useButtonStates(state => state.turnLateButton)
    const turnState = useButtonStates(state => state.turnLateMain)

    const [awardValue, setAwardValue] = useState(0)
    const [currentAwardValue, setCurrentAward] = useState(0)

    // const [win, setWin] = useState(false)

    const valueDeducted = (awardValue - currentAwardValue)
    // const totalValue = (awardValue - currentAwardValue) * 100 / 100

    async function turnMain(prizeId: any) {
        try {
            useButtonStates.setState({ turnLateButton: false })
            const response = await axios.get('/userTurnlate/awardForPingduoduo2.do', {
                params: {
                    activeId: prizeId
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            if (response.data.success == false) {
                useButtonStates.setState({ turnLateButton: true })
                useButtonStates.setState({ turnLateMain: false })
                // ToastrPngk({ msg: response.data.msg, type: "error", id: "turn01" })
                dontSpinPrize(response.data.msg)
            } else {
                if (response.data.index) {
                    useButtonStates.setState({ turnLateButton: false })
                    rotateFn(response.data.index, JSON.parse(turnlateData?.awardsName)[response.data.index - 1], response.data.isWin, response.data.awardValue, response.data.currentAwardValue);
                    if (JSON.parse(turnlateData?.awardsName)[response.data.index - 1] == turnlateData?.awardsNameOther) {
                        useButtonStates.setState({ turnLateButton: true })
                        useButtonStates.setState({ turnLateMain: false })
                    }
                } else {
                    ToastrPngk({ msg: response.data.msg, type: "error", id: "turn01" })
                }
            }

        } catch (error) {
            useButtonStates.setState({ turnLateButton: true })
            ToastrPngk({ msg: error, type: "error", id: "turn01" })
        }
    }

    var rotateFn = function (item: any, text: any, isWin: any, awardValue: any, currentAwardValue: any) {
        useButtonStates.setState({ turnLateButton: false })
        var angles = item * (360 / JSON.parse(turnlateData?.awardsName)?.length) - (360 / (JSON.parse(turnlateData?.awardsName)?.length * 2)) - 5400
        if (angles < 360) {
            angles = 360 - angles;
        } else {
            angles = 360 - angles + 360;
        }
        JSON.parse(turnlateData?.awardsName)?.length == 9 ? setRotate(angles + 20) :
            JSON.parse(turnlateData?.awardsName)?.length == 8 ? setRotate(angles + 22) :
                JSON.parse(turnlateData?.awardsName)?.length == 7 ? setRotate(angles + 26) :
                    JSON.parse(turnlateData?.awardsName)?.length == 6 ? setRotate(angles + 30) : setRotate(0)

        setRotateActive(true)
        setAnimationDuration(7)
        setTimeout(() => {
            setRotateActive(false)
            getPrizes.refetch()
            turnlateDataType5.refetch()
            // setWin(isWin)
            setAwardValue(awardValue)
            setCurrentAward(currentAwardValue)
            useTurnModalData.setState({ currentValue: currentAwardValue })
            useTurnModalData.setState({ awardValue: awardValue })
            useButtonStates.setState({ turnLateButton: true })
            useButtonStates.setState({ turnLateMain: false })
        }, 7000)
    }

    const spinPrize = (activeId: any) => {
        if (turnState == false) {
            if (userDetail?.isLogin == true) {
                useButtonStates.setState({ turnLateMain: true })
                turnMain(activeId)
                useButtonStates.setState({ turnLateButton: false })
            } else {
                userRegstore.setState({ isOpenRegister: true })
            }
        }
    }

    const dontSpinPrize = (msg: any) => {
        ToastrPngk({ msg: msg, type: "warning", id: "turn01" })
    }

    const buttonStates = useButtonStates(state => state.turnButton)
    const value = useGlobalVariables(state => state.tabIndex2)

    // const setTurnType = (type: any) => {
    //     useButtonStates.setState({ turnButton: type })
    // }

    function getTab(index: any) {
        switch (index) {
            case 0:
                return <TurnTableTableType5 />
            case 1:
                return <TurnTablePrizes />
            default:
                return <TurnTableTableType5 />
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

    const turnTableData = useGetTurnTableRecord()
    const userDetail = useGlobalVariables(state => state.userDetails)

    useEffect(() => {
        turnTableData.refetch()
        if (userDetail?.isLogin == true) {
            getPrizes.refetch()
        }
        if (turnlateData.pddTurnRecord) {
            if (turnlateData.pddTurnRecord.joinFlag === 2) {
                useButtonStates.setState({ turnLateButton: true })
                useButtonStates.setState({ turnLateMain: false })
            }
            // else {
            //     useButtonStates.setState({ turnLateButton: false })
            //     useButtonStates.setState({ turnLateMain: true })
            // }
        }
        else {
            useButtonStates.setState({ turnLateButton: true })
            useButtonStates.setState({ turnLateMain: false })
        }
    }, [])

    function closeTurnLateModal() {
        useGlobalVariables.setState({ turnLateModal: false })
        useGlobalVariables.setState({ turnOncePerDay: false })
        useModalStates.setState({ turnModalLogin: false })
        localStorage.setItem("isModalLog", "false")
    }

    const openShareModal = () => {
        useModalStates.setState({ shareInviteModal: true })
        invite.refetch()
    }

    const openWithdrawModal = () => {
        useModalStates.setState({ withdrawInvite: true })
    }
    const turnModalLog = useModalStates(state => state.turnModalLogin)

    const today = new Date()
    const perDay = useGlobalVariables(state => state.turnOncePerDay)

    useEffect(() => {
        if (turnlateData?.pddStrategy?.popType === 3) {
            if (today.getHours() >= 24) {
                useGlobalVariables.setState({ turnOncePerDay: true })
            } else if (today.getHours() < 24) {
                useGlobalVariables.setState({ turnOncePerDay: false })
            }
        } else {
            useGlobalVariables.setState({ turnOncePerDay: true })
        }
    }, [])

    const sideTurn = useModalStates(state => state.sideTurn)
    const islogModal = localStorage.getItem("isModalLog")

    return (
        <>
            <React.Fragment>
                <Dialog
                    open={turnlateData?.pddStrategy?.popType === 5 ? turnModalLog && islogModal === "true" : ((perDay === false ? false : (turnLateModalState && turnlateData?.pddStrategy?.popType === 2) ||
                        (turnlateData?.pddStrategy?.popType === 5 && turnModalLog) ||
                        (turnLateModalState && stationConfig.pingduoduo_act_switch === true)) ||
                        (turnLateModalState && stationConfig.pingduoduo_act_switch === true && sideTurn === true
                        ))}
                    // open={turnlateData?.pddStrategy?.popType === 1 ? false : false}
                    sx={{
                        height: "100%",
                        maxHeight: "fit-content",
                        " .MuiDialog-paper": {
                            maxWidth: "9.2rem !important",
                            width: "9.2rem !important",
                            backgroundColor: color.backGorund
                        },
                        " .MuiPaper-root": {
                            boxShadow: "none",
                            backgroundColor: color.backGorund
                        },
                        " .MuiPaper-root.MuiPaper-rounded": {
                            borderRadius: ".1rem",
                            // border: "thin solid",
                            // borderColor: "#313843"
                            backgroundColor: color.backGorund
                        },
                        " .MuiDialogContent-root": {
                            padding: "0 .2rem .2rem",
                            backgroundColor: color.backGorund
                        },
                        " .MuiToolbar-root": {
                            height: ".5rem",
                            paddingLeft: ".16rem",
                            paddingRight: ".16rem"
                        },
                        " .MuiTypography-root": {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: ".22rem",
                            columnGap: ".1rem",
                            " .wing": {
                                width: ".3rem"
                            },
                            " .wing2": {
                                width: ".3rem",
                                rotate: "180deg"
                            },
                        }
                    }}
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: color.backGorund }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" align='center' component={'span'}>
                                <img className="wing" src="/turnlateImages/header_wing.png" alt="." />
                                <label className="modalTitle" style={{ color: color.text4, fontSize: ".22rem" }}>
                                    {turnlateData?.pddStrategy ? turnlateData?.pddStrategy?.title : t("ts1060", { ns: "ts" })}
                                </label>
                                <img className="wing wing2" src="/turnlateImages/header_wing.png" alt="." />
                            </Typography>
                            <IconButton
                                edge="start"
                                color="inherit"
                                value="8"
                                onClick={closeTurnLateModal}
                                aria-label="close"
                                className="modalCloseCalendar"
                            >
                                <CloseIcon style={{ color: color.text4, fontSize: ".22rem" }} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <div className="type5TurnTableMainContainer" style={{ backgroundColor: color.backGorund }}>
                            <div className="turnTableBoxContainers">
                                <div className="turnAllTableMain" style={{ backgroundColor: color.third }}>
                                    <div className="turnTableMainBox">
                                        {turnlateData.pddTurnRecord &&
                                            <div className="turnTableSelector">
                                                <div className="progressHeaderContainer">
                                                    <div className="progressHeader">
                                                        <div className="headerContent">
                                                            <img src="/turnlateImages/money_icon.png" alt="." className="moneyIcon" />
                                                            <span className="moneyLabel">{stationConfig.moneyUnit} {turnlateData?.pddTurnRecord ? turnlateData?.pddTurnRecord?.currentAwardValue : (currentAwardValue ? currentAwardValue : 0)}</span>
                                                            <button className="withdrawButton" onClick={openWithdrawModal}>
                                                                <img src="/turnlateImages/coin_icon.png" alt="." className="moneyIconButton" />
                                                                <span className="buttonLabel">{t("ts971", { ns: "ts" })}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="progressBarContainer">
                                                        <div className="percentageBox">
                                                            <span className="percentageLabel">{turnlateData?.pddTurnRecord?.currentAwardValue ? (turnlateData?.pddTurnRecord?.currentAwardValue ? ((turnlateData?.pddTurnRecord?.currentAwardValue * 100) / turnlateData?.pddTurnRecord?.awardValue).toFixed(2) : 0) : (currentAwardValue ? ((currentAwardValue * 100) / awardValue).toFixed(2) : 0)}%</span>
                                                        </div>
                                                        <div className="progressbarBackGround">
                                                            <div className="progressBarForeGround" style={{ width: turnlateData?.pddTurnRecord?.currentAwardValue ? (turnlateData?.pddTurnRecord?.currentAwardValue ? ((turnlateData?.pddTurnRecord?.currentAwardValue * 100) / turnlateData?.pddTurnRecord?.awardValue).toFixed(2) + "%" : 0 + "%") : (currentAwardValue ? ((currentAwardValue * 100) / awardValue).toFixed(2) + "%" : 0 + "%") }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="extraCriteriaContainer">
                                                        <span className="extraLabel" style={{ color: color.text4 }}>{t("ts1061", { ns: "ts" })}</span>
                                                        <div className="moneyBox">
                                                            <img src="/turnlateImages/money_icon.png" alt="." className="moneyIcon" />
                                                            <span className="moneyLabel">{turnlateData?.pddTurnRecord ? (turnlateData?.pddTurnRecord?.awardValue - turnlateData?.pddTurnRecord?.currentAwardValue).toFixed(2) : (valueDeducted ? valueDeducted.toFixed(2) : 0)}</span>
                                                        </div>
                                                        <span className="extraLabel" style={{ color: color.text4 }}>{t("ts1062", { ns: "ts" })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            // :
                                            // <div className="turnTableSelector">
                                            //     <div className="progressHeaderContainer">
                                            //         <span style={{ fontSize: ".18rem", textAlign: "center" }}>{turnlateData?.pddTurnRecord?.remark}</span>
                                            //     </div>
                                            // </div>
                                        }
                                        <div className="turnTableTurningTable">
                                            <div className={rotateActive == true ? "transFormRotateFrame active" : "transFormRotateFrame"} style={{ transform: "rotate(" + rotate + "deg)", animationDuration: animationDuration + "s" }}>
                                                {turnlateData?.awardsName !== undefined && JSON?.parse(turnlateData?.awardsName)?.length > 9 ? turnlateData?.awardsName !== undefined && JSON.parse(turnlateData?.awardsName).slice(0, 9).map(
                                                    (value: any, index: any) => (
                                                        <div key={index} className="turnTableMainFrameContainer" style={
                                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length > 9 ? { transform: "rotate(" + degree[index].value + "deg)" } : { transform: "rotate(" + degree[index].value + "deg)" }
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
                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 9 ? "/turnlateImages/img_s3_9.png" :
                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 8 ? "/turnlateImages/img_s3_8.png" :
                                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 7 ? "/turnlateImages/img_s3_7.png" :
                                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 6 ? "/turnlateImages/img_s3_6.png" : "/turnlateImages/img_s3_9.png"}
                                                    style={
                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 9 ? { transform: "rotate(10deg)" } :
                                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 8 ? { transform: "rotate(23deg)" } :
                                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 7 ? { transform: "rotate(38.5deg)" } :
                                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 6 ? { transform: "rotate(0deg)" } : { transform: "rotate(10deg)" }
                                                    }
                                                    alt="T" />
                                            </div>
                                            <img className="turnTableMainEye" src={
                                                turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 9 ? "/turnlateImages/img_eye3_9.png" :
                                                    turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 8 ? "/turnlateImages/img_eye3_8.png" :
                                                        turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 7 ? "/turnlateImages/img_eye3_7.png" :
                                                            turnlateData?.awardsName && JSON.parse(turnlateData?.awardsName)?.length == 6 ? "/turnlateImages/img_eye3_6.png" : "/turnlateImages/img_eye3_9.png"} alt="T" />

                                            <div className="spinButtonBox" style={(buttonState == true && turnState == false) ? { cursor: "pointer" } : { cursor: "no-drop" }} onClick={(buttonState == true && turnState == false) ? (() => spinPrize(activeId)) : (dontSpinPrize)}>
                                                <img className="turnTableMainButton" style={(buttonState == true && turnState == false) ? { cursor: "pointer" } : { cursor: "no-drop" }} src={"/turnlateImages/zphd_ljcj_s3.png"} alt="T" />
                                                <span className="buttonLabelSpin" style={(buttonState == true && turnState == false) ? { cursor: "pointer" } : { cursor: "no-drop" }}>{t("ts1049", { ns: "ts" })}</span>
                                            </div>
                                        </div>

                                        <div className="shareContainer">
                                            <div className="shareLabelBox">
                                                <CountDown />
                                            </div>
                                            {turnlateData?.pddTurnRecord ?
                                                <div className="shareContentBox" onClick={openShareModal}>
                                                    <span className="shareContentLabel">{t("ts1064", { ns: "ts" })}</span>
                                                    <ShareIcon className="shareIcon" />
                                                </div> : ""
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="turnTableTableMainContainer">
                                    <div className="turnTableTable" style={{ backgroundColor: color.third }}>
                                        <TabContainer style={{ justifyContent: "center" }}>
                                            <TabItem className={value === 0 ? "active" : ""} index={0}>{t("ts1050", { ns: "ts" })}</TabItem>
                                            <TabItem className={value === 1 ? "active" : ""} index={1}>{t("ts1051", { ns: "ts" })}</TabItem>
                                        </TabContainer>
                                        <div>
                                            {getTab(value)}
                                        </div>
                                    </div>
                                    <div className="turnTableTableRegulations" style={{ backgroundColor: color.third }}>
                                        <div className="regulationsHeader">
                                            <span className="regulationTitle">{t("ts138", { ns: "ts" })}</span>
                                        </div>
                                        <div className="regulationsBodyContainer">
                                            <div className="regulationBodyTitleBox">
                                                <span className="regulationBodyTitle">{t("ts1066", { ns: "ts" })}</span>
                                            </div>
                                            <div className="regulationsBody">
                                                <span className="bodyContentsTable" style={{ whiteSpace: "pre-wrap" }}>
                                                    <br />
                                                    {turnlateData?.activeHelp ? turnlateData?.activeHelp : <NoDataV2 />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </React.Fragment >
            <ShareDialog />
            <RetirarDialog />
        </>
    )
}