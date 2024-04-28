import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./openGift.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Zoom from '@mui/material/Zoom';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { ToastrPngk } from "../../globalFunctions/toastr";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useGlobalVariables } from "../../globalFunctions/store";
import { useGetSignin, useGetSigninRules } from "../../hooks/curstomHooks";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
};
const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
    height: "4rem"
};
function GiftOpen(props: any) {
    const colorP = ChangeColorPallte()
    const modsTatus = useGlobalVariables(state => state.openReward)
    const cash = useGlobalVariables(state => state.rewardIndex1)
    const points = useGlobalVariables(state => state.rewardIndex2)
    const userConfig = useGlobalVariables(state => state.stationConfig)

    const score = useGlobalVariables()

    return (
        <>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modsTatus}
                onClose={props.setOpenEnvelope}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                sx={{
                    "& .MuiDialog-paper": {
                        border: "none",
                        boxShadow: "none",
                        padding: 0,
                    },
                }}
            >
                <>
                    <Box sx={style2}>
                        <div style={style} >
                            <img src="/images/yhua.23941d71.png" alt="" className="stars" />
                            <img src="/images/dllq.png" alt="" className="giftBoxOpen" />
                            <img src="/images/fangshe.png" alt="" className="solar" />

                        </div>
                        <div className="rewardInfo" >
                            <div className="finish-box" style={{ backgroundImage: "url(/images/backgroundReward.png)" }}>
                                {userConfig.isShowOnSign == true &&
                                    <>
                                        <img src="data:image/png;base64,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"></img>
                                        <span>{cash}</span>
                                    </>}
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABSJJREFUWEetl3tQVFUcx7/nnH0AAqssCavCImZIWgYN0QyWTErkOPIyxyYIkhncpj8qHHFG/glqmslHj8nRGV0UcUImFVDLLGxGJ7U01IbMSSNI8cFbBXkIex/NveuFXXb37mXy/LXnnt/v+/v8fufc355LADBMcoSWpZteWjAjKSKIxUuunUP8X6f/vNPYX/Zj3ySlQLQCpNcV5kYFs7URgWzhUyEs2Fug5gf8QOcw33Sjn7M3vF75tRYYvwBFDUWbrcGsKCqIhWgRVGzaBvmBtgHebk+3l6j5+QQI/yJnemHiE2fmm3Sxkwk80fZKH9e651L3op7iui5vOl4BFlbnv5xpDTo2J5gF/p/gim/LAD985MbQ8qbcfT9P1PMAkIKvjAlqsE5huscRXNG4MShwtdcHX50I4QYglf3dpOktjyvziQlIldj+W+/c3nUHO5Q1N4CSU7a/F0zVvueWkBdw7yGH4dFLIJKShnH5vuPfram75noA5BwpLM20Bn6kQWPMZEVcGXgBKD1ZgqfNAQgL1NZSam+OfHx0RUW5JDRWAUtVQeOLZn1C1iyjJgbr1GQstr4l29p/r8DptjOIMRnw5DSDqv/hWyM41+u42l5QtWAMwFKRlwY9Oy49eM1iQOp0dRHJLiOuHFMDzHKwnqEerDuxXv5tMlLEhwcgWE89QE51jeKH9lH5uchzqzoKq+vlClgq87eDEpvisWKmESnhep+ZzAlLRkqUM3tlKFVQ5nFmI6JCxjXO9jjw7e2RcQdB3N++Zl++E6Aq/wpA4lwF0yINWBLhrESgLhQhxkiEGi0wBVgwKzQeJqMze2VIVbjWew1dg9249eA2Wu+1gtE+zAsz4nSPAyc6nJkrQwTudBRURZPQsvSwKbMje72l+8nzWVgzP8tnJbQs7GyqQ9mlwyDMc0toHxdFLDvzEhHALvoSK3k2E8XPZWuJ5WHz2cVabG48JD8negaqd+9t/AifQmbY89JEA2tQi7DumQysT8iZFMSWC4ew9UKtuw8loAYdCH1UDQe/TBOApDIZCK/BXVCIXgeqZ4AE4G8LXFPQAuEvuKInnQnBIS5TPYQTa16V+j7SohNUt6L+n1/wzk/bNG0X42mMz9fQm8KZzE8Ra4pUFb/ccx1LD230CyBScr/bVhPutRF586aEouXNnTCy8eZysbMZnMAj2TJvzGWYG0Xs7rchiKIqBKH0ZKdtf5oTwKUV+/JKMM/GseUfysst99uxqfEgjrT8Ks+XRiegNHk15put8nzxgQ24evemHwCxuNP2zTa3PyMAPjd4dewibEjIwa4/jmNH03dexfPiX0FxYjbKz1XjaMs53wCM3OlaWxMt9wflVmzZnfcGdMznTVZ6A768UAcHz6tmpqMMHyRmefYAFy+Rko3dtpotbgDSxFKZfwCUqHYckeMhOHjAzx77pKTkfJetJmXsdXT9LpCuZPqw4LMAme3vGMsgHA8I6ofNVYdQ2sUNOhJ9Xskk4wh7bhI1sO8BMs0fhLQu8oKzIoKgbk4wRBhb0llU3egG5e3LSIbQ62pAEKMFQgYRBIgOXgbyMu4SHVs+MbjHGXB1NH++KlIfFriDEJKhFcIJIkLkOIjcIxBKzvOD3ErXsvutgKtBRGV+AaVE+rwa7zZaiASxmRvl9nbb9m9SM/f7bag4R+7JzSaEZYuUpBJghjdR6ZZDBPGUKPL10n1PC6dmAFexmV/lWhwBJJpRhErPeQH9+odi2+33qtu1BHW1+Q9Rcs4LefGhjgAAAABJRU5ErkJggg=="></img>
                                <span>{points}</span>
                            </div>
                        </div>
                        <button style={{ background: colorP.forGround,borderColor:colorP.forGround,color:colorP.forGround }} className="claimButton" onClick={() => useGlobalVariables.setState({ openReward: false })}>OK</button>
                    </Box>
                </>
            </Modal>

        </>

    );
}

export default GiftOpen;
