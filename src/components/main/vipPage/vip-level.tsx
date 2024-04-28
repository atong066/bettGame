import { Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useGetUserVIP } from "../../hooks/getUserInfoHook";
import { useNavigate } from "react-router";

export default function VipLevel() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const userInfo = useGetUserVIP()
    const navigate = useNavigate()
    let level = userInfo?.data?.data.curDegreeLevel
    const medals = level == 0 ? '' : level < 6 ? 1 : level < 11 ? 2 : level < 14 ? 3 : level < 16 ? 4 : 0

    useEffect(() => {
        userInfo.refetch()
    }, [])
    function goTopage() {
        navigate("/record-collection")
    }
    return (
        <>
            {userInfo?.data?.data &&
                <div className="medalMainContainer" style={{ backgroundColor: color.backGorund }}>
                    <div className="medalBox">
                        <div className="medalContainer" style={{ backgroundImage: 'url("/vipImages/medalLevel' + medals + '.png")' }}>
                            <div className="medalRibbonContainer" style={{ backgroundImage: 'url("/vipImages/ribbonLevel' + level + '.png")' }}>
                                <span className="vipLevel">{level}</span>
                            </div>
                        </div>
                        {userInfo?.data?.data.curDegreeName == userInfo?.data?.data.newDegreeName ?
                            <>
                                <div className="highestLevel">
                                    <div className="avatarFlash"></div>
                                    <p>{t("ts858", { ns: "ts" })}</p>
                                </div>
                            </>
                            :
                            <>
                                <div className="levelNeed">
                                    <label className="medalLabel">{t("ts339", { ns: "ts" })}</label><span className="medalContent1" style={{ textTransform: "uppercase" }}>{userInfo?.data?.data.newDegreeName}</span>
                                    <label className="medalLabel">{userInfo?.data?.data.type === 1 ? t("ts340", { ns: "ts" }) : t("ts1197", { ns: "ts" })}</label><span className="medalContent2">{userInfo?.data?.data.type === 1 ? userInfo?.data?.data.nextDegreeDepositMoney : userInfo?.data?.data.nextDegreeBetNum}</span>
                                </div>
                            </>
                        }
                    </div>
                    <div className="medalButtonContainer">
                        <Stack spacing={2} direction="row">
                            <Button sx={{
                                "&:disabled": {
                                    cursor: "not-allowed !important",
                                    pointerEvents: "all !important",
                                    backgroundColor: "#999 !important",
                                    borderColor: "#999 !important",
                                    color: "#fff !important"
                                },
                            }} style={{
                                backgroundColor: color.forGround,
                                color: color.text2
                            }} disabled variant='contained' className='vipButtons'>{t("ts1071", { ns: "ts" })}</Button>
                            <Button onClick={goTopage} sx={{
                                "&:disabled": {
                                    cursor: "not-allowed !important",
                                    pointerEvents: "all !important",
                                    backgroundColor: "#999 !important",
                                    borderColor: "#999 !important",
                                    color: "#fff !important"
                                },
                            }} style={{
                                backgroundColor: color.forGround,
                                color: color.text2
                            }} variant='contained' className='vipButtons'>{t("ts456", { ns: "ts" })}</Button>
                        </Stack>
                    </div>
                    <div className="vipLevelBadge">
                        <span className="levelBadge">{t("ts1103", { ns: "ts" })}</span>
                    </div>
                </div>
            }
        </>
    )
}