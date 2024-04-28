import { useEffect, useReducer, useState } from "react";
import MainLayout from "../../../layout";
import { HeaderWithAction } from "../../common/header";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import axios from "axios";
import './betting-history.css'
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import DateModal from "../../common/dateModal";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import ChessHistory from "./chessHistoryPage/chessHistory";
import EsportsHistory from "./esportHistoryPage/esportsHistory";
import ElectronicHistory from "./electronicHistoryPage/electronicHistory";
import FishingHistory from "./fishingHistoryPage/fishingHistory";
import LiveCasinoHistory from "./liveCasinoHistoryPage/liveCasinoHistory";
import HistoryPT from "./ptHistoryPage/historyPT";
import LotteryHistory from "./lotterHistoryPage/lotteryHistory";
import HistorySport from "./sportHistoryPage/historySport";
import { useTranslation } from "react-i18next";
import { DatePicker, DatePickerV2, HistoryPicker } from "../../common/components/dropdownComponent";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
function BettingHistory() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [tabs, setActiveTabs] = useState('')
    const [activeTab, setTabActive] = useState<any>("sport")
    const [types, setTypes] = useState([]);
    const [account, accountHandle] = useState('')
    const [orderNo, orderNoHandle] = useState('')
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const [search, setSearch] = useState(false)
    const [platforms, setPlatforms] = useState<any[]>([])
    const [activePlatforms, setActivePlatforms] = useState<any[]>([])
    function getTabs() {
        switch (tabs) {
            case '1':
                return <HistorySport platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></HistorySport>
            case '2':
                return <ElectronicHistory platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></ElectronicHistory>
            case '3':
                return <HistoryPT platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></HistoryPT>
            case '4':
                return <LiveCasinoHistory platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></LiveCasinoHistory>
            case '5':
                return <ChessHistory platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></ChessHistory>
            case '6':
                return <EsportsHistory platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></EsportsHistory>
            case '7':
                return <FishingHistory platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></FishingHistory>
            case '8':
                return <LotteryHistory platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></LotteryHistory>
            default:
                return <HistorySport platform={types} trigger={search} accounts={account} orderNos={orderNo} commonAPI={commonReducer}></HistorySport>
        }
    }

    const handleChoice = (event: any) => {
        event.value == "1" ? setTabActive("sport") :
            event.value == "2" ? setTabActive("egame") :
                event.value == "3" ? setTabActive("pt") :
                    event.value == "4" ? setTabActive("live") :
                        event.value == "5" ? setTabActive("chess") :
                            event.value == "6" ? setTabActive("esport") :
                                event.value == "7" ? setTabActive("fish") :
                                    event.value == "8" ? setTabActive("lottery") : setTabActive("0")
        setActiveTabs(event.value)
        getPlatform()
    }
    const handleTypes = (e: any) => {
        setTypes(e.target.value)
    };
    const handleSearch = (e: any) => {
        setSearch(!search)
    }
    async function getPlatform() {
        const response = await axios.post('/userCenter/getConfig.do')
        setPlatforms(platforms => [...platforms, response.data])
        setActivePlatforms(response.data[activeTab])

    }
    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })
    }
    useEffect(() => {
        getPlatform()
    }, [tabs])

    function setAccountName(e: any) {
        accountHandle(e)
    }

    const MenuProps = {
        PaperProps: {
            sx: {
                background: colorP.backGorund,
                color: colorP.text,
                fontSize: ".18rem",
                "& em": {
                    color: colorP.text,
                    fontSize: ".18rem"
                }
            }
        },
    };

    return (
        <>
            <MainLayout>
                <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
                <section className="bettingHistoryMainContainer">
                    <HeaderWithAction backBtn={'/'}>{t("ts004", { ns: ["ts"] })}</HeaderWithAction>
                    <div className="filtersInputsContainers" style={{ backgroundColor: colorP.backGorund }}>
                        <Stack useFlexGap style={{ flexWrap: "wrap" }} spacing={2} direction={"row"}>
                            <HistoryPicker onChange={handleChoice} />
                            <DatePickerV2 onChange={handleGetdateEven} />
                            <TextField
                                sx={{
                                    width: 150,
                                    "& .MuiInputBase-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colorP.fourth + " !important",
                                            fontSize: ".18rem",
                                            borderRadius: "1rem",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            color: colorP.text4 + " !important",
                                            fontSize: ".18rem"
                                        },
                                        height: ".5rem",
                                    },
                                    "& .MuiFormLabel-root": {
                                        color: "#808080 !important",
                                        fontSize: ".18rem",
                                        lineHeight: ".3rem"
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        fontSize: ".18rem",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "2px solid !important",
                                            borderColor: colorP.forGround + " !important",
                                            fontSize: ".18rem"
                                        }
                                    }
                                }}
                                value={account} size="small" onChange={(e) => setAccountName(e.target.value)} label={t("ts034", { ns: ["ts"] })} />
                            <TextField
                                sx={{
                                    width: 150,
                                    "& .MuiInputBase-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colorP.fourth + " !important",
                                            fontSize: ".18rem",
                                            borderRadius: "1rem",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            color: colorP.text4 + " !important",
                                            fontSize: ".18rem"
                                        },
                                        height: ".5rem",
                                    },
                                    "& .MuiFormLabel-root": {
                                        color: "#808080 !important",
                                        fontSize: ".18rem",
                                        lineHeight: ".3rem"
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        fontSize: ".18rem",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "2px solid !important",
                                            borderColor: colorP.forGround + " !important",
                                            fontSize: ".18rem"
                                        }
                                    }
                                }}
                                size="small" onChange={(e) => orderNoHandle(e.target.value)} label={t("ts035", { ns: ["ts"] })} />
                            {/* {tabs == '3' ? "" :
                                <FormControl
                                    sx={{
                                        m: 0, minWidth: 200,
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#313843 !important",
                                                fontSize:".18rem"
                                            },
                                            "& .MuiSelect-select": {
                                                color: colorP.text + " !important",
                                                fontSize:".18rem"
                                            },
                                            "& .MuiSvgIcon-root": {
                                                color: colorP.text + " !important",
                                                fontSize:".18rem"
                                            },
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important",
                                            fontSize:".18rem"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: colorP.forGround + " !important",
                                                fontSize:".18rem"
                                            }
                                        }
                                    }}
                                    size="small">
                                    <InputLabel id="demo-select-small-label">{t("ts093", { ns: ["ts"] })}</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={types}
                                        label={t("ts093", { ns: ["ts"] })}
                                        onChange={handleTypes}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value=" ">{t("ts036", { ns: ["ts"] })}</MenuItem>
                                        {
                                            activePlatforms ? activePlatforms?.map((item: any, index: any) =>
                                                <MenuItem value={item.value}>{item.name}</MenuItem>
                                            ) :  <MenuItem value=""></MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                            } */}
                            {/* <Button style={{ backgroundColor: colorP.forGround, color: colorP.text }} className="searchButton" variant="contained" onClick={handleSearch} ><SearchIcon />{t("ts042", { ns: ["ts"] })}</Button> */}
                            <Button style={{ backgroundColor: colorP.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: colorP.text2, height: ".5rem" }} onClick={handleSearch} variant='contained' className="searchButton" startIcon={<SearchIcon style={{ height: ".2rem", width: ".2rem" }} />}>{t("ts042", { ns: ["ts"] })}</Button>
                        </Stack>
                    </div>
                    <div className="tablesContentsContainers" style={{ backgroundColor: colorP.backGorund }}>
                        {getTabs()}
                    </div>
                </section>
            </MainLayout>
        </>
    )
}
export default BettingHistory;