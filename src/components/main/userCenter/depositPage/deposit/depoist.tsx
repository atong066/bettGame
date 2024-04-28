import { Box, Tab, Tabs, Typography } from "@mui/material";
import MainLayout from "../../../../layout";
import { useState } from "react";
import './deposit.css'
import OnlineDeposit from "./onlineDeposit";
import BankCards from "./offlineDeposit";
import { HeaderWithAction } from "../../../common/header";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import DepositHisotry from "../../depositHistory/index";

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
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Deposit(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <MainLayout>
        <section className="depostSection">
          <HeaderWithAction backBtn={props.states}>{t("ts014", { ns: "ts" })}</HeaderWithAction>
          <div className="secondSection" style={{ background: colorP.backGorund }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{
                "& .MuiTabs-root button[aria-selected=true]": {
                  color: colorP.forGround + "!important",
                }, borderBottom: 2, borderColor: '#313843'
              }}>
                <Tabs value={value} onChange={handleChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: colorP.forGround,
                      color: colorP.forGround,
                      fontSize:".18rem",
                    
                    }
                  }}>
                  <Tab sx={{fontSize:".18rem",  textTransform: "capitalize"}} className="supportTabs" label={t("ts223", { ns: "ts" })} {...a11yProps(0)}

                  />
                  <Tab sx={{fontSize:".18rem"}} className="supportTabs" label={t("ts224", { ns: "ts" })} {...a11yProps(1)} />
                  <Tab  sx={{fontSize:".18rem"}} className="supportTabs" label={t("ts105", { ns: "ts" })} {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <BankCards colors={colorP} types={"3"} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <OnlineDeposit types={"1"} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <DepositHisotry types={"2"} />
              </CustomTabPanel>
            </Box>
          </div>

        </section>
      </MainLayout>
    </>
  )
}
export default Deposit;