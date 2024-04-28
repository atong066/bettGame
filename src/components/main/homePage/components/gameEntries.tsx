import { LazyLoadImage } from "react-lazy-load-image-component";
import {
    useFavGame,
    useGlobalList,
    useGlobalVariables,
    userRegstore,
} from "../../../globalFunctions/store";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useOpenGame } from "../../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import { SetGameURL } from "../../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../../backdropLoader/backdrop-loader";
export default function GameEntriesMain(props: any) {
    const games = props.games;
    const { t, i18n } = useTranslation(["home", "main"]);
    const tab = props.tabs;
    const setGameURL = SetGameURL();
    const userInfo = useGlobalVariables((state) => state.userDetails);
    const navigate = useNavigate();
    const gameOp = useOpenGame();
    const [lowerLimit, setLowerLimit] = useState(6);
    const [upperLimit, setUpperLimit] = useState(12);
    const lotLimmit=useGlobalList(state=>state.lotteryLimit)
    const gamePick = useFavGame((state) => state.favGame);
    function addTofav(value: any, index: any, gameTabName: any) {
        const payload = {
            tabName: gameTabName,
            index: index,
            userName: userInfo.username ? userInfo.username : null,
            val: {
                entID: uuidv4(),
                url: value.forwardUrl ? value.forwardUrl : value.thirdGameUrl,
                gamecode: value.czCode ? value.czCode : value.parentGameCode,
                imageURL: value.imgUrl ? value.imgUrl : value.imageUrl,
                gameName: value.name ? value.name : value.gameName,
                gameType: value.czCode ? value.czCode : value.parentGameCode,
            },
        };
        useFavGame.getState().addFavorateGame(payload);
    }
    function viewMore() {
        setLowerLimit(lowerLimit + 12);
        setUpperLimit(upperLimit + 12);
        useGlobalList.setState({lotteryLimit:lotLimmit+12})
    }
    function starStatus(entry: any, valueItem: any, tabCode: any) {
        const username = userInfo.username ? userInfo.username : null;
        const index = gamePick.findIndex(
            (item: any) =>
                item.userName === username &&
                item.val.gamecode === valueItem.czCode &&
                item.val.gameName === valueItem.name
        );
        if (index < 0) {
            return (
                <img
                    onClick={() => addTofav(valueItem, entry, tabCode)}
                    className="icon"
                    src="/images/star.png"
                    alt=""
                />
            );
        } else {
            return (
                <img
                    onClick={() => removeFromFav(entry)}
                    style={{ height: ".35rem", width: ".35rem" }}
                    className="icon"
                    src="/images/staricon.png"
                    alt=""
                />
            );
        }
    }
    function removeFromFav(index: any) {
        useFavGame.getState().removeFav(index);
    }
    function viewGamesTab(
        value: any,
        index: any,
        tab: any,
        tabName: any,
        gameIndex: any
    ) {
        if (value.popFrame == true && value.czCode !== "v8poker") {
            const cookies = new Cookies();
            cookies.set("index", index);
            cookies.set("tabCode", tabName);
            cookies.set("tabName", value.czCode);
            cookies.set("gameName", value.name);
            cookies.set("indTabcode", tab);
            cookies.set("gameType", tabName);
            setTimeout(() => {
                navigate(`/game`);
            }, 150);
        } else {
            if (userInfo?.isLogin === false) {
                userRegstore.setState({ isOpenRegister: true });
                return;
            }
            setGame(value, gameIndex, tab);
            const cookies = new Cookies();
            cookies.remove("index");
            cookies.remove("tabName");
            cookies.remove("tabCode");
            cookies.set("gameName", value.name);
            cookies.set("gameType", tabName);
            const payload = {
                url: value.forwardUrl,
                gameType: value.gameType,
            };
            gameOp.mutate(payload);
        }
    }
    if (gameOp.isSuccess) {
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
    function setGame(game: any, index: any, tabCode: any) {
        const payload = {
            index: index,
            tabName: tabCode,
            userName: userInfo.username ? userInfo.username : null,
            val: {
                url: game.forwardUrl ? game.forwardUrl : game.thirdGameUrl,
                gamecode: game.czCode ? game.czCode : game.parentGameCode,
                imageURL: game.imgUrl ? game.imgUrl : game.imageUrl,
                gameName: game.name ? game.name : game.gameName,
                gameType: game.czCode ? game.czCode : game.parentGameCode,
            },
        };
        useGlobalVariables.setState({ game: payload });
    }
    return (
        <>
            <Loader setLoader={gameOp.isLoading}></Loader>
            <div className="games">
                {games
                    .slice(
                        0,
                        tab?.code == "hotgame_tab_icon" ||
                            tab?.code == "qipai_tab_icon" ||
                            tab?.code == "recommend_game_tab_icon" ||
                            tab?.code == "featured_game_tab_icon" ||
                            tab?.code == "in-house"
                            ? upperLimit
                            :  tab?.code == "official_tab_icon" ? lotLimmit : lowerLimit
                    )
                    .map((value: any, index2: any) => (
                        <div
                            id={index2}
                            className="imgGames"
                            style={{ backgroundImage: "/images/loading-bg.png" }}
                            key={index2}
                        >
                            {(tab?.code == "hotgame_tab_icon" ||
                                tab?.code == "qipai_tab_icon" ||
                                tab?.code == "recommend_game_tab_icon" ||
                                tab?.code == "featured_game_tab_icon" ||
                                tab?.code == "in-house") && (
                                    <div className="starBtn">
                                        {starStatus(index2, value, tab.code)}
                                    </div>
                                )}
                            <LazyLoadImage
                                className="gameCard"
                                src={value.imgUrl}
                                effect="blur"
                            />
                            <div
                                className="playBtn"
                                onClick={() =>
                                    viewGamesTab(
                                        value,
                                        props.index,
                                        tab.code,
                                        tab.customTitle ? tab.customTitle : tab.name,
                                        index2
                                    )
                                }
                            >
                                <img className="icon" src="/images/playIcon.png" alt="" />
                            </div>
                            <div className="gameName">
                                {(value.czCode === "yg" || value.czCode === "iyg") && value.name}
                            </div>
                        </div>
                    ))}
            </div>
            <div style={{ marginTop: ".3rem" }}>
                {(tab?.code == "hotgame_tab_icon" ||
                    tab?.code == "qipai_tab_icon" ||
                    tab?.code == "recommend_game_tab_icon" ||
                    tab?.code == "featured_game_tab_icon" ||
                    tab?.code == "in-house"
                    ? upperLimit
                    : tab?.code == "official_tab_icon" ? lotLimmit : lowerLimit) <= games.length ? (
                    <div
                        className="loadMore"
                        style={{ fontSize: ".16rem", cursor: "default", color: "#68707b" }}
                    >
                        {t('ts1035', { ns: 'ts' })}
                        {" "}{games.length}{" "} {t('ts1198', { ns: 'ts' })}{tab?.customTitle ? tab?.customTitle : tab?.name}
                        {t('ts1036', { ns: 'ts' })}{" "}
                       
                        {tab?.code == "hotgame_tab_icon" || tab?.code == "qipai_tab_icon" ||
                        tab?.code == "recommend_game_tab_icon" ||
                        tab?.code == "featured_game_tab_icon" ||
                        tab?.code == "in-house"
                        ? upperLimit
                        : tab?.code == "official_tab_icon" ? lotLimmit : lowerLimit}{" "}
                        {t('ts1198', { ns: 'ts' })}
                        <span
                            onClick={() => {
                                viewMore();
                            }}
                            style={{
                                cursor: "pointer",
                                fontSize: ".16rem",
                                fontWeight: "400",
                                color: "#adb6c3",
                            }}
                        >
                            {t("ts807", { ns: "ts" })}{" "}
                            <img height={18} width={18} src="/images/arrow-down.png" alt="" />
                        </span>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
