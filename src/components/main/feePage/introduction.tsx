import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useCenterBill, useStationConfig } from "../../hooks/getUserInfoHook";
import { useEffect } from "react";

export default function Introduction() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()

    const getCenterBill = useCenterBill()
    const scale = getCenterBill?.data?.data?.moneyIncomeStrategy

    // console.log(getCenterBill)

    useEffect(()=>{
        getCenterBill.refetch()
    }, [])

    const getStationConfig = useStationConfig()
    const unit = getStationConfig?.data?.data?.moneyUnit
    return (
        <>
            <div className="regrasContainer" style={{ borderColor: colorP.third }}>
                <div className="balanceBonusBox">
                    <label className="balanceTitle">{t("ts526", { ns: "ts" })}</label>
                    <div className="balanceBox" style={{ borderColor: colorP.third }}>
                        <div className="titleBox"><label className="title">{t("ts527", { ns: "ts" })}</label></div>
                        <div className="imageBox">
                            <img src="/feesImages/coins.png" className="balanceImage" />
                        </div>
                    </div>
                </div>
                <div className="balanceInstructions">
                    <label className="balanceTitle">{t("ts528", { ns: "ts" })}</label>
                    <div className="boxContainer">
                        <div className="balanceBox1" style={{ borderColor: colorP.third }}>
                            <div className="titleBox"><label className="title">{t("ts529", { ns: "ts" })}</label></div>
                            <div className="imageBox">
                                <img src="/feesImages/card-coin.png" className="balanceImage" />
                            </div>
                        </div>
                        <div className="balanceBox2" style={{ borderColor: colorP.third }}>
                            <div className="titleBox"><label className="title">{t("ts530", { ns: "ts" })}</label></div>
                            <div className="imageBox">
                                <img src="/feesImages/card-wallet.png" className="balanceImage" />
                            </div>
                        </div>
                        <div className="balanceBox3" style={{ borderColor: colorP.third }}>
                            <div className="titleBox"><label className="title">{t("ts531", { ns: "ts" })}</label></div>
                            <div className="imageBox">
                                <img src="/feesImages/find-interest.png" className="balanceImage" />
                            </div>
                        </div>
                    </div>
                    <label className="balanceTitle balanceTitleWithTable">{t("ts544", { ns: "ts" })}</label>
                    <div className="tableContainer">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell><span style={{ color: "#ADB6C3" }}>{t("ts532", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: "#ADB6C3" }}>{t("ts533", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: "#ADB6C3" }}>{t("ts534", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: "#ADB6C3" }}>{t("ts535", { ns: "ts" })}</span></TableCell>
                                    <TableCell><span style={{ color: "#ADB6C3" }}>{t("ts536", { ns: "ts" })}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{t("ts537", { ns: "ts" })}</TableCell>
                                    <TableCell>20000</TableCell>
                                    <TableCell>≥(20000*1)</TableCell>
                                    <TableCell>{scale?.moreMinScale}‱~{scale?.moreMaxScale}‱</TableCell>
                                    <TableCell>20000*{scale?.moreMaxScale}‱ = {(20000*scale?.moreMaxScale)/100} {unit} ({t("ts539", { ns: "ts" })} is {scale?.moreMaxScale}‱)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t("ts538", { ns: "ts" })}</TableCell>
                                    <TableCell>20000</TableCell>
                                    <TableCell>&lt;(20000*1)</TableCell>
                                    <TableCell>{scale?.lessMinScale}‱~{scale?.lessMaxScale}‱</TableCell>
                                    <TableCell>20000*{scale?.lessMaxScale}‱ = {(20000*scale?.lessMaxScale)/100} {unit} ({t("ts539", { ns: "ts" })} is {scale?.lessMaxScale}‱)</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="middleBoxConrtainer" style={{ borderColor: colorP.third }}>
                        <div className="firstBox">
                            <span className="firstP">
                                1. {t("ts545", { ns: "ts" })} {scale?.moreMinScale}‱~{scale?.moreMaxScale}‱ {t("ts00545", { ns: "ts" })} 20000*{scale?.moreMaxScale}‱ = {(20000*scale?.moreMaxScale)/100} {unit} {t("ts0545", { ns: "ts" })} {scale?.moreMaxScale}‱);
                            </span>
                        </div>
                        <div className="firstBox">
                            <span className="firstP">
                                2. {t("ts546", { ns: "ts" })} {scale?.lessMinScale}‱~{scale?.lessMaxScale}‱ {t("ts00546", { ns: "ts" })} 20000*{scale?.lessMaxScale}‱ = {(20000*scale?.lessMaxScale)/100} {unit} {t("ts0546", { ns: "ts" })} {scale?.lessMaxScale}‱);
                            </span>
                        </div>
                        <div className="firstBox">
                            <span className="firstP">
                                * {t("ts547", { ns: "ts" })}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="balanceCompliance">
                    <label className="balanceTitle">{t("ts540", { ns: "ts" })}</label>
                    <div className="boxContainer">
                        <div className="balanceBox1" style={{ borderColor: colorP.third }}>
                            <div className="titleBox"><label className="title">{t("ts541", { ns: "ts" })}</label></div>
                            <div className="spanBox">
                                <span className="spanNumber" style={{ color: colorP.forGround }}>1</span>
                            </div>
                        </div>
                        <div className="balanceBox2" style={{ borderColor: colorP.third }}>
                            <div className="titleBox"><label className="title">{t("ts542", { ns: "ts" })}</label></div>
                            <div className="spanBox">
                                <span className="spanNumber" style={{ color: colorP.forGround }}>2</span>
                            </div>
                        </div>
                        <div className="balanceBox3" style={{ borderColor: colorP.third }}>
                            <div className="titleBox"><label className="title">{t("ts543", { ns: "ts" })}</label></div>
                            <div className="spanBox">
                                <span className="spanNumber" style={{ color: colorP.forGround }}>3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}