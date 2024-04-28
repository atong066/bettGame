import { Box, Pagination, Tab, Tabs, Typography } from "@mui/material";
import SubmitModal from "../../common/modal/submit-modal/submit-modal";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useEffect, useReducer, useState } from "react";
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
import DateModal from "../../common/dateModal";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import { DatePickerV2, DatesPickers } from "../../common/components/dropdownComponent";
import NoData from "../../../noData/no-data";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import { useGetDepositReport } from "../../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { statuses, depositMethod, dates } from "../../userCenter/common/selectOtions";
import { getDatetoday } from "../../common/dateRangepicker";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import DepositHistDetails from "./depositDetailsModal";
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
function DepositModalHistory() {
    const colorP = ChangeColorPallte()
    const [currentPage, setCurrentPage] = useState(1)
    const moneyUnit = useGlobalVariables(state => state.stationConfig)
    const openModal = useGlobalVariables(state => state.depoHist)
    const userInfo = useGlobalVariables(state => state.userDetails)
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [startDate, setStartDate] = useState(getDatetoday()[0])
    const [endDate, setEndDate] = useState(getDatetoday()[1])
    const { t, i18n } = useTranslation(["home", "main"]);
    const value = useGlobalVariables(state => state.depoActiveTab)
    const [accountName, setAccountName] = useState("")
    const [orderID, setOrderID] = useState("")
    const [depoStatus, setDepoStatus] = useState('')
    const getGetDepositRep = useGetDepositReport()
    const [successTotal, setSuccessTotal] = useState(0)
    const modalStatus = useGlobalVariables(state => state.depoModal)
    const [detailsSubmodal, setDetailsSubMod] = useState<any>()
    const subHistModal = useGlobalVariables(state => state.depoHistSub)
    const depoHistData = useGlobalVariables(state => state.depositReport)
    const handelChanges = (event: React.SyntheticEvent, newValue: number) => {
        // setValue(newValue);
        useGlobalVariables.setState({ depoActiveTab: newValue })
    };
    const handleClose = () => {
        useGlobalVariables.setState({ depoHist: false })
    }

    const handleGetdateEven = (e: any) => {
        console.log(e)
        dispatch({ type: e.value, dates: e })
    }
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const getType = (arrType: any, type: any) => {

        if (arrType == 2) {
            const selType = statuses.find((item: any) => item.value == type)
            return selType ? t(selType.label, { ns: ["ts"] }) : ""
        }
        else if (arrType == 1) {
            const selType = depositMethod.find((item: any) => item.value == type)
            return selType ? t(selType.label, { ns: ["ts"] }) : ""
        }
    }
    const payload: any = {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageNumber: currentPage,
        orderId: orderID,
        username: accountName,
        status: depoStatus,
    }


    useEffect(() => {
        console.log(userInfo)
        if (userInfo?.isLogin === true) {
            getGetDepositRep.mutate(payload)
        }

    }, [currentPage, commonReducer, openModal])
    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }
    function getDetails(value: any) {
        setDetailsSubMod(value)
        useGlobalVariables.setState({ depoHistSub: true })
    }
    return (
        <SubmitModal hasCancel={false} hasSubmit={false} submitTitle={t("ts105", { ns: "ts" })} openSubModal={openModal} closeSubModal={handleClose}>
            <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            <div className="depoHistconatinerModal">
                <div className="modalHeader">
                    {/* <DatePickerV2 options={dates} onChange={handleGetdateEven} /> */}
                    <DatePickerV2 defaultValue={t("ts027", { ns: ["ts"] })} options={dates} onChange={handleGetdateEven} />
                    <div style={{ display: "flex", gap: "5px", alignItems: "center", fontSize: ".18rem" }}>
                        <span style={{ color: "#68707b" }}>{t("ts116", { ns: "ts" })}:</span>
                        <span style={{ color: colorP.text }}>{moneyUnit?.moneyUnit}{depoHistData?.aggsData?.totalMoney ? depoHistData?.aggsData?.totalMoney : "0"}</span>
                    </div>
                </div>
                <div className="depoHistBodyMain">
                    {getGetDepositRep.isLoading == false && !!depoHistData && depoHistData?.rows?.map((value: any, index: any) =>
                        <div className="depoItemHist" onClick={() => getDetails(value)}>
                            <div className="topItem">
                                <div style={{ fontSize: "initial", display: "flex", gap: "5px", alignItems: "center", color: "#ffffff" }}>
                                    <img width={40} height={40} src="/images/pix.png" alt="" />
                                    <label htmlFor="" style={{ color: "#ffffff" }}>{value.payName}</label>
                                </div>
                                <div style={{ fontSize: "initial", display: "flex", gap: "5px", alignItems: "center" }}>
                                    <span style={{ color: "#ffffff" }}>{moneyUnit?.moneyUnit}{value.money}</span>
                                </div>
                            </div>
                            <div className="bottomItem">
                                <div style={{ fontSize: "initial", display: "flex", gap: "5px", alignItems: "center", color: "#ffffff" }}>
                                    <span style={{ color: "#ffffff", fontSize: ".14rem" }}>{value.createDatetime}</span>
                                    <span style={{ color: "#ffaa09", fontSize: ".14rem", marginLeft: ".08rem" }}>{value.orderId} </span>
                                    <img src="/navbarImages/copy.png"  onClick={() => copyText(value?.orderId)} className="copyIcon" />
                                </div >
                                <div style={{ fontSize: "initial", display: "flex", gap: "5px", alignItems: "center", color: "#ffffff" }}>
                                    <span style={{ color: "#ffaa09" }}>{getType(2, value?.status)}</span>
                                </div>
                            </div>
                        </div>)
                    }
                    {depoHistData && depoHistData?.rows?.length===0&&<NoData padding={".1rem 0 0 0"} />}
                </div>

            </div>
            <DepositHistDetails openSubModal={subHistModal} closeSubModal={handleClose}>{detailsSubmodal}</DepositHistDetails>
        </SubmitModal>

    )
}
export default DepositModalHistory;