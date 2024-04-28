import axios from "axios";
import Select from 'react-select'
import { useEffect, useReducer, useState } from "react";
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../common/table";
import { Button, Checkbox, FormControlLabel, Pagination, TextField } from "@mui/material";
import { dates, stats } from "../common/selectOtions";
import SearchIcon from '@mui/icons-material/Search';
import { getDatetoday, lastMonth } from "../common/dateRangepicker";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import { DatePicker, DatePickerV2 } from "../../common/components/dropdownComponent";
import DateModal from "../../common/dateModal";
import NoData from "../../../noData/no-data";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import Loader from "../../../backdropLoader/backdrop-loader";
import { useGetPersonal } from "../../../hooks/getUserInfoHook";
import './personalFloatingTable.css'
import { ToastrPngk } from "../../../globalFunctions/toastr";
function PersonalReport() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [historySport, setHistorySport] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [accountName, setAccountName] = useState("")
  const [includType, setIncludeType] = useState(false)
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  const [isData, setIsData] = useState(false)
  const [alertModal, setAlertModal] = useState(false)
  const [remarks, setRemarks] = useState<any[]>([])
  const [setLoader, setOpenLoader] = useState(true);
  const handleGetdateEven = (e: any) => {
    console.log(e)
    dispatch({ type: e.value, dates: e })
  }

  const payload = {
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageNumber: currentPage,
    username: accountName,
    include: includType,
  }

  const getPersonalInfo = useGetPersonal()

  useEffect(() => {
    getPersonalInfo.mutate(payload)
  }, [includType, currentPage, isData])
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleAccountNameChange = (value: any) => {
    setAccountName(value)
  };
  const handleJoinType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeType(event.target.checked);
  };
  function handleOpenModal(value: any) {
    setRemarks([])
    setRemarks(current => [...current, value])
    console.log(value)
    setAlertModal(true)
  }
  function closeModal() {
    setAlertModal(false)
  }

  function copyText(text: any) {
    navigator.clipboard.writeText(text)
    ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
  }

  return (
    <>
      <Loader setLoader={getPersonalInfo.isLoading}></Loader>
      <AlertModal alertMode="alertDefault" openAlert={alertModal} closeAlert={closeModal} alertTitle={t("ts063", { ns: "ts" })}>
        <div className="personalFloatingTable" style={{ width: "13.8rem" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts765", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts766", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts767", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts768", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts769", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts770", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts771", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts772", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts773", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts774", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts775", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts776", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts777", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts778", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts779", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts780", { ns: "ts" })}</span></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {remarks.map((value: any, index: any) =>
                <>
                  <TableRow key={index}>
                    <TableCell>{value.lotBetAmount}</TableCell>
                    <TableCell>{value.lotWinAmount}</TableCell>
                    <TableCell>{value.liveBetAmount}</TableCell>
                    <TableCell>{value.liveWinAmount}</TableCell>
                    <TableCell>{value.egameBetAmount}</TableCell>
                    <TableCell>{value.egameWinAmount}</TableCell>
                    <TableCell>{value.sportBetAmount}</TableCell>
                    <TableCell>{value.sportWinAmount}</TableCell>
                    <TableCell>{value.chessBetAmount}</TableCell>
                    <TableCell>{value.chessWinAmount}</TableCell>
                    <TableCell>{value.esportBetAmount}</TableCell>
                    <TableCell>{value.esportWinAmount}</TableCell>
                    <TableCell>{value.fishingBetAmount}</TableCell>
                    <TableCell>{value.fishingWinAmount}</TableCell>
                    <TableCell>{value.proxyRebateAmount}</TableCell>
                    <TableCell>{value.activeAwardAmount}</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </AlertModal>
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      <div style={{ padding: ".2rem" }}>
        <div className="accntActions">
          <DatePickerV2 onChange={handleGetdateEven} />
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
            value={accountName} id="outlined-basic" label={t("ts056", { ns: "ts" })} variant="outlined" size="small" onChange={(e) => handleAccountNameChange(e.target.value)} />
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
            label={t("ts057", { ns: "ts" })} control={<Checkbox color="success" checked={includType} onChange={handleJoinType} />} />
          <Button style={{
            backgroundColor: colorP.forGround,
            color: colorP.text2,
            fontSize: ".18rem",
            textTransform: "capitalize",
            borderRadius: ".1rem"
          }} onClick={() => getPersonalInfo.mutate(payload)} variant='contained' className="searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: "ts" })}</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts034", { ns: "ts" })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts073", { ns: "ts" })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts240", { ns: "ts" })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts015", { ns: "ts" })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts763", { ns: "ts" })}</span></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getPersonalInfo.isLoading == false && !!getPersonalInfo?.data?.data?.rows && getPersonalInfo?.data?.data?.rows.map((value: any, index: any) =>
              <TableRow key={index}>
                <TableCell><span style={{ display: "flex", alignItems: "center", gap: ".1rem" }}>{value.username} <img src="/navbarImages/copy.png" onClick={() => copyText(value.username)} style={{ width: ".2rem", cursor: "pointer" }} /></span></TableCell>
                <TableCell>{value.statDate}</TableCell>
                <TableCell><span style={{ color: "#EA4E3D" }}>{value.depositAmount === 0 ? value.depositArtificial : value.depositAmount}</span></TableCell>
                <TableCell><span style={{ color: "#04BE02" }}>{value.withdrawAmount}</span></TableCell>
                <TableCell><Button onClick={() => handleOpenModal(value)} variant="outlined" size="small" style={{ border: "none", color: colorP.text4, fontSize: 11 }} className="muiButton" >{t("ts764", { ns: "ts" })}</Button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {getPersonalInfo?.data?.data.success == false || getPersonalInfo?.data?.data.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
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
            }} count={getPersonalInfo?.data?.data ? Math.ceil(getPersonalInfo?.data?.data.total / getPersonalInfo?.data?.data.pageSize) : 0} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
          </div>
        }
      </div>
    </>
  )
}
export default PersonalReport;