import { useEffect, useState } from "react";
import MainLayout from "../../layout";
import "./rebate.css";
import { Link } from "react-router-dom";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { HeaderWithAction } from "../common/header";
import { useTranslation } from "react-i18next";
import Fishing from "./fishing/fishing";
import Arcade from "./arcade/arcade";
import Blockchain from "./blockchain/blockChain";
import { ChangeColorPallte, UserUSerConfig } from "../../globalFunctions/globalContext";

import { Pagination, Stack } from "@mui/material";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import NoData from "../../noData/no-data";
import axios from "axios";
import AlertModal from "../common/modal/alert-modal/alert-modal";
import Loader from "../../backdropLoader/backdrop-loader";
import { useStationConfig } from "../../hooks/getUserInfoHook";
import RebateTable from "./rebate-table/rebate-table";
import { useRebateType, useSetRebatePage } from "../../globalFunctions/store";

function Rebate(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()

  const { isLoading, data: gameButton } = useStationConfig()

  const buttonState = useRebateType(state => state.type)

  const rebateType = (stateType: any) => {
    useRebateType.setState({ type: stateType })
    useSetRebatePage.setState({ page: 1 })
  }

  const renderTable = (type: any) => {
    if (type == 1) {
      return <RebateTable />
    } else if (type == 2) {
      return <RebateTable />
    } else if (type == 3) {
      return <RebateTable />
    } else if (type == 4) {
      return <RebateTable />
    } else if (type == 5) {
      return <RebateTable />
    } else if (type == 6) {
      return <RebateTable />
    } else if (type == 7) {
      return <RebateTable />
    }
  }

  const activeTab = {
    color: color.text2,
    backgroundColor: color.forGround,

  }
  const notActivbbe = {
    color: "#ADB6C3",
    backgroundColor: color.backGorund,
  }

  return (
    <MainLayout>
      <section className="rebateMainContainer">
        {/* <HeaderWithAction>{t("ts432", { ns: "ts" })}</HeaderWithAction> */}
        <div className="newMainCotainer">
          <div className="buttonRebateContainer">
            <Stack spacing={2} direction={"column"} sx={{ "button:hover": { color: color.forGround + "!important" } }}>
              {isLoading == false && gameButton?.data?.game?.live == 2 && <Button onClick={() => rebateType(1)} className="rebateButtons" variant="contained" style={buttonState == 1 ? activeTab : notActivbbe}>
                <div className="buttonContent">
                  <div className="buttonImageRebate"><img className="rebateButton" src={buttonState == 1 ? "/rebateImages/real_tab_icon_active.png" : "/rebateImages/real_tab_icon.png"} /></div>
                  <div className="buttonLabelRebate" style={buttonState == 1 ? { color: color.text2 } : {}}>{t("ts121", { ns: "ts" })}</div>
                </div>
              </Button>}
              {isLoading == false && gameButton?.data?.game?.egame == 2 && <Button onClick={() => rebateType(2)} className="rebateButtons" variant="contained" style={buttonState == 2 ? activeTab : notActivbbe}>
                <div className="buttonContent">
                  <div className="buttonImageRebate"><img className="rebateButton" src={buttonState == 2 ? "/rebateImages/dianzi_tab_icon_active.png" : "/rebateImages/dianzi_tab_icon.png"} /></div>
                  <div className="buttonLabelRebate" style={buttonState == 2 ? { color: color.text2 } : {}}>{t("ts798", { ns: "ts" })}</div>
                </div>
              </Button>}
              {isLoading == false && gameButton?.data?.game?.chess == 2 && <Button onClick={() => rebateType(3)} className="rebateButtons" variant="contained" style={buttonState == 3 ? activeTab : notActivbbe}>
                <div className="buttonContent">
                  <div className="buttonImageRebate"><img className="rebateButton" src={buttonState == 3 ? "/rebateImages/qipai_tab_icon_active.png" : "/rebateImages/qipai_tab_icon.png"} /></div>
                  <div className="buttonLabelRebate" style={buttonState == 3 ? { color: color.text2 } : {}}>{t("ts122", { ns: "ts" })}</div>
                </div>
              </Button>}
              {isLoading == false && gameButton?.data?.game?.fishing == 2 && <Button onClick={() => rebateType(4)} className="rebateButtons" variant="contained" style={buttonState == 4 ? activeTab : notActivbbe}>
                <div className="buttonContent">
                  <div className="buttonImageRebate"><img className="rebateButton" src={buttonState == 4 ? "/rebateImages/duyu_tab_icon_active.png" : "/rebateImages/duyu_tab_icon.png"} /></div>
                  <div className="buttonLabelRebate" style={buttonState == 4 ? { color: color.text2 } : {}}>{t("ts124", { ns: "ts" })}</div>
                </div>
              </Button>}
              {isLoading == false && gameButton?.data?.game?.esport == 2 && <Button onClick={() => rebateType(5)} className="rebateButtons" variant="contained" style={buttonState == 5 ? activeTab : notActivbbe}>
                <div className="buttonContent">
                  <div className="buttonImageRebate"><img className="rebateButton" src="regManagementImages/icon_esport.png" /></div>
                  <div className="buttonLabelRebate" style={buttonState == 5 ? { color: color.text2 } : {}}>{t("ts123", { ns: "ts" })}</div>
                </div>
              </Button>}
              {isLoading == false && gameButton?.data?.game?.sport == 2 && <Button onClick={() => rebateType(6)} className="rebateButtons" variant="contained" style={buttonState == 6 ? activeTab : notActivbbe}>
                <div className="buttonContent">
                  <div className="buttonImageRebate"><img className="rebateButton" src={buttonState == 6 ? "/rebateImages/sport_tab_icon_active.png" : "/rebateImages/sport_tab_icon.png"} /></div>
                  <div className="buttonLabelRebate" style={buttonState == 6 ? { color: color.text2 } : {}}>{t("ts422", { ns: "ts" })}</div>
                </div>
              </Button>}
              {isLoading == false && gameButton?.data?.game?.lottery == 2 && <Button onClick={() => rebateType(7)} className="rebateButtons" variant="contained" style={buttonState == 7 ? activeTab : notActivbbe}>
                <div className="buttonContent">
                  <div className="buttonImageRebate"><img className="rebateButton" src={buttonState == 7 ? "/rebateImages/rebate_tab_icon_active.png" : "/rebateImages/rebate_tab_icon.png"} /></div>
                  <div className="buttonLabelRebate" style={buttonState == 7 ? { color: color.text2 } : {}}>{t("ts426", { ns: "ts" })}</div>
                </div>
              </Button>}
            </Stack>
          </div>
          <div className="rebateContainer" style={{ backgroundColor: color.backGorund }}>
            <div className="fishingMainContainer">
              <div className="topBox">
                <div className="labelBox">
                  <label className="labelTitle" style={{ color: color.text4 }}>{t("ts494", { ns: "ts" })}:</label>
                  <label className="labelContent" style={{ color: color.forGround }}>0,00</label>
                </div>
                <div className="buttonBox">
                  <Stack direction={"row"} spacing={2}>
                    <Button sx={{
                      "&:disabled": {
                        cursor: "not-allowed !important",
                        pointerEvents: "all !important",
                        backgroundColor: "#999 !important",
                        borderColor: "#999 !important",
                        color: "#fff !important"
                      },
                    }}
                      disabled className="rebateButton" variant="contained">{t("ts495", { ns: "ts" })}</Button>
                    <Link to="/record-collection"><Button style={{ backgroundColor: color.forGround, color: color.text2 }} className="rebateButton" variant="contained">{t("ts496", { ns: "ts" })}</Button></Link>
                  </Stack>
                </div>
              </div>
              <RebateTable tab={buttonState} />
            </div>
          </div>
        </div>

      </section>
    </MainLayout>
  );
}

export default Rebate;
