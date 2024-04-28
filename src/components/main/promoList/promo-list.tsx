import Stack from "@mui/material/Stack";
import MainLayout from "../../layout";
import './promo-list.css'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte, UserUSerConfig, UserUSerConfig2, UserUSerConfigMain, useBalance } from "../../globalFunctions/globalContext";
import Loader from "../../backdropLoader/backdrop-loader";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { useGetUserAllInfo, useGetUserVIP } from "../../hooks/getUserInfoHook";

export default function PromoList() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [setLoader, setOpenLoader] = useState(true);

    const getVip = useGetUserVIP()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);
    const handleMouseDownPasswordConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [promoList, setPromoList] = useState<any[]>([])

    const [username, setLoginAccount] = useState([])
    const [password, setLoginPassword] = useState([])
    const [confirmPassword, setConfirmLoginPassword] = useState([])

    const loginAccount = (res: any) => {
        setLoginAccount(res)
    };
    const loginPassword = (res: any) => {
        setLoginPassword(res)
    };
    const confirmLoginPassword = (res: any) => {
        setConfirmLoginPassword(res)
    };

    useEffect(() => {
        getPromList()
    }, [])

    useEffect(() => {
    }, [promoList])

    async function getPromList() {
        setOpenLoader(true)
        const response = await axios.get('/userCenter/agentManage/recommendInfo.do', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        setPromoList(current => [...current, response.data])
        setOpenLoader(false)

    }
    let level = getVip?.data?.data.curDegreeLevel
    const medals = level == 0 ? '' : level < 6 ? 1 : level < 11 ? 2 : level < 14 ? 3 : level < 16 ? 4 : 0

    async function saveUser() {
        setOpenLoader(true)

        const response = await axios.post('/userCenter/agentManage/recommendAddMember.do', {
            username: username,
            pwd: password,
            rpwd: confirmPassword,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (response.data.success == true) {
            setLoginAccount([])
            setLoginPassword([])
            setConfirmLoginPassword([])
            ToastrPngk({ msg: response.data.msg, type: 'success' })

            setOpenLoader(false)
        }
        else {
            ToastrPngk({ msg: response.data.msg, type: 'error' })
            setOpenLoader(false)

        }
    }
    const registerUser = () => {
        saveUser()
    }

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    const getType = (type: any) => {
        if (type == 1) {
            return t("ts357", { ns: ["ts"] })
        } else if (type == 2) {
            return t("ts275", { ns: ["ts"] })
        } else if (type == 3) {
            return t("ts276", { ns: ["ts"] })
        }
    }

    return (
        <>
            <Loader setLoader={setLoader}></Loader>
            <section className="promoListMainContainer">
                <div className="promoListMainBody">
                    <div className="promoListOuterBox" style={{ borderColor: "#313843", backgroundColor: color.third }}>
                        <div className="promoLabelBox"><strong><label className="promoTitle">{t("ts449", { ns: "ts" })}</label></strong></div>
                        <div className="imageBox">
                            <div className="medalContainer" style={{ backgroundImage: 'url("/vipImages/medalLevel' + medals + '.png")' }}>
                                <div className="medalRibbonContainer" style={{ backgroundImage: 'url("/vipImages/ribbonLevel' + level + '.png")' }}>
                                    <span className="vipLevel">{level}</span>
                                </div>
                            </div>
                        </div>
                        <div className="promoLabelBox"><strong><label style={{ color: color.forGround }} className="vipContent">{getVip?.data?.data.curDegreeName}</label></strong></div>
                        <div className="promoLabelBox"><span style={{ color: "#adb6c3" }}>{t("ts732", { ns: "ts" })}:</span><strong><label style={{ color: color.forGround }} className="usernameContent"><span style={{ display: "flex", alignItems: "center", gap: ".05rem" }}>{promoList[0] ? promoList[0].username : ""} <img src="/navbarImages/copy.png" onClick={() => copyText(promoList[0] ? promoList[0].username : "")} style={{ width: ".2rem", cursor: "pointer" }} /></span></label></strong></div>
                        <div className="promoLabelBox"><span style={{ color: "#adb6c3" }}>{t("ts733", { ns: "ts" })}:</span><strong><label style={{ color: color.forGround }} className="promoteCodeContent">{promoList[0] ? promoList[0].code : ""}</label></strong></div>
                        <div className="promoLabelBox"><span style={{ color: "#adb6c3" }}>{t("ts734", { ns: "ts" })}:</span><strong><label style={{ color: color.forGround }} className="timeContent">{promoList[0] ? promoList[0].createTime : ""}</label></strong></div>
                    </div>
                    <div className="promoListOuterBox" style={{ borderColor: "#313843", backgroundColor: color.third }}>
                        <div className="promoLabelBox"><strong><label className="promoTitle">{t("ts730", { ns: "ts" })}</label></strong></div>
                        <hr className="lineDiv" style={{ borderColor: color.forGround }} />
                        <div className="promoLabelBox promoLinkBox"><span style={{ color: "#adb6c3" }}>{t("ts735", { ns: "ts" })}:</span><strong><label style={{ color: "#04BE02" }} className="promoteLinkContent">{promoList[0] ? promoList[0].linkUrl : ""}</label></strong></div>
                        <div className="promoLabelBox promoLinkBox"><span style={{ color: "#adb6c3" }}>{t("ts736", { ns: "ts" })}:</span><strong><label style={{ color: "#04BE02" }} className="encryptedPromoLinkContent">{promoList[0] ? promoList[0].linkUrlEn : ""}</label></strong></div>
                        <hr className="lineDiv" style={{ borderColor: color.forGround }} />
                        <div className="promoLabelBox"><span style={{ color: "#adb6c3" }}>{t("ts737", { ns: "ts" })}:</span><strong><label style={{ color: color.forGround }} className="promoPageContent">{promoList[0] ? getType(promoList[0].accessPage) : ""}</label></strong></div>
                        <div className="promoLabelBox"><span style={{ color: "#adb6c3" }}>{t("ts738", { ns: "ts" })}:</span><strong><label style={{ color: color.forGround }} className="visitorContent">{promoList[0] ? promoList[0].accessNum : ""}</label></strong></div>
                        <div className="promoLabelBox"><span style={{ color: "#adb6c3" }}>{t("ts739", { ns: "ts" })}:</span><strong><label style={{ color: color.forGround }} className="registersContent">{promoList[0] ? promoList[0].registerNum : ""}</label></strong></div>
                    </div>
                    <div className="promoListOuterBox" style={{ borderColor: "#313843", backgroundColor: color.third }}>
                        <div className="promoLabelBox"><strong><label className="promoTitle">{t("ts731", { ns: "ts" })}</label></strong></div>
                        <Stack spacing={2} direction={'column'} alignItems={'center'} sx={{ '& .MuiTextField-root': { width: '30ch' } }}>
                            <FormControl size="small" sx={{
                                "& .MuiInputBase-root": {
                                    width: "2.9rem",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: color.forGround + " !important",
                                        fontSize: ".18rem"
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        color: color.text4 + " !important",
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
                                },
                                " .MuiSvgIcon-root": {
                                    width: ".3rem",
                                    height: ".3rem",
                                    color: "#68707b"
                                }
                            }} variant="outlined" required>
                                <InputLabel htmlFor="outlined-adornment-password">{t("ts277", { ns: "ts" })}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    onChange={(res) => loginAccount(res.target.value)}
                                    value={username}
                                    label={t("ts277", { ns: "ts" })}
                                    size="small"
                                    required
                                />
                            </FormControl>
                            <FormControl size="small" sx={{
                                "& .MuiInputBase-root": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: color.forGround + " !important",
                                        fontSize: ".18rem"
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        color: color.text4 + " !important",
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
                                },
                                " .MuiSvgIcon-root": {
                                    width: ".3rem",
                                    height: ".3rem",
                                    // color: "#68707b"
                                }
                            }} variant="outlined" required>
                                <InputLabel htmlFor="outlined-adornment-password">{t("ts278", { ns: "ts" })}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility sx={{ color: color.forGround }} /> : <VisibilityOff sx={{ color: color.fourth }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(res) => loginPassword(res.target.value)}
                                    label={t("ts278", { ns: "ts" })}
                                    size="small"
                                    required
                                    value={password}
                                />
                            </FormControl>
                            <FormControl sx={{
                                "& .MuiInputBase-root": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: color.forGround + " !important",
                                        fontSize: ".18rem"
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        color: color.text4 + " !important",
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
                                },
                                " .MuiSvgIcon-root": {
                                    width: ".3rem",
                                    height: ".3rem",
                                    // color: "#68707b"
                                }
                            }} size="small" variant="outlined" required>
                                <InputLabel htmlFor="outlined-adornment-password">{t("ts279", { ns: "ts" })}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirm}
                                                onMouseDown={handleMouseDownPasswordConfirm}
                                                edge="end"
                                            >
                                                {showPasswordConfirm ? <Visibility sx={{ color: color.forGround }} /> : <VisibilityOff sx={{ color: color.fourth }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(res) => confirmLoginPassword(res.target.value)}
                                    label={t("ts279", { ns: "ts" })}
                                    size="small"
                                    required
                                    value={confirmPassword}
                                />
                            </FormControl>
                            <Button style={{ color: color.text2, backgroundColor: color.forGround }} className="regButton" onClick={registerUser} variant="contained" >{t("ts001", { ns: "ts" })}</Button>
                        </Stack>
                    </div>
                </div>
            </section>
        </>
    )
}