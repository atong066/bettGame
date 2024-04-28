import { Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/DownloadForOffline";
import SupportIcon from "@mui/icons-material/SupportAgent";
import FaqIcon from "@mui/icons-material/Quiz";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LanguageIcon from "@mui/icons-material/Language";
import "./sidebarIcons.css";
import { Link, useNavigate } from "react-router-dom";
import {
  SetActiveTab,
  SetActiveSidebarFn,
  GetActiveSidebar,
} from "../../globalFunctions/loginContext";

import {
  useGetChangeReportType,
  useGetGames,
  useGetRegFields,
  useGetUserAllInfo,
  useStationConfig,
} from "../../hooks/getUserInfoHook";
import {
  useGlobalVariables,
  useLoginStore,
  useRebateType,
  useSetlang,
} from "../../globalFunctions/store";
import axios from "axios";
import React, { useState } from "react";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import MissionModal from "../sidebar/mission";

const SidebarIcons = (props: any) => {
  const userInfo = useGlobalVariables(state=>state.userDetails);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [mission, setMission] = useState<any[]>([]);
  const sideAction = SetActiveTab();
  const setActobeIndex = SetActiveSidebarFn();
  const gameLoader = useGetGames({ type: "11" });
  const gameIndex = GetActiveSidebar();

  const validayLogon = (link: any) => {
    if (userInfo?.isLogin == false) {
      useLoginStore.setState({ isOpen: true });
    } else {
      if (link === "missionModal") {
        getMissionDetails();
        setOpen(true);
      } else {
        useRebateType.setState({ type: 1 });
        navigate(link);
      }
    }
  };

  async function getMissionDetails() {
    try {
      const response = await axios.get("/getTaskCenterList.do");
      setMission(response.data);
    } catch (e) {}
  }
  const handleClickOpen = () => {
    getMissionDetails();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function gameClick(index: any, id: any) {
    if (sideAction) {
      sideAction(id);
    }
    if (setActobeIndex) {
      setActobeIndex(index);
    }
  }
  return (

      <Box className={props.sidebarActive ? 'icons-container active' : 'icons-container'}>
        <Link to={"/lobby"}>
          <img
            className="gameImage"
            src={99 == gameIndex ? "images/home_active.png" : "images/home.png"}
            onClick={() => gameClick("99", "loby")}
          />
        </Link>
        {/* <img className="gameImage" src="images/hotgame_tab_icon_active.png" />
        <img
          className="gameImage"
          src="images/recommend_game_tab_icon_active.png"
        />
        <img className="gameImage" src="images/dianzi_tab_icon_active.png" />
        <img className="gameImage" src="images/real_tab_icon_active.png" />
        <img className="gameImage" src="images/sport_tab_icon_active.png" />
        <img className="gameImage" src="images/duyu_tab_icon_active.png" /> */}
        {gameLoader.isLoading == false &&
          gameLoader?.data?.data
            .filter((entry: { games: any }) => entry.games.length !== 0)
            .map(({ games, tab }: any, index: any) => (
              <Link
                to={"/" + tab.code}
                data-info={"key_" + tab.id}
                key={tab.id}
                data-to-scrollspy-id={tab.code}
                onClick={() => gameClick(index, tab.code)}
                className={
                  index == gameIndex ? "gameBox active boxStyle" : "gameBox"
                }
              >
                <div className="imageLabelConBox">
                  <div className="imageContainer">
                    <img
                      className="gameImage"
                      src={
                        index == gameIndex
                          ? "images/" + tab.code + "_active.png"
                          : "images/" + tab.code + ".png"
                      }
                    ></img>
                  </div>
                  {/* <div className="labelContainer">
                    <span>{tab.customTitle ? tab.customTitle : tab.name}</span>
                  </div> */}
                </div>
              </Link>
            ))}
        <ManageHistoryIcon
          sx={{ fontSize: "35px", color: "gray", cursor: "pointer" }}
          onClick={() => validayLogon("/betting-history")}
        />
        <img
          className="linkImage"
          src="sidebarIconsImages/event.png"
          onClick={() => validayLogon("/event")}
        />
        <img
          className="linkImage"
          src="sidebarIconsImages/calendar.png"
          onClick={() => validayLogon("missionModal")}
        />
        <img
          className="linkImage"
          src="sidebarIconsImages/rebate.png"
          onClick={() => validayLogon("/rebate-fishing")}
        />
        <img
          className="linkImage"
          src="sidebarIconsImages/gift.png"
          onClick={() => validayLogon("/pending")}
        />

        <img
          className="linkImage"
          src="sidebarIconsImages/present.png"
          onClick={() => validayLogon("/record-collection")}
        />
        <img
          className="linkImage"
          src="sidebarIconsImages/bank.png"
          onClick={() => validayLogon("/balance-bonus")}
        />
        <img
          className="linkImage"
          src="sidebarIconsImages/king.png"
          onClick={() => validayLogon("/vip")}
        />
        <img
          className="linkImage"
          src="sidebarIconsImages/convide.png"
          onClick={() => validayLogon("/PromotionPage")}
        />
        {/* <LanguageIcon sx={{ fontSize: "35px", color: "gray" }} /> */}
        {/* <DownloadIcon
          sx={{ fontSize: "35px", color: "gray" }}
          onClick={() => validayLogon("/download-page")}
        />
        <Link to="support">
          <SupportIcon sx={{ fontSize: "35px", color: "gray" }} />
        </Link>
        <FaqIcon sx={{ fontSize: "35px", color: "gray" }} />
        <Link to="activeEvent">
          <CardGiftcardIcon sx={{ fontSize: "35px", color: "gray" }} />
        </Link> */}
      </Box>

  );
};

export default SidebarIcons;
