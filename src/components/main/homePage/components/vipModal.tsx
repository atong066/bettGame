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
import { useGetDepositReport, useGetVIPCollection } from "../../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { statuses, depositMethod, dates } from "../../userCenter/common/selectOtions";
import { getDatetoday } from "../../common/dateRangepicker";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import axios from "axios";
import Loader from "../../../backdropLoader/backdrop-loader";
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
function VipModal2(props: any) {
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

    const [setLoader, setOpenLoader] = useState(true);

    const vipCollection = useGetVIPCollection()
    const vips = useGlobalVariables(state => state.vipCollection)

    const handelChanges = (event: React.SyntheticEvent, newValue: number) => {
        // setValue(newValue);
        useGlobalVariables.setState({ depoActiveTab: newValue })
    };
    const handleClose = () => {
        useGlobalVariables.setState({ depoHistSub: false })
    }

    const handleGetdateEven = (e: any) => {
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
    function tableBody() {
        const rows = [];
        const values = ["0,00", "100,00", "300,00", "500,00", "800,00", "1.000,00", "10.000,00", "30.000,00", "50.000,00", "80.000,00", "100.000,00", "1.000.000,00", "3.000.000,00", "5.000.000,00", "8.000.000,00", "10.000.000,00", "100.000.000,00", "300.000.000,00", "500.000.000,00", "800.000.000,00"]
        let val;
        for (let i = 1; i <= 20; i++) {

            rows.push(
                <div className="bipRow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".15rem .3rem", height: ".6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: ".18rem" }}><img height={35} width={40} src={"/VIP/VIP" + i + ".png"} alt="" />LV{i}</div>
                    <div style={{ textAlign: "end", fontSize: ".2rem", color: "#adb6c3" }}>{values[i - 1]}</div>
                </div>
            )
        }
        return rows
    }

    function Default(props: any) {
        const medal = props.vipCount == 0 ? '' : props.vipCount < 6 ? 1 : props.vipCount < 11 ? 2 : props.vipCount < 14 ? 3 : props.vipCount < 16 ? 4 : 0
        return (
            <>
                <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel` + medal + `.png")` }}>
                    <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel` + props.vipCount + `.png")` }}>
                        <span className="vipLevel">{props.vipCount}</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Loader setLoader={vipCollection.isLoading}></Loader>
            <SubmitModal hasCancel={false} hasSubmit={false} submitTitle={t("ts344", { ns: "ts" })} openSubModal={openModal} closeSubModal={props.closeSubModal}>
                <div style={{ height: "6rem" }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>{t("ts344", { ns: "ts" })}</TableCell>
                                <TableCell>{t("ts348", { ns: "ts" })}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vips && vips.code !== "ERR_BAD_RESPONSE" && vips?.map((value: any, index: any) =>
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="medalRowContainer">
                                            {value.icon ? <div className="imgContainer"><img className="imgIconX" src={value.icon} alt="" /></div> : <Default vipCount={index}></Default>}
                                            <span className="viplevelspan">VIP{index}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{value.depositMoney}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {vips.length === 0 || vips.code === "ERR_BAD_RESPONSE" && <NoData />}
                </div>
            </SubmitModal>
        </>
    )
}
export default VipModal2;