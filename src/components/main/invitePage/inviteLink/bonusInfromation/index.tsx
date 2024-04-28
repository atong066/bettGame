
import { Button, Checkbox, FormControl, FormControlLabel, Pagination, Stack, TextField } from "@mui/material";
import { getDatetoday, lastMonth, getdatYesturday, thisWeek, thisMonth, lastWeek } from "../../../userCenter/common/dateRangepicker";
import Select from 'react-select'
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../../../userCenter/common/table";
import { dates } from "../../../common/selectOtions";
import { addDays } from 'date-fns';
import { dateReducer, initialDate } from "../../../reducers/dateReduce";
import { DatePicker, DatePickerV2 } from "../../../common/components/dropdownComponent";
import DateModal from "../../../common/dateModal";
import AlertModal from "../../../common/modal/alert-modal/alert-modal";
import NoData from "../../../../noData/no-data";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte, UserUSerConfig } from "../../../../globalFunctions/globalContext";
import { useGetBonusInfo, useStationConfig } from "../../../../hooks/getUserInfoHook";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../../../backdropLoader/backdrop-loader";

function BonusInformation() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    // const [bonusDatainfo, setBonusInfo] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [isData, setIsData] = useState(false)

    const currency = useStationConfig()

    const getBonusInfo = useGetBonusInfo()
    const bonusDatainfo = getBonusInfo?.data

    const payload = {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageSize: "10",
        pageNumber: currentPage,
    }

    useEffect(() => {
        getBonusInfo.mutate(payload)
    }, [currentPage])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const handleGetdateEven = (e: any) => {
        console.log(e)
        dispatch({ type: e.value, dates: e })
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
    console.log(bonusDatainfo)
    return (
        <>
            <Loader setLoader={getBonusInfo.isLoading}></Loader>
            <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
            <div style={{ padding: ".2rem" }}>
                <div className="accntActions">
                    <FormControl sx={{ minWidth: 230 }} size="small">
                        <Stack direction={"row"} spacing={2}>
                            <DatePickerV2 options={dates} onChange={handleGetdateEven} />
                            <Button style={{ backgroundColor: colorP.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: colorP.text2 }} onClick={() => getBonusInfo.mutate(payload)} variant='contained' className="searchButton" startIcon={<SearchIcon style={{ height: ".2rem", width: ".2rem" }} />}>{t("ts042", { ns: ["ts"] })}</Button>
                        </Stack>
                    </FormControl>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts073", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts109", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts398", { ns: ["ts"] })}</span></TableCell>
                            <TableCell><span style={{ color: colorP.text4 }}>{t("ts399", { ns: ["ts"] })}</span></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getBonusInfo.isLoading == false && bonusDatainfo && bonusDatainfo?.content?.rows?.map((value: any, index: any) =>
                            <TableRow>
                                <TableCell>{timestampToTime(value.createDatetime)}</TableCell>
                                <TableCell>{value.bonusType == 12 ? value.oriUsername : value.username}</TableCell>
                                <TableCell>{value.bonusTypeText}</TableCell>
                                <TableCell>{currency?.data?.data.moneyUnit + " " + value.money}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {bonusDatainfo?.content?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
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
                            count={Math.ceil(bonusDatainfo?.content?.total / 10)} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                    </div>
                }
            </div>
        </>
    )
}
export default BonusInformation;