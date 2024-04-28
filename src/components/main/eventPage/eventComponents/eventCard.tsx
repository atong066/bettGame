import { useEffect } from "react";
import {
  EventDetailsGet,
  EventProviderData,
} from "../../../globalFunctions/eventContext";

function EventCard(props: any) {
  return (
    <>
      <div
        className="eventCard"
        style={{ background: props.bgColor, width: '100%' }}
        onClick={() => props.getEventDet(props.currentEvents)}
      >
        {props.currentEvents.titleImg&&<img src={props.currentEvents.titleImg} alt="" />}
      </div>
    </>
  );
}
export default EventCard;
