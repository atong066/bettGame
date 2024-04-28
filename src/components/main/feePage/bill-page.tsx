
import { Pagination } from '@mui/material';
import NoData from '../../noData/no-data';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../userCenter/common/table';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import { useTranslation } from "react-i18next";
import { DatePicker, DatePickerV2 } from "../common/components/dropdownComponent";
import { dateReducer, initialDate } from "../reducers/dateReduce";
import DateModal from "../common/dateModal";
import { Button, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import Loader from '../../backdropLoader/backdrop-loader';
import { ToastrPngk } from '../../globalFunctions/toastr';
import { useGlobalVariables } from '../../globalFunctions/store';

export default function BillPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)

    const userDetails = useGlobalVariables(state => state.userDetails)

    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })
    }

    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [balance, setbalance] = useState([])
    const [isData, setIsData] = useState(false)
    const [setLoader, setOpenLoader] = useState(true);

    useEffect(() => {
        getEarnings()
    }, [currentPage, commonReducer])

    async function getEarnings() {
        setOpenLoader(true)
        try {
            const response = await axios.get('/userCenter/userCenterBill/moneyIncomeList.do', {
                params: {
                    startTime: commonReducer.startDate,
                    endTime: commonReducer.endDate,
                    pageNumber: currentPage
                },
                headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
            })
            const totalPages = Math.ceil(response.data.total / 10)
            setPageCount(totalPages)
            if (response.data.rows != '') {
                setbalance(response.data.rows)
                setIsData(true)
                setOpenLoader(false)
            } else {
                setIsData(false)
                setOpenLoader(false)
            }
        } catch (error) {
            ToastrPngk({ msg: error, type: "error", id: "bal01" })
        }
    }
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    return (
        <>
            <Loader setLoader={setLoader}></Loader>
            <div className='registrationMainContainer'>
                <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
                <Stack padding={"0 0 .2rem 0"} spacing={2} direction={"row"}>
                    <DatePickerV2 onChange={handleGetdateEven} />
                    {/* <Button style={{ backgroundColor: colorP.forGround,fontSize:".18rem",textTransform:"capitalize",borderRadius:".1rem",color:"#874404" }} className="bonusSearchButton" onClick={getEarnings} variant="contained"><SearchIcon style={{height:".2rem",width:".2rem"}} />{t("ts042", { ns: "ts" })}</Button> */}
                </Stack>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>{t("ts520", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts521", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts522", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts523", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts524", { ns: "ts" })} (‱)</TableCell>
                            <TableCell>{t("ts525", { ns: "ts" })}</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isData == true && balance?.map((value: any, index: any) =>
                            <TableRow key={index}>
                                <TableCell>{value.statDate}</TableCell>
                                <TableCell>{value.username}</TableCell>
                                <TableCell>{value.balance}</TableCell>
                                <TableCell>{value.betRate}</TableCell>
                                <TableCell>{value.scale}‱</TableCell>
                                <TableCell>{value.income}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {isData != true || userDetails?.isLogin == false ? <NoData padding={".1rem 0 0 0"} /> :
                    <div className="pagination" style={{ paddingTop: ".2rem" }}>
                        <Pagination
                            variant="outlined" shape="rounded" sx={{
                                ".MuiButtonBase-root": {
                                    height: ".4rem",
                                    width: ".4rem",
                                    color: "nude",
                                    borderRadius: ".06rem",
                                    border: "",
                                    borderColor: "#313843",
                                    fontSize: ".18rem"
                                },
                                ".MuiButtonBase-root.Mui-selected": {
                                    backgroundColor: colorP.forGround,
                                    color: colorP.text2,
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
        </>
    )
}