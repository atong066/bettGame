import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { backgroundColor: "#e4b74f" } }}
        >
          <Tab className="taxaTabs" label="Slots" {...a11yProps(0)} />
          <Tab className="taxaTabs" label="Pesacria" {...a11yProps(1)} />
          <Tab className="taxaTabs" label="Esporte" {...a11yProps(2)} />
        </Tabs>
        <div className="invite-container-label" id="taxa">
          <div>ID de Membro</div>
          <div>Hora de registo</div>
          <div>Total recebido</div>
        </div>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Slots
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Pescaria
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Esporte
      </CustomTabPanel>
    </Box>
  );
}
