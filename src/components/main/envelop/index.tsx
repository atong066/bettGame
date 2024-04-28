import { Button } from "@mui/material";
import {
  useButtonStates,
  useGlobalVariables,
} from "../../globalFunctions/store";
import MainLayout from "../../layout";
import { TabContainer, TabItem } from "../common/components/tabComponent";
import { EvenHeader, HeaderWithAction } from "../common/header";
import "./envelop.css";
import { useEffect, useRef, useState } from "react";
import { ToastrPngk } from "../../globalFunctions/toastr";
import axios from "axios";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import {
  useGetActivityDetails,
  useGetArticleList,
  useGetEvents,
  useGetTurnTablePrize,
  useGetTurnTableRecord,
  useGetTurnlateData,
  useGetTurnlateDataType5,
} from "../../hooks/getUserInfoHook";
import ScrollContainer from "react-indiana-drag-scroll";
import Cookies from "universal-cookie";
import { EventDetailsGet } from "../../globalFunctions/eventContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function EnveLop() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte();

  const userConfig = useGlobalVariables((state) => state.stationConfig);

  const cookies = new Cookies();
  var id = cookies.get("eventID");
  const navigate = useNavigate();
  const eventDetails = useGetActivityDetails(id);
  const eventDetailsAll = useGetEvents();
  const eventDet = EventDetailsGet();
  const article = useGetArticleList()

  function getEventDetails(value: any) {
    eventDet(value);
    cookies.set("eventID", value);
    navigate("/event-details");
  }

  useEffect(() => {
    eventDetailsAll.refetch();
    article.refetch()
  }, []);

  return (
    <>
      <MainLayout>
        <section>
          <EvenHeader>{article?.data?.rows[0]?.title}</EvenHeader>
          <div  className="envelopMainContainer" style={{ backgroundColor: colorP.backGorund }}>
            {/* <div className="linkBox">
              <span className="telegramLabel">{t("ts989", { ns: "ts" })}</span>
              <span className="telegramLabel telegramLink">
                <Link to={userConfig.telegram_url} target="_blank">
                  {userConfig.telegram_url}
                </Link>
              </span>
            </div> */}
            <div className="activityContentBox">
              <span className="activityContentTitle">
                <div dangerouslySetInnerHTML={{ __html: article?.data?.rows[0]?.content }} />
              </span>
            </div>
            {/* <div className="tableContainer">
              <div className="firstRow">
                <div className="rowContent rowContentHead">
                  {t("ts1087", { ns: "ts" })}
                </div>
                <div className="rowContent rowEnds">
                  {t("ts1088", { ns: "ts" })}
                </div>
              </div>
              <div className="firstRow">
                <div className="rowContent innerRowsContent rowContentHead">
                  {t("ts1089", { ns: "ts" })}
                </div>
                <div className="rowContent innerRowsContent">
                  {t("ts1090", { ns: "ts" })}14:00-14:59
                </div>
                <div className="rowContent innerRowsContent">
                  {t("ts1090", { ns: "ts" })}18:00-18:59
                </div>
                <div className="rowContent innerRowsContent">
                  {t("ts1090", { ns: "ts" })} 22:00-22:59
                </div>
              </div>
              <div className="firstRow">
                <div className="rowContent rowContent2 rowContentHead">
                  {t("ts1091", { ns: "ts" })}{" "}
                </div>
                <div className="rowContent rowEnds rowEnds2">
                  {t("ts1092", { ns: "ts" })}
                </div>
              </div>
            </div> */}
            {/* <div className="notesContainer">
              <span className="note">{t("ts1093", { ns: "ts" })}</span>
              <span className="note">
                {t("ts1094", { ns: "ts" })}
                <br />
                {t("ts1095", { ns: "ts" })}
              </span>
              <span className="note">
                {t("ts1096", { ns: "ts" })}
                <br />
                {t("ts1097", { ns: "ts" })}
                <br />
                {t("ts1098", { ns: "ts" })}
                <br />
                {t("ts1099", { ns: "ts" })}
                <br />
                {t("ts1100", { ns: "ts" })}
                <br />
                {t("ts1101", { ns: "ts" })}
              </span>
            </div> */}
          </div>
          <div className="allDetailsContainer">
            <div
              className="allAct"
              style={{ backgroundColor: "#313843" }}
            ></div>
            <div className="spanLabel">
              <span style={{ color: "#adb6c3" }}>
                {t("ts813", { ns: "ts" })}
              </span>
            </div>
            <div
              className="allAct"
              style={{ backgroundColor: "#313843" }}
            ></div>
          </div>
          <div className="turnTableEventContainer">
            <div>
              <img className="left" src="/images/arrow-left.png" alt="" />
            </div>
            <ScrollContainer className="turnEvent">
              {eventDetails.isLoading == false &&
                eventDetailsAll?.data?.data.map((item: any, index: any) => (
                  <div className="fitContainer">
                    <div
                      key={index}
                      className="imgCOntianerTurnTable"
                      onClick={() => getEventDetails(item.id)}
                    >
                      <img className="eventImages" src={item.titleImg} alt="" />
                    </div>
                  </div>
                ))}
            </ScrollContainer>
            <div>
              <img className="right" src="/images/arrow-left.png" alt="" />
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
