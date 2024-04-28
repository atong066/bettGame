import { useMutation, useQueryClient } from "react-query"
import { axiosPost } from "./ajaxHook"
import { ToastrPngk } from "../globalFunctions/toastr"
import { useButtonStates, useGenerateOTPRegister, useGlobalVariables, useShowWithdraw, userRegstore } from "../globalFunctions/store"
import { useGetSignin, useGetSigninRules } from "./curstomHooks"
import { useGetConfig, useGetSecurityInfo, useGetTurnTablePrize, useGetTurnlateData, useGetTurnlateDataType5, useGetUserInfo, useStationConfig } from "./getUserInfoHook"
import { useState } from "react"

const registerUser = (payload: any) => {
    return axiosPost("/register.do", payload)
}
export const useRegisterUser = () => {
    const quertClient = useQueryClient()
    const rules = useGetSigninRules()

    const getSecurityInfo = useGetSecurityInfo()
    const getInfo = getSecurityInfo?.data?.data
    const staConfig = useStationConfig()
    const sigIn = useGetSignin()
    const userINfo = useGetUserInfo()
    const configAll = useGetConfig()

    const turnDataType5 = useGetTurnlateDataType5()
    const turnlateDatas = useGetTurnlateData();
    const getPrizes = useGetTurnTablePrize()

    function randomNumberInRange(min: any, max: any) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const [randomProfile, setRandomProfile] = useState(1)

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data?.data.success == true) {
                setRandomProfile(randomNumberInRange(1, 24))
                // ToastrPngk({ msg:"Successfully Registered", type: "success" })
                
                useGlobalVariables.setState({regFields:[]})
                useGenerateOTPRegister.getState().setOtp()
                userRegstore.setState({ isOpenRegister: false })
                userINfo.refetch()
                staConfig.refetch()
                configAll.refetch()
                sigIn.refetch()
                useShowWithdraw.setState({ type: 1 })
                useGlobalVariables.setState({ clearRegFields: true })
                rules.refetch()
                turnlateDatas.refetch()
                turnDataType5.refetch()
                getPrizes.refetch()
                if (turnDataType5.isLoading == false && turnDataType5.isSuccess == true) {
                    setTimeout(() => {
                        useGlobalVariables.setState({ turnLateModal: true })
                    }, 1500)
                }
                useButtonStates.setState({ turnLateButton: true })
                useButtonStates.setState({ turnLateMain: false })
                useGlobalVariables.setState({ newRegPop: true })
                window.sessionStorage.removeItem("avatar");
                window.sessionStorage.removeItem("avatarId");
                window.sessionStorage.setItem("avatar", "/avatarImages/Feminine/" + randomProfile + ".png");
                window.sessionStorage.setItem("avatarId", randomProfile.toString());
            } else {
                useGenerateOTPRegister.getState().setOtp()
                ToastrPngk({ msg: data?.data.msg, type: "error" })
                throw new Error("Successfully Registered")
            }
        }
    })
}
