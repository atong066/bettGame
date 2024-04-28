import MainLayout from "../../layout";
import "./support.css";
import { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import NotificationPage from "./notificationPage";
import AnnouncementPage from "./announcementPage";
import FeedbackPage from "./feedback-components/feedbackPage";
import SupportPage from "./supportPage";
import { HeaderWithAction } from "../common/header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte, useBalance } from "../../globalFunctions/globalContext";
import { useGlobalVariables } from "../../globalFunctions/store";
import NoticePage from "./noticePage";
import NoticePaged from "./feedback-components/noticePage";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function Support(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const value = useGlobalVariables(state => state.supportTabindex)
    const currentUrl = window.location.pathname;
    const navigate = useNavigate()
    const userInFo = useGlobalVariables(state => state.userDetails)
    const isActive = (url: any) => {
        return currentUrl === url ? 'active' : '';
    };
    const handleChange = (event: any, newValue: number) => {
        useGlobalVariables.setState({ supportTabindex: parseInt(event.target.id) });
        useGlobalVariables.setState({ showContent: false });
        useGlobalVariables.setState({ isSupport: false });
        console.log(parseInt(event.target.id))
    };
    const userCon = useGlobalVariables((state) => state.stationConfig);

    return (
        <>
            <MainLayout>
                <section className="supportSection">
                    <HeaderWithAction backBtn={props.state}>{t("ts019", { ns: ["ts"] })}</HeaderWithAction>
                    <div className="supportMainContainer" >
                        <Box sx={{
                            ".MuiTabs-scroller": { height: ".7rem" },
                            " .MuiTabs-indicator": {
                                width: "100% !important",
                                left: "0 !important"
                            }
                        }}>
                            {userCon?.stationCode === "yd101" && value < 1 ?
                                <>
                                    <Box sx={{ borderBottom: 1, borderColor: colorP.third, height: ".7rem", backgroundColor: colorP.backGorund, borderTopRightRadius: ".1rem", borderTopLeftRadius: ".1rem" }}>
                                        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: colorP.forGround, fontSize: ".18rem" } }} aria-label="basic tabs example">
                                            <Tab sx={{ fontSize: ".2rem" }} style={value === 0 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts127", { ns: ["ts"] })} {...a11yProps(0)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        <SupportPage />
                                    </CustomTabPanel>
                                </>
                                : userCon?.stationCode === "yd101" && value > 0 ?
                                    <>
                                        <Box sx={{ borderBottom: 1, borderColor: colorP.third, height: ".7rem", backgroundColor: colorP.backGorund, borderTopRightRadius: ".1rem", borderTopLeftRadius: ".1rem" }}>
                                            <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: colorP.forGround, fontSize: ".18rem" } }}>
                                                <Tab sx={{ fontSize: ".2rem" }} style={value === 5 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts1083", { ns: ["ts"] })} {...a11yProps(5)} />
                                                <Tab sx={{ fontSize: ".2em" }} style={value === 1 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts1074", { ns: ["ts"] })} {...a11yProps(1)} />
                                                {userCon.onOffStationAdvice === true && <Tab sx={{ fontSize: ".2rem", fontWeight: "100" }} style={value === 2 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts130", { ns: ["ts"] })} {...a11yProps(2)} />}
                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={value} index={5}>
                                            <NoticePaged />
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={1}>
                                            <NotificationPage />
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={2}>
                                            <FeedbackPage />
                                        </CustomTabPanel>
                                    </>
                                    :
                                    userCon?.stationCode === "yd102" ?
                                        <>
                                            <Box sx={{ borderBottom: 1, borderColor: colorP.third, height: ".7rem", backgroundColor: colorP.backGorund, borderTopRightRadius: ".1rem", borderTopLeftRadius: ".1rem" }}>
                                                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: colorP.forGround, fontSize: ".18rem" } }}>
                                                    <Tab sx={{ fontSize: ".2rem" }} style={value === 0 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts127", { ns: ["ts"] })} {...a11yProps(0)} />
                                                    <Tab sx={{ fontSize: ".2em" }} style={value === 1 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts128", { ns: ["ts"] })} {...a11yProps(1)} />
                                                    <Tab sx={{ fontSize: ".2rem" }} style={value === 2 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts1083", { ns: ["ts"] })} {...a11yProps(2)} />
                                                    <Tab sx={{ fontSize: ".2em" }} style={value === 3 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts1074", { ns: ["ts"] })} {...a11yProps(3)} />
                                                </Tabs>
                                            </Box>
                                            <CustomTabPanel value={value} index={0}>
                                                <SupportPage />
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={1}>
                                                <AnnouncementPage />
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={2}>
                                                <NoticePaged />
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={3}>
                                                <NotificationPage />
                                            </CustomTabPanel>
                                        </>
                                        :
                                        <>
                                            <Box sx={{ borderBottom: 1, borderColor: colorP.third, height: ".7rem", backgroundColor: colorP.backGorund, borderTopRightRadius: ".1rem", borderTopLeftRadius: ".1rem" }}>
                                                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: colorP.forGround, fontSize: ".18rem" } }} aria-label="basic tabs example">
                                                    <Tab sx={{ fontSize: ".2rem" }} style={value === 0 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts127", { ns: ["ts"] })} {...a11yProps(0)} />
                                                    <Tab sx={{ fontSize: ".2em" }} style={value === 1 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts128", { ns: ["ts"] })} {...a11yProps(1)} />
                                                    <Tab sx={{ fontSize: ".2rem" }} style={value === 2 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts1083", { ns: ["ts"] })} {...a11yProps(2)} />
                                                    <Tab sx={{ fontSize: ".2em" }} style={value === 3 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts1074", { ns: ["ts"] })} {...a11yProps(3)} />
                                                    {userCon.onOffStationAdvice === true &&  <Tab sx={{ fontSize: ".2rem", fontWeight: "100" }} style={value === 4 ? { color: colorP.forGround } : { color: "#fff" }} className='supportTabs' label={t("ts130", { ns: ["ts"] })} {...a11yProps(4)} />}
                                                </Tabs>
                                            </Box>
                                            <CustomTabPanel value={value} index={0}>
                                                <SupportPage />
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={1}>
                                                <AnnouncementPage />
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={2}>
                                                <NoticePaged />
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={3}>
                                                <NotificationPage />
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={4}>
                                                <FeedbackPage />
                                            </CustomTabPanel>
                                        </>
                            }

                        </Box>
                    </div>

                </section>
            </MainLayout>
        </>
    )
}

export default Support;
