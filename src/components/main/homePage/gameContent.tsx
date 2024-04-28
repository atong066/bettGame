import { useEffect, useState } from "react";
import { GetActiveGame, SetActiveSidebarFn } from "../../globalFunctions/loginContext";
import { useNavigate } from "react-router-dom";
import { useGetGames, useOpenGame } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";
import Cookies from "universal-cookie";
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";
import GameEntriesMain from "./components/gameEntries";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@mui/material";

function GameContent() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const gamesContent = useGetGames({ type: "11" })
    const activeGameId = useGlobalList(state => state.sideAction);
    const gameCollections = useGlobalVariables(state => state.gameTabs)
    const setActobeIndex = SetActiveSidebarFn()
    const gameOp = useOpenGame()
    const navigate = useNavigate();
    useEffect(() => {
        const tabLink = document.getElementById(activeGameId);
        tabLink?.scrollIntoView();
    }, [activeGameId])
    function getSubGame(index: any,tab?:any) {
       if(tab.code!=="official_tab_icon"){
        const cookies = new Cookies();
        cookies.set('index', index);
        cookies.set('tabCode', gameCollections[index].tab.name);
        cookies.set('tabName', gameCollections[index].games[0].czCode);
        cookies.set("indTabcode", tab.code);
        setTimeout(() => {
            navigate(`/game`)
        }, 150)
       }
       else{
        useGlobalList.setState({lotteryLimit:200})
       }
      
    }
    useEffect(() => {
        const targetSections = document.querySelectorAll(".gameItemss");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    useGlobalList.setState({ sideTabActive: entry.target.getAttribute("id") });
                }
            });
        }, {
            rootMargin: "0px 0px -400px 0px",
            threshold: [.5]
        });
        targetSections.forEach((section) => {
            observer.observe(section);
        });
    }, [])

    return (
        <>
            <Loader setLoader={gameOp.isLoading}></Loader>
            {gamesContent.isLoading === false ? gameCollections && gameCollections.map(({ games, tab }: any, index: any) =>
                games.length > 0 &&
                <div id={index} className='gameItemss' >
                    <div id={tab.code} className='gameItems' key={tab.id} >
                        <div id={index} data-id={games.length} className="imageContainer">
                            <div className="left">
                                <img height="30" width="40" className='gameImage' src={tab.selectedIcon ? tab.selectedIcon : 'logo/' + tab.code + '_active.png'} alt="Popular" />
                                <div className="labelContainer">
                                    <span>{tab.customTitle ? tab.customTitle : tab.name}</span>
                                </div>
                            </div>
                            <div onClick={() => getSubGame(index,tab)}>
                                {
                                    tab.code !== "featured_game_tab_icon" &&
                                    tab?.code !== "hotgame_tab_icon" &&
                                    tab?.code !== "qipai_tab_icon" &&
                                    tab?.code !== "recommend_game_tab_icon" &&
                                    tab?.code !== "in-house" &&
                                <div className="loadMore"
                                    style={{ fontSize: ".20rem", cursor: "pointer", color: "#68707b" }}>{t("ts1034", { ns: "ts" })}</div>}
                            </div>
                        </div>
                        <GameEntriesMain index={index} tabs={tab} games={games} />
                    </div>
                </div>
            ) :
                < div className='gameItemss' style={{ minHeight: "7rem", padding: ".1rem 0" }}>
                    <div className='gameItemss' style={{ border: "none" }}>

                        <div className='gameItems' >
                            <div className="imageContainer">
                                <div className="left">
                                    <Skeleton sx={{ bgcolor: 'grey.900' }} animation="wave" variant="circular" width={40} height={40} />
                                    <div className="labelContainer">
                                        <Skeleton variant="text" sx={{ fontSize: '5rem', bgcolor: 'grey.900' }} width={300} />
                                    </div>
                                </div>
                                <div >

                                </div>
                            </div>
                            <div className="games" >
                                <div className="imgGames"> </div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                <div className="imgGames"></div>
                                {/*  */}
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}
export default GameContent;