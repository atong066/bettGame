import { Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import SubmitModal from "../../common/modal/submit-modal/submit-modal";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DepositInformation from "../../invitePage/inviteLink/depositInformation";
import BonusInformation from "../../invitePage/inviteLink/bonusInfromation";
import './deposit.css'
import BankCards from "../../userCenter/depositPage/deposit/offlineDeposit";
import OnlineDeposit from "../../userCenter/depositPage/deposit/onlineDeposit";
import DepositHisotry from "../../userCenter/depositHistory";
import { useGlobalVariables } from "../../../globalFunctions/store";
import DepositModalPop from "../../common/modal/submit-modal/depositModal";
import BankCardsModal from "../../userCenter/depositPage/deposit/onlineDepositModal";
import DepositModalHistory from "./depositHistoryModal";
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function DepositModal() {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const value = useGlobalVariables(state => state.depoActiveTab)
    const offlineBankcards = useGlobalVariables(state => state.offlineBankcards)

    const modalStatus = useGlobalVariables(state => state.depoModal)
    const handelChanges = (event: React.SyntheticEvent, newValue: number) => {
        // setValue(newValue);
        useGlobalVariables.setState({ depoActiveTab: newValue })
    };
    const handleClose = () => {
        useGlobalVariables.setState({ depoModal: false })
    }
    return (
        <DepositModalPop hasCancel={false} hasSubmit={false} submitTitle={t("ts014", { ns: "ts" })} openSubModal={modalStatus} closeSubModal={handleClose}>
            <section className="depostSection">
                <DepositModalHistory></DepositModalHistory>
                <div className="secondSection" style={{ background: colorP.backGorund }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{
                            "& .MuiTabs-root button[aria-selected=true]": {
                                color: colorP.forGround + "!important",
                            }, "& .MuiButtonBase-root": {
                                marginBottom: "-0.17rem",
                                fontSize: "0.18rem",
                                padding:"0",
                                marginRight: "0.1rem",
                            },
                            borderBottom: 2,
                            borderColor: '#313843',
                            padding:"0"
                        }}>
                            <Tabs value={value} onChange={handelChanges}
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: colorP.forGround,
                                        color: colorP.forGround,
                                        padding:"0"
                                    }
                                }}>
                                <Tab icon={value == 0 ? <Avatar sx={{
                                    borderRadius: "0",
                                    width: 24,
                                    height: 24
                                }} src="/images/onlineActive.png"></Avatar> : <Avatar sx={{
                                    borderRadius: "0",
                                    width: 24,
                                    height: 24
                                }} src="/images/onlineInActive.png"></Avatar>} iconPosition="start" className="supportTabs" label={t("ts224", { ns: "ts" })} {...a11yProps(1)} />
                                {offlineBankcards && offlineBankcards?.bankList && offlineBankcards?.bankList?.length !== 0 && <Tab icon={value == 1 ? <Avatar sx={{
                                    borderRadius: "0",
                                    width: 24,
                                    height: 24
                                }} src="/images/bankCardActive.png"></Avatar> : <Avatar sx={{
                                    borderRadius: "0",
                                    width: 24,
                                    height: 24
                                }} src="/images/bankCardInActive.png"></Avatar>} iconPosition="start" className="supportTabs" label={t("ts223", { ns: "ts" })} {...a11yProps(0)} />
                                }
                                {/* <Tab className="supportTabs" label={t("ts105", { ns: "ts" })} {...a11yProps(1)} /> */}
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <BankCardsModal colors={colorP} types={"1"} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <BankCards types={"3"}></BankCards>
                        </CustomTabPanel>
                        {/* <CustomTabPanel value={value} index={2}>
                <DepositHisotry types={"2"} />
              </CustomTabPanel> */}
                    </Box>
                </div>

            </section>
        </DepositModalPop>
    )
}
export default DepositModal;