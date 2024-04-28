import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, FormControl, TextField, InputAdornment, OutlinedInput, Stack, FormControlLabel, Button, DialogTitle } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useGenerateOTPRegister, useGlobalList, useGlobalVariables, useLoginStore, useModalStates, userRegstore } from '../../globalFunctions/store';
import AccountCircleIcon from '@mui/icons-material/Person';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLogin, useLoginFreeTrial } from "../../hooks/getUserInfoHook";
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import CancelIcon from '@mui/icons-material/Cancel';
import './loginModal.css'
import { useRegisterUser } from "../../hooks/registrationHook";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { useTranslation } from "react-i18next";
import { useGetKey } from "../../hooks/curstomHooks";
import Cookies from "universal-cookie";
import TermsCondition from "./components/termsAndCondition";

export default function RegModal(props: any) {
  const { t } = useTranslation(["home", "main"]);
  const navigate = useNavigate();
  const colorP = ChangeColorPallte()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showReceiptPwd, setShowReceiptPwd] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleClickShowReceiptPwd = () => setShowReceiptPwd((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseDownReceiptPwd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const reg = useRegisterUser()
  const regState = userRegstore((state) => state.isOpenRegister)
  const ref = useGlobalVariables((state) => state.regFields)

  const freeTrial = useLoginFreeTrial()
  const [checked, setChecked] = useState([true, false]);
  const colorPallete = ChangeColorPallte()
  const userConfig = useGlobalVariables(state => state.stationConfig)
  const [formData, setFormData] = useState<any>([])
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };
  const [passValidate, setPassValidate] = useState(false)
  const [userValidate, setUserValidate] = useState(false)

  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const getKey = useGetKey()
  const keyGen = useGlobalList(state => state.encKey)
  const cookies = new Cookies();
  const capthaLang = cookies.get("langList")
  const [userClear, setUserClear] = useState(false)
  const [realNameClear, setRealNameClear] = useState(false)
  const [pwd, setPwd] = useState(false)
  const [rpwd, setRpwd] = useState(false)
  const [receiptPass, setReceiptPasswrord] = useState(false)
  const [phone, setPhone] = useState(false)
  const [tele, setTele] = useState(false)
  const [what, setWhat] = useState(false)
  const [cap, setCaptcha] = useState(false)

  const handleInputChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })

    if (event.target.name == "username") {
      if (event.target.value.length >= 0 && event.target.value.length < 5) {
        setUserValidate(true)
      } else {
        setUserValidate(false)
      }
    }

    if (event.target.name == "pwd") {
      if (event.target.value.length >= 0 && event.target.value.length < 5) {
        setPassValidate(true)
      } else {
        setPassValidate(false)
      }
    }

    if (event.target.name == "pwd") {
      setNewPass(event.target.value)
    }
    if (event.target.name == "rpwd") {
      setConfirmPass(event.target.value)
    }

    if (event.target.value.length > 0 && event.target.name == "username") {
      setUserClear(true)
    } else if (event.target.value.length <= 0 && event.target.name == "username") {
      setUserClear(false)
    }

    if (event.target.value.length > 0 && event.target.name == "realName") {
      setRealNameClear(true)
    } else if (event.target.value.length <= 0 && event.target.name == "realName") {
      setRealNameClear(false)
    }

    if (event.target.value.length > 0 && event.target.name == "pwd") {
      setPwd(true)
    } else if (event.target.value.length <= 0 && event.target.name == "pwd") {
      setPwd(false)
    }

    if (event.target.value.length > 0 && event.target.name == "rpwd") {
      setRpwd(true)
    } else if (event.target.value.length <= 0 && event.target.name == "rpwd") {
      setRpwd(false)
    }

    if (event.target.value.length > 0 && event.target.name == "receiptPwd") {
      setReceiptPasswrord(true)
    } else if (event.target.value.length <= 0 && event.target.name == "receiptPwd") {
      setReceiptPasswrord(false)
    }

    if (event.target.value.length > 0 && event.target.name == "phone") {
      setPhone(true)
    } else if (event.target.value.length <= 0 && event.target.name == "phone") {
      setPhone(false)
    }

    if (event.target.value.length > 0 && event.target.name == "telegram") {
      setTele(true)
    } else if (event.target.value.length <= 0 && event.target.name == "telegram") {
      setTele(false)
    }

    if (event.target.value.length > 0 && event.target.name == "whatsapp") {
      setWhat(true)
    } else if (event.target.value.length <= 0 && event.target.name == "whatsapp") {
      setWhat(false)
    }

    if (event.target.value.length > 0 && event.target.name == "captcha") {
      setCaptcha(true)
    } else if (event.target.value.length <= 0 && event.target.name == "captcha") {
      setCaptcha(false)
    }

  };

  const register = (event: any) => {
    if (event.key === 'Enter' || event.type === "click") {
      if (formData.pwd !== formData.rpwd) { ToastrPngk({ msg: t("ts865", { ns: "ts" }), type: "error" }); return }
      reg.mutate(formData)
    
    }
  }

  const [passIndicator1, setPassIndicator1] = useState<any>(colorP.fourth)
  const [passIndicator2, setPassIndicator2] = useState<any>(colorP.fourth)
  const [passIndicator3, setPassIndicator3] = useState<any>(colorP.fourth)
  const [passIndicator4, setPassIndicator4] = useState<any>(colorP.fourth)


  function evaluatePasswordStrength(event: any) {
    if (event.target.name == "pwd") {
      const password = event.target.value
      let score = 0;
      if (!password) {
        setPassIndicator1(colorP.fourth)
        setPassIndicator2(colorP.fourth)
        setPassIndicator3(colorP.fourth)
        setPassIndicator4(colorP.fourth)
      }
      if (password.length >= 8) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[A-Z]/.test(password)) score += 1;
      if (/\d/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;

      switch (score) {
        case 0:
          setPassIndicator1(colorP.fourth)
          setPassIndicator2(colorP.fourth)
          setPassIndicator3(colorP.fourth)
          setPassIndicator4(colorP.fourth)
          return;
        case 1:
          setPassIndicator1(colorP.fourth)
          setPassIndicator2(colorP.fourth)
          setPassIndicator3(colorP.fourth)
          setPassIndicator4(colorP.fourth)
          return;
        case 2:
          setPassIndicator1("#EA4E3D")
          setPassIndicator2(colorP.fourth)
          setPassIndicator3(colorP.fourth)
          setPassIndicator4(colorP.fourth)
          return;
        case 3:
          setPassIndicator1("#FFAA09")
          setPassIndicator2("#FFAA09")
          setPassIndicator3(colorP.fourth)
          setPassIndicator4(colorP.fourth)
          return;
        case 4:
          setPassIndicator1("#F0C059")
          setPassIndicator2("#F0C059")
          setPassIndicator3("#F0C059")
          setPassIndicator4(colorP.fourth)
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

  const handleLoginModal = () => {
    useLoginStore.setState({ isOpen: true })
    userRegstore.setState({ isOpenRegister: false })
  };

  const handleFreetrial = () => {
    if (userConfig.isAllowRegisterGuest) {
      freeTrial.mutate()
      userRegstore.setState({ isOpenRegister: false })
    }
  }

  const openSupport = () => {
    navigate("/support")
    userRegstore.setState({ isOpenRegister: false })
  }

  const clearField = (data: any) => {
    setFormData({ ...formData, [data]: "" })
    if (data == "username") {
      setUserClear(false)
    } else if (data == "pwd") {
      setPwd(false)
      setPassIndicator1(colorP.fourth)
      setPassIndicator2(colorP.fourth)
      setPassIndicator3(colorP.fourth)
      setPassIndicator4(colorP.fourth)
    } else if (data == "rpwd") {
      setRpwd(false)
    } else if (data == "receiptPwd") {
      setReceiptPasswrord(false)
    } else if (data == "realName") {
      setRealNameClear(false)
    } else if (data == "telegram") {
      setTele(false)
    } else if (data == "whatsapp") {
      setWhat(false)
    } else if (data == "captcha") {
      setCaptcha(false)
    } else if (data == "phone") {
      setPhone(false)
    }
  }

  const clearRegFields = useGlobalVariables(state => state.clearRegFields)

  const clearFields = () => {
    useGlobalVariables.setState({regFields:[]})
    setFormData([])
    setUserClear(false)
    setPwd(false)
    setRpwd(false)
    setReceiptPasswrord(false)
    setRealNameClear(false)
    setTele(false)
    setWhat(false)
    setCaptcha(false)
    setPhone(false)
   
  }

  function regWithGeetest() {
    getKey.mutate()
    if (formData.pwd !== formData.rpwd) { ToastrPngk({ msg: t("ts865", { ns: "ts" }), type: "error" }); return }
    (window as any)["initGeetest4"]({
      captchaId: keyGen,
      product: "bind",
      language: capthaLang,
    }, function (captchaObj: any) {
      (window as any)["gt"] = captchaObj;
      captchaObj.onReady(function () {
        //验证码ready之后才能调用showCaptcha方法显示验证码
        captchaObj.showCaptcha(); //显示验证码
      }).onSuccess(function () {
        const geetestParams = JSON.stringify(captchaObj.getValidate())
        const newObj = Object.assign({}, formData, {
          geetestParams: geetestParams
        })
        reg.mutate(newObj)
        if (clearRegFields == true) {
     
        }
        // setFormData({ ...formData, ["geetestParams"]: JSON.stringify(captchaObj.getValidate()) })
        // registerDo(formData) ;
      }).onError(function () {
        console.log("geeteset captcha vertify error = ");
        captchaObj.reset();
      });
    });
  }

  const agreement = () => {
    useModalStates.setState({ termsModal: true })
  }
 
 
  return (
    <React.Fragment>
      <Dialog
        open={regState}
        sx={{
          " .MuiDialog-paper": {
            // maxWidth: "max-content !important",
            width: "6.4rem",
            maxWidth: "6.4rem",
            // height: "7.4rem"
          },
          " .MuiPaper-root": {
            boxShadow: "none",
          },
          " .MuiPaper-root.MuiPaper-rounded": {
            borderRadius: ".2rem",
            border: "thin solid",
            borderColor: colorP.fourth
          },
          " .MuiDialogContent-root": {
            padding: "0 .3rem 0 .3rem",
            height: "4.2rem"
          },
          " .MuiToolbar-root": {
            justifyContent: "flex-end",
            minHeight: ".45rem !important",
            " .MuiButtonBase-root": {
              top: "10px",
              " .MuiSvgIcon-root": {
                fontSize: ".25rem"
              }
            }
          },
          " .MuiDialogActions-root": {
            backgroundColor: colorP.backGorund,
            padding: "0 .3rem .3rem .3rem"
          }
        }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              value="8"
              onClick={() => userRegstore.setState({ isOpenRegister: false })}
              aria-label="close"
              tabIndex={-1}
            >
              <CloseIcon  onClick={clearFields} style={{ color: colorP.text }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="loginTitleBox" style={{ backgroundColor: colorP.backGorund }}>
          <div className="loginTitle">
            <div className="loginTitleBox" style={{ backgroundColor: colorP.backGorund, borderColor: colorP.forGround }}>
              <div className="LoginIconBox">
                <img src={colorP.regla} style={{ width: ".27rem", marginRight: ".05rem" }} alt="U" />
              </div>
              <div className="loginLabel" style={{ color: colorP.forGround }}>
                {t("ts003", { ns: "ts" })}
              </div>
            </div>
          </div>
        </div>
        <DialogContent sx={{
          backgroundColor: colorP.backGorund,
          "::-webkit-scrollbar": {
            display: "block",
          }
        }}>
          <Stack spacing={".35rem"} direction={"column"}>
            {(ref && ref.length !== 0 && ref.success !== false) ? ref?.map((field: any, index: any) =>
              <FormControl key={index} sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  borderRadius: ".1rem",
                  position: "relative",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorP.fourth + " !important"
                  }, ".MuiFormLabel-root": {
                    color: "#fff !important"
                  },
                  "& .MuiInputBase-input": {
                    color: "#fff !important",
                    fontSize: ".18rem",
                    height: ".5rem",
                    padding: "0"
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#68707B",
                    height: "0.3rem",
                    width: " 0.3rem",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1.5px solid !important",
                    borderColor: colorP.forGround + "!important"
                  }
                },
                "& .MuiFormHelperText-root": {
                  color: "#EA4E3D",
                  fontSize: ".14rem",
                  lineHeight: "1",
                  marginLeft: "0",
                  bottom: "-22px",
                  position: "absolute",
                  visibility: field.eleName == "username" ? (userValidate == true ? "visible" : "hidden") : field.eleName == "pwd" ? (passValidate == true ? "visible" : "hidden") : (newPass != confirmPass ? "visible" : "hidden"),
                  opacity: field.eleName == "username" ? (userValidate == true ? "1" : "0") : field.eleName == "pwd" ? (passValidate == true ? "1" : "0") : (newPass != confirmPass ? "1" : "0"),
                  transition: "visibility 0.3s, opacity 0.3s linear",
                  transitionTimingFunction: "ease-in-out"
                },
              }} variant="outlined">
                {field.eleName === "rpwd" &&
                  <div className="passwordValidatorContainer">
                    <div className="labelPassValBox">
                      <span className="passValLabel">{t("ts1011", { ns: "ts" })}</span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator1 }}></span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator2 }}></span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator3 }}></span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator4 }}></span>
                    </div>
                  </div>
                }
                <TextField
                  value={formData[field?.eleName]}
                  type={!showPassword && field.eleName === "pwd" || !showConfirmPassword && field.eleName === "rpwd" || !showReceiptPwd && field.eleName === "receiptPwd" ? "password" : "text"}
                  name={field.eleName}
                  id="name"
                  placeholder={field.name}
                  required={true}
                  onChange={(e) => { handleInputChange(e); evaluatePasswordStrength(e); }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment:
                      <div className="requiredField">
                        <InputAdornment position="start">
                          <img style={{ marginRight: ".05rem" }} width={22} height={22} src={field.eleName == "facebook" ? "/footerImage/10.png" : "/images/" + field.eleName + ".png"} alt="P" />
                        </InputAdornment>
                        {field.required == 2 && <span className="requiredSpan">*</span>}
                      </div>,
                    endAdornment:
                      <>
                        {field.eleName !== "pwd" && field.eleName !== "rpwd" && field.eleName !== "receiptPwd" &&
                          <IconButton
                            aria-label="toggle password visibility"
                            tabIndex={-1}
                            onClick={handleClickShowReceiptPwd}
                            onMouseDown={handleMouseDownReceiptPwd}
                            sx={{
                              position: "absolute",
                              right: 0,
                              "& .MuiSvgIcon-root": {
                                color: colorPallete.forGround
                              }
                            }}
                          >
                          <CancelIcon onClick={() => clearField(field.eleName)}/>
                            {/* {userClear === true && field.eleName === "username" &&  />}
                            {realNameClear === true && field.eleName === "realName" && <CancelIcon onClick={() => clearField(field.eleName)} />}
                            {phone === true && field.eleName === "phone" && <CancelIcon onClick={() => clearField(field.eleName)} />}
                            {tele === true && field.eleName === "telegram" && <CancelIcon onClick={() => clearField(field.eleName)} />}
                            {what === true && field.eleName === "whatsapp" && <CancelIcon onClick={() => clearField(field.eleName)} />} */}
                          </IconButton>}
                        {field.eleName === "captcha" &&
                          <InputAdornment position="end" sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            height: "0",
                          }} >
                            <IconButton
                              aria-label="toggle password visibility"
                              tabIndex={-1}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {cap === true && field.eleName === "captcha" && <CancelIcon onClick={() => clearField(field.eleName)} />}
                            </IconButton>
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              <img onClick={useGenerateOTPRegister.getState().setOtp} src={useGenerateOTPRegister.getState().otp} />
                            </IconButton>
                          </InputAdornment>
                        }
                        {field.eleName === "pwd" &&
                          <InputAdornment position="end" sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            height: "0",
                          }} >
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {pwd === true && field.eleName === "pwd" && <CancelIcon onClick={() => clearField(field.eleName)} />}
                            </IconButton>
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{
                                position: "absolute",
                                right: 15,
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {showPassword ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff style={{ color: "#68707B" }} />}
                            </IconButton>
                          </InputAdornment>}
                        {field.eleName === "rpwd" &&
                          <InputAdornment position="end" sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            height: "0",
                          }} >
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {rpwd === true && field.eleName === "rpwd" && <CancelIcon onClick={() => clearField(field.eleName)} />}
                            </IconButton>
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                              edge="end"
                              sx={{
                                position: "absolute",
                                right: 15,
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {showConfirmPassword ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff style={{ color: "#68707B" }} />}
                            </IconButton>
                          </InputAdornment>}
                        {field.eleName === "receiptPwd" &&
                          <InputAdornment position="end" sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            height: "0",
                          }} >
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {receiptPass === true && field.eleName === "receiptPwd" && <CancelIcon onClick={() => clearField(field.eleName)} />}
                            </IconButton>
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowReceiptPwd}
                              onMouseDown={handleMouseDownReceiptPwd}
                              edge="end"
                              sx={{
                                position: "absolute",
                                right: 15,
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {showReceiptPwd ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff style={{ color: "#68707B" }} />}
                            </IconButton>
                          </InputAdornment>}
                      </>
                  }}
                  helperText={field.eleName == "username" ? t("ts1131", { ns: "ts" }) : field.eleName === "pwd" ? t("ts1132", { ns: "ts" }) : field.eleName == "rpwd" ? t("ts1133", { ns: "ts" }) : ""}
                />
              </FormControl>

            ) :
              <Stack spacing={".35rem"} direction={"column"}>
                <FormControl sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    borderRadius: ".1rem",
                    position: "relative",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colorP.fourth + " !important"
                    }, ".MuiFormLabel-root": {
                      color: colorPallete.text + " !important"
                    },
                    "& .MuiInputBase-input": {
                      color: colorPallete.text + " !important",
                      fontSize: ".18rem",
                      height: ".5rem",
                      padding: "0"
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#68707B",
                      height: "0.3rem",
                      width: " 0.3rem",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1.5px solid !important",
                      borderColor: colorP.forGround + "!important"
                    }
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#EA4E3D",
                    fontSize: ".14rem",
                    lineHeight: "1",
                    marginLeft: "0",
                    bottom: "-22px",
                    position: "absolute",
                    visibility: userValidate == true ? "visible" : "hidden",
                    opacity: userValidate == true ? "1" : "0",
                    transition: "visibility 0.3s, opacity 0.3s linear",
                    transitionTimingFunction: "ease-in-out"
                  },
                }} variant="outlined">
                  <TextField
                    value={formData["username"]}
                    type="text"
                    name="username"
                    id="name"
                    placeholder="Username"
                    required={true}
                    onChange={(e) => { handleInputChange(e); evaluatePasswordStrength(e); }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment:
                        <div className="requiredField">
                          <InputAdornment position="start">
                            <img style={{ marginRight: ".05rem" }} width={22} height={22} src="/images/username.png" alt="P" />
                          </InputAdornment>
                          <span className="requiredSpan">*</span>
                        </div>,
                      endAdornment:
                        <>
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowReceiptPwd}
                              onMouseDown={handleMouseDownReceiptPwd}
                              tabIndex={-1}
                              sx={{
                                position: "absolute",
                                right: 0,
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {userClear === true && <CancelIcon onClick={() => clearField("username")} />}
                            </IconButton>
                          </InputAdornment>
                        </>
                    }}
                    helperText={"4-16 caráter bit, suporte em inglês/números"}
                  />
                </FormControl>
                <FormControl sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    borderRadius: ".1rem",
                    position: "relative",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colorP.fourth + " !important"
                    }, ".MuiFormLabel-root": {
                      color: "#fff !important"
                    },
                    "& .MuiInputBase-input": {
                      color: "#fff !important",
                      fontSize: ".18rem",
                      height: ".5rem",
                      padding: "0"
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#68707B",
                      height: "0.3rem",
                      width: " 0.3rem",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1.5px solid !important",
                      borderColor: colorP.forGround + "!important"
                    }
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#EA4E3D",
                    fontSize: ".14rem",
                    lineHeight: "1",
                    marginLeft: "0",
                    bottom: "-22px",
                    position: "absolute",
                    visibility: passValidate == true ? "visible" : "hidden",
                    opacity: passValidate == true ? "1" : "0",
                    transition: "visibility 0.3s, opacity 0.3s linear",
                    transitionTimingFunction: "ease-in-out"
                  },
                }} variant="outlined">
                  <TextField
                    value={formData["pwd"]}
                    type={!showPassword ? "password" : "text"}
                    name="pwd"
                    id="name"
                    placeholder="Password"
                    required={true}
                    onChange={(e) => { handleInputChange(e); evaluatePasswordStrength(e); }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment:
                        <div className="requiredField">
                          <InputAdornment position="start">
                            <img style={{ marginRight: ".05rem" }} width={22} height={22} src="/images/pwd.png" alt="P" />
                          </InputAdornment>
                          <span className="requiredSpan">*</span>
                        </div>,
                      endAdornment:
                        <>
                          <InputAdornment position="end" sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            height: "0",
                          }} >
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {pwd === true && <CancelIcon onClick={() => clearField("pwd")} />}
                            </IconButton>
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{
                                position: "absolute",
                                right: 15,
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {showPassword ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff style={{ color: "#68707B" }} />}
                            </IconButton>
                          </InputAdornment>
                        </>
                    }}
                    helperText={"6-16 caracteres, incluindo pelo menos duas letras/números/símbolos"}
                  />
                </FormControl>
                <FormControl sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    borderRadius: ".1rem",
                    position: "relative",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colorP.fourth + " !important"
                    }, ".MuiFormLabel-root": {
                      color: "#fff !important"
                    },
                    "& .MuiInputBase-input": {
                      color: "#fff !important",
                      fontSize: ".18rem",
                      height: ".5rem",
                      padding: "0"
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#68707B",
                      height: "0.3rem",
                      width: " 0.3rem",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1.5px solid !important",
                      borderColor: colorP.forGround + "!important"
                    }
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#EA4E3D",
                    fontSize: ".14rem",
                    lineHeight: "1",
                    marginLeft: "0",
                    bottom: "-22px",
                    position: "absolute",
                    visibility: newPass != confirmPass ? "visible" : "hidden",
                    opacity: newPass != confirmPass ? "1" : "0",
                    transition: "visibility 0.3s, opacity 0.3s linear",
                    transitionTimingFunction: "ease-in-out"
                  },
                }} variant="outlined">
                  <div className="passwordValidatorContainer">
                    <div className="labelPassValBox">
                      <span className="passValLabel">Força</span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator1 }}></span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator2 }}></span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator3 }}></span>
                      <span className="passValLabel passIndicator" style={{ backgroundColor: passIndicator4 }}></span>
                    </div>
                  </div>
                  <TextField
                    value={formData["rpwd"]}
                    type={!showConfirmPassword ? "password" : "text"}
                    name="rpwd"
                    id="name"
                    placeholder="Confirm password"
                    required={true}
                    onChange={(e) => { handleInputChange(e); evaluatePasswordStrength(e); }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment:
                        <div className="requiredField">
                          <InputAdornment position="start">
                            <img style={{ marginRight: ".05rem" }} width={22} height={22} src="/images/rpwd.png" alt="P" />
                          </InputAdornment>
                          <span className="requiredSpan">*</span>
                        </div>,
                      endAdornment:
                        <>
                          <InputAdornment position="end" sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            height: "0",
                          }} >
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {rpwd === true && <CancelIcon onClick={() => clearField("rpwd")} />}
                            </IconButton>
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                              edge="end"
                              sx={{
                                position: "absolute",
                                right: 15,
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {showConfirmPassword ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff style={{ color: "#68707B" }} />}
                            </IconButton>
                          </InputAdornment>
                        </>
                    }}
                    helperText={"Senha incorreta, digite novamente!"}
                  />
                </FormControl>
                <FormControl sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    borderRadius: ".1rem",
                    position: "relative",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colorP.fourth + " !important"
                    }, ".MuiFormLabel-root": {
                      color: "#fff !important"
                    },
                    "& .MuiInputBase-input": {
                      color: "#fff !important",
                      fontSize: ".18rem",
                      height: ".5rem",
                      padding: "0"
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#68707B",
                      height: "0.3rem",
                      width: " 0.3rem",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1.5px solid !important",
                      borderColor: colorP.forGround + "!important"
                    }
                  },
                }} variant="outlined">
                  <TextField
                    value={formData["captcha"]}
                    type={!showConfirmPassword ? "password" : "text"}
                    name="captcha"
                    id="name"
                    placeholder="Captcha"
                    required={true}
                    onChange={(e) => { handleInputChange(e); evaluatePasswordStrength(e); }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment:
                        <div className="requiredField">
                          <InputAdornment position="start">
                            <img style={{ marginRight: ".05rem" }} width={22} height={22} src="/images/captcha.png" alt="P" />
                          </InputAdornment>
                          <span className="requiredSpan">*</span>
                        </div>,
                      endAdornment:
                        <>
                          <InputAdornment position="end" sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            height: "0",
                          }} >
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: colorPallete.forGround
                                }
                              }}
                            >
                              {cap === true && <CancelIcon onClick={() => clearField("captcha")} />}
                            </IconButton>
                            <IconButton
                              tabIndex={-1}
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              <img onClick={useGenerateOTPRegister.getState().setOtp} src={useGenerateOTPRegister.getState().otp} />
                            </IconButton>
                          </InputAdornment>
                        </>
                    }}
                  />
                </FormControl>
              </Stack>
            }
          </Stack>
        </DialogContent>
        <DialogActions>
          <div className="loginControllers" style={{ marginTop: "0.1rem" }}>
            <div className='passwordControls' style={{ marginBottom: "0.1rem" }}>
              <FormControlLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ".MuiButtonBase-root": {
                    color: "#313843",
                    fontSize: ".18rem"
                  },
                  ".MuiButtonBase-root.Mui-checked": {
                    color: "#04BE02",
                  },
                  " .MuiTypography-root": {
                    fontSize: ".18rem",
                    color: "#fff",
                    marginLeft: "6px",
                    minWidth: "max-content"
                  },
                  " .MuiSvgIcon-root": {
                    width: ".35rem",
                    height: ".35rem",
                  },
                  " .checkbox_wrapper_4 .cbx span:first-child": {
                    border: ".02rem solid",
                    borderColor: colorP.fourth
                  },
                  "svg":{
                    top: ".01rem !important",
                    left: ".01rem !important",
                  }
                }}
                label={t("ts712", { ns: "ts" })}
                control={
                  <div className="checkbox_wrapper_4">
                    <input type="checkbox" className="inp-cbx" id="checker" checked={checked[1]} onChange={handleChange3} />
                    <label className="cbx" htmlFor="checker"><span>
                      <svg width=".20rem" height=".20rem">
                        <use xlinkHref="#check-4"></use>
                      </svg></span></label>
                    <svg className="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>
                  </div>
                }
              />
              <span onClick={agreement} className="termsAgree" style={{ color: colorP.forGround }}>《{t("ts1181", { ns: "ts" })}》</span>
            </div>
            <Button className='loginButton' onClick={checked[1] ? userConfig.captcha_vertify_switch == true ? regWithGeetest : register : () => void 0} autoFocus sx={{
              width: "100%",
              '&.MuiButtonBase-root': {
                backgroundColor: colorP.forGround,
                borderColor: colorP.forGround,
                color: colorP.text2,
                textTransform: "capitalize",
                fontSize: ".2rem",
                height: "0.55rem",
                borderRadius: ".1rem",
                marginTop: "0"
              },
              "&:disabled": {
                cursor: "not-allowed !important",
                pointerEvents: "all !important",
              },
            }}
              disabled={checked[1] ? false : true}
            >
              {t("ts001", { ns: "ts" })}
            </Button>
            <div className="extraLinks">
              <div onClick={openSupport} style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}>{t("ts127", { ns: "ts" })}</div>
              {userConfig.isAllowRegisterGuest && <div onClick={handleFreetrial} style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}><span style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}>{t("ts164", { ns: "ts" })}</span></div>}
              <Link to={"/"} onClick={handleLoginModal} style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}>{t("ts161", { ns: "ts" })}</Link>
            </div>
          </div>
        </DialogActions>
      </Dialog >
    </React.Fragment >
  );
}