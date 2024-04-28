import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./navbar.css";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MusicModal from "./musicModal";
import { useNavigate } from "react-router-dom";
import { ChangeColorPallteUpdate, useBalance } from "../../globalFunctions/globalContext";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import Timer from "./times";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { useGetRecharge, useGetRegFields, useGetUserVIP, useRefreshBal, useStationConfig, } from "../../hooks/getUserInfoHook";
import { useGenerateOTP, useGlobalList, useGlobalVariables, useLoginStore, useTabStates, userRegstore, } from "../../globalFunctions/store";
import DepositModal from "../../main/homePage/components/depositModal";
import { useDepolist, useGetKey } from "../../hooks/curstomHooks";
import ConfirmOut from "./components/logoutConfirmModal";
import ConfirmRefresh from "./components/refreshPage";
import { MenuTab } from "./components/menuTab";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TermsCondition from "./components/termsAndCondition";

function Navbar(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const gameURL = useBalance();
  const userInfo = useGlobalVariables((state) => state.userDetails);
  const backgroundColor = ChangeColorPallte();
  const refreshBalance = useRefreshBal();
  const userconfigData = useGlobalVariables((state) => state.userConfig);
  const regFields = useGetRegFields();
  const userConfig2 = useGlobalVariables((state) => state.stationConfig);
  const [musicModalOpen, setMusicModalOpen] = useState(false);
  const [reloadderUP, setReloadUp] = useState(false);
  const deposits = useDepolist();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const hoverColor = useGlobalList(state => state.hoverColor)
  const [copyIndex, setCopyIndex] = useState<any>();
  // const changeColor = ChangeColorPallteUpdate()
  const getKey = useGetKey()
  const vipInfo = useGetUserVIP()

  const rechargeCn = useGetRecharge();
  const scroll = useGlobalVariables((state) => state.scrollToTop);
  const navigate = useNavigate();
  const handleMusicModalClose = () => {
    setMusicModalOpen(false);
  };
  {/* NOTE DO NOT DELETE THIS COMMENTED SECTION!!! */ }
  {/* NOTE DO NOT DELETE THIS COMMENTED SECTION!!! */ }
  {/* NOTE DO NOT DELETE THIS COMMENTED SECTION!!! */ }
  // const [color, setColor] = useState(2)
  // const handleColorChange = (stationTema: any) => {
  //   changeColor(stationTema)
  //   setColor(stationTema)

  // }

  // useEffect(() => {
  //   const stationConfig = useGlobalVariables.getState().stationConfig;
  //   handleColorChange(1)
  //   handleColorChange(stationConfig.stationTheme)
  // }, [])

  function handleReloadUp() {
    if (gameURL == undefined) {
      refreshBalance.mutate();
      setTimeout(function () {
        setReloadUp(false);
      }, 1000);
      setReloadUp(true);
    }
  }

  // aksdlasgjkldaskldk;as
  const handleopenLogin = () => {
    useLoginStore.setState({ isOpen: true });
    useGenerateOTP.getState().setOtp();
    getKey.mutate()
  };

  const handleClick = (event?: any, color?: any) => {
    setAnchorEl(event.currentTarget);
    useGlobalList.setState({ hoverColor: color });
    setCopyIndex(9999);
  };
  const handleOpenRegmodal = () => {
    regFields.refetch();
    if (regFields.isSuccess == true) {
      userRegstore.setState({ isOpenRegister: true });
    }
  };

  function copyText(text: any) {
    navigator.clipboard.writeText(text);
    ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text });
  }
  const [selectedImage, setSelectedImage] = useState<any>();
  var avatar = window.sessionStorage.getItem("avatar");
  const config = useStationConfig();
  const userConifg = config?.data?.data;

  function randomNumberInRange(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const [randomProfile, setRandomProfile] = useState(15)
  useEffect(() => {
    setSelectedImage(avatar);
    setRandomProfile(randomNumberInRange(1, 24))
  }, [avatar]);

  function openDeposit(link: any) {
    if (userInfo?.type == 150 || userInfo?.type == 160) {
      ToastrPngk({ msg: t("ts983", { ns: "ts" }), type: "error", id: link });
    } else {
      rechargeCn.mutate();
      useGlobalVariables.setState({ depoActiveTab: 0 });
      useGlobalVariables.setState({ activeBankCard: 0 });
      deposits.refetch();
      if (link === "newDepo") {
        useGlobalVariables.setState({ depoModal: true });
      } else {
        navigate("/deposit");
      }
    }
  }

  function openWithdrawPage(link: any, index: any) {
    if (userInfo?.type == 150 || userInfo?.type == 160) {
      ToastrPngk({ msg: t("ts983", { ns: "ts" }), type: "error", id: link });
    } else {
      rechargeCn.mutate();
      useTabStates.setState({ type: 0 });
      if (link === "withdraw") {
        navigate("/withdraw");
        useTabStates.setState({ type: index });
      } else {
        navigate("/withdrawal");
      }
    }
  }
  const confirmOut = useGlobalVariables((state) => state.confirmOutModal);
  const confirmRefresh = useGlobalVariables((state) => state.confirmRefersg);


  return (
    <>
      <DepositModal></DepositModal>
      <ConfirmOut confirmLogout={confirmOut} />
      <ConfirmRefresh modalStatus={confirmRefresh}></ConfirmRefresh>
      <TermsCondition />
      <nav className="navbarContainer">
        <div className="navbar" style={{ backgroundColor: backgroundColor.second }}>
          <div className="navLeft">
            <img
              src="/images/logoSide.png"
              className={props.sidebarActive ? "navArrow" : "navArrow active"}
              onClick={props.setside}
            />
            <div className="logoContainer" onClick={scroll}>
              <Link to="/home">
                <img className="logoImage" src={userConfig2?.logo} alt="Logo" />
              </Link>
            </div>
            <Timer />
          </div>
          {userInfo?.isLogin == true ? (
            <div className="navMiddle">
              {userconfigData?.onOffGiftWallet && (
                <Link to="/recharge">
                  <div className="bonusMoney" style={{ borderColor: backgroundColor.fourth }}>
                    <img
                      className="bonusMoneyImage"
                      src="data:image/png;base64,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"
                      alt=""
                    />
                    <label className="moneyValue">
                      {t("ts706", { ns: "ts" })}
                      <u className="moneyLabel" style={{ color: "#FFAA09" }}>
                        {userInfo?.giftMoney
                          ? new Intl.NumberFormat("en-IN").format(
                            userInfo?.giftMoney
                          )
                          : "0,00"}
                      </u>
                    </label>
                  </div>
                </Link>
              )}
              <div className="moneyDisplayBox" style={{ borderColor: backgroundColor.fourth }}>
                <div className="flagContainer">
                  <img
                    src="/navbarImages/moneyFrame.png"
                    className="moneyFlag"
                  />
                  <img src={"/navbarImages/" + userConfig2?.staLang + ".png"} className="moneyFlag" />
                </div>
                <span className="moneyValue">
                  {gameURL == undefined ? (
                    <u style={{ color: "#FFAA09" }}>
                      {userInfo?.money
                        ? new Intl.NumberFormat("en-IN").format(userInfo?.money)
                        : "0,00"}
                    </u>
                  ) : (
                    <span style={{ color: "#ADB6C3", fontSize: ".18rem" }}>
                      {t("ts1199", { ns: "ts" })}
                    </span>
                  )}
                </span>
                {gameURL == undefined && (
                  <IconButton
                    className="refreshIconButton"
                    onClick={handleReloadUp}
                    disabled={reloadderUP}
                  >
                    <img
                      src="navbarImages/shuaxin.png"
                      style={{ color: backgroundColor.forGround }}
                      className={
                        reloadderUP ? "refreshIcon active" : "refreshIcon"
                      }
                    />
                  </IconButton>
                )}
              </div>
              <div className="buttonContainer">
                <Stack spacing={2} direction="row">
                  {userConifg?.onOffDepositDrawPage == false ? (
                    <>
                      <div onClick={() => openDeposit("oldDepo")}>
                        <Button
                          variant="contained"
                          className="navButtons navButtonsDepo"
                        >
                          {t("ts014", { ns: "ts" })}
                        </Button>
                      </div>
                      <Button variant="contained" className="navButtons">
                        {t("ts015", { ns: "ts" })}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => openDeposit("newDepo")}
                        variant="contained"
                        className="navButtons navButtonsDepo"
                        style={{ backgroundColor: backgroundColor.fifth, borderColor: backgroundColor.fifth, color: backgroundColor.text3 }}
                      >
                        {t("ts014", { ns: "ts" })}
                      </Button>
                      <Button
                        onClick={() => openWithdrawPage("withdraw", 0)}
                        variant="contained"
                        className="navButtons"
                        style={{ borderColor: backgroundColor.fifth, color: backgroundColor.fifth }}
                      >
                        {t("ts015", { ns: "ts" })}
                      </Button>
                    </>
                  )}
                  {userconfigData?.onOffMoneyIncome === true &&
                    <Link to="/balance-bonus">
                      <Button variant="contained" style={{ borderColor: backgroundColor.fifth, color: backgroundColor.text2 }} className="navButtons">
                        {t("ts984", { ns: "ts" })}
                      </Button>
                    </Link>
                  }
                </Stack>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="navRight">
            {userInfo?.isLogin == false ? (
              <div className="credentialButtons">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    className="credentialButton"
                    onClick={handleopenLogin}
                    style={{ backgroundColor: backgroundColor.forGround, borderColor: backgroundColor.forGround, color: backgroundColor.text2 }}
                  >
                    {t("ts002", { ns: ["ts"] })}
                  </Button>
                  <Button
                    variant="contained"
                    className="credentialButton credentialButtonRegister"
                    onClick={handleOpenRegmodal}
                    style={{ borderColor: backgroundColor.forGround, color: backgroundColor.forGround }}
                  >
                    {" "}
                    {t("ts001", { ns: ["ts"] })}
                  </Button>
                </Stack>
              </div>
            ) : (
              <React.Fragment>
                <div className="menuBox">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      padding: "5px",
                      borderRadius: "7px",
                      "&:hover": {
                        backgroundColor: backgroundColor.third,
                      },
                      backgroundColor: hoverColor,
                    }}
                    onClick={(event) =>
                      handleClick(event, backgroundColor.third)
                    }
                    onMouseOver={(event) =>
                      handleClick(event, backgroundColor.third)
                    }
                  >
                    <div className="profileMenu">
                      <div className="vipLevelContainer">
                        <img
                          className="profileImage"
                          src={selectedImage ? selectedImage : "/avatarImages/Feminine/1.png"}
                        />
                        <div className="vipBox">
                          <img className="vipBadge" src="/vipImages/pin.png" />
                          <span>{vipInfo?.data?.data?.curDegreeLevel}</span>
                        </div>
                      </div>

                      <div className="UserInfo">
                        <div className="infoBoxs">
                          <label className="usernameLabel">
                            {userInfo?.username}
                          </label>
                          <div className="userCopyBox">
                            <label className="usernameLabel">ID:</label>
                            <span className="userID">{userInfo?.promCode}</span>
                            <img
                              src={backgroundColor.copy}
                              style={copyIndex ? { zIndex: copyIndex } : {}}
                              onClick={() => copyText(userInfo?.promCode)}
                              className="copyIcon"
                            />
                          </div>
                        </div>
                        <Avatar
                          variant="square"
                          sx={{ width: 32, height: 32, bgcolor: "transparent" }}
                        >
                          <ArrowDropDownIcon
                            className={
                              Boolean(anchorEl) == true
                                ? "arrowDownIcon active"
                                : "arrowDownIcon"
                            }
                          />
                        </Avatar>
                      </div>
                    </div>
                  </Box>
                </div>
                <MenuTab anchorEl={anchorEl} action={setAnchorEl} ></MenuTab>
              </React.Fragment>
            )}

            {/* NOTE DO NOT DELETE THIS COMMENTED SECTION!!! */}
            {/* NOTE DO NOT DELETE THIS COMMENTED SECTION!!! */}
            {/* NOTE DO NOT DELETE THIS COMMENTED SECTION!!! */}
            {/* <div className="colorPicker">
              <FormControl size="small"
                sx={{
                  minWidth: 150,
                  fontSize: ".16rem",
                  color: "#68707b !important",
                  "& .MuiPaper-root": {
                    background: backgroundColor.backGorund,
                    fontSize: ".16rem",
                    color: "#68707b !important",
                  },
                  "& fieldset": {
                    borderColor: backgroundColor.forGround + "!important",
                    "& legend": {
                      "& span": {
                        color: backgroundColor.forGround + " !important"
                      }
                    }
                  },
                  "& label": {
                    fontSize: ".16rem",
                    color: "#68707b !important",
                  },
                  "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderColor: backgroundColor.forGround + "!important",
                  }, "& .MuiInputBase-root": {
                    color: "#68707b !important",
                    fontSize: ".16rem"
                  }, "& .MuiSvgIcon-root": {
                    color: "#68707b !important",
                    width: ".15em",
                  },
                  " .MuiSelect-select": {
                    color: "#68707b !important",
                  }
                }}
              >
                <InputLabel sx={{ color: backgroundColor.text }} id="demo-select-small-label">{t("ts458", { ns: "ts" })}</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label={t("ts458", { ns: "ts" })}
                  value={color}
                  onChange={handleColorChange}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: backgroundColor.backGorund,
                        color: backgroundColor.text,
                        "& em": {
                          fontSize: ".16rem",
                          color: "#68707b !important",
                        },
                        " .MuiButtonBase-root": {
                          fontSize: ".16rem",
                          color: "#68707b !important",
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>{t("ts459", { ns: "ts" })}...</em>
                  </MenuItem>
                  <MenuItem value={2}>Ferrari</MenuItem>
                  <MenuItem value={0}>Bvlgari</MenuItem>
                  <MenuItem value={1}>Tom Ford</MenuItem>
                  <MenuItem value={3}>Armani</MenuItem>
                  <MenuItem value={4}>Corum</MenuItem>
                  <MenuItem value={5}>Aston Martin</MenuItem>
                </Select>
              </FormControl>
            </div> */}
          </div>
        </div>
        <MusicModal isOpen={musicModalOpen} onClose={handleMusicModalClose} />
      </nav>
    </>
  );
}
export default Navbar;
