import axios from "axios";
import { useState } from "react";
import { NotificationManager } from "react-notifications";

export async function refreshBalance(){
    NotificationManager.info("Refreshing Data...", 'Pending', 9000);
      const response=await axios.post("/autoTranout.do")
      if(response.data.success==true){
       
        setTimeout(() => {
          NotificationManager.success(response.data.msg, 'Success', 3000);
          getBalance()
        }, 8000);
      }
      else{
        NotificationManager.error(response.data.msg, 'Error', 3000);
      }
  }
export async function getBalance(){
   
    const response= await axios.post("/userInfo/getInfo.do") 
        return response.data
  }
  export async function getUserInfo(){
    const response= await axios.post("/userCenter/userAllInfo.do")
    return response.data
  }