import MainLayout from "../../../layout";
import "../invite.css";
import Button from "@mui/material/Button";
import { useEffect, useReducer, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import Select from 'react-select'
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { getDatetoday, getdatYesturday, lastMonth, lastWeek, thisMonth, thisWeek } from "../../common/dateRangepicker";
import { addDays } from "date-fns";
import { dates } from "../../common/selectOtions";
import { teamDatamoney } from "./overViewData";
import { MiniCards, MiniCardHeaders, MiniCardBody, MiniCardTableHeader, MiniCardRows, MiniCardCell, MiniCardTableBody } from "../../../layout/common/miniCard";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import { DatePicker, DatePickerV2 } from "../../common/components/dropdownComponent";
import DateModal from "../../common/dateModal";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte, UserUSerConfig, UserUSerConfig2 } from "../../../globalFunctions/globalContext";
import Loader from "../../../backdropLoader/backdrop-loader";
import SubmitModal from "../../common/modal/submit-modal/submit-modal";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import { useAgentTeamOver, useGetTeam } from "../../../hooks/getUserInfoHook";
import TeamInfoTable from "./teamInfoTable";
import BettingTable from "./teamBettingTable";
import { useGlobalTeamListPageNumber, useGlobalVariables } from "../../../globalFunctions/store";

function TeamOverView() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  // const [teamData, setTeamData] = useState<any>();
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)

  const config2 = useGlobalVariables(state => state.stationConfig)

  const [bettingModal, setBettingTable] = useState(false)
  const [infoModal, setInfoModal] = useState(false)

  const currentPageNumber = useGlobalTeamListPageNumber(state => state.activePageNumber)

  const getTeamList = useGetTeam()

  const payload = {
    startDate: commonReducer.startDate,
    endDate: commonReducer.endDate,
  }
  console.log("payload", payload)
  const getAgentTeamOver = useAgentTeamOver(payload)
  const teamData = useGlobalVariables(state => state.teamData)
  function closeModal() {
    setBettingTable(false)
    setInfoModal(false)
  }

  useEffect(() => {
    getAgentTeamOver.refetch()
  }, [])

  const handleGetdateEven = (e: any) => {
    dispatch({ type: e.value, dates: e })
  }

  const [type, setType] = useState(0)
  function handleTeamListModal(value: any) {
    setType(value)
    useGlobalTeamListPageNumber.setState({ activePageNumber: 1 });
    const payload = {
      type: value,
      start: commonReducer.startDate,
      end: commonReducer.endDate,
      pageNumber: currentPageNumber,
      proxyName: "",
      include: true,
      load: true,
    }
    getTeamList.mutate(payload)
    if (value == 7) {
      setBettingTable(true)
    } else {
      setInfoModal(true)
    }
  }
  function getDataTeam() {
    getAgentTeamOver.refetch()
  }
  useEffect(() => {
    const payload = {
      type: type,
      start: commonReducer.startDate,
      end: commonReducer.endDate,
      pageNumber: currentPageNumber,
      proxyName: "",
      include: true,
      load: true,
    }
    getTeamList.mutate(payload)
  }, [currentPageNumber])

  return (
    <section>
      <Loader setLoader={getTeamList.isLoading || getAgentTeamOver.isLoading}></Loader>
      <TeamInfoTable isLoading={getTeamList.isLoading} teamData={getTeamList} openAlert={infoModal} closeAlert={closeModal} />
      <BettingTable isLoading={getTeamList.isLoading} teamData={getTeamList} openAlert={bettingModal} closeAlert={closeModal} />
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      <div className="main-invite-container">
        <div className="invite-body">
          <div className="el-card__body" style={{ backgroundColor: colorP.backGorund }}>
            <div className="accntActions">
              <DatePickerV2 placeholder="Select date..." options={dates} onChange={handleGetdateEven} />
              <Button style={{ backgroundColor: colorP.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: colorP.text2 }} onClick={getDataTeam} variant='contained' className="searchButton" startIcon={<SearchIcon style={{ height: ".2rem", width: ".2rem" }} />}>{t("ts042", { ns: ["ts"] })}</Button>
            </div>
            <div className="">
              <div className="top-bottom">
                <div className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts243", { ns: ["ts"] })}<span className="unit" style={{ color: colorP.forGround }}>({config2.moneyUnit})</span>
                  </p>
                  <p className="num" style={{ color: "#ffaa09" }}>{teamData?.teamMoney}</p>
                </div>
                <div className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts234", { ns: ["ts"] })}<span className="unit" style={{ color: colorP.forGround }}>（{config2.moneyUnit}）</span>
                  </p>
                  <p className="num" style={{ color: "#04BE02" }}>{teamData?.dailyMoney?.withdrawAmount}</p>
                </div>
                <div className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts233", { ns: ["ts"] })}<span className="unit" style={{ color: colorP.forGround }}>（{config2.moneyUnit}）</span>
                  </p>
                  <p className="num" style={{ color: "#EA4E3D" }}>{teamData?.dailyMoney?.depositAmount}</p>
                </div>
                <div className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts235", { ns: ["ts"] })}<span className="unit" style={{ color: colorP.forGround }}>（{config2.moneyUnit}）</span>
                  </p>
                  <p className="num" style={{ color: "#EA4E3D" }}>{teamData?.dailyMoney?.depositArtificial}</p>
                </div>
                <div className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts236", { ns: ["ts"] })}<span className="unit" style={{ color: colorP.forGround }}>（{config2.moneyUnit}）</span>
                  </p>
                  <p className="num" style={{ color: colorP.text3 }}>{teamData?.dailyMoney?.proxyRebateAmount}</p>
                </div>

                {/* type 8 */}
                <div onClick={() => handleTeamListModal(8)} className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts244", { ns: ["ts"] })}
                    <span className="unit" style={{ color: colorP.forGround }}>  {t("ts238", { ns: ["ts"] })}</span>
                  </p>
                  <p className="num cursor" style={{ color: colorP.text3 }}>{teamData?.totalFirstDepositNum}</p>
                </div>
                {/* type 7 */}
                <div onClick={() => handleTeamListModal(7)} className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts245", { ns: ["ts"] })}
                    <span className="unit" style={{ color: colorP.forGround }}>  {t("ts238", { ns: ["ts"] })}</span>
                  </p>
                  <p className="num cursor" style={{ color: colorP.text3 }}>{teamData?.betNum}</p>
                </div>
                {/* type 10 */}
                <div onClick={() => handleTeamListModal(10)} className="item cursor" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts387", { ns: ["ts"] })}
                    <span className="unit" style={{ color: colorP.forGround }}>  {t("ts238", { ns: ["ts"] })}</span>
                  </p>
                  <p className="num" style={{ color: colorP.text3 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span> {t("ts274", { ns: ["ts"] })}: {teamData?.proxyCount}</span>
                      <span> {t("ts273", { ns: ["ts"] })}: {teamData?.memberCount}</span>
                    </div>
                  </p>
                </div>
                {/* type 5 */}
                <div onClick={() => handleTeamListModal(5)} className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts246", { ns: ["ts"] })}<span className="unit" style={{ color: colorP.forGround }}>  {t("ts238", { ns: ["ts"] })}</span>
                  </p>
                  <p className="num cursor" style={{ color: colorP.text3 }}>{teamData?.onlineNum}</p>
                </div>
                {/* type 6 */}
                <div onClick={() => handleTeamListModal(6)} className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts247", { ns: ["ts"] })}
                    <span className="unit" style={{ color: colorP.forGround }}>  {t("ts238", { ns: ["ts"] })}</span>
                  </p>
                  <p className="num cursor" style={{ color: colorP.text3 }}>{teamData?.threeNotLoginNum}</p>
                </div>
                {/* type 4 */}
                <div onClick={() => handleTeamListModal(4)} className="item" style={{ borderColor: colorP.fourth, overflow: "hidden" }}>
                  <p style={{ backgroundColor: colorP.fourth, color: colorP.text3 }}>
                    {t("ts248", { ns: ["ts"] })}
                    <span className="unit" style={{ color: colorP.forGround }}>  {t("ts238", { ns: ["ts"] })}</span>
                  </p>
                  <p className="num cursor" style={{ color: colorP.text3 }}>{teamData?.registerCount}</p>
                </div>
              </div>
            </div>
            <div className="list">
              {<MiniCards>
                <MiniCardHeaders>{t("ts119", { ns: ["ts"] })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: ["ts"] })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.sportBetAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.sportWinAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.sportRebateAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.sportBetNum}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config2.game?.egame == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts120", { ns: ["ts"] })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: ["ts"] })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.egameBetAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.egameWinAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.egameRebateAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.egameBetNum}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config2.game?.live == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts121", { ns: ["ts"] })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: ["ts"] })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.liveBetAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.liveWinAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.liveRebateAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.liveBetNum}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config2.game?.chess == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts122", { ns: ["ts"] })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: ["ts"] })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.chessBetAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.chessWinAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.chessRebateAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.chessBetNum}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config2.game?.esport == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts123", { ns: ["ts"] })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: ["ts"] })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.esportBetAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.esportWinAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.esportRebateAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.esportBetNum}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
              {config2.game?.fishing == 2 && <MiniCards>
                <MiniCardHeaders>{t("ts124", { ns: ["ts"] })}</MiniCardHeaders>
                <MiniCardBody>
                  <MiniCardTableHeader>
                    <MiniCardRows>
                      <MiniCardCell>{t("ts249", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts250", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts251", { ns: ["ts"] })}</MiniCardCell>
                      <MiniCardCell>{t("ts252", { ns: ["ts"] })}</MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableHeader>
                  <MiniCardTableBody>
                    <MiniCardRows>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.fishingBetAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.fishingWinAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.fishingRebateAmount}</span></MiniCardCell>
                      <MiniCardCell><span style={{ color: "#ffaa09" }}>{teamData?.dailyMoney?.fishingBetNum}</span></MiniCardCell>
                    </MiniCardRows>
                  </MiniCardTableBody>
                </MiniCardBody>
              </MiniCards>}
            </div>
            <p className="hint">
              <span style={{ color: colorP.forGround }}>{t("ts125", { ns: "ts" })}:</span> <span style={{ color: "#ADB6C3" }}>{t("ts126", { ns: "ts" })}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

  );
}

export default TeamOverView;
