import MainLayout from "../../layout";
import './accntDetails.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import Select, { components, IndicatorsContainerProps } from 'react-select';
// import { ColourOption, colourOptions } from '../data';
import SearchIcon from '@mui/icons-material/Search';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Selects, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
        },
    },
};

function AccountDetails() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const [value, setValue] = useState(0);
    const date = [
        { value: '1', label: 'Today' },
        { value: '2', label: 'Yesterday' },
        { value: '3', label: 'This Week' },
        { value: '4', label: 'Last Week' },
        { value: '5', label: 'This Month' },
        { value: '6', label: 'Last Month' },
    ]
    const types = [
        { value: '1', label: 'System and Money' },
        { value: '2', label: 'Online withdrawal failed' },
        { value: '3', label: 'Online payment' },
        { value: '4', label: 'Last Week' },
        { value: '5', label: 'Quick deposit' },
        { value: '6', label: 'Bank deposit' },
        { value: '7', label: 'Recharge card deposit' },
        { value: '8', label: 'Voucher' },
        { value: '9', label: 'Rebate add money' },
        { value: '10', label: 'Agent rebate add money' },
        { value: '11', label: 'Third-party balance trans to system balance' },
        { value: '12', label: 'Third-party transfer failed' },
        { value: '13', label: 'Deposit bonus' },
        { value: '14', label: 'Level up bonus' },
        { value: '15', label: 'Turntable win' },
        { value: '16', label: 'Red envelope bonus win' },
        { value: '17', label: 'User sign in bonus' },
        { value: '18', label: 'Reward point exchanged for cash' },
        { value: '19', label: 'Invite registration rebate' },
        { value: '20', label: 'Invite recharge rebate' },
        { value: '21', label: 'Register bonus' },
        { value: '22', label: 'First Withdrawal Bonus' },
        { value: '23', label: 'Player Trial Amount' },
        { value: '24', label: 'Chat room red envelope winning' },
        { value: '25', label: 'Others' },
        { value: '26', label: 'System reduce money' },
        { value: '27', label: 'Online withdrawal' },
        { value: '28', label: 'Rebate rollback' },
        { value: '29', label: 'Agent rebate to rollback' },
        { value: '30', label: 'System balance trans to third-party balance' },
        { value: '31', label: 'Cash exchanged for reward point' },
        { value: '32', label: 'Reward deduction' },
        { value: '33', label: 'Send red envelope' },
    ]
    const acctypes = [
        'System and Money',
        'Online withdrawal failed',
        'Online payment',
        'Last Week',
        'Quick deposit',
        'Bank deposit',
        'Recharge card deposit',
        'Voucher',
        'Rebate add money',
        'Agent rebate add money',
        'Third-party balance trans to system balance',
        'Third-party transfer failed',
        'Deposit bonus',
        'Level up bonus',
        'Turntable win',
        'Red envelope bonus win',
        'User sign in bonus',
        'Reward point exchanged for cash',
        'Invite registration rebate',
        'Invite recharge rebate',
        'Register bonus',
        'First Withdrawal Bonus',
        'Player Trial Amount',
        'Chat room red envelope winning',
        'Others',
        'System reduce money',
        'Online withdrawal',
        'Rebate rollback',
        'Agent rebate to rollback',
        'System balance trans to third-party balance',
        'Cash exchanged for reward point',
        'Reward deduction',
        'Send red envelope',
      ]
      
    const handleChangeTypes = (event: SelectChangeEvent<typeof personName>) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    function getStyles(acctypes: string, personName: readonly string[], theme: Theme) {
        return {
          fontWeight:
            personName.indexOf(acctypes) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <MainLayout>
                <section className="accntContainer">
                    <div className="pageheader">
                        <img className="titleWing" src="vipImages/titleWing.png" />
                        <h2>Account Details</h2>
                        
                        <img className="titleWing" src="vipImages/titleWing.png"></img>
                    </div>
                    <div className="pageContent">
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange}
                                    TabIndicatorProps={{
                                        style: {
                                            backgroundColor: "#f0c059"
                                        }
                                    }}>
                                    <Tab label="Account details" {...a11yProps(0)} />
                                    <Tab label="Betting Records" {...a11yProps(1)} />
                                    <Tab label="Personal Report" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <div className="accntActions">
                                    <Select placeholder="Select date..." options={date} />
                                    <FormControl sx={{ width: 300}}>
                                    <Selects
                                        multiple
                                        displayEmpty
                                        value={personName}
                                        onChange={handleChangeTypes}
                                        input={<OutlinedInput />}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                        <MenuItem sx={{color:"#fff"}} disabled value="">
                                            <em>Placeholder</em>
                                        </MenuItem>
                                        {acctypes.map((acctypes) => (
                                            <MenuItem
                                            key={acctypes}
                                            value={acctypes}
                                            style={getStyles(acctypes, personName, theme)}
                                            >
                                                <Checkbox checked={personName.indexOf(acctypes) > -1} />
                                                <ListItemText primary={acctypes} />
                                            </MenuItem>
                                        ))}
                                    </Selects>
                                    </FormControl>
                                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                                    <FormControlLabel sx={{ color: "#fff" }} control={<Checkbox color="success" />} label="Include the lower level member" />
                                    <Button variant='contained' className="searchButton" startIcon={<SearchIcon/>}>Search</Button>
                                </div>
                                <div className="accntTabtable">
                                    <div className="tableHeader">
                                        <div className="tableRow">
                                            <div>Hours</div>
                                            <div>transaction type</div>
                                            <div>Type details</div>
                                            <div>Amount</div>
                                        </div>
                                    </div>
                                    <div className="tableBody">
                                        <div className="emptyData">
                                            <img src="/images/img_none_jl.png" alt="" />
                                            <label htmlFor="">No Records</label>
                                        </div>
                                    </div>
                                    <div className="tableFooter">
                                        <div></div>
                                    </div>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <div className="accntActions">
                                    <Select placeholder="Select date..." options={date} />
                                    <Select placeholder="States..." options={types} />
                                    <Select placeholder="Types..." options={types} />
                                    <Select placeholder="Platforms..." options={types} />
                                    <Select placeholder="All the games..." options={types} />
                                </div>
                                <div className="accntTabtable">
                                    <div className="tableHeader">
                                        <div className="tableRow sevenRows">
                                            <div>Hours</div>
                                            <div>Types</div>
                                            <div>Platform</div>
                                            <div>Games</div>
                                            <div>Valid Bets</div>
                                            <div>Gains and Losses</div>
                                            <div>Note Number</div>
                                        </div>
                                    </div>
                                    <div className="tableBody">
                                        <div className="emptyData">
                                            <img src="/images/img_none_jl.png" alt="" />
                                            <label htmlFor="">No Records</label>
                                        </div>
                                    </div>
                                    <div className="tableFooter">
                                        <div></div>
                                    </div>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <div className="accntActions">
                                    <Select placeholder="Select date..." options={date} />
                                    <Select placeholder="Types..." options={types} />
                                    <Select placeholder="Platforms..." options={types} />
                                </div>
                                <div className="accntTabtable">
                                    <div className="tableHeader">
                                        <div className="tableRow sevenRows">
                                            <div>Hours</div>
                                            <div>Types</div>
                                            <div>Platform</div>
                                            <div>Games</div>
                                            <div>Number of bets</div>
                                            <div>valid Bets</div>
                                            <div>Gains and Losses</div>
                                        </div>
                                    </div>
                                    <div className="tableBody">
                                        <div className="emptyData">
                                            <img src="/images/img_none_jl.png" alt="" />
                                            <label htmlFor="">No Records</label>
                                        </div>
                                    </div>
                                    <div className="tableFooter">
                                        <div></div>
                                    </div>
                                </div>
                            </CustomTabPanel>
                        </Box>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}
export default AccountDetails;