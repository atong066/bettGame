import './home.css'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from "axios";
import { useEffect, useState } from "react";
import ScrollContainer from 'react-indiana-drag-scroll'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import GameContent from "./gameContent";
import { Link, useNavigate } from "react-router-dom";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { GetActiveSidebar, SetActiveSidebarFn, SetActiveTab } from "../../globalFunctions/loginContext";
import { useGetArticles, useGetGames } from "../../hooks/getUserInfoHook";
import { useTranslation } from "react-i18next";
import { useGlobalList, useGlobalVariables, useLoginStore, userRegstore } from '../../globalFunctions/store';
import GameContentFav from './gameFavContent';
import GameContentRecent from './gameRecent';
import { Marquee } from './components/marquee';
import { Skeleton } from '@mui/material';

function HomeMainContent(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const sideAction = SetActiveTab()
    const gamesColetion = useGlobalVariables(state => state.gameTabs)
    const gameIndex = useGlobalList(state => state.sideTabActive)
    const setActobeIndex = SetActiveSidebarFn()
    const isFav = useGlobalVariables(state => state.isFav)
    const [arrowStat, setArrowStat] = useState(true)
    function gameClicks(index: any, id: any) {
        useGlobalVariables.setState({ isFav: false })
        useGlobalList.setState({ sideAction: id });
        useGlobalList.setState({ sideTabActive: index });
    }
    const gamesContent = useGetGames({ type: "11" })
    const backgroundColor = ChangeColorPallte()
    const activBox = {
        paddingBottom: ".05rem",
        color: backgroundColor.forGround,

    }
    function getFav(index: any) {
        useGlobalVariables.setState({ isFav: true })
        useGlobalList.setState({ sideTabActive: index });
    }
    function getGameTab(issub: any, gameIndex: any) {
        if (gameIndex == 98 || gameIndex == 97) {
            getFav(gameIndex)
        }
        switch (issub) {
            case true:
                switch (gameIndex) {
                    case 98:
                        return <GameContentFav tabLink={props.tabLink} viewGamesTab={props.handleGameChange}>{gamesContent}</GameContentFav>;
                    default:
                        return <GameContentRecent tabLink={props.tabLink} viewGamesTab={props.handleGameChange}>{gamesContent}</GameContentRecent>
                }
            default:
                return <GameContent />;
        }
    }
    return (
        <>
            <section className="content homeContent">
                <Marquee></Marquee>
                <div className="gameContainers" style={{ backgroundColor: backgroundColor.backGorund }}>
                    <div className="gameTabs" >
                        {arrowStat == false && <img onClick={() => setArrowStat(true)} className='leftIcon' src="/images/icon_right.png" alt="" />}
                        {arrowStat == true && <img onClick={() => setArrowStat(false)} className='RightIcon' src="/images/icon_left.png" alt="" />}
                        <div className="gameIcons">
                            {
                                gamesContent.isLoading == false ? gamesColetion && gamesColetion.filter((entry: { games: any; }) =>
                                    entry.games.length !== 0
                                ).map(({ games, tab }: any, index: any) => games.length > 0 ?
                                    <div onClick={() => gameClicks(index, tab.code)} style={(index == gameIndex) ? activBox : { color: "white" }} className={index == gameIndex ? "gameBox active" : "gameBox"} key={`box_` + tab.id}>
                                        <div className="imageContainer">
                                            <LazyLoadImage width={40} height={30} className='gameImage' src={index == gameIndex ? tab.selectedIcon ? tab.selectedIcon : "logo/" + tab.code + "_active.png" : tab.icon ? tab.icon : "logo/" + tab.code + ".png"} alt="Popular" />
                                        </div>
                                        <div className="labelContainer">
                                            <span>{tab.customTitle ? tab.customTitle : tab.name}</span>
                                        </div>
                                    </div> : ""
                                ) : <>
                                    <div className="gameBox">
                                        <div className="imageContainer">
                                            <Skeleton variant="circular" width={35} height={35} />
                                        </div>
                                        <div className="labelContainer">
                                            <Skeleton variant="text" width={50} height={25} sx={{ fontSize: '1rem' }} />
                                        </div>
                                    </div>
                                    <div className="gameBox">
                                        <div className="imageContainer">
                                            <Skeleton variant="circular" width={35} height={35} />
                                        </div>
                                        <div className="labelContainer">
                                            <Skeleton variant="text" width={50} height={25} sx={{ fontSize: '1rem' }} />
                                        </div>
                                    </div>
                                </>
                            }
                            <div style={(97 == gameIndex) ? activBox : { color: "white" }} onClick={() => getFav(97)} className={((97 == gameIndex) ? "gameBox active" : "gameBox")} >
                                <div className="imageContainer fav">
                                    <img height={30} width={30} src={(97 == gameIndex) ? "/images/recent_active.png" : "/images/recent_inactive.png"} alt="" />
                                </div>
                                <div className="labelContainer">
                                    <span>{t("ts1029", { ns: "ts" })}</span>
                                </div>
                            </div>
                            <div style={(98 == gameIndex) ? activBox : { color: "white" }} onClick={() => getFav(98)} className={((98 == gameIndex) ? "gameBox active" : "gameBox")} >
                                <div className="imageContainer" style={{ height: ".2rem !important", width: ".2rem !important" }} >
                                    <img src={(98 == gameIndex) ? "/images/favor3.png" : "/images/favor2.png"} alt="" />
                                </div>
                                <div className="labelContainer">
                                    <span>{t("ts1030", { ns: "ts" })}</span>
                                </div>
                            </div>
                        </div>
                        <div className="search">
                            <Link to="/search"> <img src="/images/searchIconColor.png" alt="" /></Link>
                        </div>
                    </div>
                    <div className="gamesMain">
                        {getGameTab(isFav, gameIndex)}
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomeMainContent;