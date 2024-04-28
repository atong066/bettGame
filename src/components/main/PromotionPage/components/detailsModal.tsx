import { Button, Pagination, Stack, TextField } from "@mui/material"
import AlertModal from "../../common/modal/alert-modal/alert-modal"
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import NoData from "../../../noData/no-data";
import { useGlobalVariables } from "../../../globalFunctions/store";
import { useRef } from "react";
import { gameTypelabel } from "../../userCenter/common/selectOtions";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SearchInput } from "../../common/components/inputComponent";

function DetailsModal(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const getDetail = props.getDetail
    const userId = useRef<any>(null)
    const alertModal = props.alertModal
    const closeModal = props.closeModal
    const modDate = props.modDate
    const modType = props.gameTye
    const searchDetail = props.searchDetail
    const gameDetail = useGlobalVariables(state => state.performanceDetails)
    const handleChangePage = props.handleChangePage
    const handleIdchange = (e: any) => {
        console.log(e.target.value)
        userId.current = e.target.value
    }
    function searchtable() {
        console.log(userId)
        const DetailPayload = {
            statDate: modDate,
            gameType: modType,
            id: userId.current.value,
        }
        getDetail.mutate(DetailPayload)
    }
    function getGameType(type: any) {
        const gType = gameTypelabel.filter((item: any) => item.value == type)
        return t(gType[0]?.label, { ns: "ts" })
    }

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    return (
        <AlertModal alertMode="alertDefault" openAlert={alertModal} closeAlert={closeModal} alertTitle={t("ts561", { ns: "ts" })}>
            <div>
                <Stack direction={"column"} spacing={2}>
                    <div className="mainLabelBox">
                        <Stack direction={"row"} spacing={2}>
                            <div className="modLabels">
                                <div className="moLaabel">{t("ts073", { ns: "ts" })}: <span>{modDate}</span></div>
                                <div className="moLaabel">{t("ts925", { ns: "ts" })}: <span>{getGameType(modType)}</span></div>
                            </div>
                            <SearchInput type="number" onClick={searchtable} inputRef={userId} placeHolder={t("ts893", { ns: ["ts"] })}></SearchInput>
                        </Stack>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>{t("ts921", { ns: "ts" })}</TableCell>
                                <TableCell>{t("ts922", { ns: "ts" })}</TableCell>
                                <TableCell>{t("ts923", { ns: "ts" })}</TableCell>
                                <TableCell>{t("ts924", { ns: "ts" })}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gameDetail?.rows?.map((value: any, index: any) =>
                                <TableRow key={index}>
                                    <TableCell><div className="copyIDV3">{value.oriPromotionCode ? value.oriPromotionCode : "-"} {value.oriPromotionCode && <img width={22} src="/navbarImages/copy.png" onClick={() => copyText(value.oriPromotionCode)} className="copyIcon"></img>}</div></TableCell>
                                    <TableCell><div className="copyIDV3">{value.oriProxyPromotionCode ? value.oriProxyPromotionCode : "-"} {value.oriProxyPromotionCode && <img width={22} src="/navbarImages/copy.png" onClick={() => copyText(value.oriProxyPromotionCode)} className="copyIcon"></img>}</div></TableCell>
                                    <TableCell>{value.oriBetNum}</TableCell>
                                    <TableCell>{value.money}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {gameDetail?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
                        <div className="pagination" style={{ paddingTop: ".2rem" }}>
                            <Pagination
                                variant="outlined" shape="rounded" sx={{
                                    ".MuiButtonBase-root": {
                                        height: ".4rem",
                                        width: ".4rem",
                                        color: "nude",
                                        borderRadius: ".06rem",
                                        border: "",
                                        borderColor: "#313843",
                                        fontSize: ".18rem"
                                    },
                                    ".MuiButtonBase-root.Mui-selected": {
                                        backgroundColor: color.forGround,
                                        color: color.text2,
                                        borderColor: color.forGround
                                    },
                                    ".MuiButtonBase-root.Mui-selected:hover": {
                                        backgroundColor: color.forGround
                                    },
                                }} count={Math.ceil(gameDetail?.total / 10)} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                        </div>
                    }
                    <div className="extraContainer">
                        <div className="extraTab" style={{ borderColor: color.forGround, backgroundColor: color.third }}>
                            <div className="title" style={{ borderColor: "#313843", borderBottom: "none" }}>
                                <div className="titleWithIcon"><span>{t("ts902", { ns: "ts" })}</span></div>
                                {/* <div  onClick={()=>changeTabt(3)} style={{ color: color.forGround }} className="titleWithIcon"><span className="more">{t("ts647", { ns: "ts" })} <ArrowForwardIosIcon className="arrowIconRight" /></span></div> */}
                            </div>
                            <div className="contents">
                                <div className="top" style={{ borderColor: "#313843" }}>
                                    <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                        <span className="red" style={{ color: "#68707B !important" }}>{t("ts956", { ns: "ts" })}</span>
                                        <span style={{ color: "#ffaa09" }}>{gameDetail?.aggsData?.directSubBetNum ? gameDetail?.aggsData?.directSubBetNum : "0"}</span>
                                    </div>
                                    <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                        <span className="red" style={{ color: "#68707B !important" }}>{t("ts959", { ns: "ts" })}</span>
                                        <span style={{ color: "#ffaa09" }}>{gameDetail?.aggsData?.otherSubBetNun ? gameDetail?.aggsData?.otherSubBetNun : "0"}</span>
                                    </div>
                                    <div>
                                        <span className="red" style={{ color: "#68707B !important" }}>{t("ts828", { ns: "ts" })}</span>
                                        <span style={{ color: "#ffaa09" }}>{gameDetail?.aggsData?.totalBetNum ? gameDetail?.aggsData?.totalBetNum : "0"}</span>
                                    </div>
                                </div>
                                <div className="top" style={{ borderColor: "#313843" }}>
                                    <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                        <span className="red" style={{ color: "#68707B !important" }}>{t("ts957", { ns: "ts" })}</span>
                                        <span style={{ color: "#ffaa09" }}>{gameDetail?.aggsData?.directSubMoney ? gameDetail?.aggsData?.directSubMoney : "0"}</span>
                                    </div>
                                    <div style={{ borderRight: "1px solid", borderColor: "#313843" }}>
                                        <span className="red" style={{ color: "#68707B !important" }}>{t("ts960", { ns: "ts" })}</span>
                                        <span style={{ color: "#ffaa09" }}>{gameDetail?.aggsData?.otherSubMoney ? gameDetail?.aggsData?.otherSubMoney : "0"}</span>
                                    </div>
                                    <div>
                                        <span className="red" style={{ color: "#68707B !important" }}>{t("ts815", { ns: "ts" })}</span>
                                        <span style={{ color: "#ffaa09" }}>{gameDetail?.aggsData?.totalMoney ? gameDetail?.aggsData?.totalMoney : "0"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Stack>
            </div>
        </AlertModal>
    )
}
export default DetailsModal