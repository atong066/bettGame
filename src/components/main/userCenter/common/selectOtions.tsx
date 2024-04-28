import { useTranslation } from "react-i18next";

export const dates = [
    { value: "1", label: "Today" },
    { value: "2", label: "Yesterday" },
    { value: "3", label: "This Month" },
    { value: "4", label: "Last Month" },
    { value: "7", label: "Custom" },
]
export const depositMethod = [
    { value: "3", label: "ts412" },
    { value: "1", label: "ts413" },
    { value: "2", label: "ts414" },
    { value: "4", label: "ts415" },
]
export const statuses = [
    { value: "", label: "ts036" },
    { value: "1", label: "ts038" },
    { value: "2", label: "ts039" },
    { value: "3", label: "ts040" },
    { value: "4", label: "ts041" },
]

export const withdrawStatuses = [
    { value: 1, label: "ts038" },
    { value: 2, label: "ts039" },
    { value: 3, label: "ts040" },
    { value: 4, label: "ts041" },
]

export const suggestType = [
    { value: "1", label: "ts559" },
    { value: "2", label: "ts560" },
]

export const suggestStatus = [
    { value: "", label: "ts036" },
    { value: "1", label: "ts557" },
    { value: "2", label: "ts558" },
]

export const stats = [
    { id: 0, value: " ", label: "ts036", },
    { id: 1, value: "1", label: "ts741", },
    { id: 2, value: "2", label: "ts742", },
    { id: 3, value: "3", label: "ts743", },
    { id: 4, value: "4", label: "ts744", },
    { id: 5, value: "5", label: "ts745", },
    { id: 6, value: "6", label: "ts746", },
    { id: 7, value: "7", label: "ts747", },
    { id: 10, value: "10", label: "ts748" },
    { id: 11, value: "11", label: "ts749" },
    { id: 12, value: "12", label: "ts750", },
    { id: 13, value: "13", label: "ts751", },
    { id: 14, value: "14", label: "ts752", },
    { id: 15, value: "15", label: "ts753", },
    { id: 16, value: "16", label: "ts754", },
    { id: 17, value: "17", label: "ts755", },
    { id: 18, value: "18", label: "ts756", },
    { id: 19, value: "19", label: "ts757", },
    { id: 20, value: "20", label: "ts758", },
    { id: 21, value: "21", label: "ts759", },
    { id: 22, value: "22", label: "ts760", },
    { id: 23, value: "23", label: "ts761", },
    { id: 24, value: "24", label: "ts762", },
    { id: 25, value: "28", label: "ts859", },
]
export const pointStatus = [
    { id: 1, value: "0", label: "ts055" },
    { id: 2, value: "3", label: "ts440" },
    { id: 3, value: "4", label: "ts437" },
    { id: 4, value: "5", label: "ts441" },
    { id: 5, value: "2", label: "ts442" },
    { id: 6, value: "1", label: "ts443" },
    { id: 7, value: "6", label: "ts444" },
    { id: 8, value: "8", label: "ts445" },
    { id: 9, value: "12", label: "ts438" },
    { id: 10, value: "7", label: "ts446" },
]

export const transferStatus = [
    { value: "", label: "ts036" },
    { value: "1", label: "ts040" },
    { value: "2", label: "ts417" },
    { value: "3", label: "ts488" },

]
export const missionTitle = [
    { value: "1", label: "ts833" },
    { value: "2", label: "ts834" },
    { value: "3", label: "ts835" },
    { value: "4", label: "ts836" },
    { value: "5", label: "ts837" },
    { value: "6", label: "ts838" },
    { value: "7", label: "ts839" },

]
export const missTittle2=[
    { value: "1", label: "ts840" },
    { value: "2", label: "ts841" },
]
export const transferType = [
    { value: "", label: "Select All" },
    { value: "1", label: "Transfer to the system from a third party" },
    { value: "2", label: "Transfer to third party" },
]

export const platforms = [
    {
        "name": "AG ranhura",
        "label": "XIN",
        "value": 1
    },
    {
        "name": "BBIN",
        "label": "BBIN",
        "value": 2
    },
    {
        "name": "MG",
        "label": "MG",
        "value": 3
    },
    {
        "name": "BG",
        "label": "BG",
        "value": 20
    },
    {
        "name": "CQ9",
        "label": "CQ9",
        "value": 24
    },
    {
        "name": "PT",
        "label": "PT",
        "value": 6
    },
    {
        "name": "PG",
        "label": "PG",
        "value": 60
    },
    {
        "name": "EVO",
        "label": "EVO",
        "value": 70
    },
    {
        "name": "PP",
        "label": "PP",
        "value": 90
    },
    {
        "name": "FG",
        "label": "FG",
        "value": 100
    },
    {
        "name": "JL",
        "label": "JL",
        "value": 110
    },
    {
        "name": "JDB",
        "label": "JDB",
        "value": 120
    },
    {
        "name": "TADA",
        "label": "TADA",
        "value": 130
    },
    {
        "name": "BS",
        "label": "BS",
        "value": 140
    },
    {
        "name": "ES",
        "label": "ES",
        "value": 160
    },
    {
        "name": "VDD",
        "label": "VDD",
        "value": 182
    },
    {
        "name": "AVIA Esportes eletrônicos",
        "label": "AVIA",
        "value": 40
    },
    {
        "name": "BG",
        "label": "BG",
        "value": 20
    },
    {
        "name": "CQ9",
        "label": "CQ9",
        "value": 24
    },
    {
        "name": "BBIN",
        "label": "BBIN",
        "value": 2
    },
    {
        "name": "Cassino ao vivo AG",
        "label": "AGIN",
        "value": 1
    },
    {
        "name": "BBIN",
        "label": "BBIN",
        "value": 2
    },
    {
        "name": "MG",
        "label": "MG",
        "value": 3
    },
    {
        "name": "BG",
        "label": "BG",
        "value": 20
    },
    {
        "name": "DG",
        "label": "DG",
        "value": 21
    },
    {
        "name": "EVOLUTION",
        "label": "EVOLUTION",
        "value": 80
    },
    {
        "name": "PP",
        "label": "PP",
        "value": 90
    },
    {
        "name": "AWC",
        "label": "AWC",
        "value": 170
    },
    {
        "name": "YG Lottery",
        "label": "YG",
        "value": 71
    },
    {
        "name": "IYG Lottery",
        "label": "IYG",
        "value": 181
    },

    {
        "name": "AG Esportes",
        "label": "SBTA",
        "value": 1
    },
    {
        "name": "Sabah Esportes",
        "label": "TYSB",
        "value": 38
    },
    {
        "name": "PP",
        "label": "PP",
        "value": 90
    },
    {
        "name": "FB",
        "label": "FB",
        "value": 150
    }
]

export const commissionStatus = [
    { label: "Gaming lobby", value: "1" },
    { label: "Top games", value: "2" },
    { label: "Slots", value: "3" },
    { label: "Casino", value: "4" },
    { label: "Physical Education", value: "5" },
    { label: "Fishing", value: "6" },
    { label: "Recommend", value: "7" },
]

export const gameTypelabel = [
    { label: "ts121", value: "1" },
    { label: "ts120", value: "2" },
    { label: "ts122", value: "3" },
    { label: "ts124", value: "4" },
    { label: "ts123", value: "5" },
    { label: "ts119", value: "6" },
    { label: "ts426", value: "7" },
]