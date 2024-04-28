import MainLayout from "../../../layout";
import "../invite.css";
import Select from 'react-select'
import { Button, Pagination, SelectChangeEvent, Stack } from "@mui/material";
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
import { ChangeColorPallte, UserUSerConfig } from "../../../globalFunctions/globalContext";
import Loader from "../../../backdropLoader/backdrop-loader";
import { useTransferRecord } from "../../../hooks/getUserInfoHook";
export default function TransferRecords() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [currentPage, setCurrentPage] = useState(1)
  const [transferTypeData, settransferTypeData] = useState('')
  const [thirdData, setthirdData] = useState('')
  const [statusData, setstatusData] = useState('')
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)

  const payload = {
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageNumber: currentPage,
    type: transferTypeData,
    platform: thirdData,
    status: statusData,
  }

  const getTransferRecord = useTransferRecord()
  const points = getTransferRecord?.data?.data

  useEffect(() => {
    getTransferRecord.mutate(payload)
  }, [])

  const handleGetdateEven = (e: any) => {
    dispatch({ type: e.value, dates: e })
  }

  useEffect(() => {
  }, [currentPage])

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
    if (type == 1) {
      const selType = transferType.find((item: any) => item.value == type)
      const platformtype = platforms.find((item: any) => item.value == platform)
      if (selType) {
        if (platformtype) {
          return t("ts447", { ns: "ts" })
        }
      }

    }
    else {
      const selType = transferType.find((item: any) => item.value == type)
      const platformtype = platforms.find((item: any) => item.value == platform)
      if (selType) {
        if (platformtype) {
          return t("ts448", { ns: "ts" })
        }
      }
    }
  }

  const getplatforms = (type: any) => {
    const selType = platforms.find((item: any) => item.value == type)
    return selType ? selType.label : ""
  }

  return (
    <>
      <Loader setLoader={getTransferRecord.isLoading}></Loader>
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      <div className="invite-body transferRecordMain">
        <div className="invite-button-content">
          <div className="accntActions transActions">
            <Stack useFlexGap style={{ flexWrap: "wrap" }} spacing={2} direction={"row"}>
              <DatePickerV2 onChange={handleGetdateEven} />
              <TransferType onChange={handleTransType} options={transferType} />
              <SelectPlatforms onChange={handleThirdType} options={platforms} />
              <TransferStatus onChange={handleStatusType} options={transferStatus}></TransferStatus>
              <Button style={{
                backgroundColor: colorP.forGround,
                color: colorP.text2,
                fontSize: ".18rem",
                textTransform: "capitalize",
                borderRadius: ".1rem"
              }} onClick={() => getTransferRecord.mutate(payload)} variant='contained' className="searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: "ts" })}</Button>
            </Stack>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts083", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts084", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts085", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts086", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts087", { ns: "ts" })}</span></TableCell>
                <TableCell><span style={{ color: colorP.text4 }}>{t("ts088", { ns: "ts" })}</span></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getTransferRecord.isLoading == false && points && points?.rows?.map((value: any, index: any) =>
                <TableRow key={index}>
                  <TableCell>{value.createDatetime}</TableCell>
                  <TableCell>{getTypes(value.type, value.platform)}</TableCell>
                  <TableCell>{getplatforms(value.platform)}</TableCell>
                  <TableCell>{value.orderId}</TableCell>
                  <TableCell><span style={{ color: "#EA4E3D" }}>{value.money}</span></TableCell>
                  <TableCell>{getType(value.status)}</TableCell>
                </TableRow>
              )
              }
            </TableBody>
          </Table>
          {points?.success == false || points?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
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
              }} count={points ? Math.ceil(points?.total / points?.pageSize) : 0} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
            </div>
          }
        </div>
      </div>
    </>
  );
}
