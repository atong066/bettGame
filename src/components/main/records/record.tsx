import { Button, Pagination, Stack } from "@mui/material";
import MainLayout from "../../layout";
import { HeaderWithAction } from "../common/header";
import { BonusRecordStatus, DatePicker, DatePickerV2, DatesPicker, DatesPickers, RecordStatus } from "../common/components/dropdownComponent";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useEffect, useReducer, useState } from "react";
import { dateReducer, initialDate, initialMonth, initialWeek } from "../reducers/dateReduce";
import DateModal from "../common/dateModal";
import NoData from "../../noData/no-data";
import "./recorder.css";
import { useGetBonusRecord } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";
import AlertModal from "../common/modal/alert-modal/alert-modal";
import SearchIcon from '@mui/icons-material/Search';

export default function Recorder() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)

    const [secType, setSecType] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const getBonusRecord = useGetBonusRecord()
    const bonusRecord = getBonusRecord?.data?.data

    const [alertModal, setAlertModal] = useState(false)
    const [remarks, setRemarks] = useState()

    const payload = {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        types: secType,
        pageSize: "10",
        pageNumber: currentPage
    }

    useEffect(() => {
        getBonusRecord.mutate(payload)
    }, [currentPage, commonReducer, secType])

    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })
    }

    const handleStatus = (e: any) => {
        setSecType(e.value)
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    function handleOpenModal(e: any) {
        setRemarks(e)
        setAlertModal(true)
    }
    function closeModal() {
        setAlertModal(false)
    }

    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D + h + m + s;
        return strDate;
    }

    return (
        <>
            <MainLayout>
                <Loader setLoader={getBonusRecord.isLoading} />
                <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
                <AlertModal alertMode="alertDefault" openAlert={alertModal} closeAlert={closeModal} alertTitle={t("ts561", { ns: "ts" })}>
                    <div className="alertContainer" style={{ width: "6rem" }}>
                        {remarks}
                    </div>
                </AlertModal>
                <section className="mainEvent">
                    <div className="recorderMainContainer">
                        <HeaderWithAction>{t("ts857", { ns: "ts" })}</HeaderWithAction>
                        <div className="recorderContainer" style={{ backgroundColor: colorP.backGorund }}>
                            <div className="topBox">
                                <Stack direction={"row"} spacing={2}>
                                    <DatePickerV2 defaultValue={t("ts031", { ns: ["ts"] })} onChange={handleGetdateEven} />
                                    <BonusRecordStatus onChange={handleStatus} />
                                    {/* <Button onClick={() => getBonusRecord.mutate(payload)} style={{ backgroundColor: colorP.forGround, fontWeight: 600 }} variant="contained"><SearchIcon />{t("ts042", { ns: "ts" })}</Button> */}
                                    {/* <Button style={{ backgroundColor: colorP.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: "#874404" }} onClick={() => getBonusRecord.mutate(payload)} variant='contained' className="searchButton" startIcon={<SearchIcon style={{ height: ".2rem", width: ".2rem" }} />}>{t("ts042", { ns: ["ts"] })}</Button> */}

                                </Stack>
                            </div>
                            <div className="tableContainer">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts065", { ns: ["ts"] })}</span></TableCell>
                                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts073", { ns: ["ts"] })}</span></TableCell>
                                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts060", { ns: ["ts"] })}</span></TableCell>
                                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts061", { ns: ["ts"] })}</span></TableCell>
                                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts062", { ns: ["ts"] })}</span></TableCell>
                                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts561", { ns: ["ts"] })}</span></TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {getBonusRecord.isLoading == false && bonusRecord && bonusRecord?.page?.rows?.map((value: any, index: any) =>
                                            <TableRow key={index}>
                                                <TableCell>{value.typeStr}</TableCell>
                                                <TableCell>{timestampToTime(value.createDatetime)}</TableCell>
                                                <TableCell>{value.add == true ? value.money : "-"}</TableCell>
                                                <TableCell>{value.add == false ? value.money : "-"}</TableCell>
                                                <TableCell>{value.afterMoney}</TableCell>
                                                <TableCell><Button variant="contained" size="small" style={{ backgroundColor: colorP.forGround, color: colorP.text2, fontSize: 11 }} className="muiButton" onClick={() => handleOpenModal(value.remark)}>{t("ts556", { ns: "ts" })}</Button></TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                {bonusRecord?.success == false || bonusRecord?.page?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
                                    <div className="pagination" style={{ paddingTop: ".2rem" }}>
                                        <Pagination
                                            variant="outlined" shape="rounded" sx={{
                                                ".MuiButtonBase-root": {
                                                    height: ".4rem",
                                                    width: ".4rem",
                                                    color: colorP.text4 + "!important",
                                                    borderRadius: ".06rem",
                                                    border: "",
                                                    borderColor: "#313843",
                                                    fontSize: ".18rem",
                                                    " .MuiSvgIcon-root": {
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
                                            }} count={bonusRecord?.page ? Math.ceil(bonusRecord?.page.total / bonusRecord?.page.pageSize) : 0} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}