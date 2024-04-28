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
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';
import './dateModal.css'
import { pt, uk, zhCN } from 'date-fns/locale';
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DateModal(props:any) {
    console.log(props.stateValue)
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');
    const [closeState, setCloseState] = useState({value:"8"});
    const [state, setState] = useState({
        selection1: {
            startDate: addDays(new Date(), 0),
            endDate: addDays(new Date(), 0),
            key: 'selection1'
        },
    });
    const handleDateChange=(e:any)=>{
        setState({...state,selection1:e.selection1})
    }
    return (
        <React.Fragment>
            <Dialog
                open={false}
                TransitionComponent={Transition}
                fullWidth={false}
                maxWidth={false}
                fullScreen={false}
                sx={{}}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: "#202329" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component="div">
                            <label className="modalTitle">Custom Date</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={(e)=>props.closeModal(closeState)}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className="datePickerContainer">
                    <DateRange
                        moveRangeOnFirstSelection={false}
                        onChange={(e)=>handleDateChange(e)}
                        ranges={[state.selection1]}
                        locale={zhCN}
                    />
                </div>
            </Dialog>
        </React.Fragment>
    );
}