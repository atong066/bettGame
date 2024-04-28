import { useNavigate } from "react-router";
import { useGlobalList, useGlobalVariables, useRebateType, userRegstore } from "../globalFunctions/store";
const userInfo=useGlobalVariables.getState().userDetails

export function activeUser(){
    setTimeout(()=>{
      if(userInfo.isLogin===true){
        useGlobalVariables.setState({ confirmRefersg: true })
      }
    },3600000)
  }
  export const ValidateLogin = (link: any) => {
    const navigate=useNavigate()
    if (userInfo?.isLogin == false) {
      userRegstore.setState({ isOpenRegister: true });
    } else {
      useRebateType.setState({ type: 1 });
      navigate(link);
    }
  };
 export const GameClick=(index: any, id: any) =>{
    if (index === 97 || index === 98) {
      useGlobalVariables.getState().scrollToTop();
      useGlobalList.setState({ sideTabActive: index });
      useGlobalVariables.setState({ isFav: true });
      useGlobalList.setState({ sideAction: id });
    
    } else {
        useGlobalVariables.setState({ isFav: false });
        useGlobalList.setState({ sideAction: id });
        useGlobalList.setState({ sideTabActive: index });
    }
  }