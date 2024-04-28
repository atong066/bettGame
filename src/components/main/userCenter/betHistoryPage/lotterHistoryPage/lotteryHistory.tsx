import axios from "axios";
import { useState, useEffect } from "react";
import MainLayout from "../../../../layout";
import "../invite.css";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../common/table";
import { Button, Pagination } from "@mui/material";
import { betStatus } from "../../../common/selectOtions";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import NoData from "../../../../noData/no-data";
import Loader from "../../../../backdropLoader/backdrop-loader";
import { ToastrPngk } from "../../../../globalFunctions/toastr";
function LotteryHistory(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [LotteryHistory, setLotteryHistory] = useState([])
  const [isData, setIsData] = useState(false)
  const [setLoader, setOpenLoader] = useState(true);
  useEffect(() => {
    getData()
  }, [props.trigger, currentPage])
  const getData = () => {
    try {
      axios.post('/userCenter/third/lotRecord.do', {
        startTime: props.commonAPI.startDate,
        endTime: props.commonAPI.endDate,
        username: props.accounts,
        orderId: props.orderNos,
        pageSize: "10",
        pageNumber: currentPage,
        load: true,
        platform: props.platform,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then((result) => {
        console.log(result)
        if (result.data.success == false) {
          setIsData(false)
          ToastrPngk({ msg: result.data.msg, type: "error", id: "error" })
          setOpenLoader(false);
          return
        }
        if (result.data.rows != '') {

          const totalPages = Math.ceil(result.data.total / 10)
          setPageCount(totalPages)
          setLotteryHistory(result.data.rows)
          setIsData(true)
          setOpenLoader(false);

        } else {
          setIsData(false)
          setOpenLoader(false);

        }
      })
    } catch (e) {
      setOpenLoader(false);

    }

  }
  const getStatuss = (type: any) => {
    const selType = betStatus.find((item: any) => item.value == type)
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
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  function copyText(text: any) {
    navigator.clipboard.writeText(text)
    ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
  }
  console.log(LotteryHistory)
  return (
    <>
      <Loader setLoader={setLoader}></Loader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts094", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts095", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts578", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts586", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts580", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts581", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts582", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts092", { ns: ["ts"] })}</span></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isData == true && LotteryHistory?.map((value: any, index: any) =>
            <TableRow key={index}>
              <TableCell>{value.platformType}</TableCell>
              <TableCell>{value.createDatetimeStr}</TableCell>
              <TableCell>{value.username}</TableCell>
              <TableCell>{value.playName}</TableCell>
              <TableCell>{value.bettingMoney}</TableCell>
              <TableCell>{value.realBettingMoney}</TableCell>
              <TableCell>{value.winMoney}</TableCell>
              <TableCell>{getStatuss(value.status)}</TableCell>
            </TableRow>
          )}
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
    </>
  );
}

export default LotteryHistory;
