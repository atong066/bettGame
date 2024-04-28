import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../common/table";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import GiftyModals from "../../redEnvelope/giftModal";
import { ChangeColorPallte, UserUSerConfig } from "../../../globalFunctions/globalContext";
import SubmitModal from "../../common/modal/submit-modal/submit-modal";
import NoData from "../../../noData/no-data";
import { useGetSecurityInfo, useStationConfig } from "../../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import { useGlobalVariables } from "../../../globalFunctions/store";

function BankCardManagement(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()
  const [bankCard, setbankCard] = useState<any[]>([]);
  const [openSubmitModal, setSubmitModalOpen] = useState(false);
  const isRecentCard = useGlobalVariables(state => state.userConfig)

  const [otherBankName, showOtherBankName] = useState(false);

  const [bankName, setBankName] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [bankList, setBankList] = useState([])
  const realName = useRef<any>(null)
  const cardNo = useRef<any>(null)
  const cardNoConfirm = useRef<any>(null)
  const otherBank = useRef<any>(null)
  const lastCardNo = useRef<any>(null)
  const lastRealName = useRef<any>(null)
  const bankAddress = useRef<any>(null)
  const [isData, setIsData] = useState(false)
  const [isCard, setIsCard] = useState(false)

  const setRealName = useRef<any>(null)

  const getSecurityInfo = useGetSecurityInfo()
  const getInfo = getSecurityInfo?.data?.data

  async function handleSubmitModalOpen() {
    getSecurityInfo.refetch()
    if (getSecurityInfo.isLoading == false) {
      if (getInfo?.hasRealName == false) {
        openSetRealName()
        setHandleCloseInfo(true);
      }
      if (getInfo?.hasWithdrawalPassword == false) {
        openwWithdraw()
        setHandleCloseInfo(true);
      }
      if (getInfo?.hasPhone == false) {
        openPhone()
        setHandleCloseInfo(true);
      }
      if (getInfo?.hasRealName == true && getInfo?.hasWithdrawalPassword == true && getInfo?.hasPhone == true) {
        setSubmitModalOpen(true);
      }
    }
  };

  const handleSubmitModalClose = () => {
    setSubmitModalOpen(false);
  };

  const MenuProps = {
    PaperProps: {
      sx: {
        background: color.backGorund,
        color: color.text,
        "& em": {
          color: color.text,
        }
      }
    },
  };

  async function getData() {
    try {
      const response = await axios.get('/userCenter/userBank/list.do', {
        params: {
          type: "bank"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      if (response.data.banks != '') {
        setbankCard(response.data.banks);
        setIsData(true)
      } else {
        setIsData(false)
      }
      setBankList(response.data.bankList);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  const [alertContent, setAlertContent] = useState('')
  const [openAlertModal, setOpenAlert] = useState(false)

  const openAlert = () => {
    setOpenAlert(true)
  }
  const closeAlert = () => {
    setOpenAlert(false)
  }

  async function saveBank() {
    if (cardNo.current.children[1].children[0].value == cardNoConfirm.current.children[1].children[0].value) {
      const response = await axios.post('/userCenter/userBank/bankAddSave.do', {
        bankCode: bankCode,
        bankName: bankName,
        realName: realName.current.children[1].children[0].value,
        cardNo: cardNo.current.children[1].children[0].value,
        bankAddress: bankAddress.current.value,
        lastRealName: isData && isCard ? lastRealName.current.children[1].children[0].value : "",
        lastCardNo: isData && isCard ? lastCardNo.current.children[1].children[0].value : "",
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      if (response.data.success == true) {
        setBankName('')
        setBankCode('')
        realName.current.children[1].children[0].value = null
        cardNo.current.children[1].children[0].value = null
        cardNoConfirm.current.children[1].children[0].value = null
        handleSubmitModalClose()
        ToastrPngk({ msg: response.data.msg, type: "success" })
      } else {
        ToastrPngk({ msg: response.data.msg, type: "error" })
      }
    } else {
      ToastrPngk({ msg: t("ts708", { ns: "ts" }), type: "error" })
    }
  }

  function pageSatus(type: any) {
    if (type == 1) {
      return t("ts386", { ns: ["ts"] })
    } else if (type == 2) {
      return t("ts385", { ns: ["ts"] })
    }
  }

  function timestampToTime(timestamp: any) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    const strDate = Y + M + D + h + m + s;
    return strDate;

  }

  const handleBankCode = (e: any, id: any) => {
    if (e.target.value == 'other') {
      showOtherBankName(true)
      setBankCode(e.target.value)
      setBankName('')
    } else {
      setBankCode(e.target.value)
      setBankName(id.props.children)
      showOtherBankName(false)
    }
  }

  const handleOtherBank = () => {
    setBankName(otherBank.current.children[1].children[0].value)
  }

  const realNameValue = useRef<any>(null)
  const [openRealName, setOpenRealName] = useState(false)
  const [openAll, setHandleCloseInfo] = useState(true)
  const openSetRealName = () => {
    setOpenRealName(true);
  };
  const closeSetRealName = () => {
    setOpenRealName(false);
  };
  const handleCloseInfo = () => {
    setHandleCloseInfo(false);
  };
  async function submitRealName() {
    const response = await axios.post('/userCenter/updateRealName.do', {
      realName: realNameValue.current.children[1].children[0].value,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    if (response.data.success == true) {
      closeSetRealName()
      setSubmitModalOpen(true)
      getSecurityInfo.refetch()
      ToastrPngk({ msg: response.data.msg, type: "success" })
    } else {
      ToastrPngk({ msg: response.data.msg, type: "error" })
    }
  };

  const withdrawalPasswordValue = useRef<any>(null)
  const [openWithdrawal, setOpenWithdrawal] = useState(false)
  const openwWithdraw = () => {
    setOpenWithdrawal(true);
  };
  const closewWithdraw = () => {
    setOpenWithdrawal(false);
  };
  async function setWithdrawPass() {
    const response = await axios.post('/userCenter/userPwdModifySave.do', {
      newPwd: withdrawalPasswordValue.current.children[1].children[0].value,
      okPwd: withdrawalPasswordValue.current.children[1].children[0].value,
      type: "2",
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    if (response.data.success == true) {
      closewWithdraw()
      getSecurityInfo.refetch()
      ToastrPngk({ msg: response.data.msg, type: "success" })
    } else {
      ToastrPngk({ msg: response.data.msg, type: "error" })
    }
  };

  const phoneNumber = useRef<any>(null)
  const [openPhoneNumber, setOpenPhone] = useState(false)
  const openPhone = () => {
    setOpenPhone(true);
  };
  const closePhone = () => {
    setOpenPhone(false);
  };
  async function setPhone() {
    const response = await axios.post('/userCenter/updateSecurityInfo.do', {
      newContact: phoneNumber.current.children[1].children[0].value,
      type: "phone"
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    if (response.data.success == true) {
      closePhone()
      getSecurityInfo.refetch()
      ToastrPngk({ msg: response.data.msg, type: "success" })
    } else {
      ToastrPngk({ msg: response.data.msg, type: "error" })
    }
  };

  const staLang = useStationConfig()
  var lang = staLang?.data?.data?.staLang
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z-\-" "]+$/;

  useEffect(() => {
    getSecurityInfo.refetch()
    setIsCard(isRecentCard.isRecentCardValid)
    getData();
  }, [cardNo, bankCode, bankName, realName, isRecentCard, openAll]);
  function masAccountNum(accNum:any){
    let numAcc=accNum.toString()

    return "******"+accNum.slice(6)
  }
  return (
    <div style={{ padding: "1rem" }}>
      <AlertModal
        openAlert={openAlertModal}
        closeAlert={closeAlert}
        alertTitle={t("ts186", { ns: "ts" })}
        alertMode="alertDefault"
      >
        <div className="alertContainer">
          {alertContent}
        </div>
      </AlertModal>
      <SubmitModal submitAction={submitRealName} submitTitle={t("ts707", { ns: "ts" })} openSubModal={openRealName && openAll} closeSubModal={handleCloseInfo}>
        <form noValidate>
          <TextField
            autoComplete="off"
            onKeyDown={(event) => {
              if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                event.preventDefault();
              }
            }}
            sx={{
              width: '50ch',
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: color.forGround + " !important"
                },
                "& .MuiOutlinedInput-input": {
                  textTransform: lang === "br" ? "" : "uppercase",
                  color: color.text + " !important"
                },
              },
              "& .MuiFormLabel-root": {
                color: "#808080 !important"
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid !important",
                  borderColor: color.forGround + " !important"
                }
              }
            }} label={t("ts146", { ns: "ts" })} margin="dense" size="small" ref={realNameValue} />
        </form>
      </SubmitModal>

      <SubmitModal submitAction={setWithdrawPass} submitTitle={t("ts291", { ns: "ts" })} openSubModal={openWithdrawal && openAll} closeSubModal={handleCloseInfo}>
        <form noValidate>
          <TextField
            autoComplete="off"
            id="outlined-password-input"
            sx={{
              width: '50ch',
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: color.forGround + " !important"
                },
                "& .MuiOutlinedInput-input": {
                  color: color.text + " !important"
                },
                "& .MuiInputBase-input": {
                  "-webkitTextSecurity": "disc !important"
                },
              },
              "& .MuiFormLabel-root": {
                color: "#808080 !important"
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid !important",
                  borderColor: color.forGround + " !important"
                }
              }
            }} label={t("ts292", { ns: "ts" })} margin="dense" size="small" ref={withdrawalPasswordValue} />
        </form>
      </SubmitModal>
      <SubmitModal submitAction={setPhone} submitTitle={t("ts296", { ns: "ts" })} openSubModal={openPhoneNumber && openAll} closeSubModal={handleCloseInfo}>
        <form noValidate>
          <TextField
            autoComplete="off"
            sx={{
              width: '50ch',
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: color.forGround + " !important"
                },
                "& .MuiOutlinedInput-input": {
                  color: color.text + " !important"
                },
              },
              "& .MuiFormLabel-root": {
                color: "#808080 !important"
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid !important",
                  borderColor: color.forGround + " !important"
                }
              }
            }} label={t("ts297", { ns: "ts" })} margin="dense" size="small" ref={phoneNumber} />
        </form>
      </SubmitModal>
      <Button
        onClick={handleSubmitModalOpen}
        style={{
          backgroundColor: color.forGround,
          color: color.text,
          fontWeight: 600,
          marginBottom: "20px",
        }}
      >
        {t("ts197", { ns: "ts" })}
      </Button>
      <SubmitModal
        submitTitle={t("ts186", { ns: "ts" })}
        openSubModal={openSubmitModal}
        closeSubModal={handleSubmitModalClose}
        submitAction={saveBank}
      >
        <FormControl sx={{ width: "50ch" }}>
          <Stack spacing={3} direction={"column"}>
            {/* isRecentCardValid */}
            {isCard && isData != true ?
            "":
              <Stack spacing={2} direction={"column"}>
                <span style={{ color: color.forGround }}>{t("ts718", { ns: "ts" })}</span>
                <form noValidate>
                  <TextField
                    autoComplete="off"
                    onKeyDown={(event) => {
                      if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    margin="dense"
                    size="small"
                    label={t("ts719", { ns: "ts" })}
                    fullWidth
                    variant="outlined"
                    id="realName"
                    ref={lastRealName}
                    sx={{
                      "& .MuiInputBase-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: color.forGround + " !important"
                        },
                        "& .MuiOutlinedInput-input": {
                          textTransform: lang === "br" ? "" : "uppercase",
                          color: color.text + " !important"
                        },
                      },
                      "& .MuiFormLabel-root": {
                        color: "#808080 !important"
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid !important",
                          borderColor: color.forGround + " !important"
                        }
                      }
                    }}
                  />
                  <TextField
                    autoComplete="off"
                    margin="dense"
                    size="small"
                    label={t("ts720", { ns: "ts" })}
                    fullWidth
                    variant="outlined"
                    id="cardNo"
                    ref={lastCardNo}
                    sx={{
                      "& .MuiInputBase-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: color.forGround + " !important"
                        },
                        "& .MuiOutlinedInput-input": {
                          color: color.text + " !important"
                        },
                      },
                      "& .MuiFormLabel-root": {
                        color: "#808080 !important"
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid !important",
                          borderColor: color.forGround + " !important"
                        }
                      }
                    }}
                  />
                </form>
              </Stack>
            }

            {/* isRecentCardValid */}
            <Stack spacing={2} direction={"column"}>
              <FormControl
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: color.forGround + " !important"
                    },
                    "& .MuiSelect-select": {
                      color: color.text + " !important"
                    },
                    "& .MuiSvgIcon-root": {
                      color: color.text + " !important"
                    },
                  },
                  "& .MuiFormLabel-root": {
                    color: "#808080 !important"
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid !important",
                      borderColor: color.forGround + " !important"
                    }
                  }
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
                  {bankList.map((value: any, index: any) =>
                    <MenuItem key={index} value={value.code}>{value.name}</MenuItem>
                  )}
                  {/* <MenuItem value="other">Others</MenuItem> */}
                </Select>
              </FormControl>
              <form noValidate>
                <TextField
                  autoComplete="off"
                  onKeyDown={(event) => {
                    if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  margin="dense"
                  size="small"
                  label={t("ts977", { ns: "ts" })}
                  fullWidth
                  variant="outlined"
                  id="realName"
                  ref={realName}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color.forGround + " !important"
                      },
                      "& .MuiOutlinedInput-input": {
                        textTransform: lang === "br" ? "" : "uppercase",
                        color: color.text + " !important"
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: color.forGround + " !important"
                      }
                    }
                  }}
                />
                <TextField
                  autoComplete="off"
                  onKeyDown={(event) => {
                    if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  margin="dense"
                  size="small"
                  label={t("ts976", { ns: "ts" })}
                  fullWidth
                  variant="outlined"
                  id="realName"
                  inputRef={bankAddress}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color.forGround + " !important"
                      },
                      "& .MuiOutlinedInput-input": {
                        textTransform: lang === "br" ? "" : "uppercase",
                        color: color.text + " !important"
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: color.forGround + " !important"
                      }
                    }
                  }}
                />
                {otherBankName &&
                  (<TextField
                    autoComplete="off"
                    margin="dense"
                    size="small"
                    label={t("ts682", { ns: "ts" })}
                    fullWidth
                    variant="outlined"
                    id="cardNo"
                    onChange={handleOtherBank}
                    ref={otherBank}
                    sx={{
                      "& .MuiInputBase-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: color.forGround + " !important"
                        },
                        "& .MuiOutlinedInput-input": {
                          color: color.text + " !important"
                        },
                      },
                      "& .MuiFormLabel-root": {
                        color: "#808080 !important"
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid !important",
                          borderColor: color.forGround + " !important"
                        }
                      }
                    }}
                  />)}
                <TextField
                  autoComplete="off"
                  margin="dense"
                  size="small"
                  label={t("ts201", { ns: "ts" })}
                  fullWidth
                  variant="outlined"
                  id="cardNo"
                  ref={cardNo}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color.forGround + " !important"
                      },
                      "& .MuiOutlinedInput-input": {
                        color: color.text + " !important"
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: color.forGround + " !important"
                      }
                    }
                  }}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  size="small"
                  label={t("ts717", { ns: "ts" })}
                  fullWidth
                  variant="outlined"
                  id="confirmBank"
                  ref={cardNoConfirm}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color.forGround + " !important"
                      },
                      "& .MuiOutlinedInput-input": {
                        color: color.text + " !important"
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: color.forGround + " !important"
                      }
                    }
                  }}
                />
              </form>
            </Stack>
          </Stack>
        </FormControl>
      </SubmitModal>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>{t("ts198", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts200", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts201", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts202", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts203", { ns: "ts" })}</TableCell>
            <TableCell>{t("ts204", { ns: "ts" })}</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isData && bankCard.map((value: any, index: any) => (
            <TableRow key={index} className="tableRow">
              <TableCell>{value.realName}</TableCell>
              <TableCell>{value.bankName}</TableCell>
              <TableCell>{masAccountNum(value.cardNo)}</TableCell>
              <TableCell>{value.remarks}</TableCell>
              <TableCell>{timestampToTime(value.createTime)}</TableCell>
              <TableCell>{pageSatus(value.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!isData && <NoData padding={"1rem 0 0 0"} />}
    </div>
  );
}

export default BankCardManagement;
