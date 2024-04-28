import MainLayout from "../../layout";
import "./security.css";
import PersonIcon from "@mui/icons-material/Person";
import Header, { HeaderWithAction, HeaderWithNoAction } from "../common/header";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";

import { useGetSecurityInfo, useStationConfig } from "../../hooks/getUserInfoHook";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useButtonStates, useGlobalVariables } from "../../globalFunctions/store";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function Security(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte();
  const navigate = useNavigate();
  const userInfo = useGlobalVariables(state => state.userDetails)
  const datas = useGetSecurityInfo()
  const data = datas?.data?.data?.userData

  const goSecure = (index: any, name: any) => {
    useButtonStates.setState({ securityType: index, securityName: name })
    navigate("/secure")

  }

  useEffect(() => {
    datas.refetch()
  }, [])

  return (
    <>
      <MainLayout>
        <section className="securityMainContainer">
          <HeaderWithNoAction backBtn={props.state}>{t("ts145", { ns: "ts" })}</HeaderWithNoAction>
          <div className="securityMainContainerBox">
            <div className="securityContainer" style={{ backgroundColor: color.backGorund }}>

              <div className="securityContentBox">
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/profileImages/icon_user.png" alt="P" />
                  <span className="iconLabel">{t("ts167", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  <span className="arrowLabel">{userInfo?.username}</span>
                </div>
              </div>
              <div className="securityContentBox securityContentBoxCursor" onClick={() => goSecure(1, t("ts987", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/profileImages/icon_TelephoneNumber.png" alt="P" />
                  <span className="iconLabel">{t("ts987", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  {data?.phone ? <span className="arrowLabel">{data?.phone}</span> : <span className="arrowLabel">{t("ts1000", { ns: "ts" })}</span>}
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>
              <div className="securityContentBox securityContentBoxCursor" onClick={() => goSecure(2, t("ts988", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/profileImages/icon_Gmail.png" alt="P" />
                  <span className="iconLabel">{t("ts988", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  {data?.email ? <span className="arrowLabel">{data?.email}</span> : <span className="arrowLabel">{t("ts1000", { ns: "ts" })}</span>}
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>

              <div className="securityContentBox securityContentBoxCursor" onClick={() => goSecure(7, t("ts989", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/images/telegram.png" alt="P" />
                  <span className="iconLabel">{t("ts989", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  {data?.telegram ? <span className="arrowLabel">{data?.telegram}</span> : <span className="arrowLabel">{t("ts1000", { ns: "ts" })}</span>}
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>

              <div className="securityContentBox securityContentBoxCursor" onClick={() => goSecure(8, t("ts990", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/images/whatsapp.png" alt="P" />
                  <span className="iconLabel">{t("ts990", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  {data?.whatsapp ? <span className="arrowLabel">{data?.whatsapp}</span> : <span className="arrowLabel">{t("ts1000", { ns: "ts" })}</span>}
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>

              <div className="securityContentBox securityContentBoxCursor" onClick={() => goSecure(9, t("ts991", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/images/facebook.png" alt="P" />
                  <span className="iconLabel">Facebook</span>
                </div>
                <div className="arrowBox">
                  {data?.facebook ? <span className="arrowLabel">{data?.facebook}</span> : <span className="arrowLabel">{t("ts1000", { ns: "ts" })}</span>}
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>

              <div className="securityContentBox securityContentBoxCursor securityContentBoxLast" onClick={() => goSecure(3, t("ts992", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/profileImages/icon_GoogleAuthenticator.png" alt="P" />
                  <span className="iconLabel">{t("ts992", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  <span className="arrowLabel">{t("ts1000", { ns: "ts" })}</span>
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>
            </div>

            {/* Second Container */}
            <div className="securityContainer securityContentBoxCursor" style={{ backgroundColor: color.backGorund }}>
              <div className="securityContentBox" onClick={() => goSecure(4, t("ts993", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/profileImages/icon_LoginPassword.png" alt="P" />
                  <span className="iconLabel">{t("ts993", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>

              <div className="securityContentBox securityContentBoxCursor securityContentBoxLast" onClick={() => goSecure(5, t("ts994", { ns: "ts" }))}>
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/profileImages/icon_WithdrawPassword.png" alt="P" />
                  <span className="iconLabel">{t("ts994", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  <span className="arrowLabel">{t("ts995", { ns: "ts" })}</span>
                  <ArrowForwardIosIcon sx={{ height: ".3rem", width: ".3rem", color: color.fourth + "!important" }} />
                </div>
              </div>
            </div>

            {/* Third Container */}
            <div className="securityContainer" style={{ backgroundColor: color.backGorund }}>
              <div className="securityContentBox securityContentBoxLast">
                <div className="iconWLabelBox">
                  <img className="iconImage" src="/profileImages/icon_tripartite.png" alt="P" />
                  <span className="iconLabel">{t("ts998", { ns: "ts" })}</span>
                </div>
                <div className="arrowBox">
                  <span className="arrowLabel">{t("ts999", { ns: "ts" })}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout >
    </>
  );
}

export default Security;
