import { Link, useNavigate } from "react-router-dom"
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalVariables, useLoginStore, useRebateType } from "../../../globalFunctions/store";
import axios from "axios";

function SideLinks(props: any) {
    const [curTab, setCurTab] = useState<any>("");
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const staConfig = useGlobalVariables(state => state.stationConfig)
    const { t, i18n } = useTranslation(["home", "main"]);
    const userInfo = useGlobalVariables(state => state.userDetails);
    const [mission, setMission] = useState<any[]>([])
    const [open, setOpen] = useState(false);
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
    async function getMissionDetails() {
        try {
            const response = await axios.get('/getTaskCenterList.do')
            setMission(response.data)
        } catch (e) {

        }
    }
    const validayLogon = (link: any) => {
        if (userInfo?.isLogin == false) {
            useLoginStore.setState({ isOpen: true })
        }
        else {
            alert(link)
            if (link === "/download-page") {
                getMissionDetails()
                setOpen(true);
            } else if (link === "/support") {
                useGlobalVariables.setState({ supportTabindex: 0 })
                navigate(link)
            } else if (link === "/faq") {
                useGlobalVariables.setState({ supportTabindex: 5 })
                navigate(link)
            } else {
                useRebateType.setState({ type: 1 })
            }
        }
    };

    const support = () => {
        useGlobalVariables.setState({ supportTabindex: 0 })
    }
    const faq = () => {
        if (staConfig?.stationCode === "yd101") {
            useGlobalVariables.setState({ supportTabindex: 5 })
        } else {
            useGlobalVariables.setState({ supportTabindex: 0 })
        }
    }

    return (
        <div className="footerActions">
            {props.link !== "/download-page" ? (props.link !== "/support" || staConfig.stationCode!=="yd102")?
                <Link to={props.link}>
                    <div
                        className="footerItemContainer"
                        style={curTab == "key_suports" ? dlIconActive : dlIcon}
                        data-info={"key_suports"}
                        key={"key_suports"}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={(e) => handleMouseEnter(e)}
                        onClick={props.link == "/support" ? support : props.link == "/faq" ? faq : void (0)}
                    >
                        <div className="iconContainer">
                            <i className="iconBorder">
                                {props.icon}
                            </i>
                        </div>
                        <label className="iconLabel">{props.label}</label>
                    </div>
                </Link>:<a href={staConfig.kfUrl} target="_blank">
                    <div
                        className={"footerItemContainer"}
                        style={curTab == "key_suports" ? dlIconActive : dlIcon}
                        data-info={"key_suports"}
                        key={"key_suports"}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={(e) => handleMouseEnter(e)}
                    >
                        <div className="iconContainer">
                            <i className="iconBorder">
                                {props.icon}
                            </i>
                        </div>
                        <label className="iconLabel">{props.label}</label>
                    </div>
                </a> :
                <a href={staConfig.iosDownloadLink} target="_blank">
                    <div
                        className={"footerItemContainer"}
                        style={curTab == "key_suports" ? dlIconActive : dlIcon}
                        data-info={"key_suports"}
                        key={"key_suports"}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={(e) => handleMouseEnter(e)}
                    >
                        <div className="iconContainer">
                            <i className="iconBorder">
                                {props.icon}
                            </i>
                        </div>
                        <label className="iconLabel">{props.label}</label>
                    </div>
                </a>
            }
        </div>

    )
}
export default SideLinks