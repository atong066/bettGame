import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";

export default function Privilage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    return (
        <>
            <div className="vipLevelTableContainer">
                <div className="vipLevelTable">
                    <Table sx={{ minWidth: 650, "& td,th": { border: 0 } }} size="small" aria-label="customized table">
                        <TableHeader className="vipTableHead">
                            <TableRow>
                                <TableCell align="center" className="tableHeader">{t("ts344", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="tableHeader">{t("ts345", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="tableHeader">{t("ts346", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="tableHeader">{t("ts347", { ns: "ts" })}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel0.png")` }}>
                                                <span className="vipLevel">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel1.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel1.png")` }}>
                                                <span className="vipLevel">1</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel1.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel2.png")` }}>
                                                <span className="vipLevel">2</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel1.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel3.png")` }}>
                                                <span className="vipLevel">3</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel1.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel4.png")` }}>
                                                <span className="vipLevel">4</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel1.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel5.png")` }}>
                                                <span className="vipLevel">5</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel2.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel6.png")` }}>
                                                <span className="vipLevel">6</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel2.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel7.png")` }}>
                                                <span className="vipLevel">7</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel2.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel8.png")` }}>
                                                <span className="vipLevel">8</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel2.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel9.png")` }}>
                                                <span className="vipLevel">9</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel2.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel10.png")` }}>
                                                <span className="vipLevel">10</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel3.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel11.png")` }}>
                                                <span className="vipLevel">11</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">{t("ts350", { ns: "ts" })}</TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel3.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel12.png")` }}>
                                                <span className="vipLevel">12</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">10.000,00</span></TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">2</span></TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel3.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel13.png")` }}>
                                                <span className="vipLevel">13</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">500,00</span></TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">1</span></TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel4.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel14.png")` }}>
                                                <span className="vipLevel">14</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">1.000,00</span></TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">1</span></TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >
                                    <div className="medalRowContainer">
                                        <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel4.png")` }}>
                                            <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel15.png")` }}>
                                                <span className="vipLevel">15</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">5.000,00</span></TableCell>
                                <TableCell align="center" className="vipTableData coloredData"><span className="coloredData">1</span></TableCell>
                                <TableCell align="center" className="vipTableData">0</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        </>
    )
}