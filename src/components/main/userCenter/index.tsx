import MainLayout from "../../layout";
import './accntDetails.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import React from 'react';
import AccountDetailsComponent from "./accountDetails/index";
import BettingRecords from "./bettingRecords";
import PersonalReport from "./personalReport/index";
import OverView from "../invitePage/inviteLink/overView";
import { Link } from "react-router-dom";
import TransferRecords from "../invitePage/inviteLink/transferRecords";
import { HeaderWithAction } from "../common/header";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import RedRecord from "../invitePage/inviteLink/redEnveloperRecord";
import { TabContainer, TabItem } from "../common/components/tabComponent";
import { useGlobalVariables } from "../../globalFunctions/store";

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
function AccountDetails(props: any) {
    const { t } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte();

    const value = useGlobalVariables(state => state.tabIndex2)

    function getTab(index: any) {
        switch (index) {
            case 0:
                return <AccountDetailsComponent />
            case 1:
                return <BettingRecords />
            case 2:
                return <PersonalReport />
            case 3:
                return <OverView />
            case 4:
                return <TransferRecords />
            case 5:
                return <RedRecord />
            default:
                return <AccountDetailsComponent />
        }
    }

    return (
        <>
            <MainLayout>
                <section className="accntContainer">
                    <HeaderWithAction backBtn={props.state}>{t("ts043", { ns: "ts" })}</HeaderWithAction>
                    <div className="pageContent" style={{ background: colorP.backGorund, fontSize: "initial" }}>
                        <Box sx={{ width: '100%' }}>
                            <TabContainer>
                                <TabItem className={value === 0 ? "active" : ""} index={0} >{t("ts102", { ns: "ts" })}</TabItem>
                                <TabItem className={value === 1 ? "active" : ""} index={1} >{t("ts103", { ns: "ts" })}</TabItem>
                                <TabItem className={value === 2 ? "active" : ""} index={2} >{t("ts104", { ns: "ts" })}</TabItem>
                                <TabItem className={value === 3 ? "active" : ""} index={3} >{t("ts106", { ns: "ts" })}</TabItem>
                                <TabItem className={value === 4 ? "active" : ""} index={4} >{t("ts107", { ns: "ts" })}</TabItem>
                                <TabItem className={value === 5 ? "active" : ""} index={5} >{t("ts722", { ns: "ts" })}</TabItem>
                            </TabContainer>
                            <div>
                                {getTab(value)}
                            </div>
                        </Box>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}
export default AccountDetails;