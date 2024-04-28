import { Avatar, Badge, Box, FormControl, InputAdornment, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button"
import CheckIcon from '@mui/icons-material/Check';
import 'react-notifications/lib/notifications.css';
import { useTranslation } from "react-i18next";
import SubmitModal from "../../../common/modal/submit-modal/submit-modal";
import { ChangeColorPallte, UserUSerConfig2 } from "../../../../globalFunctions/globalContext";
import { ToastrPngk } from "../../../../globalFunctions/toastr";
import NoData from "../../../../noData/no-data";
import { useGlobalVariables, useModalStates } from "../../../../globalFunctions/store";
import { useGetRecharge, useGetUSDTInfo } from "../../../../hooks/getUserInfoHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function BankCards(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()

  const config2 = useGlobalVariables(state => state.stationConfig)
  const [checked, setChecked] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const offlineBankcards = useGlobalVariables(state => state.offlineBankcards)
  const [bonsValueset, setBonusValue] = useState<any>('')
  const [totalBonus, settotalBonus] = useState<any>(0)
  const [open, setOpen] = useState(false);
  const [depoStrategy, setDepoStrategy] = useState<any[]>([])
  const [isData, setIsData] = useState(true)
  const usdtInfo = useGetUSDTInfo()
  const hasTronLink = useGlobalVariables(state => state.hasTrongLink)
  const usdtInfoLink = useGlobalVariables(state => state.usdtInfo)
  const activeBankCard = useGlobalVariables(state => state.activeBankCard)
  const [activeCard, setActiveCard] = useState({
    id: 0,
    payPlatformCode: '',
    qrCodeImg: '',
    realName: '',
    bankName: '',
    bankAddress: '',
    bankCard: '',
    min: '',
    max: '',
  })
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked == true) {
      settotalBonus(0)
    }
    else {

    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const setActiveCarnow = (cardID: any, bankName?: any) => {
    // if (bankName == "USDT") {
    //   usdtInfo.refetch()
    //   if (usdtInfo.isSuccess) {
    //     if (usdtInfo?.data.data.success == false) {
    //       useModalStates.setState({ usdtCardModal: true })
    //     }
    //     else {
    //       useGlobalVariables.setState({ activeBankCard: cardID })
    //     }
    //   }
    // }
    // else {
    setBonusValue('')
    settotalBonus(0)
    useGlobalVariables.setState({ activeBankCard: cardID })
    // }

  }
  const handleDepositInput = (value: any) => {
    setBonusValue(value)
  }
  const handleOrderNotes = (value: any) => {
    setOrderNotes(value)
  }
  useEffect(() => {

    if (checked == false) {
      try {
        axios.post('/userCenter/finance/getDepositStragety.do', {
          depositType: props.types,
          money: bonsValueset,
          payId: offlineBankcards.bankList[activeBankCard].id,
        }, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          }
        }
        )
          .then((res) => {
            if (res.data.content) {
              let giftval = res.data.content.giftValue
              var bons = (parseInt(bonsValueset) * giftval) / 100
              if (bons) {
                settotalBonus(bons)
              }
              else {
                settotalBonus(0)
              }
            }
          })
      } catch (e) {

      }
    }

  }, [bonsValueset, checked])

  const handleDepositOffline = () => {
    if (checked == true) {
      var joinType = 1
    }
    else {
      var joinType = 2
    }
    if (bonsValueset == '') { ToastrPngk({ msg: t("ts852", { ns: "ts" }), type: "error" }); return }
    if (bonsValueset < offlineBankcards.bankList[activeBankCard].min) { ToastrPngk({ msg: t("ts853", { ns: "ts" }), type: "error" }); return }
    if (bonsValueset > offlineBankcards.bankList[activeBankCard].max) { ToastrPngk({ msg: t("ts854", { ns: "ts" }), type: "error" }); return }
    if (orderNotes == '') { ToastrPngk({ msg: t("ts855", { ns: "ts" }), type: "error" }); return }
    try {
      axios.post('/userCenter/finance/rechargeOfflineSave.do', {
        payCode: "bank",
        amount: Math.round(bonsValueset * 100) / 100,
        payId: offlineBankcards.bankList[activeBankCard].id,
        depositName: orderNotes,
        payPlatformCode: "other",
        joinDepositGift: joinType,
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        }
      })
        .then((res) => {
          if (res.data.success == true) {
            setBonusValue('')
            settotalBonus(0)
            setOrderNotes('')
            ToastrPngk({ msg: res.data.msg, type: "success" })
          }
          else {
            ToastrPngk({ msg: res.data.msg, type: "error" })
          }
        })
    } catch (e) {

    }
  }
  const handleTronSubmit = () => {
    window.location.href = "#/usdt-management"
  }

  function copyText(text: any) {
    navigator.clipboard.writeText(text)
    ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
  }
  function masAccountNum(accNum: any) {
    let numAcc = accNum.toString()

    return "**********" + accNum.slice(accNum.length)
  }
  console.log(offlineBankcards)
  return (
    <>
      <div className="transferMainContainer" style={{ padding: ".2rem" }}>
        {offlineBankcards.bankList.length !== 0 ?
          <>
            <div className="cardContainer">
              {offlineBankcards ? offlineBankcards.bankList?.map((value: any, index: any) =>
                <div className="checkContainer" key={index}>
                  <div style={value.icon ? { borderColor: colorP.forGround, color: colorP.forGround, width: "100%", justifyContent: "space-between" } : { borderColor: colorP.forGround, color: colorP.forGround, width: "100%", justifyContent: "center" }} onClick={() => setActiveCarnow(index, value?.bankName)} className={((activeBankCard == index) ? "bankCards active" : "bankCards")} key={index}>
                    {value.icon && <img width={45} src={value.icon} alt="" />}
                    {value.bankName}
                  </div>
                  <div style={{ background: colorP.forGround, color: colorP.forGround }} className={"badge " + ((activeBankCard == index) ? "active" : "")} >
                    <Avatar style={{ background: "transparent", width: ".15rem", height: ".15rem", color: "#f0c059" }}><CheckIcon className="checkIcon" style={{ fontSize: 30, color: colorP.text, width: ".22rem", height: ".22rem" }}></CheckIcon></Avatar>
                  </div>
                </div>
              ) : ""}
            </div>
            <div className="paymentMethod">
              <div className="paymentMethodDetails"  >
                <div className="details" style={{ background: colorP.third }}><span className="detailsLabel" style={{ color: colorP.text }}>{t("ts207", { ns: "ts" })}</span><span style={{ color: colorP.forGround }} className="detailsContent">{activeCard.bankAddress}</span></div>
                <div className="crdBank" style={{ background: colorP.third, borderColor: colorP.forGround }}>
                  <div className="cardName" style={{ color: colorP.forGround }}>
                    {offlineBankcards ? offlineBankcards?.bankList[activeBankCard]?.bankName : ""}
                  </div>
                  <div className="cardBody" >
                    {offlineBankcards.bankList[activeBankCard].bankName !== "USDT" &&
                      <div className="cardBox">
                        <span className="cardLabel" style={{ color: colorP.text }}>{t("ts209", { ns: "ts" })}</span> <span className="cardContent" style={{ color: colorP.forGround }}>{offlineBankcards && offlineBankcards.bankList[activeBankCard].realName}</span>
                      </div>}
                    <div className="cardBox">
                      <span className="cardLabel" style={{ color: colorP.text }}>{t("ts210", { ns: "ts" })}</span>
                      <span className="cardContent" style={{ color: colorP.forGround }}>{offlineBankcards && offlineBankcards.bankList[activeBankCard].bankCard} {offlineBankcards.bankList[activeBankCard].bankCard && <img src="/navbarImages/copy.png" onClick={() => copyText(offlineBankcards.bankList[activeBankCard].bankCard)} className="copyIcon" />}</span>
                    </div>
                    {offlineBankcards.bankList[activeBankCard].bankName !== "USDT" && <div className="cardBox">
                      <span className="cardLabel" style={{ color: colorP.text }}>{t("ts478", { ns: "ts" })}:</span><span className="cardContent" style={{ color: colorP.forGround }}>{offlineBankcards && offlineBankcards.bankList[activeBankCard].bankAddress}</span>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
            {offlineBankcards.bankList[activeBankCard].qrCodeImg != "" && <div className="qrCodeContainer" >
              <div className="qrCodeLabelBox" >
                <div className="details" style={{ background: colorP.third }}>{t("ts208", { ns: "ts" })}</div>
                <div className="qrCodeLabel" style={{ color: colorP.forGround }}>{offlineBankcards.bankList[activeBankCard].bankName !== "USDT" ? t("ts211", { ns: "ts" }) : hasTronLink?.content?.remark} {offlineBankcards.bankList[activeBankCard].bankName === "USDT" && t("ts338", { ns: "ts" })} {hasTronLink?.content?.initTrx}</div>
              </div>
              <div className="qrCodeBox">
                {offlineBankcards.bankList[activeBankCard].qrCodeImg != "" ? (<img src={offlineBankcards.bankList[activeBankCard].qrCodeImg} className="qrCodeImage" />) : ""}
              </div>
            </div>}
            {offlineBankcards.bankList[activeBankCard].bankName !== "USDT" && <div className="inputContainer">
              <div className="details" style={{ background: colorP.third }}>{t("ts212", { ns: "ts" })}</div>
              <div className="bonusContainer">
                <Stack spacing={2} direction={"column"}>
                  {/* <TextField margin="dense" size="small" sx={{
                    width: 320,
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colorP.forGround + " !important",
                        fontSize:".18rem"
                      },
                      "& .MuiOutlinedInput-input": {
                        color: colorP.text + " !important",
                        fontSize:".18rem"
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important",
                      fontSize:".18rem"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: colorP.forGround + " !important",
                        fontSize:".18rem"
                      }
                    }
                  }} value={bonsValueset} onChange={(e) => handleDepositInput(e.target.value)} label={t("ts213", { ns: "ts" }) + " (" + config2.moneyUnit + ")"} type="number" /> */}
                  <FormControl sx={{
                    width: "4rem",
                    "& .MuiInputBase-root": {
                      borderRadius: ".1rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important"
                      }, ".MuiFormLabel-root": {
                        color: colorP.text + " !important"
                      },
                      "& .MuiInputBase-input": {
                        color: colorP.text + " !important",
                        fontSize: ".18rem",
                        height: ".5rem",
                        padding: "0"
                      },
                      "& .MuiSvgIcon-root": {
                        color: colorP.forGround + " !important",
                        height: "0.3rem",
                        width: " 0.3rem",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: colorP.forGround + " !important"
                      }
                    }
                  }} variant="outlined">
                    <TextField
                      id="outlined-adornment-weight"
                      InputProps={{
                        startAdornment:
                          <InputAdornment position="start">
                          </InputAdornment>
                      }}
                      type="number"
                      placeholder={t("ts213", { ns: "ts" })}
                      value={bonsValueset}
                      onChange={(e) => handleDepositInput(e.target.value)}
                      autoComplete="off"
                    />
                  </FormControl>
                  <TextField margin="dense" size="small" sx={{
                    width: "4rem",
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                        fontSize: ".18rem",
                        borderRadius: ".1rem"
                      },
                      "& .MuiOutlinedInput-input": {
                        color: colorP.text + "  !important",
                        fontSize: ".18rem",
                        borderRadius: ".1rem",
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important",
                      fontSize: ".18rem",
                      borderRadius: ".1rem"

                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: "#313843  !important",
                        fontSize: ".18rem",
                        borderRadius: ".1rem"
                      }
                    }
                  }} value={orderNotes} type="text" onChange={(e) => handleOrderNotes(e.target.value)} label={t("ts214", { ns: "ts" })} />
                  <TextField margin="dense" size="small" sx={{
                    width: "4rem",
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#313843 !important",
                        fontSize: ".18rem",
                        borderRadius: ".1rem"
                      },
                      "& .MuiOutlinedInput-input": {
                        color: colorP.text + "  !important",
                        fontSize: ".18rem",
                        borderRadius: ".1rem"
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important",
                      fontSize: ".18rem",
                      borderRadius: ".1rem"

                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: "#313843  !important",
                        fontSize: ".18rem",
                        borderRadius: ".1rem"
                      }
                    },
                    " .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#fff"
                    }
                  }} value={totalBonus} type="text" onChange={(e) => handleOrderNotes(e.target.value)} label={t("ts851", { ns: "ts" })} defaultValue="0" disabled />
                  <FormControl sx={{
                    "&  .MuiFormControlLabel-root": {
                      width: "max-content",
                    }
                  }}>
                    <FormControlLabel sx={{
                      color: colorP.text,
                      ".MuiCheckbox-root": {
                        color: "#313843 !important",
                      },
                      ".MuiCheckbox-root.Mui-checked": {
                        color: "#04be02 !important",
                      },
                      ".MuiSvgIcon-root": {
                        fontSize: ".25rem"
                      },
                      ".MuiTypography-root": {
                        fontSize: ".18rem",
                        color: "#adb6c3"
                      },
                    }} label={t("ts215", { ns: "ts" })} control={<Checkbox checked={checked} onChange={handleChange3} />} />
                  </FormControl>
                </Stack>
              </div>
              <div className="buttonContainers">
                <Button variant="contained" sx={{
                  color: colorP.text2 + " !important",
                  fontSize: ".18rem",
                  backgroundColor: colorP.forGround + " !important",
                  height: ".5rem !important",
                  borderRadius: ".1rem"
                }} className="configButtons" onClick={handleDepositOffline}>{t("ts216", { ns: "ts" })}</Button>
              </div>
            </div>}
            <div className="notesContainer">
              <div className="details" style={{ background: colorP.third }}>{t("ts217", { ns: "ts" })} {offlineBankcards.bankList[activeBankCard].bankName === "USDT" && <>({t("ts978", { ns: "ts" })} {usdtInfoLink?.depositRate}) <div style={{ color: colorP.forGround, marginLeft: ".001px" }}>{usdtInfoLink?.remark}</div></>}  </div>
              <div className="minNote">
                <div className="noteLabelBox"><span className="noteLabel">{t("ts218", { ns: "ts" })}</span><span className="miniCurrency" style={{ color: colorP.text }}>{offlineBankcards.bankList[activeBankCard].bankName !== "USDT" ? config2.moneyUnit : "USDT"}</span>&nbsp;<span className="noteLabelContent" style={{ color: colorP.forGround }}>{offlineBankcards.bankList[activeBankCard].min}</span></div>
                <div className="noteLabelBox"><span className="noteLabel">{t("ts219", { ns: "ts" })}</span><span className="miniCurrency" style={{ color: colorP.text }}>{offlineBankcards.bankList[activeBankCard].bankName !== "USDT" ? config2.moneyUnit : "USDT"}</span>&nbsp;<span className="noteLabelContent" style={{ color: colorP.forGround }}>{offlineBankcards.bankList[activeBankCard].max}</span></div>
              </div>

            </div>
            <SubmitModal submitAction={handleTronSubmit} openSubModal={open} closeSubModal={handleClose} submitTitle={t("ts205", { ns: "ts" })}>
              <div style={{ minWidth: "30rem" }}>{t("ts721", { ns: "ts" })}</div>
            </SubmitModal>
          </>
          :
          <NoData />
          // <div className="noOnlineConfigContainer">
          //   <label className="noConfigLabel" style={{ borderColor: colorP.forGround, backgroundColor: colorP.third }}>{t("ts804", { ns: "ts" })}</label>
          // </div>
        }
      </div>
    </>
  )


}
export default BankCards;