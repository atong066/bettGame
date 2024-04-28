import MainLayout from "../../layout";
import './home.css'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "../carousel/carousel";
import GameSpace from "./game";
import ScrollContainer from 'react-indiana-drag-scroll'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import GameFrame from "./gameFrame";
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import GameContent from "./gameContent";
import HomeMainContent from "./homeMainContent";
import { SetNewBalance, useBalance } from "../../globalFunctions/globalContext";
// import CustomizedDialogs from "../../layout/navbar/loginModal";
import Loader from "../../backdropLoader/backdrop-loader";
import SubmitModal from "../common/modal/submit-modal/submit-modal";
import { useTranslation } from "react-i18next";
function Test() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const userInfo = useBalance()
    const [actTab, setActtba] = useState('')
    const refreshBal = SetNewBalance()
    const [viewGames, setViewGames] = useState(false)
    const [openLog, setOpenReg] = useState(false);
    const [gaemID, setGameID] = useState<any[]>([])
    const [active, setActive] = useState<any>()
    const [gameTab, setGameTab] = useState<any>()
    const [frameURL, setFrameUrl] = useState<any>()
    const [setLoader, setLoaderStatus] = useState<boolean>(false)
    async function handleGameChange(e: any, tab: any, sub: any) {
        if (e.popFrame == true || sub === "dianzi_tab_icon" || sub === "duyu_tab_icon") {
            setGameID(e)
            setActive(e.czCode)
            setGameTab(0)
            setGameTab(tab)
            viewGamess()
        }
        else {
            setGameID(e)
            setActive(e.czCode)
            openGame(e.forwardUrl)
        }
    }
    const backButton = () => {
        setFrameUrl('')
        setViewGames(false)
    }
    function viewGamess() {
        setViewGames(true)
    }
    const handleopenLogin = () => {
        setOpenReg(!openLog);
    };
    async function openGame(forwardURL: any) {
        setLoaderStatus(true)
        let result = forwardURL.replace("mobile=1", "mobile=1");
        const response = await axios.get(result, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (response.data.success == true) {
            if (userInfo.login == false) {
                setOpenReg(true)
                return
            }
            refreshBal()
            const url = response.data.url ? response.data.url : response.data.html
            setTimeout(() => {
                setLoaderStatus(false)
            }, 2000);
            setFrameUrl(url)
            viewGamess()
        }
        else {
            if (userInfo.login == false) {
                setOpenReg(true)
                return
            }
            refreshBal()
            NotificationManager.error(response.data.msg, 'Error', 3000);
        }
    }
    return (
        <>
            <Loader setLoader={setLoader}></Loader>
            <NotificationContainer />
            <MainLayout changeTab={setActtba} >
                {viewGames == false ? <HomeMainContent changeTab={setActtba} tabLink={actTab} handleGameChange={handleGameChange}></HomeMainContent> :
                    !frameURL ? <GameSpace openGameAction={openGame} activeTb={gameTab} active={active} backAction={backButton}></GameSpace> : <GameFrame backAction={backButton} gameURL={frameURL}>{gaemID}</GameFrame>
                }
            </MainLayout>
            {/* <CustomizedDialogs
                openTab={handleopenLogin}
                tabState={openLog}
            /> */}
        </>

    )
}
export default Test;

