import Stack from "@mui/material/Stack";
import MainLayout from "../../layout";
import './promoOverview.css'
import Button from "@mui/material/Button";
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useReducer, useState } from "react";
import { InputLabel, Select, MenuItem, SelectChangeEvent, Pagination } from "@mui/material";
import axios from "axios";
import DateModal from "../common/dateModal";
import { dateReducer, initialPromoOverViewDate } from "../reducers/dateReduce";
import { useTranslation } from "react-i18next";
import NoData from "../../noData/no-data";
import { ChangeColorPallte, UserUSerConfig, UserUSerConfig2 } from "../../globalFunctions/globalContext";
import { DatePickerV2, DatesPicker } from "../common/components/dropdownComponent";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGlobalVariables } from "../../globalFunctions/store";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";

export default function MyPromoOverview() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [date, setDate] = useState('');
    const [username, setAccount] = useState('');
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [commonReducer, dispatch] = useReducer(dateReducer, initialPromoOverViewDate)
    const [PromoOverview, setPromoOverview] = useState<any[]>([])
    const [overview, setOverview] = useState([])
    const config = UserUSerConfig()
    const config2 = useGlobalVariables(state => state.stationConfig)
    const [setLoader, setOpenLoader] = useState(true);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const handleGetdateEven = (e: any) => {
        setDate(e.value)
        dispatch({ type: e.value, dates: e })
    }
    const handleAccount = (account: any) => {
        setAccount(account)
    }
    useEffect(() => {
        getPromOverview()
    }, [])
    const getData = () => {
        getPromOverview()
    }

    const [isData, setIsData] = useState(false)

    async function getPromOverview() {
        setOpenLoader(true)
        try {
            const response = await axios.get('/userCenter/agentManage/recommendList.do', {
                params: {
                    date: commonReducer.startDate,
                    username: username,
                    currentPageNo: currentPage,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            setPromoOverview([])
            if (response.data.success == false) {
                setIsData(false)
                // ToastrPngk({ msg: response.data.msg, type: "error", id: "error" })
                setOpenLoader(false);
                return
            }
            if (response.data.page.rows != '') {
                setPromoOverview(current => [...current, response.data])
                setOverview(response.data.page.rows)
                setPageCount(response.data.page.totalPageCount)
                setIsData(true)
                setOpenLoader(false);
            } else {
                setIsData(false)
                setOpenLoader(false);
            }
        } catch (error) {
            setIsData(false)
            setOpenLoader(false);
        }
    }

    useEffect(() => {
    }, [PromoOverview, overview])

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    return (
        <>
            <Loader setLoader={setLoader}></Loader>
            <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            <section className="promoOverviewMainContainer">
                <div className="promoOverviewContainer" style={{ backgroundColor: colorP.backGorund }}>
                    <div className="dateInputBox">
                        <Stack spacing={2} direction={'row'}>
                            <DatePickerV2 onChange={handleGetdateEven} />
                            <TextField
                                sx={{
                                    "& .MuiInputBase-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colorP.fourth + " !important",
                                            fontSize: ".18rem",
                                            borderRadius: "1rem",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            color: colorP.text4 + " !important",
                                            fontSize: ".18rem"
                                        },
                                        height: ".5rem",
                                    },
                                    "& .MuiFormLabel-root": {
                                        color: "#808080 !important",
                                        fontSize: ".18rem",
                                        lineHeight: ".3rem"
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        fontSize: ".18rem",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "2px solid !important",
                                            borderColor: colorP.forGround + " !important",
                                            fontSize: ".18rem"
                                        }
                                    }
                                }}
                                onChange={(account) => handleAccount(account.target.value)} size="small" id="outlined-basic" label={t("ts239", { ns: ["ts"] })} variant="outlined" />
                            <Button style={{
                                backgroundColor: colorP.forGround,
                                color: colorP.text2,
                                fontSize: ".18rem",
                                textTransform: "capitalize",
                                borderRadius: ".1rem"
                            }} variant='contained' onClick={getData} className="dateButton searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: ["ts"] })}</Button>
                        </Stack>
                    </div>
                    <div className="contentContainerBox">
                        <div className="miniBoxContainer">
                            <div className="miniBox" style={{ borderColor: "#313843", backgroundColor: colorP.third }}>
                                <div className="miniBoxLable" style={{ color: "#adb6c3" }}>{t("ts231", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxCurrent" style={{ color: colorP.forGround }}>{t("ts238", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxContent" style={{ color: colorP.text }}>{PromoOverview[0] ? PromoOverview[0].memberCount : "0"}</div>
                            </div>
                            <div className="miniBox" style={{ borderColor: "#313843", backgroundColor: colorP.third }}>
                                <div className="miniBoxLable" style={{ color: "#adb6c3" }}>{t("ts232", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxCurrent" style={{ color: colorP.forGround }}>({config2.moneyUnit})</div>
                                <div className="miniBoxLable miniBoxContent" style={{ color: "#FFAA09" }}>{PromoOverview[0] ? PromoOverview[0].teamMoney : "0"}</div>
                            </div>
                            <div className="miniBox" style={{ borderColor: "#313843", backgroundColor: colorP.third }}>
                                <div className="miniBoxLable" style={{ color: "#adb6c3" }}>{t("ts233", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxCurrent" style={{ color: colorP.forGround }}>({config2.moneyUnit})</div>
                                <div className="miniBoxLable miniBoxContent" style={{ color: "#EA4E3D" }}>{PromoOverview[0] ? PromoOverview[0].daily.depositAmount : "0"}</div>
                            </div>
                            <div className="miniBox" style={{ borderColor: "#313843", backgroundColor: colorP.third }}>
                                <div className="miniBoxLable" style={{ color: "#adb6c3" }}>{t("ts234", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxCurrent" style={{ color: colorP.forGround }}>({config2.moneyUnit})</div>
                                <div className="miniBoxLable miniBoxContent" style={{ color: "#04BE02" }}>{PromoOverview[0] ? PromoOverview[0].daily.withdrawAmount : "0"}</div>
                            </div>
                            <div className="miniBox" style={{ borderColor: "#313843", backgroundColor: colorP.third }}>
                                <div className="miniBoxLable" style={{ color: "#adb6c3" }}>{t("ts235", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxCurrent" style={{ color: colorP.forGround }}>({config2.moneyUnit})</div>
                                <div className="miniBoxLable miniBoxContent" style={{ color: "#EA4E3D" }}>{PromoOverview[0] ? PromoOverview[0].daily.depositArtificial : "0"}</div>
                            </div>
                            <div className="miniBox" style={{ borderColor: "#313843", backgroundColor: colorP.third }}>
                                <div className="miniBoxLable" style={{ color: "#adb6c3" }}>{t("ts236", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxCurrent" style={{ color: colorP.forGround }}>({config2.moneyUnit})</div>
                                <div className="miniBoxLable miniBoxContent" style={{ color: colorP.text }}>{PromoOverview[0] ? PromoOverview[0].daily.proxyRebateAmount : "0"}</div>
                            </div>
                            <div className="miniBox" style={{ borderColor: "#313843", backgroundColor: colorP.third }}>
                                <div className="miniBoxLable" style={{ color: "#adb6c3" }}>{t("ts237", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxCurrent" style={{ color: colorP.forGround }}>{t("ts238", { ns: ["ts"] })}</div>
                                <div className="miniBoxLable miniBoxContent" style={{ color: colorP.text }}>{PromoOverview[0] ? PromoOverview[0].betNum : "0"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="tableContainerOverView">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts239", { ns: ["ts"] })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts240", { ns: ["ts"] })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts241", { ns: ["ts"] })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts242", { ns: ["ts"] })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts243", { ns: ["ts"] })}</span></TableCell>
                                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts244", { ns: ["ts"] })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isData == true && overview.map((value: any, index: any) =>
                                    <TableRow key={index}>
                                        <TableCell><span style={{ display: "flex", alignItems: "center", gap: ".1rem" }}>{value.username} <img src="/navbarImages/copy.png" onClick={() => copyText(value.username)} style={{ width: ".2rem", cursor: "pointer" }} /></span></TableCell>
                                        <TableCell>{value.statDate}</TableCell>
                                        <TableCell>{value.depositAmount}</TableCell>
                                        <TableCell>{value.depositArtificial}</TableCell>
                                        <TableCell>{value.liveBetAmount}</TableCell>
                                        <TableCell>{value.liveBetNum}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {isData != true ? <NoData /> :
                            <div className="pagination" style={{ marginTop: ".2rem" }}>
                                <Pagination variant="outlined" shape="rounded" sx={{
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
                                }} count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}