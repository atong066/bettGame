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
function DepositHistDetails(props: any) {
    const colorP = ChangeColorPallte()
    const [currentPage, setCurrentPage] = useState(1)
    const moneyUnit = useGlobalVariables(state => state.stationConfig)
    const openModal = props.openSubModal
    const userInfo = useGlobalVariables(state => state.userDetails)
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [startDate, setStartDate] = useState(getDatetoday()[0])
    const [endDate, setEndDate] = useState(getDatetoday()[1])
    const { t, i18n } = useTranslation(["home", "main"]);
    const stationConfig = useGlobalVariables(state => state.stationConfig)
    const [accountName, setAccountName] = useState("")
    const [orderID, setOrderID] = useState("")
    const [depoStatus, setDepoStatus] = useState('')
    const getGetDepositRep = useGetDepositReport()
    const [successTotal, setSuccessTotal] = useState(0)
    const modalStatus = useGlobalVariables(state => state.depoModal)
    const depoHistData = useGlobalVariables(state => state.depositReport)
    const handelChanges = (event: React.SyntheticEvent, newValue: number) => {
        // setValue(newValue);
        useGlobalVariables.setState({ depoActiveTab: newValue })
    };
    const handleClose = () => {
        useGlobalVariables.setState({ depoHistSub: false })
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
    const detailsData = props.children
    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }
    return (
        <SubmitModal hasCancel={false} hasSubmit={false} submitTitle="Deposit Details" openSubModal={openModal} closeSubModal={handleClose}>
            <div className="detailsContainer">
                <div className="detailStatus">
                    <img src={detailsData?.status == 2 ? "images/success.png" : "/images/warning.png"} alt="" />
                    <span style={detailsData?.status == 2 ? { color: "#1bc27a", fontSize: ".2rem" } : { color: "#ea4e3d", fontSize: ".2rem" }}>{getType(2, detailsData?.status)}</span>
                    <span style={{ fontSize: ".4rem" }}>{stationConfig?.moneyUnit} {Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(detailsData?.money)} </span>
                </div>
                <div className="detailInfo">
                    <div className="entry">
                        <div className="label">{t('ts1105', {ns: 'ts'})}</div>
                        <div className="info">{getType(1, detailsData?.depositType)}</div>
                    </div>
                    <div className="entry">
                        <div className="label">{t('ts1106', {ns: 'ts'})} </div>
                        <div className="info">PIX</div>
                    </div>
                    <div className="entry">
                        <div className="label">{t('ts1107', {ns: 'ts'})}  </div>
                        <div className="info">{detailsData?.payName}</div>
                    </div>
                    <div className="entry">
                        <div className="label">{t('ts1108', {ns: 'ts'})} </div>
                        <div className="info">{detailsData?.createDatetime}</div>
                    </div>
                    <div className="entry">
                        <div className="label">{t('ts1109', {ns: 'ts'})} </div>
                        <div className="info">{detailsData?.orderId} <img src={colorP.copy} onClick={() => copyText(detailsData?.orderId)} className="copyIcon" /></div>
                    </div>
                </div>
            </div>
        </SubmitModal>
    )
}
export default DepositHistDetails;