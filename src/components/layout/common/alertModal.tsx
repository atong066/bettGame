import { Dialog } from "@mui/material";
import React, { useEffect } from "react";
import './alertModal.css'
import { useAlertStates, useModalStates } from "../../globalFunctions/store";

export default function PngkAlert(props: any) {

    const alertState = useAlertStates()
useEffect(()=>{
    setTimeout(() => {
        useAlertStates.setState({ alertModal: false })
    },1200)

},[alertState.alertModal])
  
    return (
        <>
            <React.Fragment>
                <Dialog
                    open={alertState.alertModal}
                    sx={{
                        " .MuiDialog-paper": {
                            maxWidth: "max-content !important",
                            background: "transparent !important",
                            overflow: "hidden !important",
                            boxShadow: "none",
                            zIndex:"999999999999"
                        }
                    }}
                >
                    <div className="alertMainContainer">
                        <img src={"/alertImages/" + alertState.alertType + ".png"} alt="" className="alertImage" />
                        <span className="alertMessage" style={alertState.alertType == "error" ? { color: "#EA4E3D" } : alertState.alertType == "success" ? { color: "#04be02" } : alertState.alertType == "warning" ? { color: "#FFAA09" } : { color: "#fff" }}>{alertState.alertMessage}</span>
                    </div>
                </Dialog>
            </React.Fragment>
        </>
    )
}