import { Button } from "@mui/material";
import MainLayout from "../../layout";
import { DownloadPageHeader } from "../common/header";
import "./download-page.css"
import AdbIcon from '@mui/icons-material/Adb';
import AppleIcon from '@mui/icons-material/Apple';
import { UserUSerConfig, UserUSerConfig2 } from "../../globalFunctions/globalContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGlobalVariables } from "../../globalFunctions/store";

export default function DownloadPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const download =useGlobalVariables(state=>state.stationConfig)
    useEffect(() => {
    }, [])
    return (
        <>
            <MainLayout>
                <section className="downloadPageMainConrtainer">
                    <DownloadPageHeader>{t("ts156", { ns: "ts" })}</DownloadPageHeader>
                    <div className="mainContainer" style={{ backgroundImage: `url("/downloadPageImages/downloadPageImage.png")` }}>
                        <div className="imagesContainer">
                            <div className="boyImageBox">
                                <img className="boyImage" src="/downloadPageImages/appImage.png" />
                            </div>
                            <div className="infoLogoContainer">
                                <div className="imagesConBox">
                                    <div className="logoImage"><img className="logImage" src={download.logo} /></div>
                                    <div className="logoImage">
                                        <div className="iconBox">
                                            <Link to={download.androidDownloadLink} target="_blank"><div className="deviceBox"><AdbIcon className="deviceIcons" /> <span className="deviceLabel">Android</span></div></Link>
                                            <Link to={download.iosDownloadLink} target="_blank"><div className="deviceBox"><AppleIcon className="deviceIcons" /> <span className="deviceLabel">iOS</span></div></Link>
                                        </div>
                                    </div>
                                    <div className="logoImage"><img className="gameImage" src="/downloadPageImages/gameImage.png" /></div>
                                </div>
                                <div className="qrButtonBox">
                                    <div className="logoImage"><img className="qrImage" src={download.androidQrDownloadLink} /></div>
                                    <Button onClick={() => window.open(download.androidDownloadLink, "_blank")} variant="outlined" className="appDownLoadButton">{t("ts790", { ns: "ts" })}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}