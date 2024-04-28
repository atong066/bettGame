import { useEffect, useState } from "react";
import { ChangeColorPallte, SetNewBalance, useBalance } from "../../globalFunctions/globalContext";
import MainLayout from "../../layout";
import './recharge.css'
import axios from "axios";
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { ToastrPngk } from "../../globalFunctions/toastr";
// import { useGetUserInfo } from "../../hooks/getUserInfoHook";
function UnlockPrize(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const unlockData = props.dataPrize
    const userInfo = useBalance()

    function getUnlockType(value: any) {
        switch (value) {
            case 1:
                return t("ts694", { ns: "ts" })
            case 2:
                return t("ts695", { ns: "ts" })
            case 3:
                return t("ts696", { ns: "ts" })
            case 4:
                return t("ts697", { ns: "ts" })
        }
    }

    const receiveButton = { color: color.text2, backgroundColor: color.forGround, borderRadius: 50 }
    const inProgressButton = { color: color.text2, backgroundColor: color.third, borderRadius: 50, cursor: "pointer" }
    const receiveAgainButton = { color: color.text2, backgroundColor: color.forGround, borderRadius: 50 }

    function getUnlockStatus(status: any) {
        switch (status) {
            case 1:
                return t("ts698", { ns: "ts" })
            case 2:
                return t("ts699", { ns: "ts" })
            case 3:
                return t("ts700", { ns: "ts" })
            case 4:
                return t("ts701", { ns: "ts" })
        }
    }
    function timestampToTime(timestamp: any, days: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + parseInt(days)) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D + h + m + s;
        return strDate;
    }

    async function unloCkuprize(value: any, taskMony: any) {

        try {
            const response = await axios.post("/startUnlockTask.do", {
                taskId: value
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            if (response.data.success == true) {
                ToastrPngk({ msg: response.data.msg, type: "success", id: "0050" })
                props.unlock()
            }
            else {
                ToastrPngk({ msg: response.data.msg, type: "error", id: "0050" })
                props.unlock()
            }
        } catch (e) {

        }

    }
    const progress = { backgroundColor: color.forGround, width: (100 * unlockData.unlockedMoney) / unlockData.completeTaskMoney + "%" }
    const noProgress = { backgroundColor: color.text }

    useEffect(() => {

    }, [receiveButton, inProgressButton, receiveAgainButton, progress, noProgress, unlockData, props])

    return (
        <>
            <div className="prizeCard" style={{ backgroundColor: color.backGorund }}>
                <div className="titleContainer">
                    <div className="title">{getUnlockType(unlockData.unlockType)}</div>
                    <div className="time" style={{ color: "#91a4c8" }}>
                        {t("ts702", { ns: "ts" })}: {unlockData.days ? timestampToTime(unlockData.updateDatetime, unlockData.days)
                            : t("ts705", { ns: "ts" })}
                    </div>
                </div>
                <div className="progressCount" style={{ backgroundColor: color.third }}>
                    <div className="unclock">
                        <div className="label" style={{ color: "#ffffff99", fontSize: 14 }}>{t("ts703", { ns: "ts" })}</div>
                        <div className="redeem"><img src="/images/bonus-icon.png" alt="" />
                            <span style={{ color: color.text }}>{unlockData.totalUnlockGift}</span>
                        </div>
                    </div>
                    <div className="progressBarContainer">
                        <div className="label" style={{ color: "#ffffff99", fontSize: 14 }}>{t("ts704", { ns: "ts" })}</div>
                        <div className="progressbar" style={{ borderRadius: 50 }}>
                            <div className="progressBarLoader" style={unlockData.unlockedMoney <= 0 ? noProgress : progress}></div>
                            <span>{unlockData.unlockedMoney}/{unlockData.completeTaskMoney}</span>
                        </div>
                    </div>
                </div>
                <div className="unlockDescription" style={{ color: "#2283f6", fontSize: 15 }}>
                    {unlockData.taskDesc}
                </div>
                <div className="recieveAction">
                    <Button sx={{
                        "&:disabled": {
                            cursor: "not-allowed !important",
                            pointerEvents: "all !important",
                        },
                    }} disabled={unlockData.status == 2 ? true : false} style={unlockData.status == 1 ? receiveButton : unlockData.status == 2 ? inProgressButton : receiveAgainButton} onClick={() => unloCkuprize(unlockData.id, unlockData.completeTaskMoney)}>{getUnlockStatus(unlockData.status)}</Button>
                </div>
            </div>
        </>
    )
}

function Recharge(props: any) {
    const [promosDet, setPromosdet] = useState<any>()
    // const getUserData = useGetUserInfo()
    const userData = useBalance()
    useEffect(() => {
        getPromo()
    }, [])

    async function getPromo() {
        const response = await axios.get("/userCenter/getUnlockGiftTasks.do", {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (response.data.success == false) {
            ToastrPngk({ msg: response.data.msg, type: "error", id: "0050" })
        }
        else {
            // getUserData.refetch()
            setPromosdet(response.data)
            ToastrPngk({ msg: response.data.msg, type: "success", id: "0050" })
        }

    }

    return (
        <>
            <MainLayout>
                <section className="rechargeMainContainer mainEvent">
                    <div className="banner">
                        <img src="/images/rechargeBanner.png" alt="" />
                    </div>
                    <div className="prizeContianer">
                        {promosDet?.map((item: any, index: any) =>
                            <UnlockPrize unlock={getPromo} key={index} dataPrize={item}></UnlockPrize>
                        )}
                    </div>
                </section>
            </MainLayout>
        </>
    )
}
export default Recharge;