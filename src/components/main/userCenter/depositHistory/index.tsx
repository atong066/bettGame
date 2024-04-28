import axios from "axios";
import Select from 'react-select'
import { useEffect, useReducer, useState } from "react";
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../common/table";
import { Button, Checkbox, FormControlLabel, Pagination, TextField } from "@mui/material";
import { statuses, depositMethod } from "../common/selectOtions";
import SearchIcon from '@mui/icons-material/Search';
import { getDatetoday, lastMonth } from "../common/dateRangepicker";
import { DatePicker, DatePickerV2, StatusPicker } from "../../common/components/dropdownComponent";
import { useTranslation } from 'react-i18next';
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import DateModal from "../../common/dateModal";
import NoData from "../../../noData/no-data";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import Loader from "../../../backdropLoader/backdrop-loader";
import { useGetDepositReport } from "../../../hooks/getUserInfoHook";
import { useGlobalVariables } from "../../../globalFunctions/store";
function DepositHisotry(props: any) {
  const colorP = ChangeColorPallte()
  const userInfo = useGlobalVariables(state => state.userDetails)
  const [historySport, setHistorySport] = useState([]);
  const [startDate, setStartDate] = useState(getDatetoday()[0])
  const [endDate, setEndDate] = useState(getDatetoday()[1])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [accountName, setAccountName] = useState("")
  const [orderID, setOrderID] = useState("")
  const [depoStatus, setDepoStatus] = useState('')
  const [setLoader, setOpenLoader] = useState(false);
  const { t, i18n } = useTranslation(["home", "main"]);
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  const [isData, setIsData] = useState(false)
  const handleGetdateEven = (e: any) => {
    console.log(e)
    dispatch({ type: e.value, dates: e })
  }
  const payload = {
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageNumber: currentPage,
    orderId: orderID,
    username: accountName,
    status: depoStatus,
  }

  const getGetDepositRep = useGetDepositReport()

  useEffect(() => {
    if (userInfo?.isLogin === true) {
      getGetDepositRep.mutate(payload)
    }

  }, [currentPage, startDate, endDate])

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleAccountNameChange = (value: any) => {
    setAccountName(value)
  };
  const handleDepoID = (value: any) => {
    setOrderID(value);
  };
  const getType = (arrType: any, type: any) => {
    if (arrType == 2) {
      const selType = statuses.find((item: any) => item.value == type)
      return selType ? t(selType.label, { ns: ["ts"] }) : ""
    }
    else if (arrType == 1) {
      const selType = depositMethod.find((item: any) => item.value == type)
      return selType ? t(selType.label, { ns: ["ts"] }) : ""
    }
  }
  const handleStatus = (e: any) => {
    setDepoStatus(e.value)
  }
  return (
    <>
      <Loader setLoader={setLoader}></Loader>
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      <div >
        <div className="accntActionsContainer">
          <DatePickerV2 onChange={handleGetdateEven} />
          {!props.hidden && <TextField
            sx={{
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorP.forGround + " !important",
                  fontSize: ".18rem",
                },
                "& .MuiOutlinedInput-input": {
                  color: colorP.text + " !important",
                  fontSize: ".18rem"
                },
              },
              "& .MuiFormLabel-root": {
                color: "#808080 !important",
                fontSize: ".18rem",

              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid !important",
                  borderColor: colorP.forGround + " !important",
                  fontSize: ".18rem",

                }
              }
            }}
            value={accountName} id="outlined-basic" label={t("ts109", { ns: ["ts"] })} variant="outlined" size="small" onChange={(e) => handleAccountNameChange(e.target.value)} />}
          {!props.hidden && <TextField
            sx={{
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorP.forGround + " !important",
                  fontSize: ".18rem",

                },
                "& .MuiOutlinedInput-input": {
                  color: colorP.text + " !important",
                  fontSize: ".18rem",

                },
              },
              "& .MuiFormLabel-root": {
                color: "#808080 !important",
                fontSize: ".18rem",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid !important",
                  borderColor: colorP.forGround + " !important",
                  fontSize: ".18rem",
                }
              }
            }}
            value={orderID} id="outlined-basic" label={t("ts187", { ns: ["ts"] })} variant="outlined" size="small" onChange={(e) => handleDepoID(e.target.value)} />}
          {!props.hidden && <StatusPicker onChange={handleStatus} />}
          {!props.hidden && <Button style={{ backgroundColor: colorP.forGround, color: colorP.text,  fontSize: ".16rem", }} onClick={() => getGetDepositRep.mutate(payload)} variant='contained' className="searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: ["ts"] })}</Button>}
        </div>
        <Table>
          <TableHeader>
            {getGetDepositRep?.data?.success == false || getGetDepositRep?.data?.rows == '' ? "" : <TableRow>
              <TableCell>{t("ts035", { ns: ["ts"] })}</TableCell>
              <TableCell>{t("ts034", { ns: ["ts"] })}</TableCell>
              <TableCell>{t("ts048", { ns: ["ts"] })}</TableCell>
              <TableCell>{t("ts049", { ns: ["ts"] })}</TableCell>
              <TableCell>{t("ts050", { ns: ["ts"] })}</TableCell>
              <TableCell>{t("ts051", { ns: ["ts"] })}</TableCell>
              <TableCell>{t("ts052", { ns: ["ts"] })}</TableCell>
            </TableRow>}
          </TableHeader>
          <TableBody>
            {getGetDepositRep.isLoading == false && !!getGetDepositRep?.data && getGetDepositRep?.data?.rows?.map((value: any, index: any) =>
              <TableRow key={index}>
                <TableCell>{value.orderId}</TableCell>
                <TableCell>{value.username}</TableCell>
                <TableCell>{value.createDatetime}</TableCell>
                <TableCell>{value.money}</TableCell>
                <TableCell>{getType(1, value.depositType)}</TableCell>
                <TableCell>{getType(2, value.status)}</TableCell>
                <TableCell>{value.remark}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {getGetDepositRep?.data?.success == false || getGetDepositRep?.data?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
          <div className="pagination">
            <Pagination variant="outlined" shape="rounded" sx={{
                                            ".MuiButtonBase-root": {
                                                height: ".4rem",
                                                width: ".4rem",
                                                color: "nude",
                                                borderRadius:".06rem",
                                                border:"",
                                                borderColor:"#313843",
                                                fontSize:".18rem"
                                            },
                                            ".MuiButtonBase-root.Mui-selected": {
                                                backgroundColor: colorP.forGround,
                                                color: "#874404 !important",
                                                borderColor:colorP.forGround
                                            },
                                            ".MuiButtonBase-root.Mui-selected:hover": {
                                                backgroundColor: colorP.forGround
                                            },
                                        }}  count={getGetDepositRep?.data ? Math.ceil(getGetDepositRep?.data?.total / getGetDepositRep?.data?.pageSize) : 0} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
          </div>
        }
      </div>
    </>
  )
}
export default DepositHisotry;