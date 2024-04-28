import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import NoData from "../../noData/no-data";
import { DatePicker, CommissionStatus, DatePickerV2 } from "../common/components/dropdownComponent";
import DateModal from "../common/dateModal";
import { useEffect, useReducer, useRef, useState } from "react";
import { dateReducer, initialDate, initialMonth } from "../reducers/dateReduce";
import Pagination from "@mui/material/Pagination/Pagination";
import { Button, Skeleton, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGetAllData } from "../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SearchInput } from "../common/components/inputComponent";

function AllData() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)
    const [currentPage, setCurrentPage] = useState(1)

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleGetdateEven = (e: any) => {

        dispatch({ type: e.value, dates: e })

    }


    const getAllData = useGetAllData()
    const allData = getAllData?.data?.data

    const memberID = useRef<any>(null)

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

    const payload = {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageSize: 10,
        pageNumber: currentPage,
    }

    const search = () => {
        const payload = {
            startTime: commonReducer.startDate,
            endTime: commonReducer.endDate,
            pageSize: 10,
            pageNumber: currentPage,
            id: memberID?.current?.value
        }
        getAllData.mutate(payload)
    }

    useEffect(() => {
        memberID.current.value = null
        getAllData.mutate(payload)
    }, [currentPage, commonReducer])

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }
    return (
        <>
            <Loader setLoader={getAllData.isLoading}></Loader>
            <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            <div className="AllDataMainBox">
                <div className="myPerformanceContainer" style={{ backgroundColor: color.backGorund }}>
                    <div className="topBox">
                        <Stack direction={"row"} spacing={2}>
                            <DatePickerV2 defaultValue={t("ts031", { ns: ["ts"] })} onChange={handleGetdateEven} />
                            <SearchInput type="number" onClick={search} inputRef={memberID} placeHolder={t("ts893", { ns: ["ts"] })}></SearchInput>
                        </Stack>
                    </div>
                    <div className="tableContainer">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts895", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts893", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts889", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts894", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts617", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getAllData.isLoading == false && allData?.rows?.map((value: any, index: any) =>
                                    <TableRow key={index}>
                                        <TableCell>{timestampToTime(value.createDatetime)}</TableCell>
                                        <TableCell><div className="copyID">{value.promotionCode ? value.promotionCode : "-"} {value.promotionCode && <ContentCopyIcon style={{ color: color.forGround, height: "auto" }} className="copyIcon" onClick={() => copyText(value.promotionCode)} />}</div></TableCell>
                                        <TableCell>{value.username}</TableCell>
                                        <TableCell>{value.totalMoney}</TableCell>
                                        <TableCell>{value.validBetnum}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {allData?.success == false || allData?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
                            <>
                                <div className="pagination" style={{ paddingTop: ".2rem" }}>
                                    <Pagination
                                        variant="outlined" shape="rounded" sx={{
                                            ".MuiButtonBase-root": {
                                                height: ".4rem",
                                                width: ".4rem",
                                                color: color.text4 + "!important",
                                                borderRadius: ".06rem",
                                                border: "",
                                                borderColor: "#313843",
                                                fontSize: ".18rem",
                                                " .MuiSvgIcon-root": {
                                                    color: color.text4 + "!important",
                                                }
                                            },
                                            ".MuiButtonBase-root.Mui-selected": {
                                                backgroundColor: color.forGround,
                                                color: color.text2 + "!important",
                                                borderColor: color.forGround
                                            },
                                            ".MuiButtonBase-root.Mui-selected:hover": {
                                                backgroundColor: color.forGround
                                            },
                                        }} count={Math.ceil(allData?.total / 10)} defaultPage={currentPage} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                                </div>
                            </>
                        }
                    </div>
                </div>
                {allData?.rows != '' &&
                    <div className="extraTableContainer" style={{ backgroundColor: color.backGorund }}>
                        <div className="extraContainer">
                            <div className="extraTab" style={{ borderColor: color.forGround, backgroundColor: color.third }}>
                                <div className="title" style={{ borderColor: "#313843" }}>
                                    <div className="titleWithIcon" style={{ color: color.text4 }}>{t("ts902", { ns: "ts" })}</div>
                                    {/* <div className="titleWithIcon"><span className="more">{t("ts647", { ns: "ts" })} <ArrowForwardIosIcon className="arrowIconRight" /></span></div> */}
                                </div>
                                <div className="contents">
                                    <div className="top" style={{ borderColor: "#313843" }}>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts903", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allData?.aggsData?.directDepositMoney ? allData?.aggsData?.directDepositMoney : "0"}</span>
                                        </div>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts904", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allData?.aggsData?.otherDepositMoney ? allData?.aggsData?.otherDepositMoney : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts905", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allData?.aggsData?.allDepositMoney ? allData?.aggsData?.allDepositMoney : "0"}</span>
                                        </div>
                                    </div>
                                    <div className="top" style={{ borderColor: color.forGround, borderBottom: "none" }}>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts906", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allData?.aggsData?.directFirstDepositTimes ? allData?.aggsData?.directFirstDepositTimes : "0"}</span>
                                        </div>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts907", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allData?.aggsData?.otherFirstDepositTimes ? allData?.aggsData?.otherFirstDepositTimes : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts908", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allData?.aggsData?.firstDepositTimes ? allData?.aggsData?.firstDepositTimes : "0"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    )
}
export default AllData;