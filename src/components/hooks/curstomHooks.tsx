
import { useMutation, useQuery, useQueryClient } from "react-query"
import { axiosGet, axiosGet2, axiosPost, axiosPost2 } from "./ajaxHook"
import { ToastrPngk } from "../globalFunctions/toastr"
import { useGenerateOTPRegister, useGlobalList, useGlobalVariables, useSetlang } from "../globalFunctions/store"
import i18next from "i18next"
import { useGEtPublicList, useGetArticleList, useGetBonusChart, useGetChangeReportType, useGetGames, useGetRegFields, useGetUserInfo } from "./getUserInfoHook"
import { useReducer } from "react"
import { dateReducer, initialDate } from "../main/reducers/dateReduce"
import decrypt from "./aes"

const changeLanguage = (payload: any) => {
    i18next.changeLanguage(payload.lang)
    return axiosGet("/changeLanguage.do", payload)
}
export const useChangeLanguage = () => {
    const quertClient = useQueryClient()
    const changeReportType = useGetChangeReportType()
    const getGames = useGetGames()
    const userInfo = useGetUserInfo()
    const regFields = useGetRegFields()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const pubData=useGEtPublicList()
    const article = useGetArticleList()
    return useMutation({
        mutationFn: changeLanguage,
        onSuccess: (data, variables) => {
            pubData.refetch()
            if (data?.data.success == true) {
                useSetlang.setState({ langText: variables.lang })
                ToastrPngk({ msg: data?.data.msg, type: "success" })
                useGenerateOTPRegister.getState().setOtp()
                if (userInfo.data.data.isLogin == false) {
                    regFields.refetch()
                }
                getGames.refetch()
                changeReportType.refetch()
                article.refetch()
            }
        }
    })
}
export const useGetAgentPromoInfo = () => {
    return useQuery({
        queryKey: ["agentPromoInformation"],
        staleTime: 0,
        queryFn: async () => (await axiosPost2("/userCenter/agentManage/agentRegPromotionInfo.do"))
    })
}
export const useGetMissionTasks = () => {
    return useQuery({
        queryKey: ["missaoTasks"],
        staleTime: 0,
        queryFn: async () => (await axiosGet2("/getTaskCenterList.do?load=true"))
    })
}
export const useGetSignin = () => {
    return useQuery({
        queryKey: ["signIninfo"],
        enabled: false,
        staleTime: 0,
        queryFn: async () => (await axiosGet2("/signIn.do"))
    })
}
export const useGetSigninRules = () => {
    return useQuery({
        queryKey: ["signInRules"],
        enabled: false,
        staleTime: 0,
        queryFn: async () => (await axiosGet2("/getSignRuleConfig.do"))
    })
}
export const useCurnew = () => {
    return useQuery({
        queryKey: ["curNew"],
        enabled: false,
        staleTime: 0,
        queryFn: async () => (await axiosGet2("/userCenter/redpacket/curNew.do"))
    })
}
export const useDepolist = () => {
    const checkOut = useCheckoutCounter()

    return useQuery({
        queryKey: ["depoListf"],
        staleTime: 0,
        enabled: false,
        queryFn: async () => (await axiosGet2("/userCenter/finance/depositList.do", {
            payCode: "online",
        })),
        onSuccess: (data) => {
            useGlobalVariables.setState({ onlineBankCards2: [] })
            if (data.success == true) {
                data.onlineList.forEach((item: any) => {
                    checkOut.mutate({ payType: item })
                });
                useGlobalVariables.setState({ onlineBankCards: data.onlineList })
            }
        },
    })
}

const checkoutCounter = (payload: any) => {
    const url = '/userCenter/finance/checkoutCounterByType.do'
    return axiosPost2(url, payload)
}

export const useCheckoutCounter = () => {
    const bank = useGlobalVariables(state => state.onlineBankCards2)
    return useMutation({
        mutationFn: checkoutCounter,
        onSuccess: (data, variables) => {
            const payType = {
                "bankName": variables.payType,
                "bankData": data.onlineList[0],
            }
            const bankIndex = bank.findIndex((item: any) => item.bankName === payType.bankName)
            useGlobalVariables.getState().setBankCardOnline(payType)
        }
    })
}
const getPopularGame = (payload?: any) => {
    const url = '/getUserRecommendGames.do?tabType=10'
    return axiosPost2(url, payload)
}

export const useGetPopularGame = () => {
    return useMutation({
        mutationFn: getPopularGame,
        onSuccess: (data, variables) => {
            useGlobalVariables.setState({ popularGames: data.rows })
        }
    })
}
const searchGameItem = (payload?: any) => {
    const url = '/searchGame.do'
    return axiosPost2(url, payload)
}

export const useSearchGameItem = () => {
    return useMutation({
        mutationFn: searchGameItem,
        onSuccess: (data, variables) => {
            useGlobalVariables.setState({ popularGames: data })
            if(data.success===false){
                // ToastrPngk({msg:data.msg,type:"error"})
            }
        }
    })
}
const viewAdvice = (payload?: any) => {
    const url = 'userCenter/advice/viewAdvice.do'
    return axiosGet2(url, payload)
}

export const useViewAdvice = () => {
    return useMutation({
        mutationFn: viewAdvice,
        onSuccess: (data, variables) => {
            useGlobalList.setState({ advice: data })
        }
    })
}

export const useAdviceList = () => {
    return useQuery({
        queryKey: ["advList"],
        staleTime: 0,
        queryFn: async () => (await axiosGet2("/userCenter/advice/adviceList.do")),
        onSuccess: (data) => {
        },
    })
}

const messageList = (payload?: any) => {
    const url = '/userCenter/msgManage/messageList.do'
    return axiosPost2(url, payload)
}

export const useGetMessageList = () => {
    return useMutation({
        mutationFn: messageList,
        onSuccess: (data, variables) => {

            useGlobalList.setState({ notifications: data })
        }
    })
}
const getKey = () => {
    const url = '/behaviorVerifyCode.do'
    return axiosPost2(url)
}

export const useGetKey = () => {
    return useMutation({
        mutationFn: getKey,
        onSuccess: (data, variables) => {
            const payload = {
                KEY:"deWJ$ps7f@HpY%MN",
                IV: "GB%#cfxje7JzP*#A"
            }
          const key=decrypt(payload.KEY,payload.IV,data)
          const finalKey=key.slice(4,-4);
          useGlobalList.setState({encKey:finalKey})
        }
    })
}
// const getKeyG = (payload:any) => {
//     const url = '/behaviorVerifyCode2.do'
//     return axiosPost2(url,payload)
// }
// export const useGetVer = () => {
//     return useMutation({
//         mutationFn: getKeyG,
//     })
// }
