import "./sidebar.css";
import { useTranslation } from "react-i18next";
import "./mission.css";
import Loader from "../../backdropLoader/backdrop-loader";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useGetGames } from "../../hooks/getUserInfoHook";
import { useGlobalVariables, useModalStates, } from "../../globalFunctions/store";
import { useChangeLanguage } from "../../hooks/curstomHooks";
import { LanguagePicker, SidebarTabs } from "./components/iconTabs";
import SideLinks from "./components/sideLinks";
import MultiMediaContainer from "./components/multimediaContainer";
import { ValidateLogin } from "../../hooks/actions";
import GameLink, { GameFavLink, GameLinkLoader, GameRecentLink } from "./components/gameLinks";
function Sidebar(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte();
  const staConfig = useGlobalVariables((state) => state.stationConfig);
  const gameLoader = useGetGames({ type: "11" });
  const gameTabs = useGlobalVariables((state) => state.gameTabs);
  const changeLanguage = useChangeLanguage();
  const userconfigData = useGlobalVariables((state) => state.userConfig);
  const openSideTurn = () => {
    useModalStates.setState({ sideTurn: true })
  }
  return (
    <>
      <Loader setLoader={changeLanguage.isLoading} />
      <div
        className={`sideBar ${props.sidebarActive ? "" : "sideBar active"}`}
        style={{ backgroundColor: colorP.backGorund }}
      >
        <div className="sidebarContainer">
          <div className="mainGameChooseContainer">
            <div className="gameContainer">
              {gameLoader.isLoading == false ?
                gameTabs &&
                gameTabs?.filter((entry: { games: any }) => entry.games.length !== 0)
                  .map(({ games, tab }: any, index: any) => (
                    <GameLink index={index} tab={tab}></GameLink>
                  )) : <GameLinkLoader />}
              <GameRecentLink index={97} link={"recent"}></GameRecentLink>
              <GameFavLink index={98} link={"recent"} ></GameFavLink>
            </div>
          </div>
          <MultiMediaContainer></MultiMediaContainer>
          <div className="linksContainer" style={{ backgroundColor: colorP.third }}>
            <SidebarTabs link="/event" icon="sidebarImages/event.png">
              {t("ts452", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/event-mission" icon="sidebarImages/calendar.png">
              {" "}
              {t("ts453", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/rebate-fishing" icon="sidebarImages/rebate.png">
              {" "}
              {t("ts454", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/pending" icon="sidebarImages/gift.png">
              {" "}
              {t("ts455", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/record-collection" icon="sidebarImages/present.png">
              {" "}
              {t("ts456", { ns: "ts" })}
            </SidebarTabs>
            {staConfig?.onOffMoneyIncome === true &&
              <SidebarTabs link="/balance-bonus" icon="sidebarImages/bank.png">
                {" "}
                {t("ts984", { ns: "ts" })}
              </SidebarTabs>
            }
            <SidebarTabs link="/vip" icon="sidebarImages/king.png">
              {" "}
              VIP
            </SidebarTabs>
            {staConfig?.pingduoduo_act_switch === true &&
              <SidebarTabs onClick={openSideTurn} link="/turnlateSide" icon="sidebarImages/pdd.png">
                {" "}
                {t("ts1214", { ns: "ts" })}
              </SidebarTabs>
            }
            <SidebarTabs link="/PromotionPage" onClick={() => ValidateLogin("/vip")} icon="sidebarImages/convide.png">
              {" "}
              {t("ts274", { ns: "ts" })}
            </SidebarTabs>
          </div>
          <div className="sidebarFooterContainer">
            {(staConfig.showChineseLan || staConfig.showChineseLan) && <LanguagePicker></LanguagePicker>}
            <SideLinks link="/download-page" icon={<img height={25} src="/images/down.png"></img>} label={t("ts156", { ns: "ts" })}></SideLinks>
            <SideLinks link="/support" icon={<img height={25} src="/images/call.png"></img>} label={t("ts157", { ns: "ts" })}></SideLinks>
            <SideLinks link="/faq" icon={<img height={25} src="/images/wenhao.png"></img>} label={t("ts158", { ns: "ts" })}></SideLinks>
            {/* <SideLinks link="/activeEvent" icon={<CardGiftcardIcon className="itemIcon"></CardGiftcardIcon>} label={t("ts573", { ns: "ts" })}></SideLinks> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
