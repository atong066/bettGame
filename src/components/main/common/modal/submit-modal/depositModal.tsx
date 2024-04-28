import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import './submit-modal.css'
import { useTranslation } from "react-i18next";
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { ChangeColorPallte } from '../../../../globalFunctions/globalContext';
import { useGlobalVariables } from '../../../../globalFunctions/store';

export default function DepositModalPop(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  function handleDepoHistr() {
    useGlobalVariables.setState({
      depoHist: true
    })
  }
  return (
    <React.Fragment>
      <Dialog
        open={props.openSubModal}
        sx={{
          " .MuiDialog-paper": {
            maxWidth: "8rem",
            borderRadius:"0.15rem",
            maxHeight:"calc(var(--vh, 1vh)* 100 - .1rem);",
            minWidth: "7.9rem",
            border:"thin solid",
            borderColor:"#313843"
          }
        }}
      >
      <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund, boxShadow: "none" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1, fontWeight: 600,fontSize: ".24rem",marginTop:".20rem"}} variant="h6" align='center' component={'span'}>
            <label className="modalTitle" style={{ color: colorP.text, marginLeft: "1.45rem" }}>{props.submitTitle}</label>
          </Typography>
          <div onClick={handleDepoHistr} className='goTodeposit' style={{ color: colorP.forGround,fontSize:".20rem"}}>
            {t("ts105", { ns: "ts" })}
          </div>
          <IconButton
            edge="start"
            color="inherit"
            value="8"
            onClick={props.closeSubModal}
            aria-label="close"
            className="modalCloseCalendar"
          >

            <CloseIcon style={{ color: colorP.text,fontSize:".24rem"}} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ backgroundColor: colorP.backGorund,padding:"0 24px" }}>
        {props.children}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colorP.backGorund }}>
        {props.hasCancel == false ? "" : <Button style={{ color: colorP.text, borderColor: colorP.forGround,fontSize: "0.18rem" }} variant='outlined' onClick={props.closeSubModal}>{t("ts320", { ns: "ts" })}</Button>}
        {props.hasSubmit == false ? "" : <Button style={{ color: colorP.text, borderColor: colorP.forGround,fontSize: "0.18rem" }} variant='outlined' onClick={props.submitAction}>{t("ts321", { ns: "ts" })}</Button>}
        {props.hasProceed == true && <Button style={{ color: colorP.text, borderColor: colorP.forGround }} variant='outlined' onClick={props.proceedAction}>Proceed</Button>}
      </DialogActions>
    </Dialog>
    </React.Fragment >
  );
}