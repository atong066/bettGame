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

export default function DepoHistoryModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  return (
    <React.Fragment>
      <Dialog
        open={props.openSubModal}
        sx={{
          " .MuiDialog-paper": {
            maxWidth: "max-content !important"
          },
          " .MuiPaper-root": {
            boxShadow: "none",
            borderRadius: "20px"
          }
        }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center'  component={'span'}>
              <label className="modalTitle" style={{ color: colorP.text }}>{props.submitTitle}</label>
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              value="8"
              onClick={props.closeSubModal}
              aria-label="close"
              className="modalCloseCalendar"
            >
              <CloseIcon style={{ color: colorP.text }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
          {props.children}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: colorP.backGorund }}>
          {props.hasCancel==false?"":<Button style={{ color: colorP.text, borderColor: colorP.forGround }} variant='outlined' onClick={props.closeSubModal}>{t("ts320", { ns: "ts" })}</Button>}
          {props.hasSubmit==false?"":<Button style={{ color: colorP.text, borderColor: colorP.forGround }} variant='outlined' onClick={props.submitAction}>{t("ts321", { ns: "ts" })}</Button>}
          {props.hasProceed==true&&<Button style={{ color: colorP.text, borderColor: colorP.forGround }} variant='outlined' onClick={props.proceedAction}>Proceed</Button>}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}