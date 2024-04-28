import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { createElement, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import Loader from '../../backdropLoader/backdrop-loader';
import NoData from '../../noData/no-data';
import ApexCharts from 'apexcharts'
import { render } from 'react-dom';
import { Box } from '@mui/material';

export default function BalanceChart(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [startDate, setStartDate] = useState([])
    const [scale, setScale] = useState([])
    const [setLoader, setOpenLoader] = useState(true);
    // useEffect(() => {
    //     getChart()
    // }, [])
    async function getChart() {
        setOpenLoader(true)
        const response = await axios.post('/userCenter/userCenterBill/eChartData.do', {
            startTime: props.startDate,
            endTime: props.endDate,
        }, {
            headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
        })
        if (response.data.statDate || response.data.scale != '') {
            setScale([])
            setStartDate([])
            setStartDate(response.data.statDate)
            setScale(response.data.scale)
            setOpenLoader(false)
        } else {
            setOpenLoader(false)
        }
    }
    const years = [
        startDate && startDate.map((value: any, index: any) =>
            new Date(value.value).toLocaleDateString('sv-SE')
        )
    ];
    const interestRate = [
        scale && scale.map((value: any, index: any) =>
            value.value,
        )
    ];

    // useEffect(() => {
    //     var options = {
    //         series: [{
    //             name: t("ts519", { ns: "ts" }),
    //             data: interestRate[0]
    //         }],
    //         chart: {
    //             type: 'line',
    //             height: 350,
    //             width: 1110,
    //             zoom: {
    //                 enabled: false
    //             }
    //         },
    //         dataLabels: {
    //             enabled: false
    //         },
    //         stroke: {
    //             curve: 'straight'
    //         },
    //         title: {
    //             text: t("ts516", { ns: "ts" }),
    //             align: 'left'
    //         },
    //         xaxis: {
    //             categories: years[0]
    //         }
    //     }
    //     var chart = new ApexCharts(document.querySelector("#chart"), options);
    //     chart.render()
    // }, [props.searchTrigger])


    return (
        <>
            {/* <Loader setLoader={setLoader}></Loader> */}
            {/* <NoData></NoData> */}

            <Box id="chart">

            </Box>
            {/* <LineChart
                xAxis={[
                    {
                        data: years[0],
                        scaleType: 'utc',
                        label: t("ts518", { ns: "ts" }),
                        valueFormatter: (date) => date.toLocaleDateString('sv-SE'),
                    },
                ]}
                yAxis={[
                    {
                        label: t("ts517", { ns: "ts" }),
                        data: [years[0].length],
                        min: 0,
                    },
                ]}
                series={[
                    {
                        data: interestRate[0],
                        label: t("ts519", { ns: "ts" }),
                        showMark: true,
                        curve: "linear",
                    },
                ]}
                height={400}
                sx={{
                    '& .MuiLineElement-root': {
                        strokeDasharray: '10 5',
                        strokeWidth: 2,
                        stroke: colorP.forGround
                    },
                    ' & .css-1k2u9zb-MuiChartsAxis-root .MuiChartsAxis-line': {
                        stroke: colorP.forGround + " !important"
                    },
                    ' & .css-1k2u9zb-MuiChartsAxis-root .MuiChartsAxis-tick': {
                        stroke: colorP.forGround + " !important",
                        x2: "1110 !important"
                    },
                    ' & .MuiChartsAxis-tickLabel, .MuiChartsAxis-label': {
                        fill: colorP.forGround + " !important"
                    },
                    ' & tspan': {
                        fill: colorP.text + " !important"
                    },
                    ' & .css-1u0lry5-MuiChartsLegend-root': {
                        display: "none !important"
                    },
                    ' & .css-1u2hdaw-MuiChartsAxisHighlight-root': {
                        stroke: colorP.forGround + " !important"
                    },
                    ' & .MuiMarkElement-root': {
                        fill: colorP.forGround + " !important"
                    },
                }}
            /> */}
        </>
    );
}