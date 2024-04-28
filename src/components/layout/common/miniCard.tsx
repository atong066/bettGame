import { ChangeColorPallte } from '../../globalFunctions/globalContext'
import './minicard.css'

export function MiniCards(props: any) {
    return (
        <>
            <div className="cardContainer">
                {props.children}

            </div>
        </>
    )
}

export function MiniCardHeaders(props: any) {
    return (
        <>
            <h1 className="cardHeader">{props.children}</h1>
        </>
    )
}
export function MiniCardBody(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <>
            <div className="cardBody" style={{ borderColor: colorP.fourth }}>
                {props.children}
            </div>
        </>
    )
}
export function MiniCardTableHeader(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <>
            <div className="subTitles" style={{ backgroundColor: colorP.fourth, color: colorP.text4 }}>{props.children} </div>
        </>
    )
}
export function MiniCardTableBody(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <>
            <div className="subBody" style={{ backgroundColor: colorP.backGorund, borderColor: colorP.forGround }}> {props.children}</div>
        </>
    )
}
export function MiniCardRows(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <>
            <div className="rows"> {props.children}</div>
        </>
    )
}
export function MiniCardCell(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <>
            <div className="cell" style={{ color: colorP.text4 }}> {props.children}</div>
        </>
    )
}