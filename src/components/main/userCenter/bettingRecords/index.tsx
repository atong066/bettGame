import { Button, Checkbox, FormControlLabel, Pagination, TextField } from "@mui/material";
import Select from 'react-select'
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../common/table";
import { dates, stats } from "../common/selectOtions";
import { getDatetoday, lastMonth } from "../common/dateRangepicker";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import { DatePicker, DatePickerV2, Stats } from "../../common/components/dropdownComponent";
import DateModal from "../../common/dateModal";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import NoData from "../../../noData/no-data";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import Loader from "../../../backdropLoader/backdrop-loader";
import './bettingRecordScrollingTable.css'

function BettingRecords() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [accountData, setAccountData] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [states, setStates] = useState('')
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [alertModal, setAlertModal] = useState(false)
    const [remarks, setRemarks] = useState()
    const [isData, setIsData] = useState(false)
    const [setLoader, setOpenLoader] = useState(true);
    useEffect(() => {
        async function getBetHistory() {
            setOpenLoader(true)
            const response = await axios.post('/userCenter/betHis/list.do', {
                startTime: commonReducer.startDate,
                endTime: commonReducer.endDate,
                pageNumber: currentPage,
                load: true,
                type: states,
            }, { headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } })
            if (response.data.rows == undefined) { return setIsData(false) }
            if (response.data.rows != '') {
                const totalPages = Math.ceil(response.data.total / 10)
                setPageCount(totalPages)
                setAccountData(response.data.rows)
                setIsData(true)
                setOpenLoader(false)
            } else {
                setOpenLoader(false)
                setIsData(false)
            }
        }
        getBetHistory()
    }, [currentPage, states, commonReducer, isData])

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const handleGetdateEven = (e: any) => {
        console.log(e)
        dispatch({ type: e.value, dates: e })
    }
    const handleSetStates = (e: any) => {
        setCurrentPage(1)
        setStates(e.value)
    }
    const getType = (type: any) => {
        const selType = stats.find((item: any) => item.value == type)
        return selType ? t(selType.label, { ns: "ts" }) : ""
    }
    function handleOpenModal(e: any) {
        setRemarks(e)
        setAlertModal(true)
    }
    function closeModal() {
        setAlertModal(false)
    }
    return (
        <>
            <Loader setLoader={setLoader}>
            </Loader>
            <div className="bettingRecordScrollingTable" style={{ padding: ".2rem" }}>
                <div className="accntActions">
                    <DatePickerV2 options={dates} onChange={handleGetdateEven} />
                    <Stats onChange={handleSetStates} />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts065", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts066", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts067", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts068", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts069", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts070", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts071", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts072", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts328", { ns: "ts" })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts329", { ns: "ts" })}</span></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isData == true && accountData.map((value: any, index: any) =>
                            <TableRow key={index}>
                                <TableCell>{getType(value.type)}</TableCell>
                                <TableCell>{value.orderId ? value.orderId : '-'}</TableCell>
                                <TableCell><span style={{ color: "#04BE02" }}>{value.beforeNum}</span></TableCell>
                                <TableCell><span style={{ color: "#04BE02" }}>{value.betNum}</span></TableCell>
                                <TableCell><span style={{ color: "#04BE02" }}>{value.afterNum}</span></TableCell>
                                <TableCell><span style={{ color: "#ffaa09" }}>{value.beforeDrawNeed}</span></TableCell>
                                <TableCell><span style={{ color: "#ffaa09" }}>{value.drawNeed}</span></TableCell>
                                <TableCell><span style={{ color: "#ffaa09" }}>{value.afterDrawNeed}</span></TableCell>
                                <TableCell>{value.createDatetimeStr}</TableCell>
                                <TableCell><Button variant="contained" size="small" style={{ backgroundColor: colorP.forGround, color: colorP.text, fontSize: 11 }} className="muiButton" onClick={() => handleOpenModal(value.remark)}>{t("ts064", { ns: "ts" })}</Button></TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
                {isData != true ? <NoData padding={"1rem 0 0 0"} /> :
                    <div className="pagination" style={{ paddingTop: ".2rem" }}>
                        <Pagination variant="outlined" shape="rounded" sx={{
                            ".MuiButtonBase-root": {
                                height: ".4rem",
                                width: ".4rem",
                                color: colorP.text4 + "!important",
                                borderRadius: ".06rem",
                                border: "",
                                borderColor: "#313843",
                                fontSize: ".18rem",
                                " .MuiSvgIcon-root":{
                                    color: colorP.text4 + "!important",
                                }
                            },
                            ".MuiButtonBase-root.Mui-selected": {
                                backgroundColor: colorP.forGround,
                                color: colorP.text2 + "!important",
                                borderColor: colorP.forGround
                            },
                            ".MuiButtonBase-root.Mui-selected:hover": {
                                backgroundColor: colorP.forGround
                            },
                        }} count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                    </div>
                }
            </div>
            <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            <AlertModal openAlert={alertModal} closeAlert={closeModal} alertTitle={t("ts052", { ns: "ts" })}>
                <div className="alertContainer" style={{ width: "6rem" }}>
                    {remarks}
                </div>
            </AlertModal>
        </>
    )
}
export default BettingRecords;