import { Button, Pagination, Stack } from "@mui/material";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import NoData from "../../../noData/no-data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Arcade() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()
  const [rebate, setRebate] = useState<any[]>([])

  async function getRebateData() {
    try {
      const response = await axios.get('/userCenter/finance/getKickBackStrategy.do', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      setRebate(response.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    getRebateData()
  }, [])

  const getType = (type: any) => {
    if (type == 1) {
      return "真人"
    } else if (type == 2) {
      return "电子"
    } else if (type == 3) {
      return "棋牌"
    } else if (type == 4) {
      return "捕鱼"
    } else if (type == 5) {
      return "电竞"
    } else if (type == 6) {
      return "体育"
    } else if (type == 7) {
      return "彩票"
    }
  }

  return (
    <>
      <div className="fishingMainContainer">
        <div className="topBox">
          <div className="labelBox">
            <label className="labelTitle" style={{ color: color.text }}>{t("ts494", { ns: "ts" })}:</label>
            <label className="labelContent" style={{ color: color.forGround }}>0,00</label>
          </div>
          <div className="buttonBox">
            <Stack direction={"row"} spacing={2}>
              <Button style={{ backgroundColor: color.forGround }} className="rebateButton" variant="contained">{t("ts495", { ns: "ts" })}</Button>
              <Link to="/record-collection"><Button style={{ backgroundColor: color.forGround }} className="rebateButton" variant="contained">{t("ts496", { ns: "ts" })}</Button></Link>
            </Stack>
          </div>
        </div>
        <div className="tableContainer">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>{t("ts576", { ns: "ts" })}</TableCell>
                <TableCell>
                  <div className="cellContainer">
                    <label className="cellContent">{t("ts096", { ns: "ts" })}</label>
                    <label className="cellContent">{t("ts713", { ns: "ts" })}</label>
                  </div>
                </TableCell>
                <TableCell>{t("ts714", { ns: "ts" })}</TableCell>
                <TableCell>{t("ts715", { ns: "ts" })}</TableCell>
                <TableCell>{t("ts716", { ns: "ts" })}</TableCell>
                <TableCell>{t("ts561", { ns: "ts" })}</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>

              {rebate.map((value: any, index: any) =>
                <TableRow key={index}>
                  <TableCell>{getType(value.type)}</TableCell>
                  <TableCell>
                    <div className="tdCellContainer">
                      <div className="cellContainer">
                        <div className="labelBox"><label className="cellContent">{value.minBet}</label></div>
                        <div className="labelBox"><label className="cellContent">{value.kickback}%</label></div>
                      </div>
                      <div className="labelContainer">
                        <div className="labelContent">
                          {/* {t("ts548", { ns: "ts" })}100000{t("ts549", { ns: "ts" })}0.3% */}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{value.minBet * (value.kickback) / 100}</TableCell>
                  <TableCell>{value.maxBack}</TableCell>
                  <TableCell>{(value.minBet * (value.kickback) / 100) / value.kickback}</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
          {/* <NoData padding={"1rem 0 0 0"} /> */}
          <div className="pagination">
            <Pagination
             variant="outlined" shape="rounded" sx={{
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
                  backgroundColor: color.forGround,
                  color: "#874404 !important",
                  borderColor:color.forGround
              },
              ".MuiButtonBase-root.Mui-selected:hover": {
                  backgroundColor: color.forGround
              },
          }}  count={0} color="secondary" showFirstButton showLastButton />
          </div>
        </div>
      </div >
    </>
  )
}