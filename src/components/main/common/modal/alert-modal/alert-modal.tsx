import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";

import './alert-modal.css'
import { ChangeColorPallte } from '../../../../globalFunctions/globalContext';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

export default function AlertModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()
  return (
    <div className="alertModalContainer">
      <Dialog
        open={props.openAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={props.dialogStyle}
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
          }
        }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: color.backGorund }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component={'span'}>
              <label style={{ color: color.text4 }}>{props.alertTitle}</label>
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              value="8"
              onClick={props.closeAlert}
              aria-label="close"
              className="modalCloseCalendar"
            >
              <CloseIcon style={{ color: color.text4, fontSize: ".22rem" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className='alertContent' sx={{ backgroundColor: color.backGorund }}>
          <DialogContentText sx={props.children ? { color: color.text4, lineHeight: "normal" } : { color: color.text4, span: { color: color.text4 + " !important" } }} id="alert-dialog-description" align='center'>
            {props.alertContent ? props.alertContent : props.children}
          </DialogContentText>
        </DialogContent>
        {props.hasConfirm == false ? "" :
          <DialogActions className="alertFooter" sx={{ backgroundColor: color.backGorund }}>
            <Button style={{ backgroundColor: color.forGround, color: color.text2 + " !important" }} className="alertCloseButtonsss" variant="contained" onClick={props.closeAlert} autoFocus>
              {t("ts216", { ns: "ts" })}
            </Button>
          </DialogActions>}
      </Dialog>
    </div>
  );
}