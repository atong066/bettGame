import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../../common/table";
import { Button, Pagination, TextField } from "@mui/material";
import { statuses, withdrawStatuses } from "../../common/selectOtions";
import { dates } from "../../../common/selectOtions";
import SearchIcon from '@mui/icons-material/Search';
import { dateReducer, initialDate } from "../../../reducers/dateReduce";
import DateModal from "../../../common/dateModal";
import { NotificationContainer, NotificationManager, } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { DatePicker, Statuses } from "../../../common/components/dropdownComponent";
import NoData from "../../../../noData/no-data";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import { useGetWithdrawHistory } from "../../../../hooks/getUserInfoHook";
import Loader from "../../../../backdropLoader/backdrop-loader";
function WithdrawHistory(props: any) {
  const { t } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  // const [historySport, setHistorySport] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [accountName, setAccountName] = useState("")
  const [orderID, setOrderID] = useState("")
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  const [isData, setIsData] = useState(false)

  const payload = {
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageNumber: currentPage,
    orderId: orderID,
    username: accountName,
  }

  const getWithdrawalHistory = useGetWithdrawHistory()

  const historySport = getWithdrawalHistory?.data?.data

  async function getPersonalReport() {
    try {
      const response = await axios.post('/userCenter/report/withdrawRecordList.do', {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageNumber: currentPage,
        orderId: orderID,
        username: accountName,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      if (response.data.rows) {
        if (response.data.rows.length !== 0) {
          setIsData(true)
          setPageCount(response.data.totalPageCount)
        } else {
          setIsData(false)
        }
      }
    } catch (e) {
      console.log(e)
    }

  }
  useEffect(() => {
    getWithdrawalHistory.mutate(payload)
  }, [currentPage])
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleAccountNameChange = (value: any) => {
    setAccountName(value)
  };
  const handleDepoID = (value: any) => {
    setOrderID(value);
  };
  const getType = (type: any) => {
    const selType = withdrawStatuses.find((item: any) => item.value === type)
    return selType ? t(selType.label, { ns: ["ts"] }) : ""
  }
  const handleGetdateEven = (e: any) => {
    dispatch({ type: e.value, dates: e })
  }
  return (
    <>
      <Loader setLoader={getWithdrawalHistory.isLoading} />
      <NotificationContainer />
      <div style={{ padding: "1rem" }}>
        <div className="accntActions">
          <DatePicker options={dates} onChange={handleGetdateEven} />
          <TextField sx={{
            "& .MuiInputBase-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colorP.forGround + " !important"
              },
              "& .MuiOutlinedInput-input": {
                color: colorP.text + " !important"
              },
            },
            "& .MuiFormLabel-root": {
              color: "#808080 !important"
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid !important",
                borderColor: colorP.forGround + " !important"
              }
            }
          }}
            value={accountName} id="outlined-basic" label={t("ts034", { ns: "ts" })} variant="outlined" size="small" onChange={(e) => handleAccountNameChange(e.target.value)} />
          <TextField sx={{
            "& .MuiInputBase-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colorP.forGround + " !important"
              },
              "& .MuiOutlinedInput-input": {
                color: colorP.text + " !important"
              },
            },
            "& .MuiFormLabel-root": {
              color: "#808080 !important"
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid !important",
                borderColor: colorP.forGround + " !important"
              }
            }
          }}
            value={orderID} id="outlined-basic" label={t("ts035", { ns: "ts" })} variant="outlined" size="small" onChange={(e) => handleDepoID(e.target.value)} />
          <Statuses options={statuses} />
          <Button style={{ backgroundColor: colorP.forGround, color: colorP.text }} onClick={() => getWithdrawalHistory.mutate(payload)} variant='contained' className="searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: "ts" })}</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>{t("ts187", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts188", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts189", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts190", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts191", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts192", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts193", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts194", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts195", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts196", { ns: "ts" })}</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getWithdrawalHistory.isLoading == false && historySport && historySport?.rows?.map((value: any, index: any) =>
              <TableRow>
                <TableCell>{value.orderId}</TableCell>
                <TableCell>{value.username}</TableCell>
                <TableCell>{value.createDatetime}</TableCell>
                <TableCell>{value.drawMoney}</TableCell>
                <TableCell>{value.trueMoney}</TableCell>
                <TableCell>{value.feeMoney}</TableCell>
                <TableCell>{value.bankName}</TableCell>
                <TableCell>{value.cardNo}</TableCell>
                <TableCell>{getType(value.status)}</TableCell>
                <TableCell>{value.remark}</TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
        {historySport?.success == false || historySport?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
          <div className="pagination">
            <Pagination  variant="outlined" shape="rounded" sx={{
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
                                        }}  count={historySport?Math.ceil(historySport?.total / historySport?.pageSize):0} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
          </div>
        }
        <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      </div>
    </>
  )
}
export default WithdrawHistory;