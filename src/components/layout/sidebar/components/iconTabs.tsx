import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalVariables, useLoginStore, useModalStates, useRebateType, useSetlang, userRegstore } from "../../../globalFunctions/store";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useChangeLanguage } from "../../../hooks/curstomHooks";
import Cookies from "universal-cookie";
import { useStationConfig } from "../../../hooks/getUserInfoHook";
import axios from "axios";
export function SidebarTabs(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const [mission, setMission] = useState<any[]>([])
    const userInfo = useGlobalVariables(state => state.userDetails);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    async function getMissionDetails() {
        try {
            const response = await axios.get('/getTaskCenterList.do')
            setMission(response.data)
        } catch (e) {

        }
    }

    const locations = useLocation()
    const turnlateData = useGlobalVariables(state => state.turnlateType5)

    const validayLogon = (link: any) => {
        if (userInfo?.isLogin == false && (link == "/record-collection" || link == "/vip" || link == "/pending")) {
            userRegstore.setState({ isOpenRegister: true })
        }
        else {
            if (link === "missionModal") {
                getMissionDetails()
                setOpen(true);
            } else if (link === "/turnlateSide") {
                // console.log("/turnlateSide")
            } else if (link === "/vip") {
                useGlobalVariables.setState({ tabIndex2: 0 })
                navigate(link)
            } else {
                useRebateType.setState({ type: 1 })
                navigate(link)
            }
        }
        if (link === "/turnlateSide") {
            useGlobalVariables.setState({ turnLateModal: true })
            props.onClick()
            if (locations.pathname === "/home") {
                props.onClick()
                useGlobalVariables.setState({ turnLateModal: true })
            } else if (locations.pathname === "/") {
                props.onClick()
                useGlobalVariables.setState({ turnLateModal: true })
            }
            if (turnlateData?.pddStrategy?.popType === 5) {
                useModalStates.setState({ turnModalLogin: true })
                localStorage.setItem("isModalLog", "true")
            }
        }
    };
    return (
        <div className={props.link === "/PromotionPage" ? "pageLink invite" : "pageLink"} onClick={() => validayLogon(props.link)}>
            {props.icon && <img className="linkImage" src={props.icon} />}
            <label className="linkLabel">
                {props.children}
            </label>
        </div>
    )
}
export function LanguagePicker(props: any) {
    const [curTab, setCurTab] = useState<any>("");
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const { t, i18n } = useTranslation(["home", "main"]);
    const userInfo = useGlobalVariables(state => state.userDetails);
    const station = useGlobalVariables(state => state.stationConfig);
    const [mission, setMission] = useState<any[]>([])
    const cookies = new Cookies();
    const staLang = useStationConfig();
    const [open, setOpen] = useState(false);
    const lang = staLang?.data?.data.staLang
    let langNameD
    let captchLang
    // chinese:zho  english:eng   japanese:jpn   indonesian:ind  spanish:spa    brazil:pon  hindi: him     Malay:msa  Thai:tha  Vetnamese:vie
    const langList = [
        { id: "0", langName: "Português", lang: "br", langType: "pon" },
        { id: "1", langName: "Indonesia", lang: "id", langType: "pon" },
        { id: "2", langName: "Tiếng Việt", lang: "ind", langType: "vie" },
        { id: "3", langName: "Melayu", lang: "ms", langType: "msa" },
        { id: "4", langName: "ไทย", lang: "th", langType: "tha" },
        { id: "5", langName: "हिन्दी", lang: "in", langType: "ind" },
        { id: "6", langName: "日本語", lang: "ja", langType: "jpn" },
        { id: "7", langName: "Español", lang: "es", langType: "spa" }]
    if (lang == "br") {
        langNameD = "Português";
        captchLang = "pon"
    } else if (lang == "id") {
        langNameD = "Indonesia";
        captchLang = "ind"
    } else if (lang == "vi") {
        langNameD = "Tiếng Việt";
        captchLang = "vie"
    } else if (lang == "ms") {
        langNameD = "Melayu";
        captchLang = "msa"
    } else if (lang == "th") {
        langNameD = "ไทย";
        captchLang = "him"
    } else if (lang == "in") {
        langNameD = "हिन्दी";
        captchLang = "tha"
    } else if (lang == "ja") {
        langNameD = "日本語";
        captchLang = "jpn"
    } else if (lang == "es") {
        langNameD = "Español";
        captchLang = "spa"
    }
    const languages = [
        { id: "1", name: langNameD, code: lang, langCap: captchLang },
    ];

    if (staLang.isLoading == false) {
        if (staLang?.data?.data.showEnglishLan == true) {
            languages.push({ id: "2", name: "English", code: "en", langCap: "eng" })
        }
        if (staLang?.data?.data.showChineseLan == true) {
            languages.push({ id: "3", name: "简体中文", code: "cn", langCap: "zho" })
        }
        if (staLang?.data?.data.allow_all_language_switch == true) {
            const languagesMaplst = langList.filter((val) => val.lang !== lang)
            languagesMaplst.map((val: any, index: any) => {
                languages.push({ id: index + 4, name: val.langName, code: val.lang, langCap: val.langType })
            })
        }
    }

    const language = useSetlang.getState().lang

    const changeLanguage = useChangeLanguage()
    const [lngList, setLngList] = useState()
    async function handleLanguageChange(e: any) {
        const selLang = languages.filter((lang: any) => lang.id == e.target.value)
        const selectedLanguage = selLang[0].code;
        cookies.set('lang', selectedLanguage);
        cookies.set('langList', selLang[0].langCap);
        useSetlang.setState({ lang: e.target.value })
        changeLanguage.mutate({ lang: selectedLanguage })
        localStorage.setItem('i18nextLng', selectedLanguage);
    };

    useEffect(() => {
        const selLang = languages.filter((lang: any) => lang.code === station.staLang)
        const cookieJam = localStorage.getItem('i18nextLng');
        if (cookies.get('lang') === undefined || cookies.get('langList') === undefined) {
            cookies.set("lang", station.staLang)
            cookies.set("langList", selLang[0].langCap)
            useSetlang.setState({ lang: selLang[0].id })
            localStorage.setItem('i18nextLng', station.staLang);
        }
        if (cookies.get('lang') !== cookieJam) {
            cookies.set("lang", cookieJam)
            cookies.set("langList", selLang[0].langCap)
            useSetlang.setState({ lang: selLang[0].id })
        }
    }, [])
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);
        setIsHover(true);
    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");
        setIsHover(false);
    };
    const colorP = ChangeColorPallte();
    const dlIconActive = {
        color: colorP.forGround,
        "& .itemIcon": {
            color: colorP.forGround,
        },
    };
    const dlIcon = {
        color: colorP.text,
    };

    return (
        <div className="footerActions">
            <Link to={props.link}>
                <div
                    className="footerItemContainer"
                    style={curTab == "key_suports" ? dlIconActive : dlIcon}
                    data-info={"key_suports"}
                    key={"key_suports"}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={(e) => handleMouseEnter(e)}
                >
                    <div className="iconContainer">
                        <i className="iconBorder">
                            <LanguageIcon className="itemIcon"></LanguageIcon>
                        </i>
                    </div>
                    <FormControl
                        size="small"
                        sx={{
                            minWidth: "1.5rem",
                            fontSize: ".16rem",
                            color: "#68707b !important",
                            "& .MuiPaper-root": {
                                background: colorP.backGorund,
                                fontSize: ".16rem",
                                color: "#68707b !important",
                            },
                            "& fieldset": {
                                borderColor: "#313843 !important",
                                "& legend": {
                                    "& span": {
                                        color: colorP.forGround + " !important"
                                    }
                                }
                            },
                            "& label": {
                                fontSize: ".16rem",
                                color: "#68707b !important",
                            },
                            "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "#313843 !important",
                            }, "& .MuiInputBase-root": {
                                color: "#68707b !important",
                                fontSize: ".16rem"
                            }, "& .MuiSvgIcon-root": {
                                color: "#68707b !important",
                                width: ".15em",
                            },
                            " .MuiSelect-select": {
                                color: "#68707b !important",
                            },
                            marginTop: ".06rem !important"
                        }}
                    >
                        <InputLabel id="demo-select-small-label">
                            {t("ts159", { ns: "ts" })}
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={language}
                            label={t("ts159", { ns: "ts" })}
                            onChange={(e) => handleLanguageChange(e)}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        background: colorP.backGorund,
                                        color: colorP.text,
                                        "& em": {
                                            fontSize: ".16rem",
                                            color: "#68707b !important",
                                            paddingRight: ".32rem"
                                        },
                                        " .MuiButtonBase-root": {
                                            fontSize: ".16rem",
                                            color: "#68707b !important",

                                        }
                                    }
                                },
                            }}
                        >
                            {languages.map((language: any, index: any) => (
                                <MenuItem key={index} value={language.id}>
                                    {language.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </Link>
        </div>
    )
}