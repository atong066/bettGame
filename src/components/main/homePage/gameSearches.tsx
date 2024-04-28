import { LazyLoadImage } from "react-lazy-load-image-component";
import { ChangeColorPallte, SetGameURL } from "../../globalFunctions/globalContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenGame } from "../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import { useTranslation } from "react-i18next";

import Cookies from "universal-cookie";
import { useFavGame, useGlobalVariables, useLoginStore, useRecent, userRegstore } from "../../globalFunctions/store";
function GameContentSearch(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()

    const userInfo = useGlobalVariables(state => state.userDetails)
    const gameCollectionss = props.children
    const gameCollections = gameCollectionss.data
    const gamePick = useFavGame(state => state.favGame)
    const colorP = ChangeColorPallte()
    const cookies = new Cookies();
    const gametabCode = cookies.get('indTabcode');
    const GametabName = cookies.get('tabName');
    const gameOp = useOpenGame()
    const setGameURL = SetGameURL()
    const gameName = useRef()
    const navigate = useNavigate();
    function openGame(url: any, name: any, gameCode: any) {
        if (userInfo?.isLogin === false) {
            userRegstore.setState({ isOpenRegister: true })
            return
        }
        cookies.set('gameName', name);
        cookies.set('gameType', "Favorate");
        cookies.remove("index")
        cookies.remove("tabName")
        cookies.remove("tabCode")
        gameName.current = name
        const payload = {
            url: url,
            gameType: gameCode,
        }
        gameOp.mutate(payload)
    }
    if (gameOp.isSuccess) {

        cookies.set('tabName', gameOp.variables.gameType);
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
    function addTofav(value: any, index: any, gameTabName: any) {
        const payload = {
            val: value,
            index: index,
            tabName: gameTabName,
            userName: userInfo.userName ? userInfo.userName : null,
        }
        useFavGame.getState().addFavorateGame(payload)

    }
    function starStatus(entry: any, valueItem: any, tabCode: any) {
        const index = gamePick.findIndex((item: any) => item.index == entry && (item.val.czCode === valueItem.czCode || item.val.parentGameCode === valueItem.czCode))
        if (index < 0) {
            return <img onClick={() => addTofav(valueItem, entry, tabCode)} className="icon" src="/images/star.png" alt="" />
        }
        else {
            return <img onClick={() => removeFromFav(entry.entID)} style={{ height: ".35rem", width: ".35rem" }} className="icon" src="/images/staricon.png" alt="" />
        }
    }
    function removeFromFav(index: any) {
        useFavGame.getState().removeFavByID(index)
    }
    return (
        <>
            <Loader setLoader={gameOp.isLoading}></Loader>
            {
                gameCollections && gameCollections.length > 0 ?
                    <div className="gameTab searchGameTab" style={{ backgroundColor: color.backGorund }}>
                        {
                            gameCollections && gameCollections.map((value: any, index2: any) =>
                                <div className="gameTabContainerSub" style={{ backgroundImage: "/images/loading-bg.png" }} key={index2} >
                                    <div className="starBtn">
                                        {starStatus(index2, value, gametabCode)}
                                    </div>
                                    <LazyLoadImage

                                        className="game"
                                        src={value.imgUrl ? value.imgUrl : value.imageUrl}
                                        effect="blur"
                                    />
                                    <div className="playBtn" onClick={() => openGame(value.forwardUrl, value.name, value.czCode)}>
                                        <img className="icon" src="/images/playIcon.png" alt="" />
                                    </div>
                                    <div className="gameName">
                                        {(value.czCode === "yg" || value.czCode === "iyg") && value.name}
                                    </div>

                                </div>
                            )
                        }
                    </div> :
                    <div className="noticeBox" style={{ backgroundColor: colorP.backGorund, width: "100%" }} >
                        <div className="noMsessage">
                            <img style={{ width: "2.5rem",marginTop:"1rem"}} src="/supportImages/noMessage.png" alt="" className="noMessageImage" />
                            <label className="noMessageLabel">{t("ts355", { ns: "ts" })}</label>
                        </div>
                    </div>
            }
        </>
    )
}
export default GameContentSearch;