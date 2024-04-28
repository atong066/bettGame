import Button from '@mui/material/Button';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import FeedbackCreate from './feeedbackCreate';
import FeedbackRead from './feedbackRead';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from '../../../globalFunctions/globalContext';
import { useGlobalVariables } from '../../../globalFunctions/store';
import { useGetArticles } from '../../../hooks/getUserInfoHook';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanelBonus(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

function a11yPropsBanus(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function NoticePaged() {
    const notice = useGlobalVariables(state => state.noticeContent)
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const content = useGlobalVariables(state => state.showContent)
    const [bonus, setBonus] = useState(0);
    const handleChangeBonus = (newValue: number) => {
        setBonus(newValue);
    };
    const handleMessage = (message: any) => {
        useGlobalVariables.setState({ noticeContent: message })
        useGlobalVariables.setState({ showContent: true });
        useGlobalVariables.setState({ isSupport: true });

    }
    const marquee = useGetArticles()

    useEffect(() => {
        marquee.refetch()
    }, [])

    console.log(marquee)
    return (
        <>
            <div className="bonusContainer">
                <Box sx={{ width: '100%' }}>
                    <div className='noticeContainerSupport' style={{ backgroundColor: colorP.backGorund }}>
                        {marquee.isSuccess === true && content == false ?
                            <div className='noticeBoxContainer' style={marquee?.data.data?.total !== 0 ? { backgroundColor: colorP.third } : { backgroundColor: colorP.backGorund }}>
                                {marquee?.data.data?.total !== 0 ? marquee?.data.data?.rows?.map((value: any, index: any) =>
                                    <div className="noticeBox" onClick={() => handleMessage(value.content)} style={{ backgroundColor: colorP.backGorund, cursor: "pointer" }} >
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
                                ) :
                                    <div className="noticeBoxempty" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="noMsessage">
                                            <img src="/supportImages/noMessage.png" alt="" className="noMessageImage" style={{ width: "2.5rem" }} />
                                            <label className="noMessageLabel" style={{ fontSize: ".22rem" }}>{t("ts355", { ns: "ts" })}</label>
                                        </div>
                                    </div>}
                            </div>
                            : notice ? <div dangerouslySetInnerHTML={{ __html: notice }}></div> : (
                                <div className="noticeBoxempty" style={{ backgroundColor: colorP.backGorund }}>
                                    <div className="noMsessage">
                                        <img src="/supportImages/noMessage.png" alt="" className="noMessageImage" style={{ width: "2.5rem" }} />
                                        <label className="noMessageLabel" style={{ fontSize: ".22rem" }}>{t("ts355", { ns: "ts" })}</label>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Box>
            </div>
        </>
    )
}