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
import { useGetAllData, useGetDirectBonus } from "../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useGlobalVariables } from "../../globalFunctions/store";
import { SearchInput } from "../common/components/inputComponent";

function SubordinateTable() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)
    const [currentPage, setCurrentPage] = useState(1)
    const getAllData = useGetDirectBonus()
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleGetdateEven = (e: any) => {
        console.log(e)
        dispatch({ type: e.value, dates: e })
    }
    const allData = useGlobalVariables(state => state.directBonus)

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
                                    {/* <TableCell>{t("ts889", { ns: "ts" })}</TableCell> */}
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts937", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts938", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts939", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts940", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts941", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts942", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts943", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getAllData.isLoading == false && allData?.rows?.map((value: any, index: any) =>
                                    <TableRow key={index}>
                                        {/* <TableCell>{value.username}</TableCell> */}
                                        <TableCell><div className="copyID">{value.promotionCode ? value.promotionCode : "-"} {value.promotionCode && <ContentCopyIcon style={{ color: color.forGround, height: "auto" }} className="copyIcon" onClick={() => copyText(value.promotionCode)} />}</div></TableCell>
                                        <TableCell>{value.actBonus}</TableCell>
                                        <TableCell>{value.taskBonus}</TableCell>
                                        <TableCell>{value.waterBackBonus}</TableCell>
                                        <TableCell>{value.rebateBonus}</TableCell>
                                        <TableCell>{value.vipUpgradeBonus}</TableCell>
                                        <TableCell>{value.rateBonus}</TableCell>
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

            </div>
        </>
    )
}
export default SubordinateTable;