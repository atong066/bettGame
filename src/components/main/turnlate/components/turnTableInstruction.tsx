import { isEmptyObject } from "jquery";
import { useButtonStates, useGlobalVariables } from "../../../globalFunctions/store";
import NoData from "../../../noData/no-data";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";

export default function TurnTableInstruction() {
    const buttonStates = useButtonStates(state => state.turnButton)
    const turnTableRecord = useGlobalVariables(state => state.TurnTableRecord)
    const color = ChangeColorPallte();

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
            <div className="dailyMainContainer">
                {/* <div className="marqueeContainer"> */}
                {turnTableRecord.length === 0 || turnTableRecord.code === "ERR_BAD_RESPONSE" || turnTableRecord.code === "ERR_BAD_REQUEST" || turnTableRecord === "" ? <NoData height={"100%"} /> :
                    <>
                        {turnTableRecord && turnTableRecord?.map((value: any, index: any) =>
                            <div className="dailyContainer" key={index}>
                                <div className="imageLabelBox">
                                    <img className="scoreImage" src={"/turnlateImages/zphd_icon_" + buttonStates + ".png"} alt="." />
                                    <div className="labelBox">
                                        <span className="lableTitle">{timestampToTime(value?.winTime)}</span>
                                        <span className="lableTitle">{value?.username}</span>
                                    </div>
                                </div>
                                <div className="scoreBox">
                                    <span className="scoreLabel">{value?.winMoney}</span>
                                </div>
                            </div>
                        )}
                    </>
                }
                {/* </div> */}
            </div>
        </>
    )
}