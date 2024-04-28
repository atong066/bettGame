import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import "./redEnvelope.css";
import EnvelopModal from './redEnvelper';


function GiftyModals(props: any) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={props.handleOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClick={props.handleOpenModal}
      >
        <Box className="modalBox">
          <EnvelopModal />
        </Box>
      </Modal>
    </div>
  );
}

export default GiftyModals;
