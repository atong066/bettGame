import { ChangeColorPallte, SetGameURL, SetNewBalance, useBalance } from "../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import MainLayout from "../../layout";
import { useNavigate } from "react-router";
import { useRefreshBal } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useGlobalVariables, useRecent } from "../../globalFunctions/store";
import GameSearchEngine from "./components/gameSearchEngine";
function GameFrame(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const navigate = useNavigate()
  const color = ChangeColorPallte()
  const setGameURL = SetGameURL()
  const getGameURl = useBalance()
  const gameCache = useGlobalVariables(state => state.game)
  const gamePick = useRecent(state => state.recentGame)
  const cookies = new Cookies();
  const gameType = cookies.get('gameType');
  const gameName = cookies.get('gameName');
  const tabName = cookies.get('tabName');
  const refreshBalance = useRefreshBal()
  function handleCloseGame() {
    refreshBalance.mutate()
    setGameURL(undefined)
    const cookies = new Cookies();
    const index = cookies.get('index');
    const tabCode = cookies.get('tabCode');
    const tabName = cookies.get('tabName');
    if (!index || (!tabCode && !tabName)) {
      navigate('/')
    }
    else {
      navigate('/game?index=' + index + '&tabCode=' + tabCode + '&tabName=' + tabName + '')
    }

  }
  function fullScreen() {
    const elem = document.querySelector("#gameFrame");
    elem && elem.requestFullscreen()
  }
  useEffect(() => {
    if (!getGameURl) {
      refreshBalance.mutate()
      navigate('/')
    }
    const gCode = gameCache?.val?.gamecode
    const gName = gameCache?.val?.gameName
    const index = gamePick.findIndex((item: any) => item.val.gamecode === gCode && item.val.gameName === gName)
    if (index < 0) {
      useRecent.getState().addToRecent(gameCache)
    }
  }, [getGameURl])
  useEffect(() => {
    return () => {
      setGameURL(undefined)
      refreshBalance.mutate()
    }
  }, [])
  return (

    <MainLayout>
      {/* <Loader setLoader={refreshBalance.isLoading}></Loader> */}
      <section className="mainEvent">
        <div className="frameContainer">
          <div className="frameControlers">
            <div className="frags">
              <span>{decodeURIComponent(gameType)}</span> <img src="/images/arrow-down.png" alt="" /> <span>{decodeURIComponent(gameCache?.val?.gameType) === "pgn" ? "PG" : decodeURIComponent(gameCache?.val?.gamecode)}</span> <img src="/images/arrow-down.png" alt="" /><span className="tail">{decodeURIComponent(gameName)}</span>
            </div>
            <div className="sizeClose">
              <div onClick={() => handleCloseGame()} className="closeGame">
                <img className="closeIcon" src="/images/closeIcon.png" alt="" />
                <span>{t("ts408", { ns: "ts" })}</span>
              </div>
              <div className="fullScreen" onClick={() => fullScreen()}>
                <img src="/images/fullScreen.png" alt="" />
                <span>{t("ts791", { ns: "ts" })}</span>
              </div>
            </div>
          </div>
          <div className="frameGrme">
            <iframe src={getGameURl} frameBorder="0" id="gameFrame">

            </iframe>
          </div>
        </div>
        <GameSearchEngine width={"fit-content"}></GameSearchEngine>
      </section>
    </MainLayout>
  )
}
export default GameFrame;