import { Button, Pagination, Stack } from "@mui/material";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import NoData from "../../../noData/no-data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";

export default function Fishing() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    return (
        <>
            <div className="fishingMainContainer">
                <div className="topBox">
                    <div className="labelBox">
                        <label className="labelTitle" style={{ color: color.text }}>{t("ts494", { ns: "ts" })}:</label>
                        <label className="labelContent" style={{ color: color.forGround }}>0,00</label>
                    </div>
                    <div className="buttonBox">
                        <Stack direction={"row"} spacing={2}>
                            <Button style={{ backgroundColor: color.forGround }} className="rebateButton" variant="contained">{t("ts495", { ns: "ts" })}</Button>
                            <Link to="/record-collection"><Button style={{ backgroundColor: color.forGround }} className="rebateButton" variant="contained">{t("ts496", { ns: "ts" })}</Button></Link>
                        </Stack>
                    </div>
                </div>
                <div className="tableContainer">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>{t("ts497", { ns: "ts" })}</TableCell>
                                <TableCell>
                                    <div className="cellContainer">
                                        <label className="cellContent">{t("ts498", { ns: "ts" })}</label>
                                        <label className="cellContent">{t("ts499", { ns: "ts" })}</label>
                                    </div>
                                </TableCell>
                                <TableCell>{t("ts500", { ns: "ts" })}</TableCell>
                                <TableCell>{t("ts501", { ns: "ts" })}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* <TableRow>
                                <TableCell><img src="/rebateImages/1.png" className="platformImage" /></TableCell>
                                <TableCell>
                                    <div className="tdCellContainer">
                                        <div className="cellContainer">
                                            <div className="labelBox"><label className="cellContent">0</label></div>
                                            <div className="labelBox"><label className="cellContent">0.1%</label></div>
                                        </div>
                                        <div className="labelContainer">
                                            <div className="labelContent">
                                                Bet again 100000 may 0.3%
                                            </div>
                                        </div>
                                    </div>

                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>{t("ts064", { ns: "ts" })}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><img src="/rebateImages/2.png" className="platformImage" /></TableCell>
                                <TableCell>
                                    <div className="tdCellContainer">
                                        <div className="cellContainer">
                                            <div className="labelBox"><label className="cellContent">0</label></div>
                                            <div className="labelBox"><label className="cellContent">0.1%</label></div>
                                        </div>
                                        <div className="labelContainer">
                                            <div className="labelContent">
                                                Bet again 100000 may 0.3%
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>{t("ts064", { ns: "ts" })}</TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                    <NoData padding={"1rem 0 0 0"} />
                    <div className="pagination">
                        <Pagination
                            variant="outlined" shape="rounded" sx={{
                                ".MuiButtonBase-root": {
                                    height: ".4rem",
                                    width: ".4rem",
                                    color: "nude",
                                    borderRadius:".06rem",
                                    border:"",
                                    borderColor:"#313843",
                                    fontSize:".18rem"
                                },
                                ".MuiButtonBase-root.Mui-selected": {
                                    backgroundColor: color.forGround,
                                    color: "#874404 !important",
                                    borderColor:color.forGround
                                },
                                ".MuiButtonBase-root.Mui-selected:hover": {
                                    backgroundColor: color.forGround
                                },
                            }} count={0} color="secondary" showFirstButton showLastButton />
                    </div>
                </div>
            </div >
        </>
    )
}