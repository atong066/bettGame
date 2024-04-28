import { useState } from "react"

export default function Timer() {
    const [month, setMonth] = useState<any>("00")
    const [day, setDay] = useState<any>("00")
    const [hour, setHours] = useState<any>("00")
    const [minute, setMinute] = useState<any>("00")
    const [second, setSecond] = useState<any>("00")
    var date = new Date(new Date().toLocaleString('en', {timeZone: 'America/Fortaleza'}));
    setTimeout(() => {
        setMonth(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        setDay(date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
        setHours(date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
        setMinute(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        setSecond(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    }, 1000)

    return (
        <div className="timeContainer">
            <label className="timeDate">{month + "/" + day} {hour + ":" + minute + ":" + second}</label>
            <label className="timeDateUTC">(GMT-3)</label>
        </div>
    )
}