import axios from "axios";
import "../invite.css";
import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../common/table";
import { Pagination } from "@mui/material";
import NoData from "../../../../noData/no-data";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import { ToastrPngk } from "../../../../globalFunctions/toastr";
import Loader from "../../../../backdropLoader/backdrop-loader";
function ElectronicHistory(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [ElectronicHistory, setElectronicHistory] = useState([])
  const [isData, setIsData] = useState(false)
  const [setLoader, setOpenLoader] = useState(true);
  useEffect(() => {
    try {
      setOpenLoader(true);
      axios.post('/userCenter/third/egameRecord.do', {
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
        if (result.data.success == false) {
          setIsData(false)
          ToastrPngk({ msg: result.data.msg, type: "error", id: "error" })
          setOpenLoader(false);
        }
        else {
          if (result.data.rows != '') {
            const totalPages = Math.ceil(result.data.total / 10)
            setPageCount(totalPages)
            setElectronicHistory(result.data.rows)
            setIsData(true)
            setOpenLoader(false);

          } else {
            setIsData(false)
            setOpenLoader(false);

          }
        }

      })
    } catch (e) {

    }

  }, [currentPage, props.trigger])
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
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
  function copyText(text: any) {
    navigator.clipboard.writeText(text)
    ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
  }

  return (
    <>
      <Loader setLoader={setLoader}></Loader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts094", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts576", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts577", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts578", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts579", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts580", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts581", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts582", { ns: "ts" })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts583", { ns: "ts" })}</span></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isData == true && ElectronicHistory?.map((value: any, index: any) =>
            <TableRow key={index}>
              <TableCell>{value.platformType}</TableCell>
              <TableCell>{value.gameName}</TableCell>
              <TableCell>
                <span style={{ display: "flex", alignItems: "center", gap: ".05rem", marginBottom: ".05rem" }}>{value.orderId} <img src="/navbarImages/copy.png" onClick={() => copyText(value.orderId)} style={{ width: ".2rem", cursor: "pointer" }} /></span>
                {timestampToTime(value.bettingTime)}
              </TableCell>
              <TableCell>{value.username}</TableCell>
              <TableCell>{value.gameCode}</TableCell>
              <TableCell>{value.realBettingMoney}</TableCell>
              <TableCell>{value.bettingMoney}</TableCell>
              <TableCell>{value.winMoney}</TableCell>
              <TableCell>{timestampToTime(value.createDatetime)}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isData != true ? <NoData padding={"1rem 0 0 0"} /> :
        <div className="pagination" style={{ paddingTop: ".2rem" }}>
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
            }} count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
        </div>
      }
    </>
  );
}

export default ElectronicHistory;
