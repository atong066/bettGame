import React, { useEffect, useRef, useState } from "react";
import "./fab.css";

import GiftModal from "../../main/giftPage/gift";
import RegModal from "../../layout/navbar/registrationModal";
import EnvelopModal from "../redEnvelope/redEnvelper";
import TurnLate from "../../main/turnlate/turnlate";
import {
  useGlobalVariables,
  useLoginStore,
  useSetEnvelopValue,
  userRegstore,
} from "../../globalFunctions/store";

import {
  useGetConfig,
  useGetTurnlateData,
  useStationConfig,
} from "../../hooks/getUserInfoHook";
import Turnlate from "../../main/turnlate/turnlate";
import { Badge } from "@mui/material";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useCurnew } from "../../hooks/curstomHooks";
import MessagesCount from "./messages";
const NewFab = () => {
  const bgColor = ChangeColorPallte();
  const [navBar, setNavBar] = useState(true);
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const [openLog, setOpenReg] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const redEnv = useCurnew();
  const stationButton = useStationConfig();
  const userInfo = useGlobalVariables(state => state.userDetails);
  const topReff = useRef<any>();
  const scrollToBottom = () => {
    topReff.current.scrollIntoView();
  };
  const turnlateData = useGetTurnlateData();
  const chatRoom = useGetConfig();
  const [isFabChecked, setisFabChecked] = useState(false);

  const clickedFab = () => {
    setisFabChecked(!isFabChecked)
  }

  const handleScroll = () => {
    setisFabChecked(false)
  }
  const openGiftModal = () => {
    setOpenGift(true);
  };
  const closeGiftModal = () => {
    setOpenGift(false);
  };
  function setOpenEnvelopestats() {
    redEnv.refetch();
    useSetEnvelopValue.setState({ envelopeValue: true });
  }
  function setCloseEnvelopestats() {
    setOpenEnvelope(false);
  }
  const [openTurn, setOpenTurn] = useState(false);
  const handleClose = () => {
    setOpenTurn(false);
  };
  const handleOpenTurn = () => {
    turnlateData.refetch();
    setOpenTurn(true);
  };

  const validayLogon = (link: any) => {
    if (userInfo?.isLogin == false) {
      useLoginStore.setState({ isOpen: true });
    } else {
      if (link == "chatroom") {
        window.open("/api/chatroom/goChat.do?isPc=true", "_blank");
      } else if (link == "handleOpenTurn") {
        handleOpenTurn();
      } else {
        link();
      }
    }
  };

  return (
    <div >
      <div className={isFabChecked ? 'backDrop' : 'backDrop2'} onClick={clickedFab} onWheel={handleScroll}></div>
      <div className={`fab-wrapper ${isFabChecked ? 'activeFab' : ''}`} onClick={clickedFab}>
        <label className="fab" style={{ backgroundColor: bgColor.backGorund, borderColor: bgColor.forGround, boxShadow: bgColor.forGround + " 0px 0px 20px 0px" }} htmlFor="fabCheckbox">
          <span className="fab-dots fab-dots-1" style={{ backgroundColor: bgColor.forGround }}></span>
          <span className="fab-dots fab-dots-2" style={{ backgroundColor: bgColor.forGround }}></span>
          <span className="fab-dots fab-dots-3" style={{ backgroundColor: bgColor.forGround }}></span>
        </label>
        <div className="fab-wheel">
          {stationButton?.data?.data.isRedBag == true && (
            <div
              className="fab-action fab-action-1"
              onClick={() => validayLogon(setOpenEnvelopestats)}
            >
              <img
                className="linkImage"
                src="/fabImages/envelope_1525378.png"
                alt="Pandente"
              />
            </div>
          )}
          {stationButton?.data?.data.isTurnlate == true && (
            <div
              className="fab-action fab-action-2"
              onClick={() => validayLogon("chatroom")}
            >
              <MessagesCount />
            </div>
          )}
          {stationButton?.data?.data.isTurnlate == true && (
            <div
              className="fab-action fab-action-3"
              onClick={() => validayLogon("handleOpenTurn")}
            >
              <img src="/fabImages/2.png" id="rotater" />
              <img src="/fabImages/1.png" id="medal" />
            </div>
          )}
          {stationButton?.data?.data.isSignIn == true && (
            <div
              className="fab-action fab-action-4"
              onClick={() => validayLogon(openGiftModal)}
            >
              <img src="/images/calendar.png" id="gift" />
            </div>
          )}
        </div>
      </div>
      <GiftModal open={openGift} close={closeGiftModal} />
      <Turnlate openTurn={openTurn} closeTurn={handleClose} />
      <EnvelopModal
        openEnvelope={openEnvelope}
        setOpenEnvelope={setCloseEnvelopestats}
      />
    </div>
  );
};

export default NewFab;
