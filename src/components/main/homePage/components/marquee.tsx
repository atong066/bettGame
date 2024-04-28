import { Link, useNavigate } from "react-router-dom";
import { useGetArticles } from "../../../hooks/getUserInfoHook";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useGlobalVariables, userRegstore } from "../../../globalFunctions/store";

export function Marquee() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const userInfo = useGlobalVariables(state => state.userDetails)
    const marquee = useGetArticles()
    const marqueeContent = marquee?.data?.data.rows
    const backgroundColor = ChangeColorPallte()
    const navigate = useNavigate()
    const validayLogon = (link: any) => {
        if (userInfo?.isLogin == false) {
            userRegstore.setState({ isOpenRegister: true })
            return;
        }
    };
    function setNotice(value: any) {
        useGlobalVariables.setState({ noticeContent: value.content })
        useGlobalVariables.setState({ supportTabindex: 2 })
        useGlobalVariables.setState({ showContent: true });
        navigate("/support")
    }
    function goToNotice(link: any) {
        useGlobalVariables.setState({ supportTabindex: 1 });
        navigate(link)
    }
    return (
        <div className="playList marqueeContainerHome">
            <div className="playListContainer" style={{ backgroundColor: backgroundColor.backGorund }}>
                <Link to="/notice"><img className="audioIcon" src="/images/icon_dt_pmd.png" alt="" /></Link>
                <div className="marqueeContainer">
                    <div className="marquee">
                        {marquee.isLoading === false && marqueeContent && marqueeContent.map((value: any, index: any) =>
                            <div style={{ cursor: "pointer" }} key={index} dangerouslySetInnerHTML={{ __html: value.content }} onClick={() => setNotice(value)} />
                        )}
                    </div>
                </div>
                <div onClick={() => goToNotice("/support")} style={{ cursor: "pointer", fontSize: ".18rem" }}>
                    <div><img src={userInfo?.isLogin == false ? "/images/unread.png" : "/images/msgicon.png"} className="messageIcon"></img></div>
                </div>
            </div>
        </div>
    )
}