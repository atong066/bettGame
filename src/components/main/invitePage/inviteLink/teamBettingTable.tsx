

import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import NoData from "../../../noData/no-data";
import { Pagination } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useGlobalTeamListPageNumber } from "../../../globalFunctions/store";
import Loader from "../../../backdropLoader/backdrop-loader";
export default function BettingTable(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        useGlobalTeamListPageNumber.setState({activePageNumber:value});
    };

    const userType = (type: any) => {
        if(type==120){
          return t("ts274", { ns: "ts" })
        }else{
          return t("ts273", { ns: "ts" })
        }
      }

    return (
        <AlertModal alertMode="alertDefault" openAlert={props.openAlert} closeAlert={props.closeAlert} alertTitle={t("ts561", { ns: "ts" })}>
            <Loader setLoader={props.isLoading}></Loader>
            <div style={{ width: "100%" }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>{t("ts034", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts254", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts767", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts768", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts769", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts770", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts771", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts772", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts773", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts774", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts775", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts776", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts777", { ns: "ts" })}</TableCell>
                            <TableCell>{t("ts778", { ns: "ts" })}</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.isLoading == false && props.teamData?.data?.data && props.teamData?.data?.data?.rows?.map((value: any, index: any) =>
                            <TableRow key={index}>
                                <TableCell>{value?.username}</TableCell>
                                <TableCell>{userType(value?.userType)}</TableCell>
                                <TableCell>{value?.liveBetAmount}</TableCell>
                                <TableCell>{value?.liveWinAmount}</TableCell>
                                <TableCell>{value?.egameBetAmount}</TableCell>
                                <TableCell>{value?.egameWinAmount}</TableCell>
                                <TableCell>{value?.sportBetAmount}</TableCell>
                                <TableCell>{value?.sportWinAmount}</TableCell>
                                <TableCell>{value?.chessBetAmount}</TableCell>
                                <TableCell>{value?.chessWinAmount}</TableCell>
                                <TableCell>{value?.esportBetAmount}</TableCell>
                                <TableCell>{value?.esportWinAmount}</TableCell>
                                <TableCell>{value?.fishingBetAmount}</TableCell>
                                <TableCell>{value?.fishingWinAmount}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {props.teamData?.data?.data.success == false || props.teamData?.data?.data?.rows == '' ? <NoData padding={"1rem 0 0 0"} /> :
                    <div className="pagination" style={{ marginTop: ".2rem" }}>
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
                                    backgroundColor: colorP.forGround,
                                    color: colorP.text2,
                                    borderColor:colorP.forGround
                                },
                                ".MuiButtonBase-root.Mui-selected:hover": {
                                    backgroundColor: colorP.forGround
                                },
                            }}
                            count={props.teamData?.data?.data ? Math.ceil(props.teamData?.data?.data.total / props.teamData?.data?.data.pageSize) : 0} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
                    </div>
                }
            </div>
        </AlertModal>
    )
}