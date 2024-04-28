import axios from "axios";
import BalanceChart from "./chart";
import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker, DatePickerV2 } from "../common/components/dropdownComponent";
import { dateReducer, initialDate, initialMonth } from "../reducers/dateReduce";
import DateModal from "../common/dateModal";
import { Box, Button, FormControl, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import ApexCharts from 'apexcharts'
import { useGetBonusChart, useStationConfig } from "../../hooks/getUserInfoHook";
import Chart from "react-apexcharts";
import { useGlobalVariables, useSetlang } from "../../globalFunctions/store";
import Loader from "../../backdropLoader/backdrop-loader";
export default function BalanceBonus() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth)
    const handleGetdateEven = (e: any) => {
        dispatch({ type: e.value, dates: e })
    }
    const lang = useSetlang((state) => state.langText)
    const [earning, setEarning] = useState<any[]>([])
    const [earningYesterday, setYesterdayEarning] = useState<any[]>([])
    const [earningDayYesterday, setDayYesterdayEarning] = useState<any[]>([])

    const money = useGlobalVariables(state => state.stationConfig)
    const userDetails = useGlobalVariables(state => state.userDetails)

    const moneyUnit = money?.moneyUnit
    const gGetBonusChart = useGetBonusChart()

    const [stateOptions, setStateOptions] = useState({
        options: {
            chart: {
                id: "Interest-Table-Pngk",
                height: 350,
                width: 1110,
                zoom: {
                    enabled: false
                }
            },
        },
        series: [
            {
                name: t("ts519", { ns: "ts" }),
                data: [0, 10, 20, 30, 40, 50]
            }
        ]
    });

    const payload = {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
    }

    useEffect(() => {
        gGetBonusChart.mutate(payload)
    }, [lang, colorP])

    async function getEarnings() {
        if (userDetails?.isLogin == true) {
            const response = await axios.get('/userCenter/userCenterBill/index.do', {
                headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
            })
            setEarning(current => [...current, response.data])
            setYesterdayEarning(current => [...current, response.data.yesterdayRecord])
            setDayYesterdayEarning(current => [...current, response.data.qiantianRecord])
        }
    }
    useEffect(() => {
        getEarnings()
    }, [])

    const [yearEnd, setYearend] = useState<any[]>([])
    const [interestRate, setInterestRate] = useState<any[]>([])

    if (gGetBonusChart.isLoading == false && gGetBonusChart.isSuccess == true) {
        setYearend([])
        setInterestRate([])
        gGetBonusChart?.data?.statDate?.map((value: any, index: any) =>
            yearEnd.push(value.value)
        )
        gGetBonusChart?.data?.scale?.map((value: any, index: any) =>
            interestRate.push(value.value)
        )
        const options = {
            options: {
                chart: {
                    defaultLocale: 'en',
                    id: "Interest-Table-Pngk",
                    height: 350,
                    width: 1110,
                    zoom: {
                        enabled: false
                    }
                },
                stroke: {
                    dashArray: 6
                },
                dataLabels: {
                    enabled: false,
                    offsetY: -8,
                    textAnchor: 'middle',
                    distributed: true,
                },
                colors: [colorP.forGround, colorP.forGround],
                xaxis: {
                    categories: yearEnd,
                    axisTicks: {
                        show: true
                    },
                    title: {
                        text: t("ts518", { ns: "ts" }),
                    }
                },
                yaxis: {
                    title: {
                        text: t("ts517", { ns: "ts" }),
                    },
                    tickAmount: 5,
                    // min: interestRate[0],
                    // max: interestRate[interestRate.length-1]
                },
                title: {
                    text: t("ts516", { ns: "ts" }),
                    align: 'left'
                },
                markers: {
                    size: 4,
                    hover: {
                        size: 7,
                    },
                },
                annotations: {
                    yaxis: [
                        {
                            y: interestRate[interestRate.length - 1],
                            borderColor: '#00E396',
                            label: {
                                borderColor: '#00E396',
                                style: {
                                    color: '#fff',
                                    background: '#00E396'
                                },
                            }
                        }
                    ],
                    points:
                        [
                            {
                                x: yearEnd[0],
                                y: interestRate[0],
                                marker: {
                                    size: 4,
                                    strokeColor: colorP.forGround,
                                    fillColor: colorP.forGround,
                                },
                                label: {
                                    borderColor: colorP.forGround,
                                    offsetY: 0,
                                    style: {
                                        color: "#fff",
                                        background: colorP.forGround
                                    },
                                    text: interestRate[0]
                                },

                            },
                            {
                                x: yearEnd[yearEnd.length],
                                y: interestRate[interestRate.length - 1],
                                marker: {
                                    size: 4,
                                    strokeColor: colorP.forGround,
                                    fillColor: colorP.forGround,
                                },
                                label: {
                                    borderColor: colorP.forGround,
                                    offsetY: 0,
                                    style: {
                                        color: "#fff",
                                        background: colorP.forGround
                                    },
                                    text: interestRate[interestRate.length - 1]
                                }
                            }
                        ]
                },
            },
            series: [
                {
                    name: t("ts519", { ns: "ts" }),
                    data: interestRate
                }
            ]
        }
        setStateOptions(options)
        gGetBonusChart.reset()
    }
    return (
        <>
            <div className="cardMainContainer">
                {/* <Loader setLoader={gGetBonusChart.isLoading} />
                <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
                <Stack padding={".2rem"} spacing={2} direction={"row"}>
                    <DatePickerV2 defaultValue={t("ts031", { ns: ["ts"] })} onChange={handleGetdateEven} />
                    <Button style={{ backgroundColor: colorP.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: "#874404" }} className="bonusSearchButton" onClick={() => gGetBonusChart.mutate(payload)} variant="contained"><SearchIcon style={{ height: ".2rem", width: ".2rem" }} />{t("ts042", { ns: "ts" })}</Button>
                </Stack> */}
                <div className="cardsContainer">
                    <div className="cardBox1">
                        <div className="labelBox"><label className="labelTitle" style={{ color: "#fff" }}>{t("ts511", { ns: "ts" })} ({moneyUnit})</label></div>
                        {/* {userDetails?.isLogin == true &&
                            <> */}
                                <div className="labelBox"><label className="labelAmount" style={{ color: "#fff" }}>{earningYesterday[0] ? earningYesterday[0].income : "0"}</label></div>
                                <div className="labelBox"><label className="labelEarningRate" style={{ color: "#fff" }}>{t("ts515", { ns: "ts" })} {earningYesterday[0] ? earningYesterday[0].scale + "‱" : "0‱"}</label></div>
                            {/* </>
                        } */}
                        <div className="coinBox">
                            <img src="/feesImages/coin.png" className="coinImage" />
                        </div>
                    </div>
                    <div className="cardBox2">
                        <div className="labelBox"><label className="labelTitle" style={{ color: "#fff" }}>{t("ts512", { ns: "ts" })} ({moneyUnit})</label></div>
                        {/* {userDetails?.isLogin == true &&
                            <> */}
                                <div className="labelBox"><label className="labelAmount" style={{ color: "#fff" }}>{earning[0] ? earning[0].incomeStr + "~" + earning[0].incomeEnd : "0"}</label></div>
                                <div className="labelBox"><label className="labelEarningRate" style={{ color: "#fff" }}>{t("ts513", { ns: "ts" })} {earning[0] ? earning[0].scaleStr + "‱~" + earning[0].scaleEnd + "‱" : "0‱"}</label></div>
                            {/* </>
                        } */}
                        <div className="coinBox">
                            <img src="/feesImages/coin.png" className="coinImage" />
                        </div>
                    </div>
                    <div className="cardBox3">
                        <div className="labelBox"><label className="labelTitle" style={{ color: "#fff" }}>{t("ts514", { ns: "ts" })} ({moneyUnit})</label></div>
                        {/* {userDetails?.isLogin == true &&
                            <> */}
                                <div className="labelBox"><label className="labelAmount" style={{ color: "#fff" }}>{earningDayYesterday[0] ? earningDayYesterday[0].income : "0"}</label></div>
                                <div className="labelBox"><label className="labelEarningRate" style={{ color: "#fff" }}>{t("ts515", { ns: "ts" })} {earningDayYesterday[0] ? earningDayYesterday[0].scale + "‱" : "0‱"}</label></div>
                            {/* </>
                        } */}
                        <div className="coinBox">
                            <img src="/feesImages/coin.png" className="coinImage" />
                        </div>
                    </div>
                </div>
                {/* <div className="graphContainer">
                    //<div className="graphTitle">{t("ts516", { ns: "ts" })}</div>
                    //<BalanceChart commonReducer={commonReducer} startDate={commonReducer.startDate} endDate={commonReducer.endDate} searchTrigger={searchTrigger} />
                    <div className="graphScrollBox">
                        <Box
                            sx={{
                                " .apexcharts-text": {
                                    fill: "#fff",
                                },
                                " .apexcharts-title-text": {
                                    fill: "#fff",
                                }
                            }}
                        >
                            <Chart
                                options={stateOptions.options}
                                series={stateOptions.series}
                                type="line"
                                height="400"
                                width="1110"
                            />
                        </Box>
                    </div>
                </div> */}
            </div>
        </>
    )
}