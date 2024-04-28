
import { GameHeader } from "../common/header";
import { useEffect, useRef, useState } from "react";
import './gamesTab.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ChangeColorPallte, SetGameURL, useBalance } from "../../globalFunctions/globalContext";
import MainLayout from "../../layout";
import { useGetFactoryGames, useGetGames, useOpenGame } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";
import { useNavigate } from "react-router";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Cookies from "universal-cookie";
import { useFavGame, useGlobalVariables, userRegstore } from "../../globalFunctions/store";
import { useGetPopularGame, useSearchGameItem } from "../../hooks/curstomHooks";
import GameContentRecentSearch from "./gameRecentSerch";
import GameContentFav2 from "./gameFavSearch";
import GameContentSearch from "./gameSearches";
import { v4 as uuidv4 } from "uuid";
import { test } from "./actions/actions";
import PngkPagination from "../../Pagination/pagination";
import { useTranslation } from "react-i18next";

function GameSpace(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);

    const color = ChangeColorPallte()
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [currentPage, setCurrentPage] = useState(1)
    const Tabindex = cookies.get('index');
    const gametabCode = cookies.get('tabCode');
    const gamePick = useFavGame(state => state.favGame)
    const GametabName = cookies.get('tabName');
    const GameTabCode = cookies.get('indTabcode');
    const setGameURL = SetGameURL()
    const { isLoading, data: SubGames, isSuccess } = useGetGames(Tabindex)
    const [gameIndex, setActobeIndex] = useState(GametabName);
    const topReff = useRef<any>();
    const searchItemG = useSearchGameItem()
    const games = useGetFactoryGames(GametabName, 50, currentPage)
    const gameOp = useOpenGame()
    const [isPop, setIspop] = useState(false)
    const [search, setSearchBox] = useState("")
    const gameName = useRef()
    const [isSearching, setIsSearching] = useState(false)
    const popGame = useGetPopularGame()
    const [btnTab, setBtnTab] = useState(0)
    const userInfo = useGlobalVariables(state => state.userDetails)

    const scrollToBottom = () => {
        topReff?.current.scrollIntoView();
    };
    function openGame(game: any, index: any) {
        const url = game.forwardUrl ? game.forwardUrl : game.thirdGameUrl
        if (userInfo?.isLogin === false) {
            userRegstore.setState({ isOpenRegister: true })
            return
        }
        gameName.current = game.name
        const payload = {
            url: url,
            gameType: GametabName,
        }
        setGame(game, index, gameIndex)
        gameOp.mutate(payload)
    }
    function gameClick(id: any, name: any) {
        setIspop(false)
        setIsSearching(false)
        setBtnTab(0)
        setSearchBox('')
        const cookies = new Cookies();
        cookies.set('index', Tabindex);
        cookies.set('tabCode', gametabCode);
        cookies.set('tabName', id);
        cookies.set('gameName', name);
        cookies.set('gameType', id);
        setActobeIndex(id)
        navigate('/game')
    }
    function getGame() {
        const payload = {
            pageSize: 50,
            gameType: GametabName,
        }
        popGame.mutate(payload)
        setIspop(true)
    }
    useEffect(() => {
        if(GametabName){
            setActobeIndex(GametabName)
            setTimeout(() => {
                scrollToBottom()
            }, 100);
        }
        
    }, [])
    const gameTabStle = {
        display: "flex",
    }
    if (gameOp.isSuccess) {
        const gameType = gameOp.variables.gameType
        if (gameType == "yg" || gameType == "iyg") {
            const response = gameOp.data
            if (response.data.success === false) {
                ToastrPngk({ msg: response.data.msg, type: "error" })
                gameOp.reset()
            }
            else {
                window.location.href = response.data.url
                gameOp.reset()
            }
        }
        else {
            const response = gameOp.data
            if (response.data.success === false) {
                ToastrPngk({ msg: response.data.msg, type: "error" })
                gameOp.reset()
            }
            else {
                if (response.data.url) {
                    setGameURL(response.data.url)
                    gameOp.reset()
                }
                else if (response.data.html) {
                    setGameURL(response.data.html)
                    gameOp.reset()
                }
                else {
                    var blob = new Blob([response.data], { type: "text/html" });
                    var url = window.URL.createObjectURL(blob);
                    setGameURL(url)
                    gameOp.reset()
                }
                setTimeout(() => {
                    navigate('/online')
                }, 150)
            }
        }
    }
    const active = { backgroundColor: color.forGround }
    const inActive = { backgroundColor: color.backGorund }
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
            }
        }
        useFavGame.getState().addFavorateGame(payload)

    }
    function starStatus(entry: any, valueItem: any, tabCode: any) {
        const index = gamePick.findIndex((item: any) => item.userName == userInfo.username && (item.val.gameName === valueItem.name || item.val.gameName === valueItem.gameName))
        if (index < 0) {
            return <img onClick={() => addTofav(valueItem, entry, tabCode)} className="icon" src="/images/star.png" alt="" />
        }
        else {
            return <img onClick={() => removeFromFav(entry)} style={{ height: ".35rem", width: ".35rem" }} className="icon" src="/images/staricon.png" alt="" />
        }
    }
    function removeFromFav(index: any) {
        useFavGame.getState().removeFav(index)
        searchGameEngine()
    }
    function searchGameEngine() {
        const payload = {
            keyword: search
        }

        searchItemG.mutate(payload)
    }
    const handleSearchInput = (e: any) => {
        setIsSearching(true)
        setIspop(true)
        setBtnTab(4)
        setSearchBox(e.target.value)

    }
    function clearSearchBar() {
        setSearchBox('')
        setBtnTab(1)
        const payload = {
            pageSize: 50,
        }
        popGame.mutate(payload)
    }
    function getPopular() {
        const payload = {
            pageSize: 50,
        }
        popGame.mutate(payload)
        setIsSearching(true)
        setIspop(true)
        setBtnTab(1)
    }
    useEffect(() => {
        searchGameEngine()
        if (search == "") {
            if (isSearching == true) {
                setBtnTab(1)
                const payload = {
                    pageSize: 50,
                }
                popGame.mutate(payload)
            }
            else {
                setBtnTab(0)
            }

        }
    }, [search])
    useEffect(() => {
       
        games.refetch()
        if(!GametabName){
            navigate("/")
        }
        
    }, [currentPage])
   
    function setGame(game: any, index: any, tabCode: any) {
        const payload = {
            index: index,
            tabName: GametabName,
            userName: userInfo.username,
            val: {
                url: game.forwardUrl ? game.forwardUrl : game.thirdGameUrl,
                gamecode: game.czCode ? game.czCode : game.parentGameCode,
                imageURL: game.imgUrl ? game.imgUrl : game.imageUrl,
                gameName: game.name ? game.name : game.gameName,
                gameType: game.czCode ? game.czCode : game.parentGameCode,
            },
        }
        useGlobalVariables.setState({ game: payload })
    }
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <MainLayout>
            <Loader setLoader={gameOp.isLoading}></Loader>
            <section ref={topReff} className="mainEvent">
                <GameHeader>{gametabCode}</GameHeader>
                <div className="searchBarContainer" style={{ backgroundColor: color.backGorund }}>
                    <input value={search} onChange={handleSearchInput} type="text" placeholder={t("ts1033", { ns: "ts" })} />
                    <span className="searchIcon"><img width={30} height={30} src="/images/searchIcon.png" alt="" /></span>
                    {search !== '' && <span onClick={clearSearchBar} className="closeIcon"><img width={30} height={30} src="/images/closeS.png" alt="" /></span>}
                    <button>{t("ts042", { ns: "ts" })}</button>
                </div>
                <div className="gameContainers-tab" style={{ marginBottom: ".2rem" }}>
                    <div className="gameSidebars">
                        <div className="tabContainer">
                            <div onClick={getPopular} className={(search != "" || isSearching === true) ? "tabs active" : 'tabs ' + gameIndex}
                                style={(search != "" || isSearching === true) ? active : inActive}>
                                <div className="icon">
                                    <LazyLoadImage
                                        src={'/logo/' + GameTabCode + '_active.png'} alt=""
                                    />
                                    {/* <span style={{ textTransform: "capitalize" }}>{gametabCode}</span> */}
                                    <span style={{ textTransform: "capitalize" }}>{t("ts587", { ns: "ts" })}</span>
                                </div>
                            </div>
                            {GametabName &&
                                isLoading ? <Loader setLoader={isLoading}></Loader> : SubGames?.data[Tabindex]?.games?.map((game: any, index: any) =>
                                    <div key={index} onClick={() => gameClick(game.czCode, game.name)} className={(gameIndex == game.czCode && isSearching === false) ? "tabs active" : 'tabs ' + game.czCodeIndex}
                                        style={(gameIndex == game.czCode && isSearching === false) ? active : inActive}>
                                        <div className="icon">
                                            <LazyLoadImage
                                                src={'/images/logo_' + game.gameType + '.png'} alt=""
                                            />
                                            <span>{game.czCode == "pgn" ? "PG" : game.czCode}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="mainGames" style={{ backgroundColor: color.backGorund }}>
                        <div className="gameNav">
                            {isSearching === false && <button onClick={() => setBtnTab(0)} className={btnTab == 0 ? "active" : ""}>{t("ts1034", { ns: "ts" })}</button>}
                            <button onClick={() => { setBtnTab(1); getGame() }} className={(btnTab == 1) ? "active" : ""}>{t("ts1032", { ns: "ts" })}</button>
                            <button onClick={() => { setBtnTab(2); getGame() }} className={btnTab == 2 ? "active" : ""}>{t("ts1029", { ns: "ts" })}</button>
                            <button onClick={() => { setBtnTab(3); getGame() }} className={btnTab == 3 ? "active" : ""}>{t("ts1030", { ns: "ts" })}</button>
                            {search !== "" && <button className="active">{t("ts042", { ns: "ts" })}</button>}
                        </div>
                        <div className="gameContainer" style={{ backgroundColor: color.backGorund }}>

                            <div className="gameTab" style={gameTabStle}>
                                {  isPop == false ? 
                                    games.isLoading == true ? <Loader setLoader={games.isLoading}></Loader> :GametabName && (games.data?.data || games.data?.data.success !== false) && games?.data?.data?.rows.map((game: any, index: any) =>
                                        <div className="gameTabContainerSub" style={{ backgroundImage: "/images/loading-bg.png" }}>
                                            <div className="starBtn">
                                                {starStatus(index, game, GameTabCode)}
                                            </div>
                                            <LazyLoadImage
                                                effect="blur"
                                                key={index}
                                                className={"game"}
                                                placeholder={<img src="/images/sjzc.png" />}
                                                src={game.imgUrl}
                                            >

                                            </LazyLoadImage>
                                            <div className="playBtn" onClick={() => openGame(game, index)}>
                                                <img className="icon" src="/images/playIcon.png" alt="" />
                                            </div>
                                            <div className="gameName">
                                                {(game.czCode === "yg" || game.czCode === "iyg") && game.name}
                                            </div>
                                        </div>
                                    ) : btnTab == 1 ? popGame.isSuccess === true && popGame?.data?.rows?.map((game: any, index2: any) =>
                                        <div className="gameTabContainerSub" style={{ backgroundImage: "/images/loading-bg.png" }}>
                                            <div className="starBtn" >
                                                {starStatus(index2, game, GameTabCode)}
                                            </div>
                                            <LazyLoadImage
                                                effect="blur"
                                                key={index2}
                                                className={"game"}
                                                placeholder={<img src="/images/sjzc.png" />}
                                                src={game.imageUrl}
                                            >

                                            </LazyLoadImage>
                                            <div className="playBtn" onClick={() => openGame(game, index2)}>
                                                <img className="icon" src="/images/playIcon.png" alt="" />
                                            </div>
                                            <div className="gameName">
                                                {(game.czCode === "yg" || game.czCode === "iyg") && game.name}
                                            </div>


                                        </div>
                                    ) : btnTab == 2 ? <GameContentRecentSearch gIndex={gameIndex} type={GametabName}></GameContentRecentSearch> :
                                        btnTab == 3 ? <GameContentFav2 type={GametabName}></GameContentFav2> :
                                            btnTab == 4 ? <GameContentSearch>{searchItemG}</GameContentSearch> : setIspop(false)
                                }
                            </div>

                        </div>

                    </div>
                </div>
                <div className="pagination" style={{ marginBottom: ".2rem" }}>
                    <PngkPagination data={Math.ceil(games.data?.data.total / 50)} action={handleChangePage}></PngkPagination>
                </div>
            </section>

        </MainLayout>
    )
}
export default GameSpace;