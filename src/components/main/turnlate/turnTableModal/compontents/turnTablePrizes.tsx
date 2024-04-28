import { useEffect } from "react";
import { useButtonStates, useGlobalVariables } from "../../../../globalFunctions/store"
import './turnTableTableType5.css'
import { NoDataV2 } from "../../../../noData/no-data";
import { isEmptyObject } from "jquery";
import { useTranslation } from "react-i18next";

export default function TurnTablePrizes(props: any) {
    const { t } = useTranslation(["home", "main"]);
    const buttonStates = useButtonStates(state => state.turnButton)
    const prizeList = useGlobalVariables(state => state.TurnTablePrize)

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

    return (
        <>
            <div className="dailyMainContainerType5">
                {prizeList.length === 0 || prizeList.code === "ERR_BAD_RESPONSE" || prizeList.code === "ERR_BAD_REQUEST" || prizeList === "" ? <NoDataV2 height={"100%"} /> :
                    <>
                        {prizeList && prizeList?.map((value: any, index: any) =>
                            <div className="dailyContainer" key={index}>
                                <div className="imageLabelBox">
                                    <img className="scoreImage" src={"/turnlateImages/zphd_icon_" + 3 + ".png"} alt="." />
                                    <div className="labelBox">
                                        <span className="lableTitle">{timestampToTime(value?.createDatetime)}</span>
                                        <span className="lableTitle">{value?.username} <span style={value?.status == 1 ? { color: "#EA4E3D", fontStyle: "italic" } : { color: "#04BE02", fontStyle: "italic" }}>{value?.status == 1 ? t("ts699", { ns: "ts" }) : value?.status == 2 ? t("ts848", { ns: "ts" }) : "-"}</span> </span>
                                    </div>
                                </div>
                                <div className="scoreBox">
                                    <span className="scoreLabel" style={value?.status == 1 ? { color: "#EA4E3D" } : { color: "#04BE02" }}>{value?.giftName}</span>
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
        </>
    )
}