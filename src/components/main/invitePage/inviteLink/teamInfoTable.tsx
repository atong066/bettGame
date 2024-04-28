
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../userCenter/common/table";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import { Pagination } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useGlobalTeamListPageNumber } from "../../../globalFunctions/store";
import NoData from "../../../noData/no-data";
import Loader from "../../../backdropLoader/backdrop-loader";

export default function TeamInfoTable(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    useGlobalTeamListPageNumber.setState({ activePageNumber: value });
  };

  const userType = (type: any) => {
    if (type == 120) {
      return t("ts274", { ns: "ts" })
    } else {
      return t("ts273", { ns: "ts" })
    }
  }

  const onlineStatus = (type: any) => {
    if (type == 2) {
      return t("ts383", { ns: "ts" })
    } else {
      return t("ts384", { ns: "ts" })
    }
  }

  const status = (type: any) => {
    if (type == 2) {
      return t("ts385", { ns: "ts" })
    } else {
      return t("ts386", { ns: "ts" })
    }
  }

  return (
    <AlertModal alertMode="alertDefault" openAlert={props.openAlert} closeAlert={props.closeAlert} alertTitle={t("ts561", { ns: "ts" })}>
      <Loader setLoader={props.isLoading}></Loader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>{t("ts034", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts373", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts344", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts374", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts377", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts375", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts378", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts868", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts092", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts376", { ns: "ts" })}</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.isLoading == false && props.teamData?.data?.data && props.teamData?.data?.data?.rows?.map((value: any, index: any) =>
            <TableRow key={index}>
              <TableCell>{value?.username}</TableCell>
              <TableCell>{value?.degreeName}</TableCell>
              <TableCell>{value?.level}</TableCell>
              <TableCell>{userType(value?.type)}</TableCell>
              <TableCell>{onlineStatus(value?.onlineStatus)}</TableCell>
              <TableCell>{value?.createDatetime}</TableCell>
              <TableCell>{value?.money}</TableCell>
              <TableCell>{value?.unLoginDays}</TableCell>
              <TableCell>{status(value?.status)}</TableCell>
              <TableCell>{value?.lastLoginDatetime ? value?.lastLoginDatetime : "-"}</TableCell>
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
    </AlertModal>
  )
}