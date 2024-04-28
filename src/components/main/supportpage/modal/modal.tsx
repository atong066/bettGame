import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../../globalFunctions/globalContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ModalDialog(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    return (
        <React.Fragment>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={props.openModal}
                fullWidth={true}
                sx={{
                    "& .MuiDialogActions-root": {
                        backgroundColor: colorP.third
                    },
                    "& .MuiDialogContent-root": {
                        backgroundColor: colorP.backGorund
                    },
                    "& span": {
                        color: colorP.text
                    },
                }}
            >
                <DialogTitle align='center' sx={{ m: 0, p: 2, color: colorP.forGround, backgroundColor: colorP.third }} id="customized-dialog-title">
                    {props.supportTitle}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.closeModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom
                        sx={{
                            span:{
                                color: "#fff !important"
                            },
                            div: {
                                color: "#fff !important"
                            },
                        }}
                    >
                        <div style={{ color: colorP.text }} dangerouslySetInnerHTML={{ __html: props.notifContent }} />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={props.closeModal}
                        sx={{
                            backgroundColor: colorP.backGorund + " !important",
                            color: colorP.text + " !important",
                            border: "thin solid " + colorP.forGround + " !important",
                        }}
                    >
                        {t("ts408", { ns: "ts" })}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}