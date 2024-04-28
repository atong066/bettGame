import { useEffect, useRef, useState } from 'react';
import './indexBankCardManager.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RealNameModal from './components/realNameModal';
import BadgeIcon from '@mui/icons-material/Badge';
import { Button, InputLabel, MenuItem, Select, Stack, TextField, Avatar, InputAdornment, FormControl } from '@mui/material';
import PhoneNumberModal from './components/phoneNumberModal';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { useBankAccounts, useGetBankList, useGetSecurityInfo, useGetUSDTList, useGetUserInfo, useSavePhoneNumber, useSaveRealName, useStationConfig } from '../../../../../../hooks/getUserInfoHook';
import { useButtonStates, useGlobalVariables, useModalStates } from '../../../../../../globalFunctions/store';
import AddCardModal from './components/addCardModal';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../../../../../globalFunctions/globalContext';
import axios from 'axios';
import { ToastrPngk } from '../../../../../../globalFunctions/toastr';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from '@mui/icons-material/Check';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ConfirmPassword from './components/passwordConfirmModal';
import CallToActionIcon from '@mui/icons-material/CallToAction';

export default function BankCardManager() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const userInformation = useGetUserInfo()
    const isRecentCard = useGlobalVariables(state => state.userConfig)
    const station = useGlobalVariables(state => state.stationConfig)
    const MenuProps = {
        PaperProps: {
            sx: {
                background: color.backGorund,
                color: color.text,
                "& em": {
                    fontSize: ".16rem",
                    color: "#68707b !important",
                },
                " .MuiButtonBase-root": {
                    fontSize: ".16rem",
                    color: color.text4 + "!important",
                }
            }
        },
    };
    const getUSDTList = useGetUSDTList()
    const usdtList = getUSDTList?.data?.data
    const getBankList = useGetBankList()
    const wihtdrawInfo = getBankList?.data?.data
    const getSecurityInfo = useGetSecurityInfo()
    const getInfo = getSecurityInfo?.data?.data
    const saveRealName = useSaveRealName()
    const savePhoneNumber = useSavePhoneNumber()
    const [otherBankName, showOtherBankName] = useState(false);
    const [bankName, setBankName] = useState('')
    const [bankCode, setBankCode] = useState('')
    const [bankList, setBankList] = useState([])
    const realName = useRef<any>(null)
    const bankAddress = useRef<any>(null)
    const cardNo = useRef<any>(null)
    const cardNoConfirm = useRef<any>(null)
    const otherBank = useRef<any>(null)
    const lastCardNo = useRef<any>(null)
    const lastRealName = useRef<any>(null)
    const extraInfo = useRef<any>(null)
    const [isData, setIsData] = useState(false)
    const [isCard, setIsCard] = useState(false)
    const [bankCard, setbankCard] = useState<any[]>([]);
    const realNameModal = useModalStates(state => state.realNameModal)


    const pixNumber = useRef<any>(null)
    const cpfNumber = useRef<any>(null)

    const closeRealName = () => {
        useModalStates.setState({ realNameModal: false })
        useModalStates.setState({ phoneModal: false })
    }
    const phoneModal = useModalStates(state => state.phoneModal)
    const closePhoneNumber = () => {
        useModalStates.setState({ phoneModal: false })
        useModalStates.setState({ realNameModal: false })
    }
    const bankCardModal = useModalStates(state => state.bankCardModal)
    const closeBankCard = () => {
        useModalStates.setState({ bankCardModal: false })
    }
    const openUSDTQR = () => {
        useModalStates.setState({ qrModal: true })
    }
    const addUSDT = () => {
        useModalStates.setState({ usdtCardModal: true })
    }

    const openPassConfirm = () => {
        useModalStates.setState({ withdrawPassModal: true })
    }

    // const openAddBank = () => {
    //     getSecurityInfo.refetch()
    //     if (getSecurityInfo.isLoading == false) {
    //         if (getInfo?.hasPhone == false) {
    //             useModalStates.setState({ phoneModal: true })
    //         } else if (getInfo?.hasRealName == false) {
    //             useModalStates.setState({ realNameModal: true })
    //         } else {
    //             useModalStates.setState({ bankCardModal: true })
    //         }
    //     }
    // }

    const realNameValue = useRef<any>(null)
    const phoneNumberValue = useRef<any>(null)
    const [showBankAddress, setShowBankAddress] = useState(true)
    const [showPixDetail, setShowPicDetail] = useState(false)
    const saveRealNameClick = () => {
        saveRealName.mutate({ realName: realNameValue?.current?.value })
    }
    const savePhoneNumberClick = () => {
        savePhoneNumber.mutate({
            newContact: phoneNumberValue?.current?.value,
            type: "phone"
        })
    }
    const staLang = useStationConfig()
    var lang = staLang?.data?.data?.staLang
    const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z-\-" "]+$/;
    const ALPHA_NUMERIC_DASH_REGEXNUM = /^[0-9-+\-"" ]+$/;
    const handleBankCode = (e: any, id: any) => {
        if (e.target.value == 'other') {
            showOtherBankName(true)
            setBankCode(e.target.value)
            setBankName('')
            setShowBankAddress(true)
            setShowPicDetail(false)
        } else if (e.target.value == 'PIX') {
            setBankCode(e.target.value)
            setBankName(id.props.children)
            showOtherBankName(false)
            setShowBankAddress(false)
            setShowPicDetail(true)
        } else {
            setBankCode(e.target.value)
            setBankName(id.props.children)
            showOtherBankName(false)
            setShowBankAddress(true)
            setShowPicDetail(false)
        }
    }
    const handleOtherBank = () => {
        setBankName(otherBank.current.value)
    }
    const [pixType, setPixType] = useState(1)
    const handlePix = (type: any) => {
        setPixType(type.target.value)
    }
    const bankLists = useBankAccounts()
    useEffect(() => {
        bankLists.refetch()
    }, [])
    // async function getData() {
    //     try {
    //         const response = await axios.get('/userCenter/userBank/list.do', {
    //             params: {
    //                 type: "bank"
    //             },
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //                 'X-Requested-With': 'XMLHttpRequest'
    //             }
    //         })
    //         if (response.data.banks != '') {
    //             setbankCard(response.data.banks);
    //             setIsData(true)
    //         } else {
    //             setIsData(false)
    //         }
    //         setBankList(response.data.bankList);
    //     } catch (error) {
    //         console.log(`error: ${error}`);
    //     }
    // }
    useEffect(() => {
        // getData();
        getSecurityInfo.refetch()
        setIsCard(isRecentCard?.isRecentCardValid)
    }, [phoneModal, realNameModal, bankCardModal])

    useEffect(() => {
        userInformation.refetch()
        useModalStates.setState({ usdtCardModal: false })
    }, [])
    useEffect(() => {
        getUSDTList.refetch()
        getBankList.refetch()
    }, [])
    async function saveBank() {
        if (cardNo?.current?.value == cardNoConfirm?.current?.value) {
            const response = await axios.post('/userCenter/userBank/bankAddSave.do', {
                bankCode: bankCode,
                bankName: bankName,
                realName: realName.current.value,
                bankAddress: station?.show_bank_address === true ? bankAddress?.current?.value : showBankAddress === true ? bankAddress?.current?.value : void (0),
                cardNo: showPixDetail === true ? (pixType === 4 ? cpfNumber?.current?.value : pixType === 1 ? pixNumber?.current?.value : "") : cardNo?.current?.value,
                lastRealName: bankLists.isLoading == false && isCard ? lastRealName?.current?.value : "",
                lastCardNo: bankLists.isLoading == false && isCard ? lastCardNo?.current?.value : "",
                pixType: showPixDetail === true ? pixType : void (0),
                phone: pixType === 4 ? cpfNumber?.current?.value : void (0),
                bankExtraInfo: station?.staLang === "in" ? extraInfo?.current?.value : void (0)
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            if (response.data.success == true) {
                setBankName('')
                setBankCode('')
                setShowPicDetail(false)
                setShowBankAddress(true)
                realName.current.value = null
                // pixNumber.current.value = null
                // cpfNumber.current.value = null
                // cardNo.current.value = null
                showPixDetail === false ? cardNoConfirm.current.value = null : void (0)
                useModalStates.setState({ bankCardModal: false })
                // getBankList.refetch()
                bankLists.refetch()
                ToastrPngk({ msg: response.data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: response.data.msg, type: "error" })
            }
        } else {
            ToastrPngk({ msg: t("ts708", { ns: "ts" }), type: "error" })
        }
    }

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    const [activeCard, setActiveCard] = useState(0)
    const activateCard = (index: any) => {
        setActiveCard(index)
    }

    const [activeUSDT, setActiveUSDT] = useState(0)
    const activateUSDT = (index: any, usdtCardNo: any) => {
        setActiveUSDT(index)
        openUSDTQR()
    }

    function masAccountNum(accNum: any) {
        return "******" + accNum.slice(6)
    }

    const accountNum = useButtonStates(state => state.showAccNumButton)

    return (
        <>
            <ConfirmPassword />
            <RealNameModal openRealName={realNameModal} closeRealName={closeRealName}>
                <div className="realNameInputContainer">
                    <FormControl>
                        <Stack spacing={2} direction={"column"}>
                            <div className="inputContainerBox" style={{ borderColor: color.forGround }}>
                                <div className="nameIconBox">
                                    <img src="/images/realName.png" alt="R" className="nameIcon" />
                                    <input onKeyDown={(event) => {
                                        if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }} ref={realNameValue} className="nameInput" type="text" placeholder={t("ts146", { ns: "ts" })} />
                                </div>
                            </div>
                            <Button onClick={saveRealNameClick} style={{ backgroundColor: color.forGround, fontWeight: 100, color: "#fff" }} className="modalButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                        </Stack>
                    </FormControl>
                </div>
            </RealNameModal>
            <PhoneNumberModal openPhoneNumber={phoneModal} closePhoneNumber={closePhoneNumber}>
                <div className="realNameInputContainer">
                    <FormControl>
                        <Stack spacing={2} direction={"column"}>
                            <div className="inputContainerBox" style={{ borderColor: color.forGround }}>
                                <div className="nameIconBox">
                                    <img src="/images/phone.png" alt="R" className="nameIcon" />
                                    <input ref={phoneNumberValue} className="nameInput" type="number" placeholder={t("ts296", { ns: "ts" })} />
                                </div>
                            </div>
                            <Button onClick={savePhoneNumberClick} style={{ backgroundColor: color.forGround, fontWeight: 100, color: "#fff" }} className="modalButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                        </Stack>
                    </FormControl>
                </div>
            </PhoneNumberModal>
            <AddCardModal openAddCard={bankCardModal} closeAddCard={closeBankCard}>
                <div className="realNameInputContainer">
                    <Stack spacing={3} direction={"column"}>
                        {/* isRecentCardValid */}
                        {isRecentCard?.isRecentCardValid == true && bankLists.isLoading === false && bankLists?.data?.banks?.length !== 0 &&
                            <Stack spacing={2} direction={"column"}>
                                <span style={{ color: color.forGround, fontSize: ".16rem" }}>{t("ts718", { ns: "ts" })}</span>
                                <form noValidate>
                                    <FormControl sx={{ width: "100%", "input::placeholder": { color: color.text4 + "!important" } }}>
                                        <TextField
                                            autoComplete="off"
                                            onKeyDown={(event) => {
                                                if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            margin="dense"
                                            size="small"
                                            placeholder={t("ts1144", { ns: "ts" })}
                                            fullWidth
                                            variant="outlined"
                                            id="realName"
                                            inputRef={lastRealName}
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start">
                                                        <img src="/images/realName.png" style={{ width: ".22rem" }} alt="U" />
                                                    </InputAdornment>
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: color.fourth + " !important",
                                                        fontSize: ".16rem"
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        color: color.text4 + " !important",
                                                        fontSize: ".16rem"
                                                    },
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: "#808080 !important",
                                                    fontSize: ".16rem"
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: ".1rem",
                                                },
                                                "& .MuiOutlinedInput-root.Mui-focused": {
                                                    fontSize: ".16rem",
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: "2px solid !important",
                                                        borderColor: color.forGround + " !important",
                                                        fontSize: ".16rem"
                                                    }
                                                },
                                                " .MuiSvgIcon-root": {
                                                    width: ".3rem",
                                                    height: ".3rem",
                                                    color: "#68707b"
                                                }
                                            }}
                                        />
                                        <TextField
                                            autoComplete="off"
                                            margin="dense"
                                            size="small"
                                            placeholder={t("ts720", { ns: "ts" })}
                                            fullWidth
                                            variant="outlined"
                                            id="cardNo"
                                            inputRef={lastCardNo}
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start">
                                                        <img src="/images/icon-userinfo.1c82a9c.png" style={{ width: ".22rem" }} alt="U" />
                                                    </InputAdornment>
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: color.fourth + " !important",
                                                        fontSize: ".16rem"
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        color: color.text4 + " !important",
                                                        fontSize: ".16rem"
                                                    },
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: "#808080 !important",
                                                    fontSize: ".16rem"
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: ".1rem",
                                                },
                                                "& .MuiOutlinedInput-root.Mui-focused": {
                                                    fontSize: ".16rem",
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: "2px solid !important",
                                                        borderColor: color.forGround + " !important",
                                                        fontSize: ".16rem"
                                                    }
                                                },
                                                " .MuiSvgIcon-root": {
                                                    width: ".3rem",
                                                    height: ".3rem",
                                                    color: "#68707b"
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </form>
                            </Stack>
                        }


                        <Stack spacing={2} direction={"column"}>
                            <FormControl
                                size="small"
                                sx={{
                                    minWidth: 255,
                                    fontSize: ".16rem",
                                    color: "#68707b !important",
                                    "& .MuiPaper-root": {
                                        background: color.backGorund,
                                        fontSize: ".16rem",
                                        color: "#68707b !important",
                                    },
                                    "& fieldset": {
                                        borderColor: color.fourth + " !important",
                                        "& legend": {
                                            "& span": {
                                                color: color.text4 + "!important"
                                            }
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: ".1rem",
                                    },
                                    "& label": {
                                        fontSize: ".16rem",
                                        color: color.text4 + "!important",
                                    },
                                    "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        borderColor: color.forGround + "!important",
                                    }, "& .MuiInputBase-root": {
                                        color: "#68707b !important",
                                        fontSize: ".16rem"
                                    }, "& .MuiSvgIcon-root": {
                                        color: "#68707b !important",
                                        width: ".15em",
                                    },
                                    " .MuiSelect-select": {
                                        color: color.text4 + "!important",
                                    },
                                    marginTop: ".06rem !important",
                                    "input::placeholder": { color: color.text4 + "!important" }
                                }}
                            >
                                <InputLabel id="demo-simple-select-label">{t("ts682", { ns: "ts" })}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="bank"
                                    value={bankCode}
                                    label={t("ts682", { ns: "ts" })}
                                    onChange={handleBankCode}
                                    MenuProps={MenuProps}
                                >
                                    {bankLists?.data?.bankList?.map((value: any, index: any) =>
                                        <MenuItem key={index} value={value.code}>{value.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            {showPixDetail == true ?
                                <Stack spacing={2} direction={"column"}>
                                    <FormControl
                                        size="small"
                                        sx={{
                                            minWidth: 255,
                                            fontSize: ".16rem",
                                            color: "#68707b !important",
                                            "& .MuiPaper-root": {
                                                background: color.backGorund,
                                                fontSize: ".16rem",
                                                color: "#68707b !important",
                                            },
                                            "& fieldset": {
                                                borderColor: color.fourth + " !important",
                                                "& legend": {
                                                    "& span": {
                                                        color: color.forGround + " !important"
                                                    }
                                                }
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: ".1rem",
                                            },
                                            "& label": {
                                                fontSize: ".16rem",
                                                color: color.text4 + "!important",
                                            },
                                            "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                borderColor: color.forGround + "!important",
                                            }, "& .MuiInputBase-root": {
                                                color: "#68707b !important",
                                                fontSize: ".16rem"
                                            }, "& .MuiSvgIcon-root": {
                                                color: "#68707b !important",
                                                width: ".15em",
                                            },
                                            " .MuiSelect-select": {
                                                color: color.text4 + "!important",
                                            },
                                            marginTop: ".06rem !important",
                                            "input::placeholder": { color: color.text4 + "!important" }
                                        }}
                                    >

                                        <Stack spacing={2} direction={"column"}>
                                            <TextField
                                                autoComplete="off"
                                                onKeyDown={(event) => {
                                                    if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                margin="dense"
                                                size="small"
                                                placeholder={t("ts1144", { ns: "ts" })}
                                                fullWidth
                                                variant="outlined"
                                                id="realName"
                                                inputRef={realName}
                                                InputProps={{
                                                    startAdornment:
                                                        <InputAdornment position="start">
                                                            <img src="/images/realName.png" style={{ width: ".25rem" }} />
                                                        </InputAdornment>
                                                }}
                                                sx={{
                                                    "& .MuiInputBase-root": {
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: color.fourth + " !important",
                                                            fontSize: ".16rem"
                                                        },
                                                        "& .MuiOutlinedInput-input": {
                                                            color: color.text4 + " !important",
                                                            fontSize: ".16rem"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: ".1rem",
                                                    },
                                                    "& .MuiFormLabel-root": {
                                                        color: "#808080 !important",
                                                        fontSize: ".16rem"
                                                    },
                                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                                        fontSize: ".16rem",
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            border: "2px solid !important",
                                                            borderColor: color.forGround + " !important",
                                                            fontSize: ".16rem"
                                                        }
                                                    },
                                                    " .MuiSvgIcon-root": {
                                                        width: ".3rem",
                                                        height: ".3rem",
                                                        color: "#68707b"
                                                    }
                                                }}
                                            />
                                            {/* <InputLabel id="demo-simple-select-label">{t("ts682", { ns: "ts" })}</InputLabel> */}
                                            <Select
                                                // labelId="demo-simple-select-label"
                                                id="bank"
                                                value={pixType}
                                                // label={t("ts682", { ns: "ts" })}
                                                onChange={handlePix}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            background: color.backGorund,
                                                            color: color.text4,
                                                            "& em": {
                                                                fontSize: ".16rem",
                                                                color: "#68707b !important",
                                                            },
                                                            " .MuiButtonBase-root": {
                                                                fontSize: ".16rem",
                                                                color: color.text4 + "!important",
                                                            }
                                                        }
                                                    },
                                                }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <img src="/images/username.png" style={{ width: ".25rem" }} />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value={1}>CPF</MenuItem>
                                                <MenuItem value={4}>PHONE</MenuItem>
                                            </Select>
                                            {pixType == 4 &&
                                                <TextField
                                                    autoComplete="off"
                                                    margin="dense"
                                                    size="small"
                                                    placeholder={t('ts1205', { ns: 'ts' })}
                                                    fullWidth
                                                    variant="outlined"
                                                    id="cardNo"
                                                    type="text"
                                                    onKeyDown={(event) => {
                                                        if (!ALPHA_NUMERIC_DASH_REGEXNUM.test(event.key) && event.key !== "Backspace") {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    inputProps={{
                                                        maxlength: 14,
                                                    }}
                                                    inputRef={cpfNumber}
                                                    InputProps={{
                                                        startAdornment:
                                                            <InputAdornment position="start">
                                                                <img src="/images/PIX_icon_30X30.png" style={{ width: ".25rem" }} />
                                                            </InputAdornment>
                                                    }}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: color.fourth + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-input": {
                                                                color: color.text4 + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: ".1rem",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#808080 !important",
                                                            fontSize: ".16rem"
                                                        },
                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                            fontSize: ".16rem",
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                border: "2px solid !important",
                                                                borderColor: color.forGround + " !important",
                                                                fontSize: ".16rem"
                                                            }
                                                        },
                                                        " .MuiSvgIcon-root": {
                                                            width: ".3rem",
                                                            height: ".3rem",
                                                            color: "#68707b"
                                                        }
                                                    }}
                                                />}
                                            {pixType == 1 &&
                                                <TextField
                                                    autoComplete="off"
                                                    margin="dense"
                                                    size="small"
                                                    placeholder={t('ts1206', { ns: 'ts' })}
                                                    fullWidth
                                                    inputRef={pixNumber}
                                                    type="text"
                                                    onKeyDown={(event) => {
                                                        if (!ALPHA_NUMERIC_DASH_REGEXNUM.test(event.key) && event.key !== "Backspace") {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    inputProps={{
                                                        maxlength: 11,
                                                    }}
                                                    InputProps={{
                                                        startAdornment:
                                                            <InputAdornment position="start">
                                                                <img src="/images/CPF2_icon_30X30.png" style={{ width: ".25rem" }} />
                                                            </InputAdornment>
                                                    }}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: color.fourth + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-input": {
                                                                color: color.text4 + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: ".1rem",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#808080 !important",
                                                            fontSize: ".16rem"
                                                        },
                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                            fontSize: ".16rem",
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                border: "2px solid !important",
                                                                borderColor: color.forGround + " !important",
                                                                fontSize: ".16rem"
                                                            }
                                                        },
                                                        " .MuiSvgIcon-root": {
                                                            width: ".3rem",
                                                            height: ".3rem",
                                                            color: "#68707b"
                                                        }
                                                    }}
                                                />}
                                            {showPixDetail == true && pixType === 4 &&
                                                <span className="pixLabel">
                                                    {t("ts1143", { ns: "ts" })}
                                                </span>
                                            }
                                        </Stack>
                                    </FormControl>
                                </Stack>
                                :
                                (
                                    <form noValidate>
                                        <FormControl sx={{ width: "100%", "input::placeholder": { color: color.text4 + "!important" } }}>
                                            <Stack spacing={2} direction={"column"}>
                                                <TextField
                                                    autoComplete="off"
                                                    onKeyDown={(event) => {
                                                        if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    margin="dense"
                                                    size="small"
                                                    placeholder={t("ts1144", { ns: "ts" })}
                                                    fullWidth
                                                    variant="outlined"
                                                    id="realName"
                                                    inputRef={realName}
                                                    InputProps={{
                                                        startAdornment:
                                                            <InputAdornment position="start">
                                                                <img src="/images/realName.png" style={{ width: ".22rem" }} alt="U" />
                                                            </InputAdornment>
                                                    }}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: color.fourth + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-input": {
                                                                color: color.text4 + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: ".1rem",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#808080 !important",
                                                            fontSize: ".16rem"
                                                        },
                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                            fontSize: ".16rem",
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                border: "2px solid !important",
                                                                borderColor: color.forGround + " !important",
                                                                fontSize: ".16rem"
                                                            }
                                                        },
                                                        " .MuiSvgIcon-root": {
                                                            width: ".3rem",
                                                            height: ".3rem",
                                                            color: "#68707b"
                                                        }
                                                    }}
                                                />
                                                {/* Bank Address */}
                                                {station?.show_bank_address === true && showBankAddress == true &&
                                                    <TextField
                                                        autoComplete="off"
                                                        onKeyDown={(event) => {
                                                            if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        margin="dense"
                                                        size="small"
                                                        placeholder={t("ts976", { ns: "ts" })}
                                                        fullWidth
                                                        variant="outlined"
                                                        id="realName"
                                                        inputRef={bankAddress}
                                                        InputProps={{
                                                            startAdornment:
                                                                <InputAdornment position="start">
                                                                    <AccountBalanceIcon style={{ width: ".25rem" }} />
                                                                </InputAdornment>
                                                        }}
                                                        sx={{
                                                            "& .MuiInputBase-root": {
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    borderColor: color.fourth + " !important",
                                                                    fontSize: ".16rem"
                                                                },
                                                                "& .MuiOutlinedInput-input": {
                                                                    color: color.text4 + " !important",
                                                                    fontSize: ".16rem"
                                                                },
                                                            },
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: ".1rem",
                                                            },
                                                            "& .MuiFormLabel-root": {
                                                                color: "#808080 !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-root.Mui-focused": {
                                                                fontSize: ".16rem",
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    border: "2px solid !important",
                                                                    borderColor: color.forGround + " !important",
                                                                    fontSize: ".16rem"
                                                                }
                                                            },
                                                            " .MuiSvgIcon-root": {
                                                                width: ".3rem",
                                                                height: ".3rem",
                                                                color: "#68707b"
                                                            }
                                                        }}
                                                    />
                                                }
                                                {otherBankName &&
                                                    (<TextField
                                                        autoComplete="off"
                                                        margin="dense"
                                                        size="small"
                                                        placeholder={t("ts682", { ns: "ts" })}
                                                        fullWidth
                                                        variant="outlined"
                                                        id="cardNo"
                                                        onChange={handleOtherBank}
                                                        inputRef={otherBank}
                                                        InputProps={{
                                                            startAdornment:
                                                                <InputAdornment position="start">
                                                                    <AccountBalanceWalletIcon style={{ width: ".25rem" }} />
                                                                </InputAdornment>
                                                        }}
                                                        sx={{
                                                            "& .MuiInputBase-root": {
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    borderColor: color.fourth + " !important",
                                                                    fontSize: ".16rem"
                                                                },
                                                                "& .MuiOutlinedInput-input": {
                                                                    color: color.text4 + " !important",
                                                                    fontSize: ".16rem"
                                                                },
                                                            },
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: ".1rem",
                                                            },
                                                            "& .MuiFormLabel-root": {
                                                                color: "#808080 !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-root.Mui-focused": {
                                                                fontSize: ".16rem",
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    border: "2px solid !important",
                                                                    borderColor: color.forGround + " !important",
                                                                    fontSize: ".16rem"
                                                                }
                                                            },
                                                            " .MuiSvgIcon-root": {
                                                                width: ".3rem",
                                                                height: ".3rem",
                                                                color: "#68707b"
                                                            }
                                                        }}
                                                    />)}
                                                <TextField
                                                    autoComplete="off"
                                                    margin="dense"
                                                    size="small"
                                                    placeholder={showPixDetail === false ? t("ts201", { ns: "ts" }) : t("ts1141", { ns: "ts" })}
                                                    fullWidth
                                                    variant="outlined"
                                                    id="cardNo"
                                                    inputRef={cardNo}
                                                    InputProps={{
                                                        startAdornment:
                                                            <InputAdornment position="start">
                                                                <CreditCardIcon style={{ width: ".25rem" }} />
                                                            </InputAdornment>
                                                    }}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: color.fourth + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-input": {
                                                                color: color.text4 + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: ".1rem",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#808080 !important",
                                                            fontSize: ".16rem"
                                                        },
                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                            fontSize: ".16rem",
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                border: "2px solid !important",
                                                                borderColor: color.forGround + " !important",
                                                                fontSize: ".16rem"
                                                            }
                                                        },
                                                        " .MuiSvgIcon-root": {
                                                            width: ".3rem",
                                                            height: ".3rem",
                                                            color: "#68707b"
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    autoComplete="off"
                                                    margin="dense"
                                                    size="small"
                                                    placeholder={showPixDetail === false ? t("ts717", { ns: "ts" }) : t("ts1142", { ns: "ts" })}
                                                    fullWidth
                                                    variant="outlined"
                                                    id="confirmBank"
                                                    inputRef={cardNoConfirm}
                                                    InputProps={{
                                                        startAdornment:
                                                            <InputAdornment position="start">
                                                                <CreditCardIcon style={{ width: ".25rem" }} />
                                                            </InputAdornment>
                                                    }}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: color.fourth + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-input": {
                                                                color: color.text4 + " !important",
                                                                fontSize: ".16rem"
                                                            },
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: ".1rem",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#808080 !important",
                                                            fontSize: ".16rem"
                                                        },
                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                            fontSize: ".16rem",
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                border: "2px solid !important",
                                                                borderColor: color.forGround + " !important",
                                                                fontSize: ".16rem"
                                                            }
                                                        },
                                                        " .MuiSvgIcon-root": {
                                                            width: ".3rem",
                                                            height: ".3rem",
                                                            color: "#68707b"
                                                        },
                                                    }}
                                                />
                                                {station?.staLang === "in" &&
                                                    <TextField
                                                        autoComplete="off"
                                                        margin="dense"
                                                        size="small"
                                                        placeholder={t("ts1218", { ns: "ts" })}
                                                        fullWidth
                                                        variant="outlined"
                                                        id="confirmBank"
                                                        inputRef={extraInfo}
                                                        type="text"
                                                        inputProps={{
                                                            maxlength: 11,
                                                        }}
                                                        InputProps={{
                                                            startAdornment:
                                                                <InputAdornment position="start">
                                                                    <CallToActionIcon style={{ width: ".25rem" }} />
                                                                </InputAdornment>
                                                        }}
                                                        sx={{
                                                            "& .MuiInputBase-root": {
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    borderColor: color.fourth + " !important",
                                                                    fontSize: ".16rem"
                                                                },
                                                                "& .MuiOutlinedInput-input": {
                                                                    color: color.text4 + " !important",
                                                                    fontSize: ".16rem"
                                                                },
                                                            },
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: ".1rem",
                                                            },
                                                            "& .MuiFormLabel-root": {
                                                                color: "#808080 !important",
                                                                fontSize: ".16rem"
                                                            },
                                                            "& .MuiOutlinedInput-root.Mui-focused": {
                                                                fontSize: ".16rem",
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    border: "2px solid !important",
                                                                    borderColor: color.forGround + " !important",
                                                                    fontSize: ".16rem"
                                                                }
                                                            },
                                                            " .MuiSvgIcon-root": {
                                                                width: ".3rem",
                                                                height: ".3rem",
                                                                color: "#68707b"
                                                            },
                                                        }}
                                                    />
                                                }
                                            </Stack>
                                        </FormControl>
                                    </form>
                                )}
                            <FormControl sx={{ width: "100%" }}>
                                <Button onClick={saveBank} style={{ backgroundColor: color.forGround, fontWeight: 100, color: color.text2 }} className="modalButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                            </FormControl>

                        </Stack>
                    </Stack>
                </div>
            </AddCardModal>

            <div className="bankCardAddMainContainer">
                <div className="selectBankTypeContainer">
                    <div className="typeLabelBox">
                        <span className="bankLabel" style={{ textTransform: "capitalize", color: color.text4 }}>{t("ts184", { ns: "ts" })}</span>
                        <span className="bankLabel"></span>
                    </div>
                    <div className="bankTypeBoxes">
                        {bankLists.isLoading === false && bankLists?.data?.banks?.map((value: any, index: any) =>
                            <div className="checkContainer" key={index}>
                                <div className={activeCard == index ? "bankMainBox active" : "bankMainBox"} style={activeCard == index ? { borderColor: color.forGround } : { borderColor: color.fourth }} onClick={() => activateCard(index)}>
                                    <div className="bankIconBox">
                                        <img src="/withdrawImages/bankIcon.png" className="bankIcon" />
                                        <div className="bankInfoBOx">
                                            <span className="additionalAddLabel" style={{ textTransform: "uppercase", color: color.text4 }}>{value.bankName}{value?.pixType === 1 ? <span style={{
                                                fontSize: ".16rem",
                                                color: "#68707B"
                                            }}>(CPF)</span> : value?.pixType === 4 ? <span style={{
                                                fontSize: ".16rem",
                                                color: "#68707B"
                                            }}>(PHONE)</span> : ""}</span>
                                            <span className="additionalAddLabel accountCard" style={{ textTransform: "uppercase", color: color.text4 }}><div className="copyID">{value.cardNo ? accountNum == true ? value.cardNo : masAccountNum(value.cardNo) : "-"} {value.cardNo && accountNum == true && <ContentCopyIcon style={{ color: color.forGround }} className="copyIcon" onClick={() => copyText(value.cardNo)} />}</div></span>
                                        </div>
                                    </div>
                                </div>
                                <div className={activeCard == index ? "badge active" : "badge"} style={activeCard == index ? { backgroundColor: color.forGround } : {}}>
                                    <Avatar style={{ background: "transparent", width: ".2rem", height: ".2rem", color: color.text2 }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: ".25rem", height: ".3rem", color: color.text2 }}></CheckIcon></Avatar>
                                </div>
                            </div>
                        )}
                        <div className="bankMainBox" onClick={openPassConfirm} style={{ borderColor: color.fourth }}>
                            <div className="bankIconBox">
                                <img src="/withdrawImages/bankIcon.png" className="bankIcon" />
                                <span className="additionalAddLabel" style={{ textTransform: "uppercase", color: color.text4 }}>{t("ts1217", { ns: "ts" })}</span>
                            </div>
                            <div className="bankArrowBox">
                                <ArrowForwardIosIcon sx={{ color: color.fourth + " !important", }} className="arrowIcon" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="selectBankTypeContainer">
                    <div className="typeLabelBox">
                        <span className="bankLabel" style={{ textTransform: "capitalize" }}>{t("ts185", { ns: "ts" })}</span>
                        <span className="bankLabel"></span>
                    </div>
                    <div className="bankTypeBoxes">
                        {usdtList?.length !== 0 && usdtList?.banks?.map((value: any, index: any) =>
                            <div className="checkContainer">
                                <div className={activeUSDT == index ? "bankMainBox active" : "bankMainBox"} onClick={() => activateUSDT(index, value.cardNo)}>
                                    <div className="bankIconBox">
                                        <img src="/withdrawImages/bankIcon.png" className="bankIcon" />
                                        <div className="bankInfoBOx">
                                            <span className="additionalAddLabel accountCard" style={{ textTransform: "uppercase" }}><div className="copyID">{value.cardNo ? value.cardNo : "-"} {value.cardNo && <ContentCopyIcon style={{ color: color.forGround }} className="copyIcon" onClick={() => copyText(value.cardNo)} />}</div></span>
                                        </div>
                                    </div>
                                </div>
                                <div className={activeUSDT == index ? "badge active" : "badge"}>
                                    <Avatar style={{ background: "transparent", width: ".2rem", height: ".2rem", color: "#f0c059" }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: ".3rem", height: ".3rem" }}></CheckIcon></Avatar>
                                </div>
                            </div>
                        )}
                        <div className="bankMainBox" onClick={addUSDT}>
                            <div className="bankIconBox">
                                <img src="/withdrawImages/bankIcon.png" className="bankIcon" />
                                <span className="additionalAddLabel" style={{ textTransform: "uppercase" }}>{t("ts197", { ns: "ts" })} TRON USDT(TRC20)</span>
                            </div>
                            <div className="bankArrowBox">
                                <ArrowForwardIosIcon className="arrowIcon" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}