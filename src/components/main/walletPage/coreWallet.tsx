
import MainLayout from "../../layout";
import CachedIcon from '@mui/icons-material/Cached';
import './coreWallet.css'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import { InputLabel, Select, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import CoreWalletMap from "./coreWalletMap";
import Header, { HeaderWithAction } from "../common/header";
import { IconButton } from '@mui/material';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { useGlobalVariables } from "../../globalFunctions/store";
import { useGetGamebalance } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";

export default function CoreWallet() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [exInfo, setExInfo] = useState([])
    const [score, setScore] = useState([])
    const [transferValue, setTransferValue] = useState<any>()
    const [exchangeInfo, setExchangeInfo] = useState<any[]>([])
    const [gameFrom, setGamefrom] = useState();
    const [gameTo, setGameTo] = useState();
    const userConfig = useGlobalVariables(state => state.userConfig)
    const getGamebalance = useGetGamebalance()

    const MenuProps = {
        PaperProps: {
            sx: {
                background: colorP.backGorund,
                color: colorP.text,
                "& em": {
                    fontSize: ".16rem",
                    color: "#68707b !important",
                },
                " .MuiButtonBase-root": {
                    fontSize: ".16rem",
                    color: "#68707b !important",
                }
            }
        },
    };

    useEffect(() => {
        getExInfo()
    }, [])

    async function getExInfo() {
        await axios.get('/userCenter/third/exchangePageInfo.do', {
            headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
        }).then((response) => {
            setExInfo(response.data.third)
            setScore(response.data.score)
        })
    }
    const handleFromchange = (e: any) => {
        setGamefrom(e)
    }
    const handleToChange = (e: any) => {
        setGameTo(e)
    }

    async function transferPOints() {
        const response = await axios.post('/thirdTrans/thirdRealTransMoney.do', {
            changeTo: gameTo,
            changeFrom: gameFrom,
            money: transferValue,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (response.data.success == false) {
            ToastrPngk({ msg: response.data.msg, type: 'error' })
        }
        else {
            ToastrPngk({ msg: response.data.msg, type: 'success' })

        }
    }
    const handleDepositInput = (value: any) => {
        setTransferValue(value)
    }

    useEffect(() => {
        getGamebalance.mutate({ platform: "" })
    }, [])

    return (
        <>
            <Loader setLoader={getGamebalance.isLoading} />
            <MainLayout>
                <section className="coreWalletSectionContainer">
                    <HeaderWithAction>{t("ts083", { ns: "ts" })}</HeaderWithAction>
                    <div className="balanceBanner" style={{ backgroundColor: colorP.backGorund }}>
                        <div className="transferInputContainer">
                            <Stack spacing={1} direction={"row"} alignItems={"center"}>
                                <FormControl size="small"
                                    sx={{
                                        minWidth: 250,
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: colorP.fourth + " !important",
                                                fontSize: ".18rem",
                                                borderRadius: "1rem",
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                color: colorP.text + " !important",
                                                fontSize: ".18rem"
                                            },
                                            height: ".5rem",
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important",
                                            fontSize: ".18rem",
                                            lineHeight: ".3rem"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            fontSize: ".18rem",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: colorP.forGround + " !important",
                                                fontSize: ".18rem"
                                            }
                                        },
                                        " .MuiSvgIcon-root": {
                                            width: ".25rem",
                                            color: "#313843 !important"
                                        }
                                    }}
                                >
                                    <InputLabel id="demo-select-small-label">{t("ts141", { ns: "ts" })}</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        displayEmpty
                                        value={gameFrom}
                                        name="fishing"
                                        label={t("ts141", { ns: "ts" })}
                                        onChange={(e) => handleFromchange(e.target.value)}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={"sys"}>
                                            <em>{t("ts404", { ns: "ts" })}</em>
                                        </MenuItem>
                                        {
                                            exInfo?.map((item: any, index: any) =>
                                                <MenuItem key={index} value={item.platform}>
                                                    <em>{item.name}</em>
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <span className="to" style={{ color: colorP.forGround }}>~</span>
                                <FormControl size="small"
                                    sx={{
                                        minWidth: 250,
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: colorP.fourth + " !important",
                                                fontSize: ".18rem",
                                                borderRadius: "1rem",
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                color: colorP.text4 + " !important",
                                                fontSize: ".18rem"
                                            },
                                            height: ".5rem",
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important",
                                            fontSize: ".18rem",
                                            lineHeight: ".3rem"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            fontSize: ".18rem",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: colorP.forGround + " !important",
                                                fontSize: ".18rem"
                                            }
                                        },
                                        " .MuiSvgIcon-root": {
                                            width: ".25rem",
                                            color: "#313843 !important"
                                        }
                                    }}
                                >
                                    <InputLabel id="demo-select-small-label">{t("ts141", { ns: "ts" })}</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        name="fishing"
                                        displayEmpty
                                        value={gameTo}
                                        label={t("ts141", { ns: "ts" })}
                                        onChange={(e) => handleToChange(e.target.value)}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={"sys"}>{t("ts404", { ns: "ts" })}</MenuItem>
                                        {
                                            exInfo?.map((item: any, index: any) =>
                                                <MenuItem key={index} value={item.platform}>
                                                    <em>{item.name}</em>
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                     sx={{
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: colorP.fourth + " !important",
                                                fontSize: ".18rem",
                                                borderRadius: "1rem",
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                color: colorP.text4 + " !important",
                                                fontSize: ".18rem"
                                            },
                                            height: ".5rem",
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important",
                                            fontSize: ".18rem",
                                            lineHeight: ".3rem"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            fontSize: ".18rem",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: colorP.forGround + " !important",
                                                fontSize: ".18rem"
                                            }
                                        }
                                    }}
                                    size="small" label={t("ts405", { ns: "ts" })} value={transferValue} onChange={(e) => handleDepositInput(e.target.value)} />
                                <div className="buttonContainer">
                                    <Button style={{ backgroundColor: colorP.forGround, fontWeight: 100, color: colorP.text2 }}  variant='contained' className="transferButton" onClick={transferPOints}>{t("ts083", { ns: "ts" })}</Button>
                                    {userConfig.thirdAutoExchange === true && < div className="notice" style={{ color: colorP.forGround }}>{t("ts142", { ns: "ts" })}</div>}
                                </div>
                            </Stack>
                        </div>
                    </div>
                    <div className="mainContentContainer">
                        <div className="rightContentConatainer">
                            <div className="contentScroll">
                                <div className="contentBody">
                                    {exInfo.map((value: any, index: any) =>
                                        <div key={index}>
                                            <CoreWalletMap getBalance={value.platform} value={value} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                <NotificationContainer />
            </MainLayout >
        </>
    )
}
