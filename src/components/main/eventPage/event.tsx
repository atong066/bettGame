import { Link } from "react-router-dom";
import MainLayout from "../../layout";
import "./event.css";
import { useEffect, useState } from "react";
import { HeaderWithAction } from "../common/header";
import {
  ChangeColorPallte,
  useBalance,
} from "../../globalFunctions/globalContext";
import EventCard from "./eventComponents/eventCard";
import { useNavigate } from "react-router-dom";
import {
  EventDetails,
  EventDetailsGet,
  GetEvents,
} from "../../globalFunctions/eventContext";
import Loader from "../../backdropLoader/backdrop-loader";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import { useGlobalVariables } from "../../globalFunctions/store";
function Event() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const events = EventDetails();
  const [loader, setLoaderF] = useState(false);
  const navigate = useNavigate();
  const fetchEvents = GetEvents();
  const eventDet = EventDetailsGet();
  const userInfo = useGlobalVariables((state) => state.userDetails);
  // if (userInfo?.isLogin == false) {
  //   navigate("/");
  // }
  function getEventDetails(value: any,index?:any ){
    eventDet(value.id);
    const cookies = new Cookies();
    cookies.set("eventINdex", index);
    cookies.set("eventID", value.id);

    navigate("/event-details");
  }

  useEffect(() => {
    fetchEvents();
  }, []);
  const misoStyle = {
    background: colorP.forGround,
    color: "#874404",
    fontSize: ".2rem",
    lineHeight: "normal",
    height: ".6rem",
    width: "1.3rem",
    borderRadius: ".1rem",
    gap: ".15rem",
  }
  return (
    <div>
      <MainLayout>
        <section className="mainEvent">
          <Loader setLoader={loader}></Loader>

          <div className="eventContainer" style={{ marginTop: ".2rem" }}>
            <div className="eventControllers" style={{ display: "flex", alignItems: "center" }}>
              <Button style={misoStyle}><img className="eventImg" src="/images/cardDeck.png" alt="" /><Link style={{ color: colorP.text2, textTransform: "capitalize", marginRight: ".1rem" }} to="/event">{t("ts587", { ns: "ts" })}</Link></Button>
              <Button style={{ color: colorP.text2, height: ".4rem", width: "1rem", background: colorP.forGround, fontSize: ".14rem", lineHeight: "normal", textTransform: "capitalize" }}><Link style={{ color: colorP.text2 }} to="/record-collection">{t('ts456', {ns: 'ts'})}</Link></Button>
            </div>
            <div className="eventContent">
              {events?.map((value: any, index: any) => (
                <EventCard
                  currentEvents={value}
                  bgColor={colorP.backGorund}
                  getEventDet={()=>getEventDetails(value,index)}
                ></EventCard>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </div>
  );
}

export default Event;
