import { Button, Checkbox, FormControl, FormControlLabel, ListItemText, MenuItem, OutlinedInput, Stack, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useMemo, useReducer, useState } from "react"
import Selects from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { dates } from '../common/selectOtions'
import Pagination from '@mui/material/Pagination';
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../common/table";
import DateModal from "../../common/dateModal";
import { addDays } from 'date-fns';
import { ChangeReportTypes, DatePicker, DatePickerV2 } from "../../common/components/dropdownComponent";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import NoData from "../../../noData/no-data";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import Loader from "../../../backdropLoader/backdrop-loader";
import { useGetChangeReportType, useGetMonHistory } from "../../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../../globalFunctions/toastr";
function AccountDetailsComponent() {
    const { t } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [alertModal, setAlertModal] = useState(false)
    const [remarks, setRemarks] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [accountName, setAccountName] = useState("")
    const [includType, setIncludeType] = useState(false)

    const [reportType, setReportType] = useState('')

    const changeReportType = (e: any) => {
        setReportType(e.value)
    }

    const getMoneyHistory = useGetMonHistory()

    const payload = {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageNumber: currentPage,
        types: reportType,
        username: accountName,
        include: includType
    }

    useEffect(() => {
        getMoneyHistory.mutate(payload)
    }, [currentPage])

    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })
    }
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const handleAccountNameChange = (value: any) => {
        setAccountName(value)
    };
    const handleJoinType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeType(event.target.checked);
    };

    function handleOpenModal(e: any) {
        setRemarks(e)
        setAlertModal(true)
    }
    function closeModal() {
        setAlertModal(false)
    }

    const getType = useGetChangeReportType()
    useEffect(() => {
        getType.refetch()
    }, [])

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    return (
        <>
            <Loader setLoader={getMoneyHistory.isLoading} />
            <div style={{ padding: ".2rem" }}>
                <AlertModal alertMode="alertDefault" openAlert={alertModal} closeAlert={closeModal} alertTitle={t("ts063", { ns: "ts" })}>
                    <div className="alertContainer" style={{ width: "6rem" }}>
                        {remarks}
                    </div>
                </AlertModal>
                <div className="accntActions">
                    <Stack useFlexGap style={{ flexWrap: "wrap" }} spacing={2} direction={"row"}>
                        <DatePickerV2 onChange={handleGetdateEven} placeholder="Today" options={dates} />
                        <ChangeReportTypes onChange={changeReportType} />
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
                            placeholder={t("ts109", { ns: "ts" })}
                            value={accountName} id="outlined-basic" variant="outlined" size="small" onChange={(e) => handleAccountNameChange(e.target.value)} />
                        <FormControlLabel
                            sx={{
                                color: colorP.text,
                                ".MuiCheckbox-root": {
                                    color: colorP.fourth + " !important",
                                },
                                ".MuiCheckbox-root.Mui-checked": {
                                    color: "#04be02 !important",
                                },
                                ".MuiSvgIcon-root": {
                                    fontSize: ".25rem"
                                },
                                ".MuiTypography-root": {
                                    fontSize: ".18rem",
                                    color: "#adb6c3"
                                },
                            }}
                            label={t("ts108", { ns: "ts" })}
                            control={<Checkbox checked={includType} onChange={handleJoinType} />} />
                        <Button style={{
                            backgroundColor: colorP.forGround,
                            color: colorP.text2,
                            fontSize: ".18rem",
                            textTransform: "capitalize",
                            borderRadius: ".1rem"
                        }} onClick={() => getMoneyHistory.mutate(payload)} variant='contained' className="searchButtonAccountChagne" startIcon={<SearchIcon />}>{t("ts042", { ns: "ts" })}</Button>
                    </Stack>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts034", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts073", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts060", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts061", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts062", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts063", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts064", { ns: ["ts"] })}</span></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getMoneyHistory.isLoading == false && !!getMoneyHistory?.data?.data?.page && getMoneyHistory?.data?.data?.page?.rows.map((value: any, index: any) =>
                            <TableRow key={index} className="tableRow">
                                <TableCell><span style={{ display: "flex", alignItems: "center", gap: ".1rem" }}>{value.username} <img src="/navbarImages/copy.png" onClick={() => copyText(value.username)} style={{ width: ".2rem", cursor: "pointer" }} /></span></TableCell>
                                <TableCell>{value.createDatetimeStr}</TableCell>
                                <TableCell><span style={{ color: "#04BE02" }}>{value.add == true ? value.money : "-"}</span></TableCell>
                                <TableCell><span style={{ color: "#EA4E3D" }}>{value.add == false ? value.money : "-"}</span></TableCell>
                                <TableCell><span style={{ color: "#FFAA09" }}>{value.afterMoney}</span></TableCell>
                                <TableCell>{value.typeCn}</TableCell>
                                <TableCell className="details" ><Button variant="outlined" size="small" style={{ backgroundColor: "none", color: "#68707b", fontSize: 11, textTransform: "capitalize", border: "none" }} className="muiButton" onClick={() => handleOpenModal(value.remark)}>{t("ts064", { ns: "ts" })}</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {getMoneyHistory?.data?.data.success == false || getMoneyHistory?.data?.data.page.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
                    <div className="pagination" style={{ paddingTop: ".2rem" }}>
                        <Pagination variant="outlined" shape="rounded" sx={{
                            ".MuiButtonBase-root": {
                                height: ".4rem",
                                width: ".4rem",
                                color: colorP.text4 + "!important",
                                borderRadius: ".06rem",
                                border: "",
                                borderColor: "#313843",
                                fontSize: ".18rem",
                                " .MuiSvgIcon-root":{
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
                        }} count={getMoneyHistory?.data?.data.page ? Math.ceil(getMoneyHistory?.data?.data.page.total / getMoneyHistory?.data?.data.page.pageSize) : 0} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                    </div>
                }
                <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            </div>
        </>
    )
}

export default AccountDetailsComponent;