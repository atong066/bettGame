import { Button, Pagination, Stack, colors } from "@mui/material";
import MainLayout from "../../layout";
import "./record.css";
import { Link } from "react-router-dom";
import { HeaderWithAction } from "../common/header";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import NoData from "../../noData/no-data";
import { DatePickerV2, DatesPicker, DatesPickers, RecordStatus } from "../common/components/dropdownComponent";
import DateModal from "../common/dateModal";
import { useEffect, useReducer, useState } from "react";
import { dateReducer, initialDate, initialMonth } from "../reducers/dateReduce";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import axios from "axios";
import Loader from "../../backdropLoader/backdrop-loader";
import SearchIcon from '@mui/icons-material/Search';
import AlertModal from "../common/modal/alert-modal/alert-modal";

export default function Record() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)

  const [records, setRecords] = useState([])
  const [isData, setIsData] = useState(false)
  const [sum, setSum] = useState(0)
  const [setLoader, setOpenLoader] = useState(true);

  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [secType, setSecType] = useState()

  const handleGetdateEven = (e: any) => {
    dispatch({ type: e.value, dates: e })
  }

  const handleStatus = (e: any) => {
    setSecType(e.value)
  }

  async function getData() {
    setOpenLoader(true);
    try {
      const response = await axios.post('/userCenter/report/getActPage.do', {
        secType: secType,
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageSize: 10,
        pageNumber: currentPage,
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      if (response.data.rows != '') {
        setSum(response.data.rows?.reduce((acc: any, current: any) => acc + current.money, 0))
        const totalPages = Math.ceil(response.data.total / 10)
        setRecords(response.data.rows)
        setPageCount(totalPages)
        setIsData(true)
        setOpenLoader(false);
      } else {
        setIsData(false)
        setOpenLoader(false);
        setSum(0)
      }
    } catch (error) {
      setOpenLoader(false);
      setSum(0)
    }
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getData()
  }, [sum, currentPage])

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

  const [remark, setRemark] = useState<any>([])
  const [openRemark, setOpenRemark] = useState(false)

  const closeRemark = () => {
    setOpenRemark(false)
  }
  const getRemark = (type: any) => {
    setRemark(type)
    setOpenRemark(true)
  }

  return (
    <MainLayout>
      <Loader setLoader={setLoader}></Loader>
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      <AlertModal hasConfirm={false} openAlert={openRemark} alertTitle={t("ts329", { ns: "ts" })} closeAlert={closeRemark}>
        <div style={{ width: "5rem", height: "2rem" }}>
          <div className="recordPageBox">
            <div className="labelPageBox pageBoxLabel1"><span className="pageBoxLabel">ID</span></div>
            <div className="labelPageBox"><span className="pageBoxLabel pageBoxContent">{remark?.id}</span></div>
          </div>
          <div className="recordPageBox">
            <div className="labelPageBox pageBoxLabel1"><span className="pageBoxLabel">Nome da recompensa</span></div>
            <div className="labelPageBox"><span className="pageBoxLabel pageBoxContent" style={{ color: "#04BE02" }}>{remark?.typeStr}</span></div>
          </div>
          <div className="recordPageBox">
            <div className="labelPageBox pageBoxLabel1"><span className="pageBoxLabel">Quantidade</span></div>
            <div className="labelPageBox"><span className="pageBoxLabel pageBoxContent" style={{ color: "#FFAA09" }}>{remark?.money}</span></div>
          </div>
          <div className="recordPageBox">
            <div className="labelPageBox pageBoxLabel1"><span className="pageBoxLabel">Tempo de bônus</span></div>
            <div className="labelPageBox"><span className="pageBoxLabel pageBoxContent">{timestampToTime(remark?.createDatetime)}</span></div>
          </div>
          {/* <div className="recordPageBox">
            <div className="labelPageBox"><span className="pageBoxLabel">ID</span></div>
            <div className="labelPageBox"><span className="pageBoxLabel pageBoxContent">{remark?.id}</span></div>
          </div>
          <div className="recordPageBox">
            <div className="labelPageBox"><span className="pageBoxLabel">ID</span></div>
            <div className="labelPageBox"><span className="pageBoxLabel pageBoxContent">{remark?.id}</span></div>
          </div> */}
        </div>
      </AlertModal>
      <section className="recordMainContainer">
        <HeaderWithAction>{t("ts456", { ns: "ts" })}</HeaderWithAction>
        <div className="recordContainer" style={{ backgroundColor: colorP.backGorund }}>
          <div className="topBox">
            <Stack direction={"row"} spacing={2}>
              <DatePickerV2 defaultValue={t("ts031", { ns: ["ts"] })} onChange={handleGetdateEven} />
              <RecordStatus onChange={handleStatus} />
              {/* <Button onClick={getData} style={{ backgroundColor: colorP.forGround, fontWeight: 600 }} variant="contained"><SearchIcon />{t("ts042", { ns: "ts" })}</Button> */}
              <Button style={{ backgroundColor: colorP.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: colorP.text2 }} onClick={getData} variant='contained' className="searchButton" startIcon={<SearchIcon style={{ height: ".2rem", width: ".2rem" }} />}>{t("ts042", { ns: ["ts"] })}</Button>

            </Stack>
            <div className="labelBox">
              <label className="labelTitle" style={{ color: colorP.text4 }}>{t("ts505", { ns: "ts" })}:</label>
              <label className="labelContent" style={{ color: colorP.forGround }}>{sum}</label>
            </div>
          </div>
          <div className="tableContainer">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts503", { ns: "ts" })}</span></TableCell>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts504", { ns: "ts" })}</span></TableCell>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts505", { ns: "ts" })}</span></TableCell>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts506", { ns: "ts" })}</span></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isData == true && records?.map((value: any, index: any) =>
                  <TableRow key={index}>
                    <TableCell>{timestampToTime(value.createDatetime)}</TableCell>
                    <TableCell>{value.thirdTypeStr}</TableCell>
                    <TableCell>{value.money}</TableCell>
                    <TableCell><span onClick={() => getRemark(value)} style={{ cursor: 'pointer' }}>{value?.secondTypeStr}</span></TableCell>
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
                  }}
                  count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
              </div>
            }
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
