import { useEffect } from "react";
import { useButtonStates, useGlobalVariables } from "../../../../globalFunctions/store";
import { useGetTurnTableRecord } from "../../../../hooks/getUserInfoHook";
import NoData, { NoDataV2 } from "../../../../noData/no-data";
import './turnTableTableType5.css'
import { isEmptyObject } from "jquery";

export default function TurnTableTableType5() {
    const buttonStates = useButtonStates(state => state.turnButton)
    const turnTableRecord = useGlobalVariables(state => state.TurnTableRecord)

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
                {turnTableRecord.length === 0 || turnTableRecord.code === "ERR_BAD_RESPONSE" || turnTableRecord.code === "ERR_BAD_REQUEST" || turnTableRecord === "" ? <NoDataV2 height={"100%"} /> :
                    <div className="marqueeContainer">
                        {turnTableRecord && turnTableRecord?.map((value: any, index: any) =>
                            <div className="dailyContainer" key={index}>
                                <div className="imageLabelBox">
                                    <img className="scoreImage" src={"/turnlateImages/zphd_icon_" + 3 + ".png"} alt="." />
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
                    </div>
                }
            </div>
        </>
        //     <>
        //     <div className="dailyMainContainerType5">
        //         {turnTableRecord.length === 0 ? <NoDataV2 height={"100%"} /> :
        //             turnTableRecord && turnTableRecord.success !== false && turnTableRecord !== "" && turnTableRecord.length !== 0 ?
        //                 <div className="marqueeContainer">
        //                     {turnTableRecord && turnTableRecord.success !== false && turnTableRecord !== "" && turnTableRecord.length !== 0 ? turnTableRecord?.map((value: any, index: any) =>
        //                         <div className="dailyContainer" key={index}>
        //                             <div className="imageLabelBox">
        //                                 <img className="scoreImage" src={"/turnlateImages/zphd_icon_" + 3 + ".png"} alt="." />
        //                                 <div className="labelBox">
        //                                     <span className="lableTitle">{timestampToTime(value?.winTime)}</span>
        //                                     <span className="lableTitle">{value?.username}</span>
        //                                 </div>
        //                             </div>
        //                             <div className="scoreBox">
        //                                 <span className="scoreLabel">{value?.winMoney}</span>
        //                             </div>
        //                         </div>
        //                     ) : <NoDataV2 height={"100%"} />}
        //                 </div>
        //                 :
        //                 <NoDataV2 height={"100%"} />
        //         }
        //     </div>
        // </>
    )
}