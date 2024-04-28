
import MainLayout from "../../../layout";
import "../invite.css";
import Header from "../../common/header";
import { dates } from "../../userCenter/common/selectOtions";
import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import CardsExpo from "../../common/cards";
import { addDays } from 'date-fns';
import { MiniCards, MiniCardHeaders, MiniCardBody, MiniCardTableHeader, MiniCardRows, MiniCardCell, MiniCardTableBody } from "../../../layout/common/miniCard";
import axios from "axios";
import { UserAllData } from "./userAll";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import { DatePicker, DatePickerV2 } from "../../common/components/dropdownComponent";
import DateModal from "../../common/dateModal";
import { useBalance, SetNewBalance, ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import Loader from "../../../backdropLoader/backdrop-loader";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useGetUserAllInfo } from "../../../hooks/getUserInfoHook";
import { useGlobalVariables } from "../../../globalFunctions/store";
function OverView() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  const colorP = ChangeColorPallte()
  const [open, setOpen] = useState(false);
  const payload = { startTime: commonReducer.startDate, endTime: commonReducer.endDate, load: true }
  const userInfos = useGetUserAllInfo(payload)
  const config = useGlobalVariables(state => state.userConfig)
  const userInfo = userInfos?.data?.data
  const [updateUserInfo, setUpdateInfo] = useState()
  const [setLoader, setOpenLoader] = useState(true);

  const handleGetdateEven = (e: any) => {
    dispatch({ type: e.value, dates: e })
  }
  useEffect(() => {
    userInfos.refetch()
  }, [])
  return (
    <>
      <Loader setLoader={userInfos.isLoading}></Loader>
      <div className="main-invite-container">
        <div className="invite-body">
          <div className="el-card__body" style={{ backgroundColor: colorP.backGorund }}>
            <div className="cards">
              <CardsExpo>
                <div>
                  <div className="iconfont iconzhanghuchongzhi"><svg xmlns="http://www.w3.org/2000/svg" fill="#a8a8a8" width="54px" height="54px" viewBox="0 0 24 24" stroke="#a8a8a8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.6 21H4.4C3.1 21 2 19.9 2 18.6V14h2v4.2c0 .6.4.8 1 .8h14c.6 0 1-.4 1-1v-4h2v4.6c0 1.3-1.1 2.4-2.4 2.4z"></path><path d="M15.3 12.1L13.4 14v-4c0-2 0-4.9 2.4-7-3.4.6-5.1 3.2-5.2 7v4l-1.9-1.9L7 13l5 5 5-5-1.7-.9z"></path></g></svg></div>
                </div>
                <div className="info">
                  <span className="i18n">{t("ts116", { ns: "ts" })}:</span>
                  <span className="totalDep" style={{ color: "#EA4E3D", fontWeight: 600 }}>{userInfo?.dailyMoney?.depositAmount ? userInfo?.dailyMoney?.depositAmount : "0"}</span>
                </div>
              </CardsExpo>
              <CardsExpo>
                <div>
                  <div><img height="50rem" src="/images/hand.png" alt="" /></div>
                </div>
                <div className="info">
                  <span className="i18n">{t("ts117", { ns: "ts" })}:</span>
                  <span className="withdrawAmount" style={{ color: "#04BE02", fontWeight: 600 }}>{userInfo?.dailyMoney?.withdrawAmount ? userInfo?.dailyMoney?.withdrawAmount : "0"}</span>
                </div>
              </CardsExpo>
              <CardsExpo>
                <div>
                  <div><svg width="64px" height="64px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#6D8C60" d="M5.33333335 6.00000006h3.3333333v6.6666666h-3.3333333zm4.33333329-4.66666662h3.3333333v11.33333322h-3.3333333zM1.00000006 8.6666667h3.3333333v3.99999996h-3.3333333z"></path> <g fill="#3f51b5"> <path d="M2.66666671 1.33333344l3.3333333 3.3333333v-3.3333333z"></path> <path d="M2.13143329 6.14556682l-.94266666-.94266666L4.5116666 1.8800002l.94266665.94266665z"></path> </g> </g></svg></div>
                </div>
                <div className="info">
                  <span className="i18n">{t("ts118", { ns: "ts" })}:</span>
                  <span className="proxyRebateAmount" style={{ color: colorP.forGround, fontWeight: 600 }}>{userInfo?.dailyMoney?.proxyRebateAmount ? userInfo?.dailyMoney?.proxyRebateAmount : "0"}</span>
                </div>
              </CardsExpo>
            </div>
            <div className="accntActions">
              <DatePickerV2 onChange={handleGetdateEven} />
              <Button style={{
                backgroundColor: colorP.forGround,
                color: colorP.text2,
                fontSize: ".18rem",
                textTransform: "capitalize",
                borderRadius: ".1rem"
              }} onClick={() => userInfos.refetch()} variant='contained' className="searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: "ts" })}</Button>
            </div>
            <div className="lists">
              {config?.game?.sport == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts119", { ns: "ts" })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: "ts" })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.sportBetAmount ? userInfo?.dailyMoney?.sportBetAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.sportWinAmount ? userInfo?.dailyMoney?.sportWinAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.sportRebateAmount ? userInfo?.dailyMoney?.sportRebateAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.sportBetNum ? userInfo?.dailyMoney?.sportBetNum : "0"}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}

              {config?.game?.egame == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts120", { ns: "ts" })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: "ts" })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.egameBetAmount ? userInfo?.dailyMoney?.egameBetAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.egameWinAmount ? userInfo?.dailyMoney?.egameWinAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.egameRebateAmount ? userInfo?.dailyMoney?.egameRebateAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.egameBetNum ? userInfo?.dailyMoney?.egameBetNum : "0"}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config?.game?.live == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts121", { ns: "ts" })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: "ts" })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.liveBetAmount ? userInfo?.dailyMoney?.liveBetAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.liveWinAmount ? userInfo?.dailyMoney?.liveWinAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.liveRebateAmount ? userInfo?.dailyMoney?.liveRebateAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.liveBetNum ? userInfo?.dailyMoney?.liveBetNum : "0"}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config?.game?.chess == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts122", { ns: "ts" })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: "ts" })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.chessBetAmount ? userInfo?.dailyMoney?.chessBetAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.chessWinAmount ? userInfo?.dailyMoney?.chessWinAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.chessRebateAmount ? userInfo?.dailyMoney?.chessRebateAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.chessBetNum ? userInfo?.dailyMoney?.chessBetNum : "0"}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config?.game?.esport == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts123", { ns: "ts" })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: "ts" })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.esportBetAmount ? userInfo?.dailyMoney?.esportBetAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.esportWinAmount ? userInfo?.dailyMoney?.esportWinAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.esportRebateAmount ? userInfo?.dailyMoney?.esportRebateAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.esportBetNum ? userInfo?.dailyMoney?.esportBetNum : "0"}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config?.game?.fishing == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts124", { ns: "ts" })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: "ts" })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: "ts" })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.fishingBetAmount ? userInfo?.dailyMoney?.fishingBetAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.fishingWinAmount ? userInfo?.dailyMoney?.fishingWinAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.fishingRebateAmount ? userInfo?.dailyMoney?.fishingRebateAmount : "0"}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{userInfo?.dailyMoney?.fishingBetNum ? userInfo?.dailyMoney?.fishingBetNum : "0"}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
            </div>
            <p className="hint">
              <span style={{ color: colorP.forGround }}>{t("ts125", { ns: "ts" })}:</span> <span style={{ color: colorP.text4 }}>{t("ts126", { ns: "ts" })}</span>
            </p>
          </div>
        </div>
      </div>
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
    </>

  );
}

export default OverView;
