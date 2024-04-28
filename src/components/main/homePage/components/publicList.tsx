import { useEffect, useState } from "react";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useDiscount } from "../../../hooks/getUserInfoHook";
import "swiper/css/pagination";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  FormGroup,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./notice.css";
import ImageModal from "../../common/modal/submit-modal/imageModal";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalVariables, useModalStates } from "../../../globalFunctions/store";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventDetailsGet } from "../../../globalFunctions/eventContext";
import Cookies from "universal-cookie";
function PublicList(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const Notices = props.children; // CustomHook
  const [current, setCurrent] = useState(0);
  const noticeData = useGlobalVariables((state) => state.noticeData);
  const stationConfig = useGlobalVariables((state) => state.stationConfig);
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();
  const eventDet = EventDetailsGet();
  const openSubmitModal = useGlobalVariables(state => state.noticeModal)
  // const noticeModal=useGlobalVariables(state=>state.noticeModal)
  const handleSubmitModalClose = () => {
    setOpen(false)
    useGlobalVariables.setState({ oncePerDay: false })
  };
  function getEventDetails(value: any) {
    eventDet(value.forwardUrl);
    const cookies = new Cookies();
    cookies.set("eventID", value.forwardUrl);

    navigate("/event-details");
  }
  const activNotice = Notices
  function gotTo(val: any) {
    if (val.forwardType === 1) {

      window.open(val.forwardUrl, "_blank")
    }
    else if (val.forwardType === 2) {
      getEventDetails(val)
    }
    else if (val.forwardType === 3) {
      navigate("/event-mission")
    }
  }

  const publicModal = useModalStates(state => state.public)

  var today = new Date()
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const perDay = useGlobalVariables(state => state.oncePerDay)

  useEffect(() => {
    if (activNotice && activNotice[0]?.popupFrequencyType === 2) {
      if (today.toDateString() === tomorrow.toDateString()) {
        useGlobalVariables.setState({ oncePerDay: true })
      } else if (today.toDateString() !== tomorrow.toDateString()) {
        useGlobalVariables.setState({ oncePerDay: false })
      }
    }

  }, [])

  return (
    <ImageModal
      openSubModal={(open && (publicModal === true && activNotice && activNotice[0]?.popupFrequencyType === 1) || (open && perDay) || (activNotice && activNotice[0]?.popupFrequencyType === 4 && open))}
      // openSubModal={open}
      closeSubModal={handleSubmitModalClose}
    >

      <div className="noticeContainer" >
        <div className="notice">
          <Swiper
            style={{ padding: "0 !important" }}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={60}
            navigation={true}
            pagination={{ clickable: true }}
            className="noticeSwiper"
            modules={[Navigation, Pagination]}
          >
            {activNotice && activNotice.code !== "ERR_BAD_RESPONSE" &&
              activNotice?.sort((a: any, b: any) => a.sortNo > b.sortNo ? 1 : -1)?.map((value: any, index: any) =>
                <SwiperSlide key={index}>
                  <div className="imageBoxIndexMain">
                    <img onClick={() => gotTo(value)} className="eventImageIndexMain" style={{ cursor: "pointer" }} src={value.titleImgUrl} alt="." />
                  </div>
                </SwiperSlide>
              )
            }

          </Swiper>
          <CloseIcon
            onClick={handleSubmitModalClose}
            sx={{
              height: ".4rem",
              width: ".4rem",
              padding: "8px",
              backgroundColor: "#00000078",
              borderRadius: "50%",
              cursor: "pointer",
              color: "#fff"
            }}
            className="closeIcon"
          />
        </div>
      </div>
    </ImageModal>
  );
}
export default PublicList;
