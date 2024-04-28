import MainLayout from "../../../layout";
import "../invite.css";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import { ButtonGroup, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import { sharePromp, sharecontent } from "./myShareData";
import DepositInformation from "./depositInformation";
import BonusInformation from "./bonusInfromation";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import { useStationConfig } from "../../../hooks/getUserInfoHook";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}



function BasicTabs() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [value, setValue] = React.useState(0);
  const [date, setDate] = useState("");
  const currency = useStationConfig()
  const handleChange = (event: SelectChangeEvent) => {
    setDate(event.target.value);
  };
  const handelChanges = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [promInfo, setPromInfo] = useState(sharePromp)
  const [contentIndfo, setContentInfo] = useState(sharecontent)
  async function getsharData() {
    const repsone = await axios.get('/userCenter/inviteOverview2.do')
    const data = repsone.data
    setContentInfo({
      ...contentIndfo,
      todayInviteRebate: data.content.todayInviteRebate,
      todayDepositNum: data.content.todayDepositNum,
      todayDepositBackBonus: data.content.todayDepositBackBonus,
      todayInvitePerson: data.content.todayInvitePerson,
    })
    setPromInfo({
      ...promInfo,
      linkUrl: data.content.prompInfo.linkUrl,
      code: data.content.prompInfo.code
    })
  }
  useEffect(() => {
    getsharData()
  }, [])

  function copyText(text: any) {
    navigator.clipboard.writeText(text)
    ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
  }
  return (
    <Box sx={{
      width: "100%", backgroundColor: colorP.backGorund, " .MuiTypography-root": {
        padding: 0
      }
    }}>
      <Box sx={{
        borderBottom: 1, borderColor: colorP.fourth
      }}>
        <Tabs
          value={value}
          onChange={handelChanges}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { backgroundColor: colorP.forGround } }}
        >
          <Tab style={{ color: "#68707b" }} label={t("ts352", { ns: ["ts"] })} {...a11yProps(0)} />
          <Tab style={{ color: "#68707b" }} label={t("ts353", { ns: ["ts"] })} {...a11yProps(1)} />
          <Tab style={{ color: "#68707b" }} label={t("ts354", { ns: ["ts"] })} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="invite-overview">
          <div className="over">
            <div style={{ border: "2px solid" + colorP.fourth, borderRadius: ".1rem", background: "transparent", color: "#ADB6C3" }}>{t("ts388", { ns: ["ts"] })}&nbsp;<span style={{ color: "#ffaa09" }}>{contentIndfo?.todayInvitePerson ? contentIndfo?.todayInvitePerson : "0"}</span></div>
            <div style={{ border: "2px solid" + colorP.fourth, borderRadius: ".1rem", background: "transparent", color: "#ADB6C3" }}>{t("ts389", { ns: ["ts"] })}&nbsp;<span style={{ color: "#EA4E3D" }}>{currency?.data?.data?.moneyUnit}{contentIndfo?.todayInviteRebate ? contentIndfo?.todayInviteRebate : "0"}</span></div>
            <div style={{ border: "2px solid" + colorP.fourth, borderRadius: ".1rem", background: "transparent", color: "#ADB6C3" }}>{t("ts390", { ns: ["ts"] })}&nbsp;<span style={{ color: "#EA4E3D" }}>{currency?.data?.data?.moneyUnit}{contentIndfo?.todayDepositBackBonus ? contentIndfo?.todayDepositBackBonus : "0"}</span></div>
            <div style={{ border: "2px solid" + colorP.fourth, borderRadius: ".1rem", background: "transparent", color: "#ADB6C3" }}>{t("ts391", { ns: ["ts"] })}&nbsp;<span style={{ color: "#ffaa09" }}>{contentIndfo?.todayDepositNum ? contentIndfo?.todayDepositNum : "0"}</span></div>
          </div>
          <div className="invite-link">
            <div><span style={{ color: "#ADB6C3" }}>{t("ts392", { ns: ["ts"] })}</span> <span style={{ color: colorP.forGround }}>{promInfo?.linkUrl ? promInfo?.linkUrl : "-"}</span> </div>
            <Button onClick={() => copyText(promInfo?.linkUrl ? promInfo?.linkUrl : "-")} style={{ 
              background: colorP.forGround,
              color: colorP.text2,
              fontWeight: 100,
              borderRadius: ".1rem"
             }} variant="contained">{t("ts396", { ns: "ts" })}</Button>
            <div><span style={{ color: "#ADB6C3" }}>{t("ts393", { ns: ["ts"] })} </span> <span style={{ color: colorP.forGround }}>{promInfo?.code ? promInfo?.code : "-"}</span></div>
            <Button onClick={() => copyText(promInfo?.code ? promInfo?.code : "-")} style={{ 
              background: colorP.forGround,
              color: colorP.text2,
              fontWeight: 100,
              borderRadius: ".1rem"
             }} variant="contained">{t("ts396", { ns: "ts" })}</Button>
          </div>
          <div className="remarks" style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ADB6C3" }}>{t("ts394", { ns: ["ts"] })}</span>
            <span style={{ color: "#ADB6C3" }}>{t("ts395", { ns: ["ts"] })}</span>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DepositInformation></DepositInformation>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BonusInformation></BonusInformation>
      </CustomTabPanel>
    </Box>
  );
}

function MyShare(props: any) {
  return (

    <>
      <div className="main-invite-container">
        <div className="invite-body">
          <div className="invite-tabs">
            <BasicTabs />
          </div>
        </div>
      </div>
    </>

  );
}

export default MyShare;
