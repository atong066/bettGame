import Button from "@mui/material/Button";
import MainLayout from "../../layout";
import "./profile.css";
import {
  Avatar,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useEffect, useState } from "react";
import { HeaderWithAction } from "../common/header";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import SubmitModal from "../common/modal/submit-modal/submit-modal";
import { Link, useNavigate } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import BadgeIcon from "@mui/icons-material/Badge";
import { useButtonStates, useGlobalVariables } from "../../globalFunctions/store";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useGetSecurityInfo, useGetUserInfo, useSaveProfileInfo, useSaveSecurityInfo } from "../../hooks/getUserInfoHook";
let Masculine = (props: any) => {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte();
  const [imgButtonMas, setImgButtonMas] = useState<any>(
    window.sessionStorage.getItem("avatarId")
  );
  const [imageId, setImageId] = useState<any>(0);

  const [avatar, setAvatar] = useState<any>(
    window.sessionStorage.getItem("avatar")
  );
  const [avatarId, setAvatarId] = useState<any>();

  const saveImage = (event: any) => {
    setImgButtonMas(event.target.id);
    setAvatar(event.target.src);
    setAvatarId(event.target.id);
  };

  const saveAvatar = () => {
    window.sessionStorage.setItem("avatar", avatar);
    window.sessionStorage.setItem("avatarId", avatarId);
    props.closeModal();
  };
  const cancelAvatar = () => {
    props.closeModal();
  };

  useEffect(() => {
    setImageId(window.sessionStorage.getItem("avatarId"));
  }, [imageId, imgButtonMas]);

  return (
    <div className="mainImageBox">
      <div className="imageBox">
        {Array.from(Array(25), (e, i) => {
          return (
            <div
              key={i}
              style={{ borderColor: colorP.forGround }}
              className={"imgBox " + (i == imgButtonMas ? "active" : "")}
            >
              <img
                onClick={(event) => saveImage(event)}
                className="avatars"
                id={"" + i + ""}
                src={"/avatarImages/Masculine/" + i + ".png"}
              />
              <div
                style={{ background: colorP.forGround, color: colorP.text }}
                className={"badge " + (i == imgButtonMas ? "active" : "")}
              >
                <Avatar
                  style={{
                    background: "transparent",
                    width: ".2rem",
                    height: ".2rem",
                    color: colorP.text,
                  }}
                >
                  <CheckIcon
                    className="checkIcon"
                    style={{
                      fontSize: 30,
                      width: ".3rem",
                      height: "3rem",
                      color: colorP.text,
                    }}
                  ></CheckIcon>
                </Avatar>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttonBox">
        <Button
          onClick={saveAvatar}
          className="avatarButtonsSave"
          variant="contained"
          style={{ backgroundColor: colorP.forGround, color: "#fff" }}
        >
          {t("ts216", { ns: "ts" })}
        </Button>
      </div>
    </div>
  );
};

let Feminine = (props: any) => {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte();
  const [imgButtonFem, setImgButtonFem] = useState<any>(
    window.sessionStorage.getItem("avatarId")
  );
  const [imageId, setImageId] = useState<any>(0);

  const [avatar, setAvatar] = useState<any>(
    window.sessionStorage.getItem("avatar")
  );
  const [avatarId, setAvatarId] = useState<any>();

  const saveImage = (event: any) => {
    setImgButtonFem(event.target.id);
    setAvatar(event.target.src);
    setAvatarId(event.target.id);
  };

  const saveAvatar = () => {
    window.sessionStorage.setItem("avatar", avatar);
    window.sessionStorage.setItem("avatarId", avatarId);
    props.closeModal();
  };

  const cancelAvatar = () => {
    props.closeModal();
  };

  useEffect(() => {
    setImageId(window.sessionStorage.getItem("avatarId"));
  }, [imageId, imgButtonFem]);

  return (
    <div className="mainImageBox">
      <div className="imageBox">
        {Array.from(Array(24), (e, i) => {
          return (
            <div
              key={i}
              style={{ borderColor: colorP.forGround }}
              className={"imgBox " + (i == imgButtonFem ? "active" : "")}
            >
              <img
                onClick={(event) => saveImage(event)}
                className="avatars"
                id={"" + i + ""}
                src={"/avatarImages/Feminine/" + i + ".png"}
              />
              <div
                style={{ background: colorP.forGround, color: colorP.text }}
                className={"badge " + (i == imgButtonFem ? "active" : "")}
              >
                <Avatar
                  style={{
                    background: "transparent",
                    width: ".2rem",
                    height: ".2rem",
                    color: colorP.text,
                  }}
                >
                  <CheckIcon
                    className="checkIcon"
                    style={{
                      fontSize: 30,
                      width: ".3rem",
                      height: "3rem",
                      color: colorP.text,
                    }}
                  ></CheckIcon>
                </Avatar>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttonBox">
        <Button
          onClick={saveAvatar}
          className="avatarButtonsSave"
          variant="contained"
          style={{ backgroundColor: colorP.forGround, color: "#fff" }}
        >
          {t("ts216", { ns: "ts" })}
        </Button>
      </div>
    </div>
  );
};

const ALPHA_NUMERIC_DASH_REGEX = /^[0-9]+$/;

function ProfileInfo(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte();
  // const [data, setData] = useState<any>([]);
  const [actButton, setActButton] = useState<any>(0);
  const navigate = useNavigate();
  const userInfo = useGlobalVariables((state) => state.userDetails);
  const userDetails = useGetUserInfo()

  const [openSubmitModal, setSubmitModalOpen] = useState(false);

  const datas = useGetSecurityInfo()
  const data = datas?.data?.data?.userData
  const isData = datas?.data?.data

  // async function getUserInfo() {
  //   const result = await axios.get("/userCenter/getSecurityInfo.do");
  //   setData(result.data.userData);
  // }

  const handleSubmitModalOpen = () => {
    setSubmitModalOpen(true);
  };
  const handleSubmitModalClose = () => {
    setSubmitModalOpen(false);
  };

  function getTabContent(value: any) {
    switch (value) {
      case 1:
        return <Feminine closeModal={handleSubmitModalClose} />;
      default:
        return <Masculine closeModal={handleSubmitModalClose} />;
    }
  }

  const [selectedImage, setSelectedImage] = useState<any>();
  var avatar = window.sessionStorage.getItem("avatar");

  useEffect(() => {
    setSelectedImage(avatar);
    datas.refetch()
    userDetails.refetch()
  }, [avatar]);

  const goToSec = (link: any) => {
    navigate(link);
  };

  const [whatsapp, setWhastApp] = useState("")
  const [facebook, setFacebook] = useState("")
  const [telegram, setTelegram] = useState("")

  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  function saveInfo(event: any) {
    if (event.target.name == "whatsapp") {
      setWhastApp(event.target.value)
    }
    if (event.target.name == "facebook") {
      setFacebook(event.target.value)
    }
    if (event.target.name == "telegram") {
      setTelegram(event.target.value)
    }
  }

  const saveProfileInfo = useSaveProfileInfo()

  function saveInformation() {
    saveProfileInfo.mutate({
      "whatsapp": whatsapp,
      "facebook": facebook,
      "telegram": telegram,
      "birthday": year && month && day && year + "-" + month + "-" + day,
    })
    // if (isData?.hasFacebook == false) {
    //   saveSecurityInfo.mutate({
    //     newContact: facebook,
    //     type: "facebook",
    //   })
    // }
    // if (isData?.hasTelegram == false) {
    //   saveSecurityInfo.mutate({
    //     newContact: telegram,
    //     type: "telegram",
    //   })
    // }
    // if (isData?.hasBirthday == false) {
    //   saveSecurityInfo.mutate({
    //     newContact: year + "-" + month + "-" + day,
    //     type: "birthday",
    //   })
    // }
  }

  function setMonthValue(event: any) {
    setMonth(event.target.value)
  }
  function setDayValue(event: any) {
    setDay(event.target.value)
  }
  function setYearValue(event: any) {
    setYear(event.target.value)
  }

  const goSecure = (index: any, name: any) => {
    useButtonStates.setState({ securityType: index })
    useButtonStates.setState({ securityName: name })
    navigate("/secure")
  }

  return (
    <>
      <SubmitModal
        submitTitle={t("ts783", { ns: "ts" })}
        openSubModal={openSubmitModal}
        closeSubModal={handleSubmitModalClose}
        hasSubmit={false}
        hasCancel={false}
      >

        <div className="profileContainers">
          <div className="imageContainer">
            <div className="buttonBox">
              <Button
                onClick={() => setActButton(0)}
                className={actButton == 0 ? "avatarButtons active" : "avatarButtons"}
                variant="contained"
                style={actButton == 0 ? { backgroundColor: colorP.forGround, color: "#fff", borderColor: colorP.forGround } : {}}
              >
                {actButton == 0 ? <img src="/avatar/men1.png" style={{ height: ".25rem", width: ".25rem", marginRight: ".2rem" }} alt="." /> : <img src="/avatar/men.png" style={{ height: ".25rem", width: ".25rem", marginRight: ".2rem" }} alt="." />}
                {t("ts781", { ns: "ts" })}
              </Button>
              <Button
                onClick={() => setActButton(1)}
                className={actButton == 1 ? "avatarButtons active" : "avatarButtons"}
                variant="contained"
                style={actButton == 1 ? { backgroundColor: colorP.forGround, color: "#fff", borderColor: colorP.forGround } : {}}
              >
                {actButton == 1 ? <img src="/avatar/women1.png" style={{ height: ".25rem", width: ".25rem", marginRight: ".2rem" }} alt="." /> : <img src="/avatar/women.png" style={{ height: ".25rem", width: ".25rem", marginRight: ".2rem" }} alt="." />}
                {t("ts782", { ns: "ts" })}
              </Button>
            </div>
            {getTabContent(actButton)}
          </div>
        </div>
      </SubmitModal>
      <MainLayout>
        <section className="profileMainContainer">
          <HeaderWithAction backBtn={props.state}>
            {t("ts449", { ns: "ts" })}
          </HeaderWithAction>
          <div
            className="profileContainer"
            style={{ backgroundColor: colorP.backGorund }}
          >
            <div className="profileBox">
              <div className="profileImageBox">
                <img
                  className="profileImage"
                  src={selectedImage ? selectedImage : "/avatar/1.png"}
                />
                <span style={{
                  color: colorP.forGround,
                  fontSize: ".18rem",
                  cursor: "pointer"

                }} onClick={handleSubmitModalOpen}>{t("ts143", { ns: "ts" })}</span>
              </div>
            </div>
            <div className="inputContainer">
              <Stack spacing={1} direction={"column"} sx={{ width: "100%" }}>
                <TextField
                  id="outlined-start-adornment"
                  value={userInfo?.username && userInfo?.username}
                  disabled
                  sx={{
                    m: 1,
                    width: "100%",
                    marginBottom: ".5rem",
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",

                      },
                      "& .MuiInputBase-input": {
                        WebkitTextFillColor: colorP.text + " !important",
                        fontSize: ".18rem",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: "#313843 !important",
                        height: '.5rem',
                      },
                    },
                    "&.css-fgswsd-MuiFormControl-root-MuiTextField-root, .MuiInputBase-root":
                    {
                      marginBottom: ".3rem",
                      backgroundColor: "#202329",
                      borderRadius: ".1rem",
                      height: '.5rem'
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{ width: ".22rem" }} src="/images/username.png" alt="." />
                      </InputAdornment>
                    )
                  }}
                  placeholder={t("ts146", { ns: "ts" })}
                />
                <TextField
                  id="outlined-start-adornment"
                  value={userInfo?.promCode}
                  disabled
                  sx={{
                    m: 1,
                    width: "100%",
                    marginBottom: ".5rem",
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                      },
                      "& .MuiInputBase-input": {
                        WebkitTextFillColor: colorP.text + " !important",
                        fontSize: ".18rem",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: "#313843 !important",
                      },
                    },
                    "&.css-fgswsd-MuiFormControl-root-MuiTextField-root, .MuiInputBase-root":
                    {
                      marginBottom: ".3rem",
                      backgroundColor: "#202329",
                      borderRadius: ".1rem",
                      height: '.5rem'

                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{ width: ".22rem" }} src="/images/realName.png" alt="." />
                      </InputAdornment>
                    )
                  }}
                  placeholder={t("ts146", { ns: "ts" })}
                />
                <TextField
                  id="outlined-start-adornment"
                  value={data?.phone && data?.phone}
                  disabled
                  sx={{
                    m: 1,
                    width: "100%",
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                      },
                      "& .MuiInputBase-input": {
                        WebkitTextFillColor: colorP.text + " !important",
                        fontSize: ".18rem",
                      },
                    },
                    " .MuiButtonBase-root": {
                      margin: "0 !important",
                      paddingRight: "0 !important"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: colorP.forGround + " !important",
                      },
                    },
                    " .MuiInputBase-root":
                    {
                      marginBottom: ".3rem",
                      backgroundColor: "#202329",
                      borderRadius: ".1rem",
                      height: '.5rem'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{ width: ".22rem" }} src="/images/phone.png" alt="." />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      data?.phone ? "" :
                        <Button
                          onClick={() => goSecure(1, t("ts987", { ns: "ts" }))}
                          style={{ color: colorP.forGround }}
                          variant="outlined"
                          className="profileButtonGo"
                        >
                          {t("ts155", { ns: "ts" })}
                        </Button>
                    ),
                  }}
                  placeholder={t("ts297", { ns: "ts" })}
                />
                <TextField
                  id="outlined-start-adornment"
                  value={data?.email && data?.email}
                  disabled
                  sx={{
                    m: 1,
                    width: "100%",
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                      },
                      "& .MuiInputBase-input": {
                        WebkitTextFillColor: colorP.text + " !important",
                        fontSize: ".18rem",
                      },
                    },
                    " .MuiButtonBase-root": {
                      margin: "0 !important",
                      paddingRight: "0 !important"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: "#313843 !important",
                      },
                    },
                    "&.css-fgswsd-MuiFormControl-root-MuiTextField-root, .MuiInputBase-root":
                    {
                      marginBottom: ".1rem",
                      backgroundColor: "#202329",
                      borderRadius: ".1rem",
                      height: '.5rem'

                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{ width: ".22rem" }} src="/images/email.png" alt="." />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      data?.email ? "" :
                        <Button
                          onClick={() => goSecure(2, t("ts988", { ns: "ts" }))}
                          style={{ color: colorP.forGround }}
                          variant="outlined"
                          className="profileButtonGo"
                        >
                          {t("ts155", { ns: "ts" })}
                        </Button>
                    ),
                  }}
                  placeholder={t("ts307", { ns: "ts" })}
                />
                <br />
                <TextField
                  id="outlined-start-adornment"
                  value={data?.whatsapp ? data?.whatsapp : void (0)}
                  onChange={(event) => saveInfo(event)}
                  disabled={data?.whatsapp ? true : false}
                  name="whatsapp"
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: ".5rem",
                      borderRadius: ".1rem",
                      marginBottom: ".1rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                        fontSize: ".18rem",
                      },
                      "& .MuiOutlinedInput-input": {
                        color: colorP.text + " !important",
                        fontSize: ".18rem",
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important",
                      fontSize: ".18rem"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      fontSize: ".18rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        // border: "1px solid !important",
                        // borderColor: colorP.forGround + " !important",
                        fontSize: ".18rem"
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{ width: ".22rem" }} src="/images/whatsapp.png" alt="." />
                      </InputAdornment>
                    )
                  }}
                  placeholder={t("ts1027", { ns: "ts" })}
                />
                <br />
                <TextField
                  id="outlined-start-adornment"
                  value={data?.telegram ? data?.telegram : void (0)}
                  onChange={(event) => saveInfo(event)}
                  disabled={data?.telegram ? true : false}
                  name="telegram"
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: ".5rem",
                      borderRadius: ".1rem",
                      marginBottom: ".1rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                        fontSize: ".18rem",
                      },
                      "& .MuiOutlinedInput-input": {
                        color: colorP.text + " !important",
                        fontSize: ".18rem",
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important",
                      fontSize: ".18rem"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      fontSize: ".18rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        // border: "1px solid !important",
                        // borderColor: colorP.forGround + " !important",
                        fontSize: ".18rem"
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{ width: ".22rem" }} src="/images/telegram.png" alt="." />
                      </InputAdornment>
                    )
                  }}
                  placeholder={t("ts989", { ns: "ts" })}
                />
                <br />
                <TextField
                  id="outlined-start-adornment"
                  value={data?.facebook ? data?.facebook : void (0)}
                  onChange={(event) => saveInfo(event)}
                  disabled={data?.facebook ? true : false}
                  name="facebook"
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: ".5rem",
                      borderRadius: ".1rem",
                      marginBottom: ".1rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                        fontSize: ".18rem",
                      },
                      "& .MuiOutlinedInput-input": {
                        color: colorP.text + " !important",
                        fontSize: ".18rem",
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important",
                      fontSize: ".18rem"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      fontSize: ".18rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        // border: "1px solid !important",
                        // borderColor: colorP.forGround + " !important",
                        fontSize: ".18rem"
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{ width: ".22rem" }} src="/images/facebook.png" alt="." />
                      </InputAdornment>
                    )
                  }}
                  placeholder={t("ts991", { ns: "ts" })}
                />
              </Stack>

              <div style={{ width: "inherit" }}>
                <div>
                  <h3
                    style={{
                      color: "white",
                      marginTop: ".5rem",
                      fontSize: ".18rem",
                    }}
                  >
                    {t("ts1024", { ns: "ts" })}
                  </h3>
                </div>
                <div className="dateSelect">
                  {data?.birthday ?
                    <div className="textFieldContainer" style={{ cursor: "no-drop" }}>
                      <div className="inputContainerBox">
                        <div className="nameIconBox">
                          <input className="nameInput" style={{ cursor: "no-drop" }} disabled type="text" value={new Date(data?.birthday).getDate()} />
                        </div>
                      </div>
                    </div>
                    :
                    <div className="textFieldContainer">
                      <div className="inputContainerBox">
                        <div className="nameIconBox">
                          <input className="nameInput" type="text"
                            onKeyDown={(event) => {
                              if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key) && event.key != 'Backspace') {
                                event.preventDefault();
                              }
                            }}
                            onChange={(event) => setDayValue(event)}
                            maxLength={2} placeholder={t("ts1025", { ns: "ts" })} />
                        </div>
                      </div>
                    </div>
                  }
                  {data?.birthday ?
                    <div className="textFieldContainer" style={{ cursor: "no-drop" }}>
                      <div className="inputContainerBox">
                        <div className="nameIconBox">
                          <input className="nameInput" style={{ cursor: "no-drop" }} disabled type="text" value={new Date(data?.birthday).getMonth() + 1} />
                        </div>
                      </div>
                    </div>
                    :
                    <div className="textFieldContainer">
                      <FormControl size="small"
                        sx={{
                          width: "100%",
                          fontSize: ".18rem",
                          color: "#68707b !important",
                          "& .MuiPaper-root": {
                            background: colorP.backGorund,
                            fontSize: ".18rem",
                            color: "#68707b !important",
                          },
                          "& fieldset": {
                            borderColor: "#313843 !important",
                            borderRadius: ".1rem",
                            "& legend": {
                              "& span": {
                                color: colorP.forGround + " !important"
                              }
                            }
                          },
                          "& label": {
                            fontSize: ".18rem",
                            color: "#68707b !important",
                            lineHeight: ".3rem",
                          },
                          "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            borderColor: "#F0C059 !important",
                          }, "& .MuiInputBase-root": {
                            color: "#68707b !important",
                            fontSize: ".18rem",
                            height: ".5rem",
                          }, "& .MuiSvgIcon-root": {
                            color: "#68707b !important",
                            width: ".15em",
                          },
                          " .MuiSelect-select": {
                            color: "#fff !important",
                            lineHeight: ".3rem"
                          }
                        }}
                      >
                        <InputLabel sx={{ color: colorP.text }} id="demo-select-small-label">{t("ts1115", { ns: "ts" })}</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label={t("ts1115", { ns: "ts" })}
                          onChange={setMonthValue}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                background: colorP.backGorund,
                                color: colorP.text,
                                "& em": {
                                  fontSize: ".18rem",
                                  color: "#68707b !important",
                                },
                                " .MuiButtonBase-root": {
                                  fontSize: ".18rem",
                                  color: "#68707b !important",
                                }
                              }
                            }
                          }}
                        >
                          <MenuItem value={"01"}>01</MenuItem>
                          <MenuItem value={"02"}>02</MenuItem>
                          <MenuItem value={"03"}>03</MenuItem>
                          <MenuItem value={"04"}>04</MenuItem>
                          <MenuItem value={"05"}>05</MenuItem>
                          <MenuItem value={"06"}>06</MenuItem>
                          <MenuItem value={"07"}>07</MenuItem>
                          <MenuItem value={"08"}>08</MenuItem>
                          <MenuItem value={"09"}>09</MenuItem>
                          <MenuItem value={"10"}>10</MenuItem>
                          <MenuItem value={"11"}>11</MenuItem>
                          <MenuItem value={"12"}>12</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  }
                  {data?.birthday ?
                    <div className="textFieldContainer" style={{ cursor: "no-drop" }}>
                      <div className="inputContainerBox">
                        <div className="nameIconBox">
                          <input className="nameInput" style={{ cursor: "no-drop" }} disabled type="text" value={new Date(data?.birthday).getFullYear()} />
                        </div>
                      </div>
                    </div>
                    :
                    <div className="textFieldContainer">
                      <div className="inputContainerBox">
                        <div className="nameIconBox">
                          <input className="nameInput" type="text"
                            onKeyDown={(event) => {
                              if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key) && event.key != 'Backspace') {
                                event.preventDefault();
                              }
                            }}
                            onChange={(event) => setYearValue(event)}
                            maxLength={4} placeholder={t("ts1026", { ns: "ts" })} />
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button style={{ backgroundColor: 'transparent', borderColor: colorP.forGround, color: colorP.forGround }} className="profileButtons">{t("ts180", { ns: "ts" })}</Button>
                  <Button style={{ backgroundColor: colorP.forGround, borderColor: colorP.forGround, color: "#fff" }} onClick={saveInformation} className="profileButtons profileSaveButton">{t("ts322", { ns: "ts" })}</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}

export default ProfileInfo;
