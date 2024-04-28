import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import AlertModal from '../common/modal/alert-modal/alert-modal';
import { useGlobalVariables } from '../../globalFunctions/store';
import PngkPagination from '../../Pagination/pagination';

export default function AnnoucementPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [openNotif, setOpenNotif] = useState(false);
    const handleClose = () => {
        setOpenNotif(false);
    };
    const [content, setContent] = useState(false)
    const [notificationMessage, setnotificationMessage] = useState([])
    const [messageContent, setMessageContent] = useState("")
    const [isData, setIsData] = useState(false)

    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    async function getNotice() {
        try {
            const response = await axios.get('/userCenter/msgManage/articleList.do', {
                params: {
                    pageNumber: currentPage
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest",
                }
            })

            if (response.data.success == false) {
                setIsData(false)
            } else {
                if (response.data.rows != '') {
                    setnotificationMessage(response.data.rows)
                    setIsData(true)
                } else {
                    setIsData(false)
                }
            }
        } catch (error) {
            console.log(`error ${error}`)
        }

    }

    useEffect(() => {
        getNotice()
    }, [currentPage])

    const handleMessage = (message: any) => {
        setIsData(true)
        setMessageContent(message.content)
        setContent(true);
        useGlobalVariables.setState({ isSupport: true });
    }

    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D + h + m + s;
        return strDate;
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
            <div className="noticeContainerSupport" style={isData == true ? { marginBottom: 0, backgroundColor: colorP.backGorund } : { backgroundColor: colorP.backGorund }}>
                <div className='noticeBoxContainer' style={isData == true ? { marginBottom: 0, backgroundColor: colorP.third } : { backgroundColor: colorP.backGorund }}>
                    {content == false ? isData == true ? notificationMessage?.map((value: any, index: any) =>

                        <div className="noticeBox" onClick={() => handleMessage(value)} style={{ backgroundColor: colorP.backGorund }} >
                            <div className="iconBox">
                                <img height={40} width={46} src="/images/speaker.png" alt="" />
                                {/* <VolumeUpIcon style={{ color: colorP.forGround, height: ".46rem", width: ".40rem" }} className="noticeIcon"></VolumeUpIcon> */}
                            </div>
                            <div className="noticeBoxContent">
                                <div className="noticeTitleBox"><label className="noticeContent noticeContentSound" style={{ color: colorP.text }}>{value.title}</label></div>
                                {/* <div className="noticeTitleBox"><label className="noticeDate" style={{ color: colorP.forGround }}>{timestampToTime(value.updateTime)}</label></div> */}
                            </div>
                            <div className="arrowBox">
                                {/* <div className="arrowTitle"><label style={{ color: colorP.text }}>{t("ts409", { ns: "ts" })}</label></div> */}
                                <ArrowForwardIosIcon style={{ color: colorP.text, height: ".18rem", width: ".18rem" }} className="arrowIcon"></ArrowForwardIosIcon>
                            </div>
                        </div>

                    ) : (
                        <div className="noticeBoxempty" style={{ backgroundColor: colorP.backGorund, borderRadius: ".1rem" }}>
                            <div className="noMsessage">
                                <img src="/supportImages/noMessage.png" alt="" className="noMessageImage" style={{ width: "2.5rem" }} />
                                <label className="noMessageLabel" style={{ fontSize: ".22rem" }}>{t('ts1156', { ns: 'ts' })}</label>
                            </div>
                        </div>
                    ) : (<div className='alertContainer' style={{ color: colorP.text + " !important" }} dangerouslySetInnerHTML={{ __html: messageContent }} />)}
                </div>
                {content == false && isData == true &&
                    <div className="pagination">
                        <PngkPagination data={pageCount} action={handleChangePage}></PngkPagination>
                        {/* <Pagination sx={{
                            ".MuiButtonBase-root.Mui-selected": {
                                backgroundColor: colorP.forGround
                            },
                            ".MuiButtonBase-root.Mui-selected:hover": {
                                backgroundColor: colorP.forGround
                            }
                        }} count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton /> */}
                    </div>
                }
            </div>

            <AlertModal alertMode="alertDefault" alertTitle={t("ts410", { ns: "ts" })} openAlert={openNotif} closeAlert={handleClose} >
                <div className='alertContainer' style={{ color: colorP.text + " !important" }} dangerouslySetInnerHTML={{ __html: messageContent }} />
            </AlertModal>
        </>
    )
}