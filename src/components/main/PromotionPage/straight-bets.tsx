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
import { useGetDirectSub } from "../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SearchInput } from "../common/components/inputComponent";

function StraightBets() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)
    const [currentPage, setCurrentPage] = useState(1)

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleGetdateEven = (e: any) => {
       
        dispatch({ type: e.value, dates: e })
        search()
    }


    const getAllData = useGetDirectSub()
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
    }, [currentPage,commonReducer])

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
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts893", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts911", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts910", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts912", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getAllData.isLoading == false && allData?.rows?.map((value: any, index: any) =>
                                    <TableRow key={index}>
                                        <TableCell><div className="copyID">{value.promotionCode ? value.promotionCode : "-"} {value.promotionCode && <ContentCopyIcon style={{ color: color.forGround, height: "auto" }} className="copyIcon" onClick={() => copyText(value.promotionCode)} />}</div></TableCell>
                                        <TableCell>{value.validBetnum ? value.validBetnum : "0"}</TableCell>
                                        <TableCell>{value.totalBetTimes}</TableCell>
                                        <TableCell>{value.winLostMoney}</TableCell>
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
                                    <div className="titleWithIcon"><span style={{ color: color.text4 }}>{t("ts902", { ns: "ts" })}</span></div>
                                    {/* <div className="titleWithIcon"><span className="more">{t("ts647", { ns: "ts" })} <ArrowForwardIosIcon className="arrowIconRight" /></span></div> */}
                                </div>
                                <div className="contents">
                                    <div className="top" style={{ borderColor: "#313843" }}>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts914", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allData?.aggsData?.directValidBetNum ? allData?.aggsData?.directValidBetNum : "0"}</span>
                                        </div>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts915", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allData?.aggsData?.otherBetNum ? allData?.aggsData?.otherBetNum : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts916", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allData?.aggsData?.allBetNum ? allData?.aggsData?.allBetNum : "0"}</span>
                                        </div>
                                    </div>
                                    <div className="top" style={{ borderColor: "#313843", borderBottom: "none" }}>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts917", { ns: "ts" })}</span>
                                            <span style={{ color: "#ea4e3d" }}>{allData?.aggsData?.directWinLostMoney ? allData?.aggsData?.directWinLostMoney : "0"}</span>
                                        </div>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts918", { ns: "ts" })}</span>
                                            <span style={{ color: "#ea4e3d" }}>{allData?.aggsData?.otherWinLostMoney ? allData?.aggsData?.otherWinLostMoney : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts919", { ns: "ts" })}</span>
                                            <span style={{ color: "#ea4e3d" }}>{allData?.aggsData?.allWinLostMoney ? allData?.aggsData?.allWinLostMoney : "0"}</span>
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
export default StraightBets;