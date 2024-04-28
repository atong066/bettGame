import MainLayout from "../../../layout";
import "../invite.css";
import Select from 'react-select'
import { Button, Pagination, SelectChangeEvent } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { addDays } from 'date-fns';
import { getDatetoday, lastMonth, getdatYesturday, thisWeek, thisMonth, lastWeek } from "../../userCenter/common/dateRangepicker";
import { Table, TableBody, TableHeader, TableRow, TableCell } from "../../userCenter/common/table";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { transferStatus, dates, transferType, platforms } from "../../userCenter/common/selectOtions";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import DateModal from "../../common/dateModal";
import NoData from "../../../noData/no-data";
import { DatePicker, DatePickerV2, SelectPlatforms, TransferStatus, TransferType } from "../../common/components/dropdownComponent";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import Loader from "../../../backdropLoader/backdrop-loader";
export default function RedRecord() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [points, setPoints] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [endDate, setEndDate] = useState(getDatetoday()[1])
  const [currentPage, setCurrentPage] = useState(1)
  const [transferTypeData, settransferTypeData] = useState('')
  const [thirdData, setthirdData] = useState('')
  const [statusData, setstatusData] = useState('')
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  const [isData, setIsData] = useState(false)
  const [setLoader, setOpenLoader] = useState(true);
  const handleGetdateEven = (e: any) => {
    console.log(e)
    dispatch({ type: e.value, dates: e })
  }
  async function getScoreHistory() {
    setOpenLoader(true)
    const response = await axios.post('/userCenter/redpacket/getUserRedPacketRecordPage.do', {
      startTime: commonReducer.startDate,
      endTime: commonReducer.endDate,
      pageNumber: currentPage,
      pageSize: 10
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    if (response.data.rows != '') {
      const totalPages = Math.ceil(response.data.total / 10)
      setPageCount(totalPages)
      setPoints(response.data.rows)
      setIsData(true)
      setOpenLoader(false)
    } else {
      setIsData(false)
      setPageCount(0)
      setOpenLoader(false)
    }

  }
  useEffect(() => {
    getScoreHistory()
  }, [endDate, currentPage])

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const getType = (type: any) => {
    const selType = transferStatus.find((item: any) => item.value == type)
    return selType ? t(selType.label, { ns: ["ts"] }) : ""
  }
  const handleTransType = (e: any) => {
    settransferTypeData(e.value)
  }
  const handleThirdType = (e: any) => {
    setthirdData(e.value)
  }
  const handleStatusType = (e: any) => {
    setstatusData(e.value)
  }
  const getTypes = (type: any, platform: any) => {
    console.log(type, platform)
    if (type == 1) {
      const selType = transferType.find((item: any) => item.value == type)
      const platformtype = platforms.find((item: any) => item.value == platform)
      if (selType) {
        if (platformtype) {
          return t("ts401", { ns: "ts" }) + " " + platformtype.label + " " + t("ts402", { ns: "ts" })
        }
      }

    }
    else {
      const selType = transferType.find((item: any) => item.value == type)
      const platformtype = platforms.find((item: any) => item.value == platform)
      if (selType) {
        if (platformtype) {
          return " " + t("ts403", { ns: "ts" }) + " " + platformtype.label
        }
      }
    }
  }

  const getplatforms = (type: any) => {
    const selType = platforms.find((item: any) => item.value == type)
    return selType ? selType.label : ""
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
  return (
    <>
      <Loader setLoader={setLoader}></Loader>
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      <div className="invite-body transferRecordMain">
        <div className="invite-button-content">
          <div className="accntActions transActions">
            <DatePickerV2 onChange={handleGetdateEven} />
            <Button style={{
              backgroundColor: colorP.forGround,
              color: colorP.text2,
              fontSize: ".18rem",
              textTransform: "capitalize",
              borderRadius: ".1rem"
            }} onClick={getScoreHistory} variant='contained' className="searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: "ts" })}</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts034", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts073", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts178", { ns: "ts" })}</span></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isData == true && points.map((value: any, index: any) =>
                <TableRow key={index}>
                  <TableCell>{value.username}</TableCell>
                  <TableCell>{timestampToTime(value.createDatetime)}</TableCell>
                  <TableCell>{value.money}</TableCell>
                </TableRow>
              )
              }
            </TableBody>
          </Table>
          {isData != true ? <NoData padding={"1rem 0 0 0"} /> :
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
    </>
  );
}
