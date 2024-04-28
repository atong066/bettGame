import MainLayout from "../../layout";
import './promoContainer.css'
import { HeaderWithAction } from "../common/header";
import PromoTutorial from "./promoTutorial";
import MyNiminies from "./myNominies";
import { useEffect, useState } from "react";
import { ChangeColorPallte, useBalance } from "../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import MyPerformance from "./myPerformance";
import { Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useNomToday, useGetUserAllInfo, useGetUserVIP, useNomV3 } from "../../hooks/getUserInfoHook";
import MyIncome from "./myIncome";
import AllData from "./allData";
import Finance from "./finance";
import StraightBets from "./straight-bets";
import CommissionFee from "./commission-fee";
import { useGlobalVariables } from "../../globalFunctions/store";
import DirectData from "./dirtectData";
import SubordinateTable from "./subordinateTable";
import { ToastrPngk } from "../../globalFunctions/toastr";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DepositHistDetails from "../homePage/components/depositDetailsModal";
import VipModal2 from "../homePage/components/vipModal";

function PromotionPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const tab = useGlobalVariables(state => state.tabIndex)
    const backgroundColor = ChangeColorPallte()
    const getVip = useGetUserVIP()
    const getUserInfo = useGlobalVariables(state => state.userDetails)
    const inviteData = useNomV3()
    const subHistModal = useGlobalVariables(state => state.vipModal)
    const proxyID = inviteData?.data?.data?.content?.proxyId
    const userInfo = useGlobalVariables(state => state.userDetails)
    useEffect(() => {
        inviteData.refetch()
    }, [])
    const handleClose = () => {
        useGlobalVariables.setState({ vipModal: false })
    }

    function showTab(id: any) {
        switch (id) {
            case 1: return <PromoTutorial />;
            case 3: return <MyPerformance />;
            case 4: return <MyIncome />;
            case 5: return <AllData />;
            case 6: return <Finance />;
            case 7: return <StraightBets />;
            case 8: return <CommissionFee />;
            case 9: return <DirectData />;
            case 10: return <SubordinateTable />;
            default: return <MyNiminies />;
        }
    }
    function changeTab(id: any) {
        useGlobalVariables.setState({ tabIndex: id })
    }
    const activeTab = {
        color: backgroundColor.text2,
        width: "1.3rem",
        height: ".6rem",
        // backgroundImage: "url(" + backgroundColor.activeTab + ")",
        backgroundColor: backgroundColor.forGround,

    }
    const notActivbbe = {
        backgroundColor: backgroundColor.backGorund,
        width: "1.3rem",
        height: ".6rem",
        // backgroundImage: "url(" + backgroundColor.inActiveTab + ")",
    }
    // const smnotActivbbe = {
    //     backgroundColor: backgroundColor.backGorund,
    //     width: "1.3rem",
    //     height: ".6rem",
    //     backgroundImage: 'url("/images/btnBg.png")',
    //     fontSize: ".18rem",
    // }
    // const smallAct = {
    //     color: "#874404",
    //     width: "1.3rem",
    //     height: ".6rem",
    //     backgroundImage: 'url("/images/btnBgActive.png")',
    //     fontSize: ".18rem",

    // }
    let level = getVip?.data?.data.curDegreeLevel
    const medals = level == 0 ? '' : level < 6 ? 1 : level < 11 ? 2 : level < 14 ? 3 : level < 16 ? 4 : 0

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }
    function getVIpdetails() {
        useGlobalVariables.setState({ vipModal: true })
    }
    const navigate = useNavigate()
    function goToPage() {
        navigate("/account-details")
        useGlobalVariables.setState({ tabIndex2: 0 })
    }
    return (
        <MainLayout>
            <section className="mainInvite">
                <HeaderWithAction>{t("ts457", { ns: "ts" })}</HeaderWithAction>
                {getUserInfo.isLogin === true && <div className="collectionContainer" style={{ backgroundColor: backgroundColor.backGorund }}>
                    <div className="collectionBox">
                        <div className="imageBox">
                            <div className="medalContainer" onClick={getVIpdetails} style={{ backgroundImage: 'url("/vipImages/medalLevel' + medals + '.png")' }}>
                                <div className="medalRibbonContainer" style={{ backgroundImage: 'url("/vipImages/ribbonLevel' + level + '.png")' }}>
                                    <span className="vipLevel">{level}</span>
                                </div>
                            </div>
                            <img onClick={getVIpdetails} className="iconAlert" src="/images/icon_Alert.png" alt="." />
                        </div>
                        <div className="labelCon">
                            <div className="labelBox"><span className="label">{t("ts785", { ns: "ts" })}:</span> <span className="labelContent"><div className="copyID copyIDV2" style={{ color: backgroundColor.text4 }}>{getUserInfo?.promCode ? getUserInfo?.promCode : t("ts358", { ns: "ts" })} {getUserInfo?.promCode && <img src={backgroundColor.copy} style={{ color: backgroundColor.forGround }} className="copyIcon" onClick={() => copyText(getUserInfo?.promCode)} />}</div></span></div>
                            <div className="labelBox"><span className="label">{t("ts786", { ns: "ts" })}:</span> <span className="labelContent"><div className="copyID copyIDV2" style={{ color: backgroundColor.text4 }}>{proxyID ? proxyID : t("ts358", { ns: "ts" })} {proxyID && <img src={backgroundColor.copy} style={{ color: backgroundColor.forGround, width: ".30rem" }} className="copyIcon" onClick={() => copyText(proxyID)} />}</div></span></div>
                        </div>
                        <div className="collectibleBox">
                            <div className="labelBox"><span className="label">{t("ts787", { ns: "ts" })}:</span> <span className="labelContent" style={{ color: "#ffaa09" }}>0,00</span></div>
                        </div>
                        <div className="buttonConBox">
                            <Button style={{ backgroundColor: "#999", height: ".4rem", width: "1rem", cursor: "no-drop", fontSize: ".14rem" }} className="collectionButton" variant="contained">{t("ts698", { ns: "ts" })}</Button>
                            <Button onClick={goToPage} style={{ backgroundColor: backgroundColor.forGround, height: ".4rem", width: "1rem", fontSize: ".14rem", color: backgroundColor.text2 }} className="collectionButton" variant="contained">{t("ts604", { ns: "ts" })}</Button>
                        </div>
                    </div>
                </div>}
                <div className="promoContianer">
                    <div className="promoLinks">
                        <button style={tab == 1 ? activeTab : notActivbbe} onClick={() => changeTab(1)}>{t("ts644", { ns: "ts" })}</button>
                        {userInfo?.isLogin == true && <>
                            <button style={tab == 2 ? activeTab : notActivbbe} onClick={() => changeTab(2)}>{t("ts645", { ns: "ts" })}</button>
                            <button style={tab == 3 ? activeTab : notActivbbe} onClick={() => changeTab(3)}>{t("ts784", { ns: "ts" })}</button>
                            <button style={tab == 4 ? activeTab : notActivbbe} onClick={() => changeTab(4)}>{t("ts810", { ns: "ts" })}</button>
                            <button style={tab == 5 ? activeTab : notActivbbe} onClick={() => changeTab(5)}>{t("ts899", { ns: "ts" })}</button>
                            <button style={tab == 6 ? activeTab : notActivbbe} onClick={() => changeTab(6)}>{t("ts900", { ns: "ts" })}</button>
                            <button style={tab == 7 ? activeTab : notActivbbe} onClick={() => changeTab(7)}>{t("ts909", { ns: "ts" })}</button>
                            <button style={tab == 9 ? activeTab : notActivbbe} onClick={() => changeTab(9)}>{t("ts930", { ns: "ts" })}</button>
                            <button style={tab == 10 ? activeTab : notActivbbe} onClick={() => changeTab(10)}>{t("ts931", { ns: "ts" })}</button>
                            <button style={tab == 8 ? activeTab : notActivbbe} onClick={() => changeTab(8)}>{t("ts929", { ns: "ts" })}</button>
                        </>}
                    </div>
                    <div className="promoMain" style={{ backgroundColor: backgroundColor.third }}>
                        {
                            showTab(tab)
                        }
                    </div>
                </div>
            </section>
            <VipModal2 openSubModal={subHistModal} closeSubModal={handleClose}></VipModal2>
        </MainLayout>
    )
}
export default PromotionPage;