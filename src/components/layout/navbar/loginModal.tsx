import { useTranslation } from "react-i18next";
import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, FormControl, TextField, InputAdornment, OutlinedInput, Stack, FormControlLabel, Button } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useGenerateOTP, useGlobalList, useGlobalVariables, useLoginStore, useSignInStore } from "../../globalFunctions/store";
import AccountCircleIcon from '@mui/icons-material/Person';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLogin, useLoginFreeTrial } from "../../hooks/getUserInfoHook";
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import CancelIcon from '@mui/icons-material/Cancel';
import './loginModal.css'
// import { useGetKey, useGetVer } from "../../hooks/curstomHooks";
import Cookies from "universal-cookie";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { config } from "process";
import { useGetKey } from "../../hooks/curstomHooks";

export default function CustomizedDialogs(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const loginStatus = useLoginStore(state => state.isOpen)
  const navigate = useNavigate();
  const cookies = new Cookies();
  const capthaLang = cookies.get("langList")
  const OTP = useGenerateOTP(state => state.otp)
  const loginv2 = useLogin()
  const [checked, setChecked] = useState(useSignInStore((state) => state.rememberMe) || false);
  const [logInbtn, setLoginBtn] = useState(false)
  const userConfig = useGlobalVariables(state => state.stationConfig)
  const freeTrial = useLoginFreeTrial()
  const keyGen = useGlobalList(state => state.encKey)

  const { user, pass, captcha } = useSignInStore(state => ({
    user: state.userName,
    pass: state.password,
    captcha: state.captcha,
  }))

  const colorPallete = ChangeColorPallte()
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    useSignInStore.setState({ rememberMe: event.target.checked })
  };
  function login(event: any) {
    if (event.key === 'Enter' || event.type === "click") {
      if (userConfig?.on_off_pc_verify_code == true) {
        const payload = {
          username: user,
          password: pass,
          verifyCode: captcha,
          checked: checked
        }
        loginv2.mutate(payload)
      }
      else {
        const payload = {
          username: user,
          password: pass,
          checked: checked
        }
        loginv2.mutate(payload)
      }

    }

  }
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleReegisterModal = () => {
    props.openReg()
    props.openTab()
  };
  const handleFreetrial = () => {
    if (userConfig.isAllowRegisterGuest) {
      freeTrial.mutate()
      useLoginStore.setState({ isOpen: false })
    }
  }
  const openSupport = () => {
    navigate("/support")
    useLoginStore.setState({ isOpen: false })
  }

  const [userValidate, setUserValidate] = useState(false)
  const [userClearValidate, setUserClearValidate] = useState(false)
  const validateUsername = (data: any) => {
    if (data?.value.length >= 5 && data?.value.length <= 20) {
      setUserValidate(false)
    } else if (data?.value.length < 4) {
      setUserValidate(true)
    }
    if (data?.value.length > 0) {
      setUserClearValidate(true)
    } else {
      setUserClearValidate(false)
    }
    useSignInStore.setState({ userName: data?.value })
  }

  const [passwordValidate, setPasswordValidate] = useState(false)
  const [passwordClearValidate, setPasswordClearValidate] = useState(false)
  const validatePassword = (data: any) => {
    if (data?.value.length >= 5 && data?.value.length <= 20) {
      setPasswordValidate(false)
    } else if (data?.value.length < 5) {
      setPasswordValidate(true)
    }
    if (data?.value.length > 0) {
      setPasswordClearValidate(true)
    } else {
      setPasswordClearValidate(false)
    }
    useSignInStore.setState({ password: data?.value })
  }

  const validateCaptcha = (data: any) => {
    useSignInStore.setState({ captcha: data?.value })
  }

  const clearUsername = () => {
    useSignInStore.setState({ userName: "" })
    setUserClearValidate(false)
  }
  const clearPassword = () => {
    useSignInStore.setState({ password: "" })
    setPasswordClearValidate(false)
  }
  function loginWithGeetest(event: any) {
    if (event.key === 'Enter' || event.type === "click") {
      if (user === "" || pass === "") {
        ToastrPngk({ msg: "Required fields must not be empty", type: "error" });
        setLoginBtn(false)
        return
      }
      (window as any)["initGeetest4"]({
        captchaId: keyGen,
        product: "bind",
        language: capthaLang,
      }, function (captchaObj: any) {
        (window as any)["gt"] = captchaObj;
        captchaObj.onReady(function () {
          captchaObj.showCaptcha(); //显示验证码
        }).onSuccess(function (data: any) {
          doLogin(captchaObj.getValidate());
          setLoginBtn(false)
          useSignInStore.setState({ userName: "" })
          useSignInStore.setState({ password: "" })
          useSignInStore.setState({ captcha: "" })
        }).onError(function () {
          setLoginBtn(false)
          captchaObj.reset();
          useSignInStore.setState({ userName: "" })
          useSignInStore.setState({ password: "" })
          useSignInStore.setState({ captcha: "" })
        });

      });
    }
  }
  function doLogin(geetest?: any) {
    if (userConfig?.on_off_pc_verify_code == true) {
      const payload = {
        username: user,
        password: pass,
        verifyCode: captcha,
        geetestParams: geetest ? JSON.stringify(geetest) : ''
      }
      loginv2.mutate(payload)
    }
    else {
      const payload = {
        username: user,
        password: pass,
        geetestParams: geetest ? JSON.stringify(geetest) : ''
      }
      loginv2.mutate(payload)
    }

  }
  const checkedRemember = useSignInStore(state => state.rememberMe)
  const closeLogin = () => {
    if (checkedRemember === false) {
      useSignInStore.setState({ rememberMe: false })
      useSignInStore.setState({ userName: "" })
      useSignInStore.setState({ password: "" })
    }
    useSignInStore.setState({ captcha: "" })
    useLoginStore.setState({ isOpen: false })
  }


  return (
    <React.Fragment>
      <Dialog
        open={loginStatus}
        sx={{
          " .MuiDialog-paper": {
            // maxWidth: "max-content !important",
            width: "6.4rem",
            maxWidth: "6.4rem"
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
            padding: "0 .3rem .3rem .3rem",
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
          }
        }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: colorP.backGorund }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              value="8"
              onClick={closeLogin}
              aria-label="close"
              tabIndex={-1}
            >
              <CloseIcon style={{ color: colorP.text }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ backgroundColor: colorP.backGorund }}>
          <div className="loginTitleBox" style={{ backgroundColor: colorP.backGorund }}>
            <div className="loginTitle">
              <div className="loginTitleBox" style={{ backgroundColor: colorP.backGorund, borderColor: colorP.forGround }}>
                <div className="LoginIconBox">
                  <img src={colorP.regla} style={{ width: ".27rem", marginRight: ".05rem" }} alt="U" />
                </div>
                <div className="loginLabel" style={{ color: colorP.forGround }}>
                  {t("ts1215", { ns: "ts" })}
                </div>
              </div>
            </div>
          </div>
          <Stack spacing={".35rem"} direction={"column"}>
            <FormControl sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                borderRadius: ".1rem",
                position: "relative",
                paddingLeft: ".1rem",
                paddingRight: ".14rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorP.fourth + " !important"
                }, ".MuiFormLabel-root": {
                  color: " #fff !important",
                },
                "& .MuiInputBase-input": {
                  color: " #fff !important",
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
              " .MuiInputAdornment-root": {
                marginRight: ".13rem"
              },
              " .MuiFormControl-root": {
                width: "100%"
              }
            }} variant="outlined">
              <Stack direction={"column"}>
                <form style={{ fontSize: "initial" }} autoComplete="off">
                  <TextField
                    required
                    id="filled-required"
                    InputProps={{
                      startAdornment:
                        <div className="requiredField">
                          <InputAdornment position="start">
                            <img src="/images/username.png" style={{ width: ".22rem" }} alt="U" />
                          </InputAdornment>
                          <span className="requiredSpan">*</span>
                        </div>,
                      endAdornment:
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          tabIndex={-1}
                        >
                          {userClearValidate == true && <CancelIcon onClick={clearUsername} />}
                        </IconButton>
                    }}
                    placeholder={t("ts167", { ns: "ts" })}
                    value={user}
                    onChange={(e) => validateUsername(e.target)}
                    autoComplete="off"
                    helperText={t("ts1131", { ns: "ts" })}
                  />
                </form>
              </Stack>
            </FormControl>
            <FormControl sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                borderRadius: ".1rem",
                position: "relative",
                paddingLeft: ".1rem",
                paddingRight: "0",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorP.fourth + " !important"
                },
                "& .MuiInputBase-input": {
                  color: " #fff !important",
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
                visibility: passwordValidate == true ? "visible" : "hidden",
                opacity: passwordValidate == true ? "1" : "0",
                transition: "visibility 0.3s, opacity 0.3s linear",
                transitionTimingFunction: "ease-in-out"
              },
              " .MuiInputAdornment-root": {
                marginRight: ".13rem"
              },
              " .MuiFormControl-root": {
                width: "100%"
              }
            }} variant="outlined">
              <form style={{ fontSize: "initial" }} autoComplete="off">
                <TextField
                  id="filled-required"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment:
                      <div className="requiredField">
                        <InputAdornment position="start">
                          <img src="/images/pwd.png" style={{ width: ".22rem" }} alt="P" />
                        </InputAdornment>
                        <span className="requiredSpan">*</span>
                      </div>
                    ,
                    endAdornment:
                      <InputAdornment position="end" sx={{ display: "flex", gap: "7px" }} >
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          tabIndex={-1}
                        >
                          {passwordClearValidate == true && <CancelIcon onClick={clearPassword} />}
                        </IconButton>
                        <IconButton
                          tabIndex={-1}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility style={{ color: colorP.forGround }} /> : <VisibilityOff style={{ color: "#68707B" }} />}
                        </IconButton>
                      </InputAdornment>
                  }}
                  placeholder={t("ts168", { ns: "ts" })}
                  value={pass}
                  autoComplete="off"
                  onChange={(e) => validatePassword(e.target)}
                  helperText={t("ts1132", { ns: "ts" })}
                />
              </form>
            </FormControl>
            {userConfig.on_off_pc_verify_code == true && <FormControl sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                borderRadius: ".1rem",
                position: "relative",
                paddingLeft: ".1rem",
                paddingRight: "0",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorP.fourth + " !important"
                },
                "& .MuiInputBase-input": {
                  color: " #fff !important",
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
              " .MuiInputAdornment-root": {
                marginRight: ".13rem"
              }
            }} variant="outlined">
              <TextField
                id="outlined-adornment-weight"
                InputProps={{
                  startAdornment:
                    <div className="requiredField">
                      <InputAdornment position="start">
                        <img src="/images/captcha.png" style={{ width: ".22rem" }} alt="P" />
                      </InputAdornment>
                      <span className="requiredSpan">*</span>
                    </div>
                  ,
                  endAdornment:
                    <InputAdornment position="end">
                      <img src={OTP} alt="" />
                    </InputAdornment>
                }}
                placeholder={t("ts166", { ns: "ts" })}
                value={captcha}
                onChange={(e) => validateCaptcha(e.target)}
                onKeyDown={userConfig.captcha_vertify_switch == true ? loginWithGeetest : login}
                autoComplete="off"
              />
            </FormControl>}
          </Stack>
          <div className="loginControllers">
            <div className='passwordControlls'>
              <FormControlLabel
                sx={{
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
                    top: "0 !important",
                    left: "0 !important",
                  }
                }}
                label={t("ts162", { ns: "ts" })}

                control={
                  <div className="checkbox_wrapper_4">
                    <input type="checkbox" className="inp-cbx" id="checker" checked={!!checked} onChange={handleChange3} />
                    <label className="cbx" htmlFor="checker"><span>
                      <svg width=".22rem" height=".22rem">
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
              <Link to={'/forgotpassword'} style={{ color: colorP.forGround, fontSize: ".18rem", }}>{t("ts163", { ns: "ts" })}</Link>
            </div>
            <Button disabled={logInbtn} className='loginButton' autoFocus onClick={userConfig.captcha_vertify_switch == true ? loginWithGeetest : login} sx={{
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
              }
            }}>
              {t("ts161", { ns: "ts" })}
            </Button>
            <div className="extraLinks">
              <div onClick={openSupport} style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}>{t("ts127", { ns: "ts" })}</div>
              {userConfig.isAllowRegisterGuest && <div onClick={handleFreetrial} style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}><span style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}>{t("ts164", { ns: "ts" })}</span></div>}
              <Link to={"/"} onClick={handleReegisterModal} style={{ color: colorP.forGround, cursor: "pointer", fontSize: ".18rem" }}>{t("ts165", { ns: "ts" })}</Link>
            </div>
          </div>
        </DialogContent >
      </Dialog >
    </React.Fragment >
  );
}