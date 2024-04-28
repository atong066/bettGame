import Button from "@mui/material/Button";
import MainLayout from "../../layout";
import './point-redemption.css'
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useReducer, useState } from "react";
import { InputLabel, Select, MenuItem, SelectChangeEvent, Pagination } from "@mui/material";
import DateModal from "../common/dateModal";
import PointExModal from "./pointExchangeModal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import axios from "axios";
import { DatePicker, DatePickerV2, PointStatus, TransferType } from "../common/components/dropdownComponent";
import { dateReducer, initialDate } from "../reducers/dateReduce";
import { useTranslation } from "react-i18next";
import NoData from "../../noData/no-data";
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { HeaderWithAction } from "../common/header";
import { pointStatus } from "../userCenter/common/selectOtions";
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import { useGlobalVariables } from "../../globalFunctions/store";

export default function PointRedemption(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [points, setPoints] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [isData, setIsData] = useState(false)
    const handleGetdateEven = (e: any) => {
        console.log(e)
        dispatch({ type: e.value, dates: e })
    }
    const [openPoint, setOpenPointMddal] = useState(false);
    const handleOpenPoint = () => {
        setOpenPointMddal(true);
    };
    const handleClosePoint = () => {
        setOpenPointMddal(false);
    };
    const [status, setStatus] = useState('');
    useEffect(() => {
        getScoreHistory()
    }, [currentPage])
    async function getScoreHistory() {
        const response = await axios.post('/userCenter/scoreHisData.do', {
            startTime: commonReducer.startDate,
            endTime: commonReducer.endDate,
            pageNumber: currentPage,
            type: status,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

        if (response.data.rows.length > 0) {
            const totalPages = Math.ceil(response.data.total / 10)
            setPageCount(totalPages)
            setPoints(response.data.rows)
            setIsData(true)

        } else {
            setIsData(false)
        }
    }
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const setType = (type: any) => {
        const selType = pointStatus.find((item: any) => item.value == type)
        return selType ? t(selType.label, { ns: ["ts"] }) : "-"
    }

    const pointStat = (e: any) => {
        if (e.value == 0) {
            setStatus('')
        }
        else {
            setStatus(e.value)
        }
    }

    const pointState = useGlobalVariables(state => state.pointRedemptionState)

    return (
        <>
            <MainLayout>
                <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
                <section className="pointRedemptionMainContainer">
                    <HeaderWithAction backBtn={props.state}>{t("ts323", { ns: "ts" })}</HeaderWithAction>
                    <div className="pointRedemptionContainer" style={{ backgroundColor: colorP.backGorund }}>
                        <Stack spacing={2} direction={'row'}>
                            <DatePickerV2 onChange={handleGetdateEven}></DatePickerV2>
                            <PointStatus onChange={pointStat} />
                            <Button style={{ backgroundColor: colorP.forGround, fontWeight: 100, color: colorP.text2 }} variant='contained' className="dateButton searchButton" onClick={getScoreHistory} startIcon={<SearchIcon />}>{t("ts042", { ns: "ts" })}</Button>
                            <Button sx={{
                                "&:disabled": {
                                    cursor: "not-allowed !important",
                                    pointerEvents: "all !important",
                                },
                            }} disabled={pointState} style={{ backgroundColor: colorP.forGround, fontWeight: 100, color: colorP.text2 }} variant="contained" className="dateButton" onClick={handleOpenPoint}>{t("ts323", { ns: "ts" })}</Button>
                            <PointExModal search={getScoreHistory} openValue={openPoint} closeModal={handleClosePoint}></PointExModal>
                        </Stack>
                        <div className="pointRedemptionTableContainer">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell><span style={{ color: colorP.text4 }}>{t("ts324", { ns: "ts" })}</span></TableCell>
                                        <TableCell><span style={{ color: colorP.text4 }}>{t("ts325", { ns: "ts" })}</span></TableCell>
                                        <TableCell><span style={{ color: colorP.text4 }}>{t("ts326", { ns: "ts" })}</span></TableCell>
                                        <TableCell><span style={{ color: colorP.text4 }}>{t("ts327", { ns: "ts" })}</span></TableCell>
                                        <TableCell><span style={{ color: colorP.text4 }}>{t("ts328", { ns: "ts" })}</span></TableCell>
                                        <TableCell><span style={{ color: colorP.text4 }}>{t("ts329", { ns: "ts" })}</span></TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        isData == true && points.map((value: any, index: any) =>
                                            <TableRow>
                                                <TableCell>{setType(value.type)}</TableCell>
                                                <TableCell>{value.beforeScore}</TableCell>
                                                <TableCell>{value.score}</TableCell>
                                                <TableCell>{value.afterScore}</TableCell>
                                                <TableCell>{value.createDatetimeStr}</TableCell>
                                                <TableCell>{value.remark}</TableCell>
                                            </TableRow>
                                        )
                                    }

                                </TableBody>
                            </Table>
                            {isData != true ? <NoData padding={"1rem 0 0 0"} /> :
                                <div className="pagination" style={{ marginTop: ".2rem" }}>
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
                                        }}
                                        count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                                </div>
                            }
                        </div>
                    </div>
                </section>
                <NotificationContainer />
            </MainLayout >
        </>
    )
}