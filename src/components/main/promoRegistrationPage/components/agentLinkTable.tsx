import { t } from "i18next";
import { Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useEffect } from "react";
import { useGenerateLink, useGetPromoInfo } from "../../../hooks/getUserInfoHook";

function LinkTable(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const getGenerateLinks = props.getGenerateLinks
    const userConifg = props.userConifg
    const pageType = props.pageType
    const userType = props.userType
    const promoteCodeType = props.promoteCodeType
    const useDeleteLinks = props.useDeleteLinks

    const useGetPromoInfos = useGetPromoInfo(userConifg.username)
    const useGenerateLinks = useGenerateLink()

    useEffect(() => {
        useGetPromoInfos.refetch()
    }, [])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts263", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts264", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts265", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts266", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts359", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts267", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts268", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts269", { ns: ["ts"] })}</span></TableCell>
                    <TableCell><span style={{ color: colorP.text4 }}>{t("ts270", { ns: ["ts"] })}</span></TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {getGenerateLinks.isLoading == false && getGenerateLinks?.data?.data && getGenerateLinks?.data?.data?.rows?.map((value: any, index: any) =>
                    <TableRow key={index}>
                        <TableCell>
                            <div className="linkBox">
                                <div className="promoLink" style={{ color: colorP.forGround }}>{value.linkUrl}</div>
                                <div className="promoLink" style={{ color: colorP.forGround }}>{value.linkUrlEn}</div>
                            </div>
                        </TableCell>
                        <TableCell>{pageType(value.accessPage)}</TableCell>
                        <TableCell><div className="promoCodeBox">{promoteCodeType(value.mode)}</div></TableCell>
                        <TableCell>{value.accessNum}</TableCell>
                        <TableCell>{value.registerNum}</TableCell>
                        <TableCell>{userType(value.type)}</TableCell>
                        <TableCell>
                            <div className="rebateBox">
                                {userConifg?.game?.lottery === 2 && <div className="labelBox"><span className="label" style={{ color: colorP.text4 }}>{t("ts362", { ns: ["ts"] })} <span className="labelContent" style={{ color: colorP.forGround }}>{value.lottery}‰</span></span></div>}
                                {userConifg?.game?.egame === 2 && <div className="labelBox"><span className="label" style={{ color: colorP.text4 }}>{t("ts363", { ns: ["ts"] })} <span className="labelContent" style={{ color: colorP.forGround }}>{value.egame}‰</span></span></div>}
                                {userConifg?.game?.sport === 2 && <div className="labelBox"><span className="label" style={{ color: colorP.text4 }}>{t("ts364", { ns: ["ts"] })} <span className="labelContent" style={{ color: colorP.forGround }}>{value.sport}‰</span></span></div>}
                                {userConifg?.game?.chess === 2 && <div className="labelBox"><span className="label" style={{ color: colorP.text4 }}>{t("ts365", { ns: ["ts"] })} <span className="labelContent" style={{ color: colorP.forGround }}>{value.chess}‰</span></span></div>}
                                {userConifg?.game?.live === 2 && <div className="labelBox"><span className="label" style={{ color: colorP.text4 }}>{t("ts366", { ns: ["ts"] })} <span className="labelContent" style={{ color: colorP.forGround }}>{value.live}‰</span></span></div>}
                                {userConifg?.game?.esport === 2 && <div className="labelBox"><span className="label" style={{ color: colorP.text4 }}>{t("ts367", { ns: ["ts"] })} <span className="labelContent" style={{ color: colorP.forGround }}>{value.esport}‰</span></span></div>}
                                {userConifg?.game?.fishing === 2 && <div className="labelBox"><span className="label" style={{ color: colorP.text4 }}>{t("ts368", { ns: ["ts"] })} <span className="labelContent" style={{ color: colorP.forGround }}>{value.fishing}‰</span></span></div>}
                            </div>
                        </TableCell>
                        <TableCell>{value.createTime}</TableCell>
                        <TableCell><Button style={{ backgroundColor: colorP.forGround, color: colorP.text2 }} variant="contained" onClick={() => useDeleteLinks.mutate(value.id)} className="deleteButton">{t("ts272", { ns: ["ts"] })}</Button></TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
export default LinkTable;