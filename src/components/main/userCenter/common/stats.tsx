import { Select } from "@mui/material"

export function Stats(props: any) {
    const stats = [
        { id: 0, value: " ", label: "All", name: "M0026", type: '' },
        { id: 1, value: "1", label: "Live Casino", name: "M0063", type: 1 },
        { id: 2, value: "2", label: "Slot", name: "M0064", type: 2 },
        { id: 3, value: "3", label: "Sports", name: "M0065", type: 3 },
        { id: 4, value: "4", label: "Chess", name: "M0066", type: 4 },
        { id: 5, value: "5", label: "E-sports", name: "M0067", type: 5 },
        { id: 6, value: "6", label: "Fishing", name: "M0068", type: 6 },
        { id: 7, value: "7", label: "Lottery games", name: "M0069", type: 7 },
        { id: 8, value: "8", label: "Manual adding", name: "M0070", type: 10 },
        { id: 9, value: "9", label: "Manual deduction", name: "M0071", type: 11 },
        { id: 10, value: "10", label: "Registration bonus", name: "M0072", type: 12 },
        { id: 11, value: "11", label: "Bonus", name: "M0073", type: 13 },
        { id: 12, value: "12", label: "Daily plus win,weekly loss", name: "M0074", type: 14 },
        { id: 13, value: "13", label: "Rebate", name: "M0075", type: 15 },
        { id: 14, value: "14", label: "Deposit", name: "M0076", type: 16 },
        { id: 15, value: "15", label: "Promo event win", name: "M0077", type: 17 },
        { id: 16, value: "16", label: "Level up gift", name: "M0078", type: 18 },
        { id: 17, value: "17", label: "Agent rebate income", name: "M0079", type: 20 },
        { id: 18, value: "18", label: "Reward point ex-changed for cash", name: "M0080", type: 21 },
        { id: 19, value: "19", label: "Promos", name: "M0081", type: 24 },
        { id: 20, value: "20", label: "Member check-in", name: "M00082", type: 25 },
    ]

    return (
        <>
            {/* <Select placeholder={t("ts054", { ns: "ts" })} options={stats} onChange={handleSetStates} /> */}
        </>
    )
}