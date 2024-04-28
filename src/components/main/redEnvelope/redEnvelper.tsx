import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./redEnvelope.css";
import axios from "axios";
import { useState } from "react";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { useSetEnvelopValue } from "../../globalFunctions/store";
import { useCurnew } from "../../hooks/curstomHooks";
import { useTranslation } from "react-i18next";
function EnvelopModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const [open, setOpen] = useState(false);
  const [envelope, setEnvelope] = useState<any[]>([]);
  const [reward, setReward] = useState<any>(0)
  const [enveOpen, setopenEnve] = useState(false)
  const curNew = useCurnew()
  const handleOpenRedPacket = (id: any) => {
    grabEnvelope(id)
  };
  const setCloseEnve = () => {
    setopenEnve(false)
  }

  const grabEnvelope = async (id: any) => {

    try {
      const response = await axios.post("/userCenter/redpacket/grab.do", {
        redPacketId: id
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-Requested-With': 'XMLHttpRequest'
        },
      });
      if (response.data.success == true) {
        setReward(response.data.redPacketMoney)
        useSetEnvelopValue.setState({ envelopeValue: false })
        setopenEnve(true)
      }
      else {
        ToastrPngk({ msg: response.data.msg, type: "error" })
      }
    } catch (error) {
      ToastrPngk({ msg: error, type: "error" })
    }
  };

  const evnveStatus = useSetEnvelopValue(state => state.envelopeValue)

  const closeModal = () => {
    setopenEnve(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={evnveStatus}
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
          <Fade in={evnveStatus}>
            <Box className="giftBox">
              <div className="enveloped-container">
                <div className="main-red-enveloper">
                  <div className="heartbeat">
                    <img src="/redfolderImages/pinkEnvelope.png" alt="" />
                    <h1>CRAZY TO GRAB RED ENVELOPES</h1>
                    <Button onClick={() => handleOpenRedPacket(curNew?.data?.id)} style={{ fontSize: ".18rem" }}>{t("ts867", { ns: "ts" })}</Button>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <HighlightOffIcon
                      style={{ color: "white", fontSize: ".5rem" }}
                      onClick={() => useSetEnvelopValue.setState({ envelopeValue: false })}
                      sx={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </Box>
          </Fade>
        </>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={enveOpen}
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
          <Fade in={enveOpen}>
            <Box className="giftBox">
              <div className="enveloped-container">
                <div className="main-red-enveloper">
                  <div className="">
                    <div className="rewardContainerLabel">
                      <span style={{ fontSize: ".4rem" }}>{t("ts872", { ns: "ts" })}</span>
                    </div>
                    <img src="/redfolderImages/redpacketOpen.png" alt="" />
                    <div className="rewardContainer">
                      <span style={{ fontSize: ".7rem" }}>{reward}</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <HighlightOffIcon
                        style={{ color: "white", fontSize: ".5rem" }}
                        onClick={closeModal}
                        sx={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Fade>
        </>
      </Modal>
    </div>
  );
}

export default EnvelopModal;
