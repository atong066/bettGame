import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { suggestStatus, suggestType } from "../../userCenter/common/selectOtions";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import { useAdviceList, useViewAdvice } from "../../../hooks/curstomHooks";
import Loader from "../../../backdropLoader/backdrop-loader";
import { useGlobalVariables } from "../../../globalFunctions/store";
import FeedbackContent from "./feedbackContent";
import { constants } from "buffer";
import PngkPagination from "../../../Pagination/pagination";
export default function FeedbackRead() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [suggestionStatus, setSuggestionStatus] = useState([])
    const viewAdvice = useViewAdvice()
    const [suggestionID, setSuggestionID] = useState()
    const adviceList = useAdviceList()
    const content = useGlobalVariables(state => state.showContent)
    const colorP = ChangeColorPallte()
    const [adviceContent, setAdviceContent] = useState<any[]>([])
    const replyFeedBacks = useRef<any>()
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    // async function replySend(value: any) {
    //     try {
    //         const response = await axios.post('userCenter/advice/updateAdvice.do', {
    //             adviceId: value,
    //             content: replyFeedBacks.current.children[1].children[0].value,
    //             status: 1
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //                 'X-Requested-With': 'XMLHttpRequest'
    //             }
    //         })
    //         if (response.data.success == true) {
    //             replyFeedBacks.current.children[1].children[0].value = null
    //             ToastrPngk({ msg: response.data.msg, type: "success" })
    //         } else {
    //             ToastrPngk({ msg: response.data.msg, type: "error" })
    //         }
    //     } catch (error) {
    //         console.log(`error ${error}`)
    //     }

    // }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const getType = (arrType: any, type: any) => {
        if (arrType == 2) {
            const selType = suggestType.find((item: any) => item.value == type)
            return selType ? t(selType.label, { ns: ["ts"] }) : ""
        }
        else if (arrType == 1) {
            const selType = suggestStatus.find((item: any) => item.value == type)
            return selType ? t(selType.label, { ns: ["ts"] }) : ""
        }
    }

    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })
    }

    const handleSuggestionStatus = (e: any) => {
        setSuggestionStatus(e.value)
    }
    const handleSearchFeedback = (e: any) => {
        setCurrentPage(1)
        setPageCount(pageCount)

    }
    // const submitReply = (e: any) => {
    //     replySend(suggestionID)
    //     console.log(replyFeedBacks.current.children[1].children[0].value)
    // }
    const handleSubmitModalClose = () => {
        setAdviceContent([])

    }
    const getReply = (value: any) => {
        const payload = {
            adviceId: value,
        }
        viewAdvice.mutate(payload)
        useGlobalVariables.setState({ showContent: true })
        useGlobalVariables.setState({ isSupport: true });
    }
    if (adviceList.isLoading) {
        return <Loader setLoader={adviceList.isLoading}></Loader>
    }
    return (
        <>
            <div className="pendingBonus">
                <div className="pendingContainer" style={(adviceList && adviceList?.data?.success !== false) ? { marginBottom: 0, backgroundColor: colorP.third } : { backgroundColor: colorP.backGorund }}>
                    {content === false ? (adviceList && adviceList?.data?.success !== false) ? adviceList?.data?.rows?.map((item: any, index: any) =>
                        <div className="item" style={{ backgroundColor: colorP.backGorund }}>
                            <div className="leftItem">
                                <span>{t('ts1202', { ns: 'ts' })}<span style={{ color: "white" }}>{item.sendUserId}</span></span>
                                <span>{t('ts1203', { ns: 'ts' })}</span>
                                <span>{item.content}</span>
                            </div>
                            <div className="rightItem">
                                <span className="viewItem" onClick={() => getReply(item.id)}>{t('ts1204', { ns: 'ts' })} <img height={20} src="/images/right-arrow.png" alt="" /></span>
                                <span>{item.finalTime}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="noticeBox" style={{ backgroundColor: colorP.backGorund, height: "100%" }} >
                            <div className="noMsessage">
                                <img style={{ width: "2.5rem" }} src="/supportImages/noMessage.png" alt="" className="noMessageImage" />
                                <label className="noMessageLabel">{t("ts355", { ns: "ts" })}</label>
                            </div>
                        </div>
                    ) : (<FeedbackContent></FeedbackContent>)

                    }
                </div>
                {(adviceList && adviceList?.data?.success !== false) && <div className="pagination">
                    <PngkPagination data={Math.ceil(adviceList?.data?.total / 10)} action={handleChangePage}></PngkPagination>
                </div>
                }
            </div>
        </>
    )
}