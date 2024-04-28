import React from "react";
import MainLayout from "../../layout";
import { HeaderWithAction } from "../common/header";
import { useTranslation } from "react-i18next";
import "./promote.css";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { Box } from "@mui/material";

const Promote = () => {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()
  return (
    <>
      <Box
        sx={{
          "h6": {
            color: color.text4
          },
          ".txt": {
            "h6": {
              color: color.text
            }
          },
          ".member1": {
            "h6": {
              color: color.text
            }
          },
        }}
      >
        <div className="promoteContainer">
          <div className="promoteContent">
            <div style={{ display: "flex" }}>
              <div className="btnDivs">
                {/* <button>

                {t("ts1157", { ns: "ts" })}
              </button> */}
              </div>

              <div className="contenters" style={{ backgroundColor: color.backGorund }}>
                <div className="promoteBody">
                  <div className="promoteHeader">
                    <div className="HeaderContent" style={{ borderColor: color.fourth }}>
                      <div className="mainImg">
                        <span>A</span>
                        <img src="/images/agent1.png" alt="" />
                      </div>
                      <div className="mainMember">
                        <div style={{ display: "flex", gap: ".2rem" }}>
                          <h6>{t("ts1158", { ns: "ts" })} 28500</h6>
                          <h6>
                            {t("ts1159", { ns: "ts" })}
                            <span>225</span>
                          </h6>
                        </div>

                        <h6> {t("ts1160", { ns: "ts" })}</h6>
                        <div>
                          <h6>
                            {t("ts1161", { ns: "ts" })}
                            <span>165</span>
                          </h6>
                        </div>
                        <h6> {t("ts1162", { ns: "ts" })}3000</h6>
                        <h6>
                          {t("ts1163", { ns: "ts" })} <span>60</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ position: "relative", border: "2px solid #1c1e2300" }}
                  >
                    <div className="BodyText">
                      <div className="arrow1">
                        <img src="/images/arrow11.png" alt="" />
                      </div>
                      <div className="arrow5">
                        <img src="/images/arrow5.png" alt="" />
                      </div>
                      <div className="arrow6">
                        <img src="/images/arrow6.png" alt="" />
                      </div>
                      <div className="arrow4">
                        <img src="/images/arrow4.png" alt="" />
                      </div>
                      <div className="arrow7">
                        <img src="/images/arrow7.png" alt="" />
                      </div>
                      <div className="arrow0">
                        <img src="/images/arrow0.png" alt="" />
                      </div>
                      <div className="arrow3">
                        <img src="/images/arrow3.png" alt="" />
                      </div>
                      <div className="arrow8">
                        <img src="/images/arrow11.png" alt="" />
                      </div>

                      <div className="txt">
                        <h6>{t("ts1164", { ns: "ts" })}</h6>
                      </div>
                      <div className="txt" style={{ marginLeft: "2rem" }}>
                        <h6>{t("ts1165", { ns: "ts" })}</h6>
                      </div>
                      <div className="txt">
                        <h6>{t("ts1166", { ns: "ts" })}</h6>
                      </div>
                    </div>
                    <div className="BodyText2">
                      <div className="txt">
                        <h6>
                          {t("ts1167", { ns: "ts" })}
                          <span>15</span>
                        </h6>
                      </div>
                      <div className="txt">
                        <h6>
                          {t("ts1168", { ns: "ts" })}
                          <span>90</span>
                        </h6>
                      </div>
                      <div className="txt">
                        <h6>
                          {t("ts1169", { ns: "ts" })}
                          <span>60</span>
                        </h6>
                      </div>
                    </div>
                    <div className="member">
                      <div className="member1">
                        <div>
                          <img src="/images/agent2.png" alt="" />
                          <span>B1</span>
                        </div>
                        <h6>{t("ts1170", { ns: "ts" })} 500</h6>
                      </div>
                      <div className="member1">
                        <div>
                          <img src="/images/agent3.png" alt="" />
                          <span>B2</span>
                        </div>
                        <h6>{t("ts1170", { ns: "ts" })} 3000</h6>
                      </div>
                      <div className="member1">
                        <div>
                          <img src="/images/agent2.png" alt="" />
                          <span>B3</span>
                        </div>
                        <h6>{t("ts1170", { ns: "ts" })} 2000</h6>
                      </div>
                    </div>
                    <div className="BodyText3" style={{ marginTop: ".5rem" }}>
                      <div className="txt">
                        <h6>
                          {t("ts1167", { ns: "ts" })}
                          <span>10</span>
                        </h6>
                      </div>
                      <div className="txt" style={{ marginRight: "1.5rem" }}>
                        <h6>
                          {t("ts1168", { ns: "ts" })} <span>90</span>
                        </h6>
                      </div>
                      <div className="txt">
                        <h6>
                          {t("ts1169", { ns: "ts" })}
                          <span>60</span>
                        </h6>
                      </div>
                    </div>
                    <div className="member">
                      <div className="member1 member2">
                        <div>
                          <img src="/images/agent4.png" alt="" />
                          <span>C1</span>
                        </div>
                        <h6>{t("ts1170", { ns: "ts" })} 500</h6>
                      </div>
                      <div className="member1 member2">
                        <div>
                          <img src="/images/agent5.png" alt="" />
                          <span>C2</span>
                        </div>
                        <h6>{t("ts1170", { ns: "ts" })} 3000</h6>
                      </div>
                      <div className="member1 member2">
                        <div>
                          <img src="/images/agent4.png" alt="" />
                          <span>C3</span>
                        </div>
                        <h6>{t("ts1170", { ns: "ts" })} 2000</h6>
                      </div>
                    </div>
                  </div>
                  <div className="promoteInfo" style={{ borderColor: color.fourth, borderRadius: ".1rem" }}>
                    <h6>
                      <strong>{t("ts1171", { ns: "ts" })} </strong> <br />
                      {t("ts1172", { ns: "ts" })}
                      <br />
                      <strong>{t("ts1173", { ns: "ts" })}</strong>
                      <br />
                      <ul>
                        <li>
                          {t("ts1174", { ns: "ts" })} <em>30</em>
                        </li>
                        <li>
                          {t("ts1175", { ns: "ts" })} <em> 0</em>
                        </li>
                        <li>
                          {t("ts1176", { ns: "ts" })} <em>600</em>
                        </li>
                        <li>
                          <strong>{t("ts1177", { ns: "ts" })}</strong>
                          <ul>
                            <li>
                              {t("ts1178", { ns: "ts" })} <em>165</em>
                            </li>
                            <li>
                              {t("ts1179", { ns: "ts" })} <em>60</em>
                            </li>
                            <li>
                              {t("ts1180", { ns: "ts" })}
                              <em>225</em>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>{t("ts637", { ns: "ts" })}</strong>
                          <ul>
                            <li>
                              <strong>{t("ts1181", { ns: "ts" })}</strong>
                              {t("ts1183", { ns: "ts" })}
                            </li>
                            <li>
                              <strong> {t("ts1184", { ns: "ts" })}</strong>:
                              {t("ts1185", { ns: "ts" })}

                            </li>
                            <li>
                              <strong> {t("ts1186", { ns: "ts" })}</strong>
                              {t("ts1187", { ns: "ts" })}
                            </li>
                            <li>
                              <strong>{t("ts1188", { ns: "ts" })}</strong>
                              {t("ts1189", { ns: "ts" })}
                            </li>
                            <li>
                              <strong> {t("ts1190", { ns: "ts" })} </strong>
                              {t("ts1191", { ns: "ts" })}
                            </li>
                            <li>
                              <strong>    {t("ts1192", { ns: "ts" })}</strong>
                              {t("ts1193", { ns: "ts" })}                          </li>
                            <li>
                              <strong> {t("ts1194", { ns: "ts" })}   </strong>
                              {t("ts1195", { ns: "ts" })}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Promote;
