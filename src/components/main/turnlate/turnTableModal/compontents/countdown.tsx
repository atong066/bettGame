import { useEffect, useState } from "react";
import { useGlobalVariables } from "../../../../globalFunctions/store";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";

export default function CountDown() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const turnlateData = useGlobalVariables(state => state.turnlateType5)
    const countDownDate = new Date(turnlateData?.activeEndTime).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    const newDay = days > 0 ? days : "00"
    const newMinute = minutes > 0 ? (minutes >= 0 && minutes <= 9 ? "0" + minutes : minutes) : "00"
    const newHour = hours > 0 ? (hours >= 0 && hours <= 9 ? "0" + hours : hours) : "00"
    const newSecond = seconds > 0 ? (seconds >= 0 && seconds <= 9 ? "0" + seconds : seconds) : "00"

    const eventDateEnd = new Date(turnlateData?.activeEndTime).getTime()
    const eventDateStart = new Date(turnlateData?.activeStartTime).getTime()
    const dateToday = new Date().getTime()

    return (
        <>
            {eventDateStart > dateToday ?
                <div className="timerMainContainer">
                    <div className="timerContainer">
                        <span style={{ fontSize: ".18rem", color: "#fff", textAlign: "center" }}>{t("ts1200", { ns: "ts" })}</span>
                    </div>
                </div>
                :
                eventDateEnd < dateToday ?
                    <div className="timerMainContainer">
                        <div className="timerContainer">
                            <span style={{ fontSize: ".18rem", color: "#fff", textAlign: "center" }}>{t("ts1201", { ns: "ts" })}</span>
                        </div>
                    </div> :
                    <div className="timerMainContainer">
                        <div className="timerContainer">
                            <div className="timeBox">
                                <div className="timeContentBox">
                                    <span className="shareLabel shareTime">{newDay ? newDay : "00"}</span>
                                </div>
                                <div className="timeLabelBox">
                                    <span style={{ color: color.text4 }}>{t("ts1110", { ns: "ts" })}</span>
                                </div>
                            </div>
                            <div className="timeBox">
                                <div className="timeContentBox">
                                    <span className="shareLabel shareTime">{newHour ? newHour : "00"}</span>
                                </div>
                                <div className="timeLabelBox">
                                    <span style={{ color: color.text4 }}>{t("ts1111", { ns: "ts" })}</span>
                                </div>
                            </div>
                            <div className="timeBox">
                                <div className="timeContentBox">
                                    <span className="shareLabel shareTime">{newMinute ? newMinute : "00"}</span>
                                </div>
                                <div className="timeLabelBox">
                                    <span style={{ color: color.text4 }}>{t("ts1112", { ns: "ts" })}</span>
                                </div>
                            </div>
                            <div className="timeBox">
                                <div className="timeContentBox">
                                    <span className="shareLabel shareTime">{newSecond ? newSecond : "00"}</span>
                                </div>
                                <div className="timeLabelBox">
                                    <span style={{ color: color.text4 }}>{t("ts1113", { ns: "ts" })}</span>
                                </div>
                            </div>
                        </div>
                        <span className="shareLabel">{t("ts1063", { ns: "ts" })}</span>
                    </div>
            }
        </>
    )
}