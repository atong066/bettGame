import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useEffect, useState } from 'react';
import './point-redemption.css'
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { DialogTitle, DialogContent, Stack, Box, TextField } from '@mui/material';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { porintInit, scoreToMoney as sTOm, moneyToScore as mTOs } from './pointRed';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte, UserUSerConfig, UserUSerConfig2 } from '../../globalFunctions/globalContext';
import { useGlobalVariables } from '../../globalFunctions/store';
import { ToastrPngk } from '../../globalFunctions/toastr';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function PointExModal(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');
    const [userBalance, setUserBalance] = useState(porintInit)
    const [moneyToScoredata, setMtoS] = useState(mTOs)
    const [scoreToMoneydata, setStoM] = useState(sTOm)
    const [selectedtWay, setway] = useState(0)
    const [amountofExchange, setAmountofExchange] = useState(0)
    const [exAmount, setExmamount] = useState(0)
    const config = UserUSerConfig()
    const config2 = useGlobalVariables(state => state.stationConfig)

    console.log(selectedtWay)

    async function getBalance() {
        const response = await axios.post('/userCenter/getScoreExchangeInfo.do')
        const data = response.data
        setUserBalance({ ...userBalance, money: data?.money, score: data?.score })
        if (data?.scoreToMoney) {
            setway(data?.scoreToMoney?.id)
        } else if (data?.moneyToScore) {
            setway(data?.moneyToScore?.id)
        }
        setMtoS(data?.moneyToScore)
        setStoM(data?.scoreToMoney)
        if (!data?.moneyToScore && !data?.scoreToMoney) {
            useGlobalVariables.setState({ pointRedemptionState: true })
        } else {
            useGlobalVariables.setState({ pointRedemptionState: false })
        }
    }
    useEffect(() => {
        getBalance()
    }, [props])
    const handleExchangeWay = (val: number) => {
        setway(val)
    }
    const handleAmount = (e: any) => {

        if (selectedtWay == moneyToScoredata?.id) {
            setExmamount(e.target.value)
            let amount = (e.target.value / moneyToScoredata.numerator) * moneyToScoredata.denominator
            setAmountofExchange(amount)
        }
        else {
            setExmamount(e.target.value)
            let amount = (e.target.value / scoreToMoneydata.numerator) * scoreToMoneydata.denominator
            setAmountofExchange(amount)
        }


    }

    async function exchangePoints() {
        const response = await axios.post('/userCenter/confirmExchange.do', { exchangeNum: exAmount, configId: selectedtWay }
            , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
        if (response.data.success == true) {
            setAmountofExchange(0)
            setExmamount(0)
            props.search()
            props.closeModal()
            ToastrPngk({ msg: response.data.msg, type: "success", id: "002" })
        }
        else {
            ToastrPngk({ msg: response.data.msg, type: "error", id: "002" })
        }
    }
    return (
        <React.Fragment>
            <Dialog
                open={props.openValue}
                TransitionComponent={Transition}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                fullScreen={false}
                sx={{
                    " .MuiDialog-paper": {
                        maxWidth: "max-content !important"
                    },
                    " .MuiPaper-root": {
                        boxShadow: "none",
                    },
                    " .MuiPaper-root.MuiPaper-rounded": {
                        borderRadius: ".2rem",
                        border: "thin solid",
                        borderColor: "#313843"
                    },
                    " .MuiDialogContent-root": {
                        padding: 0
                    },
                    " .MuiToolbar-root": {
                        height: ".5rem"
                    },
                    " .MuiTypography-root": {
                        fontSize: ".22rem"
                    },
                    " .MuiFormLabel-root": {
                        fontSize: ".18rem"
                    }
                }}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component="div">
                            <label className="modalTitle" style={{ color: colorP.text4, fontSize: ".22rem" }}>{t("ts323", { ns: "ts" })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={props.closeModal}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: colorP.text4, fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
                    <div className='pointExContentBox'>
                        <div className="pointExContent">
                            <div className="pointContentBox"><span className="pointLabel" style={{ color: colorP.text4 }}>{t("ts331", { ns: "ts" })}</span><span className="pointCurrency" style={{ color: colorP.forGround }}>{config2.moneyUnit}</span><span className="pointContent" style={{ color: "#FFAA09" }}>{new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(userBalance.money)}</span></div>
                            <div className="pointContentBox"><span className="pointLabel" style={{ color: colorP.text4 }}>{t("ts332", { ns: "ts" })}</span><span className="pointCurrency" style={{ color: colorP.forGround }}></span><span className="pointContent" style={{ color: colorP.text4 }}>{userBalance.score}</span></div>
                            <div className="pointContentBox">
                                <div className="pointSelectBox">
                                    <FormControl sx={{
                                        " .MuiFormLabel-root": {
                                            fontSize: ".18rem !important"
                                        }
                                    }}>
                                        <Stack direction={'row'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: colorP.text4 }}>{t("ts333", { ns: "ts" })}</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                {moneyToScoredata && <FormControlLabel sx={{
                                                    color: colorP.forGround,
                                                    " .MuiTypography-root": {
                                                        fontSize: ".18rem !important"
                                                    }
                                                }} value="1" control={<Radio sx={{
                                                    color: colorP.forGround,
                                                    " .MuiSvgIcon-root": {
                                                        fontSize: ".2rem",
                                                    }
                                                }} onChange={() => handleExchangeWay(moneyToScoredata?.id)} checked={selectedtWay == moneyToScoredata?.id ? true : false || moneyToScoredata && !scoreToMoneydata ? true : false} />} label={t("ts450", { ns: "ts" })} />}

                                                {scoreToMoneydata && <FormControlLabel sx={{
                                                    color: colorP.forGround,
                                                    " .MuiTypography-root": {
                                                        fontSize: ".18rem !important"
                                                    }
                                                }} value="2" control={<Radio sx={{
                                                    color: colorP.forGround,
                                                    " .MuiSvgIcon-root": {
                                                        fontSize: ".2rem",
                                                    }
                                                }} onChange={() => handleExchangeWay(scoreToMoneydata?.id)} checked={selectedtWay == scoreToMoneydata?.id ? true : false || scoreToMoneydata && !moneyToScoredata ? true : false} />} label={t("ts451", { ns: "ts" })} />}

                                            </RadioGroup>
                                        </Stack>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="pointContentBox pointRedemptionRatioBox">
                                <span className="pointLabel" style={{ color: colorP.text4 }}>{t("ts334", { ns: "ts" })}</span>
                                <span className="pointRatio1" style={{ color: colorP.forGround }}>{selectedtWay == moneyToScoredata?.id ? moneyToScoredata?.numerator : scoreToMoneydata?.numerator}</span>
                                <span className="ratioDivider" style={{ color: colorP.forGround }}>:</span>
                                <span className="pointRatio2" style={{ color: colorP.forGround }}>{selectedtWay == moneyToScoredata?.id ? moneyToScoredata?.denominator : scoreToMoneydata?.denominator}</span>
                            </div>
                            <div className="pointContentBox">
                                <span className="pointLabel pointLabelMin" style={{ color: colorP.forGround }}>{t("ts335", { ns: "ts" })}</span>
                                <span className="pointLabelMinContent" style={{ color: colorP.text4 }}>{selectedtWay == moneyToScoredata?.id ? moneyToScoredata?.minVal : scoreToMoneydata?.minVal}</span>
                                <span className="pointLabel pointLabelMax" style={{ color: colorP.forGround }}>{t("ts336", { ns: "ts" })}</span>
                                <span className="pointLabelMaxContent" style={{ color: colorP.text4 }}>{selectedtWay == moneyToScoredata?.id ? moneyToScoredata?.maxVal : scoreToMoneydata?.maxVal}</span>
                            </div>
                            <div className="pointContentBox">
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { width: '30ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: colorP.fourth + " !important",
                                                    fontSize: ".18rem"
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    color: colorP.text4 + " !important",
                                                    fontSize: ".18rem"
                                                },
                                            },
                                            "& .MuiFormLabel-root": {
                                                color: "#808080 !important",
                                                fontSize: ".18rem"
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused": {
                                                fontSize: ".18rem",
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "2px solid !important",
                                                    borderColor: colorP.forGround + " !important",
                                                    fontSize: ".18rem"
                                                }
                                            }
                                        }}
                                        onChange={(e) => handleAmount(e)} type="number" size="small" id="outlined-basic" label={t("ts337", { ns: "ts" })} variant="outlined" />
                                </Box>
                            </div>
                            <div className="pointContentBox"><span className="pointLabel" style={{ color: colorP.text4 }}>{t("ts338", { ns: "ts" })}</span><span className="pointContent" style={{ color: colorP.forGround }}>{amountofExchange}</span></div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: colorP.backGorund }}>
                    <Button style={{ backgroundColor: colorP.forGround, fontWeight: 100, color: colorP.text2, borderColor: colorP.forGround }} className="redemptionButton" variant='outlined' onClick={props.closeModal}>{t("ts320", { ns: "ts" })}</Button>
                    <Button style={{ backgroundColor: colorP.forGround, fontWeight: 100, color: colorP.text2, borderColor: colorP.forGround }} className="redemptionButton" variant='outlined' onClick={exchangePoints}>{t("ts321", { ns: "ts" })}</Button>
                </DialogActions>
            </Dialog>
            <NotificationContainer />
        </React.Fragment>
    );
}