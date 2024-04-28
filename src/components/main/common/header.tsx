
import { Avatar, Button } from '@mui/material';
import './header.css'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import { useGlobalVariables } from '../../globalFunctions/store';
export default function Header(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <>
            <div className="headerContainer">
                <img className="titleWing" src="vipImages/titleWing.png" />
                <h1 className='headerTitle'><span style={{ color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing" src="vipImages/titleWing.png" />
            </div>
        </>
    )
}
export function HeaderWithAction(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const isInsuport = useGlobalVariables(state => state.isSupport)
    const navigate = useNavigate();
    function backAction() {
        if (isInsuport == true) {
            useGlobalVariables.setState({ isSupport: false });
            useGlobalVariables.setState({ showContent: false });
        } else {
            navigate(-1)
        }
    }
    return (
        <>
            <div className="headerContainer" style={{ background: colorP.backGorund, marginTop: ".2rem" }}>
                <div className='back' onClick={backAction}>
                    <Avatar sx={{ background: "transparent" }}><img className="backImage" src="/images/back.png" /></Avatar>
                    <span>{t("ts180", { ns: ["ts"] })}</span>
                </div>
                <img className="titleWing1" src="vipImages/titleWing.png" />
                {/* <h1 className='headerTitle'><div className="divWithElepsis">{props.children}sfioughisfghisfghisdfgh iadfgh iadfghiadhfgidfhg isdf hgisdfgisdfgh</div></h1> */}
                <h1 className='headerTitle'><span style={{ color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing2" src="vipImages/titleWing.png" />
            </div>
        </>
    )
}

export function HeaderWithNoAction(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const navigate = useNavigate();
    return (
        <>
            <div className="headerContainer" style={{ background: colorP.backGorund, marginTop: ".2rem" }}>
                {/* <div className='back' onClick={() => navigate(-1)}>
                    <Avatar sx={{ background: "transparent" }}><img className="backImage" src="/images/back.png" /></Avatar>
                    <span>{t("ts180", { ns: ["ts"] })}</span>
                </div> */}
                <img className="titleWing1" src="vipImages/titleWing.png" />
                {/* <h1 className='headerTitle'><div className="divWithElepsis">{props.children}sfioughisfghisfghisdfgh iadfgh iadfghiadhfgidfhg isdf hgisdfgisdfgh</div></h1> */}
                <h1 className='headerTitle'><span style={{ color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing2" src="vipImages/titleWing.png" />
            </div>
        </>
    )
}
export function HeaderSupportAction(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const navigate = useNavigate();
    return (
        <>
            <div className="headerContainer" style={{ background: colorP.backGorund, marginTop: ".2rem" }}>
                <div className='back' onClick={() => navigate(-1)}>
                    <Avatar sx={{ background: "transparent" }}><img className="backImage" src="/images/back.png" /></Avatar>
                    <span>{t("ts180", { ns: ["ts"] })}</span>
                </div>
                <img className="titleWing1" src="vipImages/titleWing.png" />
                {/* <h1 className='headerTitle'><div className="divWithElepsis">{props.children}sfioughisfghisfghisdfgh iadfgh iadfghiadhfgidfhg isdf hgisdfgisdfgh</div></h1> */}
                <h1 className='headerTitle'><span style={{ color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing2" src="vipImages/titleWing.png" />
            </div>
        </>
    )
}
export function DownloadPageHeader(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const navigate = useNavigate();
    return (
        <>
            <div className="headerContainer" style={{ background: colorP.backGorund + "fc", borderRadius: 0, padding: ".6rem", marginBottom: "0" }}>
                <div className='back' onClick={() => navigate(-1)}>
                    <Avatar sx={{ background: "transparent" }}><img className="backImage" src="/images/back.png" /></Avatar>
                    <span>{t("ts180", { ns: ["ts"] })}</span>
                </div>
                <img className="titleWing1" src="vipImages/titleWing.png" />
                <h1 className='headerTitle'><span style={{ color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing2" src="vipImages/titleWing.png" />
            </div>
        </>
    )
}
export function EvenHeader(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const navigate = useNavigate();
    return (
        <>
            <div className="headerContainer" style={{ background: colorP.backGorund, marginTop: ".2rem" }}>
                <div className='back' onClick={() => navigate(-1)}>
                    <Avatar sx={{ background: "transparent" }}><img className="backImage" src="/images/back.png" /></Avatar>
                    <span>{t("ts180", { ns: ["ts"] })}</span>
                </div>
                <img className="titleWing1" src="vipImages/titleWing.png" />
                <h1 className='headerTitle'><span style={{ color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing2" src="vipImages/titleWing.png" />
                <div className='recordButton'>
                    <Button size='small' style={{ backgroundColor: colorP.forGround, color: colorP.text2 }}><Link style={{ color: colorP.text2 }} to={'/record'}><span style={{ color: colorP.text2 }}>{t("ts604", { ns: "ts" })}</span></Link></Button>
                </div>
            </div>
        </>
    )
}


export function EvenHeaderstStwo(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const navigate = useNavigate();
    return (
        <>
            <div className="headerContainer" style={{ background: colorP.backGorund, marginTop: ".2rem" }}>
                <div className='back' onClick={() => navigate(-1)}>
                    <Avatar sx={{ background: "transparent" }}><img className="backImage" src="/images/back.png" /></Avatar>
                    <span>{t("ts180", { ns: ["ts"] })}</span>
                </div>
                <img className="titleWing1" src="vipImages/titleWing.png" />
                <h1 className='headerTitle'><span style={{ color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing2" src="vipImages/titleWing.png" />
                <div className='recordButton'>
                    {/* <Button size='small' onClick={props.btnAction} style={{background:colorP.forGround, lineHeight: "normal", fontWeight: 600}}><span style={{color:"white"}}>{t("ts603", { ns: "ts" })}</span></Button> */}
                    {/* <Button size='small' style={{background:colorP.forGround, lineHeight: "normal", fontWeight: 600}}><Link to={'/record-collection'} ><span style={{color:"white"}}>{t("ts604", { ns: "ts" })}</span></Link></Button> */}
                </div>
            </div>
        </>
    )
}

export function GameHeader(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const navigate = useNavigate();
    function gameAction() {
        navigate("/");
    }
    return (
        <>
            <div className="headerContainer" style={{ background: colorP.backGorund, marginTop: ".2rem" }}>
                <div className='back' onClick={() => gameAction()}>
                    <Avatar sx={{ background: "transparent" }}><img height={20} src="/images/back.png"></img></Avatar>
                    <span style={{ fontSize: ".20rem" }}>{t("ts180", { ns: ["ts"] })}</span>
                </div>
                <img className="titleWing1" src="vipImages/titleWing.png" />
                <h1 className='headerTitle'><span style={{ fontSize: ".24rem", color: colorP.text4 }}>{props.children}</span></h1>
                <img className="titleWing2" src="vipImages/titleWing.png" />
            </div>
        </>
    )
}
