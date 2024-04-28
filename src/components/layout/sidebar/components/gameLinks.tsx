import { useState } from "react";
import { Link } from "react-router-dom";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { GameClick } from "../../../hooks/actions";
import { useGlobalList } from "../../../globalFunctions/store";
import { useTranslation } from "react-i18next";
import { Box, Skeleton } from "@mui/material";
export default function GameLink(props: any) {
    const colorP = ChangeColorPallte();
    const [curTab, setCurTab] = useState<any>("");
    const tab = props.tab
    const index = props.index
    const gameIndex = useGlobalList((state) => state.sideTabActive);
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);
    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");
    };
    const boxStyles = {
        color: "#adb6c4",
        backgroundColor: colorP.third
    };
    const boxStylesHungHover = {
        color: "#adb6c4",
        backgroundColor: colorP.forGround
    };
    const boxStylesActive = {
        color: colorP.text2,
        backgroundColor: colorP.forGround,
    };
    const [activeHover, setActiveHover] = useState<any>(false)
    return (
        <Box sx={{
            "a:hover": {
                span: {
                    color: colorP.text2
                },
                " .gameImagesX": {
                    content: `url("logo/` + tab.code + `_active.png")`
                }
            }
        }}>
            <Link
                to={"/" + tab.code}
                data-info={"key_" + tab.id}
                style={index != gameIndex ? curTab == "key_" + tab.id ? boxStylesHungHover : boxStyles : boxStylesActive}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={handleMouseLeave}
                key={tab.id}
                data-to-scrollspy-id={tab.code}
                onClick={() => GameClick(index, tab.code)}
                className={
                    index == gameIndex
                        ? "gameBox active boxStyle"
                        : "gameBox"
                }
            >
                <div className="imageContainer">
                    <img
                        className="gameImagesX"
                        src={
                            index == gameIndex
                                ? tab.selectedIcon
                                    ? tab.selectedIcon
                                    : "logo/" + tab.code + "_active.png"
                                : tab.icon
                                    ? tab.icon
                                    : "logo/" + tab.code + ".png"
                        }
                    ></img>
                </div>
                <div className="labelContainer">
                    <span>
                        {tab.customTitle ? tab.customTitle : tab.name}
                    </span>
                </div>
            </Link>
        </Box>
    )
}
export function GameFavLink(props: any) {
    const colorP = ChangeColorPallte();
    const [curTab, setCurTab] = useState<any>("");
    const { t, i18n } = useTranslation(["home", "main"]);
    const index = props.index
    const link = props.link
    const gameIndex = useGlobalList((state) => state.sideTabActive);
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);
    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");
    };
    const boxStyles = {
        color: "#adb6c4",
        backgroundColor: colorP.third
    };
    const boxStylesHungHover = {
        color: "#adb6c4",
        backgroundColor: colorP.forGround
    };
    const boxStylesActive = {
        color: "white",
        backgroundColor: colorP.forGround,
    };
    return (
        <Box sx={{
            "a:hover": {
                span: {
                    color: colorP.text2
                },
                " .gameImagesX": {
                    content: `url("images/favor3.png")`
                }
            }
        }}>
            <Link to={"/" + link}
                data-info={"key_"}
                style={
                    index != gameIndex
                        ? curTab == "key_"
                            ? boxStylesHungHover
                            : boxStyles
                        : boxStylesActive
                }
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => GameClick(98, "Favoritos")}
                className={
                    index == gameIndex ? "gameBox active boxStyle" : "gameBox"
                }
            >
                <div className="imageContainer">
                    <img
                        style={{ height: ".25rem", width: ".32rem" }}
                        className="gameImagesX"
                        src={
                            index == gameIndex
                                ? "/images/favor3.png"
                                : "/images/favor2.png"
                        }
                    ></img>
                </div>
                <div className="labelContainer">
                    <span> {t("ts1030", { ns: "ts" })}</span>
                </div>
            </Link>
        </Box>
    )
}
export function GameRecentLink(props: any) {
    const colorP = ChangeColorPallte();
    const [curTab, setCurTab] = useState<any>("");
    const { t, i18n } = useTranslation(["home", "main"]);
    const index = props.index
    const link = props.link
    const gameIndex = useGlobalList((state) => state.sideTabActive);
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);
    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");
    };
    const boxStyles = {
        color: "#adb6c4",
        backgroundColor: colorP.third
    };
    const boxStylesHungHover = {
        color: "#adb6c4",
        backgroundColor: colorP.forGround
    };
    const boxStylesActive = {
        color: "white",
        backgroundColor: colorP.forGround,
    };
    return (
        <Box sx={{
            "a:hover": {
                span: {
                    color: colorP.text2
                },
                " .gameImagesX": {
                    content: `url("images/recente_active.png")`
                }
            }
        }}>
            <Link to="/recent"
                data-info={"key_"}
                style={
                    97 != gameIndex
                        ? curTab == "key_"
                            ? boxStylesHungHover
                            : boxStyles
                        : boxStylesActive
                }
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => GameClick(97, "recent")}
                className={
                    97 == gameIndex ? "gameBox active boxStyle" : "gameBox"
                }
            >
                <div
                    className="imageContainer"
                    style={{ maxHeight: ".3rem", maxWidth: ".3rem" }}
                >
                    <img
                        className="gameImagesX"
                        src={
                            97 == gameIndex
                                ? "images/recente_active.png"
                                : "images/recente.png"
                        }
                    ></img>
                </div>
                <div className="labelContainer">
                    <span> {t("ts1029", { ns: "ts" })}</span>
                </div>
            </Link>
        </Box>
    )
}
export function GameLinkLoader() {

    return (
        <>
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={100} height={70} />
        </>
    )
}