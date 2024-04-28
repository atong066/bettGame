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
import { useDirectSubDeposit } from "../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SearchInput } from "../common/components/inputComponent";

function Finance() {
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


    const directData = useDirectSubDeposit()
    const allDirectData = directData?.data?.data

    const memberID = useRef<any>(null)



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
        directData.mutate(payload)
    }

    useEffect(() => {
        memberID.current.value = null
        directData.mutate(payload)
    }, [currentPage,commonReducer])

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    // if (directData.isLoading) {
    //     return (
    //         <>
    //             <Stack spacing={2}>
    //                 <Skeleton sx={{ backgroundColor: color.third }} animation="wave" variant="rounded" width={"100%"} height={40} />
    //                 <Skeleton sx={{ backgroundColor: color.third }} animation="wave" variant="rounded" width={"100%"} height={100} />
    //             </Stack>
    //             <Loader setLoader={directData.isLoading}></Loader>
    //         </>
    //     )
    // }

    return (
        <>
            <Loader setLoader={directData.isLoading}></Loader>
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
                                    {/* <TableCell>{t("ts889", { ns: "ts" })}</TableCell> */}
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts893", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts896", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts894", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts897", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts898", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts370", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {directData.isLoading == false && allDirectData?.rows?.map((value: any, index: any) =>
                                    <TableRow key={index}>
                                        {/* <TableCell>{value.username}</TableCell> */}
                                        <TableCell><div className="copyID">{value.promotionCode ? value.promotionCode : "-"} {value.promotionCode && <ContentCopyIcon style={{ color: color.forGround, height: "auto" }} className="copyIcon" onClick={() => copyText(value.promotionCode)} />}</div></TableCell>
                                        <TableCell>{value.depositTimes}</TableCell>
                                        <TableCell>{value.totalMoney ? value.totalMoney : "0"}</TableCell>
                                        <TableCell>{value.totalDrawMoney ? value.totalDrawMoney : "0"}</TableCell>
                                        <TableCell>{value.totalMoney - value.totalDrawMoney}</TableCell>
                                        <TableCell>{value.money}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {allDirectData?.success == false || allDirectData?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
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
                                        }} count={Math.ceil(allDirectData?.total / 10)} defaultPage={currentPage} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                                </div>

                            </>
                        }
                    </div>
                </div>
                {allDirectData?.rows != '' &&
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
                                            <span style={{ color: "#68707B" }}>{t("ts903", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allDirectData?.aggsData?.directTotalDeposit ? allDirectData?.aggsData?.directTotalDeposit : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts913", { ns: "ts" })}</span>
                                            <span style={{ color: "#ffaa09" }}>{allDirectData?.aggsData?.directTotalDraw ? allDirectData?.aggsData?.directTotalDraw : "0"}</span>
                                        </div>
                                    </div>
                                    <div className="top" style={{ borderColor: color.forGround, borderBottom: "none" }}>
                                        <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                            <span style={{ color: "#68707B" }}>{t("ts820", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allDirectData?.aggsData?.directRegCount ? allDirectData?.aggsData?.directRegCount : "0"}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: "#68707B" }}>{t("ts954", { ns: "ts" })}</span>
                                            <span style={{ color: color.text4 }}>{allDirectData?.aggsData?.directDepositTimes ? allDirectData?.aggsData?.directDepositTimes : "0"}</span>
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
export default Finance;