import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props:any) {
console.log(props)
  return (
    <React.Fragment>
      <Dialog
        open={props.openStatus}
        onClose={props.closeAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         TronLink is not bound
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         
Click Confirm to bind TronLink
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeAction}>Cancel</Button>
          <Button  autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}