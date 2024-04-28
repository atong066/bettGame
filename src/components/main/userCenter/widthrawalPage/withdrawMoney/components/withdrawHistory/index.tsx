import { useEffect, useReducer, useState } from "react";
import { DatePickerV2 } from "../../../../../common/components/dropdownComponent";
import { dates, withdrawStatuses } from "../../../../common/selectOtions";
import { Button, FormControl, Pagination } from "@mui/material";
import DateModal from "../../../../../common/dateModal";
import NoData from "../../../../../../noData/no-data";
import { ChangeColorPallte } from "../../../../../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import './indexWithdrawHistory.css'
import { useGetWithdrawHistory, useStationConfig } from "../../../../../../hooks/getUserInfoHook";
import { dateReducer, initialDate } from "../../../../../reducers/dateReduce";
import Loader from "../../../../../../backdropLoader/backdrop-loader";
import PngkPagination from "../../../../../../Pagination/pagination";
import { Table, TableBody, TableHeader, TableCell, TableRow } from "../../../../common/table";


export default function WithdrawalHistory() {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);

    const stationConfig = useStationConfig()
    const moneyUnit = stationConfig?.data?.data?.moneyUnit

    const getWithdrawalHistory = useGetWithdrawHistory()
    const historySport = getWithdrawalHistory?.data?.data

    const [currentPage, setCurrentPage] = useState(1)

    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        getWithdrawalHistory.mutate({
            startTime: commonReducer.startDate,
            endTime: commonReducer.endDate,
            pageNumber: currentPage,
        })
    }, [commonReducer, currentPage])

    const getType = (type: any) => {
        const selType = withdrawStatuses.find((item: any) => item.value === type)
        return selType ? t(selType.label, { ns: ["ts"] }) : ""
    }

    return (
        <>
            <Loader setLoader={getWithdrawalHistory.isLoading} />
            <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            <div className="withdrawMainHistoryTable">
                <div className="hederTableContainerBox">
                    <FormControl>
                        <DatePickerV2 options={dates} onChange={handleGetdateEven} />
                    </FormControl>
                    <div className="collectionBox">
                        <span className="collectionLabel">{t("ts974", { ns: "ts" })}</span>
                        <span className="collectionLabel" style={{ color: colorP.text4 }}>{moneyUnit} {historySport?.aggsData?.trueMoney ? historySport?.aggsData?.trueMoney : "0"}</span>
                        <span className="collectionLabel">{t("ts192", { ns: "ts" })}</span>
                        <span className="collectionLabel" style={{ color: colorP.text4 }}>{moneyUnit} {historySport?.aggsData?.feeMoney ? historySport?.aggsData?.feeMoney : "0"}</span>
                    </div>
                </div>
                {/* <div className="historyTableContainer"> */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts475", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts464", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts192", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts079", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts081", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts052", { ns: ["ts"] })}</span></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getWithdrawalHistory.isLoading == false && historySport && historySport?.rows?.map((value: any, index: any) =>
                            <TableRow key={index} className="tableRow">
                                <TableCell>{value?.createDatetime}</TableCell>
                                <TableCell>{value?.drawMoney}</TableCell>
                                <TableCell>{value?.feeMoney}</TableCell>
                                <TableCell>{value?.bankName}</TableCell>
                                <TableCell>{getType(value?.status)}</TableCell>
                                <TableCell>{value?.remark}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {/* <div className="historyTable">
                        <div className="tableHeadhistory">
                            <div className="tableRowhistory">
                                <div className="tableCellHistory">{t("ts475", { ns: ["ts"] })}</div>
                                <div className="tableCellHistory">{t("ts464", { ns: ["ts"] })}</div>
                                <div className="tableCellHistory">{t("ts192", { ns: ["ts"] })}</div>
                                <div className="tableCellHistory">{t("ts079", { ns: ["ts"] })}</div>
                                <div className="tableCellHistory">{t("ts081", { ns: ["ts"] })}</div>
                                <div className="tableCellHistory">{t("ts052", { ns: ["ts"] })}</div>
                            </div>
                        </div>
                        <div className="tableBodyhistory">
                            {getWithdrawalHistory.isLoading == false && historySport && historySport?.rows?.map((value: any, index: any) =>
                                <div className="tableRowBodyhistory">
                                    <div className="tableCellHistory">{value?.createDatetime}</div>
                                    <div className="tableCellHistory">{value?.drawMoney}</div>
                                    <div className="tableCellHistory">{value?.feeMoney}</div>
                                    <div className="tableCellHistory">{value?.bankName}</div>
                                    <div className="tableCellHistory">{getType(value?.status)}</div>
                                    <div className="tableCellHistory">{value?.remark}</div>
                                </div>
                            )}
                        </div>
                    </div> */}
                {historySport?.success == false || historySport?.rows == '' ? <NoData /> :
                    <div className="pagination" style={{ marginTop: ".2rem" }}>
                        <PngkPagination data={Math.ceil(historySport?.total / 10)} action={handleChangePage}></PngkPagination>
                    </div>
                }
                {/* </div> */}
            </div>
        </>
    )
}