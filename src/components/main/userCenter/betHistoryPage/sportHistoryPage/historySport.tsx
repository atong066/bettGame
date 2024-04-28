import { useEffect, useState } from "react";
import "../invite.css";
import axios from "axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../common/table";
import { Button, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import NoData from "../../../../noData/no-data";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import Loader from "../../../../backdropLoader/backdrop-loader";
import { ToastrPngk } from "../../../../globalFunctions/toastr";
function HistorySport(props: any) {
  const colorP = ChangeColorPallte()
  const { t, i18n } = useTranslation(["home", "main"]);
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [historySport, setHistorySport] = useState([]);
  const [isData, setIsData] = useState(false)
  const [setLoader, setOpenLoader] = useState(true);
  useEffect(() => {
    getData()
  }, [props.trigger])

  const getData = () => {
    setOpenLoader(true)
    try {
      axios.post('/userCenter/third/sportRecord.do', {
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
          setOpenLoader(false)
          ToastrPngk({ msg: result.data.msg, type: "error", id: "error" })
        }
        else {

          if (result.data.rows != '') {
            const totalPages = Math.ceil(result.data.total / 10)
            setPageCount(totalPages)
            setHistorySport(result.data.rows)
            setIsData(true)
            setOpenLoader(false)
          } else {
            setIsData(false)
            setOpenLoader(false)
          }
        }
      })
    } catch (e) {

    }

  }


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
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts094", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts095", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts034", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts406", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts096", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts097", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts098", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts099", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts100", { ns: ["ts"] })}</span></TableCell>
            <TableCell><span style={{ color: colorP.text4 }}>{t("ts101", { ns: ["ts"] })}</span></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isData == true && historySport ? historySport?.map((value: any, index: any) =>
            <TableRow key={index}>
              <TableCell>{value.platformType}</TableCell>
              <TableCell>
                <span style={{ display: "flex", alignItems: "center", gap: ".05rem", marginBottom: ".05rem" }}>{value.orderId} <img src="/navbarImages/copy.png" onClick={() => copyText(value.orderId)} style={{ width: ".2rem", cursor: "pointer" }} /></span>
                {timestampToTime(value.bettingTime)}
              </TableCell>
              <TableCell>{value.username}</TableCell>
              <TableCell>{value.odds ? value.odds : "-"}</TableCell>
              <TableCell>{value.realBettingMoney}</TableCell>
              <TableCell>{value.bettingMoney}</TableCell>
              <TableCell>{value.winMoney}</TableCell>
              <TableCell>{timestampToTime(value.winlostTime)}</TableCell>
              <TableCell>{value.status == "C" ? "Completed" : "Failed"}</TableCell>
              <TableCell><Button style={{ backgroundColor: colorP.forGround, color: colorP.text, fontSize: 11, lineHeight: "normal" }} size="small" variant="contained">View</Button></TableCell>
            </TableRow>
          ) : <TableRow ></TableRow>}
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

export default HistorySport;
