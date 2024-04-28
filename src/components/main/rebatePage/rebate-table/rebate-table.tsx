
import { Button, Pagination, Stack } from "@mui/material";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useEffect, useState } from "react";
import { useGetRebateData } from "../../../hooks/getUserInfoHook";
import NoData from "../../../noData/no-data";
import Loader from "../../../backdropLoader/backdrop-loader";
import axios from "axios";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import { useRebateType, useSetRebatePage } from "../../../globalFunctions/store";

export default function RebateTable(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [openNotif, setOpenNotif] = useState(false);

    const [currentPage, setCurrentPage] = useState(1)

    const [detailsContent, setDetails] = useState("")
    const rebateData = useGetRebateData()
    const rebate = rebateData?.data?.data
    const pageCount = Math.ceil(rebateData?.data?.data?.total / 10)

    const buttonState = useRebateType(state => state.type)
    const page = useSetRebatePage(state => state.page)

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        useSetRebatePage.setState({ page: value })

    };

    const payload = {
        type: buttonState,
        pageNumber: page,
        pageSize: 10
    }

    useEffect(() => {
        rebateData.mutate(payload)
    }, [buttonState, currentPage, page])

    const getType = (type: any) => {
        if (type == 1) {
            return t("ts121", { ns: "ts" })
        } else if (type == 2) {
            return t("ts798", { ns: "ts" })
        } else if (type == 3) {
            return t("ts122", { ns: "ts" })
        } else if (type == 4) {
            return t("ts124", { ns: "ts" })
        } else if (type == 5) {
            return t("ts123", { ns: "ts" })
        } else if (type == 6) {
            return t("ts422", { ns: "ts" })
        } else if (type == 7) {
            return t("ts426", { ns: "ts" })
        }
    }

    const handleDetails = (details: any) => {
        setDetails(details)
        setOpenNotif(true);
    }

    const handleClose = () => {
        setOpenNotif(false);
    };

    return (
        <div className="tableContainer">
            <Loader setLoader={rebateData.isLoading}></Loader>
            <AlertModal alertMode="alertDefault" alertTitle={t("ts561", { ns: "ts" })} openAlert={openNotif} closeAlert={handleClose} >
                <div className='alertContainer' style={{ textAlign: "left", textIndent: "30px", color: color.text4 + " !important", width: "6rem" }} dangerouslySetInnerHTML={{ __html: detailsContent ? detailsContent : "-" }}></div>
            </AlertModal>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell><span style={{ color: color.text4 }}>{t("ts576", { ns: "ts" })}</span></TableCell>
                        <TableCell>
                            <div className="cellContainer">
                                <label className="cellContent" style={{ color: color.text4 }}>{t("ts096", { ns: "ts" })}</label>
                                <label className="cellContent" style={{ color: color.text4 }}>{t("ts713", { ns: "ts" })}</label>
                            </div>
                        </TableCell>
                        <TableCell><span style={{ color: color.text4 }}>{t("ts714", { ns: "ts" })}</span></TableCell>
                        <TableCell><span style={{ color: color.text4 }}>{t("ts715", { ns: "ts" })}</span></TableCell>
                        <TableCell><span style={{ color: color.text4 }}>{t("ts716", { ns: "ts" })}</span></TableCell>
                        <TableCell><span style={{ color: color.text4 }}>{t("ts561", { ns: "ts" })}</span></TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rebateData.isLoading == false && rebate && rebate?.rows?.map((value: any, index: any) =>
                        <TableRow key={index}>
                            <TableCell>{getType(value.type)}</TableCell>
                            <TableCell>
                                <div className="tdCellContainer">
                                    <div className="cellContainer">
                                        <div className="labelBox"><label className="cellContent">{value.minBet}</label></div>
                                        <div className="labelBox"><label className="cellContent">{value.kickback}%</label></div>
                                    </div>
                                    <div className="labelContainer" style={value.remark ? { padding: "1px", backgroundColor: "#68707b" } : { padding: "1px", backgroundColor: "#68707b" }}>
                                        <div className="labelContent" style={{ color: "#fff" }}>
                                            {/* {value.remark ? value.remark : "..."} */}
                                            {t("ts498", { ns: "ts" }) + " " + value.minBet + " " + t("ts901", { ns: "ts" }) + " " + value.kickback + "%"}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{value.minBet * (value.kickback) / 100}</TableCell>
                            <TableCell>{value.maxBack ? value.maxBack : "-"}</TableCell>
                            <TableCell>{value.rebate ? value.rebate : "-"}</TableCell>
                            <TableCell><Button style={{ borderColor: color.forGround, fontSize: 12, lineHeight: "normal", color: color.text4 }} onClick={() => handleDetails(value.remark)} size="small">{t("ts556", { ns: "ts" })}</Button></TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
            {rebateData.isLoading == false && rebate?.total == 0 ? <NoData padding={"1rem 0 0 0"} /> :
                <div className="pagination paginationRebateContainer" style={{ paddingTop: ".2rem" }}>
                    {rebateData.isLoading == false && <Pagination
                        variant="outlined" shape="rounded" sx={{
                            ".MuiButtonBase-root": {
                                height: ".4rem",
                                width: ".4rem",
                                color: color.text4 + "!important",
                                borderRadius: ".06rem",
                                border: "",
                                borderColor: "#313843",
                                fontSize: ".18rem",
                                " .MuiSvgIcon-root": {
                                    color: color.text4 + "!important",
                                }
                            },
                            ".MuiButtonBase-root.Mui-selected": {
                                backgroundColor: color.forGround,
                                color: color.text2 + "!important",
                                borderColor: color.forGround
                            },
                            ".MuiButtonBase-root.Mui-selected:hover": {
                                backgroundColor: color.forGround
                            },
                        }} count={pageCount ? pageCount : 0} page={page} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />}
                </div>
            }
        </div>
    )
}