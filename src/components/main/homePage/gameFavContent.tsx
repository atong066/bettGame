import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ChangeColorPallte,
  SetGameURL,
} from "../../globalFunctions/globalContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenGame } from "../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";

import {
  useFavGame,
  useGlobalVariables,
  useLoginStore,
  userRegstore,
} from "../../globalFunctions/store";
function GameContentFav(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);

  const userInfo = useGlobalVariables((state) => state.userDetails);
  const gameCollections = useFavGame((state) => state.favGame).filter(
    (item: any) => item.userName == userInfo.username
  );
  const colorP = ChangeColorPallte();
  const cookies = new Cookies();
  const GametabName = cookies.get("tabName");
  const gameOp = useOpenGame();
  const setGameURL = SetGameURL();
  const gameName = useRef();
  const navigate = useNavigate();
  function openGame(game: any, index: any) {
    if (userInfo?.isLogin === false) {
      userRegstore.setState({ isOpenRegister: true });
      return;
    }
    cookies.set("gameName", game.name);
    cookies.set("gameType", "Favorate");
    cookies.remove("index");
    cookies.remove("tabName");
    cookies.remove("tabCode");
    const url = game.url;
    gameName.current = game.name;
    const payload = {
      url: url,
      gameType: GametabName,
    };
    setGame(game, index);
    gameOp.mutate(payload);
  }
  if (gameOp.isSuccess) {
    cookies.set("tabName", gameOp.variables.gameType);
    const gameType = gameOp.variables.gameType;
    if (gameType == "yg" || gameType == "iyg") {
      const response = gameOp.data;
      if (response.data.success === false) {
        ToastrPngk({ msg: response.data.msg, type: "error" });
        gameOp.reset();
      } else {
        window.location.href = response.data.url;
        gameOp.reset();
      }
    } else {
      const response = gameOp.data;
      if (response.data.success === false) {
        ToastrPngk({ msg: response.data.msg, type: "error" });
        gameOp.reset();
      } else {
        if (response.data.url) {
          setGameURL(response.data.url);
          gameOp.reset();
        } else if (response.data.html) {
          setGameURL(response.data.html);
          gameOp.reset();
        } else {
          var blob = new Blob([response.data], { type: "text/html" });
          var url = window.URL.createObjectURL(blob);
          setGameURL(url);
          gameOp.reset();
        }
        setTimeout(() => {
          navigate("/online");
        }, 150);
      }
    }
  }
  function setGame(game: any, index: any) {
    const payload = {
      index: index,
      tabName: GametabName,
      userName: userInfo.userName,
      val: game,
    };
    useGlobalVariables.setState({ game: payload });
  }
  function removeFromFav(index: any) {
    useFavGame.getState().removeFavByID(index);
  }
  return (
    <>
      <Loader setLoader={gameOp.isLoading}></Loader>

      <div className="gameItemss" style={{ borderBottom: "0" }}>
        <div className="gameItems" key={"77589854"}>
          <div className="imageContainer">
            <div className="left">
              <img
                style={{ height: ".20rem" }}
                className="gameImage"
                src="/images/favor3.png"
                alt="Popular"
              />
              <div className="labelContainer">
                <span>{t("ts1030", { ns: "ts" })}</span>
              </div>
            </div>
          </div>
          {gameCollections && gameCollections.length > 0 && (
            <div className="games">
              {gameCollections.map(
                ({ index, tabName, val }: any, index2: any) => (
                  <div
                    id={index}
                    className="imgGames"
                    style={{ backgroundImage: "/images/loading-bg.png" }}
                    key={index2}
                  >
                    <div
                      className="starBtn"
                      onClick={() => removeFromFav(val.entID)}
                    >
                      <img
                        style={{ height: ".35rem", width: ".35rem" }}
                        className="icon"
                        src="/images/staricon.png"
                        alt=""
                      />
                    </div>
                    <LazyLoadImage
                      className="gameCard"
                      src={val.imageURL}
                      effect="blur"
                    />
                    <div
                      className="playBtn"
                      onClick={() => openGame(val, index2)}
                    >
                      <img className="icon" src="/images/playIcon.png" alt="" />
                    </div>
                    <div className="gameName">
                      {(val.czCode === "yg" || val.czCode === "iyg") &&
                        val.name}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      {gameCollections.length <= 0 && (
        <div
          className="noticeBox"
          style={{
            backgroundColor: colorP.backGorund,
            minHeight: "4rem",
            padding: ".8rem 0 1.5rem 0",
          }}
        >
          <div className="noMsessage">
            <img
              style={{ height: "2.5rem", width: "2.5rem" }}
              src="/supportImages/noMessage.png"
              alt=""
              className="noMessageImage"
            />
            <label className="noMessageLabel"> {t("ts355", { ns: "ts" })}</label>
          </div>
        </div>
      )}
    </>
  );
}
export default GameContentFav;
