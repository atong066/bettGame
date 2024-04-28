import { LazyLoadImage } from "react-lazy-load-image-component";
import { ChangeColorPallte, SetGameURL } from "../../globalFunctions/globalContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {  useOpenGame } from "../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import Cookies from "universal-cookie";
import { useFavGame, useGlobalVariables, useLoginStore, userRegstore } from "../../globalFunctions/store";
import { useTranslation } from "react-i18next";

function GameContentFav2(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);

    const userInfo = useGlobalVariables(state => state.userDetails)
   const username=userInfo.username?userInfo.username:null
    const gameCollections =props.type?useFavGame.getState().favGame.filter((item: any) => item.userName==username && item?.val?.gamecode == props.type):useFavGame.getState().favGame.filter((item: any) => item.userName==username)
    const colorP = ChangeColorPallte()
    const cookies = new Cookies();
    const GametabName = cookies.get('tabName');
    const gameOp = useOpenGame()
    const setGameURL = SetGameURL()
    const gameName = useRef()
    const gameIndex = props.gameIndex
    const navigate = useNavigate();
    function openGame(game: any, index: any) {
        const url=game.url
        if (userInfo?.isLogin === false) {
            userRegstore.setState({ isOpenRegister: true })
            return
        }
        gameName.current = game.name
        const payload = {
            url: url,
            gameType: GametabName,
        }
        setGame(game,index,gameIndex)
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
    function removeFromFav( index: any) {
        useFavGame.getState().removeFavByID(index)
    }
    function setGame(game:any,index:any,tabCode:any){
        const payload={
            index:index,
            userName:userInfo.userName,
            tabName:GametabName,
            val:game,
        }
        useGlobalVariables.setState({game:payload})
    }
    return (
        <>
            <Loader setLoader={gameOp.isLoading}></Loader>
            {
                gameCollections && gameCollections.length > 0 ?
                        <div className='gameTab searchGameTab' key={"775898545"} >
                                {
                                    gameCollections.map(({val,index}: any, index2: any) =>
                                        <div id={index} className="gameTabContainerSub" style={{ backgroundImage: "/images/loading-bg.png" }} key={index2} >
                                            <div className="starBtn" onClick={() => removeFromFav(val.entID)}>
                                                <img style={{ height: ".35rem", width: ".35rem" }} className="icon" src="/images/staricon.png" alt="" />
                                            </div>
                                            <LazyLoadImage
                                              
                                                className="game"
                                                src={val.imageURL}
                                                effect="blur"
                                            />
                                            <div className="playBtn"   onClick={() => openGame(val,index2 )}>
                                                <img className="icon" src="/images/playIcon.png" alt="" />
                                            </div>
                                            <div className="gameName">
                                                {(val.czCode === "yg" || val.czCode === "iyg") && val.name}
                                            </div>

                                        </div>
                                    )
                                }
                        </div> :
                    <div className="noticeBox" style={{ backgroundColor: colorP.backGorund,width:"100%" }} >
                        <div className="noMsessage">
                            <img style={{ width: "2.5rem",marginTop:"1rem"}} src="/supportImages/noMessage.png" alt="" className="noMessageImage" />
                            <label className="noMessageLabel">{t("ts355", { ns: "ts" })}</label>
                        </div>
                    </div>
            }
        </>
    )
}
export default GameContentFav2;