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
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange, DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import './dateModal.css'
import { pt as br, zhCN as cn, enUS as en, id, vi, ms, ja, es, th, hi } from 'date-fns/locale';
import { DialogActions } from '@mui/material';
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import * as stylex from '@stylexjs/stylex';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import { dateReducer, initialDate } from "../reducers/dateReduce";
import { useReducer } from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DateModal(props: any) {
    const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
    const { t } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');
    const [closeState, setCloseState] = useState({ value: "8" });
    const cookies = new Cookies();
    var lang = localStorage.getItem('i18nextLng')
    const [newLang, setNewLang] = useState<any>()
    const [state, setState] = useState({
        selection1: {
            startDate: addDays(new Date(), 0),
            endDate: addDays(new Date(), 0),
            key: 'selection1'
        },
    });
    const handleDateChange = (e: any) => {
        setState({ ...state, selection1: e.selection1 })
    }
    const handleApply = (e: any) => {
        const selectedEndDat = state.selection1.endDate.toLocaleDateString('sv-SE') + " 23:59:59"
        const selectedStartDate = state.selection1.startDate.toLocaleDateString('sv-SE') + " 00:00:00"
        props.closeModal({ startD: selectedStartDate, endD: selectedEndDat, value: "9" })
    }

    const getDate = () => {
        if (lang == "cn") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={cn}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "en") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={en}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "br") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={br}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "id") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={id}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "vi") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={vi}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "ja") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={ja}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "es") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={es}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "in") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={hi}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "th") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={th}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        } else if (lang == "ms") {
            return (<DateRange
                moveRangeOnFirstSelection={false}
                onChange={(e) => handleDateChange(e)}
                ranges={[state.selection1]}
                locale={ms}
                // minDate={new Date(commonReducer.startDate)}
                // maxDate={new Date(commonReducer.endDate)}
                rangeColors={[colorP.forGround, colorP.backGorund, colorP.third]}
            />)
        }

    }


    return (
        <React.Fragment>
            <Dialog
                open={props.openValue}
                TransitionComponent={Transition}
                fullWidth={false}
                maxWidth={false}
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
                    " .MuiSvgIcon-root":{
                        fontSize: ".22rem"
                    },
                }}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component={'span'}>
                            <label style={{ color: colorP.text }} className="modalTitle">{t("ts520", { ns: "ts" })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={(e) => props.closeModal(closeState)}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon sx={{ color: colorP.text }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div style={{ backgroundColor: colorP.backGorund }} className="datePickerContainer">
                    {getDate()}
                </div>
                <DialogActions sx={{ backgroundColor: colorP.backGorund }}>
                    <Button style={{ color: colorP.forGround, borderColor: colorP.forGround, fontSize: ".18rem", borderRadius: ".1rem", textTransform: "capitalize" }} onClick={handleApply} autoFocus variant='outlined'>
                        {t("ts322", { ns: "ts" })}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}