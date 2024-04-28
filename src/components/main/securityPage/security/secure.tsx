import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import MainLayout from "../../../layout";
import { HeaderWithAction } from "../../common/header";
import { useTranslation } from "react-i18next";
import './secure.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useRef, useState } from "react";
import OtpInput from 'react-otp-input';
import { useButtonStates } from "../../../globalFunctions/store";
import { useGetSecurityInfo, useSaveProfileInfo, useSaveSecurityInfo, useSaveSecurityInfos, useUpdatePasswords } from "../../../hooks/getUserInfoHook";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";

export default function Secure() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte();

    const [showPassword0, setShowPassword0] = useState(false);
    const handleClickShowPassword0 = () => setShowPassword0((show) => !show);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showOldWithdrawPass, setShowOldWithdrawPass] = useState(false);
    const handleClickShowOldWithdrawPassword = () => setShowOldWithdrawPass((show) => !show);
    const handleMouseDownOldWithdrawPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
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

    const [newWithdrawPassword, setWithdrawPass] = useState('');
    const [confirmNewWithdrawPassword, setConfirmWithdrawPass] = useState('');
    const [oldWithdrawaPassword, setOldWithdrawPassword] = useState('');

    const [passIndicator1, setPassIndicator1] = useState<any>(color.fourth)
    const [passIndicator2, setPassIndicator2] = useState<any>(color.fourth)
    const [passIndicator3, setPassIndicator3] = useState<any>(color.fourth)
    const [passIndicator4, setPassIndicator4] = useState<any>(color.fourth)

    const [passValidate, setPassValidate] = useState(false)
    const [passCValidate, setPassCValidate] = useState(false)

    const [newAnswer, setNewAnswer] = useState("")
    const [confirmNewAnswer, setConfirmNewAnswer] = useState("")

    const [questionValidate, setQuestionValidate] = useState(false)
    const [questionValidateConfirm, setQuestionValidateConfirm] = useState(false)

    const answer = useRef<any>(null)
    const confirmAnswer = useRef<any>(null)

    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const datas = useGetSecurityInfo()
    const data = datas?.data?.data?.userData
    const isData = datas?.data?.data

    function evaluatePasswordStrength(event: any) {
        if (event.target.name == "awswer") {
            if (event.target.value.length <= 0) {
                setQuestionValidate(true)
            } else {
                setQuestionValidate(false)
            }
        }
        if (event.target.name == "awswer") {
            setNewAnswer(event.target.value)
        }

        if (event.target.name == "confirmAwswer") {
            if (event.target.value.length <= 0) {
                setQuestionValidateConfirm(true)
            } else {
                setQuestionValidateConfirm(false)
            }
        }
        if (event.target.name == "confirmAwswer") {
            setConfirmNewAnswer(event.target.value)
        }

        if (event.target.name == "pwd") {
            if (event.target.value.length >= 0 && event.target.value.length < 6) {
                setPassValidate(true)
            } else {
                setPassValidate(false)
            }
        }

        if (event.target.name == "cpwd") {
            if (event.target.value.length >= 0 && event.target.value.length < 6) {
                setPassCValidate(true)
            } else {
                setPassCValidate(false)
            }
        }

        if (event.target.name == "cpwd") {
            if (event.target.value.length >= 0 && event.target.value.length < 6) {
                setPassCValidate(true)
            } else {
                setPassCValidate(false)
            }
        }

        if (event.target.name == "pwd") {
            setNewPass(event.target.value)
        }
        if (event.target.name == "cpwd") {
            setConfirmPass(event.target.value)
        }

        if (event.target.name == "pwd") {
            const password = event.target.value
            let score = 0;
            if (!password) {
                setPassIndicator1(color.fourth)
                setPassIndicator2(color.fourth)
                setPassIndicator3(color.fourth)
                setPassIndicator4(color.fourth)
            }
            if (password.length >= 8) score += 1;
            if (/[a-z]/.test(password)) score += 1;
            if (/[A-Z]/.test(password)) score += 1;
            if (/\d/.test(password)) score += 1;
            if (/[^A-Za-z0-9]/.test(password)) score += 1;

            switch (score) {
                case 0:
                    setPassIndicator1(color.fourth)
                    setPassIndicator2(color.fourth)
                    setPassIndicator3(color.fourth)
                    setPassIndicator4(color.fourth)
                    return;
                case 1:
                    setPassIndicator1(color.fourth)
                    setPassIndicator2(color.fourth)
                    setPassIndicator3(color.fourth)
                    setPassIndicator4(color.fourth)
                    return;
                case 2:
                    setPassIndicator1("#EA4E3D")
                    setPassIndicator2(color.fourth)
                    setPassIndicator3(color.fourth)
                    setPassIndicator4(color.fourth)
                    return;
                case 3:
                    setPassIndicator1("#FFAA09")
                    setPassIndicator2("#FFAA09")
                    setPassIndicator3(color.fourth)
                    setPassIndicator4(color.fourth)
                    return;
                case 4:
                    setPassIndicator1("#F0C059")
                    setPassIndicator2("#F0C059")
                    setPassIndicator3("#F0C059")
                    setPassIndicator4(color.fourth)
                    return;
                case 5:
                    setPassIndicator1("#04BE02")
                    setPassIndicator2("#04BE02")
                    setPassIndicator3("#04BE02")
                    setPassIndicator4("#04BE02")
                    return;
            }
        }
    }

    const buttonStates = useButtonStates(state => state.securityType)
    const securityName = useButtonStates(state => state.securityName)

    const saveSecurityInfo = useSaveSecurityInfos()
    const upatePasswords = useUpdatePasswords()

    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [telegram, setTelegram] = useState()
    const [whatsapp, setWhatsApp] = useState()
    const [facebook, setFacebook] = useState()

    const oldPassword = useRef<any>(null)
    const newPassword = useRef<any>(null)
    const confirmNewPassword = useRef<any>(null)
    const [validEmail, setValidEmail] = useState(false)

    function setPhoneNumber(value: any) {
        setPhone(value.target.value)
    }
    function savePhone() {
        saveSecurityInfo.mutate({
            "phone": phone,
        })
    }

    function setEmailInfo(value: any) {
        setEmail(value.target.value)
        if ((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value.target.value)) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
        }
    }
    function saveEmail() {
        saveSecurityInfo.mutate({
            "email": email,
        })
    }

    function setTelegramInfo(value: any) {
        setTelegram(value.target.value)
    }
    function saveTelegram() {
        saveSecurityInfo.mutate({
            "telegram": telegram,
        })
    }

    function setWhatsAppInfo(value: any) {
        setWhatsApp(value.target.value)
    }
    function saveWhatsApp() {
        saveSecurityInfo.mutate({
            "whatsapp": whatsapp,
        })
    }

    function setFacebookInfo(value: any) {
        setFacebook(value.target.value)
    }
    function saveFacebook() {
        saveSecurityInfo.mutate({
            "facebook": facebook,
        })
    }

    function updateLoginPassword() {
        upatePasswords.mutate({
            oldPwd: oldPassword.current.value,
            newPwd: newPassword.current.value,
            okPwd: confirmNewPassword.current.value,
            type: 1,
        })
    }

    function saveWithdrawPassword() {
        upatePasswords.mutate({
            newPwd: newWithdrawPassword,
            okPwd: confirmNewWithdrawPassword,
            type: 2,
        })
    }

    function updateWithdrawPassword() {
        upatePasswords.mutate({
            oldPwd: oldWithdrawaPassword,
            newPwd: newWithdrawPassword,
            okPwd: confirmNewWithdrawPassword,
            type: 2,
        })
    }
    useEffect(() => {

    }, [buttonStates])
    return (
        <>
            <MainLayout>
                <section>
                    <HeaderWithAction>{securityName}</HeaderWithAction>
                </section>
                <section>
                    <Box
                        sx={{
                            ".inputContainerBox": {
                                borderColor: color.fourth + "!important"
                            },
                            ".inputContainerBox:has(input[type='text']:focus)": {
                                borderColor: color.forGround + "!important"
                            },
                            ".inputContainerBox:has(input[type='password']:focus)": {
                                borderColor: color.forGround + "!important"
                            },
                        }}
                    >
                        <div className="secureMainContainer" style={{ backgroundColor: color.backGorund }}>
                            {buttonStates == 1 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">{t("ts1001", { ns: "ts" })}</span>
                                    </div>
                                    <div className="textFieldContainer">

                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/phone.png" alt="R" className="nameIcon" />
                                                <input className="nameInput" onChange={(event) => setPhoneNumber(event)} type="text" placeholder={t("ts1016", { ns: "ts" })} />
                                            </div>
                                        </div>

                                    </div>
                                    <Button onClick={savePhone} style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }
                            {buttonStates == 2 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">{t("ts1002", { ns: "ts" })}</span>
                                    </div>
                                    <div className="textFieldContainer" style={{ marginBottom: "0" }}>
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/email.png" alt="E" className="nameIcon" />
                                                <input className="nameInput" onChange={(event) => setEmailInfo(event)} type="text" placeholder={t("ts1017", { ns: "ts" })} />
                                            </div>
                                        </div>
                                        <div className={validEmail == true ? "emailValidation active" : "emailValidation"}>
                                            <img src="/images/warning.png" alt="." />
                                            <span>{email == "" ? "O e-mail não pode estar vazio" : "Erro no formato do e-mail, introduza novamente"}</span>
                                        </div>
                                    </div>
                                    {/* <div className="textFieldContainer">
                                    <div className="inputContainerBox">
                                        <div className="nameIconBox">
                                            <img src="/images/pwd.png" alt="." className="nameIcon" />
                                            <input className="nameInput" type="text" placeholder="Insira o código de verificação" />
                                            <Button sx={{
                                                "&:disabled": {
                                                    cursor: "not-allowed !important",
                                                    pointerEvents: "all !important",
                                                    color: "#68707B !important"
                                                },
                                            }} disabled={validEmail} className="receiveCode" variant="outlined">Receber Código</Button>
                                        </div>
                                    </div>
                                </div> */}
                                    <Button onClick={saveEmail} style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }
                            {buttonStates == 7 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">{t("ts989", { ns: "ts" })}</span>
                                    </div>
                                    <div className="textFieldContainer">
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/telegram.png" alt="E" className="nameIcon" />
                                                <input className="nameInput" onChange={(event) => setTelegramInfo(event)} type="text" placeholder={t("ts1018", { ns: "ts" })} />
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={saveTelegram} style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }
                            {buttonStates == 8 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">WhatsApp</span>
                                    </div>
                                    <div className="textFieldContainer">
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/whatsapp.png" alt="E" className="nameIcon" />
                                                <input className="nameInput" onChange={(event) => setWhatsAppInfo(event)} type="text" placeholder={t("ts1019", { ns: "ts" })} />
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={saveWhatsApp} style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }
                            {buttonStates == 9 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">{t("ts991", { ns: "ts" })}</span>
                                    </div>
                                    <div className="textFieldContainer">
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/facebook.png" alt="E" className="nameIcon" />
                                                <input className="nameInput" onChange={(event) => setFacebookInfo(event)} type="text" placeholder={t("ts1020", { ns: "ts" })} />
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={saveFacebook} style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }
                            {buttonStates == 3 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">{t("ts1003", { ns: "ts" })}</span>
                                    </div>

                                    <div className="instructionBox">
                                        <div className="intructionTitleBox">
                                            <span className="instructionTitle">{t("ts1004", { ns: "ts" })}</span>
                                            <span className="instructionLabel">{t("ts1005", { ns: "ts" })}</span>
                                        </div>
                                    </div>

                                    <div className="hrDivLine" />

                                    <div className="instructionBox">
                                        <div className="intructionTitleBox">
                                            <span className="instructionTitle">{t("ts1006", { ns: "ts" })}</span>
                                        </div>
                                        <div className="instructionQRBox">
                                            <img className="instructionQR" src="/images/qr.png" alt="Q" />
                                            <span className="QRAuthenticateCopierClick">{t("ts1007", { ns: "ts" })}</span>
                                        </div>
                                    </div>

                                    <div className="hrDivLine" />

                                    <div className="instructionBox instructionBoxLast">
                                        <div className="intructionTitleBox">
                                            <span className="instructionTitle">{t("ts1008", { ns: "ts" })}</span>
                                        </div>
                                    </div>

                                    <div className="textFieldContainer">
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/profileImages/icon_GoogleAuthenticator.png" alt="E" className="nameIcon" />
                                                <input className="nameInput" type="text" placeholder={t("ts1021", { ns: "ts" })} />
                                            </div>
                                        </div>
                                    </div>
                                    <Button style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }
                            {buttonStates == 4 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">{t("ts1009", { ns: "ts" })}</span>
                                    </div>
                                    <div className="textFieldContainer" style={{ marginBottom: ".3rem" }}>
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/pwd.png" alt="E" className="nameIcon" />
                                                <input ref={oldPassword} className="nameInput" name="oldpwd" placeholder={t("ts1022", { ns: "ts" })} type={!showPassword0 ? "password" : "text"} />
                                                {showPassword0 ? <Visibility onClick={handleClickShowPassword0} style={{ color: color.forGround, fontSize: ".3rem", cursor: "pointer" }} /> : <VisibilityOff onClick={handleClickShowPassword0} style={{ color: "#68707B", fontSize: ".3rem", cursor: "pointer" }} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="textFieldContainer" style={{ marginBottom: ".3rem" }}>
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/pwd.png" alt="E" className="nameIcon" />
                                                <input ref={newPassword} className="nameInput" name="pwd" placeholder={t("ts1023", { ns: "ts" })} onChange={(e) => { evaluatePasswordStrength(e); }} type={!showPassword1 ? "password" : "text"} />
                                                {showPassword1 ? <Visibility onClick={handleClickShowPassword1} style={{ color: color.forGround, fontSize: ".3rem", cursor: "pointer" }} /> : <VisibilityOff onClick={handleClickShowPassword1} style={{ color: "#68707B", fontSize: ".3rem", cursor: "pointer" }} />}
                                            </div>
                                        </div>
                                        <div className={passValidate == true ? "passWordValidation active" : "passWordValidation"}>
                                            <img src="/images/warning.png" alt="." />
                                            <span>{t("ts1010", { ns: "ts" })}</span>
                                        </div>
                                    </div>
                                    <div className="passwordValidatorContainer" style={{ width: "100%" }}>
                                        <div className="labelPassValBox">
                                            <span className="passValLabel">{t("ts1011", { ns: "ts" })}</span>
                                            <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator1 }}></span>
                                            <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator2 }}></span>
                                            <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator3 }}></span>
                                            <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator4 }}></span>
                                        </div>
                                    </div>
                                    <div className="textFieldContainer">
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/pwd.png" alt="E" className="nameIcon" />
                                                <input ref={confirmNewPassword} className="nameInput" name="cpwd" placeholder={t("ts1023", { ns: "ts" })} onChange={(e) => { evaluatePasswordStrength(e); }} type={!showPassword ? "password" : "text"} />
                                                {showPassword ? <Visibility onClick={handleClickShowPassword} style={{ color: color.forGround, fontSize: ".3rem", cursor: "pointer" }} /> : <VisibilityOff onClick={handleClickShowPassword} style={{ color: "#68707B", fontSize: ".3rem", cursor: "pointer" }} />}
                                            </div>
                                        </div>
                                        {passCValidate == true ?
                                            <div className={passCValidate == true ? "passWordValidation active" : "passWordValidation"}>
                                                <img src="/images/warning.png" alt="." />
                                                <span>{t("ts1010", { ns: "ts" })}</span>
                                            </div>
                                            : newPass != confirmPass ?
                                                <div className={newPass != confirmPass ? "passWordValidation active" : "passWordValidation"}>
                                                    <img src="/images/warning.png" alt="." />
                                                    <span>{t("ts1012", { ns: "ts" })}</span>
                                                </div> : ""
                                        }

                                    </div>
                                    <Button onClick={updateLoginPassword} style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }
                            {buttonStates == 5 && <div className="secureContainer">
                                <div className="labelBox">
                                    <span className="secureLabel">{t("ts1013", { ns: "ts" })}</span>
                                </div>
                                <div className="withdrawBoxNew" style={{ marginBottom: ".3rem" }}>
                                    <form noValidate autoComplete="off">
                                        <div className="enterPassMainContainer" style={{ width: "4.7rem" }}>

                                            {isData?.hasWithdrawalPassword == true &&
                                                <div className="enterPassContainer">
                                                    <div className="labelWithEyeBox">
                                                        <label className="inputLabelsPass">{t("ts1014", { ns: "ts" })}</label>
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowOldWithdrawPassword}
                                                            onMouseDown={handleMouseDownOldWithdrawPassword}
                                                            className="passWordEye"
                                                            tabIndex={-1}
                                                        >
                                                            {showOldWithdrawPass ? <Visibility sx={{ color: color.forGround, width: ".3rem", height: ".3rem" }} /> : <VisibilityOff sx={{ color: color.fourth, width: ".3rem", height: ".3rem" }} />}
                                                        </IconButton>
                                                    </div>
                                                    <FormControl
                                                        sx={{
                                                            "input:focus": {
                                                                borderColor: color.forGround + " !important"
                                                            },
                                                            "input": {
                                                                borderColor: color.fourth + " !important"
                                                            }
                                                        }}
                                                    >
                                                        <OtpInput
                                                            inputType={showOldWithdrawPass ? 'number' : 'password'}
                                                            onChange={setOldWithdrawPassword}
                                                            numInputs={6}
                                                            value={oldWithdrawaPassword}
                                                            inputStyle="withdrawPassAutoTab"
                                                            renderInput={(props) => <input {...props} />}
                                                        />
                                                    </FormControl>
                                                </div>
                                            }

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
                                                        {showNewPassword ? <Visibility sx={{ color: color.forGround, width: ".3rem", height: ".3rem" }} /> : <VisibilityOff sx={{ color: color.fourth, width: ".3rem", height: ".3rem" }} />}
                                                    </IconButton>
                                                </div>
                                                <FormControl
                                                    sx={{
                                                        "input:focus": {
                                                            borderColor: color.forGround + " !important"
                                                        },
                                                        "input": {
                                                            borderColor: color.fourth + " !important"
                                                        }
                                                    }}
                                                >
                                                    <OtpInput
                                                        inputType={showNewPassword ? 'number' : 'password'}
                                                        onChange={setWithdrawPass}
                                                        numInputs={6}
                                                        value={newWithdrawPassword}
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
                                                        {showConfirmPassword ? <Visibility sx={{ color: color.forGround, width: ".3rem", height: ".3rem" }} /> : <VisibilityOff sx={{ color: color.fourth, width: ".3rem", height: ".3rem" }} />}
                                                    </IconButton>
                                                </div>
                                                <FormControl
                                                    sx={{
                                                        "input:focus": {
                                                            borderColor: color.forGround + " !important"
                                                        },
                                                        "input": {
                                                            borderColor: color.fourth + " !important"
                                                        }
                                                    }}
                                                >
                                                    <OtpInput
                                                        inputType={showConfirmPassword ? 'number' : 'password'}
                                                        onChange={setConfirmWithdrawPass}
                                                        numInputs={6}
                                                        value={confirmNewWithdrawPassword}
                                                        inputStyle="withdrawPassAutoTab"
                                                        renderInput={(props) => <input {...props} />}
                                                    />
                                                </FormControl>
                                            </div>
                                            <label className="footLabel" style={{ lineHeight: 1.75, left: "-.15rem" }}>{t("ts964", { ns: "ts" })}</label>
                                        </div>
                                    </form>
                                </div>
                                <Button onClick={isData?.hasWithdrawalPassword == true ? updateWithdrawPassword : saveWithdrawPassword} style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                            </div>
                            }

                            {buttonStates == 10 &&
                                <div className="secureContainer">
                                    <div className="labelBox">
                                        <span className="secureLabel">{t("ts1119", { ns: "ts" })}</span>
                                    </div>
                                    <div className="textFieldContainer" style={{ marginBottom: ".3rem" }}>
                                        <FormControl size="small"
                                            sx={{
                                                width: "100%",
                                                fontSize: "initial",
                                                "& .MuiInputBase-root": {
                                                    paddingLeft: ".11rem",
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: color.fourth + " !important",
                                                        fontSize: ".18rem",
                                                        borderRadius: ".1rem",
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        color: color.text + " !important",
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
                                                        borderColor: color.forGround + " !important",
                                                        fontSize: ".18rem"
                                                    }
                                                },
                                                " .MuiSvgIcon-root": {
                                                    width: ".25rem",
                                                    color: "#313843 !important"
                                                },
                                                " .MuiSelect-select": {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    height: ".5rem",
                                                    padding: "0"
                                                }
                                            }}
                                        >
                                            <Select
                                                displayEmpty
                                                // value={gameFrom}
                                                // onChange={(e) => handleFromchange(e.target.value)}
                                                defaultValue={1}
                                                MenuProps={{
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
                                                                color: "#68707b !important",
                                                            }
                                                        }
                                                    },
                                                }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <img src="/images/icon_question.png" style={{ width: ".3rem" }} alt="E" className="nameIcon" />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value={1}>{t("ts1120", { ns: "ts" })}</MenuItem>
                                                <MenuItem value={2}>{t("ts1121", { ns: "ts" })}</MenuItem>
                                                <MenuItem value={3}>{t("ts1122", { ns: "ts" })}</MenuItem>
                                                <MenuItem value={4}>{t("ts1123", { ns: "ts" })}</MenuItem>
                                                <MenuItem value={5}>{t("ts1124", { ns: "ts" })}</MenuItem>
                                                <MenuItem value={6}>{t("ts1125", { ns: "ts" })}</MenuItem>
                                                <MenuItem value={7}>{t("ts1126", { ns: "ts" })}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="textFieldContainer" style={{ marginBottom: ".3rem" }}>
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/question_secure.png" alt="E" className="nameIcon" />
                                                <input ref={answer} className="nameInput" name="awswer" placeholder={t("ts1129", { ns: "ts" })} onChange={(e) => { evaluatePasswordStrength(e); }} type="text" />
                                            </div>
                                        </div>
                                        <div className={questionValidate == true ? "passWordValidation active" : "passWordValidation"}>
                                            <img src="/images/warning.png" alt="." />
                                            <span>{t("ts1127", { ns: "ts" })}</span>
                                        </div>
                                    </div>
                                    <div className="textFieldContainer">
                                        <div className="inputContainerBox">
                                            <div className="nameIconBox">
                                                <img src="/images/question_secure.png" alt="E" className="nameIcon" />
                                                <input ref={confirmAnswer} className="nameInput" name="confirmAwswer" placeholder={t("ts1130", { ns: "ts" })} onChange={(e) => { evaluatePasswordStrength(e); }} type="text" />
                                            </div>
                                        </div>
                                        {questionValidateConfirm == true ?
                                            <div className={questionValidateConfirm == true ? "passWordValidation active" : "passWordValidation"}>
                                                <img src="/images/warning.png" alt="." />
                                                <span>{t("ts1127", { ns: "ts" })}</span>
                                            </div>
                                            : newAnswer != confirmNewAnswer ?
                                                <div className={newAnswer != confirmNewAnswer ? "passWordValidation active" : "passWordValidation"}>
                                                    <img src="/images/warning.png" alt="." />
                                                    <span>{t("ts1128", { ns: "ts" })}</span>
                                                </div> : ""
                                        }
                                    </div>
                                    <Button style={{ backgroundColor: color.forGround, color: "#fff" }} className="addPhoneButton" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                                </div>
                            }

                        </div>
                    </Box>
                </section>
            </MainLayout>
        </>
    )
}