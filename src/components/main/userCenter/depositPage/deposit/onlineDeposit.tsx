import { Avatar, Button, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import 'react-notifications/lib/notifications.css';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import { ToastrPngk } from "../../../../globalFunctions/toastr";
import { useDepolist } from "../../../../hooks/curstomHooks";
import NoData from "../../../../noData/no-data";
import { useGlobalVariables } from "../../../../globalFunctions/store";

function OnlineDeposit(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()

    const config2 = useGlobalVariables(state => state.stationConfig)

    const [offlineBankcards, setCards] = useState([])
    const [activeCard, setActiveCard] = useState(0)
    const [activeChannel, setActiveChannel] = useState(0)
    const [checked, setChecked] = useState(false);
    const [bankList, setBankList] = useState([])
    const [totalBonus, settotalBonus] = useState<any>()
    const [bonusValue, setbonusValue] = useState<any>("")
    const [isData, setIsData] = useState(false)
    const [bonusType, setBonusType] = useState<any>(false)
    const [onlineList, setOnlineLists] = useState<any>()
    const [onlineActiveList, setOnlineActiveLists] = useState<any>()
    useEffect(() => {
        axios.post('/userCenter/finance/depositList.do', {
            payCode: "online",
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(
                (res) => {
                    if (res.data.onlineList != '') {
                        setActiveCard(0)
                        setBankList(res.data.onlineList)
                        setIsData(true)
                    } else {
                        setIsData(false)
                    }
                }
            )

    }, [])
    useEffect(() => {
        axios.post('/userCenter/finance/checkoutCounterByType.do', {
            payType: bankList[activeCard],
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(
            (res) => {
                if (res.data.onlineList[0]) {
                    setOnlineLists(res.data.onlineList)

                }

            }
        )

    }, [bankList, activeCard])
    const setActiveCarnow = (cardID: any) => {
        if (cardID.bankName == "USDT") {
        }
        else {
            setActiveCard(cardID)
        }
    }
    const activeChannels = (cardID: any) => {
        if (cardID.bankName == "USDT") {
        }
        else {
            setActiveChannel(cardID)
        }
    }
    const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked == true) {
            settotalBonus(0)
        }
        else {

        }
    };
    useEffect(() => {
        if (checked == false && onlineList) {
            if (bonusValue>=onlineList[activeChannel].min || bonusValue<=onlineList[activeChannel].max) {
                axios.post('/userCenter/finance/getDepositStragety.do', {
                    depositType: props.types,
                    money: bonusValue,
                    payId: onlineList && onlineList[activeChannel].id,
                }, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
                )
                    .then((res) => {
                        if (res.data.content) {
                            let giftval = res.data.content.giftValue
                            let bons = (parseInt(bonusValue) * giftval) / 100
                            settotalBonus(bons)
                        }

                    })
            }
            else{
                settotalBonus(0)

            }
        }


    }, [bonusValue, checked])

    const handleDepositOnline = () => {
        if (checked == true) {
            var joinType = 1
        }
        else {
            var joinType = 2
        }
        axios.post('/userCenter/finance/pay.do', {
            amount: Math.round(bonusValue * 100) / 100,
            payId: onlineList && onlineList[activeChannel].id,
            bankCode: bankList[activeCard],
            joinDepositGift: joinType,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
            .then((res) => {
                if (res.data.success == true) {
                    // ToastrPngk({ msg: res.data.msg, type: "success" })
                    window.open(res.data.url, "_blank", "noreferrer");
                }
                else {
                    ToastrPngk({ msg: res.data.msg, type: "error" })
                }
            })
    }
    function updateTotal(e: any) {
        setbonusValue(e.target.value)
    }
    function setTotalValue(e: any) {
        settotalBonus(e.target.value)
    }

    return (
        <>
            <div className="transferMainContainer"  style={{padding:".2rem !important"}}>

                {isData == true ?
                    <>
                        <div className="cardContainer">
                            {bankList ? bankList.map((value: any, index: any) =>
                                <div className="checkContainer">
                                    <div style={{ background: color.third, borderColor: color.forGround, color: color.forGround }} onClick={() => setActiveCarnow(index)} className={"bankCards " + ((index == activeCard) ? "active" : "")} key={index}>
                                        {value}
                                    </div>
                                    <div style={{ background: color.forGround, color: color.text }} className={"badge " + ((index == activeCard) ? "active" : "")} >
                                        <Avatar style={{ background: "transparent", width: "1.3rem", height: "1.3rem", color: color.text }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: "1.4rem", height: "1.4rem", color: color.text }}></CheckIcon></Avatar>
                                    </div>
                                </div>
                            ) : ""}
                        </div>

                        <div className="qrCodeContainer">
                            <div className="qrCodeLabelBox">
                                <div className="details" style={{ background: color.third, color: color.text }}>{t("ts220", { ns: "ts" })}</div>
                            </div>
                            <div className="cardContainer onlineListContainer">
                                {onlineList?.map((value: any, index: any) =>
                                    <div className="checkContainer">
                                        <div style={value.icon ? { borderColor: color.forGround, color: color.forGround, width: "100%", justifyContent: "space-between" } : { borderColor: color.forGround, color: color.forGround, width: "100%", justifyContent: "center" }} onClick={() => activeChannels(index)} className={"bankCards " + ((index == activeChannel) ? "active" : "")} key={index}>
                                            {value.icon && <img width={55} src={value.icon} alt="" />}
                                            {value.payAlias ? value.payAlias : value.payName}
                                        </div>
                                        <div style={{ background: color.forGround, color: color.text }} className={"badge " + ((index == activeChannel) ? "active" : "")} >
                                            <Avatar style={{ background: "transparent", width: "1.3rem", height: "1.3rem", color: color.text }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: "1.4rem", height: "1.4rem", color: color.text }}></CheckIcon></Avatar>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="qrCodeContainer">
                            <div className="qrCodeLabelBox">
                                <div className="details" style={{ background: color.third, color: color.text }}>{t("ts221", { ns: "ts" })}</div>
                            </div>
                            <div className="depoAmountContainer">
                                {onlineList && onlineList[activeChannel].fixedAmount ? onlineList[activeChannel].fixedAmount.split(',').map((value: any, index: any) =>
                                    <div className="checkContainer">
                                        <div style={{ background: color.third, borderColor: color.forGround, color: color.forGround }} onClick={() => setbonusValue(value)} className={"amountValue " + ((value == bonusValue) ? "active" : "")} key={index}>
                                            {value}
                                        </div>
                                        <div style={{ background: color.forGround, color: color.text }} className={"badge " + ((value == bonusValue) ? "active" : "")} >
                                            <Avatar style={{ background: "transparent", width: "1.3rem", height: "1.3rem", color: color.text }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: "1.4rem", height: "1.4rem", color: color.text }}></CheckIcon></Avatar>
                                        </div>
                                    </div>
                                ) : <div className="formController">
                                    <TextField sx={{
                                        width: 320,
                                        "& .MuiInputBase-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: color.forGround + " !important",
                                                fontSize:".18rem"
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                color: color.text + " !important",
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
                                                borderColor: color.forGround + " !important",
                                                fontSize:".18rem"
                                            }
                                        }
                                    }}
                                        id="outlined-read-only-input" margin="dense" size="small" onChange={updateTotal} label={t("ts221", { ns: "ts" })} />
                                </div>}
                            </div>
                            {onlineList && onlineList[activeChannel].isFixedAmount == 1 && <div className="formController">
                                <TextField sx={{
                                    width: 320,
                                    "& .MuiInputBase-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: color.forGround + " !important",
                                            fontSize:".18rem"
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            color: color.text + " !important",
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
                                            borderColor: color.forGround + " !important",
                                            fontSize:".18rem"
                                        }
                                    }
                                }}
                                    id="outlined-read-only-input" margin="dense" size="small" defaultValue={bonusValue} value={bonusValue} onChange={updateTotal} label={t("ts221", { ns: "ts" })} />
                            </div>}
                            <div className="formController">
                                <TextField sx={{
                                    width: 320,
                                    "& .MuiInputBase-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: color.forGround + " !important",
                                                fontSize:".18rem"
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            color: color.text + " !important",
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
                                            borderColor: color.forGround + " !important",
                                                fontSize:".18rem"
                                        }
                                    }
                                }}
                                    id="outlined-read-only-input" margin="dense" size="small" value={totalBonus} defaultValue="0" label={t("ts222", { ns: "ts" })} InputProps={{ readOnly: true, }} />
                            </div>
                            <FormControl
                                sx={{
                                    "&  .MuiFormControlLabel-root": {
                                        width: "max-content",
                                        fontSize:".18rem"
                                    }
                                }}
                            >
                                <FormControlLabel sx={{
                                    "&  .MuiTypography-root": {
                                        color: color.text + " !important",
                                        fontSize:".18rem"
                                    }
                                }} label={t("ts215", { ns: "ts" })} control={<Checkbox sx={{
                                    "& .MuiSvgIcon-root": {
                                        color: color.text + " !important",
                                        fontSize:".18rem"
                                    }
                                }} checked={checked} onChange={handleChange3} />} />
                            </FormControl>
                        </div>
                        <div className="buttonContainers">
                            <Button sx={{
                                color: color.text + " !important",
                                backgroundColor: color.forGround + " !important",
                                fontSize:".18rem"
                            }} variant="contained" className="configButtons" onClick={handleDepositOnline}>{t("ts216", { ns: "ts" })}</Button>
                        </div>
                    </>
                    :
                    <NoData />
                    // <div className="noOnlineConfigContainer">
                    //     <label className="noConfigLabel" style={{ borderColor: color.forGround, backgroundColor: color.third }}>{t("ts804", { ns: "ts" })}</label>
                    // </div>
                }
                <div className="notesContainer">
                    <div className="details" style={{ background: color.third }}>{t("ts217", { ns: "ts" })}</div>
                    <div className="minNote">
                        <div className="noteLabelBox"><span className="noteLabel">{t("ts218", { ns: "ts" })}</span><span className="miniCurrency" style={{ color: color.text }}>{onlineList && onlineList[activeChannel].bankName !== "USDT" ? config2.moneyUnit : "USDT"}</span>&nbsp;<span className="noteLabelContent" style={{ color: color.forGround }}>{onlineList && onlineList[activeChannel].min}</span><span className="miniCurrency" style={{ color: color.text }}></span></div>
                        <div className="noteLabelBox"><span className="noteLabel">{t("ts219", { ns: "ts" })}</span><span className="miniCurrency" style={{ color: color.text }}>{onlineList && onlineList[activeChannel].bankName !== "USDT" ? config2.moneyUnit : "USDT"}</span>&nbsp;<span className="noteLabelContent" style={{ color: color.forGround }}>{onlineList && onlineList[activeChannel].max}</span><span className="miniCurrency" style={{ color: color.text }}></span></div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default OnlineDeposit;