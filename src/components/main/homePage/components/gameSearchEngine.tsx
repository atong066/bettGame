import { LazyLoadImage } from "react-lazy-load-image-component";
import {
    TabContainer,
    TabCustom,
    TabItem,
} from "../../common/components/tabComponent";
import GameContentFav2 from "../gameFavSearch";
import GameContentRecentSearch from "../gameRecentSerch";
import {
    useFavGame,
    useGlobalVariables,
    userRegstore,
} from "../../../globalFunctions/store";
import {
    ChangeColorPallte,
    SetGameURL,
} from "../../../globalFunctions/globalContext";
import { useEffect, useRef } from "react";
import { useGetPopularGame } from "../../../hooks/curstomHooks";
import Cookies from "universal-cookie";
import { useOpenGame, useRefreshBal } from "../../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../../../backdropLoader/backdrop-loader";
import { useTranslation } from "react-i18next";

export default function GameSearchEngine(props?: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const eGamesPOP = useGlobalVariables((state) => state.popularGames);
    const userInfo = useGlobalVariables((state) => state.userDetails);
    const value = useGlobalVariables((state) => state.tabIndex2);
    const color = ChangeColorPallte();
    const refreshBal = useRefreshBal();
    const popGame = useGetPopularGame();
    const navigate = useNavigate();

    const cookies = new Cookies();
    const setGameURL = SetGameURL();
    const gametabCode = cookies.get("tabCode");
    const gameOp = useOpenGame();
    const GametabName = cookies.get("tabName");
    const gameName = useRef();
    const gamePick = useFavGame((state) => state.favGame);
    function getAllgames() {
        useGlobalVariables.setState({ tabIndex2: 1 });

        const payload = {
            pageSize: 50,
        };
        popGame.mutate(payload);
    }
    function addTofav(value: any, index: any, gameTabName: any) {
        const payload = {
            tabName: gameTabName,
            userName: userInfo.username ? userInfo.username : null,
            index: index,
            val: {
                url: value.forwardUrl ? value.forwardUrl : value.thirdGameUrl,
                gamecode: value.czCode ? value.czCode : value.parentGameCode,
                imageURL: value.imgUrl ? value.imgUrl : value.imageUrl,
                gameName: value.name ? value.name : value.gameName,
                gameType: value.czCode ? value.czCode : value.parentGameCode,
            },
        };
        useFavGame.getState().addFavorateGame(payload);
    }
    function setGame(game: any, index: any, tabCode: any) {
        const payload = {
            index: index,
            tabName: GametabName,
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
    function removeFromFav(index: any) {
        useFavGame.getState().removeFavByID(index);
    }
    function openGame(game: any, index: any) {
        const url = game.forwardUrl ? game.forwardUrl : game.thirdGameUrl;
        if (userInfo?.isLogin === false) {
            userRegstore.setState({ isOpenRegister: true });
            return;
        }
        gameName.current = game.name;
        const payload = {
            url: url,
            gameType: GametabName,
        };
        setGame(game, index, "Popular");
        gameOp.mutate(payload);
    }
    function starStatus(entry: any, valueItem: any, tabCode: any) {
        const username = userInfo.username ? userInfo.username : null;
        const index = gamePick.findIndex(
            (item: any) =>
                item.userName === username &&
                (item.val.gameName === valueItem.gameName ||
                    item.val.gameName === valueItem.name)
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
                    onClick={() => removeFromFav(entry.entID)}
                    style={{ height: ".35rem", width: ".35rem" }}
                    className="icon"
                    src="/images/staricon.png"
                    alt=""
                />
            );
        }
    }
    const gameTabStle = {
        display: "flex",
    };
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
    function searchGame() {
        refreshBal.mutate();
        setGameURL(undefined);
        navigate("/search");
    }
    useEffect(() => {
        getAllgames();
    }, []);
    return (
        <div className="gameContainers-tab ">
            <Loader setLoader={gameOp.isLoading}></Loader>
            <div className="mainGames" style={{ backgroundColor: color.backGorund }}>
                <TabContainer width={props.width}>
                    {props.search && (
                        <TabCustom
                            onClick={props.search}
                            className={value === 0 ? "active" : ""}
                            index={0}
                        >
                            <div className="gTabsMini">
                                <img src="/images/Pesquisar.png" alt="" />
                                <span>{t("ts042", { ns: "ts" })}</span>
                            </div>
                        </TabCustom>
                    )}
                    <TabCustom
                        onClick={getAllgames}
                        className={value === 1 ? "active" : ""}
                        index={1}
                    >
                        <div className="gTabsMini">
                            <img src="/images/Populasr.png" alt="" />
                            <span>{t("ts1032", { ns: "ts" })}</span>
                        </div>
                    </TabCustom>
                    <TabItem className={value === 2 ? "active" : ""} index={2}>
                        <div className="gTabsMini">
                            <img src="/images/Recentes.png" alt="" />
                            <span>{t("ts1029", { ns: "ts" })}</span>
                        </div>
                    </TabItem>
                    <TabItem className={value === 3 ? "active" : ""} index={3}>
                        <div className="gTabsMini">
                            <img src="/images/Favoritos.png" alt="" />
                            <span>{t("ts1030", { ns: "ts" })}</span>
                        </div>
                    </TabItem>
                    <div onClick={searchGame} className="search">
                        <img src="/images/searchIconColor.png" alt="" />
                    </div>
                </TabContainer>

                <div
                    className="gameContainer"
                    style={{ backgroundColor: color.backGorund }}
                >
                    {value == 1 || value === 0 ? (
                        <div className="gameTab searchGameTab" style={gameTabStle}>
                            {eGamesPOP.success !== false && eGamesPOP.length !== 0 ? (
                                eGamesPOP?.map((game: any, index: any) => (
                                    <div
                                        className="gameTabContainerSub"
                                        style={{ backgroundImage: "/images/loading-bg.png" }}
                                    >
                                        <div className="starBtn">
                                            {/* {starStatus(index, game.czCode)} */}
                                            {starStatus(index, game, game.parentGameCode)}
                                        </div>
                                        <LazyLoadImage
                                            effect="blur"
                                            key={index}
                                            className={"game"}
                                            placeholder={<img src="/images/sjzc.png" />}
                                            src={game.imageUrl ? game.imageUrl : game.imgUrl}
                                        ></LazyLoadImage>
                                        <div
                                            className="playBtn"
                                            onClick={() => openGame(game, index)}
                                        >
                                            <img className="icon" src="/images/playIcon.png" alt="" />
                                        </div>
                                        <div className="gameName">
                                            {(game.czCode === "yg" || game.czCode === "iyg") &&
                                                game.name}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    className="noticeBox"
                                    style={{ backgroundColor: color.backGorund, width: "100%" }}
                                >
                                    <div className="noMsessage" style={{ backgroundColor: color.backGorund }}>
                                        <img
                                        style={{ width: "2.5rem",marginTop:"1rem"}}
                                            src="/supportImages/noMessage.png"
                                            alt=""
                                            className="noMessageImage"
                                        />
                                        <label className="noMessageLabel">

                                            {t("ts355", { ns: "ts" })}
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : value == 3 ? (
                        <GameContentFav2 type={""}></GameContentFav2>
                    ) : (
                        <GameContentRecentSearch></GameContentRecentSearch>
                    )}
                </div>
            </div>
        </div>
    );
}
