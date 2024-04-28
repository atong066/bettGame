import './accntDetails.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import React from 'react';
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
                    <>{children}</>
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
export function SwitchTabs(props: any) {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange}
                                    TabIndicatorProps={{
                                        style: {
                                            backgroundColor: "#f0c059"
                                        }
                                    }}>
                                        {props.children}
                                </Tabs>
                            </Box>

                        </Box>

   
        </>
    )
}

export function SwitchTabHead(props:any){
    return(
        <>
         <Tab label={props.childred} {...a11yProps(0)} />
        </>
    )
}
export function SwitchPannel(props:any){
    return(
        <>
          <CustomTabPanel value={props.value} index={4}></CustomTabPanel>
        </>
    )
}