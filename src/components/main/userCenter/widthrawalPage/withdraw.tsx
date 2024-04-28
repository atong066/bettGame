import FormControl from "@mui/material/FormControl";
import MainLayout from "../../../layout";
import './withdraw.css'
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useRef, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import WithdrawHistory from "./withdrawalHistory";
import Usdtmanagement from "./usdtManagement";
import BankCardManagement from "./bankCardManagement";
import { useNavigate } from "react-router-dom";
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { HeaderWithAction } from "../../common/header";
import { useTranslation } from "react-i18next";
import { SetNewBalance, UserUSerConfig, UserUSerConfig2, useBalance } from "../../../globalFunctions/globalContext";
import { ChangeColorPallte } from '../../../globalFunctions/globalContext';
import { Avatar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useGetBankList, useGetSecurityInfo, useGetUserInfo } from "../../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import WithdrawInfo from "./withdrawInfo";
import { useGlobalVariables, useShowWithdraw } from "../../../globalFunctions/store";

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
function BankCardDetails(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const checkLogin = SetNewBalance()
    const userInfo = useGlobalVariables(state => state.userDetails)
    const userInformation = useGetUserInfo()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const wihtdrawInfos = useGlobalVariables(state => state.withdrawInfo)
    const withdrawValue = useRef<any>(null)

    const [selectBank, selectedBankIndex] = useState({
        index: 0,
        bankName: ''
    });
    const siteConfig = UserUSerConfig()
    const [activeCard, selectActiveCard] = useState();
    const [amountOfwithdraw, setWithrawAmount] = useState<any>("");
    const [amntFee, setAmnyFee] = useState(0);
    const [withdrawalPassword, setwithdrawalPassword] = useState<any>("");
    const [wihtdrawInfo, setWithdrawInfo] = useState<any[]>([]);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [bankBox, setBankBox] = useState<any>({})
    const config2 = useGlobalVariables(state => state.stationConfig)
    const handleWithdrawAmount = (value: any) => {

        if (value == "") {
            setAmnyFee(0)
        }
        else {
            if (wihtdrawInfo[0]?.dayTimes < wihtdrawInfo[0]?.strategy?.drawNum) {
                setAmnyFee(0)
            } else {
                if (wihtdrawInfo[0] != undefined && Object.keys(wihtdrawInfo[0].strategy).length != 0) {
                    if (wihtdrawInfo[0].strategy.feeType == 1) {
                        let fee = wihtdrawInfo[0].strategy.feeValue
                        setAmnyFee(fee)
                    }
                    else {
                        let fee = value * (wihtdrawInfo[0].strategy.feeValue / 100)
                        if (wihtdrawInfo[0].strategy.lowerLimit) {
                            if (fee < wihtdrawInfo[0].strategy.lowerLimit) {
                                setAmnyFee(wihtdrawInfo[0].strategy.lowerLimit)
                            }
                            else if (wihtdrawInfo[0].strategy.upperLimit) {
                                if (fee > wihtdrawInfo[0].strategy.upperLimit) {
                                    setAmnyFee(wihtdrawInfo[0].strategy.upperLimit)
                                } else {
                                    setAmnyFee(fee)
                                }
                            }
                            else {
                                setAmnyFee(fee)
                            }
                        }
                        else {
                            if (wihtdrawInfo[0].strategy.upperLimit) {
                                if (fee > wihtdrawInfo[0].strategy.upperLimit) {
                                    setAmnyFee(wihtdrawInfo[0].strategy.upperLimit)
                                }
                                else {
                                    setAmnyFee(fee)
                                }
                            }
                            else {
                                setAmnyFee(fee)
                            }

                        }
                    }
                }
                else {
                    setAmnyFee(0)
                }
            }

        }
        // if (value == "") {
        //     setWithrawAmount("")
        // } else {
        //     setWithrawAmount(Math.ceil(value))
        // }
        setWithrawAmount(value)
    }
    const handleActiveBank = (value: any, bank: any) => {
        selectedBankIndex({ ...selectBank, index: value, bankName: bank.id })
    }
    const handleWithdrawalPassword = (value: any) => {
        setwithdrawalPassword(value)
    }

    const handleWithdrawal = () => {
        try {
            axios.post('/userCenter/finance/withdrawSave.do', {
                amount: Math.ceil(amountOfwithdraw),
                bankId: selectBank.bankName,
                pwd: withdrawalPassword
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                if (res.data.success == true) {
                    ToastrPngk({ msg: res.data.msg, type: "success" })
                    setWithrawAmount("")
                    setwithdrawalPassword("")
                    getWithdrawInfo()
                }
                else {
                    ToastrPngk({ msg: res.data.msg, type: "error" })
                }
            })
        } catch (e) {
            ToastrPngk({ msg: e, type: "error" })
        }
    }
    async function getWithdrawInfo() {
        try {
            const response = await axios.post('/userCenter/finance/withdrawInfo.do')
            setBankBox(response.data)
            if (response.data.bankList) {
                props.bankAction(true)

                setWithdrawInfo(wihtdrawInfo => [...wihtdrawInfo, response.data])
                selectedBankIndex({ ...selectBank, bankName: response.data.bankList[0].id })
            }
            else {
                props.bankAction(false)
            }
        } catch (e) {
            userInformation.refetch()
        }

    }
    useEffect(() => {
        getWithdrawInfo()
        userInformation.refetch()
    }, [])


    async function handleValidation() {
        const response = await axios.post('/userCenter/getSecurityInfo.do')
        if (selectBank.bankName == "") {
            navigate("/add-bank-card");
        }
        else {
            navigate("/security");
        }
    }

    return (
        <>
            {props.passState == true ? (<div className="bankCardContainer" style={{ background: colorP.backGorund }}>
                <div className="bankAmount"><span className="amountLabel">{t("ts462", { ns: "ts" })}</span><span className="walletCurrency" style={{ color: colorP.forGround }}>{config2.moneyUnit}</span><span className="walletAmount" style={{ color: colorP.text }}>{userInfo?.money}</span></div>
                <div className="bankCardBox">
                    <div className="bankCardLabel">{t("ts463", { ns: "ts" })}</div>
                    <div className="cardBoxContainer" style={{ background: colorP.third }}>
                        <Stack
                            useFlexGap flexWrap="wrap"
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            {
                                wihtdrawInfo[0] ? wihtdrawInfo[0].bankList.map((value: any, index: any) =>
                                    <div className="checkContainer" >
                                        <div style={{ background: colorP.third, borderColor: colorP.forGround, color: colorP.forGround }} key={index} className={"cardBox " + ((index == selectBank.index) ? "active" : "")} onClick={() => handleActiveBank(index, value)}>
                                            <div className="bankName">{value.bankName}</div>
                                            <div className="bankHolder" style={{ textTransform: "uppercase", color: colorP.forGround }}>{value.realName}</div>
                                            <div className="bankNumber">{value.cardNo}</div>
                                        </div>
                                        <div style={{ background: colorP.forGround, color: colorP.forGround }} className={"badge " + ((index == selectBank.index) ? "active" : "")} >
                                            <Avatar style={{ background: "transparent", width: "1.3rem", height: "1.3rem", color: "#f0c059" }}><CheckIcon className="checkIcon" style={{ fontSize: 30, color: colorP.text, width: "1.4rem", height: "1.4rem" }}></CheckIcon></Avatar>
                                        </div>
                                    </div>
                                ) : ""
                            }
                        </Stack>
                    </div>
                </div>
                <div className="amountInputContainer">
                    <Stack spacing={2} direction={"column"}>
                        <FormControl size="small" sx={{
                            m: 1, width: '40ch',
                            "& .MuiInputBase-root": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: colorP.forGround + " !important"
                                },
                                "& .MuiOutlinedInput-input": {
                                    color: colorP.text + " !important"
                                },
                            },
                            "& .MuiFormLabel-root": {
                                color: "#808080 !important"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "2px solid !important",
                                    borderColor: colorP.forGround + " !important"
                                }
                            }
                        }}
                            variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">{t("ts464", { ns: "ts" })}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                aria-describedby="outlined-weight-helper-text"
                                autoComplete="off"
                                type="number"
                                required={true}
                                error
                                label={t("ts464", { ns: "ts" })}
                                value={amountOfwithdraw}
                                defaultValue=""
                                onChange={(e) => handleWithdrawAmount(e.target.value)}
                                onFocus={() => setWithrawAmount('')}
                            />
                            <FormHelperText style={{ color: colorP.text }} id="outlined-weight-helper-text">{t("ts465", { ns: "ts" })}</FormHelperText>
                        </FormControl>
                        <FormControl size="small" sx={{
                            m: 1, width: '40ch',
                            "& .MuiInputBase-root": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: colorP.forGround + " !important"
                                },
                                "& .MuiOutlinedInput-input": {
                                    color: colorP.text + " !important"
                                },
                            },
                            "& .MuiFormLabel-root": {
                                color: "#808080 !important"
                            },
                            "& .MuiSvgIcon-root": {
                                color: colorP.text + " !important"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "2px solid !important",
                                    borderColor: colorP.forGround + " !important"
                                }
                            }
                        }}
                            variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">{t("ts466", { ns: "ts" })}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">

                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={t("ts466", { ns: "ts" })}
                                value={withdrawalPassword}
                                onChange={(e) => handleWithdrawalPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={2} direction={"row"}>
                            <Button style={{ backgroundColor: colorP.forGround, color: colorP.text }} variant='contained' className="bankButtons" onClick={handleWithdrawal}>{t("ts182", { ns: "ts" })}</Button>
                            <Link to="/account-details"><Button style={{ backgroundColor: colorP.forGround, color: colorP.text }} variant='contained' className="bankButtons">{t("ts467", { ns: "ts" })}</Button></Link>
                        </Stack>
                    </Stack>
                    <div className="bankWithdrawalInfoContainer">
                        <div className="bnkWithrawalData" >
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts468", { ns: "ts" })}:</span>
                                        <span className="infoContent" style={{ color: colorP.forGround }}>{wihtdrawInfo[0] ? wihtdrawInfo[0].dayTimes : ""}</span><span className="timesLabel">{t("ts476", { ns: "ts" })}</span>
                                    </div>
                                </div>
                            </Stack>
                            {wihtdrawInfo[0]?.lastTimes > 0 && <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts469", { ns: "ts" })}:</span>
                                        <span className="infoContent" style={{ color: colorP.forGround }}>{wihtdrawInfo[0] ? wihtdrawInfo[0].lastTimes : ""}</span><span className="timesLabel">{t("ts476", { ns: "ts" })}</span>
                                    </div>
                                </div>
                            </Stack>}


                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts470", { ns: "ts" })}:</span>
                                        <span className="currencyLabel" style={{ color: colorP.text }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{amntFee}</span>
                                    </div>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts471", { ns: "ts" })}:</span>
                                        <span className="currencyLabel" style={{ color: colorP.text }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{wihtdrawInfo[0] ? wihtdrawInfo[0].minDrawMoney : ""}</span>
                                    </div>
                                </div>
                            </Stack>


                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts472", { ns: "ts" })}:</span>
                                        <span className="currencyLabel" style={{ color: colorP.text }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{wihtdrawInfo[0] ? wihtdrawInfo[0].maxDrawMoney : ""}</span>
                                    </div>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts473", { ns: "ts" })}:</span>
                                        <span className="currencyLabel" style={{ color: colorP.text }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{wihtdrawInfo[0] ? wihtdrawInfo[0].bet.betNum : ""}</span>
                                    </div>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts474", { ns: "ts" })}:</span>
                                        <span className="currencyLabel" style={{ color: colorP.text }}>{config2.moneyUnit}</span><span className="infoContent" style={{ color: colorP.forGround }}>{wihtdrawInfo[0] ? wihtdrawInfo[0].bet.drawNeed : ""}</span>
                                    </div>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts475", { ns: "ts" })}:</span>
                                        <span className="infoContent" style={{ color: colorP.forGround }}>{wihtdrawInfo[0] ? wihtdrawInfo[0].minDrawTime : ""} -{wihtdrawInfo[0] ? wihtdrawInfo[0].maxDrawTime : ""}</span>
                                    </div>
                                </div>
                            </Stack>
                        </div>
                        {wihtdrawInfos?.strategy?.feeType == 1 ?
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround, width: "1fr" }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts982", { ns: "ts" })}: <span style={{ color: colorP.forGround }}>{wihtdrawInfos?.strategy?.drawNum}</span> <span className="timesLabel">{t("ts476", { ns: "ts" })}</span></span>
                                    </div>
                                </div>
                            </Stack> :
                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                <div className="infoBox" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround, width: "1fr" }}>
                                    <div className="infoLabelBox">
                                        <span className="infoLAbel" style={{ color: colorP.text }}>{t("ts979", { ns: "ts" })} <span style={{ color: "red" }}>{wihtdrawInfos?.strategy?.drawNum}</span> {t("ts476", { ns: "ts" })}, {t("ts980", { ns: "ts" })} <span style={{ color: "red" }}>{wihtdrawInfos?.strategy?.feeValue}%</span> {t("ts981", { ns: "ts" })}</span>
                                    </div>
                                </div>
                            </Stack>
                        }
                    </div>
                </div>
            </div>
            ) : <Button style={{ backgroundColor: colorP.forGround, color: colorP.text }} variant='contained' className="bankButtons addCardButton" onClick={handleValidation}>{t("ts186", { ns: "ts" })}</Button>
            }


        </>
    )

}
export default function WithdrawalPage(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const [value, setValue] = useState(props.active);
    const [withdrawalPasswordState, setWithdrawalPasswordState] = useState(false)
    const handlePassState = (value: any) => {
        setWithdrawalPasswordState(value)
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeS = (num: any) => {
        setValue(num);
    };
    useEffect(() => {
        setValue(props.active)
    }, [props])

    return (
        <>
            <MainLayout>
                <section className="withdrawMainContainer">
                    <HeaderWithAction>{t("ts181", { ns: "ts" })}</HeaderWithAction>
                    <div className="walletContainer" style={{ background: colorP.backGorund }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange}
                                    TabIndicatorProps={{
                                        style: { background: colorP.forGround }
                                    }}>
                                    <Link to="/withdrawal"><Tab label={t("ts182", { ns: "ts" })} {...a11yProps(0)} /></Link>
                                    <Link to="/withdrawal-history"><Tab label={t("ts183", { ns: "ts" })} {...a11yProps(1)} /></Link>
                                    <Link to="/add-bank-card"><Tab label={t("ts184", { ns: "ts" })} {...a11yProps(2)} /></Link>
                                    <Link to="/usdt-management"><Tab label={t("ts185", { ns: "ts" })} {...a11yProps(3)} /></Link>
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <div className="addCardButtonBox" style={{ background: colorP.backGorund }}>
                                    <BankCardDetails setActive={handleChangeS} passState={withdrawalPasswordState} bankAction={handlePassState}></BankCardDetails>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <WithdrawHistory ></WithdrawHistory>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <BankCardManagement />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3}>
                                <Usdtmanagement />
                            </CustomTabPanel>
                        </Box>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}