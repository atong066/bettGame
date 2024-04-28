import { useEffect } from "react";
import { useSetActivityValue } from "../../../globalFunctions/store";
import { useGetActivities } from "../../../hooks/activeEvent";
import MainLayout from "../../../layout";
import { HeaderWithAction } from "../../common/header";
import './activity.css'
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";

export default function ActivityPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const activity = useSetActivityValue(state => state.activityValue)

    useEffect(() => {
    }, [])

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
            <MainLayout>
                <section className="mainEvent">
                    <div className="activityMainContainer">
                        <HeaderWithAction>{activity?.title}</HeaderWithAction>
                        <div className="timeHeaderContainer" style={{ backgroundColor: color.backGorund }}>
                            <div className="startTimeBox">
                                <label className="timeBoxLabel">{t("ts861", { ns: "ts" })}</label>
                                <label className="timeBoxLabelContent">{timestampToTime(activity?.updateTime)}</label>
                            </div>
                            <div className="startTimeBox">
                                <label className="timeBoxLabel">{t("ts862", { ns: "ts" })}</label>
                                <label className="timeBoxLabelContent">{timestampToTime(activity?.overTime)}</label>
                            </div>
                        </div>
                        <div className="contentContainerActivity" style={{ backgroundColor: color.backGorund }}>
                            <div dangerouslySetInnerHTML={{ __html: activity?.content }}></div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}