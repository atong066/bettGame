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
import { useGetIncome } from "../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SearchInput } from "../common/components/inputComponent";

function MyPerformance() {
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


    const getAllData = useGetIncome()
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

    // if (getAllData.isLoading) {
    //     return (
    //         <>
    //             <Stack spacing={2}>
    //                 <Skeleton sx={{ backgroundColor: color.third }} animation="wave" variant="rounded" width={"100%"} height={40} />
    //                 <Skeleton sx={{ backgroundColor: color.third }} animation="wave" variant="rounded" width={"100%"} height={100} />
    //             </Stack>
    //             <Loader setLoader={getAllData.isLoading}></Loader>
    //         </>
    //     )
    // }

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
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts058", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts893", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts963", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts617", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts927", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getAllData.isLoading == false && allData?.rows?.map((value: any, index: any) =>
                                    <TableRow key={index}>
                                        {/* <TableCell>{value.username}</TableCell> */}
                                        <TableCell>{timestampToTime(value.statDate)}</TableCell>
                                        <TableCell><div className="copyID">{value.oriPromotionCode ? value.oriPromotionCode : "-"} {value.oriPromotionCode && <ContentCopyIcon style={{ color: color.forGround }} className="copyIcon" onClick={() => copyText(value.oriPromotionCode)} />}</div></TableCell>
                                        <TableCell>{value.num ? value.num : "0"}</TableCell>
                                        <TableCell>{value.oriBetNum ? value.oriBetNum : "0"}</TableCell>
                                        <TableCell>{value.money ? value.money : "0"}</TableCell>
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
                                    <div className="titleWithIcon" style={{ color: color.text4 }}><span>{t("ts902", { ns: "ts" })}</span></div>
                                    {/* <div className="titleWithIcon"><span className="more">{t("ts647", { ns: "ts" })} <ArrowForwardIosIcon className="arrowIconRight" /></span></div> */}
                                </div>
                                <div className="contents">
                                    <div className="top">
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts955", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4  }}>{allData?.aggsData?.directSubNum ? allData?.aggsData?.directSubNum : "0"}</span>
                                        </div>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts956", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allData?.aggsData?.directSubBetNum ? allData?.aggsData?.directSubBetNum : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts957", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allData?.aggsData?.directSubMoney ? allData?.aggsData?.directSubMoney : "0"}</span>
                                        </div>
                                    </div>
                                    <div className="top" style={{ borderBottom: "none" }}>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts958", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4  }}>{allData?.aggsData?.otherSubNum ? allData?.aggsData?.otherSubNum : "0"}</span>
                                        </div>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts959", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allData?.aggsData?.otherSubBetNun ? allData?.aggsData?.otherSubBetNun : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts960", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allData?.aggsData?.otherSubMoney ? allData?.aggsData?.otherSubMoney : "0"}</span>
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
export default MyPerformance;