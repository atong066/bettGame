import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../../../../../globalFunctions/globalContext";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, TextField, FormControl, Button, Stack } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ToastrPngk } from "../../../../../../../../globalFunctions/toastr";
import axios from "axios";
import { useSaveUSDT } from "../../../../../../../../hooks/getUserInfoHook";

export default function USDTModal(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()

    const saveUSDT = useSaveUSDT()

    const bankUSDT = useRef<any>(null)
    const bankUSDTConfirm = useRef<any>(null)

    const submitUSDT = () => {
        if (bankUSDT?.current?.value.trim() === "" || bankUSDTConfirm?.current?.value.trim() === "") {
            ToastrPngk({ msg: t("ts709", { ns: "ts" }), type: "error" })
            return
        } else if (bankUSDT?.current?.value !== bankUSDTConfirm?.current?.value) {
            ToastrPngk({ msg: t("ts710", { ns: "ts" }), type: "error" })
            return
        } else {
            saveUSDT.mutate({
                bankCode: 'USDT',
                bankName: 'USDT',
                cardNo: bankUSDT?.current?.value
            })
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.openUSDT}
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
                <AppBar sx={{ position: 'relative', backgroundColor: "#1c1e23" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component={'span'}>
                            <label className="modalTitle" style={{ color: color.text }}>{t("ts205", { ns: "ts" })}</label>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={props.closeUSDT}
                            aria-label="close"
                            className="modalCloseCalendar"
                        >
                            <CloseIcon style={{ color: color.text, fontSize: ".22rem" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: "#1c1e23" }}>
                    <div className="usdtMainContainer">

                        <Stack spacing={2} direction={"column"}>
                            <FormControl sx={{ width: "100%" }}>
                                <TextField
                                    required
                                    autoComplete="off"
                                    margin="dense"
                                    size="small"
                                    label={t("ts205", { ns: "ts" })}
                                    fullWidth
                                    variant="outlined"
                                    id="cardNo"
                                    inputRef={bankUSDT}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: color.forGround + " !important",
                                                fontSize: ".18rem"
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                color: color.text + " !important",
                                                fontSize: ".18rem"
                                            },
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important",
                                            fontSize: ".18rem"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            fontSize: ".18rem",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: color.forGround + " !important",
                                                fontSize: ".18rem"
                                            }
                                        }
                                    }}
                                />
                                <TextField
                                    required
                                    autoComplete="off"
                                    margin="dense"
                                    size="small"
                                    label={t("ts721", { ns: "ts" })}
                                    fullWidth
                                    variant="outlined"
                                    id="cardNo"
                                    inputRef={bankUSDTConfirm}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: color.forGround + " !important",
                                                fontSize: ".18rem"
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                color: color.text + " !important",
                                                fontSize: ".18rem"
                                            },
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important",
                                            fontSize: ".18rem"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            fontSize: ".18rem",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: color.forGround + " !important",
                                                fontSize: ".18rem"
                                            }
                                        }
                                    }}
                                />

                            </FormControl>
                            <Button onClick={submitUSDT} style={{ backgroundColor: "#F0C059" }} className="modalButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                        </Stack>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}