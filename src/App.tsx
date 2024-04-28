import React from "react";
import { HashRouter } from "react-router-dom";

import { Routes, Route, Outlet, Navigate } from "react-router";

import Home from "./components/main/homePage/home";
// import Event from "./components/main/eventPage/event";
import Record from "./components/main/recordPage/record";
import Rebate from "./components/main/rebatePage/rebate";
import Vip from "./components/main/vipPage/vip";
import Fee from "./components/main/feePage/fee";
import AccountDetails from "./components/main/userCenter";
import Pending from "./components/main/pendingPage/pending";
import Support from "./components/main/supportpage/support";
import MyShare from "./components/main/invitePage/inviteLink/myShare";
import Security from "./components/main/securityPage/sercurity";
import Phone from "./components/main/securityPage/phonePage/phone";
import Deposit from "./components/main/userCenter/depositPage/deposit/depoist";
import CoreWallet from "./components/main/walletPage/coreWallet";
import CoreWalletArcade from "./components/main/walletPage/coreWalletArcade";
import CoreWalletFishing from "./components/main/walletPage/coreWalletFishing";
import CoreWalletBlockchain from "./components/main/walletPage/coreWalletBlockchain";
import CoreWalletEsport from "./components/main/walletPage/coreWalletEsport";
import GoogleAuth from "./components/main/securityPage/phonePage/phone";
import Question from "./components/main/securityPage/questionPage/question";
import ProfileInfo from "./components/main/profileInfoPage/profile";
import WithdrawalPassword from "./components/main/withdrawalPassword/withdrawalPassword";
import WithdrawalPage from "./components/main/userCenter/widthrawalPage/withdraw";
import ElectronicHistory from "./components/main/userCenter/betHistoryPage/electronicHistoryPage/electronicHistory";
import AccountManagement from "./components/main/invitePage/inviteLink/accountTabManagement";
import HistoryPT from "./components/main/userCenter/betHistoryPage/ptHistoryPage/historyPT";
import LiveCasinoHistory from "./components/main/userCenter/betHistoryPage/liveCasinoHistoryPage/liveCasinoHistory";
import ChessHistory from "./components/main/userCenter/betHistoryPage/chessHistoryPage/chessHistory";
import EsportsHistory from "./components/main/userCenter/betHistoryPage/esportHistoryPage/esportsHistory";
import FishingHistory from "./components/main/userCenter/betHistoryPage/fishingHistoryPage/fishingHistory";
import LotteryHistory from "./components/main/userCenter/betHistoryPage/lotterHistoryPage/lotteryHistory";
import HistorySport from "./components/main/userCenter/betHistoryPage/sportHistoryPage/historySport";
import RedFolder from "./components/main/redFolder/redfolder";
import DateModal from "./components/main/common/dateModal";

import PointRedemption from "./components/main/pointRedemption/point-redemption";
import AlertModal from "./components/main/common/modal/alert-modal/alert-modal";
import BettingHistory from "./components/main/userCenter/betHistoryPage";
import Carousel from "./components/main/carousel/carousel";
import Game from "./components/main/homePage/game";
import PromotionPage from "./components/main/PromotionPage";
import EventDetails from "./components/main/eventPage/eventDetails";
import EventRecords from "./components/main/eventPage/records";
import Recharge from "./components/main/recharge/recharge";
import DownloadPage from "./components/main/downloadPage/download-page";
import ActiveEvent from "./components/main/eventPage/newEvent/newEvent";
import Discount from "./components/main/eventPage/discountPage/discount";
import GameSpace from "./components/main/homePage/game";
import GameFrame from "./components/main/homePage/gameFrame";
import Recorder from "./components/main/records/record";

import ActivityPage from "./components/main/eventPage/newEvent/activityPage";
import {
  useGetConfig,
  useGetRegFields,
  useGetUserInfo,
  useRefreshBal,
  useStationConfig,
} from "./components/hooks/getUserInfoHook";
import { useEffect, useState } from "react";
import WithdrawMoney from "./components/main/userCenter/widthrawalPage/withdrawMoney";
import Faq from "./components/main/faq/faq";
import { useGlobalVariables } from "./components/globalFunctions/store";
import TurnTable from "./components/main/turnlate/turnTable";
import Mission from "./components/main/mission/missionPage";
import Secure from "./components/main/securityPage/security/secure";
import GameSearch from "./components/main/homePage/searchPage";
import EnveLop from "./components/main/envelop";
import Promote from "./components/main/promotePage/promote";
import Loader from "./components/backdropLoader/backdrop-loader";
import { ChangeColorPallteUpdate } from "./components/globalFunctions/globalContext";
const LazyEvent=React.lazy(()=> import  ("./components/main/eventPage/event"))
const ProtectedRoute = ({ user, children, redirectPath }: any) => {
  if (user?.isLogin == false) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
function App() {
  const { data: user, isLoading, isSuccess } = useGetUserInfo();
  const userConfig = useStationConfig();
  const refreshBalance = useRefreshBal()
  const title = useGlobalVariables(state => state.stationConfig)
  const regFields = useGetRegFields()
  const [screenLoading, setScreenLoading] = useState(true);
  const changeColor = ChangeColorPallteUpdate()
  useEffect(() => {
    const onPageLoad = () => {
      setScreenLoading(false)
      // do something else
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
 
      console.log("loading")
      // Remove the event listener when component unmounts

    }
  }, []);
  useEffect(() => {
    userConfig.refetch()

    if (userConfig.isLoading == false) {
      document.title = title && title.stationName;
    }
    if (user?.data.isLogin == false) {
      regFields.refetch()
    }
  }, []);

  const handleColorChange = (stationTema: any) => {
    changeColor(stationTema)
  }

  useEffect(() => {
    const stationConfig = useGlobalVariables.getState().stationConfig;
    // handleColorChange(16)
    handleColorChange(stationConfig.stationTheme)
  }, [])
 
  return (
 <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/faq" element={<Support active={0} />}></Route>
          <Route path="/support" element={<Support active={0} />}></Route>
          <Route path="/download-page" element={<DownloadPage />}></Route>
          <Route path="/activeEvent" element={<ActiveEvent />}></Route>
          <Route path="/game" element={<GameSpace />}></Route>
          <Route path="/event" element={<React.Suspense fallback={<Loader setLoader="true"></Loader>}><LazyEvent /></React.Suspense>}></Route>
          <Route path="/event-details" element={<EventDetails></EventDetails>}></Route>
          <Route path="/rebate-fishing" element={<Rebate active={0} />}></Route>
          <Route path="/rebate-arcade" element={<Rebate active={1} />}></Route>
          <Route path="/rebate-blockchain-games" element={<Rebate active={2} />}></Route>
          <Route path="/balance-bonus" element={<Fee active={0} />}></Route>
          <Route path="/balance-cash-record" element={<Fee active={1} />}></Route>
          <Route path="/balance-bonus-introduction" element={<Fee active={2} />} ></Route>
          <Route path="/PromotionPage" element={<PromotionPage />}></Route>
          <Route path="/notification" element={<Support active={2} />}></Route>
          <Route path="/event-mission" element={<Mission />}></Route>
          <Route path="/search" element={<GameSearch />}></Route>
          <Route path="/turn-table" element={<TurnTable />}></Route>        
            <Route path="/promote" element={<Promote />}></Route>


          <Route element={<ProtectedRoute user={user?.data} redirectPath="/" />}>
            <Route path="/withdraw" element={<WithdrawMoney />}></Route>
            <Route path="/register" element={<Home />}></Route>
            <Route path="/records" element={<EventRecords></EventRecords>}></Route>
            <Route path="/event-discount" element={<Discount></Discount>}></Route>
            <Route path="/alert-modal" element={<AlertModal />}></Route>
            <Route path="/point-redemption" element={<PointRedemption />}></Route>
            <Route path="/date" element={<DateModal />}></Route>
            <Route path="/online" element={<GameFrame />}></Route>
            <Route path="/record" element={<Recorder />}></Route>
            <Route path="/secure" element={<Secure />}></Route>
            <Route path="/turn-table" element={<TurnTable />}></Route>
            <Route path="/envelop" element={<EnveLop />}></Route>

            <Route
              path="/withdrawal"
              element={<WithdrawalPage active={0} />}
            ></Route>
            <Route
              path="/withdrawal-history"
              element={<WithdrawalPage active={1} />}
            ></Route>
            <Route
              path="/usdt-management"
              element={<WithdrawalPage active={3} />}
            ></Route>
            <Route
              path="/add-bank-card"
              element={<WithdrawalPage active={2} />}
            ></Route>
            <Route
              path="/agent-management"
              element={<AccountManagement />}
            ></Route>
            <Route path="/profile-information" element={<ProfileInfo />}></Route>
            <Route path="/core-wallet" element={<CoreWallet />}></Route>
            <Route
              path="/core-wallet-arcade"
              element={<CoreWalletArcade />}
            ></Route>
            <Route
              path="/core-wallet-fishing"
              element={<CoreWalletFishing />}
            ></Route>
            <Route
              path="/core-wallet-blockchain"
              element={<CoreWalletBlockchain />}
            ></Route>
            <Route
              path="/core-wallet-esport"
              element={<CoreWalletEsport />}
            ></Route>
            <Route
              path="/account-details"
              element={<AccountDetails active={0} />}
            ></Route>
            <Route
              path="/betting-records"
              element={<AccountDetails active={1} />}
            ></Route>
            <Route
              path="/personal-report"
              element={<AccountDetails active={2} />}
            ></Route>
            <Route
              path="/Overview"
              element={<AccountDetails active={3} />}
            ></Route>
            <Route
              path="/account-details-transfer-record"
              element={<AccountDetails active={4} />}
            ></Route>
            <Route
              path="/redenvelope-records"
              element={<AccountDetails active={5} />}
            ></Route>
            <Route path="/notice" element={<Support active={1} />}></Route>

            <Route path="/feedback" element={<Support active={3} />}></Route>

            <Route path="/record-collection" element={<Record />}></Route>
            <Route path="/vip" element={<Vip />}></Route>

            <Route path="/pending" element={<Pending />}></Route>
            <Route path="/myShare" element={<MyShare />}></Route>
            <Route path="/security" element={<Security />}></Route>
            <Route path="/secure" element={<Secure />}></Route>
            <Route path="/phone" element={<Phone />}></Route>
            <Route path="/google" element={<GoogleAuth />}></Route>
            <Route path="/question" element={<Question />}></Route>
            <Route path="/deposit" element={<Deposit />}></Route>
            <Route
              path="/WithdrawalPassword"
              element={<WithdrawalPassword />}
            ></Route>
            <Route path="/historySport" element={<HistorySport />}></Route>
            <Route
              path="/electronicHistory"
              element={<ElectronicHistory />}
            ></Route>
            <Route path="/historyPT" element={<HistoryPT />}></Route>
            <Route
              path="/liveCasinoHistory"
              element={<LiveCasinoHistory />}
            ></Route>
            <Route path="/chessHistory" element={<ChessHistory />}></Route>
            <Route path="/esportsHistory" element={<EsportsHistory />}></Route>
            <Route path="/fishingHistory" element={<FishingHistory />}></Route>
            <Route path="/redFolder" element={<RedFolder />}></Route>
            <Route path="/lotteryHistory" element={<LotteryHistory />}></Route>
       
            <Route path="/betting-history" element={<BettingHistory />}></Route>
            <Route path="/carousel" element={<Carousel />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/recharge" element={<Recharge />}></Route>
          </Route>
          <Route path="/activeEvent" element={<ActiveEvent />}></Route>
          <Route path="/active-event" element={<ActivityPage />}></Route>
          <Route path="/active-event" element={<ActivityPage />}></Route>
        </Routes>
      </HashRouter>
  );
}
export default App;
