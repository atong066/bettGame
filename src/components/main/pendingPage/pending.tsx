import { Button, Pagination, colors } from "@mui/material";
import MainLayout from "../../layout";
import "./pending.css";
import { Link } from "react-router-dom";
import { HeaderWithAction } from "../common/header";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import NoData from "../../noData/no-data";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGetWaitPickTasks, usePickAct, usePickActs } from "../../hooks/getUserInfoHook";
import { useGlobalVariables } from "../../globalFunctions/store";

function Pending() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()

  const getWait = useGetWaitPickTasks()
  const pendingData = useGlobalVariables(state => state.pendingTask)
  const collectBonus = usePickActs()
  const collectBonusPerPick = usePickAct()

  useEffect(() => {
    getWait.refetch()
  }, [])

  const preferentialType = (data: any) => {
    if (data == 1) {
      return t("ts842", { ns: "ts" })
    } else if (data == 2) {
      return t("ts843", { ns: "ts" })
    } else if (data == 3) {
      return t("ts844", { ns: "ts" })
    } else if (data == 4) {
      return t("ts845", { ns: "ts" })
    } else if (data == 5) {
      return t("ts846", { ns: "ts" })
    }
  }

  const pickStatus = (data: any) => {
    if (data == 1) {
      return t("ts847", { ns: "ts" })
    } else if (data == 2) {
      return t("ts848", { ns: "ts" })
    } else if (data == 3) {
      return t("ts849", { ns: "ts" })
    } else if (data == 4) {
      return t("ts850", { ns: "ts" })
    }
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

  const getArrivalType = (type: any) => {
    if (type == 1) {
      return t("ts833", { ns: "ts" })
    } else if (type == 2) {
      return t("ts834", { ns: "ts" })
    } else if (type == 3) {
      return t("ts835", { ns: "ts" })
    } else if (type == 4) {
      return t("ts836", { ns: "ts" })
    } else if (type == 5) {
      return t("ts837", { ns: "ts" })
    } else if (type == 6) {
      return t("ts838", { ns: "ts" })
    } else if (type == 7) {
      return t("ts839", { ns: "ts" })
    }
  }

  return (
    <MainLayout>
      <Loader setLoader={collectBonus.isLoading || collectBonusPerPick.isLoading || getWait.isLoading}></Loader>
      <section className="pendingMainContainer">
        <HeaderWithAction>{t("ts502", { ns: "ts" })}</HeaderWithAction>
        <div className="pendingContainer" style={{ backgroundColor: colorP.backGorund }}>
          <div className="topBox">
            <div className="labelBox">
              <label className="labelTitle" style={{ color: colorP.text4 }}>{t("ts505", { ns: "ts" })}:</label>
              <label className="labelContent" style={{ color: colorP.forGround }}>{pendingData && pendingData?.reduce((acc: any, current: any) => acc + current.money, 0)}</label>
              <Button
                sx={{
                  "&:disabled": {
                    cursor: "not-allowed !important",
                    pointerEvents: "all !important",
                    fontSize: ".18rem !important",
                  },
                  fontSize: ".18rem !important"
                }}
                disabled={pendingData == 0 ? true : false} onClick={() => collectBonus.mutate()} style={pendingData == 0 ? { backgroundColor: colorP.third, color: colorP.text2, fontSize: ".18rem !important", textTransform: "capitalize", borderRadius: ".1rem" } : { backgroundColor: colorP.forGround, color: colorP.text2, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem" }} className="collectAllButton" variant="contained">{t("ts603", { ns: "ts" })}</Button>
            </div>
          </div>
          <div className="tableContainer">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts740", { ns: "ts" })}</span></TableCell>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts504", { ns: "ts" })}</span></TableCell>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts505", { ns: "ts" })}</span></TableCell>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts506", { ns: "ts" })}</span></TableCell>
                  <TableCell><span style={{ color: colorP.text4 }}>{t("ts507", { ns: "ts" })}</span></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getWait.isLoading == false && pendingData && pendingData.map((value: any, index: any) =>
                  <TableRow key={index}>
                    <TableCell>{timestampToTime(value.pickTime)}</TableCell>
                    <TableCell>{value.actType == 1 ? getArrivalType(value.newArrivalType) : value.actName}</TableCell>
                    <TableCell>{value.money}</TableCell>
                    <TableCell>{preferentialType(value.preferentialType)}</TableCell>
                    <TableCell><Button variant="contained" size="small" onClick={() => collectBonusPerPick.mutate(value.id)} style={{ color: colorP.text2, lineHeight: "normal", fontSize: ".14rem", backgroundColor: colorP.forGround, textTransform: "capitalize" }}>{pickStatus(value.pickStatus)}</Button></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {getWait?.data?.data.length == 0 && <NoData padding={"1rem 0 0 0"} />
              // :
              //   <div className="pagination">
              //     <Pagination
              //       sx={{
              //         ".MuiButtonBase-root.Mui-selected": {
              //           backgroundColor: colorP.forGround
              //         },
              //         ".MuiButtonBase-root.Mui-selected:hover": {
              //           backgroundColor: colorP.forGround
              //         }
              //       }} count={0} color="secondary" showFirstButton showLastButton />
              //   </div>
            }
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Pending;
