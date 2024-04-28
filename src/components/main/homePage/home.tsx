import MainLayout from "../../layout";
import "./home.css";
import { useEffect, useRef, useState } from "react";
import "react-notifications/lib/notifications.css";
import HomeMainContent from "./homeMainContent";
import Loader from "../../backdropLoader/backdrop-loader";
import { useTranslation } from "react-i18next";
import {
    useDiscount,
    useGetNotice,
    useGetTurnlateData,
    useGetTurnlateDataType5,
    useGEtPublicList
} from "../../hooks/getUserInfoHook";
import DisountModal from "./components/discountModal";
import Carousel from "../carousel/carousel";
import NoticeModal from "./components/noticeModal";
import SubmitModal from "../common/modal/submit-modal/submit-modal";
import DepositHisotry from "../userCenter/depositHistory";
import { useGlobalList, useGlobalVariables, useLoginStore, useModalStates } from "../../globalFunctions/store";
import HomeTurnTable from "../turnlate/turnTableModal";
import Swipers from "../carousel/swipe";
import { Box } from "@mui/material";

import {
    EffectCoverflow,
    Pagination,
    Navigation,
    Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router";
import PngkAlert from "../../layout/common/alertModal";
import PublicList from "./components/publicList";


function Home() {
    const [sideMargin, setSideMarging] = useState<any>(null);
    const { t, i18n } = useTranslation(["home", "main"]);
    const [actTab, setActtba] = useState("");
    const userInfo = useGlobalVariables((state) => state.userDetails);
    const Notice = useGetNotice();
    const noticeData = useGlobalVariables((state) => state.noticeData);
    const stationConfig = useGlobalVariables((state) => state.stationConfig);
    const turnDataType5 = useGetTurnlateDataType5();
    const { isLoading, data: discount } = useDiscount();
    const publicList = useGEtPublicList()
    const publicDatanotice = useGlobalList(state => state.notices)
    const activNotice = publicList?.data
    const turnlateDataType5 = useGlobalVariables(state => state.turnlateType5)
    useEffect(() => {
        Notice.refetch();
        useGlobalVariables.setState({ isFav: false });
        turnDataType5.refetch();
        if (turnDataType5.isLoading == false && turnDataType5.isSuccess == true) {
            setTimeout(() => {
                useGlobalVariables.setState({ turnLateModal: true });
            }, 1500);
        }
    }, []);

    const turnlateDatas = useGetTurnlateData();
    const navigate = useNavigate();
    const validayLogon = (link: any) => {
        if (userInfo?.isLogin == false) {
            useLoginStore.setState({ isOpen: true });
        } else {
            if (link == "chatroom") {
                window.open("/api/chatroom/goChat.do?isPc=true", "_blank");
            } else if (link == "handleOpenTurn") {
                turnlateDatas.refetch()
            } else if (link == "home") {
                navigate("/home")
            } else {
                link();
            }
        }
    };
    const topReff = useRef<any>();
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    const handleScrollGoTop = () => {
        const div = scrollableDivRef.current as HTMLDivElement;
        if (!div) return;
        const scrollPosition = div.scrollTop;
        const scrollHeight = div.scrollHeight;
        const divHeight = div.clientHeight;
        const middleBOt = scrollHeight * .2;
        setShowScrollIcon(
            scrollPosition === 0 ? false :
                scrollPosition + divHeight >= middleBOt ? true :
                    false
        );
    };

    const scrollToBottom = () => {
        topReff.current.scrollIntoView();
    };
    const [showScrollIcon, setShowScrollIcon] = useState<boolean>(false);
    useEffect(() => {
        publicList.refetch()
        useModalStates.setState({ sideTurn: false })
    }, [])
    const turnlateData = useGlobalVariables(state => state.turnlateType5)

    
    const today = new Date()
    const perDay = useGlobalVariables(state => state.turnOncePerDay)

    useEffect(() => {
        if (turnlateData?.pddStrategy?.popType === 3) {
            if (today.getHours() === 24) {
                useGlobalVariables.setState({ turnOncePerDay: true })
            } else if (today.getHours() !== 24) {
                useGlobalVariables.setState({ turnOncePerDay: false })
            }
        }
    }, [])

    const turnModalLog = useModalStates(state => state.turnModalLogin)

    return (
        <>
            {/* <DepositModal></DepositModal> */}

            <Loader setLoader={isLoading}></Loader>

            {publicList.isLoading === false && activNotice?.length !== 0 && <PublicList>{activNotice}</PublicList>}

            <MainLayout>
                <div id="home"></div>
                <Box>
                    <Swipers />
                </Box>
                <HomeMainContent
                    changeTab={setActtba}
                    tabLink={actTab}
                ></HomeMainContent>
            </MainLayout>
            {/* <GiftOpen></GiftOpen> */}
            {isLoading == false && <DisountModal />}
            {/* {Notice.isLoading == false && <NoticeModal>{noticeData}</NoticeModal>} */}
            {(turnlateData?.pddStrategy?.popType === 1) ? false : (turnDataType5.isLoading == false && stationConfig.pingduoduo_act_switch == true && turnlateDataType5 !== "") && <HomeTurnTable />}
        </>
    );
}
export default Home;
