import FormControl from "@mui/material/FormControl";
import MainLayout from "../../../layout";
import './userlist.css'
import Wallet from '@mui/icons-material/AccountBalanceWalletOutlined';
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MyShare from "./myShare";
import TeamOverView from "./teamOverView";
import PromoRegistration from "../../promoRegistrationPage/promo-registration";
import RegistrationManagement from "../../registrationManagement/registration-management";
import RegManagement from "../../registrationManagement/registration-management";
import UserList from "./userListF";
import { HeaderWithAction } from "../../common/header";
import MyPromoOverview from "../../promoOverview/promo-overview";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte, useBalance } from "../../../globalFunctions/globalContext";
import PromoList from "../../promoList/promo-list";
import { useGlobalVariables } from "../../../globalFunctions/store";
import { TabContainer, TabItem } from "../../common/components/tabComponent";

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
                <Box sx={{ p: 3 }}>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function AccountManagement(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const value = useGlobalVariables(state => state.tabIndex2)

    const userType = useGlobalVariables(state=>state.userDetails)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        useGlobalVariables.setState({ agentActivetab: newValue });
        console.log(newValue)
    };

    function getTab(index: any) {
        switch (index) {
            case 0:
                return <MyShare setActiveShare={props.activeShare} />
            case 1:
                return <TeamOverView />
            case 2:
                return <UserList />
            case 3:
                return <PromoRegistration></PromoRegistration>
            case 4:
                return <RegManagement></RegManagement>
            case 5:
                return <MyPromoOverview></MyPromoOverview>
            case 6:
                return <PromoList></PromoList>
            default:
                return <MyShare setActiveShare={props.activeShare} />
        }
    }
    return (
        <>
            <MainLayout>
                <section className="withdrawMainContainer">
                    <HeaderWithAction backBtn={props.state}>{t("ts351", { ns: ["ts"] })}</HeaderWithAction>
                    <div className="walletContainer" style={{ backgroundColor: colorP.backGorund }}>
                        <Box sx={{
                            width: '100%', 
                            " .invite-tabs .MuiBox-root": {
                                borderRadius: "7px !important"
                            }
                        }}>
                            <TabContainer>
                              <TabItem className={value === 0 ? "active" : ""} index={0} >{t("ts225", { ns: "ts" })}</TabItem>
                              <TabItem className={value === 1 ? "active" : ""} index={1} >{t("ts226", { ns: "ts" })}</TabItem>
                              <TabItem className={value === 2 ? "active" : ""} index={2} >{t("ts227", { ns: "ts" })}</TabItem>

                              {userType?.type == 120 && <TabItem className={value === 3 ? "active" : ""} index={3} >{t("ts228", { ns: "ts" })}</TabItem>}
                              {userType?.type == 120 && <TabItem className={value === 4 ? "active" : ""} index={4} >{t("ts229", { ns: "ts" })}</TabItem>}
                              {userType?.type == 130 && <TabItem className={value === 5 ? "active" : ""} index={5} >{t("ts230", { ns: "ts" })}</TabItem>}
                              {userType?.type == 130 && <TabItem className={value === 6 ? "active" : ""} index={6} >{t("ts729", { ns: "ts" })}</TabItem>}
                            </TabContainer>
                            {/* <Box sx={{ borderBottom: 1, borderColor: colorP.third }}>
                                <Tabs value={value} onChange={handleChange}
                                    TabIndicatorProps={{
                                        style: {
                                            backgroundColor: colorP.forGround
                                        }
                                    }}>
                                    <Tab style={{ color: "#68707b" }} label={t("ts225", { ns: ["ts"] })}  {...a11yProps(0)} />
                                    <Tab style={{ color: "#68707b" }} label={t("ts226", { ns: ["ts"] })}  {...a11yProps(1)} />
                                    <Tab style={{ color: "#68707b" }} label={t("ts227", { ns: ["ts"] })}  {...a11yProps(2)} />
                                    {userType?.type == 120 && <Tab style={{ color: "#68707b" }} label={t("ts228", { ns: ["ts"] })} {...a11yProps(3)} />}
                                    {userType?.type == 120 && <Tab style={{ color: "#68707b" }} label={t("ts229", { ns: ["ts"] })} {...a11yProps(4)} />}
                                    {userType?.type == 130 && <Tab style={{ color: "#68707b" }} label={t("ts230", { ns: ["ts"] })} {...a11yProps(5)} />}
                                    {userType?.type == 130 && <Tab style={{ color: "#68707b" }} label={t("ts729", { ns: ["ts"] })} {...a11yProps(6)} />}
                                </Tabs>
                            </Box> */}
                            <div>
                                {getTab(value)}
                            </div>
                            {/* {userType?.type == 120 && <>
                                <CustomTabPanel value={value} index={3}>
                                    <PromoRegistration></PromoRegistration>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={4}>
                                    <RegManagement></RegManagement>
                                </CustomTabPanel></>}
                            {userType?.type == 130 && <>
                                <CustomTabPanel value={value} index={3}>
                                    <MyPromoOverview></MyPromoOverview>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={4}>
                                    <PromoList></PromoList>
                                </CustomTabPanel></>} */}

                        </Box>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}