import { Avatar } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useGlobalVariables, useLoginStore, userRegstore } from "../../../globalFunctions/store";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
function MultiMediaContainer(){
    const colorP = ChangeColorPallte();
    const userInfo = useGlobalVariables(state => state.userDetails);
    const navigate=useNavigate()
    const { t, i18n } = useTranslation(["home", "main"]);
    const validayLogon = (link: any) => {
        if (userInfo?.isLogin == false) {
          userRegstore.setState({ isOpenRegister: true })
        }
        else {
            navigate(link)
        }
      };
      const style = {
        backgroundColor: colorP.third,
        borderRadius:".1rem",
        color:"#adb6c3",
        cursor:"pointer",
        fontSize:".2rem",
        height:".6rem",
        width:"100%",
        display:"flex",
        alignItems:"center",
        
        }
    return(
        <div className="multimediaContainer" style={style}  onClick={() => validayLogon("/betting-history")}>
                  <img src="/images/betHist.png" alt="" style={{
                        marginLeft:".26rem",
                  }} />
                  <label style={{ color: "#ADB6C3",fontSize:".2rem",textAlign:"center", cursor:"pointer",marginLeft:".1rem", }}>
                    {t("ts004", { ns: "ts" })}
                  </label>
        </div>
    )
}
export default MultiMediaContainer;