import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import NoData from "../../noData/no-data";
import { DatePicker, CommissionStatus } from "../common/components/dropdownComponent";
import DateModal from "../common/dateModal";
import { useEffect, useReducer, useRef, useState } from "react";
import { dateReducer, initialDate, initialMonth } from "../reducers/dateReduce";
import Pagination from "@mui/material/Pagination/Pagination";
import { Box, Button, Skeleton, Stack, Tab, Tabs, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGetProxyRebate, useStationConfig } from "../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useGlobalVariables, useSetGameType } from "../../globalFunctions/store";
import { gameTypelabel } from "../userCenter/common/selectOtions";
import { TabContainer, TabItem, TabItems } from "../common/components/tabComponent";

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
function CommissionFee() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)
    const [currentPage, setCurrentPage] = useState(1)
    const staConfig = useGlobalVariables(state => state.userConfig)
    const value = useGlobalVariables(state => state.tabIndex2)
    const userConfig = useGlobalVariables(state => state.userConfig)
    const gameType = useGlobalVariables(state => state.gameID)
    const allData = useGlobalVariables(state => state.proxyRebate)
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        // getProxyRebate.mutate({ platform: 6 })
    };
    const getProxyRebate = useGetProxyRebate()
    const payload = {
        platform: "",
    }


    useEffect(() => {
        // // const act = Object.keys(userConfig.game).map(key => (userConfig.game[key] == 2 && { "id": userConfig.game[key], "key": key }))
        // const active= value
        // if (active.key == "chess") {

        // } else if (active.key == "egame") {
        //     getProxyRebate.mutate({ platform: 2 })
        // } else if (active.key == "esport") {
        //     getProxyRebate.mutate({ platform: 5 })
        // } else if (active.key == "fishing") {
        //     getProxyRebate.mutate({ platform: 4 })
        // } else if (active.key == "live") {
        //     getProxyRebate.mutate({ platform: 1 })
        // } else if (active.key == "lottery") {
        //     getProxyRebate.mutate({ platform: 7 })
        // } else if (active.key == "sport") {
        //     getProxyRebate.mutate({ platform: 6 })
        // }
        getProxyRebate.mutate({ platform: gameType })
    }, [value])

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }



    const [comm, setComm] = useState(0);
    const handleChangeComm = (event: any, newValue: number) => {
        setComm(newValue);
        const payload = {
            platform: event.target.id,
        }
        getProxyRebate.mutate(payload)
    };

    function getGameType(type: any) {
        const gType = gameTypelabel.filter((item: any) => item.value == type)
        return t(gType[0]?.label, { ns: "ts" })
    }
    return (
        <>
            <Loader setLoader={getProxyRebate.isLoading}></Loader>
            <div className="AllDataMainBox">
                <div className="myPerformanceContainer" style={{ backgroundColor: color.backGorund, padding: "0" }}>
                    <Box sx={{ width: '100%' }}>
                        <TabContainer>
                            {userConfig?.game?.chess == 2 && <TabItems id={3} className={value === 0 ? "active" : ""} index={0}>{getGameType(3)}</TabItems>}
                            {userConfig?.game?.egame == 2 && <TabItems id={2} className={value === 1 ? "active" : ""} index={1}>{getGameType(2)}</TabItems>}
                            {userConfig?.game?.esport == 2 && <TabItems id={5} className={value === 2 ? "active" : ""} index={2}>{getGameType(5)}</TabItems>}
                            {userConfig?.game?.live == 2 && <TabItems id={1} className={value === 4 ? "active" : ""} index={4}>{getGameType(1)}</TabItems>}
                            {userConfig?.game?.lottery == 2 && <TabItems id={7} className={value === 5 ? "active" : ""} index={5}>{getGameType(7)}</TabItems>}
                            {userConfig?.game?.sport == 2 && <TabItems id={6} className={value === 6 ? "active" : ""} index={6}>{getGameType(6)}</TabItems>}
                        </TabContainer>
                        <CustomTabPanelBonus value={comm} index={comm}>
                            <div className="tableContainer" style={{ padding: ".2rem",minHeight:"5.5rem" }}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell><span style={{fontSize:".2rem", color: color.text4}}>{t("ts085", { ns: "ts" })}</span></TableCell>
                                            <TableCell><span style={{fontSize:".2rem", color: color.text4}}>{t("ts951", { ns: "ts" })}</span></TableCell>
                                            <TableCell><span style={{fontSize:".2rem", color: color.text4}}>{t("ts952", { ns: "ts" })}</span></TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {getProxyRebate.isLoading == false && allData && allData?.map((value: any, index: any) =>
                                            <TableRow key={index}>
                                                <TableCell>{getGameType(value.type)}</TableCell>
                                                <TableCell>≥{value.minBet}</TableCell>
                                                <TableCell><span style={{color:"#ffaa09",fontSize:".2rem"}}>{value.rate}</span></TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                {/* {getProxyRebate.isLoading == false && allData && allData.length == 0 ? <NoData padding={"1rem 0 0 0"} /> :
                                    <>
                                        <div className="pagination">
                                            <Pagination
                                                sx={{
                                                    ".MuiButtonBase-root.Mui-selected": {
                                                        backgroundColor: color.forGround
                                                    },
                                                    ".MuiButtonBase-root.Mui-selected:hover": {
                                                        backgroundColor: color.forGround
                                                    }
                                                }} count={Math.ceil(allData?.length / 10)} defaultPage={currentPage} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                                        </div>
                                    </>
                                } */}
                            </div>
                            <div className="commissionFooter">
                                <span>{t("ts953", { ns: "ts" })}</span>
                            </div>
                        </CustomTabPanelBonus>
                    </Box>

                </div>
            </div>
        </>
    )
}
export default CommissionFee;