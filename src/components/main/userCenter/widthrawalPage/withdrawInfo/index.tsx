import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useRef, useState } from 'react';
import { ChangeColorPallte } from '../../../../globalFunctions/globalContext';
import { Button, Stack } from '@mui/material';
import './indexWithdrawInfo.css'
import { useGetSecurityInfo, useSavePhoneNumber, useSaveRealName, useSaveWithdrawalPassword, useStationConfig } from '../../../../hooks/getUserInfoHook';
import { useTranslation } from 'react-i18next';
import { useShowWithdraw } from '../../../../globalFunctions/store';
import OtpInput from 'react-otp-input';

export default function WithdrawInfo() {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);

    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const staLang = useStationConfig()
    var lang = staLang?.data?.data?.staLang
    const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z-\-" "]+$/;

    const getSecurityInfo = useGetSecurityInfo()
    const getInfo = getSecurityInfo?.data?.data

    useEffect(() => {
        getSecurityInfo.refetch()
    }, [])

    const showWithdraw = useShowWithdraw(state => state.type)

    // const withdrawPass = useRef<any>(null)
    // const confirmWithdrawPass = useRef<any>(null)

    const [withdrawPass, setWithdrawPass] = useState('');
    const [confirmWithdrawPass, setConfirmWithdrawPass] = useState('');

    const realNameValue = useRef<any>(null)
    const phoneNumber = useRef<any>(null)

    const saveWithdrawPass = useSaveWithdrawalPassword()
    const saveRealName = useSaveRealName()
    const savePhoneNumber = useSavePhoneNumber()

    useEffect(() => {

    }, [showWithdraw])

    const confirmPass = () => {
        const payload = {
            newPwd: withdrawPass,
            okPwd: confirmWithdrawPass,
            type: "2",
        }
        saveWithdrawPass.mutate(payload)
    }

    const confirmRealName = () => {
        const payload = {
            realName: realNameValue.current.value,
        }
        saveRealName.mutate(payload)
    }

    const confirmPhone = () => {
        const payload = {
            newContact: phoneNumber.current.value,
            type: "phone"
        }
        savePhoneNumber.mutate(payload)
    }


    return (
        <>
            <section>
                <div className="withdrawPasswordMainConainer" style={{ backgroundColor: colorP.backGorund }}>
                    <>
                        {getInfo?.hasWithdrawalPassword == false && showWithdraw == 1 && <div className="withdrawBoxNew">
                            <label className="withsrawPassLabel">{t("ts964", { ns: "ts" })}</label>
                            <form noValidate autoComplete="off">
                                <div className="enterPassMainContainer">
                                    <label className="headLabel">{t("ts965", { ns: "ts" })}</label>
                                    <div className="enterPassContainer">
                                        <div className="labelWithEyeBox">
                                            <label className="inputLabelsPass">{t("ts966", { ns: "ts" })}</label>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={handleMouseDownNewPassword}
                                                className="passWordEye"
                                                tabIndex={-1}
                                            >
                                                {showNewPassword ? <Visibility sx={{ color: colorP.forGround, width: ".3rem", height: ".3rem" }} /> : <VisibilityOff sx={{ color: colorP.third, width: ".3rem", height: ".3rem" }} />}
                                            </IconButton>
                                        </div>
                                        <FormControl
                                            sx={{
                                                "input:focus": {
                                                    borderColor: colorP.forGround + " !important"
                                                },
                                                "input": {
                                                    borderColor: colorP.third + " !important"
                                                }
                                            }}
                                        >
                                            <OtpInput
                                                inputType={showNewPassword ? 'number' : 'password'}
                                                onChange={setWithdrawPass}
                                                numInputs={6}
                                                value={withdrawPass}
                                                inputStyle="withdrawPassAutoTab"
                                                renderInput={(props) => <input {...props} />}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="enterPassContainer">
                                        <div className="labelWithEyeBox">
                                            <label className="inputLabelsPass">{t("ts967", { ns: "ts" })}</label>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                                className="passWordEye"
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword ? <Visibility sx={{ color: colorP.forGround, width: ".3rem", height: ".3rem" }} /> : <VisibilityOff sx={{ color: colorP.third, width: ".3rem", height: ".3rem" }} />}
                                            </IconButton>
                                        </div>
                                        <FormControl
                                            sx={{
                                                "input:focus": {
                                                    borderColor: colorP.forGround + " !important"
                                                },
                                                "input": {
                                                    borderColor: colorP.third + " !important"
                                                }
                                            }}
                                        >
                                            <OtpInput
                                                inputType={showConfirmPassword ? 'number' : 'password'}
                                                onChange={setConfirmWithdrawPass}
                                                numInputs={6}
                                                value={confirmWithdrawPass}
                                                inputStyle="withdrawPassAutoTab"
                                                renderInput={(props) => <input {...props} />}
                                            />
                                        </FormControl>
                                    </div>
                                    <label className="footLabel">{t("ts964", { ns: "ts" })}</label>
                                </div>
                            </form>
                            <Button onClick={confirmPass} className="withdrawConfrimPass" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                        </div>}

                        {/* {getInfo?.hasRealName == false && showWithdraw == 2 && <div className="withdrawBoxNew">
                            <label className="withsrawPassLabel">Please add your Real Name</label>
                            <form noValidate>
                                <TextField
                                    autoComplete="off"
                                    onKeyDown={(event) => {
                                        if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    sx={{
                                        width: '40ch',
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: colorP.forGround + " !important"
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                textTransform: lang === "br" ? "" : "uppercase",
                                                color: colorP.text + " !important"
                                            },
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: colorP.forGround + " !important"
                                            }
                                        }
                                    }} label={t("ts146", { ns: "ts" })} margin="dense" size="small" inputRef={realNameValue} />
                            </form>
                            <Button onClick={confirmRealName} className="withdrawConfrimPass" variant="contained" style={{ backgroundColor: colorP.forGround + "important", color: colorP.text2 + "important" }}>Confirm</Button>
                        </div>}

                        {getInfo?.hasPhone == false && showWithdraw == 3 && <div className="withdrawBoxNew">
                            <label className="withsrawPassLabel">Please enter your phone number</label>
                            <form noValidate>
                                <TextField
                                    autoComplete="off"
                                    sx={{
                                        width: '40ch',
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: colorP.forGround + " !important"
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                color: colorP.text + " !important"
                                            },
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: "#808080 !important"
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "2px solid !important",
                                                borderColor: colorP.forGround + " !important"
                                            }
                                        }
                                    }} label={t("ts297", { ns: "ts" })} margin="dense" size="small" inputRef={phoneNumber} />
                            </form>
                            <Button onClick={confirmPhone} className="withdrawConfrimPass" variant="contained" style={{ backgroundColor: colorP.forGround }}>Confirm</Button>
                        </div>} */}
                    </>
                </div>
            </section >
        </>
    )
}