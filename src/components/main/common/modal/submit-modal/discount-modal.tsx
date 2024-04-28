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

export default function DiscountModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  return (
    <React.Fragment>
      <Dialog
        open={props.openSubModal}
        sx={{
          " .MuiDialog-paper": {
            maxWidth: "10rem",
            borderRadius: ".2rem",
            "& .MuiDialogContent-root": {
              padding: ".2rem"
            }
          },
          " .MuiPaper-root": {
            " .MuiToolbar-root": {
              padding: "0.2rem 0.3rem !important"
            },
            " .MuiDialogContent-root":{
              paddingTop: "0"
            }
          }
        }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: colorP.third, boxShadow: "0" }}>
          <Toolbar sx={{ paddingTop: '.1rem', paddingBottom: '.3rem' }}>
            <Typography sx={{
              ml: 2, flex: 1, fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              ".modalTitleDiscountModal": {
                maxWidth: "32rem !important",
                textAlign: "justify !important",
              }

            }} variant="h6" align='center' component={'span'}>
              <div className="modalTitleDiscountModal" style={{ color: colorP.text, fontSize: ".24rem" }}>{props.submitTitle}</div>
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              value="8"
              onClick={props.closeSubModal}
              aria-label="close"
              className="modalCloseCalendar"
              sx={{ position: 'absolute', right: 0, top: 0, }}

            >

              <CloseIcon style={{ color: '#adb6c3', fontSize: ".3rem", }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ backgroundColor: colorP.third }}>
          {props.children}
        </DialogContent>
      </Dialog>
    </React.Fragment >
  );
}