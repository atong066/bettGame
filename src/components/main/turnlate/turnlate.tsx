import axios from 'axios'
import './turnlate.css'
import Modal from '@mui/material/Modal'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';
import { Dialog } from '@mui/material';
import { ToastrPngk } from '../../globalFunctions/toastr';
import AlertModal from '../common/modal/alert-modal/alert-modal';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import './signModal.css'
import NoData from '../../noData/no-data';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetTurnlateData } from '../../hooks/getUserInfoHook';
import TurnModal from '../common/modal/turnlate-modal/alert-modal';
import { useGlobalVariables } from '../../globalFunctions/store';

export default function TurnLate(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    var canvasRef = useRef<HTMLCanvasElement | null>(null)

    const getUserInfo = useGlobalVariables(state => state.userDetails)
    const userState = getUserInfo?.isLogin

    const turnlateData = useGlobalVariables(state => state.turnlate)

    const [colors, setColors] = useState<any>()
    const [awards, setAwards] = useState<any>()
    const [activeId, setActiveId] = useState<any>(turnlateData?.activeId)
    const [alert, setAlert] = useState(false)

    const [rotate, setRotate] = useState(0)
    const [rotateActive, setRotateActive] = useState(false)
    const [animationDuration, setAnimationDuration] = useState(0)
    const [buttonState, setButtonState] = useState(true)

    const [speakerMute, setSpeackerMute] = useState(false)

    const [prize, setPrize] = useState()

    const [prizeList, setPrizeList] = useState([])
    const [openPrizeList, setOpenPrizeList] = useState(false)
    const [openRuleList, setOpenRuleList] = useState(false)
    const [controlIndez, setControlIndex] = useState(3)
    const [isData, setIsData] = useState(false)

    const openAlert = () => {
        setAlert(true)
    }
    const closeAlert = () => {
        setAlert(false)
    }
    const changeSpeaker = () => {
        setSpeackerMute(!speakerMute)
    }
    const openPrizeModal = () => {
        getWonPrizes()
        setOpenPrizeList(true)
        setControlIndex(1)
    }
    const closePrizeModal = () => {
        setOpenPrizeList(false)
        setTimeout(() => {
            setControlIndex(3)
        }, 1000)
    }
    const closeRuleModal = () => {
        setOpenRuleList(false)
        setTimeout(() => {
            setControlIndex(3)
        }, 1000)
    }
    const openRuleModal = () => {
        setOpenRuleList(true)
        setControlIndex(1)
    }

    const [imagePrize, setImagePrize] = useState("")
    const [titlePrize, setTitle] = useState("")

    async function turnMain(prizeId: any) {
        try {
            const response = await axios.get('/userTurnlate/award.do', {
                params: {
                    activeId: prizeId
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            if (response.data.success == false) {
                ToastrPngk({ msg: response.data.msg, type: "error", id: "turn01" })
            } else {
                if (response.data.index) {
                    rotateFn(response.data.index, JSON.parse(turnlateData?.awardsName)[response.data.index - 1]);
                    setPrize(response.data.awardName)
                    console.log(response.data)
                    if (JSON.parse(turnlateData?.awardsName)[response.data.index - 1] == turnlateData?.awardsNameOther) {
                        setImagePrize("empty-bag.png")
                        setTitle("ts961")
                    } else {
                        setImagePrize("gold-bag.png")
                        setTitle("ts962")
                    }
                    setButtonState(false)
                } else {
                    ToastrPngk({ msg: response.data.msg, type: "error", id: "turn01" })
                }
            }
        } catch (error) {
            ToastrPngk({ msg: error, type: "error", id: "turn01" })
        }
    }

    var rotateFn = function (item: any, text: any) {
        var angles = item * (360 / JSON.parse(turnlateData?.awardsName)?.length) - (360 / (JSON.parse(turnlateData?.awardsName)?.length * 2)) - 5400
        if (angles < 270) {
            angles = 270 - angles;
        } else {
            angles = 360 - angles + 270;
        }
        setRotate(angles)
        setRotateActive(true)
        setAnimationDuration(7)
        setTimeout(() => {
            setRotateActive(false)
            openAlert()
            setButtonState(true)
        }, 7000)
    }

    async function getWonPrizes() {
        try {
            const response = await axios.get('userTurnlate/turnlateRecordList.do', {
                params: {
                    activeId: activeId
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            if (response.data.success != false) {
                if (response.data != '') {
                    setPrizeList(response.data)
                    setIsData(true)
                } else {
                    setIsData(false)
                }
            } else {
                setIsData(false)
            }
        } catch (error) {

        }
    }

    const spinPrize = (activeId: any) => {
        turnMain(activeId)
    }
    const dontSpinPrize = () => {
        ToastrPngk({ msg: t("ts800", { ns: "ts" }), type: "warning", id: "turn01" })
    }

    function drawRouletteWheel(canvas: any) {
        let num
        if (turnlateData?.awardsName != undefined) {
            num = JSON.parse(turnlateData?.awardsName)?.length
        } else {
            num = 0
        }
        var width = 207
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            var arc = Math.PI / (num / 2);
            ctx.clearRect(0, 0, width * 2, width * 2);
            ctx.strokeStyle = "#ffffff";
            ctx.font = '22px Microsoft YaHei';
            for (let i = 0; i < num; i++) {
                let angle = 0 + i * arc;
                ctx.save();
                ctx.fillStyle = JSON.parse(turnlateData?.awardsColor)[i];
                ctx.beginPath();
                ctx.arc(width, width, 205, angle, angle + arc, false);
                ctx.arc(width, width, 0, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.save();
                ctx.fillStyle = "#000";
                ctx.border = "none";
                let text = JSON.parse(turnlateData?.awardsName)[i];
                ctx.translate(
                    width + Math.cos(angle + arc / 2) * (width - 90),
                    width + Math.sin(angle + arc / 2) * (width - 90)
                );
                ctx.rotate(angle + arc / 2 + Math.PI / 180);
                ctx.fillText(text, -ctx.measureText(text).width / 2, 10);
                ctx.restore();
            }
        }
    }

    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D + h + m + s;
        return strDate;
    }

    useEffect(() => {
        if (userState == true) {
            setActiveId(turnlateData?.activeId)
            const timer = setTimeout(() => {
                drawRouletteWheel(canvasRef?.current)
            }, 100)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [canvasRef?.current, userState, turnlateData, props, speakerMute])

    return (
        <>
            <React.Fragment>
                <Dialog
                    open={props.openTurn}
                    sx={{
                        " .MuiDialog-paper": {
                            maxWidth: "max-content !important",
                            background: "transparent !important",
                            overflow: "hidden !important"
                        }
                    }}
                >
                    <section>
                        <TurnModal
                            alertMode="alertDefault"
                            alertTitle={titlePrize}
                            openAlert={alert}
                            closeAlert={closeAlert}
                            alertContent={prize}
                            imagePrize={imagePrize}
                        />
                        <div className="turnWheelMainContainer">
                            <div className="turnBackGround">
                                <div className="backBox">
                                    <img alt="." src="/turnlateImages/wheelbg.png" className="wheelBack" />
                                </div>
                                <div className="controlBox" style={{ zIndex: controlIndez }}>
                                    <img className='controlIcons' onClick={buttonState == true ? props.closeTurn : dontSpinPrize} alt="." src="/turnlateImages/zp-close.png" />
                                    <img className='controlIcons' onClick={changeSpeaker} alt="." src={speakerMute == true ? "/turnlateImages/zp-notice-cancel.png" : "/turnlateImages/zp-notice.png"} />
                                    <img className='controlIcons' onClick={openRuleModal} alt="." src="/turnlateImages/rule.png" />
                                </div>
                                <div className="titleHead">
                                    <img className="titleHeadImage" alt="." src="/turnlateImages/wheeltop.png" />
                                    <div className="contentLabel contentLabelWin">
                                        <strong><em className="content contentWin">{t("ts1037", { ns: "ts" })}</em></strong>
                                    </div>
                                    <div className="contentLabel">
                                        <strong><em className="content numberTitleContent">₱58,000,819.50</em></strong>
                                    </div>
                                </div>
                                <div className="manBox">
                                    <img className="manImage" alt="." src="/turnlateImages/person.png" />
                                </div>
                                <div className="contentBox">
                                    <img className="contentImage" alt="." src="/turnlateImages/acBtnBg.png" />
                                    <div className="contentLabel">
                                        <em className="content">{turnlateData?.userMoney}</em>
                                        <em className="content"> / </em>
                                        <em className="content">{turnlateData?.userScore}</em>
                                    </div>
                                    <div className="circleContent">
                                        <img className="circleImage" src="turnlateImages/circle.png" alt="." />
                                        <span className="circleValue">{turnlateData?.awardsScore}</span>
                                    </div>

                                </div>
                                <div className="viewList" style={{ zIndex: controlIndez }}>
                                    <div onClick={buttonState == true ? (openPrizeModal) : (dontSpinPrize)} className="winPointer"><label className="viewListLabel">Recent win</label> <ArrowForwardIosIcon className="winArrow" /></div>
                                </div>
                                <div className="turnLateSpinContainerMain">
                                    <div className="turnLateSpinContainer">
                                        <img className="turnLateSpinners" alt="." src="/turnlateImages/circle-bg-min.png" />
                                        <img style={buttonState == true ? { cursor: "pointer" } : { cursor: "no-drop" }} onClick={buttonState == true ? (() => spinPrize(activeId)) : (dontSpinPrize)} className="markers spinButton" alt="spin" src="/turnlateImages/rollCenter.png" />
                                        <img className="turnLateSpinners turnLateSpinnersWhite" alt="." src="/turnlateImages/circle-frame-min.png" />
                                        <div className={rotateActive == true ? "canvasContainer active" : "canvasContainer"} style={{ transform: "rotate(" + rotate + "deg)", animationDuration: animationDuration + "s" }}>
                                            <canvas ref={canvasRef} className="item itemCanvas" width="414px" height="414px" style={{ width: "100%" }}></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="markerContainer">
                                    <img className="marker markerPoint" src="/turnlateImages/marker.png" />
                                </div>
                                <div className="recentWinMainContainer">
                                    <div className="content_wheelContainer__MsFo0001" style={{ position: "relative" }}>

                                    </div>
                                    <div className="recentWinTable_wrapper__8SgCV001">
                                        <div className={openPrizeList == true ? "recentWinTable_recentWinTable__emtwa001 recentWinTable_show__xqKdX001" : "recentWinTable_recentWinTable__emtwa001"}>
                                            <div className="recentWinTable_head__Lyyzm001">
                                                <img onClick={closePrizeModal} alt="close" src="/turnlateImages/zp-close.png" className="recentWinTable_closeButton__3iRQE001" />
                                                <h3 className="recentWinTable_title__f0948001">{t("ts891", { ns: "ts" })}</h3>
                                            </div>
                                            <div className="recentWinTable_tab__VhNsy001">
                                                <div className="recentWinTable_tabItem__J001+frb recentWinTable_active__69IcX" style={{ color: "#fff" }}>{t("ts887", { ns: "ts" })}</div>
                                            </div>
                                            <div className="recentWinTable_table__DWiFQ001">
                                                <div className="recentWinTable_row__nn7B2001">
                                                    <div className="recentWinTable_col001_head__sdjL2001 ">{t("ts888", { ns: "ts" })}</div>
                                                    <div className="recentWinTable_col001_head__sdjL2001 ">{t("ts889", { ns: "ts" })}</div>
                                                    <div className="recentWinTable_col001_head__sdjL2001 ">{t("ts890", { ns: "ts" })}</div>
                                                </div>
                                                <div className="recentWinTable_table__DWiFQ001 scroll" style={{ maxHeight: '415px' }}>
                                                    {isData == true && prizeList?.map((value: any, index: any) =>
                                                        <div key={index} className="recentWinTable_row__nn7B2001">
                                                            <div className="recentWinTable_col001" style={{ color: "#fff !important" }}>{timestampToTime(value.createDatetime)}</div>
                                                            <div className="recentWinTable_col001" style={{ color: "#fff !important" }}>{value.username}</div>
                                                            <div className="recentWinTable_col001" style={{ color: "#fff !important" }}>{value.giftName}</div>
                                                        </div>
                                                    )}
                                                    {isData != true && <NoData padding={"1rem 0 0 0"}></NoData>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rule_wrapper__kVfHQ001">
                                        <div className={openRuleList == true ? "rule_ruleContent__qBU0C001 rule_show__DE2" : "rule_ruleContent__qBU0C001"}>
                                            <div className="rule_head__bYY63001">
                                                <img onClick={closeRuleModal} className="rule_closeButton__ZF4Nj001" alt="close" src="/turnlateImages/zp-close.png" />
                                                <h3 className="rule_title__6pSjK001 " >{t("ts892", { ns: "ts" })}</h3>
                                            </div>
                                            <div className="rule_content__PwJvC001">
                                                <div className="rule_ScrollboxContainer__T6bnr001">
                                                    <div className="rule_father__LnAaM1001">
                                                        <span>{turnlateData?.activeHelp}</span>
                                                    </div>
                                                    <div className="rule_verticalScroll__Q91lm001">
                                                        <div className="rule_rail__cPJQq001"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Dialog>
            </React.Fragment>
        </>
    )
}