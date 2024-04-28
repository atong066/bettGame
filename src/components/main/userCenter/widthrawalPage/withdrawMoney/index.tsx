import { useEffect, useState } from "react";
import { useButtonStates, useShowWithdraw, useTabStates } from "../../../../globalFunctions/store";
import { useGetSecurityInfo } from "../../../../hooks/getUserInfoHook";
import MainLayout from "../../../../layout";
import { HeaderWithAction } from "../../../common/header";
import WithdrawInfo from "../withdrawInfo";
import { Box, Button, IconButton, Link, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import './indexWithdrawMoney.css'
import WithdrawalMoney from "./components/withdraw";
import WithdrawalHistory from "./components/withdrawHistory";
import BankCardManager from "./components/bankCardManager";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

export default function WithdrawMoney() {
    const getSecurityInfo = useGetSecurityInfo()
    const getInfo = getSecurityInfo?.data?.data

    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);

    const showWithdraw = useShowWithdraw(state => state.type)

    if (getSecurityInfo.isLoading == false && getSecurityInfo.isSuccess == true) {
        if (getInfo.hasWithdrawalPassword == false) {
            useShowWithdraw.setState({ type: 1 })
        }
        if (getInfo.hasWithdrawalPassword == true) {
            useShowWithdraw.setState({ type: 2 })
        }
        // if (getInfo.hasWithdrawalPassword == false && getInfo.hasRealName == false && getInfo.hasPhone == false) {
        //     useShowWithdraw.setState({ type: 1 })
        // } else if (getInfo.hasWithdrawalPassword == true && getInfo.hasRealName == true && getInfo.hasPhone == true) {
        //     useShowWithdraw.setState({ type: 4 })
        // } else if (getInfo.hasWithdrawalPassword == true && getInfo.hasRealName == false && getInfo.hasPhone == false) {
        //     useShowWithdraw.setState({ type: 2 })
        // } else if (getInfo.hasWithdrawalPassword == true && getInfo.hasRealName == true && getInfo.hasPhone == false) {
        //     useShowWithdraw.setState({ type: 3 })
        // } else if (getInfo.hasWithdrawalPassword == true && getInfo.hasRealName == false && getInfo.hasPhone == true) {
        //     useShowWithdraw.setState({ type: 2 })
        // } else if (getInfo.hasWithdrawalPassword == false && getInfo.hasRealName == true && getInfo.hasPhone == true) {
        //     useShowWithdraw.setState({ type: 1 })
        // } else if (getInfo.hasWithdrawalPassword == false && getInfo.hasRealName == false && getInfo.hasPhone == true) {
        //     useShowWithdraw.setState({ type: 1 })
        // }
    }

    const tabStates = useTabStates(state => state.type)
    const [showNewPassword, setShowNewPassword] = useState(false);


    useEffect(() => {
        getSecurityInfo.refetch()
    }, [showWithdraw, useShowWithdraw, tabStates])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        useTabStates.setState({ type: newValue })
        useButtonStates.setState({ showAccNumButton: false })
        setShowNewPassword(false)
    };


    const handleClickShowNewPassword = () => {
        setShowNewPassword((show) => !show)
        useButtonStates.setState({ showAccNumButton: !showNewPassword })
    }
    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <MainLayout>
                <section className="mainEvent">
                    <HeaderWithAction>{t("ts181", { ns: "ts" })}</HeaderWithAction>
                    {showWithdraw == 1 ? <WithdrawInfo /> :
                        <div className="withdrawMainContainers" style={{ backgroundColor: colorP.backGorund }}>
                            <Box sx={{
                                width: '100%',
                                " .MuiButtonBase-root.Mui-selected": {
                                    color: colorP.forGround + " !important"
                                },
                                " .MuiButtonBase-root:hover": {
                                    color: colorP.forGround + " !important"
                                },
                                " .MuiButtonBase-root": {
                                    color: "#ADB6C3 !important"
                                },
                            }}>
                                <Box sx={{ borderBottom: 2, borderColor: '#272b33' }}>
                                    <Tabs value={tabStates} onChange={handleChange}
                                        TabIndicatorProps={{
                                            style: { background: colorP.forGround }
                                        }}>
                                        <Tab label={t("ts182", { ns: "ts" })} {...a11yProps(0)} />
                                        <Tab label={t("ts183", { ns: "ts" })} {...a11yProps(1)} />
                                        <Tab label={t("ts184", { ns: "ts" })} {...a11yProps(2)} />
                                        {tabStates == 2 &&
                                            <Button
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={handleMouseDownNewPassword}
                                                className="passWordEye"
                                                tabIndex={-1}
                                                style={{
                                                    display: "flex",
                                                    position: "absolute",
                                                    right: "0",
                                                    alignItems: "center"
                                                }}
                                            >
                                                {showNewPassword ? <Visibility sx={{ color: colorP.forGround, width: ".3rem", height: ".3rem" }} /> : <VisibilityOff sx={{ color: "#ADB6C3", width: ".3rem", height: ".3rem" }} />}
                                                {showNewPassword ? <span style={{ color: colorP.forGround, marginLeft: ".1rem" }}>{t('ts1104', { ns: 'ts' })}</span> : <span style={{ color: colorP.forGround, marginLeft: ".1rem" }}>{t('ts1114', { ns: 'ts' })}</span>}
                                            </Button>}
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={tabStates} index={0}>
                                    <WithdrawalMoney />
                                </CustomTabPanel>
                                <CustomTabPanel value={tabStates} index={1}>
                                    <WithdrawalHistory />
                                </CustomTabPanel>
                                <CustomTabPanel value={tabStates} index={2}>
                                    <BankCardManager />
                                </CustomTabPanel>
                            </Box>
                        </div>
                    }
                </section>
            </MainLayout>
        </>
    )
}