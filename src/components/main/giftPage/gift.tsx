import React, { useState } from "react";
import "./gift.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../redEnvelope/redEnvelope.css";

import axios from "axios";
import { useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { useGetSignin, useGetSigninRules } from "../../hooks/curstomHooks";
import { useGlobalVariables } from "../../globalFunctions/store";
import { useTranslation } from "react-i18next";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
};

function GiftModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const [open, setOpen] = React.useState(false);
  const [records, setRecords] = useState<any>();
  const sigIn = useGetSignin()
  const userConfig= useGlobalVariables(state => state.stationConfig)
  const checkIn = sigIn.data
  const [slide, setSlide] = useState(false);
  const [slider, setSlider] = useState(false);
  const [checkInbonus, setCheckinBonus] = useState<any>();
  const openGiftreward = useGlobalVariables(state => state.openReward)
  const signInrecords = useGetSigninRules()
  const slideToRight = () => {
    setSlide(!slide);
    setSlider(false);
  };
  const slideback = () => {
    setSlide(false);
  };
  const slideToRights = () => {
    setSlider(!slider);
    setSlide(false);
  };
  const slidebacks = () => {
    setSlider(false);
  };
  if (signInrecords.isLoading == false) {
    // setCheckinBonus();
  }
  const style7 = {
    gridColumn: "1/4",
    display: "flex",
    FlexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "1rem",
  };
  const defStyle = {
    width: "100%",
  };

  async function signInbonus(id: any, day: any, min: any, max: any) {
    if ((checkIn.signCount - day) > 1) {
      ToastrPngk({
        msg: t("ts870", { ns: "ts" }),
        type: "error",
      });
      return;
    }
    if (sigIn.data.signed == true && checkIn.signCount <= day) {
      ToastrPngk({
        msg: t("ts871", { ns: "ts" }),
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "/userSignIn.do",
        {
          signType: id,
        },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data.success == false) {
        // NotificationManager.error(response.data.msg, 'Error', 1500);

        ToastrPngk({ msg: response.data.msg, type: "error" });
      } else {
        useGlobalVariables.setState({ openReward: true });
        if(userConfig.isShowOnSign===true){
          useGlobalVariables.setState({ rewardIndex1: min })
        }
        else{
          useGlobalVariables.setState({ rewardIndex1: 0 })
        }
        useGlobalVariables.setState({ rewardIndex2: max })
        signInrecords.refetch()
        sigIn.refetch()
        ToastrPngk({ msg: "Success", type: "Success" });
      }
    } catch (e) { }
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
  useEffect(() => {
    sigIn.refetch()
  }, [])
  if (sigIn.isLoading) {
    return <></>
  }
  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box>
            <Typography
              component={"span"}
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
              <div className="main-red-enveloper">
                <div className="main-gift-cotainer">
                  <div
                    className="ant-modal-root1 sign-pop"
                    style={{ display: "block" }}
                  >
                    <div className="ant-modal-wrap1 ant-modal-centered1">
                      <div className="ant-modal1" style={{ width: "550px" }}>
                        <div className="ant-modal-content1">
                          <div
                            className="ant-modal-body1  signpage"
                            style={{ margin: "auto", maxWidth: "375px" }}
                          >
                            <div className="rewards-body">
                              <img
                                src="/turnlateImages/sign-close.png"
                                alt=""
                                className="rewards-close"
                                onClick={props.close}
                              />
                              <div className="rewards-vip">
                                <div className="">
                                  <img
                                    width="35"
                                    src="/turnlateImages/sign-vip.png"
                                    alt=""
                                    style={{ width: "100%", display: "block" }}
                                  />
                                </div>
                              </div>
                              <div className="rewards-title ">
                                VIP login bonus
                              </div>

                              <div className="rewards-main">
                                {signInrecords.isSuccess && signInrecords?.data?.content?.dayGiftConfig != undefined && JSON.parse(signInrecords?.data?.content?.dayGiftConfig)?.map((item: any, index: any) => (
                                  <div
                                    key={index}
                                    style={index == 6 ? style7 : checkIn?.signCount > index ? { opacity: '.5' } : defStyle}
                                    className={
                                      item.canSign
                                        ? "rewards-items rewards-items-0 true active"
                                        : "rewards-items rewards-items-0 true"
                                    }
                                    onClick={() =>
                                      signInbonus(signInrecords?.data?.content?.signType, index, item.cash, item.score)
                                    }
                                  >
                                    {item.canSign ? (
                                      <img
                                        src="/turnlateImages/background-sign.png"
                                        alt=""
                                        className="img-light"
                                      />
                                    ) : (
                                      ""
                                    )}
                                    <div className="day-item">
                                      Day {item.day}
                                    </div>
                                    <img
                                      style={
                                        index == 6
                                          ? { marginTop: "-20px" }
                                          : { width: "100%" }
                                      }
                                      src="/turnlateImages/sign-money0.png?v=1.21"
                                      alt=""
                                      className="img-coin"
                                    />
                                   {userConfig.isShowOnSign===true&& <div className="bonus-item bonus-item-cash">
                                      <img src="/turnlateImages/cash-icon.png" />
                                     { item.cash}
                                    </div>}
                                    <div className="bonus-item bonus-item-score">
                                      <img src="/turnlateImages/score-icon.png" />
                                      {item.score}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="rewards-des">
                                <div
                                  className="signrule"
                                  onClick={slideToRights}
                                >
                                  <span className="">Sign in rules</span>
                                  <img
                                    src="/turnlateImages/arrow-right.png"
                                    width="16"
                                  />
                                </div>
                                <div
                                  className="signlist"
                                  onClick={slideToRight}
                                >
                                  <span className="">Check-in records</span>
                                  <img
                                    src="/turnlateImages/arrow-right.png"
                                    width="16"
                                  />
                                </div>
                              </div>
                              <div className="content"></div>
                            </div>
                            <div
                              className="content_wheelContainer__MsFo0"
                              id="wheelContainer"
                              style={{ width: "100%", display: "none" }}
                            >
                              <div className="content_bonusBox__gouLX">
                                <div className="content_bonusBoxContent__9n-CZ">
                                  <img
                                    alt="spin"
                                    src="/turnlateImages/fangshe.png"
                                    className="content_bonusLight__84RoS content_psCenter__JL-XH"
                                  />
                                  <img
                                    alt="spin"
                                    src="/turnlateImages/dllq.png"
                                    className="content_psCenter__JL-XH content_bonusCenterImg__cx8av"
                                  />
                                  <img
                                    alt="spin"
                                    src="/turnlateImages/bonusLight.png"
                                    className="content_opacity01__35pcf content_psCenter__JL-XH"
                                    style={{ width: "100%" }}
                                  />
                                  <img
                                    alt="spin"
                                    src="/turnlateImages/sign-button.png"
                                    className="content_psCenter__JL-XH content_m_bonusCenterBtnImg__ntIhn content_scalebtnimg__RcSa3 content_scale0__woB3+"
                                    style={{
                                      top: "419px",
                                      transform: "translate(-50%, 0px)",
                                    }}
                                  />
                                  <div
                                    className="content_bonusText__5X3hO content_scale0__woB3 content_scale01__2Nl5i v2"
                                    style={{ left: "134px" }}
                                  >
                                    <span style={{ width: "35px" }}></span>
                                    <p
                                      className="ptext-s"
                                      style={{
                                        whiteSpace: "nowrap",
                                        fontSize: "16px",
                                      }}
                                    ></p>
                                    <span style={{ width: "35px" }}></span>
                                  </div>
                                  <button
                                    className="content_button__Et8Uj content_psCenter__JL-XH content_bonusButton__auxPh 
                                    content_scalebtnimg__RcSa3 content_scale0__woB3+ "
                                    name="cn341"
                                    style={{ border: "none" }}
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="recentWinTable_wrapper__8SgCV">
                              <div
                                className={`recentWinTable_recentWinTable__emtwa ${slide ? "slidery" : "sliders"
                                  }`}
                              >
                                <div
                                  className="recentWinTable_head__Lyyzm"
                                  onClick={slideback}
                                >
                                  <img
                                    alt="close"
                                    src="/turnlateImages/zp-close.png"
                                    className="recentWinTable_closeButton__3iRQE"
                                  />
                                  {/* <h3 className="recentWinTable_title__f0948 ">
                                    Check-in record
                                  </h3> */}
                                </div>

                                <div className="recentWinTable_table__DWiFQ scroll">
                                  <div className="recentWinTable_row__nn7B2">
                                    <div className="recentWinTable_col_head__sdjL2">
                                      {t("ts167", { ns: "ts" })}
                                    </div>
                                    <div className="recentWinTable_col_head__sdjL2">
                                      {t("ts073", { ns: "ts" })}
                                    </div>
                                    <div className="recentWinTable_col_head__sdjL2">
                                      {t("ts025", { ns: "ts" })}
                                    </div>
                                    <div className="recentWinTable_col_head__sdjL2">
                                      {t("ts869", { ns: "ts" })}
                                    </div>
                                  </div>
                                  {/* <div className="signlist-all">
                                  </div> */}
                                  {
                                    sigIn.isSuccess && sigIn?.data?.signRecordList?.map((item: any, index: any) =>
                                      < div key={index}>
                                        <div className="recentWinTable_row__nn7B2">
                                          <div
                                            className="recentWinTable_col_head__sdjL2 "
                                            style={{ color: "white" }}
                                          >
                                            {item.username}
                                          </div>
                                          <div
                                            className="recentWinTable_col_head__sdjL2 "
                                            style={{ color: "white", fontSize: "13px" }}
                                          >
                                            {timestampToTime(item.signDate)}
                                          </div>
                                          <div
                                            className="recentWinTable_col_head__sdjL2 "
                                            style={{ color: "white" }}
                                          >
                                            {item.money}
                                          </div>
                                          <div
                                            className="recentWinTable_col_head__sdjL2 "
                                            style={{ color: "white" }}
                                          >
                                            {item.score}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }

                                </div>
                              </div>
                            </div>
                            <div className="rule_wrapper__kVfHQ">
                              <div
                                className={`rule_ruleContent__qBU0C ${slider ? "slidery" : "sliders"
                                  }`}
                              >
                                <div
                                  className="rule_head__bYY63"
                                  onClick={slidebacks}
                                >
                                  <img
                                    className="rule_closeButton__ZF4Nj"
                                    alt="close"
                                    src="/turnlateImages/zp-close.png"
                                  />
                                  <h3 className="rule_title__6pSjK ">
                                    Sign in rules
                                  </h3>
                                </div>
                                <div className="rule_content__PwJvC">
                                  <div className="rule_ScrollboxContainer__T6bnr">
                                    <div className="recentWinTable_row__nn7B2">
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        Language
                                      </div>
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        Title
                                      </div>
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        Update Time
                                      </div>
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        Type
                                      </div>
                                    </div>
                                    <div className="recentWinTable_row__nn7B2">
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        {checkIn?.language}
                                      </div>
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        {checkIn?.title}
                                      </div>
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        {checkIn?.updateTime}
                                      </div>
                                      <div className="recentWinTable_col_head__sdjL2 ">
                                        {checkIn?.type}
                                      </div>
                                    </div>
                                    <div
                                      className="rule_verticalScroll__Q91lm"
                                      id="railParent"
                                    >
                                      <div
                                        className="rule_rail__cPJQq"
                                        id="rail"
                                      ></div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <div className="bonusInfo">
                                      <img src="/turnlateImages/cash-icon.png" />

                                      <span className="bonuses">
                                        ：Bonus Informationes
                                      </span>
                                    </div>
                                    <div className="bonusInfo">
                                      <img src="/turnlateImages/score-icon.png" />
                                      ：<span className="">Score</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default GiftModal;
