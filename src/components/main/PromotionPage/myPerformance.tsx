import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import NoData from "../../noData/no-data";
import { DatePicker, CommissionStatus, DatePickerV2 } from "../common/components/dropdownComponent";
import DateModal from "../common/dateModal";
import { useEffect, useReducer, useRef, useState } from "react";
import { dateReducer, initialDate, initialMonth } from "../reducers/dateReduce";
import Pagination from "@mui/material/Pagination/Pagination";
import { Button, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGetAwardDetail, useGetMyPerformance } from "../../hooks/getUserInfoHook";
import AlertModal from "../common/modal/alert-modal/alert-modal";
import DetailsModal from "./components/detailsModal";
import { useGlobalVariables } from "../../globalFunctions/store";
import { gameTypelabel } from "../userCenter/common/selectOtions";
function MyPerformance() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [intData, setIntData] = useState<any>()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)

    // const [performance, setPerformance] = useState([])
    const [isData, setIsData] = useState(false)
    const [alertModal, setAlertModal] = useState(false)

    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [setLoader, setOpenLoader] = useState(true);

    const [gameType, setGameType] = useState()

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })

    }
    const payload = {
        gameType: gameType,
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageSize: 10,
        pageNumber: currentPage
    }
    const handleStatus = (e: any) => {
        setGameType(e.value)
    }



    const getMyPerformance = useGetMyPerformance()
    const performance = getMyPerformance?.data?.data

    const getAwardDetail = useGetAwardDetail()
    const gameDetail = getAwardDetail?.data?.data

    useEffect(() => {
        getMyPerformance.mutate(payload)
    }, [currentPage, commonReducer])



    const search = () => {
        getMyPerformance.mutate(payload)
    }

    const searchDetail = (value: any) => {
        const DetailPayload = {
            statDate: modDate,
            gameType: 2,
            id: value
        }
        getAwardDetail.mutate(DetailPayload)
    }

    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D;
        return strDate;
    }
    const [modDate, setModDate] = useState("")
    const [modType, setModType] = useState("")
    function handleOpenModal(value: any) {
        setModType(value.gameType)
        setModDate(value.statDateStr)

        useGlobalVariables.setState({ performanceDetails: {} })
        const DetailPayload = {
            statDate: value.statDateStr,
            gameType: value.gameType,
        }
        getAwardDetail.mutate(DetailPayload)
        if (getAwardDetail.isLoading == false) {
            setAlertModal(true)
        }

    }

    function closeModal() {
        setAlertModal(false)
        setModDate("")
        setModType("")
    }
    function getGameType(type: any) {
        const gType = gameTypelabel.filter((item: any) => item.value == type)
        return t(gType[0]?.label, { ns: "ts" })
    }
    return (
        <>

            <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            <DetailsModal getDetail={getAwardDetail} modDate={modDate} gameTye={modType} alertModal={alertModal} closeModal={closeModal}></DetailsModal>
            <div className="AllDataMainBox">
                <div className="myPerformanceContainer" style={{ backgroundColor: color.backGorund }}>
                    <div className="topBox">
                        <Stack direction={"row"} spacing={2}>
                            <DatePickerV2 defaultValue={t("ts031", { ns: ["ts"] })} onChange={handleGetdateEven} />
                            <CommissionStatus onChange={handleStatus} />
                            {/* <Button style={{ backgroundColor: color.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: "#874404" }} onClick={search} variant='contained' className="searchButton" startIcon={<SearchIcon style={{ height: ".2rem", width: ".2rem" }} />}>{t("ts042", { ns: ["ts"] })}</Button> */}
                        </Stack>
                    </div>
                    <div className="tableContainer">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts503", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts925", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts926", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts927", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts928", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: color.text4 }}>{t("ts561", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {performance?.rows?.map((value: any, index: any) =>
                                    <TableRow key={index}>
                                        <TableCell>{timestampToTime(value.statDateStr)}</TableCell>
                                        <TableCell>{getGameType(value.gameType)}</TableCell>
                                        <TableCell>{value.num}</TableCell>
                                        <TableCell>{value.money}</TableCell>
                                        <TableCell>{value.oriBetNum}</TableCell>
                                        <TableCell><Button onClick={() => handleOpenModal(value)} variant="contained" size="small" style={{ backgroundColor: color.forGround, color: color.text2, fontSize: 11 }} className="muiButton" >{t("ts764", { ns: "ts" })}</Button></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {performance?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
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
                                    }} count={Math.ceil(performance?.total / 10)} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyPerformance;