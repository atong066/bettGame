
import Dialog from '@mui/material/Dialog';
import './turnlate-alert.css'
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function TurnModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);

  return (
    <Dialog
      open={props.openAlert}
      onClose={props.closeAlert}
      keepMounted
      TransitionComponent={Transition}
      sx={{
        " .MuiDialog-paper": {
          maxWidth: "max-content !important",
          background: "transparent !important",
          overflow: "hidden !important",
          boxShadow: "none"
        }
      }}
    >
      <div className="turnAlertMainContainer">
        <div className="turnAlertBack">
          <div className="backImage">
            <img className="turnBackImage" src="turnlateImages/alert-back.png" />
          </div>
          <div className="labelAndPrizeImageBox">
            <div className="prizeBox">
              <label className="prizeLabel">{t(props.alertTitle, { ns: "ts" })}</label>
              <br />
              <label className="prizeLabel">{t(props.alertContent, { ns: "ts" })}</label>
            </div>
            <div className="prizeImageBox">
              <img src={"turnlateImages/" + props.imagePrize} />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}